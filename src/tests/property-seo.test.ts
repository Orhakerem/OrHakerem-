import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { generateMetadata as termsMetadata } from '../app/[locale]/terms/layout';
import {
  generateMetadata as propertyMetadata,
} from '../app/[locale]/properties/[id]/layout';
import { SITE_URL } from '../app/seo';
import { BOOKABLE_PROPERTY_IDS } from '../lib/bookable-properties';
import { getPropertySeo, getPropertyStructuredData } from '../lib/property-seo';
import { localizePath, type Locale } from '../i18n/config';

const locales: readonly Locale[] = ['en', 'fr', 'he'];
const BUSINESS_ID = `${SITE_URL}/#business`;
const propertyPageSource = readFileSync(
  fileURLToPath(new URL('../app/[locale]/properties/[id]/page.tsx', import.meta.url)),
  'utf8',
);

function propertyUrl(locale: Locale, id: string) {
  return `${SITE_URL}${localizePath(locale, `/properties/${id}`)}`;
}

test('property structured data uses the localized canonical URL and central business ID', () => {
  for (const locale of locales) {
    for (const id of BOOKABLE_PROPERTY_IDS) {
      const schema = getPropertyStructuredData(id, locale);
      const url = propertyUrl(locale, id);

      assert.equal(schema.url, url);
      assert.equal(schema['@id'], `${url}#lodging-business`);
      assert.equal(schema.makesOffer.url, url);
      assert.equal(schema.description, getPropertySeo(locale)[id].description);
      assert.equal(schema.inLanguage, locale);
      assert.equal(schema.parentOrganization['@id'], BUSINESS_ID);
      assert.equal(schema.makesOffer.seller['@id'], BUSINESS_ID);
    }
  }
});

test('property metadata is localized and invalid property metadata is non-indexable', () => {
  for (const locale of locales) {
    const id = 'penthouse-jacuzzi';
    const metadata = propertyMetadata({ params: { locale, id } });
    const url = propertyUrl(locale, id);

    assert.equal(metadata.alternates?.canonical, url);
    assert.equal(metadata.openGraph?.url, url);
    assert.ok(metadata.robots && typeof metadata.robots !== 'string');
    assert.equal(metadata.robots.index, true);
  }

  const invalidMetadata = propertyMetadata({
    params: { locale: 'en', id: 'not-a-property' },
  });

  assert.deepEqual(invalidMetadata.alternates, { canonical: null });
  assert.deepEqual(invalidMetadata.robots, { index: false, follow: false });
});

test('unknown properties invoke notFound before their availability lookup', () => {
  assert.match(propertyPageSource, /if \(!isBookablePropertyId\(params\.id\)\) \{\s*notFound\(\);\s*\}/);
  assert.ok(
    propertyPageSource.indexOf('notFound();') < propertyPageSource.indexOf('getPropertyAvailability(params.id)'),
  );
});

test('terms metadata has localized Open Graph and Twitter fields', () => {
  for (const locale of locales) {
    const metadata = termsMetadata({ params: { locale } });
    const url = `${SITE_URL}${localizePath(locale, '/terms')}`;

    assert.equal(metadata.alternates?.canonical, url);
    assert.equal(metadata.openGraph?.url, url);
    assert.equal(metadata.openGraph?.locale, { en: 'en_US', fr: 'fr_FR', he: 'he_IL' }[locale]);
    const twitter = metadata.twitter;
    assert.ok(twitter && typeof twitter !== 'string' && 'card' in twitter);
    assert.equal(twitter.card, 'summary_large_image');
  }
});
