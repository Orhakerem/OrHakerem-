'use client';

import { ArrowUp, Calendar, ChevronDown, Mail, Phone, X } from 'lucide-react';
import toast from 'react-hot-toast';

import React, { useState, useEffect, useRef } from 'react';

import { sendEmail } from '@/actions/email';
import BookingSingleDateCalendar from '@/components/BookingSingleDateCalendar';
import EventPricing from '@/components/EventPricing';
import LiquidGlassButton from '@/components/LiquidGlassButton';
import { useBackToTopVisibility } from '@/hooks/useBackToTopVisibility';
import { formatIsoDate } from '@/lib/booking-dates';
import type { CalendarSyncStatus } from '@/lib/bookable-properties';
import { eventCleaningFee, venueRentals } from '@/lib/event-pricing-data';
import { getPricingNightKind } from '@/lib/pricing-date-helpers';

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

const venueAmenityGroups: { title: string; items: string[] }[] = [
  {
    title: 'Setting',
    items: [
      'Panoramic sea and city views',
      'Rooftop terrace with jacuzzi',
      'Indoor and outdoor spaces',
      'Perfect for sunset events',
      'Stunning photo opportunities',
    ],
  },
  {
    title: 'Hosting',
    items: [
      'Capacity: up to 80 guests',
      'Tailored planning for intimate events',
      'Optional kosher services and meal arrangements',
      'Flexible space configuration',
      'Elegant dining setup',
    ],
  },
  {
    title: 'Amenities',
    items: [
      'Fully equipped professional kitchen',
      'BBQ facilities',
      'Professional catering available upon request',
      'Premium audio system',
    ],
  },
];

interface EventsClientProps {
  blockedDates: readonly string[];
  availabilityStatus: CalendarSyncStatus;
}

export default function EventsClient({
  blockedDates,
  availabilityStatus,
}: EventsClientProps) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [eventDate, setEventDate] = useState<string | null>(null);
  const showBackToTop = useBackToTopVisibility();
  const videoRef = useRef<HTMLVideoElement>(null);

  const eventQuote = eventDate
    ? (() => {
        const kind = getPricingNightKind(eventDate);
        const rental = venueRentals.find((r) => r.id === kind)!;
        return {
          label: rental.label,
          venuePrice: rental.price,
          cleaningFee: eventCleaningFee,
          total: rental.price + eventCleaningFee,
        };
      })()
    : null;

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
      setIsDatePickerOpen(true);
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
        setIsDatePickerOpen(false);
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
    <div className="min-h-screen" style={{ backgroundColor: '#e8e4dc' }}>
      {/* Video Section - Full Width */}
      <section className="hero-section relative w-full h-[55vh] min-h-[340px] md:h-[75vh] md:min-h-[600px] pt-20 bg-primary" data-animate="fade-up">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/events-poster.webp"
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/events-video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30 z-[1]"></div>

        {/* Hero Title - Positioned at bottom of video */}
        <div className="absolute bottom-[6vh] md:bottom-12 left-0 right-0 z-10">
          <div className="text-center px-4">
            <h1 className="font-head text-2xl md:text-4xl lg:text-5xl font-bold text-secondary animate-fadeInUp drop-shadow-lg" data-animate="text">
              Boutique Event Venue in Tel Aviv
            </h1>
            <p className="max-w-3xl mx-auto mt-2 md:mt-4 text-sm md:text-base md:text-lg text-white/90 leading-relaxed" data-animate="fade-up">
              Or HaKerem hosts boutique events and celebrations in Tel Aviv, offering a unique venue with optional kosher services.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20">

        {/* Event Spaces Section - Flat editorial */}
        <section id="venues" className="events-venues-section py-20 md:py-24 mb-8 md:mb-10" data-animate="fade-up">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center" data-animate="fade-up">
              <span className="text-black font-semibold text-sm md:text-base tracking-[0.2em] uppercase block mb-3">
                Our Venues
              </span>
              <h2 className="font-head text-2xl md:text-4xl lg:text-5xl font-bold text-black leading-tight" data-animate="text">
                Available Event Spaces
              </h2>
              <p className="mt-3 md:mt-6 text-black/80 text-sm md:text-xl leading-relaxed max-w-3xl mx-auto">
                Set in the heart of Tel Aviv, our penthouse offers a refined setting for private celebrations, with panoramic sea and city views, elegant indoor spaces, and a rooftop terrace designed for intimate gatherings that feel both elevated and personal.
              </p>
            </div>

            {/* Pillars — flat 2-col split, hairline divider */}
            <div className="mt-7 md:mt-16 grid gap-6 md:grid-cols-2 md:gap-12" data-animate="fade-up">
              <div>
                <span className="text-secondary font-semibold text-xs tracking-[0.22em] uppercase block mb-3">
                  Jewish Events
                </span>
                <p className="text-black/80 leading-relaxed">
                  From Bar and Bat Mitzvahs to Brit Milah, Sheva Brachot, and elegant family gatherings, each event is hosted with care and attention to detail, with kosher services available on request.
                </p>
              </div>
              <div className="md:border-l md:border-primary/15 md:pl-12">
                <span className="text-tertiary font-semibold text-xs tracking-[0.22em] uppercase block mb-3">
                  Trusted Hosting
                </span>
                <p className="text-black/80 leading-relaxed">
                  Hosting dozens of guests weekly, Or HaKerem is one of the few venues in Tel Aviv offering a fully tailored experience for intimate events.
                </p>
              </div>
            </div>

            {/* Event types — flat chips */}
            <div className="mt-8 md:mt-20 text-center" data-animate="fade-up">
              <span className="text-black font-semibold text-sm tracking-[0.2em] uppercase block mb-3 md:mb-6">
                Perfect For
              </span>
              <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto" data-animate-group="cards">
                {eventTypes.map((event) => (
                  <span
                    key={event}
                    className="rounded-full border border-primary/20 px-4 py-1.5 text-sm text-black/80"
                  >
                    {event}
                  </span>
                ))}
              </div>
            </div>

            {/* Features & amenities — 3 clusters */}
            <div className="mt-8 md:mt-20" data-animate="fade-up">
              <div className="text-center mb-5 md:mb-10">
                <span className="text-black font-semibold text-sm tracking-[0.2em] uppercase block mb-3">
                  Features &amp; Amenities
                </span>
                <h3 className="font-head text-lg md:text-3xl font-bold text-black">
                  Everything in place for your event
                </h3>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-12">
                {venueAmenityGroups.map((group) => (
                  <div key={group.title}>
                    <h4 className="font-head text-lg font-semibold text-black mb-4">
                      {group.title}
                    </h4>
                    <ul className="space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-3 text-black/80 leading-relaxed">
                          <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-primary/40" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Availability Section - synced to penthouse calendar */}
        <section id="availability" className="events-availability-section py-6 md:py-10 mb-8 md:mb-12" data-animate="fade-up">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-5 md:mb-6" data-animate="fade-up">
              <span className="text-tertiary font-semibold text-sm md:text-base tracking-[0.2em] uppercase block mb-3">
                Availability
              </span>
              <h2 className="font-head text-2xl md:text-4xl lg:text-5xl font-bold text-black leading-tight" data-animate="text">
                Check availability
              </h2>
              <p className="mt-3 md:mt-6 text-black/80 text-sm md:text-xl leading-relaxed max-w-3xl mx-auto">
                Pick a date below to see if the venue is available and the rental price for that day.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <BookingSingleDateCalendar
                value={eventDate}
                blockedDates={blockedDates}
                availabilityStatus={availabilityStatus}
                desktopMonths={2}
                onChange={(nextDate) => setEventDate(nextDate)}
              />

              {eventQuote ? (
                <div className="mt-6 bg-white rounded-[10px] p-6 border border-primary/10 shadow-sm">
                  <h3 className="font-head text-lg md:text-xl font-bold text-black mb-4">
                    {eventQuote.label}
                  </h3>
                  <div className="space-y-2 text-sm md:text-base text-black/80">
                    <div className="flex items-center justify-between gap-4">
                      <span>Venue rental</span>
                      <span className="whitespace-nowrap">
                        {eventQuote.venuePrice.toLocaleString('en-US')} ₪
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Cleaning fee</span>
                      <span className="whitespace-nowrap">
                        {eventQuote.cleaningFee.toLocaleString('en-US')} ₪
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-primary/10 pt-3 text-black">
                      <span className="font-semibold">Total</span>
                      <span className="font-head text-xl font-bold whitespace-nowrap">
                        {eventQuote.total.toLocaleString('en-US')} ₪
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-black/60 text-xs md:text-sm">
                    Prices include place location only for events.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <EventPricing />

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
              <h2 className="font-head text-2xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Create Unforgettable Moments
              </h2>
              <p className="text-white/90 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                Share your guest count, event style, and any kosher requirements, and our team will return with a tailored proposal for your celebration.
              </p>
            </div>

            {isSuccess ? (
              <div className="max-w-2xl mx-auto">
                <div className="events-plan-success bg-white/10 backdrop-blur-sm rounded-3xl p-10 text-center border border-white/20">
                  <div className="inline-block p-4 bg-gradient-to-br from-secondary to-secondary-light rounded-full mb-6">
                    <Calendar className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="font-head text-3xl font-bold text-white mb-4">
                    Thank you for your inquiry!
                  </h3>
                  <p className="text-white/90 text-lg mb-8">
                    Our events team will contact you within 24 hours to discuss your special event.
                  </p>
                  <LiquidGlassButton variant="dark" onClick={() => setIsSuccess(false)}>
                    Plan Another Event
                  </LiquidGlassButton>
                </div>
              </div>
            ) : (
              <>
                <div className="events-plan-cta text-center mb-8">
                  <div className="inline-block relative">
                    <LiquidGlassButton variant="dark" onClick={() => setShowForm(true)}>
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>Inquire About Events</span>
                    </LiquidGlassButton>
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
          className="event-modal tap-reset fixed inset-0 z-50 bg-black/55 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-inquiry-title"
          onClick={() => setShowForm(false)}
        >
          <div
            className="event-form-wrap w-full flex items-start justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="event-form w-full max-w-xl overflow-y-auto rounded-2xl border border-primary/10 bg-white shadow-2xl">
              <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-primary/10 bg-white/95 px-4 py-3 backdrop-blur-sm sm:px-5">
                <div>
                  <h3 id="event-inquiry-title" className="font-head text-2xl font-bold text-black">
                    Event inquiry
                  </h3>
                  <p className="mt-1 text-sm text-black/65">
                    Send the essentials. We&apos;ll reply with a tailored proposal.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setIsDatePickerOpen(false);
                  }}
                  className="tap-reset -mr-1 shrink-0 p-2 text-black/55 transition hover:text-black"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="px-4 py-4 sm:px-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="checkIn" value={eventDate ?? ''} />
                  <input type="hidden" name="contactMethod" value="email" />

                  <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_9rem]">
                    <div>
                      <label
                        htmlFor="eventType"
                        className="mb-1.5 block text-sm font-medium text-black/80"
                      >
                        Event type
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        required
                        className="h-11 w-full rounded-lg border border-primary/15 bg-white px-3 text-sm text-black focus:border-black/15 focus:ring-2 focus:ring-black/10"
                      >
                        <option value="">Select type</option>
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
                        htmlFor="guestCount"
                        className="mb-1.5 block text-sm font-medium text-black/80"
                      >
                        Guests
                      </label>
                      <input
                        type="number"
                        id="guestCount"
                        name="guestCount"
                        required
                        min="1"
                        max="80"
                        className="h-11 w-full rounded-lg border border-primary/15 bg-white px-3 text-sm text-black focus:border-black/15 focus:ring-2 focus:ring-black/10"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="mb-1.5 block text-sm font-medium text-black/80">
                      Event date
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsDatePickerOpen((isOpen) => !isOpen)}
                      className="tap-reset flex w-full items-center justify-between gap-3 rounded-xl border border-primary/15 bg-cream/60 px-4 py-3 text-left transition hover:border-primary/30"
                      aria-expanded={isDatePickerOpen}
                    >
                      <span>
                        <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45">
                          {eventDate ? 'Selected date' : 'Choose date'}
                        </span>
                        <span className="mt-1 block font-head text-lg font-semibold text-black">
                          {eventDate ? formatIsoDate(eventDate) : 'Add event date'}
                        </span>
                      </span>
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform ${isDatePickerOpen ? 'rotate-180' : ''}`}>
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>
                    {isDatePickerOpen ? (
                      <div className="mt-3">
                        <BookingSingleDateCalendar
                          value={eventDate}
                          blockedDates={blockedDates}
                          availabilityStatus={availabilityStatus}
                          onChange={(nextDate) => {
                            setEventDate(nextDate);
                            if (nextDate) {
                              setIsDatePickerOpen(false);
                            }
                          }}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-sm font-medium text-black/80"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="h-11 w-full rounded-lg border border-primary/15 bg-white px-3 text-sm text-black focus:border-black/15 focus:ring-2 focus:ring-black/10"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-sm font-medium text-black/80"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/55" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="h-11 w-full rounded-lg border border-primary/15 bg-white py-2 pl-9 pr-3 text-sm text-black focus:border-black/15 focus:ring-2 focus:ring-black/10"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 block text-sm font-medium text-black/80"
                      >
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/55" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          required
                          className="h-11 w-full rounded-lg border border-primary/15 bg-white py-2 pl-9 pr-3 text-sm text-black focus:border-black/15 focus:ring-2 focus:ring-black/10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-sm font-medium text-black/80"
                    >
                      Note
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      className="w-full rounded-lg border border-primary/15 bg-white px-3 py-2 text-sm text-black focus:border-black/15 focus:ring-2 focus:ring-black/10"
                      placeholder="Kosher needs, timing, setup, or anything we should know..."
                    ></textarea>
                  </div>

                  <div className="sticky bottom-0 -mx-4 -mb-4 flex flex-col-reverse gap-2 border-t border-primary/10 bg-white/95 px-4 py-3 backdrop-blur-sm sm:-mx-5 sm:-mb-4 sm:flex-row">
                    <LiquidGlassButton
                      type="button"
                      variant="dark"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setShowForm(false);
                        setIsDatePickerOpen(false);
                      }}
                    >
                      Cancel
                    </LiquidGlassButton>
                    <LiquidGlassButton
                      type="submit"
                      size="sm"
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send inquiry'}
                    </LiquidGlassButton>
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
          className="fixed bottom-8 right-8 z-40 rounded-full bg-gradient-to-r from-secondary to-secondary-light p-4 text-black shadow-lg"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
