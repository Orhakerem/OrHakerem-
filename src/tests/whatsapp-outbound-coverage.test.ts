import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

const root = process.cwd();

/**
 * The first GA4 pass instrumented only 2 of the 5 WhatsApp CTAs — the navbar
 * and both footer entry points were missed, and they render on every page.
 * This guard makes that class of omission impossible to reintroduce.
 */
function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else if (entry.endsWith('.tsx')) {
      out.push(full);
    }
  }
  return out;
}

test('every WhatsApp CTA reports an outbound contact event', () => {
  const offenders: string[] = [];

  for (const file of walk(join(root, 'src'))) {
    const text = readFileSync(file, 'utf8');
    if (!text.includes('wa.me')) continue;

    if (!text.includes('trackGaOutboundContact')) {
      offenders.push(file.replace(`${root}/`, ''));
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `these files link to WhatsApp without tracking the click: ${offenders.join(', ')}`,
  );
});
