import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const sourcePath = fileURLToPath(new URL('../app/[locale]/faq/page.tsx', import.meta.url));
const source = readFileSync(sourcePath, 'utf8');

test('FAQ contact footer links to the support email address', () => {
  assert.match(source, /href="mailto:keremliving@gmail\.com"/);
  assert.match(source, /keremliving@gmail\.com/);
});
