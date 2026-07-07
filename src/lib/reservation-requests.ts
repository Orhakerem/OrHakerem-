import type { SupabaseClient } from '@supabase/supabase-js';

import { getBookablePropertyIdFromListingId } from './bookable-properties';
import { getPricingBreakdown, type PricingBreakdown } from './pricing-engine';

export interface PendingReservationRequestInput {
  listingId: string;
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestsCount: number;
}

export interface ReservationInsertRow {
  listing_id: string;
  check_in: string;
  check_out: string;
  nights: number;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  guests_count: number;
  night_total: number;
  cleaning_fee: number;
  total_price: number;
  currency: string;
  status: 'pending';
}

export type ReservationRequestStoredRow = ReservationInsertRow & {
  id: string;
  created_at?: string | null;
};

export class ReservationAvailabilityError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ReservationAvailabilityError';
  }
}

async function getSupabaseClient() {
  const { supabase } = await import('./supabase');

  return supabase;
}

async function getReservationInsertClient() {
  const { getSupabaseAdminClient } = await import('./supabase-admin');

  return getSupabaseAdminClient();
}

function createInsertError(message: string) {
  return new Error(`Failed to save reservation request: ${message}`);
}

async function assertReservationCalendarAvailability(input: PendingReservationRequestInput) {
  const propertyId = getBookablePropertyIdFromListingId(input.listingId);

  if (!propertyId) {
    return;
  }

  const { fetchAdminCalendarSnapshot, validateAdminCalendarStay } = await import('./admin-calendar');
  const validation = validateAdminCalendarStay(await fetchAdminCalendarSnapshot(), {
    propertyIds: [propertyId],
    checkIn: input.checkIn,
    checkOut: input.checkOut,
  });

  if (!validation.available) {
    throw new ReservationAvailabilityError(
      validation.reasons[0] ?? 'Selected dates are not available.',
    );
  }
}

export function buildPendingReservationRow(
  input: PendingReservationRequestInput,
  quote: PricingBreakdown,
): ReservationInsertRow {
  return {
    listing_id: quote.listing_id,
    check_in: input.checkIn,
    check_out: input.checkOut,
    nights: quote.nights,
    guest_name: input.guestName,
    guest_email: input.guestEmail,
    guest_phone: input.guestPhone,
    guests_count: input.guestsCount,
    night_total: quote.night_total,
    cleaning_fee: quote.cleaning_fee,
    total_price: quote.total_price,
    currency: quote.currency,
    status: 'pending',
  };
}

export async function savePendingReservationRequest(
  input: PendingReservationRequestInput,
  client?: SupabaseClient,
) {
  const supabase = client ?? await getSupabaseClient();
  const insertClient = client ?? await getReservationInsertClient();
  const quote = await getPricingBreakdown(
    {
      listingId: input.listingId,
      checkIn: input.checkIn,
      checkOut: input.checkOut,
    },
    supabase,
  );
  await assertReservationCalendarAvailability(input);
  const row = buildPendingReservationRow(input, quote);
  const { data, error } = await insertClient
    .from('reservations')
    .insert(row)
    .select('id, listing_id, check_in, check_out, nights, guest_name, guest_email, guest_phone, guests_count, night_total, cleaning_fee, total_price, currency, status, created_at')
    .single();

  if (error) {
    throw createInsertError(error.message);
  }

  return {
    quote,
    row,
    request: data as ReservationRequestStoredRow,
  };
}
