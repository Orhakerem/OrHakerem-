import type { Locale } from '@/i18n/config';

const en = {
  kicker: 'Tel Aviv Guides',
  title: 'Discover Tel Aviv',
  intro: 'Local guides, neighborhood stories, and Shabbat-friendly travel tips — from the team behind Or Hakerem in Kerem HaTeimanim.',
  empty: 'Articles coming soon.',
  ctaTitle: 'Ready to experience Tel Aviv?',
  ctaBody: 'Stay in the heart of Kerem HaTeimanim — just steps from Carmel Market and Banana Beach.',
  viewProperties: 'View Properties',
  requestDates: 'Request Dates Directly',
  home: 'Home',
  blog: 'Blog',
  by: 'By',
  updated: 'Updated',
  more: 'More from the blog',
  viewPropertiesShort: 'View Properties',
  bookDirect: 'Book Direct',
  readAria: (title: string) => `Read: ${title}`,
  readingTime: (minutes: number) => `${minutes} min read`,
};

export type BlogMessages = typeof en;

const fr: BlogMessages = {
  kicker: 'Guides de Tel Aviv',
  title: 'Découvrir Tel Aviv',
  intro: 'Guides locaux, histoires de quartier et conseils de voyage adaptés au Shabbat — par l’équipe d’Or Hakerem à Kerem HaTeimanim.',
  empty: 'Articles à venir.',
  ctaTitle: 'Prêt à découvrir Tel Aviv ?',
  ctaBody: 'Séjournez au cœur de Kerem HaTeimanim, à quelques pas du marché du Carmel et de Banana Beach.',
  viewProperties: 'Voir les appartements',
  requestDates: 'Demander vos dates',
  home: 'Accueil',
  blog: 'Blog',
  by: 'Par',
  updated: 'Mis à jour',
  more: 'Autres articles du blog',
  viewPropertiesShort: 'Voir les appartements',
  bookDirect: 'Réserver en direct',
  readAria: (title) => `Lire : ${title}`,
  readingTime: (minutes) => `${minutes} min de lecture`,
};

const he: BlogMessages = {
  kicker: 'מדריכי תל אביב',
  title: 'לגלות את תל אביב',
  intro: 'מדריכים מקומיים, סיפורי שכונה וטיפים ידידותיים לשבת — מצוות אור הכרם בכרם התימנים.',
  empty: 'כתבות בקרוב.',
  ctaTitle: 'מוכנים לחוות את תל אביב?',
  ctaBody: 'התארחו בלב כרם התימנים, במרחק צעדים משוק הכרמל ומחוף בננה ביץ׳.',
  viewProperties: 'לצפייה בדירות',
  requestDates: 'לבקשת תאריכים',
  home: 'דף הבית',
  blog: 'בלוג',
  by: 'מאת',
  updated: 'עודכן',
  more: 'עוד מהבלוג',
  viewPropertiesShort: 'לצפייה בדירות',
  bookDirect: 'להזמנה ישירה',
  readAria: (title) => `לקריאה: ${title}`,
  readingTime: (minutes) => `${minutes} דקות קריאה`,
};

export const blogMessages: Record<Locale, BlogMessages> = { en, fr, he };
