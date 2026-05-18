import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const sourcePath = fileURLToPath(new URL('../app/faq/page.tsx', import.meta.url));
const source = readFileSync(sourcePath, 'utf8');

test('FAQ Ask directly CTA keeps its contact destination and uses liquid glass styling', () => {
  assert.match(source, /import LiquidGlassCTA from '@\/components\/LiquidGlassCTA';/);
  assert.match(
    source,
    /<LiquidGlassCTA[\s\S]*href="\/#contact"[\s\S]*>[\s\S]*Ask directly[\s\S]*<\/LiquidGlassCTA>/,
  );
});
