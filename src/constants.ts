import { LocalImage } from '@/types';

export const propertyImages: Record<string, LocalImage[]> = {
  'penthouse-jacuzzi': [
    {
      src: '/images/penthouse-living-1.jpg',
      alt: 'Penthouse Living Room with Sea View',
      type: 'livingroom',
      number: 1,
    },
  ],
  'cozy-studio': [
    {
      src: '/images/studio-living-1.jpg',
      alt: 'Studio Living Area',
      type: 'livingroom',
      number: 1,
    },
  ],
};

// Fallback images from Unsplash in case local images aren't available
export const fallbackImages = {
  'penthouse-jacuzzi':
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80',
  'cozy-studio':
    'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80',
  hero: '/images/hero.jpg',
  buildingDescription:
    'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&q=80',
};
