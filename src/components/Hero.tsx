'use client';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="relative h-screen">
      <Image
        src="/immeuble/DJI_20250427170857_0072_D-Enhanced-NR.jpeg"
        alt="Or Hakerem Building"
        fill
        priority
        className="object-cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-primary/50">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-secondary mt-16">
            <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-4">
              Welcome to Or Hakerem
            </h1>
            <p className="text-xl max-w-2xl">
              Experience luxury living in the heart of Jerusalem with our premium apartments and
              exceptional service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
