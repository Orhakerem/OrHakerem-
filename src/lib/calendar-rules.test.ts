import assert from 'node:assert/strict';
import test from 'node:test';

import {
  detectCalendarConflicts,
  doDateRangesOverlap,
  getBlockedDatesFromEvents,
  validateCalendarStay,
  type CalendarEvent,
  type CalendarRule,
} from './calendar-rules';

const baseEvents: CalendarEvent[] = [
  {
    id: 'airbnb-1',
    propertyId: 'penthouse-jacuzzi',
    source: 'airbnb',
    type: 'booking',
    status: 'confirmed',
    checkIn: '2026-08-10',
    checkOut: '2026-08-13',
    title: 'Airbnb booking',
  },
  {
    id: 'manual-1',
    propertyId: 'cozy-studio',
    source: 'manual',
    type: 'maintenance',
    status: 'confirmed',
    checkIn: '2026-08-12',
    checkOut: '2026-08-14',
    title: 'Maintenance',
  },
];

function createRule(rule: Partial<CalendarRule> & Pick<CalendarRule, 'id' | 'ruleType'>): CalendarRule {
  return {
    propertyId: null,
    name: rule.id,
    isActive: true,
    priority: 0,
    severity: 'block',
    startsOn: null,
    endsOn: null,
    minNights: null,
    maxNights: null,
    allowedCheckInDays: null,
    allowedCheckOutDays: null,
    minDaysBeforeCheckIn: null,
    maxDaysBeforeCheckIn: null,
    gapSizeNights: null,
    bufferNights: null,
    appliesToCombination: false,
    reason: '',
    ...rule,
  };
}

test('treats date ranges as half-open', () => {
  assert.equal(
    doDateRangesOverlap(
      { checkIn: '2026-08-10', checkOut: '2026-08-12' },
      { checkIn: '2026-08-12', checkOut: '2026-08-14' },
    ),
    false,
  );
  assert.equal(
    doDateRangesOverlap(
      { checkIn: '2026-08-10', checkOut: '2026-08-13' },
      { checkIn: '2026-08-12', checkOut: '2026-08-14' },
    ),
    true,
  );
});

test('builds blocked nights from active events and unions combined properties', () => {
  assert.deepEqual(getBlockedDatesFromEvents(baseEvents, ['penthouse-jacuzzi']), [
    '2026-08-10',
    '2026-08-11',
    '2026-08-12',
  ]);
  assert.deepEqual(
    getBlockedDatesFromEvents(baseEvents, ['penthouse-jacuzzi', 'cozy-studio']),
    ['2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13'],
  );
});

test('blocks stays that overlap confirmed events', () => {
  const result = validateCalendarStay({
    propertyIds: ['penthouse-jacuzzi'],
    checkIn: '2026-08-09',
    checkOut: '2026-08-11',
    events: baseEvents,
    rules: [],
    todayIso: '2026-08-01',
  });

  assert.equal(result.available, false);
  assert.equal(result.severity, 'block');
  assert.deepEqual(result.conflictingEventIds, ['airbnb-1']);
});

test('applies min nights, allowed check-in day, and booking window rules', () => {
  const result = validateCalendarStay({
    propertyIds: ['penthouse-jacuzzi'],
    checkIn: '2026-09-08',
    checkOut: '2026-09-10',
    events: [],
    todayIso: '2026-07-01',
    rules: [
      createRule({
        id: 'min-3',
        ruleType: 'min_nights',
        minNights: 3,
        reason: 'High season minimum is 3 nights.',
      }),
      createRule({
        id: 'checkin-thu-fri',
        ruleType: 'allowed_check_in_days',
        allowedCheckInDays: [4, 5],
        severity: 'warn',
        reason: 'Prefer Thursday or Friday arrivals.',
      }),
      createRule({
        id: 'window-60',
        ruleType: 'booking_window',
        maxDaysBeforeCheckIn: 60,
        severity: 'warn',
        reason: 'More than 60 days ahead.',
      }),
    ],
  });

  assert.equal(result.available, false);
  assert.deepEqual(result.blockingRuleIds, ['min-3']);
  assert.deepEqual(result.warnings, [
    'Prefer Thursday or Friday arrivals.',
    'More than 60 days ahead.',
  ]);
});

test('warns on operational gaps and blocks cleaning buffers', () => {
  const events: CalendarEvent[] = [
    {
      id: 'direct-1',
      propertyId: 'penthouse-jacuzzi',
      source: 'direct',
      type: 'booking',
      status: 'confirmed',
      checkIn: '2026-09-10',
      checkOut: '2026-09-12',
      title: 'Direct',
    },
  ];

  const result = validateCalendarStay({
    propertyIds: ['penthouse-jacuzzi'],
    checkIn: '2026-09-07',
    checkOut: '2026-09-09',
    events,
    todayIso: '2026-09-01',
    rules: [
      createRule({
        id: 'gap-1',
        ruleType: 'gap_prevention',
        gapSizeNights: 1,
        severity: 'warn',
        reason: 'Creates a one-night gap.',
      }),
      createRule({
        id: 'buffer-2',
        ruleType: 'cleaning_buffer',
        bufferNights: 2,
        reason: 'Needs a cleaning buffer.',
      }),
    ],
  });

  assert.equal(result.available, false);
  assert.deepEqual(result.warnings, ['Creates a one-night gap.']);
  assert.deepEqual(result.blockingRuleIds, ['buffer-2']);
});

test('applies combination-specific rules only to combined stays', () => {
  const rule = createRule({
    id: 'combo-review',
    ruleType: 'property_combination',
    appliesToCombination: true,
    severity: 'warn',
    reason: 'Combined stays require admin review.',
  });

  assert.deepEqual(
    validateCalendarStay({
      propertyIds: ['penthouse-jacuzzi'],
      checkIn: '2026-09-01',
      checkOut: '2026-09-03',
      events: [],
      rules: [rule],
      todayIso: '2026-08-01',
    }).warnings,
    [],
  );

  assert.deepEqual(
    validateCalendarStay({
      propertyIds: ['penthouse-jacuzzi', 'cozy-studio'],
      checkIn: '2026-09-01',
      checkOut: '2026-09-03',
      events: [],
      rules: [rule],
      todayIso: '2026-08-01',
    }).warnings,
    ['Combined stays require admin review.'],
  );
});

test('detects calendar conflicts without treating back-to-back stays as conflicts', () => {
  const conflicts = detectCalendarConflicts([
    {
      id: 'a',
      propertyId: 'penthouse-jacuzzi',
      source: 'airbnb',
      type: 'booking',
      status: 'confirmed',
      checkIn: '2026-09-01',
      checkOut: '2026-09-04',
      title: 'A',
    },
    {
      id: 'b',
      propertyId: 'penthouse-jacuzzi',
      source: 'booking',
      type: 'booking',
      status: 'confirmed',
      checkIn: '2026-09-03',
      checkOut: '2026-09-05',
      title: 'B',
    },
    {
      id: 'c',
      propertyId: 'penthouse-jacuzzi',
      source: 'direct',
      type: 'booking',
      status: 'confirmed',
      checkIn: '2026-09-05',
      checkOut: '2026-09-06',
      title: 'C',
    },
  ]);

  assert.equal(conflicts.length, 1);
  assert.equal(conflicts[0].severity, 'critical');
  assert.deepEqual(conflicts[0].eventIds, ['a', 'b']);
});
