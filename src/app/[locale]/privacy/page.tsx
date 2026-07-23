import { ShieldCheck } from 'lucide-react';

import { createCanonicalUrl } from '@/app/seo';
import LegalPageShell from '@/components/legal/LegalPageShell';
import { isLocale, localizePath, type Locale } from '@/i18n/config';
import PrivacyContentEn from './content/en';
import PrivacyContentFr from './content/fr';
import PrivacyContentHe from './content/he';

const PRIVACY_CONTENT: Record<
  Locale,
  (props: { termsHref: string; cancellationHref: string }) => JSX.Element
> = {
  en: PrivacyContentEn,
  fr: PrivacyContentFr,
  he: PrivacyContentHe,
};

const HEADER_TEXT: Record<Locale, { title: string; subtitle: string; lastUpdated: string }> = {
  en: {
    title: 'Privacy Policy',
    subtitle:
      'This policy explains what personal data Or Hakerem collects, how we use it, and the rights you have over it.',
    lastUpdated: 'Last updated: 23 July 2026',
  },
  fr: {
    title: 'Politique de confidentialité',
    subtitle:
      "Cette politique explique quelles données personnelles Or Hakerem collecte, comment nous les utilisons et les droits dont vous disposez.",
    lastUpdated: 'Dernière mise à jour : 23 juillet 2026',
  },
  he: {
    title: 'מדיניות פרטיות',
    subtitle: 'מדיניות זו מסבירה אילו נתונים אישיים אור הכרם אוסף, כיצד אנו משתמשים בהם ומהן הזכויות שלכם לגביהם.',
    lastUpdated: 'עדכון אחרון: 23 ביולי 2026',
  },
};

export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const Content = PRIVACY_CONTENT[locale];
  const header = HEADER_TEXT[locale];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    url: createCanonicalUrl(localizePath(locale, '/privacy')),
    description:
      'Or Hakerem privacy policy explaining what personal data we collect, how we use it, the cookies and analytics we rely on, and your rights under GDPR and Israeli law.',
  };

  return (
    <LegalPageShell
      icon={<ShieldCheck className="h-8 w-8 text-white" />}
      title={header.title}
      subtitle={header.subtitle}
      structuredData={structuredData}
      extraHeader={
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-black/50">
          {header.lastUpdated}
        </p>
      }
    >
      <Content
        termsHref={localizePath(locale, '/terms')}
        cancellationHref={localizePath(locale, '/cancellation')}
      />
    </LegalPageShell>
  );
}
