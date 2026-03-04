'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative h-screen">
      {/* Image de fond */}
      <Image
        src="/immeuble/DJI_20250427170857_0072_D-Enhanced-NR.jpeg"
        alt="Or Hakerem Building"
        fill
        priority
        className="object-cover"
        quality={100}
      />

      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-primary/50 z-10" />

      {/* Texte + CTA */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="text-center text-secondary px-4">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold mb-6">
            Welcome to Or Hakerem
          </h1>

          {/* CTA */}
          <Link
            href="/properties"
            className="inline-block px-8 py-3 rounded-full backdrop-blur-md bg-secondary/30 border border-white/20 text-primary font-semibold text-sm hover:bg-secondary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
            aria-label="Explore Properties"
          >
            Explore our properties
          </Link>
        </div>
      </div>
    </div>
  );
}
