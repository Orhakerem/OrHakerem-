import assert from 'node:assert/strict';
import test from 'node:test';

import { DEFAULT_RESERVATION_QUOTE, reservationQuoteSchema } from './reservation-quote';

test('default reservation quote includes the admin-editable sender name', () => {
  assert.equal(DEFAULT_RESERVATION_QUOTE.senderName, 'Or Hakerem');
});

test('reservation quote schema trims and validates the sender name', () => {
  const parsed = reservationQuoteSchema.parse({
    ...DEFAULT_RESERVATION_QUOTE,
    customerEmail: 'ada@example.com',
    senderName: ' Joseph - Or Hakerem ',
  });

  assert.equal(parsed.senderName, 'Joseph - Or Hakerem');
});

test('reservation quote schema rejects sender header injection characters', () => {
  assert.throws(
    () =>
      reservationQuoteSchema.parse({
        ...DEFAULT_RESERVATION_QUOTE,
        customerEmail: 'ada@example.com',
        senderName: 'Or Hakerem\r\nBcc: attacker@example.com',
      }),
    /Sender name cannot contain header control characters/,
  );

  assert.throws(
    () =>
      reservationQuoteSchema.parse({
        ...DEFAULT_RESERVATION_QUOTE,
        customerEmail: 'ada@example.com',
        senderName: 'Or <Hakerem>',
      }),
    /Sender name cannot contain angle brackets/,
  );
});
