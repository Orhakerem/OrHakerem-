'use client';

import { Calendar, Mail, MessageSquare, Phone, ArrowUp } from 'lucide-react';
import toast from 'react-hot-toast';

import React, { useState, useEffect, useRef } from 'react';

import { sendEmail } from '@/actions/email';
import BookingSingleDateCalendar from '@/components/BookingSingleDateCalendar';
import { useBackToTopVisibility } from '@/hooks/useBackToTopVisibility';

const eventTypes = [
  'Wedding',
  'Bar/Bat Mitzvah',
  'Brit Mila',
  'Sheva Brachot',
  'Birthday Celebration',
  'Heena',
  'Private Dinner',
  'Cocktail Reception',
];

const venueFeatures = [
  'Panoramic sea and city views',
  'Capacity: up to 80 guests',
  'Rooftop terrace with jacuzzi',
  'BBQ facilities',
  'Fully equipped professional kitchen',
  'Elegant dining setup',
  'Professional catering available upon request',
  'Flexible space configuration',
  'Tailored planning for intimate events',
  'Optional kosher services and meal arrangements',
  'Perfect for sunset events',
  'Indoor and outdoor spaces',
  'Premium audio system',
  'Stunning photo opportunities',
];

export default function Events() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contactMethod, setContactMethod] = useState('email');
  const [eventDate, setEventDate] = useState<string | null>(null);
  const showBackToTop = useBackToTopVisibility();
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

    if (!eventDate) {
      toast.error('Please choose an event date.');
      return;
    }

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
    const originalOverflow = document.body.style.overflow;

    if (showForm) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showForm]);

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
              Boutique Event Venue in Tel Aviv
            </h1>
            <p className="max-w-3xl mx-auto mt-4 text-base md:text-lg text-white/90 leading-relaxed" data-animate="fade-up">
              Or HaKerem hosts boutique events and celebrations in Tel Aviv, offering a unique venue with optional kosher services.
            </p>
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
                Set in the heart of Tel Aviv, our penthouse offers a refined setting for private celebrations, with panoramic sea and city views,
                elegant indoor spaces, and a rooftop terrace designed for intimate gatherings that feel both elevated and personal.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="rounded-2xl border border-secondary/20 bg-gradient-to-br from-secondary/10 to-white p-6">
                  <span className="text-secondary font-semibold text-sm tracking-[0.18em] uppercase block mb-3">
                    Jewish Events
                  </span>
                  <p className="text-primary/80 leading-relaxed">
                    From Bar and Bat Mitzvahs to Brit Milah, Sheva Brachot, and elegant family gatherings, each event is hosted with care and attention to detail, with kosher services available on request.
                  </p>
                </div>
                <div className="rounded-2xl border border-tertiary/20 bg-gradient-to-br from-tertiary/10 to-white p-6">
                  <span className="text-tertiary font-semibold text-sm tracking-[0.18em] uppercase block mb-3">
                    Trusted Hosting
                  </span>
                  <p className="text-primary/80 leading-relaxed">
                    Hosting dozens of guests weekly, Or HaKerem is one of the few venues in Tel Aviv offering a fully tailored experience for intimate events.
                  </p>
                </div>
              </div>

              {/* Event Types */}
              <div className="mb-10">
                <h3 className="font-playfair text-2xl font-bold text-primary mb-6 text-center">
                  Perfect For These Special Events
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-animate-group="cards">
                  {eventTypes.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-xl bg-gradient-to-br from-secondary/10 to-tertiary/10 p-4"
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
                  {venueFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className=""
                    >
                      <span className="text-primary/80">{feature}</span>
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
                Share your guest count, event style, and any kosher requirements, and our team will return with a tailored proposal for your celebration.
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
                    className="button-hover-clean bg-gradient-to-r from-secondary to-secondary-light text-primary px-8 py-3 rounded-full font-semibold transition-all duration-300"
                  >
                    Plan Another Event
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="events-plan-cta text-center mb-8">
                  <div className="inline-block relative">
                    <button
                      onClick={() => setShowForm(true)}
                      className="button-hover-clean relative inline-flex items-center rounded-full bg-gradient-to-r from-secondary to-secondary-light px-10 py-3 text-base font-semibold text-primary shadow-xl"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>Inquire About Events</span>
                    </button>
                  </div>
                  <p className="text-white/70 text-xs mt-4 font-medium">
                    Private consultation • Tailored planning • Kosher options on request
                  </p>
                </div>

              </>
            )}
          </div>
        </section>
      </div>

      {showForm && (
        <div
          className="event-modal tap-reset fixed inset-0 z-50 bg-black/55 backdrop-blur-sm p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-inquiry-title"
          onClick={() => setShowForm(false)}
        >
          <div
            className="event-form-wrap w-full min-h-full flex items-start justify-center sm:items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="event-form w-full max-w-3xl overflow-y-auto rounded-2xl border border-primary/10 bg-white shadow-2xl sm:rounded-3xl">
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-primary/10 bg-white/95 px-5 py-4 backdrop-blur-sm sm:px-8 sm:py-5">
                <div>
                  <h3 id="event-inquiry-title" className="font-playfair text-2xl sm:text-3xl font-bold text-primary">
                    Event Inquiry Form
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-primary/70">
                    Share the essentials and we&apos;ll prepare a tailored response.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="shrink-0 rounded-full border border-primary/10 p-2 text-primary/60"
                >
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>

              <div className="px-5 py-5 sm:px-8 sm:py-6">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black/15 focus:ring-2 focus:ring-black/10"
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

                  <input type="hidden" name="checkIn" value={eventDate ?? ''} />

                  <div>
                    <span className="block text-sm font-medium text-primary/80 mb-3">
                      Event Date
                    </span>
                    <BookingSingleDateCalendar value={eventDate} onChange={setEventDate} />
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
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black/15 focus:ring-2 focus:ring-black/10"
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
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black/15 focus:ring-2 focus:ring-black/10"
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
                          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-black/15 focus:ring-2 focus:ring-black/10"
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
                          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-black/15 focus:ring-2 focus:ring-black/10"
                        />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary/80 mb-3">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <label className={`tap-reset relative flex cursor-pointer items-center justify-center rounded-lg border p-4 ${contactMethod === 'email' ? 'border-black/10 bg-black/[0.03] shadow-sm' : 'border-gray-200 bg-white'}`}>
                        <input
                          type="radio"
                          name="contactMethod"
                          value="email"
                          checked={contactMethod === 'email'}
                          onChange={(e) => setContactMethod(e.target.value)}
                          className="absolute opacity-0"
                        />
                        <Mail className="h-5 w-5 text-primary" />
                        <span className="ml-2 text-primary">
                          Email
                        </span>
                      </label>

                      <label className={`tap-reset relative flex cursor-pointer items-center justify-center rounded-lg border p-4 ${contactMethod === 'phone' ? 'border-black/10 bg-black/[0.03] shadow-sm' : 'border-gray-200 bg-white'}`}>
                        <input
                          type="radio"
                          name="contactMethod"
                          value="phone"
                          checked={contactMethod === 'phone'}
                          onChange={(e) => setContactMethod(e.target.value)}
                          className="absolute opacity-0"
                        />
                        <Phone className="h-5 w-5 text-primary" />
                        <span className="ml-2 text-primary">
                          Phone
                        </span>
                      </label>

                      <label className={`tap-reset relative flex cursor-pointer items-center justify-center rounded-lg border p-4 ${contactMethod === 'whatsapp' ? 'border-black/10 bg-black/[0.03] shadow-sm' : 'border-gray-200 bg-white'}`}>
                        <input
                          type="radio"
                          name="contactMethod"
                          value="whatsapp"
                          checked={contactMethod === 'whatsapp'}
                          onChange={(e) => setContactMethod(e.target.value)}
                          className="absolute opacity-0"
                        />
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <span className="ml-2 text-primary">
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
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-black/15 focus:ring-2 focus:ring-black/10"
                      placeholder="Please share any specific requirements, dietary restrictions, special arrangements, or questions about your event..."
                    ></textarea>
                  </div>

                  <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 rounded-lg border border-gray-300 px-6 py-3 text-primary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="button-hover-clean flex-1 rounded-lg bg-gradient-to-r from-primary to-primary-light px-6 py-3 font-semibold text-white transition disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 rounded-full bg-gradient-to-r from-secondary to-secondary-light p-4 text-primary shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
