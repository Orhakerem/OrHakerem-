import { Inter, Manrope } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500'],
  preload: false, // body font: load via swap, not in the initial preload burst
});

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-head',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  preload: true, // heading font: prioritized for above-the-fold display text
});
