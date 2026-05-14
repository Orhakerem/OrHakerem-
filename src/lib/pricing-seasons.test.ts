import assert from 'node:assert/strict';
import test from 'node:test';

import {
  fetchActiveSeasonPeriods,
  getSeasonTypeForDate,
  resolveSeasonTypeForDate,
  type SeasonRules,
} from './pricing-seasons';
import { PricingDataFetchError } from './pricing-errors';

const validationRules = {
  dateOverrides: [
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

test('resolves July dates as high season from season periods', () => {
  assert.equal(resolveSeasonTypeForDate('2026-07-01', validationRules), 'high');
  assert.equal(resolveSeasonTypeForDate('2026-07-15', validationRules), 'high');
  assert.equal(resolveSeasonTypeForDate('2026-07-31', validationRules), 'high');
});

test('resolves dates through June 30 2026 as low season from season periods', () => {
  assert.equal(resolveSeasonTypeForDate('2026-06-01', validationRules), 'low');
  assert.equal(resolveSeasonTypeForDate('2026-06-30', validationRules), 'low');
});

test('resolves September holiday overrides before September low season periods', () => {
  assert.equal(resolveSeasonTypeForDate('2026-09-12', validationRules), 'high');
});

test('resolves other September dates as low season from season periods', () => {
  assert.equal(resolveSeasonTypeForDate('2026-09-10', validationRules), 'low');
  assert.equal(resolveSeasonTypeForDate('2026-09-20', validationRules), 'low');
});

test('falls back to current when no override or period matches', () => {
  assert.equal(resolveSeasonTypeForDate('2026-08-15', validationRules), 'current');
});

test('fetches reusable Supabase season rules before resolving a date', async () => {
  const tableResponses = {
    season_date_overrides: [
      {
        date: '2026-09-12',
        season_type: 'high',
      },
    ],
    season_periods: [
      {
        name: 'September low season',
        start_date: '2026-09-01',
        end_date: '2026-09-30',
        season_type: 'low',
      },
    ],
  };

  const selectedTables: string[] = [];
  const activeFilters: string[] = [];

  const client = {
    from(tableName: keyof typeof tableResponses) {
      selectedTables.push(tableName);

      return {
        select() {
          return {
            eq(columnName: string, value: boolean) {
              activeFilters.push(`${tableName}.${columnName}.${value}`);

              return {
                order() {
                  return Promise.resolve({
                    data: tableResponses[tableName],
                    error: null,
                  });
                },
              };
            },
          };
        },
      };
    },
  };

  await assert.doesNotReject(async () => {
    assert.equal(await getSeasonTypeForDate('2026-09-12', client as never), 'high');
  });
  assert.deepEqual(selectedTables.sort(), ['season_date_overrides', 'season_periods']);
  assert.deepEqual(activeFilters.sort(), [
    'season_date_overrides.is_active.true',
    'season_periods.is_active.true',
  ]);
});

test('reports season period fetch failures as typed pricing errors', async () => {
  const client = {
    from(tableName: string) {
      return {
        select() {
          return {
            eq() {
              return {
                order() {
                  return Promise.resolve({
                    data: [],
                    error: {
                      message: `permission denied for table ${tableName}`,
                    },
                  });
                },
              };
            },
          };
        },
      };
    },
  };

  await assert.rejects(
    () => fetchActiveSeasonPeriods(client as never),
    (error: unknown) => {
      assert.ok(error instanceof PricingDataFetchError);
      assert.equal(error.tableName, 'season_periods');
      assert.match(error.message, /permission denied/);
      return true;
    },
  );
});
