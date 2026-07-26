import assert from 'node:assert/strict';
import test from 'node:test';

import { LOCALES } from '@/i18n/config';

import {
  eventCleaningFee,
  eventVenueRentalPrice,
  getVenueRentals,
} from './event-pricing-data';

test('uses one venue price for weekday and weekend events in every locale', () => {
  assert.equal(eventVenueRentalPrice, 3500);

  const cleaningSuffixByLocale = {
    en: '+ cleaning fee',
    fr: '+ frais de ménage',
    he: '+ דמי ניקיון',
  } as const;

  for (const locale of LOCALES) {
    const rentals = getVenueRentals(locale);

    assert.deepEqual(
      rentals.map(({ id, price }) => ({ id, price })),
      [
        { id: 'weekday', price: 3500 },
        { id: 'weekend', price: 3500 },
      ],
    );
    assert.deepEqual(
      rentals.map(({ priceSuffix }) => priceSuffix),
      [
        cleaningSuffixByLocale[locale],
        cleaningSuffixByLocale[locale],
      ],
    );
  }
});

test('keeps cleaning as a separate fee on top of the venue price', () => {
  assert.equal(eventCleaningFee, 750);
  assert.equal(eventVenueRentalPrice + eventCleaningFee, 4250);
});
