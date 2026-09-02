import { getBreadcrumbStructuredData } from '@/lib/site-schema';
import { isLocale, localizePath, type Locale } from '@/i18n/config';
import { commonMessages } from '@/i18n/messages/common';

/**
 * Emits a `BreadcrumbList` for a top-level section page. Server component so
 * the JSON-LD ships in the initial HTML, which is what Googlebot reads.
 */
export default function BreadcrumbSchema({
  locale: rawLocale,
  path,
  label,
}: {
  locale: string;
  /** Unprefixed site path, e.g. `/services`. */
  path: string;
  /** Key of the localized nav label for this page. */
  label: keyof typeof commonMessages.en.nav;
}) {
  const locale: Locale = isLocale(rawLocale) ? rawLocale : 'en';
  const t = commonMessages[locale];

  const schema = getBreadcrumbStructuredData([
    { name: t.footer.home, path: localizePath(locale, '/') },
    { name: t.nav[label] as string, path: localizePath(locale, path) },
  ]);

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
