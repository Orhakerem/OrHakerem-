import 'server-only';

import { cookies } from 'next/headers';

import {
  SESSION_COOKIE_NAME,
  getExpectedSessionToken,
  isValidSessionToken,
} from './admin-auth';

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

/** Sets the admin session cookie. Call only from a Server Action / Route Handler. */
export function createAdminSession(): void {
  cookies().set(SESSION_COOKIE_NAME, getExpectedSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

/** Clears the admin session cookie. Call only from a Server Action / Route Handler. */
export function clearAdminSession(): void {
  cookies().delete(SESSION_COOKIE_NAME);
}

/** Reads the session cookie and returns whether the caller is an authenticated admin. */
export function getAdminSession(): boolean {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  return isValidSessionToken(token);
}
