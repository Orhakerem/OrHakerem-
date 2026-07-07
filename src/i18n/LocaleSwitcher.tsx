'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ENABLED_LOCALES,
  LOCALE_LABELS,
  localizePath,
  stripLocalePrefix,
  type Locale,
} from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import { commonMessages } from '@/i18n/messages/common';

function targetPath(locale: Locale, basePath: string): string {
  // The blog only exists in English; from a blog page, other locales land home.
  if (locale !== 'en' && (basePath === '/blog' || basePath.startsWith('/blog/'))) {
    return localizePath(locale, '/');
  }
  return localizePath(locale, basePath);
}

export default function LocaleSwitcher({
  className = '',
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const current = useLocale();
  const pathname = usePathname();
  const basePath = stripLocalePrefix(pathname);
  const t = commonMessages[current].nav;

  if (ENABLED_LOCALES.length < 2) return null;

  return (
    <span
      className={`locale-switcher inline-flex items-center gap-1 text-sm ${className}`}
      aria-label={t.languageAria}
      dir="ltr"
    >
      {ENABLED_LOCALES.map((locale, index) => (
        <span key={locale} className="inline-flex items-center">
          {index > 0 && (
            <span aria-hidden="true" className="mx-1 opacity-40">
              ·
            </span>
          )}
          {locale === current ? (
            <span className="font-semibold" aria-current="true" lang={locale}>
              {LOCALE_LABELS[locale]}
            </span>
          ) : (
            <Link
              href={targetPath(locale, basePath)}
              lang={locale}
              className="opacity-70 transition-opacity hover:opacity-100"
              onClick={onNavigate}
            >
              {LOCALE_LABELS[locale]}
            </Link>
          )}
        </span>
      ))}
    </span>
  );
}
