'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MessageSquare, ArrowUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { sendContactEmail } from '@/actions/contact';

export default function ConciergeServicesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const services = [
    {
      title: 'Dining Reservations',
      description: 'Priority bookings at Michelin-starred restaurants and exclusive culinary experiences. Our established relationships with premier establishments ensure you enjoy exceptional dining adventures with seamless reservations.'
    },
    {
      title: 'Transportation',
      description: 'Luxury vehicle rentals with professional chauffeurs and private airport transfers. Travel in ultimate comfort and style with our premium transportation solutions, perfectly timed to your schedule and preferences.'
    },
    {
      title: 'Baby Sitting',
      description: 'Certified childcare professionals available 24/7 for your complete peace of mind. Our vetted and experienced caregivers provide exceptional care, allowing you to enjoy your stay with confidence and relaxation.'
    },
    {
      title: 'Wellness & Spa',
      description: 'In-room treatments and premium wellness experiences tailored to your needs. From therapeutic massages to personalized fitness sessions, rejuvenate with our comprehensive wellness services designed for complete relaxation.'
    },
    {
      title: 'Event Planning',
      description: 'VIP access to exclusive events and private celebrations with meticulous attention to detail. From intimate gatherings to grand celebrations, we orchestrate unforgettable experiences that exceed your expectations.'
    },
    {
      title: 'Personal Shopping',
      description: 'Personal stylists and boutique appointments with curated shopping experiences. Enjoy exclusive access to luxury brands and personalized styling services, with convenient delivery directly to your accommodation.'
    },
    {
      title: 'Business Services',
      description: 'Meeting rooms and secretarial support with comprehensive business solutions. Maintain productivity with our professional facilities, administrative assistance, and state-of-the-art technology services.'
    },
    {
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
              <h1 className="font-playfair text-6xl font-bold text-white mb-8">
                Premium Concierge Services
              </h1>
              <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Our dedicated concierge team provides impeccable service tailored to your every need. 
                Experience the ultimate in personalized luxury during your stay.
              </p>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="mb-20">
          <h2 className="text-center font-playfair text-4xl font-bold text-primary mb-16">
            Our Complete Service Portfolio
          </h2>
          <div className="space-y-12 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-playfair text-3xl font-bold text-primary mb-6">
                  {service.title}
                </h3>
                <p className="text-primary/80 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-5xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-primary mb-8 text-center">
            Contact Our Concierge Team
          </h2>
          <p className="text-primary/80 text-xl text-center mb-12 leading-relaxed">
            Our dedicated team is available 24/7 to assist with all your requests
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-8 bg-cream rounded-2xl">
              <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-primary mb-3 text-xl">Email</h3>
              <p className="text-primary/80 text-lg">concierge@orhakerem.com</p>
            </div>
            <div className="text-center p-8 bg-cream rounded-2xl">
              <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-primary mb-3 text-xl">Phone</h3>
              <p className="text-primary/80 text-lg">+972 [Your Number]</p>
            </div>
            <div className="text-center p-8 bg-cream rounded-2xl">
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-primary mb-3 text-xl">WhatsApp</h3>
              <p className="text-primary/80 text-lg">Available 24/7</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowContactForm(true)}
              className="bg-primary text-secondary px-10 py-4 rounded-full font-semibold hover:bg-primary-light transition text-lg"
            >
              Send Online Request
            </button>
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
            className="fixed bottom-8 right-8 bg-primary text-secondary p-4 rounded-full shadow-lg hover:bg-primary-light transition-all duration-300 z-40"
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
}