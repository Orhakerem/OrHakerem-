export const BOOKABLE_PROPERTIES = {
  'penthouse-jacuzzi': {
    id: 'penthouse-jacuzzi',
    title: 'Luxury Penthouse',
    airbnbIcalUrl:
      'https://www.airbnb.fr/calendar/ical/1247678225456455722.ics?t=183619b2f1764ec89198da07de1de912',
  },
  'cozy-studio': {
    id: 'cozy-studio',
    title: 'Spacious & Cosy Apartment',
    airbnbIcalUrl:
      'https://www.airbnb.fr/calendar/ical/1273005083237819919.ics?t=510782b0f337456babc7c59e9c087978',
  },
} as const;

export type BookablePropertyId = keyof typeof BOOKABLE_PROPERTIES;
export type BookableProperty = (typeof BOOKABLE_PROPERTIES)[BookablePropertyId];
export type BookablePropertyTitle = (typeof BOOKABLE_PROPERTIES)[BookablePropertyId]['title'];
export type CalendarSyncStatus = 'ready' | 'stale' | 'error';
export type PropertyBlockedDatesMap = Record<BookablePropertyId, string[]>;
export type PropertyAvailabilityStatusMap = Record<BookablePropertyId, CalendarSyncStatus>;

const LEGACY_PROPERTY_LABELS: Record<string, BookablePropertyTitle> = {
  Penthouse: BOOKABLE_PROPERTIES['penthouse-jacuzzi'].title,
  Studio: BOOKABLE_PROPERTIES['cozy-studio'].title,
};

const PROPERTY_ID_BY_TITLE = Object.fromEntries(
  Object.values(BOOKABLE_PROPERTIES).map((property) => [property.title, property.id]),
) as Record<BookablePropertyTitle, BookablePropertyId>;

export const BOOKABLE_PROPERTY_IDS = Object.keys(BOOKABLE_PROPERTIES) as BookablePropertyId[];

export const BOOKABLE_PROPERTY_OPTIONS = BOOKABLE_PROPERTY_IDS.map((propertyId) => ({
  id: propertyId,
  title: BOOKABLE_PROPERTIES[propertyId].title,
})) as ReadonlyArray<{
  id: BookablePropertyId;
  title: BookablePropertyTitle;
}>;

export const BOOKABLE_PROPERTY_TITLES = [
  BOOKABLE_PROPERTIES['penthouse-jacuzzi'].title,
  BOOKABLE_PROPERTIES['cozy-studio'].title,
] as const;

export function isBookablePropertyId(value: string): value is BookablePropertyId {
  return value in BOOKABLE_PROPERTIES;
}

export function getBookablePropertyIdFromLabel(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const normalizedValue = LEGACY_PROPERTY_LABELS[value] ?? value;

  return (PROPERTY_ID_BY_TITLE as Record<string, BookablePropertyId | undefined>)[normalizedValue] ?? null;
}

export function getBookablePropertyTitle(propertyId: BookablePropertyId) {
  return BOOKABLE_PROPERTIES[propertyId].title;
}
