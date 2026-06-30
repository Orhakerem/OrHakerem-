import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { ReservationEmail } from '@/emails/ReservationEmail';

/**
 * Renders the minimal invoice cover email to an HTML string synchronously.
 *
 * The email is authored with react-email components (`@/emails/ReservationEmail`)
 * and rendered here with React's `renderToStaticMarkup`. React's
 * `react-dom/server` cannot be imported into the App Router server graph, so
 * the live send path (`reservation-email.tsx`) uses react-email's async
 * `render()` on the same component instead; this synchronous variant backs the
 * unit tests and any non-RSC caller.
 */
export function renderReservationEmailBody(): string {
  return `<!DOCTYPE html>${renderToStaticMarkup(createElement(ReservationEmail))}`;
}
