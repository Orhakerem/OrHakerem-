import assert from 'node:assert/strict';
import test from 'node:test';

import {
  countNights,
  countPricingNightKinds,
  getClassifiedPricingNights,
  getNightsBetween,
  getPricingNightKind,
  isWeekdayNight,
  isWeekendNight,
} from './pricing-date-helpers';

test('returns every stayed night between check-in and check-out', () => {
  assert.deepEqual(getNightsBetween('2026-05-13', '2026-05-16'), [
    '2026-05-13',
    '2026-05-14',
    '2026-05-15',
  ]);
});

test('counts total nights in the stay range', () => {
  assert.equal(countNights('2026-05-13', '2026-05-16'), 3);
  assert.equal(countNights('2026-05-13', '2026-05-13'), 0);
});

test('classifies Thursday and Friday nights as weekend', () => {
  assert.equal(getPricingNightKind('2026-05-14'), 'weekend');
  assert.equal(getPricingNightKind('2026-05-15'), 'weekend');
  assert.equal(isWeekendNight('2026-05-14'), true);
  assert.equal(isWeekendNight('2026-05-15'), true);
});

test('classifies Saturday through Wednesday nights as weekday', () => {
  assert.equal(getPricingNightKind('2026-05-16'), 'weekday');
  assert.equal(getPricingNightKind('2026-05-17'), 'weekday');
  assert.equal(getPricingNightKind('2026-05-18'), 'weekday');
  assert.equal(getPricingNightKind('2026-05-19'), 'weekday');
  assert.equal(getPricingNightKind('2026-05-20'), 'weekday');
  assert.equal(isWeekdayNight('2026-05-16'), true);
});

test('returns reusable classified nights and kind counts', () => {
  assert.deepEqual(getClassifiedPricingNights('2026-05-13', '2026-05-16'), [
    { date: '2026-05-13', kind: 'weekday' },
    { date: '2026-05-14', kind: 'weekend' },
    { date: '2026-05-15', kind: 'weekend' },
  ]);

  assert.deepEqual(countPricingNightKinds('2026-05-13', '2026-05-16'), {
    total: 3,
    weekday: 1,
    weekend: 2,
  });
});
