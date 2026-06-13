import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DEFAULT_OG_IMAGE, DEFAULT_OPEN_GRAPH_IMAGE, createCanonicalUrl } from '@/app/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy | Or Hakerem Tel Aviv',
  description:
    'Read the Or Hakerem privacy policy: what personal data we collect, how we use it, the cookies and analytics we rely on, and your rights under GDPR and Israeli law.',
  keywords:
    'Or Hakerem privacy policy, Tel Aviv rental privacy, GDPR short-term rental, personal data, cookies, data protection',
  openGraph: {
    title: 'Privacy Policy | Or Hakerem Tel Aviv',
    description:
      'How Or Hakerem collects, uses, and protects your personal data, the cookies we use, and your privacy rights under GDPR and Israeli law.',
    url: createCanonicalUrl('/privacy'),
    siteName: 'Or Hakerem',
    images: [DEFAULT_OPEN_GRAPH_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Or Hakerem Tel Aviv',
    description:
      'What personal data Or Hakerem collects, how we use it, and your privacy rights under GDPR and Israeli law.',
    images: [DEFAULT_OG_IMAGE],
  },
  alternates: {
    canonical: createCanonicalUrl('/privacy'),
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
