import type { Metadata } from 'next';
import CustomCursor from '@/components/CustomCursor';
import Toast from '@/components/Toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import './globals.css';

export const metadata: Metadata = {
  title: 'Or Hakerem - Luxury Properties in Tel Aviv',
  description: 'Experience luxury living in Tel Aviv with our premium apartments and exceptional concierge services in Kerem HaTeimanim.',
  keywords: 'luxury apartments Tel Aviv, Kerem HaTeimanim, vacation rentals, concierge services, penthouse jacuzzi, Tel Aviv accommodation',
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
    title: 'Or Hakerem - Luxury Properties in Tel Aviv',
    description: 'Experience luxury living in Tel Aviv with our premium apartments and exceptional concierge services in Kerem HaTeimanim.',
    url: 'https://orhakerem.vercel.app',
    siteName: 'Or Hakerem',
    images: [
      {
        url: '/OR_HAKEERM_converted.jpg',
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
    title: 'Or Hakerem - Luxury Properties in Tel Aviv',
    description: 'Experience luxury living in Tel Aviv with our premium apartments and exceptional concierge services.',
    images: ['/OR_HAKEERM_converted.jpg'],
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
    icon: '/OR_HAKEERM_converted.jpg',
    shortcut: '/OR_HAKEERM_converted.jpg',
    apple: '/OR_HAKEERM_converted.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/OR_HAKEERM_converted.jpg" sizes="any" />
        <link rel="apple-touch-icon" href="/OR_HAKEERM_converted.jpg" />
        <meta name="theme-color" content="#a5382b" />
        <meta name="msapplication-TileColor" content="#a5382b" />
        <meta name="msapplication-TileImage" content="/OR_HAKEERM_converted.jpg" />
      </head>
      <body className="min-h-screen bg-cream antialiased">
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