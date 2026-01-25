import type { Metadata } from 'next';
import CustomCursor from '@/components/CustomCursor';
import Toast from '@/components/Toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';

import './globals.css';

export const metadata: Metadata = {
  title: 'Luxury Rental Tel Aviv | Or Hakerem | Kerem HaTeimanim',
  description: 'Premium short term rental in Tel Aviv. Luxury apartments in Kerem HaTeimanim. Property management & events Tel Aviv. Book your stay at Or Hakerem.',
  keywords: 'hakerem, luxury rental Tel Aviv, short term rental in Tel Aviv, luxury apartment in Tel Aviv, apartment Tel Aviv, events Tel Aviv, Kerem HaTeimanim, property management Tel Aviv, vacation rentals Israel',
  authors: [{ name: 'Or Hakerem' }],
  creator: 'Or Hakerem',
  publisher: 'Or Hakerem',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://orhakerem.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Luxury Rental Tel Aviv | Or Hakerem | Kerem HaTeimanim',
    description: 'Premium short term rental in Tel Aviv. Luxury apartments in Kerem HaTeimanim. Property management & events Tel Aviv. Book your stay at Or Hakerem.',
    url: 'https://orhakerem.vercel.app',
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
    title: 'Luxury Rental Tel Aviv | Or Hakerem | Kerem HaTeimanim',
    description: 'Premium short term rental in Tel Aviv. Luxury apartments in Kerem HaTeimanim. Property management & events Tel Aviv.',
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
      <body className="min-h-screen bg-cream antialiased">
        <GoogleAnalytics />
        <CustomCursor />
        <Toast />
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}