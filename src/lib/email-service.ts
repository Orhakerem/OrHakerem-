import 'server-only';

import { Resend } from 'resend';

import { buildInvoiceFromAddress, resolveInvoiceFromEmail } from './invoice-email-sender';

interface EmailConfig {
  apiKey: string;
  recipientEmail: string;
}

interface SendEmailOptions {
  html: string;
  replyTo: string;
  subject: string;
}

export function sanitizeForHeader(value: string) {
  return value.replace(/[^\x00-\x7F]/g, '?');
}

export function getEmailConfig():
  | { config: EmailConfig; error: null }
  | { config: null; error: string } {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipientEmail = process.env.RECIPIENT_EMAIL?.trim();

  if (!apiKey) {
    return {
      config: null,
      error: 'Missing Resend API key',
    };
  }

  if (!recipientEmail) {
    return {
      config: null,
      error: 'Missing recipient email',
    };
  }

  return {
    config: {
      apiKey,
      recipientEmail,
    },
    error: null,
  };
}

export async function sendResendEmail(
  config: EmailConfig,
  { html, replyTo, subject }: SendEmailOptions,
) {
  const resend = new Resend(config.apiKey);

  return resend.emails.send({
    from: 'Or Hakerem <onboarding@resend.dev>',
    to: config.recipientEmail,
    subject,
    html,
    replyTo,
  });
}

export type ReservationSendStatus = 'sent' | 'preview';

export interface SendReservationResult {
  status: ReservationSendStatus;
  id?: string;
  reason?: string;
}

interface ReservationAttachment {
  filename: string;
  content: Buffer;
}

interface SendReservationOptions {
  to: string;
  subject: string;
  html: string;
  senderName: string;
  replyTo?: string;
  attachments?: ReservationAttachment[];
}

/**
 * Sends a reservation/invoice email to an arbitrary customer address.
 *
 * Unlike `sendResendEmail` (which always targets RECIPIENT_EMAIL), this targets
 * the customer. When no usable Resend key is configured, or Resend rejects the
 * request, it degrades gracefully OUTSIDE production: it returns a `preview`
 * status instead of throwing, so the back-office flow stays verifiable without
 * live credentials. It never reports a `sent` it did not actually make.
 *
 * Set `RESEND_INVOICE_FROM_EMAIL` to a verified-domain sender to deliver to
 * arbitrary recipients.
 */
export async function sendReservationQuoteEmail({
  to,
  subject,
  html,
  senderName,
  replyTo,
  attachments,
}: SendReservationOptions): Promise<SendReservationResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const isProduction = process.env.NODE_ENV === 'production';

  if (!apiKey) {
    if (isProduction) {
      throw new Error('Missing Resend API key');
    }
    return {
      status: 'preview',
      reason: 'No RESEND_API_KEY configured — email rendered as a preview (not delivered).',
    };
  }

  try {
    const from = buildInvoiceFromAddress({
      senderName,
      senderEmail: resolveInvoiceFromEmail({
        RESEND_INVOICE_FROM_EMAIL: process.env.RESEND_INVOICE_FROM_EMAIL,
      }),
    });
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
      ...(attachments && attachments.length
        ? { attachments: attachments.map(({ filename, content }) => ({ filename, content })) }
        : {}),
    });

    if (error) {
      if (isProduction) {
        throw new Error(error.message);
      }
      return {
        status: 'preview',
        reason: `Resend did not deliver (${error.message}) — email rendered as a preview.`,
      };
    }

    return { status: 'sent', id: data?.id };
  } catch (error) {
    if (isProduction) {
      throw error;
    }
    const reason = error instanceof Error ? error.message : 'Unknown send error';
    return {
      status: 'preview',
      reason: `${reason} — email rendered as a preview.`,
    };
  }
}
