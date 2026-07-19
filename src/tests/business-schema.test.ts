import assert from 'node:assert/strict';
import test from 'node:test';

import { SITE_URL } from '../app/seo';
import {
  BUSINESS_NAME,
  BUSINESS_NAP,
  GOOGLE_BUSINESS_PROFILE_URL,
  getBusinessStructuredData,
} from '../lib/business-schema';

test('shared business schema uses the verified Google profile and canonical NAP', () => {
  for (const locale of ['en', 'fr', 'he'] as const) {
    const schema = getBusinessStructuredData(locale, 'A localized description.');

    assert.equal(schema.name, BUSINESS_NAME);
    assert.equal(schema['@id'], `${SITE_URL}/#business`);
    assert.equal(schema.url, SITE_URL);
    assert.equal(schema.inLanguage, locale);
    assert.equal(schema.telephone, BUSINESS_NAP.telephone);
    assert.equal(schema.address.streetAddress, '35 HaKovshim St');
    assert.equal(schema.address.addressLocality, 'Tel Aviv-Yafo');
    assert.equal(schema.address.postalCode, '6329302');
    assert.ok(schema.sameAs.includes(GOOGLE_BUSINESS_PROFILE_URL));
  }

  assert.equal(BUSINESS_NAME, 'Or Hakerem');
  assert.equal(GOOGLE_BUSINESS_PROFILE_URL, 'https://www.google.com/maps?cid=11119085925362597877');
});
