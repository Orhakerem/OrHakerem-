/**
 * Subject line for the invoice cover email. Pure (no React / no rendering) so
 * both the server action and tests can share it without dragging a renderer into
 * their module graph.
 */
export function buildReservationEmailSubject(): string {
  return 'Your invoice - Or Hakerem';
}
