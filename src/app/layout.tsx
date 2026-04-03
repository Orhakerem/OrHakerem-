import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Toast from '@/components/Toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { SITE_URL, createCanonicalUrl } from '@/app/seo';
import { crimson, inter, lato, montserrat, playfair } from '@/app/fonts';

import './globals.css';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
});

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
    images: [
      {
        url: '/favicon/web-app-manifest-512x512.png',
        width: 1200,
        height: 630,
        alt: 'Or Hakerem - Luxury Properties in Tel Aviv',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Apartments in Tel Aviv | Or Hakerem | Kerem HaTeimanim',
    description: 'Premium apartments and boutique stays in Tel Aviv. Discover Or Hakerem in Kerem HaTeimanim for luxury accommodations and events.',
    images: ['/favicon/web-app-manifest-512x512.png'],
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
      { url: '/favicon/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
  },
  manifest: '/favicon/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon/favicon.ico" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon/favicon.ico" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="theme-color" content="#a5382b" />
        <meta name="msapplication-TileColor" content="#a5382b" />
        <meta name="msapplication-TileImage" content="/favicon/web-app-manifest-512x512.png" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${lato.variable} ${crimson.variable} ${montserrat.variable} min-h-screen bg-cream antialiased`}>
        <GoogleAnalytics />
        <CustomCursor />
        <Toast />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
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
