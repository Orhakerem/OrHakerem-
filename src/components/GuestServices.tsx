'use client';

import { Package, Tv, Candy } from 'lucide-react';

function ServiceCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm">
      <div className="inline-block p-4 bg-secondary rounded-full mb-4 relative">
        <div className="absolute inset-0 rounded-full bg-tertiary/20"></div>
        <Icon className="w-8 h-8 text-primary relative z-10" />
      </div>
      <h3 className="font-playfair text-xl font-bold text-secondary mb-2">{title}</h3>
      <p className="text-secondary-light">{description}</p>
    </div>
  );
}

export default function GuestServices() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-tertiary/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h2 className="text-center font-playfair text-3xl font-bold text-secondary mb-12">
          Premium Guest Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={Candy}
            title="Shabbat Services"
            description="Enjoy our special Shabbat arrangements including candle kits, kosher meals, and all necessary amenities for a peaceful Shabbat"
          />
          <ServiceCard
            icon={Package}
            title="Luxury Welcome Package"
            description="Start your stay with our curated welcome package featuring local delicacies, premium toiletries, and essential items"
          />
          <ServiceCard
            icon={Tv}
            title="Entertainment & Comfort"
            description="Access to premium streaming services, high-speed WiFi, and modern entertainment systems in every apartment"
          />
        </div>
      </div>
    </section>
  );
}
