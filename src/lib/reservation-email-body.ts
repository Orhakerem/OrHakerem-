import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { ReservationEmail } from '@/emails/ReservationEmail';
import type { ReservationQuoteData } from './reservation-quote';

/**
 * Renders the short, branded cover email to an HTML string synchronously.
 *
 * The email is authored with react-email components (`@/emails/ReservationEmail`)
 * and rendered here with React's `renderToStaticMarkup`, which keeps this a
 * plain `(data) => string` helper while React escapes every guest-supplied
 * value. React's `react-dom/server` cannot be imported into the App Router
 * server graph, so the live send path (`reservation-email.tsx`) uses
 * react-email's async `render()` on the same component instead; this synchronous
 * variant backs the unit tests and any non-RSC caller.
 */
export function renderReservationEmailBody(data: ReservationQuoteData): string {
  return `<!DOCTYPE html>${renderToStaticMarkup(createElement(ReservationEmail, { data }))}`;
}
