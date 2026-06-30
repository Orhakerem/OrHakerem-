import assert from 'node:assert/strict';
import test from 'node:test';

import {
  calculateAdminNights,
  calculateAdminQuote,
  formatIsoToAdminDate,
  parseAdminDateToIso,
  parseShekelAmount,
} from './admin-quote-calculations';

test('converts admin DD / MM / YYYY dates to and from ISO dates', () => {
  assert.equal(parseAdminDateToIso('05 / 07 / 2026'), '2026-07-05');
  assert.equal(parseAdminDateToIso('5 / 7 / 2026'), '2026-07-05');
  assert.equal(formatIsoToAdminDate('2026-07-05'), '05 / 07 / 2026');

  assert.equal(parseAdminDateToIso('31 / 02 / 2026'), null);
  assert.equal(parseAdminDateToIso('2026-07-05'), null);
  assert.equal(formatIsoToAdminDate('not-a-date'), '');
});

test('initializes issuedOn and orderDate to today without replacing existing values', () => {
  assert.deepEqual(
    {
      issuedOn: calculateAdminQuote({ lineItems: [] }, { todayIso: '2026-06-30' }).issuedOn,
      orderDate: calculateAdminQuote({ lineItems: [] }, { todayIso: '2026-06-30' }).orderDate,
    },
    {
      issuedOn: '30 / 06 / 2026',
      orderDate: '30 / 06 / 2026',
    },
  );

  const calculated = calculateAdminQuote(
    {
      issuedOn: '11 / 06 / 2026',
      orderDate: '12 / 06 / 2026',
      lineItems: [],
    },
    { todayIso: '2026-06-30' },
  );

  assert.equal(calculated.issuedOn, '11 / 06 / 2026');
  assert.equal(calculated.orderDate, '12 / 06 / 2026');
});

test('does not pull sample reservation defaults into partial calculation input', () => {
  const calculated = calculateAdminQuote({}, { todayIso: '2026-06-30' });

  assert.equal(calculated.issuedOn, '30 / 06 / 2026');
  assert.equal(calculated.orderDate, '30 / 06 / 2026');
  assert.equal(calculated.nights, '');
  assert.deepEqual(calculated.lineItems, []);
  assert.equal(calculated.subtotal, '0 ₪');
  assert.equal(calculated.total, '0 ₪');
  assert.equal('guestName' in calculated, false);
});

test('parses shekel amount strings and treats nonnumeric labels as zero', () => {
  assert.equal(parseShekelAmount('3,800 ₪'), 3800);
  assert.equal(parseShekelAmount('250 ₪'), 250);
  assert.equal(parseShekelAmount('Included'), 0);
  assert.equal(parseShekelAmount('—'), 0);
  assert.equal(parseShekelAmount(''), 0);
  assert.equal(parseShekelAmount('not numeric'), 0);
});

test('calculates totals, balances, nights, and strips removed plan-1 fields', () => {
  const calculated = calculateAdminQuote(
    {
      checkInDate: '25 / 06 / 2026',
      checkOutDate: '28 / 06 / 2026',
      depositPaid: '1,400 ₪',
      dueOn: 'legacy due date',
      securityDeposit: 'legacy security deposit',
      senderName: 'legacy sender',
      vatNote: 'legacy VAT',
      lineItems: [
        { description: 'Event & night stay', unit: '3,800 ₪', amount: '3,800 ₪', qty: '1' },
        { description: 'Cleaning fee', unit: '250 ₪', amount: '250 ₪', qty: '1' },
        { description: 'Breakfast', unit: 'Included', amount: 'Included', qty: '1' },
        { description: 'Parking', unit: '—', amount: '—', qty: '1' },
      ],
    },
    { todayIso: '2026-06-30' },
  );

  assert.equal(calculated.subtotal, '4,050 ₪');
  assert.equal(calculated.total, '4,050 ₪');
  assert.equal(calculated.balanceDue, '4,050 ₪');
  assert.equal(calculated.balanceRemaining, '2,650 ₪');
  assert.equal(calculated.nights, '3');

  const quote = calculated as Record<string, unknown>;
  const firstLineItem = calculated.lineItems[0] as Record<string, unknown>;

  assert.equal('senderName' in quote, false);
  assert.equal('vatNote' in quote, false);
  assert.equal('dueOn' in quote, false);
  assert.equal('securityDeposit' in quote, false);
  assert.equal('qty' in firstLineItem, false);
});

test('does not let deposit overpayment make balanceRemaining negative', () => {
  const calculated = calculateAdminQuote(
    {
      depositPaid: '5,000 ₪',
      lineItems: [{ description: 'Event', unit: '3,800 ₪', amount: '3,800 ₪' }],
    },
    { todayIso: '2026-06-30' },
  );

  assert.equal(calculated.balanceRemaining, '0 ₪');
});

test('calculates nights only from valid admin check-in and check-out dates', () => {
  assert.equal(calculateAdminNights('25 / 06 / 2026', '28 / 06 / 2026'), 3);
  assert.equal(calculateAdminNights('28 / 06 / 2026', '25 / 06 / 2026'), null);
  assert.equal(calculateAdminNights('bad date', '28 / 06 / 2026'), null);
});
