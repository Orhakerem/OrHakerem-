import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Toast from '@/components/Toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { DEFAULT_OG_IMAGE, DEFAULT_OPEN_GRAPH_IMAGE, SITE_URL, createLocalizedAlternates } from '@/app/seo';
import { assistant, heebo, inter, manrope } from '@/app/fonts';
import { ENABLED_LOCALES, isEnabledLocale, isLocale, isRtl, OG_LOCALE, type Locale } from '@/i18n/config';
import { commonMessages } from '@/i18n/messages/common';
import { seoMessages } from '@/i18n/messages/seo';
import { getBusinessStructuredData } from '@/lib/business-schema';

import '../globals.css';

export function generateStaticParams() {
  return ENABLED_LOCALES.map(locale => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const seo = seoMessages[locale].home;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: 'Or Hakerem' }],
    creator: 'Or Hakerem',
    publisher: 'Or Hakerem',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_URL),
    alternates: createLocalizedAlternates('/', locale),
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: createLocalizedAlternates('/', locale)?.canonical as string | undefined,
      siteName: 'Or Hakerem',
      images: [DEFAULT_OPEN_GRAPH_IMAGE],
      locale: OG_LOCALE[locale],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon/favicon.ico', sizes: 'any', type: 'image/x-icon' },
        { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/favicon/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
      shortcut: '/favicon/favicon.ico',
      apple: [
        { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/favicon/site.webmanifest',
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!isEnabledLocale(params.locale)) {
    notFound();
  }
  const locale = params.locale;
  const fontVariables = isRtl(locale)
    ? `${heebo.variable} ${assistant.variable}`
    : `${inter.variable} ${manrope.variable}`;
  const t = commonMessages[locale];
  const businessStructuredData = getBusinessStructuredData(locale, seoMessages[locale].home.description);

  return (
    <html lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#a5382b" />
        <meta name="apple-mobile-web-app-title" content="Or Hakerem" />
        <meta
          name="facebook-domain-verification"
          content="wxwb737u7ce2rnc2df2kibu2ifppu4"
        />
      </head>
      <body className={`${fontVariables} min-h-screen bg-cream antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessStructuredData) }}
        />
        <CookieConsent />
        <Toast />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <SpeedInsights />
        <WhatsAppFloat ariaLabel={t.nav.whatsappAria} />
        <Script src="/scrollAnimations.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
