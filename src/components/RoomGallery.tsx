'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface RoomImage {
  src: string;
  alt: string;
}

interface Room {
  name: string;
  images: RoomImage[];
  description: string;
}

interface RoomGalleryProps {
  rooms: Room[];
}

export default function RoomGallery({ rooms }: RoomGalleryProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openRoom = (room: Room) => {
    setSelectedRoom(room);
    setCurrentImageIndex(0);
  };

  const closeRoom = () => {
    setSelectedRoom(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) => 
        prev === selectedRoom.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedRoom.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <>
      {/* Room Albums Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room, roomIndex) => (
          <button
            type="button"
            key={roomIndex}
            className="tap-reset overflow-hidden rounded-xl bg-white text-left shadow-lg"
            onClick={() => openRoom(room)}
          >
            {/* Room Cover Image */}
            <span className="relative block h-48">
              <Image
                src={room.images[0]?.src || '/placeholder.jpg'}
                alt={room.images[0]?.alt || room.name}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <span className="absolute bottom-4 left-4 text-white">
                <span className="block font-head text-xl font-bold">{room.name}</span>
                <span className="text-sm opacity-90">{room.images.length} photos</span>
              </span>
            </span>
            
            {/* Room Info */}
            <span className="block p-4">
              <span className="text-sm text-black/80">{room.description}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Room Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeRoom}
            className="tap-reset absolute right-4 top-4 z-10 text-white"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Room Title */}
          <div className="absolute top-4 left-4 text-white z-10">
            <h2 className="font-head text-2xl font-bold">{selectedRoom.name}</h2>
            <p className="text-sm opacity-90">
              {currentImageIndex + 1} of {selectedRoom.images.length}
            </p>
          </div>

          {/* Navigation Arrows */}
          {selectedRoom.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="tap-reset absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="tap-reset absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Main Image */}
          <div className="max-w-6xl w-full h-full flex items-center justify-center">
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedRoom.images[currentImageIndex]?.src || '/placeholder.jpg'}
                alt={selectedRoom.images[currentImageIndex]?.alt || selectedRoom.name}
                fill
                className="object-contain"
                priority
                sizes="100vw"
              />
            </div>
          </div>

          {/* Thumbnail Strip */}
          {selectedRoom.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/50 p-2 rounded-lg">
              {selectedRoom.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  type="button"
                  className={`relative h-12 w-16 overflow-hidden rounded ${
                    index === currentImageIndex ? 'tap-reset ring-2 ring-white/80' : 'tap-reset opacity-60'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
