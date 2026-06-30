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

const removedPatterns = [
  /\bsenderName\b/,
  /\bqty\b/,
  /\bvatNote\b/,
  /\bTVA\b/,
  /\bVAT\b/,
  /\bdueOn\b/,
  /\bsecurityDeposit\b/,
  /Sender name/,
  /Qty/,
  /VAT note/,
  /VAT \(18%\)/,
  /Due on/,
  /Security deposit/,
  /Preview/,
  /previewHtml/,
  /View email/,
] as const;

test('admin invoice production flow does not expose removed fields', () => {
  const root = process.cwd();

  for (const file of productionFiles) {
    const source = readFileSync(path.join(root, file), 'utf8');

    for (const pattern of removedPatterns) {
      assert.equal(
        pattern.test(source),
        false,
        `${file} still contains removed invoice field matching ${pattern}`,
      );
    }
  }
});
