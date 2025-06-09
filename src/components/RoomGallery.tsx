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
          <div
            key={roomIndex}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
            onClick={() => openRoom(room)}
          >
            {/* Room Cover Image */}
            <div className="relative h-48">
              <Image
                src={room.images[0]?.src || '/placeholder.jpg'}
                alt={room.images[0]?.alt || room.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-playfair text-xl font-bold">{room.name}</h3>
                <p className="text-sm opacity-90">{room.images.length} photos</p>
              </div>
            </div>
            
            {/* Room Info */}
            <div className="p-4">
              <p className="text-primary/80 text-sm">{room.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Room Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closeRoom}
            className="absolute top-4 right-4 text-white hover:text-secondary transition z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Room Title */}
          <div className="absolute top-4 left-4 text-white z-10">
            <h2 className="font-playfair text-2xl font-bold">{selectedRoom.name}</h2>
            <p className="text-sm opacity-90">
              {currentImageIndex + 1} of {selectedRoom.images.length}
            </p>
          </div>

          {/* Navigation Arrows */}
          {selectedRoom.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition z-10"
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
                  className={`relative w-16 h-12 rounded overflow-hidden transition ${
                    index === currentImageIndex ? 'ring-2 ring-secondary' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
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