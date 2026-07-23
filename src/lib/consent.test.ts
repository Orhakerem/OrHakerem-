import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CONSENT_POLICY_VERSION,
  CONSENT_SCHEMA_VERSION,
  createStoredConsent,
  parseStoredConsent,
  resolveConsent,
} from './consent';

const NOW = '2026-07-24T10:00:00.000Z';

function createValidRawConsent(overrides: Record<string, unknown> = {}) {
  return JSON.stringify({
    schemaVersion: CONSENT_SCHEMA_VERSION,
    policyVersion: CONSENT_POLICY_VERSION,
    preferences: {
      analytics: true,
      marketing: false,
    },
    decidedAt: NOW,
    source: 'explicit',
    ...overrides,
  });
}

test('parses a valid stored consent', () => {
  assert.deepEqual(parseStoredConsent(createValidRawConsent()), {
    schemaVersion: CONSENT_SCHEMA_VERSION,
    policyVersion: CONSENT_POLICY_VERSION,
    preferences: {
      analytics: true,
      marketing: false,
    },
    decidedAt: NOW,
    source: 'explicit',
  });
});

test('rejects absent, malformed, incomplete, or incorrectly typed stored consent', () => {
  const invalidValues = [
    null,
    '',
    '{invalid-json',
    'null',
    '[]',
    JSON.stringify({}),
    createValidRawConsent({
      preferences: {
        analytics: 'yes',
        marketing: false,
      },
    }),
    createValidRawConsent({ decidedAt: null }),
    createValidRawConsent({ source: 'unknown' }),
    createValidRawConsent({ source: ['explicit'] }),
  ];

  for (const raw of invalidValues) {
    assert.equal(parseStoredConsent(raw), null);
  }
});

test('creates an explicit consent record and copies its preferences', () => {
  const preferences = {
    analytics: true,
    marketing: true,
  };

  const stored = createStoredConsent(preferences, 'explicit', NOW);
  preferences.marketing = false;

  assert.deepEqual(stored, {
    schemaVersion: CONSENT_SCHEMA_VERSION,
    policyVersion: CONSENT_POLICY_VERSION,
    preferences: {
      analytics: true,
      marketing: true,
    },
    decidedAt: NOW,
    source: 'explicit',
  });
  assert.notStrictEqual(stored.preferences, preferences);
});

test('migrates a legacy grant without granting marketing consent', () => {
  assert.deepEqual(resolveConsent(null, 'granted', NOW), {
    preferences: {
      analytics: true,
      marketing: false,
    },
    mustPrompt: true,
    storedConsent: {
      schemaVersion: CONSENT_SCHEMA_VERSION,
      policyVersion: CONSENT_POLICY_VERSION,
      preferences: {
        analytics: true,
        marketing: false,
      },
      decidedAt: NOW,
      source: 'legacy-granted',
    },
    migratedLegacy: true,
  });
});

test('migrates a legacy denial without prompting again', () => {
  assert.deepEqual(resolveConsent(null, 'denied', NOW), {
    preferences: {
      analytics: false,
      marketing: false,
    },
    mustPrompt: false,
    storedConsent: {
      schemaVersion: CONSENT_SCHEMA_VERSION,
      policyVersion: CONSENT_POLICY_VERSION,
      preferences: {
        analytics: false,
        marketing: false,
      },
      decidedAt: NOW,
      source: 'legacy-denied',
    },
    migratedLegacy: true,
  });
});

test('uses safe defaults and prompts when no consent exists', () => {
  assert.deepEqual(resolveConsent(null, null, NOW), {
    preferences: {
      analytics: false,
      marketing: false,
    },
    mustPrompt: true,
    storedConsent: null,
    migratedLegacy: false,
  });
});

test('invalidates consent stored with an obsolete schema or policy version', () => {
  for (const raw of [
    createValidRawConsent({
      schemaVersion: CONSENT_SCHEMA_VERSION - 1,
    }),
    createValidRawConsent({
      policyVersion: '2026-06-04',
    }),
  ]) {
    assert.deepEqual(resolveConsent(raw, null, NOW), {
      preferences: {
        analytics: false,
        marketing: false,
      },
      mustPrompt: true,
      storedConsent: null,
      migratedLegacy: false,
    });
  }
});

test('preserves explicit preferences and ignores legacy storage', () => {
  const current = {
    schemaVersion: CONSENT_SCHEMA_VERSION,
    policyVersion: CONSENT_POLICY_VERSION,
    preferences: {
      analytics: false,
      marketing: true,
    },
    decidedAt: NOW,
    source: 'explicit' as const,
  };

  assert.deepEqual(
    resolveConsent(JSON.stringify(current), 'granted', '2099-01-01T00:00:00.000Z'),
    {
      preferences: current.preferences,
      mustPrompt: false,
      storedConsent: current,
      migratedLegacy: false,
    },
  );
});

test('continues prompting after a legacy grant until an explicit choice is made', () => {
  const migrated = createStoredConsent(
    {
      analytics: true,
      marketing: false,
    },
    'legacy-granted',
    NOW,
  );

  assert.deepEqual(resolveConsent(JSON.stringify(migrated), null), {
    preferences: {
      analytics: true,
      marketing: false,
    },
    mustPrompt: true,
    storedConsent: migrated,
    migratedLegacy: false,
  });
});

test('does not prompt again for a persisted legacy denial', () => {
  const migrated = createStoredConsent(
    {
      analytics: false,
      marketing: false,
    },
    'legacy-denied',
    NOW,
  );

  assert.deepEqual(resolveConsent(JSON.stringify(migrated), null), {
    preferences: {
      analytics: false,
      marketing: false,
    },
    mustPrompt: false,
    storedConsent: migrated,
    migratedLegacy: false,
  });
});
