'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  type: string;
  number: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  maxDisplay?: number;
}

export default function ImageGallery({ images, maxDisplay = 12 }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage>();
  const [showAll, setShowAll] = useState(false);

  const displayImages = showAll ? images : images.slice(0, maxDisplay);
  const hasMore = images.length > maxDisplay;

  const generateCaption = (image: GalleryImage) => {
    const roomType = image.type.charAt(0).toUpperCase() + image.type.slice(1);
    return `${roomType} - Photo ${image.number}`;
  };

  return (
    <>
      <section className="auto-gallery">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item relative aspect-4/3 overflow-hidden rounded-lg cursor-pointer transform transition-transform hover:scale-[1.02]"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-primary/50 text-white p-2 text-sm">
                {generateCaption(image)}
              </div>
            </div>
          ))}
        </div>

        {hasMore && !showAll && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="bg-primary text-secondary px-6 py-2 rounded-full hover:bg-primary/90 transition"
            >
              View More
            </button>
          </div>
        )}
      </section>

      {/* Modal for full-size image view */}
      {selectedImage && (
        <div className="fixed inset-0 bg-primary/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(undefined)}
            className="absolute top-4 right-4 text-secondary hover:text-secondary-light transition"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="max-w-7xl w-full">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
            <div className="text-secondary text-center mt-4">{generateCaption(selectedImage)}</div>
          </div>
        </div>
      )}
    </>
  );
}
