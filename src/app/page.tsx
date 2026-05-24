import FAQ from '@/components/FAQ';
import HeroAnimatedTitle from '@/components/HeroAnimatedTitle';
import LiquidGlassCTA from '@/components/LiquidGlassCTA';
import HomeContactForm from '@/components/HomeContactForm';
import { ContactCard } from '@/components/ContactCard';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background - No Margin Top */}
      <div className="hero-home relative w-full h-screen overflow-hidden">
        <div className="hero-home-media absolute inset-0">
          {/* Video Background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-home-video absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-home-overlay absolute inset-0"></div>
          {/* Fallback for browsers that don't support video */}
          <div className="hero-home-fallback absolute inset-0 bg-primary"></div>
        </div>

        {/* Desktop / large tablet overlay */}
        <div className="hero-title hero-home-title">
          <HeroAnimatedTitle />
        </div>

        <div className="glass-cta-wrap hero-home-cta-wrap">
          <LiquidGlassCTA href="/properties">View Properties</LiquidGlassCTA>
        </div>
      </div>

      {/* Welcome Section */}
      <section className="py-8 md:py-16 bg-cream relative overflow-hidden rounded-3xl mx-4">
        <div className="absolute inset-0">
          <div className="absolute top-6 left-6 w-16 h-16 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-6 right-6 w-20 h-20 bg-tertiary/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(152px,1fr)] items-center gap-4 sm:gap-8 lg:gap-16">
            <div className="min-w-0 text-left">
              <div className="mb-2 sm:mb-6">
                <h2 className="font-head text-2xl md:text-5xl lg:text-6xl font-bold text-black leading-tight mb-3 md:mb-6">
                  Welcome
                </h2>
              </div>

              {/* Mobile: concise version, height ≈ video */}
              <div className="block sm:hidden max-w-3xl text-sm leading-relaxed">
                <p className="text-black/90 font-light font-body">
                  Premium apartments for short-term stays in the heart of Tel Aviv — Kerem HaTeimanim, near Carmel Market and the beach. Carefully designed, comfortable spaces for a flexible, elevated stay.
                </p>
              </div>

              {/* Desktop: full version */}
              <div className="hidden sm:block max-w-3xl space-y-6 text-lg md:text-xl">
                <p className="text-black/90 leading-relaxed font-light font-body">
                  Or Hakerem is a unique building offering premium apartments for short-term stays in the heart of Tel Aviv.
                </p>

                <p className="text-black/80 leading-relaxed font-light font-body">
                  Located in Kerem HaTeimanim, near Carmel Market and within walking distance to the beach, the property places you right in the center of it all — just moments from Banana Beach, Nachalat Binyamin, and the vibrant energy of the city.
                </p>

                <p className="text-black/85 leading-relaxed font-light font-body">
                  Each apartment comes in a different format, designed to suit everything from short city stays to family trips, private gatherings, and special events. What they all share is the same standard: carefully designed spaces, comfort, and a location that makes everything feel easy.
                </p>

                <p className="text-black/85 leading-relaxed font-light font-body">
                  Whether you’re coming for a few days by the sea or planning a more private moment, Or Hakerem offers a flexible and elevated way to experience Tel Aviv.
                </p>
              </div>
            </div>

            <div className="relative min-h-[170px] sm:min-h-[440px] lg:min-h-[620px] overflow-hidden rounded-md border border-primary/10 shadow-2xl" data-animate="slide-in-right">
              <video
                src="/jacuzzi-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Jacuzzi at Or Hakerem"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* White Separator */}
      <div className="home-section-divider h-12 bg-white"></div>

      {/* Location Section */}
      <section className="home-location-section py-16 bg-primary relative overflow-hidden rounded-3xl mx-4">
        <div className="absolute inset-0">
          <div className="absolute top-6 left-6 w-16 h-16 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-6 right-6 w-20 h-20 bg-tertiary/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
            <div className="w-full rounded-[5px] overflow-hidden shadow-xl border border-primary/10 order-2 lg:order-1" data-animate="zoom">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.969106191464!2d34.76409907581854!3d32.07008431977721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4c843acd13ab%3A0xb4aff2902a9ec6dd!2sHaKovshim%2035%2C%20Tel%20Aviv-Jaffa!5e0!3m2!1sfr!2sil!4v1771934464053!5m2!1sfr!2sil"
                width="100%"
                height="450"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title="Or Hakerem Location - 35 Hakovshim Street, Tel Aviv"
              ></iframe>
            </div>

            <div className="order-1 lg:order-2">
              <div className="home-location-header mb-6" data-animate="fade-up">
                <span className="text-secondary font-semibold text-lg tracking-[0.2em] uppercase block mb-3">
                  Our Location
                </span>
                <h2 className="font-head text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" data-animate="text" data-delay="1">
                  At the Heart of Tel Aviv
                </h2>
              </div>

              <div className="home-location-content w-full" data-animate="fade-up" data-delay="2">
                <p className="text-white/90 text-lg md:text-xl leading-relaxed font-light mb-8 hidden lg:block">
                  Our building is located at <span className="font-medium text-secondary">35 Hakovshim Street</span>, in Kerem HaTeimanim, just steps from the beach and near Carmel Market for guests who want a central, walkable stay in Tel Aviv.
                </p>

                <div className="text-center hidden lg:block" data-animate="scale" data-delay="3">
                  <LiquidGlassCTA
                    href="https://www.google.com/maps?q=Hakovshim+35+Tel+Aviv"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </LiquidGlassCTA>
                </div>
              </div>
            </div>

            {/* Responsive-only CTA: appears under the map (<lg) */}
            <div className="order-last text-center lg:hidden" data-animate="scale" data-delay="3">
              <LiquidGlassCTA
                href="https://www.google.com/maps?q=Hakovshim+35+Tel+Aviv"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </LiquidGlassCTA>
            </div>
          </div>
        </div>
      </section>

     {/* White Separator */}
      <div className="home-section-divider h-12 bg-white"></div>

      {/* Contact Section */}
      <section id="contact" className="home-contact-section py-16 bg-cream relative overflow-hidden mx-4" data-animate="fade-up">
        <div className="max-w-6xl mx-auto px-3 md:px-4 relative z-10">
          <div className="text-center mb-10" data-animate="fade-up">
            <h2 className="font-head text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight" data-animate="text" data-delay="1">
              Contact Us
            </h2>
          </div>
          <ContactCard
            description="Have questions about our properties, events, or concierge services?"
            contactInfo={[
              {
                icon: Mail,
                label: 'Email',
                value: 'keremliving@gmail.com',
                href: 'mailto:keremliving@gmail.com',
              },
              {
                icon: Phone,
                label: 'Phone & WhatsApp',
                value: '+33 6 51 17 99 25 · +972 52 686 9791',
                href: 'tel:+33651179925',
              },
              {
                icon: Instagram,
                label: 'Instagram',
                value: '@or_hakerem',
                href: 'https://www.instagram.com/or_hakerem/',
              },
              {
                icon: Facebook,
                label: 'Facebook',
                value: 'Or Hakerem',
                href: 'https://www.facebook.com/profile.php?id=61583829025542',
              },
            ]}
          >
            <HomeContactForm theme="light" />
          </ContactCard>
        </div>
      </section>

         {/* White Separator */}
      <div className="home-section-divider h-12 bg-white"></div>

      {/* Testimonials Carousel */}
      <div data-animate="fade-up">
        <TestimonialsCarousel />
      </div>

      {/* FAQ Section */}
      <div data-animate="fade-up">
        <FAQ />
      </div>
    </div>
  );
}
