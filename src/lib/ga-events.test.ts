import assert from 'node:assert/strict';
import { afterEach, describe, test } from 'node:test';

import {
  GA_MEASUREMENT_ID,
  trackGaLead,
  trackGaOutboundContact,
} from './ga-events';

const originalWindowDescriptor = Object.getOwnPropertyDescriptor(
  globalThis,
  'window',
);

function installWindow({
  disabled,
  dataLayer,
}: { disabled?: boolean; dataLayer?: unknown } = {}) {
  const value: Record<string, unknown> = {};

  if (disabled !== undefined) {
    value[`ga-disable-${GA_MEASUREMENT_ID}`] = disabled;
  }

  if (dataLayer !== undefined) {
    value.dataLayer = dataLayer;
  }

  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value,
    writable: true,
  });

  return value;
}

function queue(): IArguments[] {
  return (window.dataLayer ?? []) as IArguments[];
}

/**
 * gtag.js reads dataLayer entries as `arguments` objects: [command, name,
 * params]. Asserting on that shape — not on a `{ event }` object — is the
 * whole point: the object form is GTM's and gtag.js drops it silently.
 */
function commandAt(index: number): [unknown, unknown, unknown] {
  const entry = queue()[index];
  assert.equal(typeof entry, 'object');
  assert.equal(entry.length, 3);
  return [entry[0], entry[1], entry[2]];
}

afterEach(() => {
  if (originalWindowDescriptor) {
    Object.defineProperty(globalThis, 'window', originalWindowDescriptor);
  } else {
    Reflect.deleteProperty(globalThis, 'window');
  }
});

describe('GA4 lead tracking', () => {
  test('is safe outside the browser', () => {
    Reflect.deleteProperty(globalThis, 'window');

    assert.equal(
      trackGaLead({
        leadType: 'contact_inquiry',
        formLocation: 'contact',
        locale: 'en',
      }),
      false,
    );
  });

  test('emits generate_lead with the full taxonomy once consent is granted', () => {
    installWindow({ disabled: false });

    assert.equal(
      trackGaLead({
        leadType: 'reservation_inquiry',
        formLocation: 'property_detail',
        locale: 'fr',
      }),
      true,
    );

    assert.equal(queue().length, 1);
    assert.deepEqual(commandAt(0), [
      'event',
      'generate_lead',
      {
        lead_type: 'reservation_inquiry',
        form_location: 'property_detail',
        locale: 'fr',
      },
    ]);
  });

  test('creates the queue when gtag has not booted yet', () => {
    installWindow({ disabled: false });

    assert.equal(window.dataLayer, undefined);
    trackGaLead({
      leadType: 'event_inquiry',
      formLocation: 'events',
      locale: 'he',
    });

    assert.ok(Array.isArray(window.dataLayer));
    assert.equal(queue().length, 1);
  });

  test('appends to an existing queue instead of replacing it', () => {
    installWindow({ disabled: false, dataLayer: [{ event: 'page_view' }] });

    trackGaLead({
      leadType: 'concierge_inquiry',
      formLocation: 'services',
      locale: 'en',
    });

    assert.equal(queue().length, 2);
    assert.deepEqual(queue()[0], { event: 'page_view' });
    assert.equal(commandAt(1)[1], 'generate_lead');
  });

  test('refuses to emit when analytics consent is withdrawn', () => {
    installWindow({ disabled: true });

    assert.equal(
      trackGaLead({
        leadType: 'contact_inquiry',
        formLocation: 'contact',
        locale: 'en',
      }),
      false,
    );
    assert.equal(window.dataLayer, undefined);
  });

  test('never throws when the queue is hostile', () => {
    installWindow({
      disabled: false,
      dataLayer: {
        push() {
          throw new Error('dataLayer unavailable');
        },
      },
    });

    assert.doesNotThrow(() => {
      assert.equal(
        trackGaLead({
          leadType: 'contact_inquiry',
          formLocation: 'contact',
          locale: 'en',
        }),
        false,
      );
    });
  });

  test('cannot forward personal or form data', () => {
    installWindow({ disabled: false });

    trackGaLead({
      leadType: 'contact_inquiry',
      formLocation: 'contact',
      locale: 'en',
      // Extra fields must be dropped by the explicit payload shape.
      email: 'guest@example.com',
      name: 'Guest Name',
    } as Parameters<typeof trackGaLead>[0] & {
      email: string;
      name: string;
    });

    assert.deepEqual(Object.keys(commandAt(0)[2] as object).sort(), [
      'form_location',
      'lead_type',
      'locale',
    ]);
  });
});

describe('GA4 outbound contact tracking', () => {
  test('emits contact_outbound separately from generate_lead', () => {
    installWindow({ disabled: false });

    assert.equal(
      trackGaOutboundContact({
        method: 'whatsapp',
        location: 'floating_button',
        locale: 'he',
      }),
      true,
    );

    assert.deepEqual(commandAt(0), [
      'event',
      'contact_outbound',
      { method: 'whatsapp', location: 'floating_button', locale: 'he' },
    ]);
  });

  test('respects withdrawn analytics consent', () => {
    installWindow({ disabled: true });

    assert.equal(
      trackGaOutboundContact({
        method: 'whatsapp',
        location: 'contact_page',
        locale: 'en',
      }),
      false,
    );
    assert.equal(window.dataLayer, undefined);
  });
});
