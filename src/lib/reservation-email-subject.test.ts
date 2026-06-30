import assert from 'node:assert/strict';
import test from 'node:test';

import { buildReservationEmailSubject } from './reservation-email-subject';

test('reservation quote email subject is fixed for invoices', () => {
  assert.equal(buildReservationEmailSubject(), 'Your invoice - Or Hakerem');
});
