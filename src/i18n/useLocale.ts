'use client';

import { useParams } from 'next/navigation';
import { DEFAULT_LOCALE, isLocale, type Locale } from '@/i18n/config';

/**
 * Current locale from the [locale] route segment. Every public page renders
 * inside that segment, so no provider is needed.
 */
export function useLocale(): Locale {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale;
  return typeof locale === 'string' && isLocale(locale) ? locale : DEFAULT_LOCALE;
}
