import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const productionFiles = [
  'src/actions/admin.ts',
  'src/lib/email-service.ts',
  'src/lib/reservation-quote.ts',
  'src/components/admin/ReservationQuoteForm.tsx',
  'src/emails/EstimatePdf.tsx',
] as const;

const removedTerms = [
  'senderName',
  'qty',
  'vatNote',
  'dueOn',
  'securityDeposit',
  'Sender name',
  'Qty',
  'VAT note',
  'VAT (18%)',
  'Due on',
  'Security deposit',
] as const;

test('admin invoice production flow does not expose removed fields', () => {
  const root = process.cwd();

  for (const file of productionFiles) {
    const source = readFileSync(path.join(root, file), 'utf8');

    for (const term of removedTerms) {
      assert.equal(
        source.includes(term),
        false,
        `${file} still contains removed invoice field "${term}"`,
      );
    }
  }
});
