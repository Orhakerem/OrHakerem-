import type { Locale } from '@/i18n/config';

export type VenueRental = {
  id: 'weekday' | 'weekend';
  label: string;
  price: number;
  priceSuffix: string;
  features: string[];
  highlight?: boolean;
};

export type CateringTier = {
  id: string;
  guestRange: string;
  items: { label: string; price: string }[];
};

export type CateringExtra = {
  label: string;
  price: string;
};

export type CateringCategoryId = 'luxe';

export type CateringCategory = {
  id: CateringCategoryId;
  name: string;
  tagline: string;
  tiers: CateringTier[];
  extras: CateringExtra[];
};

export const eventCleaningFee = 750;

const venueRentalsByLocale: Record<Locale, VenueRental[]> = {
  en: [
    {
      id: 'weekday',
      label: 'Weekday Venue Rental',
      price: 2500,
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
      price: 2500,
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
      price: 2500,
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

const cateringCategoriesByLocale: Record<Locale, CateringCategory[]> = {
  en: [
    {
      id: 'luxe',
      name: 'Luxe',
      tagline: 'High-end, full experience',
      tiers: [
        {
          id: 'luxe-20-25',
          guestRange: '20–25 guests',
          items: [
            { label: 'Salads — 8 types (cooked, fresh, seasonal)', price: '800₪' },
            { label: 'Petits fours platter', price: '200₪' },
            { label: 'Moroccan fish', price: '800₪' },
            { label: 'Mains + side dishes', price: '1,600₪' },
            { label: 'Fruit platter', price: '400₪' },
            { label: 'Pastries', price: '200₪' },
            { label: 'Glass tableware, linens, wine glasses', price: '700₪' },
            { label: 'Server', price: '600₪ per server' },
            { label: 'Service fee', price: '3,000₪' },
          ],
        },
        {
          id: 'luxe-60-70',
          guestRange: '60–70 guests',
          items: [
            { label: 'Salads — 8 types (cooked, fresh, seasonal)', price: '800₪' },
            { label: 'Fish', price: '1,100₪' },
            { label: 'Mains + side dishes', price: '2,000₪' },
            { label: 'Fruit platter', price: '400₪ per platter' },
            { label: 'Pastries (platter of 30 pieces)', price: '200₪ per platter' },
            { label: 'Glass tableware, linens, wine glasses', price: '1,500₪' },
            { label: 'Server', price: '600₪ per server' },
            { label: 'Service fee', price: '5,000₪' },
          ],
        },
      ],
      extras: [
        { label: 'Chair', price: '15₪ each' },
        { label: 'Table', price: '35₪ each' },
      ],
    },
  ],
  fr: [
    {
      id: 'luxe',
      name: 'Luxe',
      tagline: 'Haut de gamme, expérience complète',
      tiers: [
        {
          id: 'luxe-20-25',
          guestRange: '20 à 25 invités',
          items: [
            { label: 'Salades — 8 variétés (cuites, fraîches, de saison)', price: '800₪' },
            { label: 'Plateau de petits fours', price: '200₪' },
            { label: 'Poisson à la marocaine', price: '800₪' },
            { label: 'Plats principaux + accompagnements', price: '1 600₪' },
            { label: 'Plateau de fruits', price: '400₪' },
            { label: 'Pâtisseries', price: '200₪' },
            { label: 'Vaisselle en verre, linge de table, verres à vin', price: '700₪' },
            { label: 'Serveur', price: '600₪ par serveur' },
            { label: 'Frais de service', price: '3 000₪' },
          ],
        },
        {
          id: 'luxe-60-70',
          guestRange: '60 à 70 invités',
          items: [
            { label: 'Salades — 8 variétés (cuites, fraîches, de saison)', price: '800₪' },
            { label: 'Poisson', price: '1 100₪' },
            { label: 'Plats principaux + accompagnements', price: '2 000₪' },
            { label: 'Plateau de fruits', price: '400₪ par plateau' },
            { label: 'Pâtisseries (plateau de 30 pièces)', price: '200₪ par plateau' },
            { label: 'Vaisselle en verre, linge de table, verres à vin', price: '1 500₪' },
            { label: 'Serveur', price: '600₪ par serveur' },
            { label: 'Frais de service', price: '5 000₪' },
          ],
        },
      ],
      extras: [
        { label: 'Chaise', price: '15₪ pièce' },
        { label: 'Table', price: '35₪ pièce' },
      ],
    },
  ],
  he: [
    {
      id: 'luxe',
      name: 'לוקס',
      tagline: 'ברמה הגבוהה ביותר, חוויה מלאה',
      tiers: [
        {
          id: 'luxe-20-25',
          guestRange: '25-20 אורחים',
          items: [
            { label: 'סלטים — 8 סוגים (מבושלים, טריים, עונתיים)', price: '800₪' },
            { label: 'מגש פטי פור', price: '200₪' },
            { label: 'דג מרוקאי', price: '800₪' },
            { label: 'עיקריות + תוספות', price: '1,600₪' },
            { label: 'מגש פירות', price: '400₪' },
            { label: 'מאפים', price: '200₪' },
            { label: 'כלי זכוכית, מפות, כוסות יין', price: '700₪' },
            { label: 'מלצר', price: '600₪ למלצר' },
            { label: 'דמי שירות', price: '3,000₪' },
          ],
        },
        {
          id: 'luxe-60-70',
          guestRange: '70-60 אורחים',
          items: [
            { label: 'סלטים — 8 סוגים (מבושלים, טריים, עונתיים)', price: '800₪' },
            { label: 'דג', price: '1,100₪' },
            { label: 'עיקריות + תוספות', price: '2,000₪' },
            { label: 'מגש פירות', price: '400₪ למגש' },
            { label: 'מאפים (מגש של 30 יחידות)', price: '200₪ למגש' },
            { label: 'כלי זכוכית, מפות, כוסות יין', price: '1,500₪' },
            { label: 'מלצר', price: '600₪ למלצר' },
            { label: 'דמי שירות', price: '5,000₪' },
          ],
        },
      ],
      extras: [
        { label: 'כיסא', price: '15₪ ליחידה' },
        { label: 'שולחן', price: '35₪ ליחידה' },
      ],
    },
  ],
};

export function getVenueRentals(locale: Locale): VenueRental[] {
  return venueRentalsByLocale[locale];
}

export function getCateringCategories(locale: Locale): CateringCategory[] {
  return cateringCategoriesByLocale[locale];
}
