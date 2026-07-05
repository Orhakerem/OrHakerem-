'use server';

import { revalidatePath } from 'next/cache';
import { ZodError } from 'zod';

import {
  buildListingUpdateRow,
  buildPricingRuleRow,
  buildPricingTierUpdateRow,
  buildSeasonDateOverrideRow,
  buildSeasonPeriodRow,
  fetchAdminPricingSnapshot,
  saveAdminQuoteHistoryEntry,
  savePricingAdjustmentRule,
  type AdminPricingRuleInput,
  type AdminPricingSupabaseClient,
  type SaveAdminQuoteHistoryInput,
} from '@/lib/admin-pricing';
import { getAdminSession } from '@/lib/admin-session';
import { BOOKABLE_PROPERTIES } from '@/lib/bookable-properties';
import { compareIsoDates, isIsoDateString } from '@/lib/booking-dates';
import type {
  AdminPricingActionResult,
  AdminPricingSimulationInput,
  AdminPricingSimulationNight,
  AdminPricingSimulationQuote,
  AdminPricingSimulationResult,
  AdminSaveListingPricesInput,
  AdminSavePricingRulesInput,
  AdminSaveSeasonPeriodsInput,
  AdminSaveSpecialDatesInput,
} from '@/components/admin/AdminPricingEditor';
import { getPricingBreakdown, type PricingBreakdown } from '@/lib/pricing-engine';
import { getSupabaseAdminClient } from '@/lib/supabase-admin';

const COMBINED_LISTING_ID = 'penthouse+studio';
const COMBINED_LISTING_TITLE = 'Penthouse + Studio';

function getActionErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ZodError) {
    return error.issues[0]?.message ?? fallback;
  }

  return error instanceof Error ? error.message : fallback;
}

function getAdminPricingClient() {
  return getSupabaseAdminClient();
}

function getAdminPricingWriteClient() {
  return getSupabaseAdminClient() as unknown as AdminPricingSupabaseClient;
}

function assertAdminSession() {
  return getAdminSession();
}

function revalidateAdminPricing() {
  revalidatePath('/admin');
  revalidatePath('/admin/pricing');
  revalidatePath('/en/admin');
  revalidatePath('/en/admin/pricing');
}

async function getSnapshotResult(message: string): Promise<AdminPricingActionResult> {
  const snapshot = await fetchAdminPricingSnapshot(getAdminPricingClient());

  return {
    success: true,
    message,
    snapshot,
  };
}

function omitId(row: Record<string, unknown>) {
  const payload = { ...row };
  delete payload.id;

  return payload;
}

function getRowId(row: Record<string, unknown>) {
  const id = row.id;

  return typeof id === 'string' || typeof id === 'number' ? id : null;
}

async function assertNoSupabaseError(
  result: { error: { message: string } | null },
  operation: string,
) {
  if (result.error) {
    throw new Error(`${operation}: ${result.error.message}`);
  }
}

async function fetchExistingIds(
  tableName: string,
  filter?: { column: string; value: string },
) {
  let query = getAdminPricingClient().from(tableName).select('id');

  if (filter) {
    query = query.eq(filter.column, filter.value);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Fetch existing ${tableName}: ${error.message}`);
  }

  return (data ?? [])
    .map((row) => (row as { id?: string | number }).id)
    .filter((id): id is string | number => typeof id === 'string' || typeof id === 'number');
}

async function saveMutableRows(tableName: string, rows: Array<Record<string, unknown>>) {
  const supabase = getAdminPricingClient();

  for (const row of rows) {
    const id = getRowId(row);

    if (id) {
      await assertNoSupabaseError(
        await supabase.from(tableName).update(omitId(row)).eq('id', id),
        `Update ${tableName}`,
      );
    } else {
      await assertNoSupabaseError(
        await supabase.from(tableName).insert(row),
        `Insert ${tableName}`,
      );
    }
  }
}

async function deactivateMissingRows(
  tableName: string,
  existingIds: readonly (string | number)[],
  submittedIds: readonly (string | number)[],
) {
  const submittedIdSet = new Set(submittedIds);
  const missingIds = existingIds.filter((id) => !submittedIdSet.has(id));

  if (missingIds.length === 0) {
    return;
  }

  await assertNoSupabaseError(
    await getAdminPricingClient().from(tableName).update({ is_active: false }).in('id', missingIds),
    `Deactivate removed ${tableName}`,
  );
}

async function handleAdminPricingMutation(
  operation: string,
  mutate: () => Promise<string>,
): Promise<AdminPricingActionResult> {
  if (!assertAdminSession()) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    const message = await mutate();
    revalidateAdminPricing();

    return await getSnapshotResult(message);
  } catch (error) {
    console.error(`Admin pricing ${operation} failed:`, error);
    return {
      success: false,
      error: getActionErrorMessage(error, `Failed to ${operation}`),
    };
  }
}

export async function saveAdminListingPrices(
  input: AdminSaveListingPricesInput,
): Promise<AdminPricingActionResult> {
  return handleAdminPricingMutation('save listing prices', async () => {
    const listingRow = buildListingUpdateRow(input.listing);
    const { id: listingId, ...listingUpdate } = listingRow;
    const tierRows = input.tiers.map((tier) =>
      buildPricingTierUpdateRow({ ...tier, listingId: input.listing.listingId }),
    );
    const existingTierIds = await fetchExistingIds('pricing_tiers', {
      column: 'listing_id',
      value: input.listing.listingId,
    });
    const submittedTierIds = tierRows
      .map((row) => getRowId(row as Record<string, unknown>))
      .filter((id): id is string | number => id !== null);

    await assertNoSupabaseError(
      await getAdminPricingClient().from('listings').update(listingUpdate).eq('id', listingId),
      'Update listing',
    );
    await saveMutableRows('pricing_tiers', tierRows as Array<Record<string, unknown>>);
    await deactivateMissingRows('pricing_tiers', existingTierIds, submittedTierIds);

    return 'Listing pricing saved.';
  });
}

export async function saveAdminSeasonPeriods(
  input: AdminSaveSeasonPeriodsInput,
): Promise<AdminPricingActionResult> {
  return handleAdminPricingMutation('save season periods', async () => {
    const rows = input.periods.map((period) => buildSeasonPeriodRow(period));
    const existingIds = await fetchExistingIds('season_periods');
    const submittedIds = rows
      .map((row) => getRowId(row as Record<string, unknown>))
      .filter((id): id is string | number => id !== null);

    await saveMutableRows('season_periods', rows as Array<Record<string, unknown>>);
    await deactivateMissingRows('season_periods', existingIds, submittedIds);

    return 'Season periods saved.';
  });
}

export async function saveAdminSeasonDateOverrides(
  input: AdminSaveSpecialDatesInput,
): Promise<AdminPricingActionResult> {
  return handleAdminPricingMutation('save special dates', async () => {
    const rows = input.specialDates.map((specialDate) =>
      buildSeasonDateOverrideRow(specialDate),
    );
    const existingIds = await fetchExistingIds('season_date_overrides');
    const submittedIds = rows
      .map((row) => getRowId(row as Record<string, unknown>))
      .filter((id): id is string | number => id !== null);

    await saveMutableRows('season_date_overrides', rows as Array<Record<string, unknown>>);
    await deactivateMissingRows('season_date_overrides', existingIds, submittedIds);

    return 'Special dates saved.';
  });
}

export async function saveAdminPricingRules(
  input: AdminSavePricingRulesInput,
): Promise<AdminPricingActionResult> {
  return handleAdminPricingMutation('save pricing rules', async () => {
    const rows = input.rules.map((rule) => buildPricingRuleRow(rule));
    const existingIds = await fetchExistingIds('pricing_adjustment_rules');
    const submittedIds = rows
      .map((row) => getRowId(row as Record<string, unknown>))
      .filter((id): id is string | number => id !== null);

    await saveMutableRows('pricing_adjustment_rules', rows as Array<Record<string, unknown>>);
    await deactivateMissingRows('pricing_adjustment_rules', existingIds, submittedIds);

    return 'Pricing rules saved.';
  });
}

export async function saveAdminPricingAdjustmentRule(input: AdminPricingRuleInput) {
  if (!assertAdminSession()) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    const result = await savePricingAdjustmentRule(input, getAdminPricingWriteClient());
    revalidateAdminPricing();

    return {
      success: true,
      rule: result.rule,
    };
  } catch (error) {
    console.error('Admin pricing adjustment save failed:', error);
    return {
      success: false,
      error: getActionErrorMessage(error, 'Failed to save pricing adjustment rule'),
    };
  }
}

function validateSimulationInput(input: AdminPricingSimulationInput) {
  if (!input.listingId || !input.checkIn || !input.checkOut) {
    return 'Choose a listing and dates.';
  }

  if (!isIsoDateString(input.checkIn) || !isIsoDateString(input.checkOut)) {
    return 'Use valid ISO dates.';
  }

  if (compareIsoDates(input.checkOut, input.checkIn) <= 0) {
    return 'Check-out must be after check-in.';
  }

  return null;
}

function getListingTitle(listingId: string) {
  const property = Object.values(BOOKABLE_PROPERTIES).find(
    (candidate) => candidate.listingId === listingId,
  );

  return property?.title ?? listingId;
}

function mapQuoteNight(
  night: PricingBreakdown['nightly_breakdown'][number],
): AdminPricingSimulationNight {
  const adjustmentBasisPoints = (night.pricing_adjustments ?? []).reduce(
    (total, adjustment) => total + adjustment.adjustment_basis_points,
    0,
  );

  return {
    date: night.date,
    dayType: night.day_type,
    seasonType: night.season_type,
    basePrice: night.base_nightly_price ?? night.pricing_tier.target_price,
    adjustmentAmount: night.adjustment_amount ?? 0,
    adjustmentBasisPoints,
    finalPrice: night.nightly_price,
    adjustmentNames: (night.pricing_adjustments ?? []).map((adjustment) => adjustment.name),
  };
}

function mapQuoteToSimulation(
  quote: PricingBreakdown,
  listingTitle = getListingTitle(quote.listing_id),
): AdminPricingSimulationQuote {
  return {
    listingId: quote.listing_id,
    listingTitle,
    currency: quote.currency,
    nights: quote.nights,
    nightTotal: quote.night_total,
    baseNightTotal: quote.base_night_total ?? quote.night_total,
    adjustmentTotal: quote.adjustment_total ?? 0,
    cleaningFee: quote.cleaning_fee,
    totalPrice: quote.total_price,
    nightlyBreakdown: quote.nightly_breakdown.map(mapQuoteNight),
  };
}

function combineSimulationQuotes(
  quotes: readonly AdminPricingSimulationQuote[],
): AdminPricingSimulationQuote {
  const firstQuote = quotes[0];

  if (!firstQuote) {
    throw new Error('No quotes to combine.');
  }

  const nightlyBreakdown = firstQuote.nightlyBreakdown.map((night, index) => {
    const matchingNights = quotes.map((quote) => quote.nightlyBreakdown[index]);
    const basePrice = matchingNights.reduce((total, item) => total + (item?.basePrice ?? 0), 0);
    const finalPrice = matchingNights.reduce((total, item) => total + (item?.finalPrice ?? 0), 0);
    const adjustmentAmount = matchingNights.reduce(
      (total, item) => total + (item?.adjustmentAmount ?? 0),
      0,
    );
    const adjustmentBasisPoints =
      basePrice > 0 ? Math.round((adjustmentAmount / basePrice) * 10_000) : 0;

    return {
      date: night.date,
      dayType: night.dayType,
      seasonType: night.seasonType,
      basePrice: Number(basePrice.toFixed(2)),
      adjustmentAmount: Number(adjustmentAmount.toFixed(2)),
      adjustmentBasisPoints,
      finalPrice: Number(finalPrice.toFixed(2)),
      adjustmentNames: matchingNights.flatMap((item) => item?.adjustmentNames ?? []),
    };
  });

  const baseNightTotal = quotes.reduce((total, quote) => total + quote.baseNightTotal, 0);
  const nightTotal = quotes.reduce((total, quote) => total + quote.nightTotal, 0);
  const adjustmentTotal = quotes.reduce((total, quote) => total + quote.adjustmentTotal, 0);
  const cleaningFee = quotes.reduce((total, quote) => total + quote.cleaningFee, 0);
  const totalPrice = quotes.reduce((total, quote) => total + quote.totalPrice, 0);

  return {
    listingId: COMBINED_LISTING_ID,
    listingTitle: COMBINED_LISTING_TITLE,
    currency: firstQuote.currency,
    nights: firstQuote.nights,
    baseNightTotal: Number(baseNightTotal.toFixed(2)),
    nightTotal: Number(nightTotal.toFixed(2)),
    adjustmentTotal: Number(adjustmentTotal.toFixed(2)),
    cleaningFee: Number(cleaningFee.toFixed(2)),
    totalPrice: Number(totalPrice.toFixed(2)),
    nightlyBreakdown,
  };
}

export async function simulateAdminPricing(
  input: AdminPricingSimulationInput,
): Promise<AdminPricingSimulationResult> {
  if (!assertAdminSession()) {
    return { success: false, error: 'Not authenticated' };
  }

  const validationError = validateSimulationInput(input);

  if (validationError) {
    return { success: false, error: validationError };
  }

  try {
    if (input.listingId === COMBINED_LISTING_ID) {
      const quotes = await Promise.all(
        ['penthouse', 'studio'].map(async (listingId) =>
          mapQuoteToSimulation(
            await getPricingBreakdown({
              listingId,
              checkIn: input.checkIn,
              checkOut: input.checkOut,
            }),
          ),
        ),
      );

      return {
        success: true,
        quote: combineSimulationQuotes(quotes),
      };
    }

    const quote = await getPricingBreakdown({
      listingId: input.listingId,
      checkIn: input.checkIn,
      checkOut: input.checkOut,
    });

    return {
      success: true,
      quote: mapQuoteToSimulation(quote),
    };
  } catch (error) {
    console.error('Admin pricing simulation failed:', error);
    return {
      success: false,
      error: getActionErrorMessage(error, 'Failed to simulate pricing'),
    };
  }
}

export async function saveAdminQuoteHistory(input: SaveAdminQuoteHistoryInput) {
  if (!assertAdminSession()) {
    return { success: false, error: 'Not authenticated' };
  }

  try {
    const result = await saveAdminQuoteHistoryEntry(
      input,
      getAdminPricingWriteClient(),
    );
    revalidatePath('/admin');
    revalidatePath('/en/admin');

    return {
      success: true,
      history: result.history,
    };
  } catch (error) {
    console.error('Admin quote history save failed:', error);
    return {
      success: false,
      error: getActionErrorMessage(error, 'Failed to save admin quote history'),
    };
  }
}
