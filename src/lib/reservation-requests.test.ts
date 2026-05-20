import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildPendingReservationRow,
  savePendingReservationRequest,
  type ReservationInsertRow,
} from './reservation-requests';

const LISTING_ID = 'listing-1';

test('builds a pending reservation row from the calculated quote', () => {
  const row = buildPendingReservationRow(
    {
      listingId: LISTING_ID,
      checkIn: '2026-05-13',
      checkOut: '2026-05-15',
      guestName: 'Ada Lovelace',
      guestEmail: 'ada@example.com',
      guestPhone: '+972501234567',
      guestsCount: 1,
    },
    {
      available: true,
      listing_id: LISTING_ID,
      nights: 2,
      nightly_breakdown: [],
      night_total: 500,
      cleaning_fee: 75,
      total_price: 575,
      currency: 'ILS',
    },
  );

  assert.deepEqual(row, {
    listing_id: LISTING_ID,
    check_in: '2026-05-13',
    check_out: '2026-05-15',
    nights: 2,
    guest_name: 'Ada Lovelace',
    guest_email: 'ada@example.com',
    guest_phone: '+972501234567',
    guests_count: 1,
    night_total: 500,
    cleaning_fee: 75,
    total_price: 575,
    currency: 'ILS',
    status: 'pending',
  } satisfies ReservationInsertRow);
});

test('saves a pending reservation request with server-calculated pricing', async () => {
  const { client, insertedRows } = createMockSupabase({
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
        target_price: '200',
      },
      {
        listing_id: LISTING_ID,
        season_type: 'current',
        day_type: 'weekend',
        min_nights: 1,
        max_nights: null,
        target_price: '300',
      },
    ],
    season_date_overrides: [],
    season_periods: [],
    reservations: [],
  });

  const result = await savePendingReservationRequest(
    {
      listingId: LISTING_ID,
      checkIn: '2026-05-13',
      checkOut: '2026-05-15',
      guestName: 'Ada Lovelace',
      guestEmail: 'ada@example.com',
      guestPhone: '+972501234567',
      guestsCount: 2,
    },
    client as never,
  );

  assert.equal(result.quote.night_total, 500);
  assert.equal(result.quote.cleaning_fee, 75);
  assert.equal(result.quote.total_price, 575);
  assert.deepEqual(insertedRows.reservations, [
    {
      listing_id: LISTING_ID,
      check_in: '2026-05-13',
      check_out: '2026-05-15',
      nights: 2,
      guest_name: 'Ada Lovelace',
      guest_email: 'ada@example.com',
      guest_phone: '+972501234567',
      guests_count: 2,
      night_total: 500,
      cleaning_fee: 75,
      total_price: 575,
      currency: 'ILS',
      status: 'pending',
    },
  ]);
});

type TableRows = Record<string, Array<Record<string, unknown>>>;

interface QueryResult {
  data: Array<Record<string, unknown>>;
  error: null;
}

class MockSupabaseQuery {
  private rows: Array<Record<string, unknown>>;

  constructor(
    private readonly tableName: string,
    rows: Array<Record<string, unknown>>,
    private readonly filters: string[],
    private readonly insertedRows: TableRows,
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

  insert(row: Record<string, unknown>) {
    this.insertedRows[this.tableName] = this.insertedRows[this.tableName] ?? [];
    this.insertedRows[this.tableName].push(row);

    return Promise.resolve({
      data: null,
      error: null,
    });
  }

  maybeSingle() {
    return Promise.resolve({
      data: this.rows[0] ?? null,
      error: null,
    });
  }

  then<TResult1 = QueryResult, TResult2 = never>(
    onfulfilled?: ((value: QueryResult) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ) {
    return Promise.resolve(this.result()).then(onfulfilled, onrejected);
  }

  private result(): QueryResult {
    return {
      data: this.rows,
      error: null,
    };
  }
}

function createMockSupabase(tables: TableRows) {
  const filters: string[] = [];
  const insertedRows: TableRows = {};

  return {
    filters,
    insertedRows,
    client: {
      from(tableName: string) {
        return new MockSupabaseQuery(
          tableName,
          tables[tableName] ?? [],
          filters,
          insertedRows,
        );
      },
    },
  };
}
