'use client';

import type { Locale } from '@/i18n/config';
import type { MetaLeadFormLocation, MetaLeadType } from '@/lib/meta-events';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-J0Q3G9CZWW';

/**
 * Lead taxonomy is shared with the Meta integration on purpose: both trackers
 * describe the same five conversion points, so the vocabulary must not drift.
 */
export interface GaLeadEvent {
  leadType: MetaLeadType;
  formLocation: MetaLeadFormLocation;
  locale: Locale;
}

export type GaOutboundMethod = 'whatsapp';

export type GaOutboundLocation =
  | 'floating_button'
  | 'contact_page'
  | 'navbar'
  | 'footer_social'
  | 'footer_link';

export interface GaOutboundEvent {
  method: GaOutboundMethod;
  location: GaOutboundLocation;
  locale: Locale;
}

/**
 * Analytics consent is expressed by CookieConsent through the standard
 * `ga-disable-<ID>` window flag. Treat anything other than an explicit
 * "not disabled" as a refusal, so a missing flag never leaks an event.
 */
function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;

  const disabled = (window as unknown as Record<string, unknown>)[
    `ga-disable-${GA_MEASUREMENT_ID}`
  ];

  return disabled !== true;
}

/**
 * Queue a gtag.js command.
 *
 * gtag.js only processes dataLayer entries that are `arguments` objects whose
 * first element is a command ('js', 'config', 'event', …). A plain
 * `{ event: 'generate_lead' }` object is *GTM's* format, and gtag.js — which
 * is what `GoogleAnalytics.tsx` loads — ignores it silently. The first version
 * of this file pushed that object shape, so every lead event was dropped
 * before it ever reached GA4.
 *
 * Building a real `arguments` object here makes the queue entry byte-identical
 * to what `window.gtag()` would push, without depending on `window.gtag`
 * existing yet: the loader is `afterInteractive`, so an early submit can beat
 * it. gtag.js drains whatever is already queued once it boots.
 */
function queueGtagCommand(...args: unknown[]): void {
  window.dataLayer = window.dataLayer || [];

  (function () {
    // eslint-disable-next-line prefer-rest-params
    (window.dataLayer as unknown[]).push(arguments);
  }).apply(null, args as []);
}

function push(eventName: string, params: Record<string, unknown>): boolean {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) {
    return false;
  }

  try {
    queueGtagCommand('event', eventName, params);
  } catch {
    // Analytics must never turn a successful submission into a failure.
    return false;
  }

  return true;
}

/**
 * Emits GA4's recommended `generate_lead` event. Carries only the taxonomy —
 * never a form field, name, email or phone number.
 */
export function trackGaLead({
  leadType,
  formLocation,
  locale,
}: GaLeadEvent): boolean {
  return push('generate_lead', {
    lead_type: leadType,
    form_location: formLocation,
    locale,
  });
}

/**
 * A WhatsApp click is intent, not a submitted enquiry, so it stays a separate
 * event — folding it into generate_lead would inflate the conversion rate.
 */
export function trackGaOutboundContact({
  method,
  location,
  locale,
}: GaOutboundEvent): boolean {
  return push('contact_outbound', {
    method,
    location,
    locale,
  });
}
