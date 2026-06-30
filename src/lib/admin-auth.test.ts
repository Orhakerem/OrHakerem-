import assert from 'node:assert/strict';
import test from 'node:test';

import {
  ADMIN_PASSWORD_SHA256,
  getExpectedSessionToken,
  isValidSessionToken,
  sha256,
  verifyCredentials,
} from './admin-auth';

test('sha256 reproduces the pinned hash of the admin password', () => {
  assert.equal(sha256('080223'), ADMIN_PASSWORD_SHA256);
});

test('verifyCredentials accepts the correct email + password (email is case/space-insensitive)', () => {
  assert.equal(verifyCredentials('keremliving@gmail.com', '080223'), true);
  assert.equal(verifyCredentials('Keremliving@gmail.com', '080223'), true);
  assert.equal(verifyCredentials('  KEREMLIVING@GMAIL.COM  ', '080223'), true);
});

test('verifyCredentials rejects a wrong password or wrong email', () => {
  assert.equal(verifyCredentials('keremliving@gmail.com', '080224'), false);
  assert.equal(verifyCredentials('someone@else.com', '080223'), false);
  assert.equal(verifyCredentials('', ''), false);
});

test('session token round-trips and rejects invalid tokens', () => {
  const token = getExpectedSessionToken();
  assert.equal(isValidSessionToken(token), true);
  assert.equal(isValidSessionToken('not-the-token'), false);
  assert.equal(isValidSessionToken(undefined), false);
  assert.equal(isValidSessionToken(null), false);
  assert.equal(isValidSessionToken(''), false);
});
