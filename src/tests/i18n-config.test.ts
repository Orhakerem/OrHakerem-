import assert from 'node:assert/strict';
import test from 'node:test';

import { stripLocalePrefix } from '../i18n/config';

test('stripLocalePrefix strips the /en rewrite prefix', () => {
  assert.equal(stripLocalePrefix('/en'), '/');
  assert.equal(stripLocalePrefix('/en/terms'), '/terms');
  assert.equal(stripLocalePrefix('/en/blog/some-slug'), '/blog/some-slug');
});

test('stripLocalePrefix strips /fr and /he prefixes', () => {
  assert.equal(stripLocalePrefix('/fr'), '/');
  assert.equal(stripLocalePrefix('/fr/terms'), '/terms');
  assert.equal(stripLocalePrefix('/he'), '/');
  assert.equal(stripLocalePrefix('/he/faq'), '/faq');
});

test('stripLocalePrefix passes through already-unprefixed paths', () => {
  assert.equal(stripLocalePrefix('/terms'), '/terms');
  assert.equal(stripLocalePrefix('/'), '/');
  assert.equal(stripLocalePrefix('/properties/penthouse-jacuzzi'), '/properties/penthouse-jacuzzi');
});
