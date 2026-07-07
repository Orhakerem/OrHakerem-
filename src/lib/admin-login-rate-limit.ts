/**
 * Best-effort in-memory rate limit for admin login attempts. State is per
 * server instance (resets on redeploy / new serverless instance), which is
 * acceptable for a single-admin back office — it exists to blunt casual
 * brute-force, not to be a distributed rate limiter.
 */

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FAILED_ATTEMPTS = 5;

interface FailureWindow {
  count: number;
  windowStartedAt: number;
}

const failuresByKey = new Map<string, FailureWindow>();

export interface AdminLoginRateLimitStatus {
  allowed: boolean;
  retryAfterMs: number;
}

export function checkAdminLoginRateLimit(
  key: string,
  now: number = Date.now(),
): AdminLoginRateLimitStatus {
  const entry = failuresByKey.get(key);

  if (!entry || now - entry.windowStartedAt >= WINDOW_MS) {
    return { allowed: true, retryAfterMs: 0 };
  }

  if (entry.count < MAX_FAILED_ATTEMPTS) {
    return { allowed: true, retryAfterMs: 0 };
  }

  return { allowed: false, retryAfterMs: entry.windowStartedAt + WINDOW_MS - now };
}

export function registerFailedAdminLogin(key: string, now: number = Date.now()): void {
  const entry = failuresByKey.get(key);

  if (!entry || now - entry.windowStartedAt >= WINDOW_MS) {
    failuresByKey.set(key, { count: 1, windowStartedAt: now });
    return;
  }

  entry.count += 1;
}

export function clearAdminLoginFailures(key: string): void {
  failuresByKey.delete(key);
}

/** Test-only helper so unit tests do not leak state between cases. */
export function resetAdminLoginRateLimit(): void {
  failuresByKey.clear();
}
