const INVOICE_SENDER_DISPLAY = 'OR HAKEREM';
const INVOICE_SENDER_EMAIL = 'invoice@orhakerem.com';
const EMAIL_PATTERN = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

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

  if (senderEmail.toLowerCase() !== INVOICE_SENDER_EMAIL) {
    throw new Error('Invalid invoice sender email');
  }

  return INVOICE_SENDER_EMAIL;
}

export function buildInvoiceFromAddress({
  senderEmail,
}: {
  senderEmail: string;
}): string {
  const safeSenderEmail = resolveInvoiceFromEmail({
    RESEND_INVOICE_FROM_EMAIL: senderEmail,
  });

  return `${INVOICE_SENDER_DISPLAY} <${safeSenderEmail}>`;
}
