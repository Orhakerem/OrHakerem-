import assert from 'node:assert/strict';
import test from 'node:test';

import { buildReservationPdfAttachment } from './reservation-email-attachments';

test('builds invoice PDF attachment with explicit PDF content type and no inline preview metadata', () => {
  const content = Buffer.from('%PDF-1.3');
  const attachment = buildReservationPdfAttachment({
    filename: 'Or-Hakerem-OH-2026.pdf',
    content,
  });

  assert.deepEqual(attachment, {
    filename: 'Or-Hakerem-OH-2026.pdf',
    content,
    contentType: 'application/pdf',
  });
  assert.equal('contentId' in attachment, false);
  assert.equal('disposition' in attachment, false);
  assert.equal('path' in attachment, false);
});
