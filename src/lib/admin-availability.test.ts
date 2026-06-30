import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ADMIN_APARTMENT_LABELS,
  getAdminApartmentBlockedDates,
  getAdminApartmentPropertyIds,
  getAdminBlockedStayNights,
  getAvailabilityStatusForAdminApartment,
  isAdminApartmentLabel,
  isAdminStayRangeAvailable,
} from './admin-availability';
import type {
  PropertyAvailabilityStatusMap,
  PropertyBlockedDatesMap,
} from './bookable-properties';

const blockedDatesByProperty: PropertyBlockedDatesMap = {
  'penthouse-jacuzzi': ['2026-07-10', '2026-07-03', '2026-07-04'],
  'cozy-studio': ['2026-07-08', '2026-07-04', '2026-07-02'],
};

test('supports exactly the admin apartment labels used by the back office', () => {
  assert.deepEqual(ADMIN_APARTMENT_LABELS, ['Penthouse', 'Studio', 'Penthouse + Studio']);

  assert.equal(isAdminApartmentLabel('Penthouse'), true);
  assert.equal(isAdminApartmentLabel('Studio'), true);
  assert.equal(isAdminApartmentLabel('Penthouse + Studio'), true);
  assert.equal(isAdminApartmentLabel('Luxury Penthouse'), false);
  assert.equal(isAdminApartmentLabel('penthouse-jacuzzi'), false);
});

test('maps admin apartment labels to bookable property ids', () => {
  assert.deepEqual(getAdminApartmentPropertyIds('Penthouse'), ['penthouse-jacuzzi']);
  assert.deepEqual(getAdminApartmentPropertyIds('Studio'), ['cozy-studio']);
  assert.deepEqual(getAdminApartmentPropertyIds('Penthouse + Studio'), [
    'penthouse-jacuzzi',
    'cozy-studio',
  ]);
});

test('resolves blocked dates from the property map and unions combined stays in ISO order', () => {
  assert.deepEqual(getAdminApartmentBlockedDates('Penthouse', blockedDatesByProperty), [
    '2026-07-03',
    '2026-07-04',
    '2026-07-10',
  ]);

  assert.deepEqual(getAdminApartmentBlockedDates('Studio', blockedDatesByProperty), [
    '2026-07-02',
    '2026-07-04',
    '2026-07-08',
  ]);

  assert.deepEqual(getAdminApartmentBlockedDates('Penthouse + Studio', blockedDatesByProperty), [
    '2026-07-02',
    '2026-07-03',
    '2026-07-04',
    '2026-07-08',
    '2026-07-10',
  ]);
});

test('reports the strictest availability status for combined apartment selection', () => {
  const availabilityStatusByProperty: PropertyAvailabilityStatusMap = {
    'penthouse-jacuzzi': 'ready',
    'cozy-studio': 'stale',
  };

  assert.equal(
    getAvailabilityStatusForAdminApartment('Penthouse', availabilityStatusByProperty),
    'ready',
  );
  assert.equal(
    getAvailabilityStatusForAdminApartment('Penthouse + Studio', availabilityStatusByProperty),
    'stale',
  );

  availabilityStatusByProperty['penthouse-jacuzzi'] = 'error';

  assert.equal(
    getAvailabilityStatusForAdminApartment('Penthouse + Studio', availabilityStatusByProperty),
    'error',
  );
});

test('treats stayed nights as check-in inclusive and check-out exclusive', () => {
  assert.deepEqual(
    getAdminBlockedStayNights('Penthouse', '2026-07-01', '2026-07-03', blockedDatesByProperty),
    [],
  );
  assert.equal(
    isAdminStayRangeAvailable('Penthouse', '2026-07-01', '2026-07-03', blockedDatesByProperty),
    true,
  );

  assert.deepEqual(
    getAdminBlockedStayNights('Penthouse', '2026-07-01', '2026-07-04', blockedDatesByProperty),
    ['2026-07-03'],
  );
  assert.equal(
    isAdminStayRangeAvailable('Penthouse', '2026-07-01', '2026-07-04', blockedDatesByProperty),
    false,
  );

  assert.equal(
    isAdminStayRangeAvailable('Penthouse', '2026-07-03', '2026-07-04', blockedDatesByProperty),
    false,
  );
});

test('checks combined stays against blocked dates from both apartments', () => {
  assert.equal(
    isAdminStayRangeAvailable(
      'Penthouse + Studio',
      '2026-07-01',
      '2026-07-02',
      blockedDatesByProperty,
    ),
    true,
  );

  assert.deepEqual(
    getAdminBlockedStayNights(
      'Penthouse + Studio',
      '2026-07-01',
      '2026-07-03',
      blockedDatesByProperty,
    ),
    ['2026-07-02'],
  );
  assert.equal(
    isAdminStayRangeAvailable(
      'Penthouse + Studio',
      '2026-07-01',
      '2026-07-03',
      blockedDatesByProperty,
    ),
    false,
  );
});

test('rejects empty, reversed, or invalid ranges', () => {
  assert.equal(
    isAdminStayRangeAvailable('Studio', '2026-07-01', '2026-07-01', blockedDatesByProperty),
    false,
  );
  assert.deepEqual(
    getAdminBlockedStayNights('Studio', '2026-07-01', '2026-07-01', blockedDatesByProperty),
    [],
  );

  assert.equal(
    isAdminStayRangeAvailable('Studio', '2026-07-02', '2026-07-01', blockedDatesByProperty),
    false,
  );
  assert.equal(
    isAdminStayRangeAvailable('Studio', 'not-a-date', '2026-07-01', blockedDatesByProperty),
    false,
  );
});
