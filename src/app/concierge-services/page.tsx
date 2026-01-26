'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, Car, Baby, Calendar, ShoppingBasket, Sparkles, Sparkle, UtensilsCrossed } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendContactEmail } from '@/actions/contact';

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  delay: number;
}

function ServiceCard({ icon: Icon, title, description, delay }: ServiceCardProps) {
  return (
    <div
      className="group relative bg-white rounded-xl p-5 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-100"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-tertiary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Floating icon container - Reduced size */}
      <div className="relative inline-block mb-4">
        <div className="relative p-3 bg-gradient-to-br from-secondary to-secondary-light rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <div className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300"></div>
          <Icon className="w-6 h-6 text-primary relative z-10 group-hover:text-primary/90 transition-colors duration-300" />
        </div>
        {/* Floating animation ring */}
        <div className="absolute inset-0 rounded-full border-2 border-secondary/30 animate-pulse group-hover:border-secondary/50 transition-colors duration-300"></div>
      </div>

      {/* Reduced heading size */}
      <h3 className="font-playfair text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors duration-300 relative z-10">
        {title}
      </h3>
      {/* Reduced text size and spacing */}
      <p className="text-primary/80 leading-relaxed text-sm group-hover:text-primary transition-colors duration-300 relative z-10">
        {description}
      </p>

      {/* Decorative corner elements - Moved away from borders */}
      <div className="absolute top-6 right-6 w-1.5 h-1.5 bg-secondary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-tertiary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export default function ConciergeServicesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const services = [
    {
      icon: ShoppingBasket,
      title: 'Grocery Delivery',
      description: 'We offer delivery during your stay on demand and even before check-in.'
    },
    {
      icon: Car,
      title: 'Transportation',
      description: 'Vehicle rentals with professional drivers and private airport and city-to-city transfers.'
    },
    {
      icon: Baby,
      title: 'Baby Sitting',
      description: 'Certified childcare professionals available 24/7 for your complete peace of mind.'
    },
    {
      icon: Calendar,
      title: 'Event Planning',
      description: 'Access to events and private celebrations with meticulous attention to every detail.'
    },
    {
      icon: Sparkle,
      title: 'Cleaning on Demand',
      description: 'We offer cleaning services during your stay, provided by a professional team that will not interfere with your time in the apartment.'
    },
    {
      icon: UtensilsCrossed,
      title: 'Dining Reservation',
      description: 'Experience the finest culinary destinations with our restaurant reservation service. We secure tables at the most sought-after establishments.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      // Add context that this is a concierge service request
      const originalMessage = formData.get('message') as string;
      formData.set('message', `Concierge Service Request: ${originalMessage}`);
      
      const result = await sendContactEmail(formData);
      if (result.success) {
        toast.success(result.message || 'Your concierge request has been sent successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        toast.error(result.error || 'Failed to send request');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      toast.error('Failed to send request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      {/* Modern Hero Section - No Image */}
      <section className="relative min-h-[85vh] w-full overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary pt-24">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-tertiary rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 right-20 w-32 h-32 border-4 border-secondary/30 rounded-lg rotate-12 animate-spin-slow"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 border-4 border-tertiary/30 rounded-full animate-bounce-slow"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-start justify-center min-h-[calc(85vh-6rem)] px-4 pt-16">
          <div className="max-w-5xl mx-auto text-center">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
              <span className="text-white font-semibold text-sm tracking-wider uppercase">
                Luxury Services
              </span>
            </div>

            {/* Main Heading with Animation */}
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight animate-fade-in">
              Premium Concierge
              <br />
              <span className="text-secondary">Services</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
              Our dedicated concierge team provides impeccable service tailored to your every need.
              Experience the ultimate in personalized luxury during your stay.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90">
                24/7 Available
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90">
                Personalized Service
              </div>
              <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90">
                Expert Team
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 8.33333C120 16.6667 240 33.3333 360 41.6667C480 50 600 50 720 41.6667C840 33.3333 960 16.6667 1080 16.6667C1200 16.6667 1320 33.3333 1380 41.6667L1440 50V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V0Z" fill="#FAF7F2"/>
          </svg>
        </div>
      </section>

      {/* Services Section - Redesigned */}
      <section className="relative py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header section with modern design */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-tertiary/10 rounded-full">
              <div className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></div>
              <span className="text-tertiary font-semibold text-sm tracking-wider uppercase">
                Our Services
              </span>
            </div>
            <h2 className="font-playfair text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              Tailored to Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-tertiary">
                Every Need
              </span>
            </h2>
            <p className="text-primary/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Discover our comprehensive range of luxury services designed to exceed your expectations
            </p>
          </div>

          {/* Services grid with enhanced cards - Updated to 3 columns with reduced gap */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Divider Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-16"></div>

        {/* Contact Section - Centered and with bottom spacing */}
        <section className="py-12 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden rounded-2xl mb-20">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-5 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-5 w-32 h-32 bg-tertiary/10 rounded-full blur-2xl"></div>
          </div>

          {/* Centered content container */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center">
            <div className="w-full">
            {/* Compact Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 bg-secondary/20 backdrop-blur-sm rounded-full">
                <span className="text-secondary font-semibold text-xs tracking-wider uppercase">
                  Get In Touch
                </span>
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                Request Concierge Services
              </h2>
              <p className="text-white/80 text-base max-w-xl mx-auto">
                Available 24/7 to fulfill your every request
              </p>
            </div>

            {/* Compact Contact Form */}
            <div className="max-w-2xl mx-auto">
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-white/90 mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        required
                        className="w-full h-11 px-4 bg-white/10 backdrop-blur-sm border border-white/20 focus:border-secondary focus:ring-1 focus:ring-secondary/20 rounded-lg transition-all duration-300 outline-none text-sm text-white placeholder-white/60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-white/90 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your@email.com"
                        required
                        className="w-full h-11 px-4 bg-white/10 backdrop-blur-sm border border-white/20 focus:border-secondary focus:ring-1 focus:ring-secondary/20 rounded-lg transition-all duration-300 outline-none text-sm text-white placeholder-white/60"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium text-white/90 mb-2"
                    >
                      Service Request Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Please describe the concierge service you need..."
                      rows={4}
                      required
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 focus:border-secondary focus:ring-1 focus:ring-secondary/20 rounded-lg transition-all duration-300 outline-none resize-none text-sm text-white placeholder-white/60"
                    ></textarea>
                  </div>

                  <div className="text-center pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-2.5 rounded-full font-semibold text-sm hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="mr-2">
                        {isSubmitting ? 'Sending...' : 'Submit Request'}
                      </span>
                      <span>→</span>
                    </button>
                    <p className="text-white/60 text-xs mt-3">
                      We&apos;ll respond within 2 hours
                    </p>
                  </div>
                </form>
              </div>
            </div>
            </div>
          </div>
        </section>
      </div>

      {/* Back to Top Button */}
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
