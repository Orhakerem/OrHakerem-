'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { sendContactEmail } from '@/actions/contact';

interface ServiceSectionProps {
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}

function ServiceSection({ title, description, isOpen, onToggle }: ServiceSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex justify-between items-center"
      >
        <h3 className="font-playfair text-xl font-bold text-primary">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-primary" />
        ) : (
          <ChevronDown className="w-6 h-6 text-primary" />
        )}
      </button>
      <div
        className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-primary/80">{description}</p>
      </div>
    </div>
  );
}

export default function ConciergeServicesPage() {
  const [openSection, setOpenSection] = useState<number>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const services = [
    {
      title: 'Dining & Reservations',
      description: 'Secure tables at Michelin-starred restaurants and exclusive dining experiences. Our team has established relationships with the finest establishments to ensure you enjoy exceptional culinary adventures.'
    },
    {
      title: 'Transportation',
      description: 'Private airport transfers, luxury vehicle rentals, and chauffeur services. Travel in comfort and style with our premium transportation solutions tailored to your schedule.'
    },
    {
      title: 'Entertainment & Events',
      description: 'Access to sold-out shows, private events, and VIP experiences. From theater premieres to exclusive gallery openings, we provide access to the most sought-after entertainment.'
    },
    {
      title: 'Personal Shopping',
      description: 'Boutique appointments, personal stylists, and delivery services. Enjoy personalized shopping experiences with expert guidance and convenient delivery to your accommodation.'
    },
    {
      title: 'Wellness & Relaxation',
      description: 'In-room spa treatments, fitness trainers, and wellness retreat bookings. Rejuvenate with our comprehensive wellness services designed for your complete relaxation.'
    },
    {
      title: 'Local Experiences',
      description: 'Private guided tours, cultural immersions, and hidden gem discoveries. Explore authentic local culture with our curated experiences and insider knowledge.'
    },
    {
      title: 'Business Services',
      description: 'Meeting room arrangements, secretarial support, and tech services. Maintain productivity with our comprehensive business support services and professional facilities.'
    },
    {
      title: 'Special Requests',
      description: 'Custom arrangements for celebrations, unique experiences, and last-minute needs. No request is too unique – our team specializes in creating memorable moments.'
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

  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-primary hover:text-[#D8B084] transition-colors duration-300 flex items-center"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative h-[400px] rounded-xl overflow-hidden mb-16">
          <Image
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80"
            alt="Luxury Concierge Services"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/60 flex items-center">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h1 className="font-playfair text-5xl font-bold text-secondary mb-6">
                Premium Concierge Services
              </h1>
              <p className="text-xl text-secondary-light max-w-3xl mx-auto">
                Our dedicated concierge team provides impeccable service tailored to your every need. 
                Experience the ultimate in personalized luxury during your stay.
              </p>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="mb-16">
          <h2 className="text-center font-playfair text-3xl font-bold text-primary mb-12">
            Our Complete Service Portfolio
          </h2>
          <div className="grid gap-4 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <ServiceSection
                key={index}
                title={service.title}
                description={service.description}
                isOpen={openSection === index}
                onToggle={() => setOpenSection(openSection === index ? undefined : index)}
              />
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl font-bold text-primary mb-6 text-center">
            Contact Our Concierge Team
          </h2>
          <p className="text-primary/80 text-center mb-8">
            Our dedicated team is available 24/7 to assist with all your requests
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-cream rounded-lg">
              <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-2">Email</h3>
              <p className="text-primary/80">concierge@orhakerem.com</p>
            </div>
            <div className="text-center p-6 bg-cream rounded-lg">
              <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-2">Phone</h3>
              <p className="text-primary/80">+972 [Your Number]</p>
            </div>
            <div className="text-center p-6 bg-cream rounded-lg">
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-primary mb-2">WhatsApp</h3>
              <p className="text-primary/80">Available 24/7</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowContactForm(true)}
              className="bg-primary text-secondary px-8 py-3 rounded-full font-semibold hover:bg-primary-light transition"
            >
              Send Online Request
            </button>
          </div>

          {/* Contact Form Modal */}
          {showContactForm && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-6">
                  Concierge Service Request
                </h3>

                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-primary/80 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-primary/80 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary/80 mb-1">
                      Service Request Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                      placeholder="Please describe the service you need, preferred dates/times, and any special requirements..."
                    ></textarea>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 rounded-md text-primary hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-primary text-secondary px-6 py-3 rounded-md font-semibold hover:bg-primary-light transition disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Request'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}