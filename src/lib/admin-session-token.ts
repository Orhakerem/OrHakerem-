/**
 * Edge-safe pieces of the admin session token shared between the Node runtime
 * (`admin-auth.ts`) and the Edge middleware. Must stay free of `node:*`
 * imports so the middleware bundle can include it.
 */

export const SESSION_COOKIE_NAME = 'oh_admin_session';

/** The string that, hashed with SHA-256, becomes the admin session token. */
export function buildSessionTokenPayload(
  email: string,
  passwordSha256: string,
  sessionSecret: string,
): string {
  return `${email}:${passwordSha256}:${sessionSecret}`;
}
