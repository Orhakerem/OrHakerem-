'use client';
import Image from 'next/image';
import Link from 'next/link';

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
          </div>
        </div>

        <Link href="/properties"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 px-6 py-3 rounded-full backdrop-blur-md bg-secondary/30 border border-white/20 text-primary font-semibold text-sm hover:bg-secondary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
          aria-label="Explore Properties">
          Explore our properties
        </Link>
      </div>
    </div>
  );
}
