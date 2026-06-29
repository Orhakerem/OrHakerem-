import assert from 'node:assert/strict';
import test from 'node:test';

import { renderReservationEmailBody } from './reservation-email-body';
import type { ReservationQuoteData } from './reservation-quote';

function makeData(overrides: Partial<ReservationQuoteData> = {}): ReservationQuoteData {
  return {
    reservationNumber: 'OH-2026-SHIREL',
    issuedOn: '11 / 06 / 2026',
    guestName: 'Ada Lovelace',
    idPassport: '',
    nationality: '',
    contact: '',
    apartment: 'Penthouse Rooftop',
    travellers: '1 adult',
    orderDate: '11 / 06 / 2026',
    nights: '1',
    checkInDate: '25 / 06 / 2026',
    checkInTime: '17:00',
    checkOutDate: '26 / 06 / 2026',
    checkOutTime: '11:00',
    apartmentAccess: 'Code sent on arrival',
    currency: 'NIS (₪)',
    lineItems: [{ description: 'Night stay', qty: '1', unit: '3,800 ₪', amount: '3,800 ₪' }],
    subtotal: '3,800 ₪',
    vatNote: 'Exempt',
    total: '3,800 ₪',
    paymentMethod: 'Bit',
    depositPaid: '1,400 ₪',
    paidOn: '',
    balanceDue: '2,400 ₪',
    dueOn: '',
    securityDeposit: '—',
    balanceRemaining: '2,400 ₪',
    closingNote: 'See you soon.',
    senderName: 'Or Hakerem',
    customerEmail: 'ada@example.com',
    ...overrides,
  };
}

test('email body greets the guest and surfaces the reservation number and total', () => {
  const html = renderReservationEmailBody(makeData());
  assert.match(html, /Dear Ada Lovelace,/);
  assert.match(html, /OH-2026-SHIREL/);
  assert.match(html, /Total 3,800 ₪/);
  assert.match(html, /attached as a PDF/);
});

test('email body HTML-escapes guest-supplied values', () => {
  const html = renderReservationEmailBody(
    makeData({ guestName: '<script>alert(1)</script>' }),
  );
  assert.doesNotMatch(html, /<script>alert\(1\)<\/script>/);
  assert.match(html, /&lt;script&gt;/);
});

test('email body falls back gracefully when name and number are blank', () => {
  const html = renderReservationEmailBody(
    makeData({ guestName: '   ', reservationNumber: '', total: '' }),
  );
  assert.match(html, /Dear guest,/);
});
