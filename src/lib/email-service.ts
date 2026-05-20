import 'server-only';

import { Resend } from 'resend';

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
