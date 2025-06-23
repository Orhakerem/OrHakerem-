'use client';

import { Calendar, Mail, MessageSquare, Phone, Users, Sparkles, Heart, Star, ArrowUp, ArrowLeft, Home } from 'lucide-react';
import toast from 'react-hot-toast';

import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { sendEmail } from '@/actions/email';

interface EventOptionProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  delay: number;
}

function EventOption({ title, description, icon: Icon, features, delay }: EventOptionProps) {
  return (
    <div 
      className="group relative bg-white rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-100"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-tertiary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Floating icon container */}
      <div className="relative inline-block mb-6">
        <div className="relative p-4 bg-gradient-to-br from-secondary to-secondary-light rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
          <div className="absolute inset-0 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-300"></div>
          <Icon className="w-8 h-8 text-primary relative z-10 group-hover:text-primary/90 transition-colors duration-300" />
        </div>
        {/* Floating animation ring */}
        <div className="absolute inset-0 rounded-full border-2 border-secondary/30 animate-pulse group-hover:border-secondary/50 transition-colors duration-300"></div>
      </div>
      
      <h3 className="font-playfair text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition-colors duration-300 relative z-10">
        {title}
      </h3>
      <p className="text-primary/80 leading-relaxed text-lg mb-6 group-hover:text-primary transition-colors duration-300 relative z-10">
        {description}
      </p>

      {/* Features list */}
      <ul className="space-y-2 relative z-10">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-primary/70 group-hover:text-primary transition-colors duration-300">
            <Star className="w-4 h-4 text-tertiary mr-2 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* Decorative corner elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-secondary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-tertiary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

export default function Events() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactMethod, setContactMethod] = useState('email');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const eventSpaces = [
    {
      title: 'Rooftop Terrace',
      description: 'An elegant open-air space perfect for cocktail parties and intimate gatherings, featuring breathtaking city and sea views.',
      icon: Sparkles,
      features: [
        'Panoramic sea views',
        'Jacuzzi access',
        'BBQ facilities',
        'Capacity: 50 guests',
        'Perfect for sunset events'
      ]
    },
    {
      title: 'Private Dining Experience',
      description: 'Sophisticated indoor venue ideal for dinner parties and small celebrations with full catering options.',
      icon: Heart,
      features: [
        'Fully equipped kitchen',
        'Elegant dining setup',
        'Professional catering available',
        'Capacity: 50 guests',
        'Intimate atmosphere'
      ]
    },
    {
      title: 'Celebration Space',
      description: 'Perfect setting for special occasions including bar/bat mitzvahs, brit mila, and family celebrations.',
      icon: Users,
      features: [
        'Flexible space configuration',
        'Traditional & modern amenities',
        'Kosher meal arrangements',
        'Capacity: 80 guests',
        'Cultural celebration support'
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.set('property', 'Event Space Request');

      const result = await sendEmail(formData);
      if (result.success) {
        toast.success(result.message || 'Event inquiry sent successfully!');
        setIsSuccess(true);
        setShowForm(false);
      } else {
        toast.error(result.error || 'Failed to send event inquiry');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit event request. Please try again.');
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
        {/* Enhanced Back Navigation */}
        <div className="mb-8">
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Link
              href="/"
              className="relative inline-flex items-center bg-white/80 backdrop-blur-sm text-primary px-6 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-primary/20"
            >
              <div className="relative mr-3">
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <div className="absolute inset-0 bg-secondary/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
              </div>
              <Home className="w-5 h-5 mr-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-[500px] rounded-2xl overflow-hidden mb-20">
          <Image
            src="/penthouse/4-terrasse-ext-coucher-soleil.png"
            alt="Event Space"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 flex items-center">
            <div className="max-w-4xl mx-auto text-center px-4">
              <div className="inline-block mb-4">
                <span className="text-secondary font-semibold text-lg tracking-wider uppercase">
                  Exclusive Events
                </span>
              </div>
              <h1 className="font-playfair text-6xl font-bold text-white mb-8">
                Host Your Special Events
              </h1>
              <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                Experience luxury and elegance in our exclusive event spaces with breathtaking views 
                and premium amenities for unforgettable celebrations.
              </p>
            </div>
          </div>
        </div>

        {/* Event Spaces Section */}
        <section className="py-20 bg-cream mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header section */}
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="text-tertiary font-semibold text-lg tracking-wider uppercase">
                  Our Venues
                </span>
              </div>
              <h2 className="font-playfair text-5xl font-bold text-primary mb-6 leading-tight">
                Available Event Spaces
              </h2>
              <p className="text-primary/80 text-xl max-w-3xl mx-auto leading-relaxed">
                Choose from our carefully curated event spaces, each designed to create magical moments 
                and lasting memories for you and your guests.
              </p>
            </div>
            
            {/* Event spaces grid */}
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {eventSpaces.map((space, index) => (
                <EventOption
                  key={index}
                  title={space.title}
                  description={space.description}
                  icon={space.icon}
                  features={space.features}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden rounded-3xl">
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
              <div className="inline-block mb-4">
                <span className="text-secondary font-semibold text-lg tracking-wider uppercase">
                  Plan Your Event
                </span>
              </div>
              <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Create Unforgettable Moments
              </h2>
              <p className="text-white/90 text-xl max-w-3xl mx-auto leading-relaxed">
                Let us help you create an unforgettable experience. Our events team will contact you 
                <br className="hidden md:block" />
                to discuss your requirements and bring your vision to life.
              </p>
            </div>

            {isSuccess ? (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-10 text-center border border-white/20">
                  <div className="inline-block p-4 bg-gradient-to-br from-secondary to-secondary-light rounded-full mb-6">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-playfair text-3xl font-bold text-white mb-4">
                    Thank you for your inquiry!
                  </h3>
                  <p className="text-white/90 text-lg mb-8">
                    Our events team will contact you within 24 hours to discuss your special event.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-3 rounded-full font-semibold hover:from-secondary-light hover:to-secondary transition-all duration-300"
                  >
                    Plan Another Event
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <div className="inline-block relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <button
                      onClick={() => setShowForm(true)}
                      className="relative inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-12 py-4 rounded-full font-semibold text-lg hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                      <Calendar className="w-6 h-6 mr-3" />
                      <span>Inquire About Events</span>
                    </button>
                  </div>
                  <p className="text-white/70 text-sm mt-6 font-medium">
                    Free consultation • Custom event planning • Premium service
                  </p>
                </div>

                {showForm && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="font-playfair text-3xl font-bold text-primary">
                          Event Inquiry Form
                        </h3>
                        <button
                          onClick={() => setShowForm(false)}
                          className="text-primary/60 hover:text-primary transition-colors"
                        >
                          <span className="sr-only">Close</span>
                          ✕
                        </button>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="eventType"
                              className="block text-sm font-medium text-primary/80 mb-2"
                            >
                              Event Type
                            </label>
                            <select
                              id="eventType"
                              name="eventType"
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                            >
                              <option value="">Select event type</option>
                              <option value="cocktail">Cocktail Party</option>
                              <option value="dinner">Private Dinner</option>
                              <option value="celebration">Celebration</option>
                              <option value="bar-mitzvah">Bar/Bat Mitzvah</option>
                              <option value="brit-mila">Brit Mila</option>
                              <option value="corporate">Corporate Event</option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          <div>
                            <label
                              htmlFor="eventDate"
                              className="block text-sm font-medium text-primary/80 mb-2"
                            >
                              Event Date
                            </label>
                            <input
                              type="date"
                              id="eventDate"
                              name="checkIn"
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="guestCount"
                            className="block text-sm font-medium text-primary/80 mb-2"
                          >
                            Number of Guests
                          </label>
                          <input
                            type="number"
                            id="guestCount"
                            name="guestCount"
                            required
                            min="1"
                            max="80"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium text-primary/80 mb-2"
                            >
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-primary/80 mb-2"
                            >
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                              <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-primary/80 mb-2"
                          >
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              required
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-primary/80 mb-3">
                            Preferred Contact Method
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label className="relative flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors hover:border-secondary hover:bg-secondary/5 group">
                              <input
                                type="radio"
                                name="contactMethod"
                                value="email"
                                checked={contactMethod === 'email'}
                                onChange={(e) => setContactMethod(e.target.value)}
                                className="absolute opacity-0"
                              />
                              <Mail
                                className={`w-5 h-5 ${contactMethod === 'email' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
                              />
                              <span
                                className={`ml-2 ${contactMethod === 'email' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
                              >
                                Email
                              </span>
                            </label>

                            <label className="relative flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors hover:border-secondary hover:bg-secondary/5 group">
                              <input
                                type="radio"
                                name="contactMethod"
                                value="phone"
                                checked={contactMethod === 'phone'}
                                onChange={(e) => setContactMethod(e.target.value)}
                                className="absolute opacity-0"
                              />
                              <Phone
                                className={`w-5 h-5 ${contactMethod === 'phone' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
                              />
                              <span
                                className={`ml-2 ${contactMethod === 'phone' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
                              >
                                Phone
                              </span>
                            </label>

                            <label className="relative flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors hover:border-secondary hover:bg-secondary/5 group">
                              <input
                                type="radio"
                                name="contactMethod"
                                value="whatsapp"
                                checked={contactMethod === 'whatsapp'}
                                onChange={(e) => setContactMethod(e.target.value)}
                                className="absolute opacity-0"
                              />
                              <MessageSquare
                                className={`w-5 h-5 ${contactMethod === 'whatsapp' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
                              />
                              <span
                                className={`ml-2 ${contactMethod === 'whatsapp' ? 'text-secondary' : 'text-primary'} transition-colors duration-300 group-hover:text-secondary`}
                              >
                                WhatsApp
                              </span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-primary/80 mb-2"
                          >
                            Event Details
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                            placeholder="Please share any specific requirements, dietary restrictions, special arrangements, or questions about your event..."
                          ></textarea>
                        </div>

                        <div className="flex gap-4">
                          <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-primary hover:bg-gray-50 transition"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-gradient-to-r from-primary to-primary-light text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-light hover:to-primary transition disabled:opacity-50"
                          >
                            {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

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