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

export const venueRentals: VenueRental[] = [
  {
    id: 'weekday',
    label: 'Weekday Venue Rental',
    price: 2500,
    priceSuffix: '+ cleaning fee',
    features: [
      'Space rental only',
      'Catering and service add-ons available separately',
    ],
    highlight: true,
  },
  {
    id: 'weekend',
    label: 'Weekend Venue Rental',
    price: 3500,
    priceSuffix: '+ cleaning fee',
    features: [
      'Space rental only',
      'Catering and service add-ons available separately',
    ],
    highlight: true,
  },
];

export const cateringCategories: CateringCategory[] = [
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
];
