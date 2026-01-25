import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Property Management Tel Aviv | Airbnb Management Services | Or Hakerem',
  description: 'Professional short-term rental management in Tel Aviv. Maximize your Airbnb revenue with Or Hakerem\'s full-service property management. Stress-free ownership, premium results.',
  keywords: 'property management, property management Tel Aviv, short term rental management Tel Aviv, Airbnb management Tel Aviv, luxury rental Tel Aviv, vacation rental management Israel, Tel Aviv property management, short-term rental Tel Aviv',
  openGraph: {
    title: 'Property Management Tel Aviv | Airbnb Management Services | Or Hakerem',
    description: 'Professional short-term rental management in Tel Aviv. Maximize your Airbnb revenue with Or Hakerem\'s full-service property management.',
    url: 'https://orhakerem.vercel.app/property-management',
    siteName: 'Or Hakerem',
    images: [
      {
        url: '/favicon/web-app-manifest-512x512.png',
        width: 1200,
        height: 630,
        alt: 'Or Hakerem - Property Management Services in Tel Aviv',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Property Management Tel Aviv | Airbnb Management Services',
    description: 'Professional short-term rental management in Tel Aviv. Maximize your Airbnb revenue with full-service property management.',
    images: ['/favicon/web-app-manifest-512x512.png'],
  },
  alternates: {
    canonical: '/property-management',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PropertyManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
