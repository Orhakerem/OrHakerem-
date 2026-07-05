import type { Locale } from '@/i18n/config';
import type { FAQCategory } from '@/lib/faq-data';

type CategoryCopy = { label: string; description: string };

const en = {
  headingBefore: 'Frequently ',
  headingItalic: 'asked',
  headingAfter: ' questions',
  intro:
    'Everything you may want to know before booking your stay — from the neighborhood and the apartments themselves to check-in, policies and the concierge services we can arrange on your behalf.',
  categories: {
    location: {
      label: 'Location',
      description: 'The neighborhood, beach access and the streets right outside the door.',
    },
    stay: {
      label: 'Stay',
      description: 'Apartment amenities, layout and what to expect once you settle in.',
    },
    booking: {
      label: 'Booking',
      description: 'Reservations, check-in, payment and cancellation essentials.',
    },
    services: {
      label: 'Services',
      description: 'Concierge add-ons and bespoke requests we can take care of for you.',
    },
  } satisfies Record<FAQCategory, CategoryCopy>,
  notFoundTitle: "Didn't find what you were looking for?",
  notFoundBefore: 'Write to us at ',
  notFoundAfter: ' — we usually reply within a few hours.',
};

export type FaqMessages = typeof en;

const fr: FaqMessages = {
  headingBefore: 'Questions ',
  headingItalic: 'fréquemment',
  headingAfter: ' posées',
  intro:
    "Tout ce que vous pouvez vouloir savoir avant de réserver votre séjour — du quartier et des appartements eux-mêmes jusqu'à l'arrivée, nos politiques et les services de conciergerie que nous pouvons organiser pour vous.",
  categories: {
    location: {
      label: 'Emplacement',
      description: "Le quartier, l'accès à la plage et les rues juste devant la porte.",
    },
    stay: {
      label: 'Séjour',
      description: "Les équipements, l'agencement et ce qui vous attend une fois installé.",
    },
    booking: {
      label: 'Réservation',
      description: "Réservations, arrivée, paiement et l'essentiel sur l'annulation.",
    },
    services: {
      label: 'Services',
      description: 'Les options de conciergerie et demandes sur mesure dont nous pouvons nous charger.',
    },
  },
  notFoundTitle: "Vous n'avez pas trouvé ce que vous cherchiez ?",
  notFoundBefore: 'Écrivez-nous à ',
  notFoundAfter: ' — nous répondons généralement en quelques heures.',
};

const he: FaqMessages = {
  headingBefore: 'שאלות ',
  headingItalic: 'נפוצות',
  headingAfter: '',
  intro:
    'כל מה שכדאי לדעת לפני שמזמינים — מהשכונה והדירות עצמן ועד צ׳ק-אין, מדיניות ושירותי הקונסיירז׳ שנוכל לארגן עבורכם.',
  categories: {
    location: {
      label: 'מיקום',
      description: 'השכונה, הגישה לים והרחובות שממש מחוץ לדלת.',
    },
    stay: {
      label: 'שהות',
      description: 'מתקני הדירה, המבנה שלה ומה מחכה לכם כשתתמקמו.',
    },
    booking: {
      label: 'הזמנה',
      description: 'הזמנות, צ׳ק-אין, תשלום וכל מה שחשוב על ביטולים.',
    },
    services: {
      label: 'שירותים',
      description: 'תוספות קונסיירז׳ ובקשות מיוחדות שנשמח לטפל בהן עבורכם.',
    },
  },
  notFoundTitle: 'לא מצאתם את מה שחיפשתם?',
  notFoundBefore: 'כתבו לנו אל ',
  notFoundAfter: ' — אנחנו בדרך כלל עונים תוך כמה שעות.',
};

export const faqMessages: Record<Locale, FaqMessages> = { en, fr, he };
