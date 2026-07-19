import type { Metadata } from 'next';
import { ENABLED_LOCALES, DEFAULT_LOCALE, localizePath, type Locale } from '@/i18n/config';

export const SITE_URL = 'https://www.orhakerem.com';
export const DEFAULT_OG_IMAGE = '/og-image.jpg';
export const DEFAULT_OG_IMAGE_ALT = 'Or Hakerem rooftop jacuzzi with Tel Aviv skyline';
export const DEFAULT_OPEN_GRAPH_IMAGE = {
  url: DEFAULT_OG_IMAGE,
  width: 1200,
  height: 630,
  alt: DEFAULT_OG_IMAGE_ALT,
  type: 'image/jpeg',
};

export function createCanonicalUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function createCanonicalMetadata(path: string): Metadata {
  return {
    alternates: {
      canonical: createCanonicalUrl(path),
    },
  };
}

/**
 * Builds the canonical + hreflang alternates block for a page available in
 * all locales. `path` is the unprefixed (English) site-relative path, e.g.
 * '/about'. x-default points at the English (unprefixed) URL.
 */
export function createLocalizedAlternates(
  path: string,
  locale: Locale,
  availableLocales: readonly Locale[] = ENABLED_LOCALES,
): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const loc of availableLocales) {
    languages[loc] = createCanonicalUrl(localizePath(loc, path));
  }
  languages['x-default'] = createCanonicalUrl(localizePath(DEFAULT_LOCALE, path));

  return {
    canonical: createCanonicalUrl(localizePath(locale, path)),
    languages,
  };
}
