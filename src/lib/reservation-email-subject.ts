import type { ReservationQuoteData } from './reservation-quote';

/**
 * Subject line for the reservation cover email. Pure (no React / no rendering)
 * so both the server action and the test helpers can share it without dragging
 * a renderer into their module graph.
 */
export function buildReservationEmailSubject(data: ReservationQuoteData): string {
  const ref = data.reservationNumber.trim();
  return ref ? `Your Or Hakerem reservation — ${ref}` : 'Your Or Hakerem reservation';
}
