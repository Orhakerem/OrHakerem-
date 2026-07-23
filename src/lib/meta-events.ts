'use client';

import type { Locale } from '@/i18n/config';

export type MetaPixelFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
    __orHakeremMetaMarketingConsent?: boolean;
    __orHakeremMetaPixelIds?: string[];
    __orHakeremMetaLastPageView?: string;
  }
}

export type MetaLeadType =
  | 'contact_inquiry'
  | 'concierge_inquiry'
  | 'event_inquiry'
  | 'reservation_inquiry';

export type MetaLeadFormLocation =
  | 'contact'
  | 'services'
  | 'events'
  | 'reservation'
  | 'property_detail';

export interface MetaLeadEvent {
  leadType: MetaLeadType;
  formLocation: MetaLeadFormLocation;
  locale: Locale;
}

export function setMetaMarketingConsent(granted: boolean) {
  if (typeof window === 'undefined') return;

  window.__orHakeremMetaMarketingConsent = granted;

  if (typeof window.fbq !== 'function') return;

  try {
    window.fbq('consent', granted ? 'grant' : 'revoke');
  } catch {
    // Third-party tracking must never interrupt consent controls.
  }
}

export function trackMetaLead({
  leadType,
  formLocation,
  locale,
}: MetaLeadEvent) {
  if (
    typeof window === 'undefined' ||
    window.__orHakeremMetaMarketingConsent !== true ||
    typeof window.fbq !== 'function'
  ) {
    return false;
  }

  try {
    window.fbq('track', 'Lead', {
      content_name: leadType,
      content_category: formLocation,
      locale,
    });
  } catch {
    // A Meta runtime failure must not turn a successful form into an error.
    return false;
  }

  return true;
}
