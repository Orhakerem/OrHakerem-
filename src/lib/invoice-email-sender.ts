export const DEFAULT_INVOICE_SENDER_NAME = 'Or Hakerem';

const MAX_SENDER_NAME_LENGTH = 80;
const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export function sanitizeInvoiceSenderName(value: string): string {
  const trimmed = value.trim();
  const senderName = trimmed || DEFAULT_INVOICE_SENDER_NAME;

  if (/[\r\n]/.test(senderName)) {
    throw new Error('Invalid sender name');
  }

  if (/[<>]/.test(senderName)) {
    throw new Error('Invalid sender name');
  }

  if (senderName.length > MAX_SENDER_NAME_LENGTH) {
    throw new Error('Invalid sender name');
  }

  return senderName;
}

export function resolveInvoiceFromEmail(
  env: { RESEND_INVOICE_FROM_EMAIL?: string },
): string {
  const senderEmail = env.RESEND_INVOICE_FROM_EMAIL?.trim();

  if (!senderEmail) {
    throw new Error('Missing invoice sender email');
  }

  if (!EMAIL_PATTERN.test(senderEmail)) {
    throw new Error('Invalid invoice sender email');
  }

  return senderEmail;
}

export function buildInvoiceFromAddress({
  senderName,
  senderEmail,
}: {
  senderName: string;
  senderEmail: string;
}): string {
  const safeSenderName = sanitizeInvoiceSenderName(senderName);
  const safeSenderEmail = resolveInvoiceFromEmail({
    RESEND_INVOICE_FROM_EMAIL: senderEmail,
  });

  return `${safeSenderName} <${safeSenderEmail}>`;
}
