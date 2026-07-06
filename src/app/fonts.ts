import { Assistant, Heebo, Inter, Manrope } from 'next/font/google';

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

// Hebrew equivalents: Inter and Manrope have no Hebrew glyphs. Heebo pairs
// with Inter's grotesque feel; Assistant is the closest Hebrew analogue to
// Manrope's geometric-humanist headings. Same CSS variable names as their
// Latin counterparts — only one pair is ever applied to <body> at a time,
// selected by locale in the [locale] layout.
export const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500'],
  preload: false,
});

export const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  variable: '--font-head',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  preload: false,
});
