'use server';

import { redirect } from 'next/navigation';

import { verifyCredentials } from '@/lib/admin-auth';
import { clearAdminSession, createAdminSession, getAdminSession } from '@/lib/admin-session';
import { sanitizeForHeader, sendReservationQuoteEmail } from '@/lib/email-service';
import { buildEstimatePdfFilename, renderEstimatePdf } from '@/lib/estimate-pdf';
import { renderReservationEmailHtml } from '@/lib/reservation-email';
import { buildReservationEmailSubject } from '@/lib/reservation-email-subject';
import { reservationQuoteSchema, type ReservationQuoteData } from '@/lib/reservation-quote';

interface LoginResult {
  success: boolean;
  error?: string;
}

interface SendQuoteResult {
  success: boolean;
  status?: 'sent' | 'preview';
  message?: string;
  error?: string;
  previewHtml?: string;
}

export async function loginAdmin(formData: FormData): Promise<LoginResult> {
  const email = formData.get('email')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';

  if (!verifyCredentials(email, password)) {
    return { success: false, error: 'Invalid email or password' };
  }

  createAdminSession();
  return { success: true };
}

export async function logoutAdmin(): Promise<void> {
  clearAdminSession();
  redirect('/admin/login');
}

export async function sendReservationQuote(
  input: ReservationQuoteData,
): Promise<SendQuoteResult> {
  if (!getAdminSession()) {
    return { success: false, error: 'Not authenticated' };
  }

  const parsed = reservationQuoteSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid form data',
    };
  }
  const data = parsed.data;

  const subject = sanitizeForHeader(buildReservationEmailSubject(data));

  try {
    const [html, pdf] = await Promise.all([
      renderReservationEmailHtml(data),
      renderEstimatePdf(data),
    ]);

    const result = await sendReservationQuoteEmail({
      to: data.customerEmail,
      subject,
      html,
      replyTo: process.env.RECIPIENT_EMAIL?.trim() || undefined,
      attachments: [{ filename: buildEstimatePdfFilename(data), content: pdf }],
    });

    if (result.status === 'sent') {
      return {
        success: true,
        status: 'sent',
        message: `Reservation email sent to ${data.customerEmail}.`,
      };
    }

    return {
      success: true,
      status: 'preview',
      message: result.reason ?? 'Email rendered as a preview (not delivered).',
      previewHtml: html,
    };
  } catch (error) {
    console.error('Reservation quote send failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send reservation email',
    };
  }
}
