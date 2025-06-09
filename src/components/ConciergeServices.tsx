'use client';

import { 
  UtensilsCrossed, 
  Car, 
  Sparkles, 
  Baby
} from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <div className="text-center p-6 bg-secondary-lighter rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="inline-block p-4 bg-primary rounded-full mb-4 relative">
        <div className="absolute inset-0 rounded-full bg-tertiary/20"></div>
        <Icon className="w-8 h-8 text-secondary relative z-10" />
      </div>
      <h3 className="font-playfair text-xl font-bold text-secondary mb-2">
        {title}
      </h3>
      <p className="text-secondary-light leading-relaxed">{description}</p>
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
            Conciergerie Services
          </h2>
          <p className="text-secondary-light text-lg max-w-2xl mx-auto leading-relaxed">
            Experience personalized luxury with our dedicated concierge team
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          <ServiceCard
            icon={UtensilsCrossed}
            title="Restaurant Reservations"
            description="Priority bookings at exclusive restaurants and curated dining experiences"
          />
          <ServiceCard
            icon={Car}
            title="Private Transfers"
            description="Luxury chauffeur services and premium transportation arrangements"
          />
          <ServiceCard
            icon={Sparkles}
            title="Spa & Wellness"
            description="In-room treatments and premium wellness experiences tailored to you"
          />
          <ServiceCard
            icon={Baby}
            title="Baby Sitting"
            description="Certified childcare professionals available 24/7 for your peace of mind"
          />
        </div>

        <div className="text-center">
          <Link
            href="/concierge-services"
            className="inline-block bg-secondary text-primary px-8 py-3 rounded-full font-semibold hover:bg-secondary-light transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}