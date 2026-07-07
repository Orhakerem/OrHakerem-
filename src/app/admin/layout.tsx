import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import Toast from '@/components/Toast';
import { inter, manrope } from '@/app/fonts';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Back office - Or Hakerem',
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} min-h-screen bg-cream antialiased`}>
        <Toast />
        {children}
      </body>
    </html>
  );
}
