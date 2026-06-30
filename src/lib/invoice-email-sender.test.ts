import assert from 'node:assert/strict';
import test from 'node:test';

import { buildInvoiceFromAddress, resolveInvoiceFromEmail } from './invoice-email-sender';

test('builds the invoice from header with the fixed sender name and verified invoice email', () => {
  assert.equal(
    buildInvoiceFromAddress({
      senderEmail: 'invoice@orhakerem.com',
    }),
    'OR HAKEREM <invoice@orhakerem.com>',
  );
});

test('requires the invoice-specific sender email environment value', () => {
  assert.equal(
    resolveInvoiceFromEmail({
      RESEND_INVOICE_FROM_EMAIL: ' invoice@orhakerem.com ',
    }),
    'invoice@orhakerem.com',
  );

  assert.throws(
    () => resolveInvoiceFromEmail({}),
    /Missing invoice sender email/,
  );
});

test('rejects invoice sender email values other than the verified invoice address', () => {
  assert.throws(
    () =>
      resolveInvoiceFromEmail({
        RESEND_INVOICE_FROM_EMAIL: 'billing@orhakerem.com',
      }),
    /Invalid invoice sender email/,
  );
});
