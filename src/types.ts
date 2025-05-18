export interface LocalImage {
    src: string;
    alt: string;
    type: 'livingroom' | 'bedroom' | 'kitchen' | 'bathroom' | 'exterior' | 'view';
    number: number;
  }
  
export const getImagePath = (filename: string) => `/pictures/${filename}`;
  