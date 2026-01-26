'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, MapPin, Home, Sparkles, Shield, Star, Calendar, CheckCircle, Wifi, Car, Clock, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary-light rounded-full flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="font-playfair text-xl font-bold text-primary mb-3">
        {title}
      </h3>
      <p className="text-primary/80 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function ShortTermRentalsPage() {
  const router = useRouter();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream">
      <section className="relative min-h-[85vh] w-full overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary pt-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl animate-shimmer-glow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-tertiary rounded-full blur-3xl animate-shimmer-glow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white rounded-full blur-3xl animate-shimmer-glow" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-secondary/40 rounded-full animate-float-up" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/30 rounded-full animate-float-up" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-tertiary/30 rounded-full animate-float-up" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-2/3 right-1/5 w-2 h-2 bg-secondary/50 rounded-full animate-float-up" style={{ animationDelay: '6s' }}></div>
          <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-white/40 rounded-full animate-float-up" style={{ animationDelay: '8s' }}></div>
          <div className="absolute top-1/5 left-2/3 w-2 h-2 bg-tertiary/40 rounded-full animate-float-up" style={{ animationDelay: '10s' }}></div>

          <div className="absolute top-32 right-16 w-20 h-20 border-2 border-secondary/20 rounded-full animate-float-drift"></div>
          <div className="absolute bottom-32 left-16 w-16 h-16 border-2 border-white/15 rounded-lg animate-float-drift" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-12 h-12 border border-tertiary/20 rounded-full animate-float-drift" style={{ animationDelay: '5s' }}></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[calc(85vh-6rem)] px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Home className="w-5 h-5 text-secondary animate-pulse" />
              <span className="text-white font-semibold text-sm tracking-wider uppercase">
                Premium Accommodations
              </span>
            </div>

            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in">
              Luxury Rental in the Heart of Tel Aviv
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
              Discover a new home in our premium short-term rental apartments. Perfectly located in historic Kerem HaTeimanim, steps from the beach and city center.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Prime Location</span>
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 flex items-center gap-2">
                <Star className="w-4 h-4" />
                <span>5-Star Rated</span>
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Easy Booking</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <button
                onClick={() => router.push('/properties')}
                className="inline-flex items-center justify-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-4 rounded-full font-semibold text-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <Calendar className="w-6 h-6 mr-3" />
                <span>View Available Apartments</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 8.33333C120 16.6667 240 33.3333 360 41.6667C480 50 600 50 720 41.6667C840 33.3333 960 16.6667 1080 16.6667C1200 16.6667 1320 33.3333 1380 41.6667L1440 50V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V0Z" fill="#FAF7F2"/>
          </svg>
        </div>
      </section>


      <section className="relative py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Wifi, title: 'High-Speed WiFi', description: 'Reliable fiber-optic internet for work and entertainment' },
              { icon: Home, title: 'Full Kitchen', description: 'Modern appliances, cookware, and everything for home cooking' },
              { icon: Sparkles, title: 'Professional Cleaning', description: 'Thoroughly cleaned and sanitized before every arrival' },
              { icon: Car, title: 'Easy Parking', description: 'Street parking available or garage options nearby' },
              { icon: CheckCircle, title: 'Air Conditioning', description: 'Climate control throughout for year-round comfort' },
              { icon: Users, title: 'Flexible Capacity', description: 'Accommodations from cozy studios to 6-person penthouses' },
              { icon: Shield, title: 'Secure Access', description: 'Electronic locks and secure building entry systems' },
              { icon: Clock, title: '24/7 Support', description: 'Round-the-clock assistance for any needs or questions' }
            ].map((amenity, index) => (
              <div key={index} className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <amenity.icon className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-playfair text-lg font-bold text-primary mb-2">
                  {amenity.title}
                </h3>
                <p className="text-primary/70 text-sm">
                  {amenity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="relative py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
                Discover Kerem HaTeimanim – Your only Tel Aviv Base
              </h2>
              <p className="text-primary/80 text-lg leading-relaxed mb-6">
                When searching for an <strong>apartment in Tel Aviv</strong>, location defines your entire experience and memories. Kerem HaTeimanim, one of Tel Aviv&apos;s oldest and most authentic neighborhoods, offers a unique blend of festivity and local atmosphere while being adapted for families and business trips.
              </p>
              <p className="text-primary/80 text-lg leading-relaxed mb-6">
                This historic quarter sits at the crossroads of everything you want to experience at Tel Aviv. The unique Tayelet is only 2 minutes by walk from here. The Carmel Market to buy your everything and memories.
              </p>
              <p className="text-primary/80 text-lg leading-relaxed mb-8">
                Choosing <strong>Orhakerem</strong> means waking up to the aroma of fresh pastries, strolling to the beach before breakfast, and experiencing the authentic rhythm of Israeli life. You&apos;re not just visiting Tel Aviv, you&apos;re living it.
              </p>

              <div className="bg-cream rounded-xl p-6 border-l-4 border-secondary">
                <h3 className="font-playfair text-xl font-bold text-primary mb-3">
                  Walking Distance To:
                </h3>
                <ul className="space-y-2 text-primary/80">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                    <span>Beach – 2 minutes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                    <span>Carmel Market – 1 minute</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                    <span>Rothschild Boulevard – 5 minutes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                    <span>Old Jaffa – 10 minutes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                    <span>Dizengoff Street – 10 minutes</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/penthouse/7-vue-mer.jpg"
                  alt="Luxury apartment Tel Aviv with sea views from Kerem HaTeimanim"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl max-w-xs">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-light rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-playfair text-2xl font-bold text-primary">4.9/5</div>
                    <div className="text-sm text-primary/70">Guest Rating</div>
                  </div>
                </div>
                <p className="text-sm text-primary/80">
                  Based on 200+ verified reviews
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-gradient-to-br from-primary via-primary to-primary-light overflow-hidden rounded-3xl mx-4 mb-16">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-tertiary/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-secondary font-semibold tracking-wider uppercase mb-4 block">
            Start Your Journey
          </span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-6">
            Book Your stay in Tel Aviv Today
          </h2>
          <p className="text-white/90 text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
            Experience Tel Aviv the way it&apos;s meant to be experienced.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/properties')}
              className="inline-flex items-center justify-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-4 rounded-full font-semibold text-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <Calendar className="w-6 h-6 mr-3" />
              <span>View Available Apartments</span>
            </button>

            <Link
              href="/reservation"
              className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              <span>Make a Reservation</span>
            </Link>
          </div>

          <p className="text-white/70 text-sm mt-6">
            Questions? Contact us anytime – our team is here to help you find your perfect Tel Aviv home.
          </p>
        </div>
      </section>
      
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-secondary to-secondary-light text-primary p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 hover:scale-110"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
