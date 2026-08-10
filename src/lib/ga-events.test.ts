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

function queue(): Record<string, unknown>[] {
  return (window.dataLayer ?? []) as Record<string, unknown>[];
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
    assert.deepEqual(queue()[0], {
      event: 'generate_lead',
      lead_type: 'reservation_inquiry',
      form_location: 'property_detail',
      locale: 'fr',
    });
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

    assert.deepEqual(Object.keys(queue()[0]).sort(), [
      'event',
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

    assert.deepEqual(queue()[0], {
      event: 'contact_outbound',
      method: 'whatsapp',
      location: 'floating_button',
      locale: 'he',
    });
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
