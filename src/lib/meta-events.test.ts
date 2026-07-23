import assert from 'node:assert/strict';
import { afterEach, describe, test } from 'node:test';

import {
  setMetaMarketingConsent,
  trackMetaLead,
  type MetaLeadFormLocation,
  type MetaLeadType,
} from './meta-events';

const originalWindowDescriptor = Object.getOwnPropertyDescriptor(
  globalThis,
  'window',
);

type FbqCall = unknown[];

function installWindow(fbq?: unknown) {
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: {
      fbq,
    },
    writable: true,
  });

  return window;
}

afterEach(() => {
  if (originalWindowDescriptor) {
    Object.defineProperty(globalThis, 'window', originalWindowDescriptor);
  } else {
    Reflect.deleteProperty(globalThis, 'window');
  }
});

describe('Meta Lead tracking', () => {
  test('is safe outside the browser', () => {
    Reflect.deleteProperty(globalThis, 'window');

    assert.doesNotThrow(() => setMetaMarketingConsent(true));
    assert.equal(
      trackMetaLead({
        leadType: 'contact_inquiry',
        formLocation: 'contact',
        locale: 'en',
      }),
      false,
    );
  });

  test('does not emit a Lead without explicit marketing consent', () => {
    const calls: FbqCall[] = [];
    installWindow((...args: unknown[]) => calls.push(args));

    assert.equal(
      trackMetaLead({
        leadType: 'contact_inquiry',
        formLocation: 'contact',
        locale: 'fr',
      }),
      false,
    );
    assert.deepEqual(calls, []);
  });

  test('blocks future Leads after consent is revoked while fbq remains available', () => {
    const calls: FbqCall[] = [];
    const browserWindow = installWindow((...args: unknown[]) => calls.push(args));

    setMetaMarketingConsent(true);
    setMetaMarketingConsent(false);

    assert.equal(browserWindow.__orHakeremMetaMarketingConsent, false);
    assert.equal(
      trackMetaLead({
        leadType: 'reservation_inquiry',
        formLocation: 'reservation',
        locale: 'he',
      }),
      false,
    );
    assert.deepEqual(calls, [
      ['consent', 'grant'],
      ['consent', 'revoke'],
    ]);
  });

  test('does not crash when fbq is absent', () => {
    const browserWindow = installWindow();

    assert.doesNotThrow(() => setMetaMarketingConsent(true));
    assert.equal(browserWindow.__orHakeremMetaMarketingConsent, true);
    assert.equal(
      trackMetaLead({
        leadType: 'event_inquiry',
        formLocation: 'events',
        locale: 'en',
      }),
      false,
    );
  });

  test('does not let an invalid or failing fbq runtime break the form flow', () => {
    const invalidWindow = installWindow({ loaded: true });
    invalidWindow.__orHakeremMetaMarketingConsent = true;

    assert.doesNotThrow(() => setMetaMarketingConsent(false));
    assert.equal(
      trackMetaLead({
        leadType: 'contact_inquiry',
        formLocation: 'contact',
        locale: 'en',
      }),
      false,
    );

    const failingWindow = installWindow(() => {
      throw new Error('blocked by browser extension');
    });
    failingWindow.__orHakeremMetaMarketingConsent = true;

    assert.doesNotThrow(() => setMetaMarketingConsent(true));
    assert.equal(
      trackMetaLead({
        leadType: 'event_inquiry',
        formLocation: 'events',
        locale: 'fr',
      }),
      false,
    );
  });

  test('synchronizes grant and revoke commands with the in-memory consent state', () => {
    const calls: FbqCall[] = [];
    const browserWindow = installWindow((...args: unknown[]) => calls.push(args));

    setMetaMarketingConsent(true);
    assert.equal(browserWindow.__orHakeremMetaMarketingConsent, true);

    setMetaMarketingConsent(false);
    assert.equal(browserWindow.__orHakeremMetaMarketingConsent, false);
    assert.deepEqual(calls, [
      ['consent', 'grant'],
      ['consent', 'revoke'],
    ]);
  });

  test('emits exactly one standard Lead with only the allowed payload', () => {
    const calls: FbqCall[] = [];
    const browserWindow = installWindow((...args: unknown[]) => calls.push(args));
    browserWindow.__orHakeremMetaMarketingConsent = true;

    assert.equal(
      trackMetaLead({
        leadType: 'concierge_inquiry',
        formLocation: 'services',
        locale: 'fr',
        userInput: 'must not be forwarded',
      } as Parameters<typeof trackMetaLead>[0] & { userInput: string }),
      true,
    );

    assert.deepEqual(calls, [
      [
        'track',
        'Lead',
        {
          content_name: 'concierge_inquiry',
          content_category: 'services',
          locale: 'fr',
        },
      ],
    ]);
    assert.deepEqual(
      Object.keys(calls[0]?.[2] as Record<string, unknown>).sort(),
      ['content_category', 'content_name', 'locale'],
    );
  });

  test('supports all four categories and five locations', () => {
    const calls: FbqCall[] = [];
    const browserWindow = installWindow((...args: unknown[]) => calls.push(args));
    browserWindow.__orHakeremMetaMarketingConsent = true;

    const leadTypes: MetaLeadType[] = [
      'contact_inquiry',
      'concierge_inquiry',
      'event_inquiry',
      'reservation_inquiry',
    ];
    const formLocations: MetaLeadFormLocation[] = [
      'contact',
      'services',
      'events',
      'reservation',
      'property_detail',
    ];

    for (const leadType of leadTypes) {
      trackMetaLead({
        leadType,
        formLocation: 'contact',
        locale: 'en',
      });
    }

    for (const formLocation of formLocations) {
      trackMetaLead({
        leadType: 'reservation_inquiry',
        formLocation,
        locale: 'he',
      });
    }

    assert.deepEqual(
      calls.slice(0, leadTypes.length).map(call => {
        const payload = call[2] as Record<string, string>;
        return payload.content_name;
      }),
      leadTypes,
    );
    assert.deepEqual(
      calls.slice(leadTypes.length).map(call => {
        const payload = call[2] as Record<string, string>;
        return payload.content_category;
      }),
      formLocations,
    );
    assert.ok(
      calls.every(call => call[0] === 'track' && call[1] === 'Lead'),
      'every supported category and location must use the standard Lead event',
    );
  });

  test('depends on marketing consent independently of analytics consent', () => {
    const calls: FbqCall[] = [];
    const browserWindow = installWindow((...args: unknown[]) => calls.push(args));
    const analyticsFlag = 'ga-disable-G-TEST';

    (browserWindow as unknown as Record<string, unknown>)[analyticsFlag] = false;
    browserWindow.__orHakeremMetaMarketingConsent = false;
    assert.equal(
      trackMetaLead({
        leadType: 'contact_inquiry',
        formLocation: 'contact',
        locale: 'en',
      }),
      false,
    );

    (browserWindow as unknown as Record<string, unknown>)[analyticsFlag] = true;
    browserWindow.__orHakeremMetaMarketingConsent = true;
    assert.equal(
      trackMetaLead({
        leadType: 'contact_inquiry',
        formLocation: 'contact',
        locale: 'en',
      }),
      true,
    );

    assert.equal(
      calls.filter(call => call[0] === 'track' && call[1] === 'Lead').length,
      1,
    );
  });
});
