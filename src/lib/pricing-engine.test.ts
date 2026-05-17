import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildPricingBreakdown,
  fetchPricingListing,
  fetchPricingTiers,
  getPricingBreakdown,
  selectPricingTier,
  type PricingBreakdown,
  type PricingListing,
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

const pricingValidationSeasonRules = {
  dateOverrides: [
    {
      date: '2026-09-11',
      seasonType: 'high',
    },
    {
      date: '2026-09-12',
      seasonType: 'high',
    },
  ],
  periods: [
    {
      name: 'Low season through June',
      startDate: '2026-01-01',
      endDate: '2026-06-30',
      seasonType: 'low',
    },
    {
      name: 'July high season',
      startDate: '2026-07-01',
      endDate: '2026-07-31',
      seasonType: 'high',
    },
    {
      name: 'September low season',
      startDate: '2026-09-01',
      endDate: '2026-09-30',
      seasonType: 'low',
    },
  ],
} satisfies SeasonRules;

const pricingValidationListings = {
  studio: {
    id: 'studio',
    cleaningFee: 200,
    currency: 'ILS',
  },
  penthouse: {
    id: 'penthouse',
    cleaningFee: 750,
    currency: 'ILS',
  },
} satisfies Record<string, PricingListing>;

const pricingValidationTiers = [
  {
    listingId: 'studio',
    seasonType: 'low',
    dayType: 'weekday',
    minNights: 5,
    maxNights: null,
    targetPrice: 320,
  },
  {
    listingId: 'studio',
    seasonType: 'low',
    dayType: 'weekend',
    minNights: 5,
    maxNights: null,
    targetPrice: 400,
  },
  {
    listingId: 'studio',
    seasonType: 'high',
    dayType: 'weekday',
    minNights: 2,
    maxNights: 4,
    targetPrice: 530,
  },
  {
    listingId: 'studio',
    seasonType: 'high',
    dayType: 'weekend',
    minNights: 2,
    maxNights: 4,
    targetPrice: 550,
  },
  {
    listingId: 'studio',
    seasonType: 'high',
    dayType: 'weekday',
    minNights: 5,
    maxNights: null,
    targetPrice: 450,
  },
  {
    listingId: 'studio',
    seasonType: 'high',
    dayType: 'weekend',
    minNights: 5,
    maxNights: null,
    targetPrice: 550,
  },
  {
    listingId: 'penthouse',
    seasonType: 'low',
    dayType: 'weekday',
    minNights: 5,
    maxNights: null,
    targetPrice: 1800,
  },
  {
    listingId: 'penthouse',
    seasonType: 'low',
    dayType: 'weekend',
    minNights: 5,
    maxNights: null,
    targetPrice: 2200,
  },
  {
    listingId: 'penthouse',
    seasonType: 'high',
    dayType: 'weekday',
    minNights: 2,
    maxNights: 4,
    targetPrice: 2800,
  },
  {
    listingId: 'penthouse',
    seasonType: 'high',
    dayType: 'weekend',
    minNights: 2,
    maxNights: 4,
    targetPrice: 2500,
  },
  {
    listingId: 'penthouse',
    seasonType: 'high',
    dayType: 'weekday',
    minNights: 5,
    maxNights: null,
    targetPrice: 2300,
  },
  {
    listingId: 'penthouse',
    seasonType: 'high',
    dayType: 'weekend',
    minNights: 5,
    maxNights: null,
    targetPrice: 2500,
  },
] satisfies PricingTier[];

function assertNoImplicitDiscountFields(breakdown: PricingBreakdown) {
  assert.equal(
    Object.prototype.hasOwnProperty.call(breakdown, 'nightly_subtotal'),
    false,
  );
  assert.equal(
    Object.prototype.hasOwnProperty.call(breakdown, 'discount_amount'),
    false,
  );
  assert.equal(
    Object.prototype.hasOwnProperty.call(breakdown, 'discount_label'),
    false,
  );
}

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
  assertNoImplicitDiscountFields(breakdown);
  assert.equal(breakdown.night_total, 510);
  assert.equal(breakdown.cleaning_fee, 50);
  assert.equal(breakdown.total_price, 560);
  assert.equal(breakdown.currency, 'ILS');
});

test('uses duration-based tiers directly without a separate long stay discount', () => {
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
  assertNoImplicitDiscountFields(breakdown);
  assert.equal(breakdown.night_total, 360);
  assert.equal(breakdown.cleaning_fee, 50);
  assert.equal(breakdown.total_price, 410);
});

test('matches the business pricing examples without implicit discount fields', () => {
  const cases = [
    {
      name: 'Studio low season weekday',
      listingId: 'studio',
      checkIn: '2026-06-01',
      checkOut: '2026-06-06',
      expectedNightTotal: 1760,
      expectedCleaningFee: 200,
      expectedTotalPrice: 1960,
      expectedNights: [
        ['2026-06-01', 'weekday', 'low', 320],
        ['2026-06-02', 'weekday', 'low', 320],
        ['2026-06-03', 'weekday', 'low', 320],
        ['2026-06-04', 'weekend', 'low', 400],
        ['2026-06-05', 'weekend', 'low', 400],
      ],
    },
    {
      name: 'Penthouse low season weekday/weekend mix',
      listingId: 'penthouse',
      checkIn: '2026-06-01',
      checkOut: '2026-06-06',
      expectedNightTotal: 9800,
      expectedCleaningFee: 750,
      expectedTotalPrice: 10550,
      expectedNights: [
        ['2026-06-01', 'weekday', 'low', 1800],
        ['2026-06-02', 'weekday', 'low', 1800],
        ['2026-06-03', 'weekday', 'low', 1800],
        ['2026-06-04', 'weekend', 'low', 2200],
        ['2026-06-05', 'weekend', 'low', 2200],
      ],
    },
    {
      name: 'Studio high season',
      listingId: 'studio',
      checkIn: '2026-07-01',
      checkOut: '2026-07-06',
      expectedNightTotal: 2450,
      expectedCleaningFee: 200,
      expectedTotalPrice: 2650,
      expectedNights: [
        ['2026-07-01', 'weekday', 'high', 450],
        ['2026-07-02', 'weekend', 'high', 550],
        ['2026-07-03', 'weekend', 'high', 550],
        ['2026-07-04', 'weekday', 'high', 450],
        ['2026-07-05', 'weekday', 'high', 450],
      ],
    },
    {
      name: 'Penthouse high season',
      listingId: 'penthouse',
      checkIn: '2026-07-01',
      checkOut: '2026-07-06',
      expectedNightTotal: 11900,
      expectedCleaningFee: 750,
      expectedTotalPrice: 12650,
      expectedNights: [
        ['2026-07-01', 'weekday', 'high', 2300],
        ['2026-07-02', 'weekend', 'high', 2500],
        ['2026-07-03', 'weekend', 'high', 2500],
        ['2026-07-04', 'weekday', 'high', 2300],
        ['2026-07-05', 'weekday', 'high', 2300],
      ],
    },
    {
      name: 'Studio September holiday',
      listingId: 'studio',
      checkIn: '2026-09-11',
      checkOut: '2026-09-13',
      expectedNightTotal: 1080,
      expectedCleaningFee: 200,
      expectedTotalPrice: 1280,
      expectedNights: [
        ['2026-09-11', 'weekend', 'high', 550],
        ['2026-09-12', 'weekday', 'high', 530],
      ],
    },
    {
      name: 'Penthouse September holiday',
      listingId: 'penthouse',
      checkIn: '2026-09-11',
      checkOut: '2026-09-13',
      expectedNightTotal: 5300,
      expectedCleaningFee: 750,
      expectedTotalPrice: 6050,
      expectedNights: [
        ['2026-09-11', 'weekend', 'high', 2500],
        ['2026-09-12', 'weekday', 'high', 2800],
      ],
    },
  ] as const;

  for (const testCase of cases) {
    const breakdown = buildPricingBreakdown(
      {
        listingId: testCase.listingId,
        checkIn: testCase.checkIn,
        checkOut: testCase.checkOut,
      },
      pricingValidationListings[testCase.listingId],
      pricingValidationTiers,
      pricingValidationSeasonRules,
    );

    assertNoImplicitDiscountFields(breakdown);
    assert.equal(
      breakdown.nights,
      testCase.expectedNights.length,
      `${testCase.name} nights`,
    );
    assert.deepEqual(
      breakdown.nightly_breakdown.map((night) => [
        night.date,
        night.day_type,
        night.season_type,
        night.nightly_price,
      ]),
      testCase.expectedNights,
      `${testCase.name} nightly breakdown`,
    );
    assert.equal(
      breakdown.night_total,
      testCase.expectedNightTotal,
      `${testCase.name} night total`,
    );
    assert.equal(
      breakdown.cleaning_fee,
      testCase.expectedCleaningFee,
      `${testCase.name} cleaning fee`,
    );
    assert.equal(
      breakdown.total_price,
      testCase.expectedTotalPrice,
      `${testCase.name} total price`,
    );
  }
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
  assertNoImplicitDiscountFields(breakdown);
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
