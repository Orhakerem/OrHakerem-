import assert from 'node:assert/strict';
import test from 'node:test';

import { renderReservationEmailBody } from './reservation-email-body';

test('email body is minimal and only points to the attached invoice PDF', () => {
  const html = renderReservationEmailBody();

  assert.match(html, /invoice PDF is attached/i);
  assert.doesNotMatch(html, /Dear /);
  assert.doesNotMatch(html, /reservation/i);
  assert.doesNotMatch(html, /apartment/i);
  assert.doesNotMatch(html, /check-in/i);
  assert.doesNotMatch(html, /check-out/i);
  assert.doesNotMatch(html, /payment/i);
  assert.doesNotMatch(html, /terms/i);
  assert.doesNotMatch(html, /Total/);
  assert.doesNotMatch(html, /<img/i);
});
