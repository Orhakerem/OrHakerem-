import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const source = readFileSync(path.join(process.cwd(), 'src/middleware.ts'), 'utf8');

test('legacy accommodation paths are matched by prefix, not by exact string', () => {
  // The matcher routes `/rentals/:path*` here; exact-string matching used to
  // let deep legacy URLs fall through to a 404 instead of the 301.
  assert.match(source, /startsWith\(`\$\{prefix\}\/`\)/);
  assert.ok(!source.includes('LEGACY_ACCOMMODATION_PATHS'));

  for (const prefix of ['/rentals', '/short-term-rentals']) {
    assert.ok(source.includes(`'${prefix}'`));
  }
});
