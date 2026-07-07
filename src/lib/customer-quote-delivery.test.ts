import assert from 'node:assert/strict';
import test from 'node:test';

import { sendCustomerQuoteFromRequest } from './customer-quote-delivery';
import { DEFAULT_RESERVATION_QUOTE } from './reservation-quote';

test('sendCustomerQuoteFromRequest sends the PDF quote and records sent history for the source request', async () => {
  const calls: string[] = [];

  const result = await sendCustomerQuoteFromRequest(
    {
      quote: {
        ...DEFAULT_RESERVATION_QUOTE,
        reservationNumber: 'OH-REQ-1',
        guestName: 'Sarah Cohen',
        customerEmail: 'sarah@example.com',
        total: '4,250 ₪',
      },
      source: {
        sourceType: 'event_request',
        sourceId: 'event-1',
      },
    },
    {
      renderHtml: async () => {
        calls.push('renderHtml');
        return '<p>Quote attached</p>';
      },
      renderPdf: async (quote) => {
        calls.push(`renderPdf:${quote.reservationNumber}`);
        return Buffer.from('pdf');
      },
      buildFilename: async (quote) => `${quote.reservationNumber}.pdf`,
      sendEmail: async (payload) => {
        calls.push(`sendEmail:${payload.to}:${payload.attachments?.[0]?.filename}`);
        return { status: 'sent', id: 'email_123' };
      },
      saveHistory: async (payload) => {
        calls.push(`saveHistory:${payload.source?.sourceType}:${payload.source?.sourceId}:${payload.resendEmailId}`);
        return { success: true };
      },
      markQuoteSent: async (source) => {
        calls.push(`markQuoteSent:${source.sourceType}:${source.sourceId}`);
      },
    },
  );

  assert.deepEqual(calls, [
    'renderHtml',
    'renderPdf:OH-REQ-1',
    'sendEmail:sarah@example.com:OH-REQ-1.pdf',
    'saveHistory:event_request:event-1:email_123',
    'markQuoteSent:event_request:event-1',
  ]);
  assert.deepEqual(result, {
    status: 'sent',
    emailId: 'email_123',
    warnings: [],
  });
});

test('sendCustomerQuoteFromRequest keeps a sent status and still updates the request when history save fails', async () => {
  const calls: string[] = [];

  const result = await sendCustomerQuoteFromRequest(
    {
      quote: {
        ...DEFAULT_RESERVATION_QUOTE,
        customerEmail: 'sarah@example.com',
      },
      source: {
        sourceType: 'event_request',
        sourceId: 'event-1',
      },
    },
    {
      renderHtml: async () => '<p>Quote attached</p>',
      renderPdf: async () => Buffer.from('pdf'),
      buildFilename: async () => 'quote.pdf',
      sendEmail: async () => ({ status: 'sent', id: 'email_456' }),
      saveHistory: async () => {
        calls.push('saveHistory');
        throw new Error('history table unavailable');
      },
      markQuoteSent: async () => {
        calls.push('markQuoteSent');
      },
    },
  );

  assert.deepEqual(calls, ['saveHistory', 'markQuoteSent']);
  assert.equal(result.status, 'sent');
  assert.equal(result.status === 'sent' && result.emailId, 'email_456');
  assert.equal(result.status === 'sent' && result.warnings.length, 1);
  assert.match(
    (result.status === 'sent' && result.warnings[0]) || '',
    /history.*failed.*history table unavailable/i,
  );
});

test('sendCustomerQuoteFromRequest reports a status-update failure as a warning, not an error', async () => {
  const result = await sendCustomerQuoteFromRequest(
    {
      quote: {
        ...DEFAULT_RESERVATION_QUOTE,
        customerEmail: 'sarah@example.com',
      },
      source: {
        sourceType: 'reservation',
        sourceId: 'reservation-9',
      },
    },
    {
      renderHtml: async () => '<p>Quote attached</p>',
      renderPdf: async () => Buffer.from('pdf'),
      buildFilename: async () => 'quote.pdf',
      sendEmail: async () => ({ status: 'sent', id: 'email_789' }),
      saveHistory: async () => ({ success: true }),
      markQuoteSent: async () => {
        throw new Error('status upsert rejected');
      },
    },
  );

  assert.equal(result.status, 'sent');
  assert.equal(result.status === 'sent' && result.warnings.length, 1);
  assert.match(
    (result.status === 'sent' && result.warnings[0]) || '',
    /status.*failed.*status upsert rejected/i,
  );
});

test('sendCustomerQuoteFromRequest does not record sent history for preview sends', async () => {
  let historyCalled = false;

  const result = await sendCustomerQuoteFromRequest(
    {
      quote: {
        ...DEFAULT_RESERVATION_QUOTE,
        customerEmail: 'preview@example.com',
      },
      source: {
        sourceType: 'reservation',
        sourceId: 'reservation-1',
      },
    },
    {
      renderHtml: async () => '<p>Quote attached</p>',
      renderPdf: async () => Buffer.from('pdf'),
      buildFilename: async () => 'quote.pdf',
      sendEmail: async () => ({ status: 'preview', reason: 'No API key' }),
      saveHistory: async () => {
        historyCalled = true;
        return { success: true };
      },
      markQuoteSent: async () => {
        historyCalled = true;
      },
    },
  );

  assert.equal(historyCalled, false);
  assert.deepEqual(result, {
    status: 'preview',
    reason: 'No API key',
  });
});
