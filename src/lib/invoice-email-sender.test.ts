import assert from 'node:assert/strict';
import test from 'node:test';

import { buildInvoiceFromAddress, resolveInvoiceFromEmail } from './invoice-email-sender';

test('builds the invoice from header with the verified invoice sender email', () => {
  assert.equal(
    buildInvoiceFromAddress({
      senderName: 'Or Hakerem',
      senderEmail: 'invoice@orhakerem.com',
    }),
    'Or Hakerem <invoice@orhakerem.com>',
  );
});

test('falls back to the default sender name when the admin leaves it blank', () => {
  assert.equal(
    buildInvoiceFromAddress({
      senderName: '   ',
      senderEmail: 'invoice@orhakerem.com',
    }),
    'Or Hakerem <invoice@orhakerem.com>',
  );
});

test('rejects sender names that can break email headers', () => {
  assert.throws(
    () =>
      buildInvoiceFromAddress({
        senderName: 'Or Hakerem\nBcc: attacker@example.com',
        senderEmail: 'invoice@orhakerem.com',
      }),
    /Invalid sender name/,
  );

  assert.throws(
    () =>
      buildInvoiceFromAddress({
        senderName: 'Or <Hakerem>',
        senderEmail: 'invoice@orhakerem.com',
      }),
    /Invalid sender name/,
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
