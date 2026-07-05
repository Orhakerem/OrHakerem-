import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildAdminQuoteHistoryRow,
  buildPricingAdjustmentRuleRow,
  saveAdminQuoteHistoryEntry,
  savePricingAdjustmentRule,
  type AdminQuoteHistoryRow,
  type PricingAdjustmentRuleUpsertRow,
} from './admin-pricing';
import { DEFAULT_RESERVATION_QUOTE } from './reservation-quote';

test('buildPricingAdjustmentRuleRow normalizes editable pricing rule fields', () => {
  const row = buildPricingAdjustmentRuleRow({
    listingId: 'penthouse',
    name: ' Early booking discount ',
    startsOn: '2026-08-01',
    endsOn: '2026-08-31',
    ruleType: 'early_booking',
    adjustmentBasisPoints: -1250,
    dayType: 'weekend',
    seasonType: 'high',
    minDaysBeforeCheckIn: '30',
    maxDaysBeforeCheckIn: '90',
    minNights: '2',
    maxNights: '5',
    priority: 10,
    isActive: false,
    notes: ' Applies only to manually approved events ',
  });

  assert.deepEqual(row, {
    listing_id: 'penthouse',
    name: 'Early booking discount',
    starts_on: '2026-08-01',
    ends_on: '2026-08-31',
    rule_type: 'early_booking',
    adjustment_basis_points: -1250,
    day_type: 'weekend',
    season_type: 'high',
    min_days_before_check_in: 30,
    max_days_before_check_in: 90,
    min_nights: 2,
    max_nights: 5,
    priority: 10,
    is_active: false,
    notes: 'Applies only to manually approved events',
  } satisfies PricingAdjustmentRuleUpsertRow);
});

test('buildPricingAdjustmentRuleRow rejects invalid date and stay ranges', () => {
  assert.throws(
    () =>
      buildPricingAdjustmentRuleRow({
        listingId: 'penthouse',
        name: 'Invalid range',
        startsOn: '2026-09-02',
        endsOn: '2026-09-01',
        ruleType: 'duration',
        adjustmentBasisPoints: 100,
        minNights: 4,
        maxNights: 2,
      }),
    /End date must be on or after start date/,
  );
});

test('savePricingAdjustmentRule upserts the normalized rule through Supabase admin', async () => {
  const { client, upsertedRows } = createMockSupabase();

  const result = await savePricingAdjustmentRule(
    {
      id: '2dbb1289-9ddc-4f68-b3cf-5704e1d88f90',
      listingId: '',
      name: 'Last minute discount',
      ruleType: 'last_minute',
      adjustmentBasisPoints: -500,
      maxDaysBeforeCheckIn: 7,
    },
    client,
  );

  assert.deepEqual(upsertedRows.pricing_adjustment_rules, [
      {
        id: '2dbb1289-9ddc-4f68-b3cf-5704e1d88f90',
        listing_id: null,
        name: 'Last minute discount',
        rule_type: 'last_minute',
        is_active: true,
        priority: 0,
        adjustment_basis_points: -500,
        min_days_before_check_in: null,
        max_days_before_check_in: 7,
        day_type: null,
        season_type: null,
        starts_on: null,
        ends_on: null,
        min_nights: null,
        max_nights: null,
        notes: null,
      },
  ]);
  assert.equal(result.rule.rule_type, 'last_minute');
});

test('buildAdminQuoteHistoryRow stores searchable fields and the full quote payload', () => {
  const row = buildAdminQuoteHistoryRow({
    quote: {
      ...DEFAULT_RESERVATION_QUOTE,
      reservationNumber: 'OH-2026-ADA',
      guestName: 'Ada Lovelace',
      customerEmail: 'ada@example.com',
      apartment: 'Penthouse + Studio',
      checkInDate: '03 / 09 / 2026',
      checkOutDate: '06 / 09 / 2026',
      nights: '3',
      total: '4,250 ₪',
      currency: 'NIS (₪)',
    },
    resendEmailId: 'email_123',
  });

  assert.deepEqual(row, {
    reservation_number: 'OH-2026-ADA',
    customer_email: 'ada@example.com',
    guest_name: 'Ada Lovelace',
    apartment: 'Penthouse + Studio',
    check_in: '2026-09-03',
    check_out: '2026-09-06',
    nights: 3,
    total_amount: 4250,
    total_label: '4,250 ₪',
    currency_label: 'NIS (₪)',
    resend_email_id: 'email_123',
    send_status: 'sent',
    sent_at: row.sent_at,
    quote_payload: row.quote_payload,
  } satisfies AdminQuoteHistoryRow);
  assert.match(row.sent_at, /^\d{4}-\d{2}-\d{2}T/);
  assert.equal(row.quote_payload.reservationNumber, 'OH-2026-ADA');
});

test('saveAdminQuoteHistoryEntry inserts the history row through Supabase admin', async () => {
  const { client, insertedRows } = createMockSupabase();

  const result = await saveAdminQuoteHistoryEntry(
    {
      quote: {
        ...DEFAULT_RESERVATION_QUOTE,
        reservationNumber: 'OH-2026-HISTORY',
        guestName: 'History User',
        customerEmail: 'history@example.com',
      },
      resendEmailId: 'email_history',
    },
    client,
  );

  assert.equal(insertedRows.admin_quote_history?.length, 1);
  assert.equal(
    insertedRows.admin_quote_history?.[0]?.reservation_number,
    'OH-2026-HISTORY',
  );
  assert.equal(result.history.customer_email, 'history@example.com');
});

type TableRows = Record<string, Array<Record<string, unknown>>>;

class MockSupabaseQuery {
  constructor(
    private readonly tableName: string,
    private readonly insertedRows: TableRows,
    private readonly upsertedRows: TableRows,
    private resultRow: Record<string, unknown> | null = null,
  ) {}

  select() {
    return this;
  }

  single() {
    return Promise.resolve({
      data: this.resultRow,
      error: null,
    });
  }

  insert(row: Record<string, unknown>) {
    this.insertedRows[this.tableName] = this.insertedRows[this.tableName] ?? [];
    this.insertedRows[this.tableName].push(row);
    this.resultRow = row;

    return this;
  }

  upsert(row: Record<string, unknown>) {
    this.upsertedRows[this.tableName] = this.upsertedRows[this.tableName] ?? [];
    this.upsertedRows[this.tableName].push(row);
    this.resultRow = row;

    return this;
  }
}

function createMockSupabase() {
  const insertedRows: TableRows = {};
  const upsertedRows: TableRows = {};

  return {
    insertedRows,
    upsertedRows,
    client: {
      from(tableName: string) {
        return new MockSupabaseQuery(tableName, insertedRows, upsertedRows);
      },
    },
  };
}
