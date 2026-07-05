export const LOCALES = ['en', 'fr', 'he'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

// Locales currently served to visitors. Flipped to the full LOCALES set once
// the French and Hebrew translations are complete; until then /fr and /he 404.
export const ENABLED_LOCALES: readonly Locale[] = ['en', 'fr', 'he'];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function isEnabledLocale(value: string): value is Locale {
  return (ENABLED_LOCALES as readonly string[]).includes(value);
}

export function isRtl(locale: Locale): boolean {
  return locale === 'he';
}

/**
 * Prefixes a site-relative path for the given locale. The default locale (en)
 * lives on unprefixed URLs; fr/he live under /fr and /he.
 */
export function localizePath(locale: Locale, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) {
    return normalized;
  }
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`;
}

/**
 * Removes a leading /fr or /he segment so path logic can reason about the
 * canonical (English) shape of the current URL. Unprefixed paths pass through.
 */
export function stripLocalePrefix(pathname: string): string {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    if (pathname === `/${locale}`) return '/';
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

export const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  he: 'he_IL',
};

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  he: 'עב',
};
