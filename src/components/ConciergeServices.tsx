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
  delay: number;
}

function ServiceCard({ icon: Icon, title, description, delay }: ServiceCardProps) {
  return (
    <div 
      className="group relative text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl transition-all duration-500 hover:scale-105 hover:bg-white/20 hover:shadow-xl border border-white/20"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-tertiary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Floating icon container */}
      <div className="relative inline-block mb-4">
        <div className="relative p-4 bg-gradient-to-br from-secondary to-secondary-light rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <div className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300"></div>
          <Icon className="w-8 h-8 text-primary relative z-10 group-hover:text-primary/90 transition-colors duration-300" />
        </div>
        {/* Floating animation ring */}
        <div className="absolute inset-0 rounded-full border-2 border-secondary/30 animate-pulse group-hover:border-secondary/50 transition-colors duration-300"></div>
      </div>
      
      <h3 className="font-playfair text-xl font-bold text-white mb-3 group-hover:text-secondary transition-colors duration-300 relative z-10">
        {title}
      </h3>
      <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300 relative z-10">
        {description}
      </p>
      
      {/* Decorative corner elements */}
      <div className="absolute top-3 right-3 w-2 h-2 bg-secondary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-3 left-3 w-2 h-2 bg-tertiary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export default function ConciergeServices() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-tertiary/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
      </div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 animate-pulse"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header section with enhanced typography */}
        <div className="text-center mb-12">
          <div className="inline-block mb-3">
            <span className="text-secondary font-semibold tracking-wider uppercase">
              Luxury Services
            </span>
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Conciergerie Services
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-tertiary mx-auto mb-4"></div>
          <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
            Experience personalized luxury with our dedicated concierge team
          </p>
        </div>
        
        {/* Services grid with staggered animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
          <ServiceCard
            icon={UtensilsCrossed}
            title="Restaurant Reservations"
            description="Priority bookings at exclusive restaurants and curated dining experiences"
            delay={0}
          />
          <ServiceCard
            icon={Car}
            title="Private Transfers"
            description="Luxury chauffeur services and premium transportation arrangements"
            delay={100}
          />
          <ServiceCard
            icon={Sparkles}
            title="Spa & Wellness"
            description="In-room treatments and premium wellness experiences"
            delay={200}
          />
          <ServiceCard
            icon={Baby}
            title="Baby Sitting"
            description="Certified childcare professionals available 24/7"
            delay={300}
          />
        </div>

        {/* Enhanced CTA button */}
        <div className="text-center">
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <Link
              href="/concierge-services"
              className="relative inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-3 rounded-full font-semibold hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <span className="mr-2">View All Services</span>
              <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-primary text-sm">→</span>
              </div>
            </Link>
          </div>
          
          {/* Subtitle under button */}
          <p className="text-white/70 text-sm mt-3 font-medium">
            Discover our complete range of luxury services
          </p>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 fill-cream">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}