'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MessageSquare, ArrowUp, UtensilsCrossed, Car, Sparkles, Baby, Calendar, ShoppingBag, Briefcase, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
      className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:bg-white/20 hover:shadow-2xl border border-white/20"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-tertiary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Floating icon container */}
      <div className="relative inline-block mb-6">
        <div className="relative p-4 bg-gradient-to-br from-secondary to-secondary-light rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <div className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300"></div>
          <Icon className="w-8 h-8 text-primary relative z-10 group-hover:text-primary/90 transition-colors duration-300" />
        </div>
        {/* Floating animation ring */}
        <div className="absolute inset-0 rounded-full border-2 border-secondary/30 animate-pulse group-hover:border-secondary/50 transition-colors duration-300"></div>
      </div>
      
      <h3 className="font-playfair text-2xl font-bold text-white mb-4 group-hover:text-secondary transition-colors duration-300 relative z-10">
        {title}
      </h3>
      <p className="text-white/90 leading-relaxed text-lg group-hover:text-white transition-colors duration-300 relative z-10">
        {description}
      </p>
      
      {/* Decorative corner elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-secondary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-tertiary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export default function ConciergeServicesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const services = [
    {
      icon: UtensilsCrossed,
      title: 'Dining Reservations',
      description: 'Priority bookings at Michelin-starred restaurants and exclusive culinary experiences. Our established relationships with premier establishments ensure you enjoy exceptional dining adventures with seamless reservations.'
    },
    {
      icon: Car,
      title: 'Transportation',
      description: 'Luxury vehicle rentals with professional chauffeurs and private airport transfers. Travel in ultimate comfort and style with our premium transportation solutions, perfectly timed to your schedule and preferences.'
    },
    {
      icon: Baby,
      title: 'Baby Sitting',
      description: 'Certified childcare professionals available 24/7 for your complete peace of mind. Our vetted and experienced caregivers provide exceptional care, allowing you to enjoy your stay with confidence and relaxation.'
    },
    {
      icon: Sparkles,
      title: 'Wellness & Spa',
      description: 'In-room treatments and premium wellness experiences tailored to your needs. From therapeutic massages to personalized fitness sessions, rejuvenate with our comprehensive wellness services designed for complete relaxation.'
    },
    {
      icon: Calendar,
      title: 'Event Planning',
      description: 'VIP access to exclusive events and private celebrations with meticulous attention to detail. From intimate gatherings to grand celebrations, we orchestrate unforgettable experiences that exceed your expectations.'
    },
    {
      icon: ShoppingBag,
      title: 'Personal Shopping',
      description: 'Personal stylists and boutique appointments with curated shopping experiences. Enjoy exclusive access to luxury brands and personalized styling services, with convenient delivery directly to your accommodation.'
    },
    {
      icon: Briefcase,
      title: 'Business Services',
      description: 'Meeting rooms and secretarial support with comprehensive business solutions. Maintain productivity with our professional facilities, administrative assistance, and state-of-the-art technology services.'
    },
    {
      icon: Star,
      title: 'Special Requests',
      description: 'Custom arrangements for unique experiences and memorable celebrations. No request is too distinctive – our specialized team excels at creating extraordinary moments tailored to your vision and desires.'
    }
  ];

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append('message', `Concierge Service Inquiry: ${formData.get('message')}`);
      
      const result = await sendContactEmail(formData);
      if (result.success) {
        toast.success('Your concierge request has been sent successfully!');
        setShowContactForm(false);
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
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-primary hover:text-secondary transition-colors duration-300 flex items-center text-lg"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative h-[500px] rounded-2xl overflow-hidden mb-20">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80"
            alt="Luxury Concierge Services"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 flex items-center">
            <div className="max-w-4xl mx-auto text-center px-4">
              <div className="inline-block mb-4">
                <span className="text-secondary font-semibold text-lg tracking-wider uppercase">
                  Luxury Services
                </span>
              </div>
              <h1 className="font-playfair text-6xl font-bold text-white mb-8">
                Premium Concierge Services
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-secondary to-tertiary mx-auto mb-6"></div>
              <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Our dedicated concierge team provides impeccable service tailored to your every need. 
                Experience the ultimate in personalized luxury during your stay.
              </p>
            </div>
          </div>
        </div>

        {/* Services Section with Enhanced Design */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden rounded-3xl mb-20">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-tertiary/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          </div>
          
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 animate-pulse"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header section */}
            <div className="text-center mb-16">
              <h2 className="font-playfair text-5xl font-bold text-white mb-6 leading-tight">
                Our Complete Service Portfolio
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-secondary to-tertiary mx-auto mb-6"></div>
              <p className="text-white/90 text-xl max-w-3xl mx-auto leading-relaxed">
                Discover our comprehensive range of luxury services designed to exceed your expectations
              </p>
            </div>
            
            {/* Services grid with enhanced cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
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

        {/* Contact Section with Enhanced Design */}
        <div className="bg-gradient-to-br from-white to-cream rounded-3xl shadow-2xl p-12 max-w-5xl mx-auto relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-tertiary/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="text-tertiary font-semibold text-lg tracking-wider uppercase">
                  Get In Touch
                </span>
              </div>
              <h2 className="font-playfair text-4xl font-bold text-primary mb-6">
                Contact Our Concierge Team
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-secondary to-tertiary mx-auto mb-6"></div>
              <p className="text-primary/80 text-xl leading-relaxed max-w-3xl mx-auto">
                Our dedicated team is available 24/7 to assist with all your requests
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/70 transition-all duration-300 group">
                <div className="inline-block p-4 bg-gradient-to-br from-secondary to-secondary-light rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-primary mb-3">Email</h3>
                <p className="text-primary/80 text-lg">concierge@orhakerem.com</p>
              </div>
              <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/70 transition-all duration-300 group">
                <div className="inline-block p-4 bg-gradient-to-br from-secondary to-secondary-light rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-primary mb-3">Phone</h3>
                <p className="text-primary/80 text-lg">+972 [Your Number]</p>
              </div>
              <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/70 transition-all duration-300 group">
                <div className="inline-block p-4 bg-gradient-to-br from-secondary to-secondary-light rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-primary mb-3">WhatsApp</h3>
                <p className="text-primary/80 text-lg">Available 24/7</p>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="relative inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-10 py-4 rounded-full font-semibold text-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <span className="mr-3">Send Online Request</span>
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary text-sm">→</span>
                  </div>
                </button>
              </div>
              
              <p className="text-primary/70 text-sm mt-4 font-medium">
                Get personalized assistance for all your needs
              </p>
            </div>
          </div>

          {/* Contact Form Modal */}
          {showContactForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <h3 className="font-playfair text-3xl font-bold text-primary mb-8">
                  Concierge Service Request
                </h3>

                <form onSubmit={handleContactSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className="block text-lg font-medium text-primary/80 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-lg"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-lg font-medium text-primary/80 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-lg font-medium text-primary/80 mb-2">
                      Service Request Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors text-lg"
                      placeholder="Please describe the service you need, preferred dates/times, and any special requirements..."
                    ></textarea>
                  </div>

                  <div className="flex gap-6">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="flex-1 px-8 py-4 border border-gray-300 rounded-lg text-primary hover:bg-gray-50 transition text-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary text-secondary px-8 py-4 rounded-lg font-semibold hover:bg-primary-light transition disabled:opacity-50 text-lg"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Request'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
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
    </div>
  );
}