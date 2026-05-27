import { createCanonicalUrl } from '@/app/seo';

export const HOST = {
  name: 'Joseph Atia',
  jobTitle: 'Founder and Host',
  bio: 'Joseph Atia is the founder of Or Hakerem, where he personally oversees everything from guest check-ins and check-outs to marketing, branding, digital, and property upkeep. An Airbnb Superhost with a perfect 10-star rating on Booking.com, Joseph grew up in the Kerem HaTeimanim neighborhood and has been welcoming travelers to Tel Aviv since 2024.',
  image: '/joseph-atia.jpg',
  imageAlt: 'Joseph Atia, founder and host of Or Hakerem',
  url: createCanonicalUrl('/about#host'),
  sameAs: ['https://www.linkedin.com/in/joseph-atia'],
} as const;
