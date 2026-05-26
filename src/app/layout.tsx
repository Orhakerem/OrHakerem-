import type { Metadata } from 'next';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Toast from '@/components/Toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { DEFAULT_OG_IMAGE, DEFAULT_OPEN_GRAPH_IMAGE, SITE_URL, createCanonicalUrl } from '@/app/seo';
import { inter, manrope } from '@/app/fonts';

const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Or Hakerem',
  url: SITE_URL,
  logo: `${SITE_URL}/logo/Logo_beige.png`,
  description:
    'Luxury short-term rental apartments and boutique event venue in Kerem HaTeimanim, Tel Aviv, Israel.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '35 Hakovshim Street',
    addressLocality: 'Tel Aviv',
    addressCountry: 'IL',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+972526869791',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hebrew', 'French'],
  },
  sameAs: [
    'https://www.instagram.com/or_hakerem/',
    'https://www.facebook.com/profile.php?id=61583829025542',
    'https://www.linkedin.com/company/orhakerem/',
  ],
};

import './globals.css';

export const metadata: Metadata = {
  title: 'Luxury Apartments in Tel Aviv | Or Hakerem | Kerem HaTeimanim',
  description: 'Premium apartments and boutique stays in Tel Aviv. Discover Or Hakerem in Kerem HaTeimanim for luxury accommodations, events, and attentive hosting.',
  keywords: 'or hakerem, luxury apartments Tel Aviv, boutique stays Tel Aviv, luxury apartment in Tel Aviv, apartment Tel Aviv, events Tel Aviv, Kerem HaTeimanim, property management Tel Aviv, Tel Aviv accommodations',
  authors: [{ name: 'Or Hakerem' }],
  creator: 'Or Hakerem',
  publisher: 'Or Hakerem',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: createCanonicalUrl('/'),
  },
  openGraph: {
    title: 'Luxury Apartments in Tel Aviv | Or Hakerem | Kerem HaTeimanim',
    description: 'Premium apartments and boutique stays in Tel Aviv. Discover Or Hakerem in Kerem HaTeimanim for luxury accommodations, events, and attentive hosting.',
    url: createCanonicalUrl('/'),
    siteName: 'Or Hakerem',
    images: [DEFAULT_OPEN_GRAPH_IMAGE],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Apartments in Tel Aviv | Or Hakerem | Kerem HaTeimanim',
    description: 'Premium apartments and boutique stays in Tel Aviv. Discover Or Hakerem in Kerem HaTeimanim for luxury accommodations and events.',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#a5382b" />
        <meta name="apple-mobile-web-app-title" content="Or Hakerem" />
      </head>
      <body className={`${inter.variable} ${manrope.variable} min-h-screen bg-cream antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
        />
        <GoogleAnalytics />
        <Toast />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <SpeedInsights />
        <a
          href="https://wa.me/972526869791?text=Hi%20I%20am%20interested%20in%20your%20properties"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Contact on WhatsApp"
        >
          <svg viewBox="0 0 32 32" width="24" height="24" aria-hidden="true">
            <path fill="white" d="M16 3C9.4 3 4 8.3 4 14.8c0 2.6.9 5 2.4 7L5 29l7-2.3c1.8.9 3.8 1.4 5.9 1.4 6.6 0 12-5.3 12-11.8S22.6 3 16 3zm0 21.5c-1.8 0-3.6-.5-5.2-1.5l-.4-.2-4.1 1.3 1.4-4-.3-.4c-1.1-1.6-1.6-3.4-1.6-5.2C5.8 9.1 10.4 5 16 5s10.2 4.1 10.2 9.8S21.6 24.5 16 24.5zm5.6-7.3c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.6-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.2-.7-1.6-1-2.2-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.2 0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.9.6.3 1.1.5 1.5.6.6.2 1.2.2 1.7.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4 0-.1-.1-.2-.3-.3z"/>
          </svg>
        </a>
        <Script src="/scrollAnimations.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
