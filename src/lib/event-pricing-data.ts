import type { Locale } from '@/i18n/config';

export type VenueRental = {
  id: 'weekday' | 'weekend';
  label: string;
  price: number;
  priceSuffix: string;
  features: string[];
  highlight?: boolean;
};

export const eventCleaningFee = 750;

const venueRentalsByLocale: Record<Locale, VenueRental[]> = {
  en: [
    {
      id: 'weekday',
      label: 'Weekday Venue Rental',
      price: 2800,
      priceSuffix: '+ cleaning fee',
      features: ['Space rental only', 'Catering and service add-ons available separately'],
      highlight: true,
    },
    {
      id: 'weekend',
      label: 'Weekend Venue Rental',
      price: 3500,
      priceSuffix: '+ cleaning fee',
      features: ['Space rental only', 'Catering and service add-ons available separately'],
      highlight: true,
    },
  ],
  fr: [
    {
      id: 'weekday',
      label: 'Location en semaine',
      price: 2800,
      priceSuffix: '+ frais de ménage',
      features: ['Location de l’espace uniquement', 'Traiteur et services additionnels disponibles séparément'],
      highlight: true,
    },
    {
      id: 'weekend',
      label: 'Location le week-end',
      price: 3500,
      priceSuffix: '+ frais de ménage',
      features: ['Location de l’espace uniquement', 'Traiteur et services additionnels disponibles séparément'],
      highlight: true,
    },
  ],
  he: [
    {
      id: 'weekday',
      label: 'השכרת המקום באמצע השבוע',
      price: 2800,
      priceSuffix: '+ דמי ניקיון',
      features: ['השכרת המקום בלבד', 'קייטרינג ושירותים נוספים זמינים בנפרד'],
      highlight: true,
    },
    {
      id: 'weekend',
      label: 'השכרת המקום בסוף השבוע',
      price: 3500,
      priceSuffix: '+ דמי ניקיון',
      features: ['השכרת המקום בלבד', 'קייטרינג ושירותים נוספים זמינים בנפרד'],
      highlight: true,
    },
  ],
};

export function getVenueRentals(locale: Locale): VenueRental[] {
  return venueRentalsByLocale[locale];
}
