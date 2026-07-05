'use server';

import { redirect } from 'next/navigation';

import { saveAdminQuoteHistory } from '@/actions/admin-pricing';
import { verifyCredentials } from '@/lib/admin-auth';
import { clearAdminSession, createAdminSession, getAdminSession } from '@/lib/admin-session';
import { getBookablePropertyCalendarSnapshot } from '@/lib/airbnb-calendar';
import {
  getAvailabilityStatusForAdminApartment,
  getBlockedDatesForAdminApartment,
  getBlockedStayNights,
} from '@/lib/admin-availability';
import {
  calculateAdminQuote,
  parseAdminDateToIso,
} from '@/lib/admin-quote-calculations';
import { sanitizeForHeader, sendReservationQuoteEmail } from '@/lib/email-service';
import { buildEstimatePdfFilename, renderEstimatePdf } from '@/lib/estimate-pdf';
import { buildReservationPdfAttachment } from '@/lib/reservation-email-attachments';
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
  const data = calculateAdminQuote(parsed.data);

  const checkIn = parseAdminDateToIso(data.checkInDate);
  const checkOut = parseAdminDateToIso(data.checkOutDate);

  if (checkIn && checkOut) {
    const { blockedDatesByProperty, availabilityStatusByProperty } =
      await getBookablePropertyCalendarSnapshot();
    const availabilityStatus = getAvailabilityStatusForAdminApartment(
      data.apartment,
      availabilityStatusByProperty,
    );

    if (availabilityStatus === 'error') {
      return {
        success: false,
        error: 'Calendar availability is temporarily unavailable. Refresh before sending.',
      };
    }

    const blockedDates = getBlockedDatesForAdminApartment(
      data.apartment,
      blockedDatesByProperty,
    );
    const blockedStayNights = getBlockedStayNights({ checkIn, checkOut }, blockedDates);

    if (blockedStayNights.length > 0) {
      return {
        success: false,
        error: `Selected stay includes unavailable date ${blockedStayNights[0]}.`,
      };
    }
  }

  const subject = sanitizeForHeader(buildReservationEmailSubject());

  try {
    const [html, pdf] = await Promise.all([
      renderReservationEmailHtml(),
      renderEstimatePdf(data),
    ]);

    const result = await sendReservationQuoteEmail({
      to: data.customerEmail,
      subject,
      html,
      replyTo: process.env.RECIPIENT_EMAIL?.trim() || undefined,
      attachments: [
        buildReservationPdfAttachment({
          filename: buildEstimatePdfFilename(data),
          content: pdf,
        }),
      ],
    });

    if (result.status === 'sent') {
      const historyResult = await saveAdminQuoteHistory({
        quote: data,
        resendEmailId: result.id,
      });

      if (!historyResult.success) {
        console.error('Reservation quote history save failed:', historyResult.error);
      }

      return {
        success: true,
        status: 'sent',
        message: `Reservation email sent to ${data.customerEmail}.`,
      };
    }

    return {
      success: true,
      status: 'preview',
      message: result.reason ?? 'Email was not delivered.',
    };
  } catch (error) {
    console.error('Reservation quote send failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send reservation email',
    };
  }
}
