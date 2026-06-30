import assert from 'node:assert/strict';
import test from 'node:test';

import { DEFAULT_RESERVATION_QUOTE, reservationQuoteSchema } from './reservation-quote';

test('default reservation quote omits removed admin invoice fields', () => {
  const quote = DEFAULT_RESERVATION_QUOTE as Record<string, unknown>;
  const firstLineItem = DEFAULT_RESERVATION_QUOTE.lineItems[0] as Record<string, unknown>;

  assert.equal('senderName' in quote, false);
  assert.equal('vatNote' in quote, false);
  assert.equal('dueOn' in quote, false);
  assert.equal('securityDeposit' in quote, false);
  assert.equal('qty' in firstLineItem, false);
});

test('reservation quote schema strips stale removed fields from transitional payloads', () => {
  const stalePayload = {
    ...DEFAULT_RESERVATION_QUOTE,
    customerEmail: 'ada@example.com',
    senderName: 'Legacy sender',
    vatNote: 'Legacy VAT',
    dueOn: 'Legacy due date',
    securityDeposit: 'Legacy security deposit',
    lineItems: DEFAULT_RESERVATION_QUOTE.lineItems.map((item) => ({
      ...item,
      qty: '99',
    })),
  };

  const parsed = reservationQuoteSchema.parse(stalePayload);
  const quote = parsed as Record<string, unknown>;
  const firstLineItem = parsed.lineItems[0] as Record<string, unknown>;

  assert.equal('senderName' in quote, false);
  assert.equal('vatNote' in quote, false);
  assert.equal('dueOn' in quote, false);
  assert.equal('securityDeposit' in quote, false);
  assert.equal('qty' in firstLineItem, false);
  assert.equal(parsed.customerEmail, 'ada@example.com');
});
