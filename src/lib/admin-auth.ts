import { createHash, timingSafeEqual } from 'node:crypto';

import { SESSION_COOKIE_NAME, buildSessionTokenPayload } from './admin-session-token';

/**
 * Admin back-office credentials.
 *
 * All secret material lives in environment variables — never in the repo:
 * - `ADMIN_EMAIL` — admin login email
 * - `ADMIN_PASSWORD_SHA256` — sha256 hex digest of the admin password
 * - `ADMIN_SESSION_SECRET` — random secret (32+ bytes) mixed into the session
 *   token so the token cannot be derived from source code and can be rotated
 *   by changing the variable.
 *
 * This module is intentionally free of `server-only` and `next/headers` so
 * the pure logic stays unit-testable under `tsx --test`; env access is
 * injectable for the same reason. The cookie/session helpers that need the
 * Next runtime live in `admin-session.ts`.
 */

export { SESSION_COOKIE_NAME };

type AdminAuthEnvName = 'ADMIN_EMAIL' | 'ADMIN_PASSWORD_SHA256' | 'ADMIN_SESSION_SECRET';

export class MissingAdminAuthEnvError extends Error {
  readonly code = 'missing_admin_auth_env';

  constructor(readonly envName: AdminAuthEnvName) {
    super(`Missing ${envName}`);
    this.name = 'MissingAdminAuthEnvError';
  }
}

export interface AdminAuthConfig {
  email: string;
  passwordSha256: string;
  sessionSecret: string;
}

function getRequiredEnv(name: AdminAuthEnvName, env: NodeJS.ProcessEnv): string {
  const value = env[name]?.trim();

  if (!value) {
    throw new MissingAdminAuthEnvError(name);
  }

  return value;
}

export function resolveAdminAuthEnv(env: NodeJS.ProcessEnv = process.env): AdminAuthConfig {
  return {
    email: getRequiredEnv('ADMIN_EMAIL', env).toLowerCase(),
    passwordSha256: getRequiredEnv('ADMIN_PASSWORD_SHA256', env).toLowerCase(),
    sessionSecret: getRequiredEnv('ADMIN_SESSION_SECRET', env),
  };
}

export function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

/** Constant-time equality; hashing both sides first equalises buffer lengths. */
function safeEqual(a: string, b: string): boolean {
  const digestA = createHash('sha256').update(a).digest();
  const digestB = createHash('sha256').update(b).digest();
  return timingSafeEqual(digestA, digestB);
}

/** Throws `MissingAdminAuthEnvError` when the admin env vars are not set. */
export function verifyCredentials(
  email: string,
  password: string,
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  const config = resolveAdminAuthEnv(env);
  const emailMatches = safeEqual(email.trim().toLowerCase(), config.email);
  const passwordMatches = safeEqual(sha256(password), config.passwordSha256);
  return emailMatches && passwordMatches;
}

/**
 * Opaque session token stored in the httpOnly cookie. Derived from the env
 * secret, so it is only reproducible by a server holding the env vars.
 */
export function getExpectedSessionToken(env: NodeJS.ProcessEnv = process.env): string {
  const config = resolveAdminAuthEnv(env);
  return sha256(buildSessionTokenPayload(config.email, config.passwordSha256, config.sessionSecret));
}

/** Returns false (rather than throwing) when the admin env is not configured. */
export function isValidSessionToken(
  token: string | undefined | null,
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  if (!token) {
    return false;
  }

  try {
    return safeEqual(token, getExpectedSessionToken(env));
  } catch (error) {
    if (error instanceof MissingAdminAuthEnvError) {
      return false;
    }
    throw error;
  }
}
