import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';

import {
  checkAdminLoginRateLimit,
  clearAdminLoginFailures,
  registerFailedAdminLogin,
  resetAdminLoginRateLimit,
} from './admin-login-rate-limit';

const KEY = '203.0.113.7';
const WINDOW_MS = 15 * 60 * 1000;

beforeEach(() => {
  resetAdminLoginRateLimit();
});

test('allows attempts until five failures land inside the window', () => {
  const now = 1_000_000;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    assert.equal(checkAdminLoginRateLimit(KEY, now).allowed, true);
    registerFailedAdminLogin(KEY, now);
  }

  const blocked = checkAdminLoginRateLimit(KEY, now);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterMs, WINDOW_MS);
});

test('window expiry resets the failure count', () => {
  const now = 1_000_000;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    registerFailedAdminLogin(KEY, now);
  }
  assert.equal(checkAdminLoginRateLimit(KEY, now).allowed, false);

  assert.equal(checkAdminLoginRateLimit(KEY, now + WINDOW_MS).allowed, true);

  registerFailedAdminLogin(KEY, now + WINDOW_MS);
  assert.equal(checkAdminLoginRateLimit(KEY, now + WINDOW_MS).allowed, true);
});

test('a successful login clears the failures for that key only', () => {
  const now = 1_000_000;

  for (let attempt = 0; attempt < 5; attempt += 1) {
    registerFailedAdminLogin(KEY, now);
    registerFailedAdminLogin('other-key', now);
  }

  clearAdminLoginFailures(KEY);

  assert.equal(checkAdminLoginRateLimit(KEY, now).allowed, true);
  assert.equal(checkAdminLoginRateLimit('other-key', now).allowed, false);
});
