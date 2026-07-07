import assert from 'node:assert/strict';
import test from 'node:test';

import { buildPropertyStatusRow } from './admin-calendar-status';

test('buildPropertyStatusRow normalizes current apartment status', () => {
  assert.deepEqual(
    buildPropertyStatusRow(
      {
        propertyId: 'penthouse-jacuzzi',
        status: 'dirty',
        note: ' Towels pending ',
      },
      'admin',
    ),
    {
      property_id: 'penthouse-jacuzzi',
      status: 'dirty',
      note: 'Towels pending',
      updated_by: 'admin',
    },
  );
});

test('buildPropertyStatusRow rejects invalid apartment status', () => {
  assert.throws(
    () =>
      buildPropertyStatusRow(
        {
          propertyId: 'cozy-studio',
          status: 'blocked' as never,
          note: '',
        },
        null,
      ),
    /Invalid enum value/,
  );
});
