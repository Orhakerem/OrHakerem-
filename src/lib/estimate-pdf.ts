import 'server-only';

import { type DocumentProps, renderToBuffer } from '@react-pdf/renderer';
import { createElement, type ReactElement } from 'react';

import { EstimatePdf } from '@/emails/EstimatePdf';
import type { ReservationQuoteData } from '@/lib/reservation-quote';

/**
 * Renders the reservation estimate to a PDF buffer using @react-pdf/renderer
 * (pure Node — no headless browser). Returned buffer is attached to the
 * customer email by the admin send action.
 *
 * EstimatePdf returns a <Document>, but its component props are the quote data
 * rather than DocumentProps, so the element is cast to satisfy renderToBuffer.
 */
export async function renderEstimatePdf(data: ReservationQuoteData): Promise<Buffer> {
  const element = createElement(EstimatePdf, { data }) as unknown as ReactElement<DocumentProps>;
  return renderToBuffer(element);
}

export function buildEstimatePdfFilename(data: ReservationQuoteData): string {
  const ref = data.reservationNumber.trim().replace(/[^a-zA-Z0-9-]+/g, '-') || 'estimate';
  return `Or-Hakerem-${ref}.pdf`;
}
