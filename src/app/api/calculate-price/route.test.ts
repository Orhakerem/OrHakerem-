import assert from 'node:assert/strict';
import test from 'node:test';

import {
  MissingSupabaseEnvError,
  getPriceCalculationFailureError,
  PricingDataFetchError,
  PricingTierNotFoundError,
} from '@/lib/pricing-errors';

test('returns safe known pricing error codes for operational price failures', () => {
  assert.deepEqual(
    getPriceCalculationFailureError(new MissingSupabaseEnvError('SUPABASE_URL')),
    {
      code: 'missing_supabase_env',
      message: 'Unable to calculate price',
    },
  );
  assert.deepEqual(
    getPriceCalculationFailureError(
      new PricingDataFetchError('season_periods', 'permission denied'),
    ),
    {
      code: 'pricing_data_fetch_failed',
      message: 'Unable to calculate price',
    },
  );
  assert.deepEqual(
    getPriceCalculationFailureError(
      new PricingTierNotFoundError('studio', 'high', 'weekday', 10),
    ),
    {
      code: 'pricing_tier_not_found',
      message: 'Unable to calculate price',
    },
  );
});

test('returns the generic public error code for unexpected price failures', () => {
  assert.deepEqual(getPriceCalculationFailureError(new Error('database exploded')), {
    code: 'price_calculation_failed',
    message: 'Unable to calculate price',
  });
});
