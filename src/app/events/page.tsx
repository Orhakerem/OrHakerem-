'use client';

import { Calendar, Mail, MessageSquare, Phone, ArrowUp } from 'lucide-react';
import toast from 'react-hot-toast';

import React, { useState, useEffect, useRef } from 'react';

import { sendEmail } from '@/actions/email';

export default function Events() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactMethod, setContactMethod] = useState('email');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay was prevented, video will show first frame
      });
    }
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      {/* Video Section - Full Width */}
      <section className="hero-section relative w-full h-[75vh] min-h-[600px] pt-20 bg-primary" data-animate="fade-up">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/events-video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30 z-[1]"></div>

        {/* Hero Title - Positioned at bottom of video */}
        <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-10">
          <div className="text-center px-4">
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-secondary animate-fadeInUp drop-shadow-lg" data-animate="text">
              Discover a special place for your events
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Event Spaces Section - Redesigned */}
        <section id="venues" className="events-venues-section py-20 bg-cream mb-20" data-animate="fade-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header section */}
            <div className="events-venues-header text-center mb-16" data-animate="fade-up">
              <div className="inline-block mb-4">
                <span className="text-tertiary font-semibold text-lg tracking-wider uppercase">
                  Our Venues
                </span>
              </div>
              <h2 className="font-playfair text-5xl font-bold text-primary mb-6 leading-tight" data-animate="text">
                Available Event Spaces
              </h2>
            </div>

            {/* Unified venue description */}
            <div className="events-venues-card bg-white rounded-3xl p-12 shadow-xl border border-gray-100 max-w-5xl mx-auto" data-animate="scale">
              <p className="text-primary/90 text-xl leading-relaxed mb-10 text-center">
                Our stunning penthouse offers the perfect setting for any celebration. With breathtaking panoramic sea and city views,
                elegant indoor spaces, and a spectacular rooftop terrace, we provide everything you need to create unforgettable moments
                for you and your guests.
              </p>

              {/* Event Types */}
              <div className="mb-10">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-6 text-center">
                  Perfect For These Special Events
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-animate-group="cards">
                  {[
                    'Wedding',
                    'Bar/Bat Mitzvah',
                    'Brit Mila',
                    'Birthday Party',
                    'Bachelor Party',
                    'Heena',
                    'Private Dinner',
                    'Cocktail Party'
                  ].map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center p-4 bg-gradient-to-br from-secondary/10 to-tertiary/10 rounded-xl hover:from-secondary/20 hover:to-tertiary/20 transition-all duration-300"
                    >
                      <span className="text-primary font-medium text-sm">{event}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Venue Features */}
              <div className="mb-8">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-6 text-center">
                  Venue Features & Amenities
                </h3>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    'Panoramic sea and city views',
                    'Capacity: up to 80 guests',
                    'Rooftop terrace with jacuzzi',
                    'BBQ facilities',
                    'Fully equipped professional kitchen',
                    'Elegant dining setup',
                    'Professional catering available',
                    'Flexible space configuration',
                    'Traditional & modern amenities',
                    'Kosher meal arrangements',
                    'Perfect for sunset events',
                    'Indoor and outdoor spaces',
                    'Premium audio system',
                    'Stunning photo opportunities'
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="group"
                    >
                      <span className="text-primary/80 group-hover:text-primary transition-colors duration-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Compact */}
        <section className="events-plan-section py-12 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden rounded-3xl" data-animate="fade-up">
          {/* Background decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 left-10 w-24 h-24 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-tertiary/10 rounded-full blur-3xl"></div>
          </div>

          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 animate-pulse"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Header section */}
            <div className="events-plan-header text-center mb-10">
              <div className="inline-block mb-3">
                <span className="text-secondary font-semibold text-base tracking-wider uppercase">
                  Plan Your Event
                </span>
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Create Unforgettable Moments
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed">
                Let us help you create an unforgettable experience. Our events team will contact you
                to discuss your requirements and bring your vision to life.
              </p>
            </div>

            {isSuccess ? (
              <div className="max-w-2xl mx-auto">
                <div className="events-plan-success bg-white/10 backdrop-blur-sm rounded-3xl p-10 text-center border border-white/20">
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
                <div className="events-plan-cta text-center mb-8">
                  <div className="inline-block relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-tertiary rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <button
                      onClick={() => setShowForm(true)}
                      className="relative inline-flex items-center bg-gradient-to-r from-secondary to-secondary-light text-primary px-10 py-3 rounded-full font-semibold text-base hover:from-secondary-light hover:to-secondary transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>Inquire About Events</span>
                    </button>
                  </div>
                  <p className="text-white/70 text-xs mt-4 font-medium">
                    Free consultation • Custom event planning • Premium service
                  </p>
                </div>

                {showForm && (
                  <div className="event-modal fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="event-form-wrap w-full flex items-center justify-center">
                    <div className="event-form bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
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
                              <option value="wedding">Wedding</option>
                              <option value="bar-mitzvah">Bar/Bat Mitzvah</option>
                              <option value="brit-mila">Brit Mila</option>
                              <option value="birthday">Birthday Party</option>
                              <option value="bachelor">Bachelor Party</option>
                              <option value="heena">Heena</option>
                              <option value="dinner">Private Dinner</option>
                              <option value="cocktail">Cocktail Party</option>
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
