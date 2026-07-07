import assert from 'node:assert/strict';
import test from 'node:test';

import {
  applyPricingAdjustments,
  getDaysBeforeCheckIn,
  selectPricingAdjustmentRules,
  type PricingAdjustmentRule,
} from './pricing-adjustments';

const LISTING_ID = 'listing-1';

const baseRule = {
  id: 'rule',
  listingId: LISTING_ID,
  name: 'Rule',
  isActive: true,
  priority: 10,
  adjustmentBasisPoints: -1000,
  minDaysBeforeCheckIn: null,
  maxDaysBeforeCheckIn: null,
  minNights: null,
  maxNights: null,
  seasonType: null,
  dayType: null,
  startsOn: null,
  endsOn: null,
} satisfies Omit<PricingAdjustmentRule, 'ruleType'>;

test('counts days before check-in from ISO dates', () => {
  assert.equal(getDaysBeforeCheckIn('2026-05-10', '2026-05-05'), 5);
  assert.equal(getDaysBeforeCheckIn('2026-05-10', '2026-05-10'), 0);
});

test('selects one matching pricing adjustment per rule type by priority and specificity', () => {
  const rules = [
    {
      ...baseRule,
      id: 'global-last-minute',
      listingId: null,
      ruleType: 'last_minute',
      priority: 1,
      maxDaysBeforeCheckIn: 7,
      adjustmentBasisPoints: -500,
    },
    {
      ...baseRule,
      id: 'listing-last-minute',
      ruleType: 'last_minute',
      priority: 1,
      maxDaysBeforeCheckIn: 7,
      adjustmentBasisPoints: -1000,
    },
    {
      ...baseRule,
      id: 'weekly',
      ruleType: 'duration',
      minNights: 7,
      adjustmentBasisPoints: -700,
    },
    {
      ...baseRule,
      id: 'early-booking',
      ruleType: 'early_booking',
      minDaysBeforeCheckIn: 60,
      adjustmentBasisPoints: -400,
    },
  ] satisfies PricingAdjustmentRule[];

  const selectedRules = selectPricingAdjustmentRules(rules, {
    listingId: LISTING_ID,
    nightDate: '2026-05-11',
    checkIn: '2026-05-10',
    quoteDate: '2026-05-05',
    totalNights: 7,
    seasonType: 'current',
    dayType: 'weekday',
  });

  assert.deepEqual(
    selectedRules.map((rule) => rule.id),
    ['weekly', 'listing-last-minute'],
  );
});

test('filters inactive, listing, date, season, day, stay length, and lead-time mismatches', () => {
  const rules = [
    { ...baseRule, id: 'inactive', ruleType: 'duration', isActive: false },
    { ...baseRule, id: 'other-listing', ruleType: 'duration', listingId: 'listing-2' },
    { ...baseRule, id: 'future-window', ruleType: 'duration', startsOn: '2026-06-01' },
    { ...baseRule, id: 'wrong-season', ruleType: 'duration', seasonType: 'high' },
    { ...baseRule, id: 'wrong-day', ruleType: 'duration', dayType: 'weekend' },
    { ...baseRule, id: 'too-short', ruleType: 'duration', minNights: 8 },
    { ...baseRule, id: 'too-early', ruleType: 'last_minute', maxDaysBeforeCheckIn: 2 },
    { ...baseRule, id: 'match', ruleType: 'duration', minNights: 7 },
  ] satisfies PricingAdjustmentRule[];

  const selectedRules = selectPricingAdjustmentRules(rules, {
    listingId: LISTING_ID,
    nightDate: '2026-05-11',
    checkIn: '2026-05-10',
    quoteDate: '2026-05-05',
    totalNights: 7,
    seasonType: 'current',
    dayType: 'weekday',
  });

  assert.deepEqual(
    selectedRules.map((rule) => rule.id),
    ['match'],
  );
});

test('applies signed basis points additively to the base nightly amount', () => {
  const adjusted = applyPricingAdjustments(200, [
    {
      ...baseRule,
      id: 'last-minute-10-percent',
      name: 'Last minute',
      ruleType: 'last_minute',
      adjustmentBasisPoints: -1000,
    },
    {
      ...baseRule,
      id: 'short-stay-surcharge',
      name: 'Short stay surcharge',
      ruleType: 'duration',
      adjustmentBasisPoints: 500,
    },
  ]);

  assert.deepEqual(adjusted, {
    nightlyPrice: 190,
    adjustmentAmount: -10,
    appliedAdjustments: [
      {
        id: 'last-minute-10-percent',
        name: 'Last minute',
        rule_type: 'last_minute',
        adjustment_basis_points: -1000,
      },
      {
        id: 'short-stay-surcharge',
        name: 'Short stay surcharge',
        rule_type: 'duration',
        adjustment_basis_points: 500,
      },
    ],
  });
});
