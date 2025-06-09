'use client';

import { 
  UtensilsCrossed, 
  Car, 
  Calendar, 
  ShoppingBag, 
  Sparkles, 
  MapPin,
  Briefcase,
  Heart
} from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div className="text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group">
      <div className="inline-block p-4 bg-secondary rounded-full mb-4 relative group-hover:scale-110 transition-transform duration-300">
        <div className="absolute inset-0 rounded-full bg-tertiary/20"></div>
        <Icon className="w-8 h-8 text-primary relative z-10" />
      </div>
      <h3 className="font-playfair text-xl font-bold text-secondary mb-2">{title}</h3>
      <p className="text-secondary-light">{description}</p>
    </div>
  );
}

export default function ConciergeServices() {
  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-tertiary/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl font-bold text-secondary mb-4">
            Personalized Concierge Services
          </h2>
          <p className="text-secondary-light text-lg max-w-2xl mx-auto">
            Experience Bespoke Luxury During Your Stay
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ServiceCard
            icon={UtensilsCrossed}
            title="Dining Experiences"
            description="Exclusive restaurant reservations and curated culinary adventures"
          />
          <ServiceCard
            icon={Car}
            title="Private Transfers"
            description="Luxury chauffeur services and premium transportation arrangements"
          />
          <ServiceCard
            icon={Calendar}
            title="Entertainment Planning"
            description="VIP event tickets and exclusive entertainment experiences"
          />
          <ServiceCard
            icon={ShoppingBag}
            title="Personal Shopping"
            description="Boutique appointments and luxury shopping assistance"
          />
          <ServiceCard
            icon={Sparkles}
            title="Wellness Services"
            description="In-room spa treatments and wellness retreat bookings"
          />
          <ServiceCard
            icon={MapPin}
            title="Local Experiences"
            description="Private tours and authentic cultural immersions"
          />
          <ServiceCard
            icon={Briefcase}
            title="Butler Assistance"
            description="24/7 dedicated support for all your needs"
          />
          <ServiceCard
            icon={Heart}
            title="Special Requests"
            description="Bespoke arrangements for celebrations and unique experiences"
          />
        </div>

        <div className="text-center">
          <Link
            href="/concierge-services"
            className="inline-block bg-secondary text-primary px-8 py-4 rounded-full font-semibold hover:bg-secondary-light transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Discover Our Full Concierge Offerings
          </Link>
        </div>
      </div>
    </section>
  );
}