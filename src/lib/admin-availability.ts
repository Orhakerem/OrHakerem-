import type {
  BookablePropertyId,
  CalendarSyncStatus,
  PropertyAvailabilityStatusMap,
  PropertyBlockedDatesMap,
} from './bookable-properties';
import {
  addNights,
  compareIsoDates,
  type BookingDateRange,
  isIsoDateString,
} from './booking-dates';

export const ADMIN_APARTMENT_LABELS = ['Penthouse', 'Studio', 'Penthouse + Studio'] as const;

export type AdminApartmentLabel = (typeof ADMIN_APARTMENT_LABELS)[number];
export type AdminApartmentOption = AdminApartmentLabel;

export interface AdminAvailabilitySnapshot {
  blockedDatesByProperty: PropertyBlockedDatesMap;
  availabilityStatusByProperty: PropertyAvailabilityStatusMap;
}

export const ADMIN_APARTMENT_OPTIONS = ADMIN_APARTMENT_LABELS;

const PROPERTY_IDS_BY_ADMIN_APARTMENT = {
  Penthouse: ['penthouse-jacuzzi'],
  Studio: ['cozy-studio'],
  'Penthouse + Studio': ['penthouse-jacuzzi', 'cozy-studio'],
} as const satisfies Record<AdminApartmentLabel, readonly BookablePropertyId[]>;

export function isAdminApartmentLabel(value: string | null | undefined): value is AdminApartmentLabel {
  return typeof value === 'string' && (ADMIN_APARTMENT_LABELS as readonly string[]).includes(value);
}

export const isAdminApartmentOption = isAdminApartmentLabel;

export function normalizeAdminApartment(value: string | null | undefined): AdminApartmentLabel {
  return isAdminApartmentLabel(value) ? value : 'Penthouse';
}

export function getAdminApartmentPropertyIds(
  apartment: AdminApartmentLabel,
): readonly BookablePropertyId[] {
  return PROPERTY_IDS_BY_ADMIN_APARTMENT[apartment];
}

export function getAdminApartmentBlockedDates(
  apartment: AdminApartmentLabel,
  blockedDatesByProperty: PropertyBlockedDatesMap,
) {
  const blockedDates = new Set<string>();

  for (const propertyId of getAdminApartmentPropertyIds(apartment)) {
    for (const blockedDate of blockedDatesByProperty[propertyId] ?? []) {
      blockedDates.add(blockedDate);
    }
  }

  return Array.from(blockedDates).sort(compareIsoDates);
}

export function getBlockedDatesForAdminApartment(
  apartment: string,
  blockedDatesByProperty: PropertyBlockedDatesMap,
) {
  return getAdminApartmentBlockedDates(normalizeAdminApartment(apartment), blockedDatesByProperty);
}

export function getAvailabilityStatusForAdminApartment(
  apartment: string,
  availabilityStatusByProperty: PropertyAvailabilityStatusMap,
): CalendarSyncStatus {
  const statuses = getAdminApartmentPropertyIds(normalizeAdminApartment(apartment)).map(
    (propertyId) => availabilityStatusByProperty[propertyId] ?? 'ready',
  );

  if (statuses.includes('error')) {
    return 'error';
  }

  if (statuses.includes('stale')) {
    return 'stale';
  }

  return 'ready';
}

export function getAdminBlockedStayNights(
  apartment: AdminApartmentLabel,
  checkIn: string,
  checkOut: string,
  blockedDatesByProperty: PropertyBlockedDatesMap,
) {
  return getBlockedStayNightsForDates(
    checkIn,
    checkOut,
    getAdminApartmentBlockedDates(apartment, blockedDatesByProperty),
  );
}

export function getBlockedStayNights(range: BookingDateRange, blockedDates: readonly string[]) {
  if (!range.checkIn || !range.checkOut) {
    return [];
  }

  return getBlockedStayNightsForDates(range.checkIn, range.checkOut, blockedDates);
}

export function isAdminStayRangeAvailable(
  apartment: AdminApartmentLabel,
  checkIn: string,
  checkOut: string,
  blockedDatesByProperty: PropertyBlockedDatesMap,
) {
  if (!isValidStayRange(checkIn, checkOut)) {
    return false;
  }

  return getAdminBlockedStayNights(apartment, checkIn, checkOut, blockedDatesByProperty).length === 0;
}

function getBlockedStayNightsForDates(
  checkIn: string,
  checkOut: string,
  blockedDates: readonly string[],
) {
  if (!isValidStayRange(checkIn, checkOut)) {
    return [];
  }

  const blockedDateSet = new Set(blockedDates);
  const blockedStayNights: string[] = [];

  for (
    let night = checkIn;
    compareIsoDates(night, checkOut) < 0;
    night = addNights(night, 1)
  ) {
    if (blockedDateSet.has(night)) {
      blockedStayNights.push(night);
    }
  }

  return blockedStayNights;
}

function isValidStayRange(checkIn: string, checkOut: string) {
  return (
    isIsoDateString(checkIn) &&
    isIsoDateString(checkOut) &&
    compareIsoDates(checkOut, checkIn) > 0
  );
}
