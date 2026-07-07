import assert from 'node:assert/strict';
import test from 'node:test';

import {
  MissingAdminAuthEnvError,
  getExpectedSessionToken,
  isValidSessionToken,
  resolveAdminAuthEnv,
  sha256,
  verifyCredentials,
} from './admin-auth';

const TEST_ENV: NodeJS.ProcessEnv = {
  NODE_ENV: 'test',
  ADMIN_EMAIL: 'admin@example.com',
  ADMIN_PASSWORD_SHA256: sha256('correct horse battery staple'),
  ADMIN_SESSION_SECRET: 'unit-test-session-secret',
};

const EMPTY_ENV: NodeJS.ProcessEnv = { NODE_ENV: 'test' };

test('resolveAdminAuthEnv requires all three variables', () => {
  assert.deepEqual(resolveAdminAuthEnv(TEST_ENV), {
    email: 'admin@example.com',
    passwordSha256: TEST_ENV.ADMIN_PASSWORD_SHA256,
    sessionSecret: 'unit-test-session-secret',
  });

  for (const missing of ['ADMIN_EMAIL', 'ADMIN_PASSWORD_SHA256', 'ADMIN_SESSION_SECRET']) {
    const env = { ...TEST_ENV, [missing]: '' };
    assert.throws(() => resolveAdminAuthEnv(env), MissingAdminAuthEnvError);
  }
});

test('verifyCredentials accepts the correct email + password (email is case/space-insensitive)', () => {
  assert.equal(verifyCredentials('admin@example.com', 'correct horse battery staple', TEST_ENV), true);
  assert.equal(verifyCredentials('Admin@Example.com', 'correct horse battery staple', TEST_ENV), true);
  assert.equal(
    verifyCredentials('  ADMIN@EXAMPLE.COM  ', 'correct horse battery staple', TEST_ENV),
    true,
  );
});

test('verifyCredentials rejects a wrong password or wrong email', () => {
  assert.equal(verifyCredentials('admin@example.com', 'wrong password', TEST_ENV), false);
  assert.equal(verifyCredentials('someone@else.com', 'correct horse battery staple', TEST_ENV), false);
  assert.equal(verifyCredentials('', '', TEST_ENV), false);
});

test('verifyCredentials surfaces missing configuration as a typed error', () => {
  assert.throws(
    () => verifyCredentials('admin@example.com', 'correct horse battery staple', EMPTY_ENV),
    MissingAdminAuthEnvError,
  );
});

test('session token round-trips, rejects invalid tokens, and depends on the secret', () => {
  const token = getExpectedSessionToken(TEST_ENV);
  assert.equal(isValidSessionToken(token, TEST_ENV), true);
  assert.equal(isValidSessionToken('not-the-token', TEST_ENV), false);
  assert.equal(isValidSessionToken(undefined, TEST_ENV), false);
  assert.equal(isValidSessionToken(null, TEST_ENV), false);
  assert.equal(isValidSessionToken('', TEST_ENV), false);

  const rotated = { ...TEST_ENV, ADMIN_SESSION_SECRET: 'rotated-secret' };
  assert.equal(isValidSessionToken(token, rotated), false);
});

test('isValidSessionToken returns false instead of throwing when env is missing', () => {
  assert.equal(isValidSessionToken('any-token', EMPTY_ENV), false);
});
