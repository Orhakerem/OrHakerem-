import { Inter, Manrope } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500'],
});

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-head',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});
