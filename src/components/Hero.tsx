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

      {/* Contenu texte + CTA */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        {/* Titre */}
        <h1 className="font-playfair text-5xl md:text-6xl font-bold text-secondary mb-6">
          Welcome to Or Hakerem
        </h1>

        {/* CTA */}
        <Link
          href="/properties"
          className="px-8 py-3 rounded-full bg-secondary/40 backdrop-blur-md border border-white/20 text-primary font-semibold text-sm hover:bg-secondary/50 hover:scale-105 hover:shadow-xl shadow-lg transition-all duration-300 z-30"
          aria-label="Explore Properties"
        >
          Explore our properties
        </Link>
      </div>
    </div>
  );
}
    </div>
  );
}
