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
    <div className="text-center group">
      <div className="inline-block p-6 mb-4 rounded-full transition-all duration-300 hover:bg-secondary/10">
        <Icon className="w-12 h-12 text-secondary transition-colors duration-300 group-hover:text-primary" />
      </div>
      <h3 className="font-playfair text-xl font-bold text-primary mb-2 transition-colors duration-300 group-hover:text-secondary">
        {title}
      </h3>
      <p className="text-primary/70 leading-relaxed">{description}</p>
    </div>
  );
}

export default function ConciergeServices() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
            Conciergerie Services
          </h2>
          <p className="text-primary/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Experience personalized luxury with our dedicated concierge team
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 mb-16 max-w-4xl mx-auto">
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
            className="inline-block text-primary hover:text-secondary transition-colors duration-300 font-medium text-lg border-b-2 border-primary/20 hover:border-secondary pb-1"
          >
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}