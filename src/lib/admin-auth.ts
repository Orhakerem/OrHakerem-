import { createHash } from 'node:crypto';

/**
 * Admin back-office credentials.
 *
 * Phase 1 only: credentials are stored "raw" in source with no real security
 * hardening. The email is kept in the clear; the password is stored ONLY as a
 * SHA-256 hash. This module is intentionally free of `server-only` and
 * `next/headers` so the pure logic stays unit-testable under `tsx --test`.
 * The cookie/session helpers that need the Next runtime live in
 * `admin-session.ts`.
 */
export const ADMIN_EMAIL = 'keremliving@gmail.com';

/** sha256('080223') — see admin-auth.test.ts which pins this value. */
export const ADMIN_PASSWORD_SHA256 =
  '2de66ceb83ba271e113f311c082d2d994a28bf81c1c0048a776f7f273a540f86';

export const SESSION_COOKIE_NAME = 'oh_admin_session';

export function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

export function verifyCredentials(email: string, password: string): boolean {
  const emailMatches = email.trim().toLowerCase() === ADMIN_EMAIL;
  const passwordMatches = sha256(password) === ADMIN_PASSWORD_SHA256;
  return emailMatches && passwordMatches;
}

/**
 * Opaque session token derived from the stored credentials. It is stable and
 * only reproducible server-side, which is enough to gate the back-office for
 * this phase. The token is what we store in the httpOnly session cookie.
 */
export function getExpectedSessionToken(): string {
  return sha256(`${ADMIN_EMAIL}:${ADMIN_PASSWORD_SHA256}:or-hakerem-admin`);
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) {
    return false;
  }
  return token === getExpectedSessionToken();
}
