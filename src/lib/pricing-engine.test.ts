import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildPricingBreakdown,
  fetchPricingListing,
  fetchPricingTiers,
  getPricingBreakdown,
  selectPricingTier,
  type PricingTier,
} from './pricing-engine';
import {
  PricingDataFetchError,
  PricingListingNotFoundError,
  PricingTierNotFoundError,
} from './pricing-errors';
import type { SeasonRules } from './pricing-seasons';

const LISTING_ID = 'listing-1';

const baseTier = {
  listingId: LISTING_ID,
  seasonType: 'current',
  dayType: 'weekday',
  minNights: 1,
  maxNights: null,
  targetPrice: 100,
} satisfies PricingTier;

test('selects the matching pricing tier for the stay length and most specific range', () => {
  const selectedTier = selectPricingTier(
    [
      {
        ...baseTier,
        minNights: 1,
        maxNights: null,
        targetPrice: 120,
      },
      {
        ...baseTier,
        minNights: 4,
        maxNights: null,
        targetPrice: 100,
      },
      {
        ...baseTier,
        minNights: 4,
        maxNights: 10,
        targetPrice: 90,
      },
    ],
    {
      listingId: LISTING_ID,
      seasonType: 'current',
      dayType: 'weekday',
      totalNights: 7,
    },
  );

  assert.equal(selectedTier.targetPrice, 90);
  assert.equal(selectedTier.minNights, 4);
  assert.equal(selectedTier.maxNights, 10);
});

test('reports missing pricing tiers with lookup context', () => {
  assert.throws(
    () =>
      selectPricingTier([], {
        listingId: LISTING_ID,
        seasonType: 'high',
        dayType: 'weekend',
        totalNights: 6,
      }),
    (error: unknown) => {
      assert.ok(error instanceof PricingTierNotFoundError);
      assert.equal(error.listingId, LISTING_ID);
      assert.equal(error.seasonType, 'high');
      assert.equal(error.dayType, 'weekend');
      assert.equal(error.totalNights, 6);
      return true;
    },
  );
});

test('builds a detailed nightly breakdown with day type, season priority, and totals', () => {
  const seasonRules = {
    dateOverrides: [
      {
        date: '2026-05-14',
        seasonType: 'high',
      },
    ],
    periods: [
      {
        name: 'May low season',
        startDate: '2026-05-01',
        endDate: '2026-05-31',
        seasonType: 'low',
      },
    ],
  } satisfies SeasonRules;

  const breakdown = buildPricingBreakdown(
    {
      listingId: LISTING_ID,
      checkIn: '2026-05-13',
      checkOut: '2026-05-16',
    },
    {
      id: LISTING_ID,
      cleaningFee: 50,
      currency: 'ILS',
    },
    [
      {
        listingId: LISTING_ID,
        seasonType: 'low',
        dayType: 'weekday',
        minNights: 1,
        maxNights: 3,
        targetPrice: 100,
      },
      {
        listingId: LISTING_ID,
        seasonType: 'low',
        dayType: 'weekend',
        minNights: 1,
        maxNights: 3,
        targetPrice: 160,
      },
      {
        listingId: LISTING_ID,
        seasonType: 'high',
        dayType: 'weekend',
        minNights: 1,
        maxNights: 3,
        targetPrice: 250,
      },
    ],
    seasonRules,
  );

  assert.deepEqual(
    breakdown.nightly_breakdown.map((night) => ({
      date: night.date,
      day_type: night.day_type,
      season_type: night.season_type,
      nightly_price: night.nightly_price,
    })),
    [
      {
        date: '2026-05-13',
        day_type: 'weekday',
        season_type: 'low',
        nightly_price: 100,
      },
      {
        date: '2026-05-14',
        day_type: 'weekend',
        season_type: 'high',
        nightly_price: 250,
      },
      {
        date: '2026-05-15',
        day_type: 'weekend',
        season_type: 'low',
        nightly_price: 160,
      },
    ],
  );
  assert.equal(breakdown.available, true);
  assert.equal(breakdown.nights, 3);
  assert.equal(breakdown.nightly_subtotal, 510);
  assert.equal(breakdown.discount_amount, 0);
  assert.equal(breakdown.discount_label, null);
  assert.equal(breakdown.night_total, 510);
  assert.equal(breakdown.cleaning_fee, 50);
  assert.equal(breakdown.total_price, 560);
  assert.equal(breakdown.currency, 'ILS');
});

test('infers a long stay discount from the baseline nightly tier', () => {
  const breakdown = buildPricingBreakdown(
    {
      listingId: LISTING_ID,
      checkIn: '2026-05-16',
      checkOut: '2026-05-20',
    },
    {
      id: LISTING_ID,
      cleaningFee: 50,
      currency: 'ILS',
    },
    [
      {
        listingId: LISTING_ID,
        seasonType: 'current',
        dayType: 'weekday',
        minNights: 1,
        maxNights: null,
        targetPrice: 120,
      },
      {
        listingId: LISTING_ID,
        seasonType: 'current',
        dayType: 'weekday',
        minNights: 4,
        maxNights: null,
        targetPrice: 90,
      },
    ],
    {
      dateOverrides: [],
      periods: [],
    },
  );

  assert.equal(breakdown.nights, 4);
  assert.equal(breakdown.nightly_subtotal, 480);
  assert.equal(breakdown.discount_amount, 120);
  assert.equal(breakdown.discount_label, 'Long stay discount for 4 nights');
  assert.equal(breakdown.night_total, 360);
  assert.equal(breakdown.cleaning_fee, 50);
  assert.equal(breakdown.total_price, 410);
});

test('fetches listing, pricing tiers, and season rules from Supabase before pricing', async () => {
  const { client, selectedTables, filters } = createMockSupabase({
    listings: [
      {
        id: LISTING_ID,
        cleaning_fee: '75',
        currency: 'ils',
      },
    ],
    pricing_tiers: [
      {
        listing_id: LISTING_ID,
        season_type: 'current',
        day_type: 'weekday',
        min_nights: 1,
        max_nights: null,
        target_price: '300',
      },
    ],
    season_date_overrides: [],
    season_periods: [],
  });

  const breakdown = await getPricingBreakdown(
    {
      listingId: LISTING_ID,
      checkIn: '2026-05-16',
      checkOut: '2026-05-18',
    },
    client as never,
  );

  assert.deepEqual(selectedTables.sort(), [
    'listings',
    'pricing_tiers',
    'season_date_overrides',
    'season_periods',
  ]);
  assert.deepEqual(filters.sort(), [
    'listings.id.listing-1',
    'pricing_tiers.listing_id.listing-1',
    'season_date_overrides.is_active.true',
    'season_periods.is_active.true',
  ]);
  assert.equal(breakdown.listing_id, LISTING_ID);
  assert.equal(breakdown.nights, 2);
  assert.equal(breakdown.nightly_subtotal, 600);
  assert.equal(breakdown.discount_amount, 0);
  assert.equal(breakdown.discount_label, null);
  assert.equal(breakdown.night_total, 600);
  assert.equal(breakdown.cleaning_fee, 75);
  assert.equal(breakdown.total_price, 675);
  assert.equal(breakdown.currency, 'ILS');
});

test('reports missing listings as a typed pricing error', async () => {
  const { client } = createMockSupabase({
    listings: [],
  });

  await assert.rejects(
    () => fetchPricingListing(LISTING_ID, client as never),
    (error: unknown) => {
      assert.ok(error instanceof PricingListingNotFoundError);
      assert.equal(error.listingId, LISTING_ID);
      return true;
    },
  );
});

test('reports Supabase fetch failures as typed pricing errors', async () => {
  const { client } = createMockSupabase(
    {
      pricing_tiers: [],
    },
    {
      pricing_tiers: 'permission denied for table pricing_tiers',
    },
  );

  await assert.rejects(
    () => fetchPricingTiers(LISTING_ID, client as never),
    (error: unknown) => {
      assert.ok(error instanceof PricingDataFetchError);
      assert.equal(error.tableName, 'pricing_tiers');
      assert.match(error.message, /permission denied/);
      return true;
    },
  );
});

type TableRows = Record<string, Array<Record<string, unknown>>>;

interface SupabaseMockError {
  message: string;
}

interface QueryResult {
  data: Array<Record<string, unknown>>;
  error: SupabaseMockError | null;
}

class MockSupabaseQuery {
  private rows: Array<Record<string, unknown>>;

  constructor(
    private readonly tableName: string,
    rows: Array<Record<string, unknown>>,
    private readonly filters: string[],
    private readonly tableErrors: Record<string, string>,
  ) {
    this.rows = [...rows];
  }

  select() {
    return this;
  }

  eq(columnName: string, value: unknown) {
    this.filters.push(`${this.tableName}.${columnName}.${String(value)}`);
    this.rows = this.rows.filter((row) => row[columnName] === value);

    return this;
  }

  order(columnName: string) {
    this.rows = [...this.rows].sort((left, right) =>
      String(left[columnName] ?? '').localeCompare(String(right[columnName] ?? '')),
    );

    return Promise.resolve(this.result());
  }

  maybeSingle() {
    const tableError = this.tableErrors[this.tableName];

    return Promise.resolve({
      data: tableError ? null : this.rows[0] ?? null,
      error: tableError ? { message: tableError } : null,
    });
  }

  then<TResult1 = QueryResult, TResult2 = never>(
    onfulfilled?: ((value: QueryResult) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ) {
    return Promise.resolve(this.result()).then(onfulfilled, onrejected);
  }

  private result(): QueryResult {
    const tableError = this.tableErrors[this.tableName];

    return {
      data: tableError ? [] : this.rows,
      error: tableError ? { message: tableError } : null,
    };
  }
}

function createMockSupabase(
  tables: TableRows,
  tableErrors: Record<string, string> = {},
) {
  const selectedTables: string[] = [];
  const filters: string[] = [];

  return {
    selectedTables,
    filters,
    client: {
      from(tableName: string) {
        selectedTables.push(tableName);

        return new MockSupabaseQuery(
          tableName,
          tables[tableName] ?? [],
          filters,
          tableErrors,
        );
      },
    },
  };
}
