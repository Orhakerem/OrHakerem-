import 'server-only';

import { render } from '@react-email/render';

import { ReservationEmail } from '@/emails/ReservationEmail';

/**
 * Live send path for the cover email: renders the react-email
 * `ReservationEmail` component to an HTML string with react-email's async
 * `render()`. Unlike `reservation-email-body.ts`, this never imports
 * `react-dom/server` directly, so it is safe inside the App Router server graph.
 */
export function renderReservationEmailHtml(): Promise<string> {
  return render(<ReservationEmail />);
}
