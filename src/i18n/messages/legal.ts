import type { Locale } from '@/i18n/config';

const en = {
  print: 'Print',
  backToTopAria: 'Back to top',
};

export type LegalMessages = typeof en;

const fr: LegalMessages = {
  print: 'Imprimer',
  backToTopAria: 'Retour en haut',
};

const he: LegalMessages = {
  print: 'הדפסה',
  backToTopAria: 'חזרה למעלה',
};

export const legalMessages: Record<Locale, LegalMessages> = { en, fr, he };
