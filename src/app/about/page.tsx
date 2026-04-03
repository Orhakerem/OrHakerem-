import Link from 'next/link';
import { ArrowRight, Home, MapPin, MoonStar, UtensilsCrossed } from 'lucide-react';

import { createCanonicalUrl } from '@/app/seo';

const valuePoints = [
  {
    icon: MapPin,
    title: 'Prime location',
    description:
      'A short walk from Carmel Market, Banana Beach, Nachalat Binyamin, and the energy of central Tel Aviv.',
  },
  {
    icon: MoonStar,
    title: 'Jewish-friendly stays',
    description:
      'Our apartments are designed to support guests looking for thoughtful, Shabbat-compatible comfort in a refined setting.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Flexible event hosting',
    description:
      'For private gatherings and celebrations, optional kosher services can be arranged with the same attention to detail as the venue itself.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Or Hakerem',
  url: createCanonicalUrl('/about'),
  description:
    'Boutique luxury short-term rentals and intimate event experiences in Kerem HaTeimanim, Tel Aviv.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '35 Hakovshim Street',
    addressLocality: 'Tel Aviv',
    addressCountry: 'IL',
  },
  areaServed: 'Tel Aviv',
  email: 'keremliving@gmail.com',
  telephone: ['+33651179925', '+972526869791'],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section
        className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-primary text-white"
        data-animate="fade-up"
      >
        <div className="absolute inset-0">
          <div className="absolute left-10 top-16 h-32 w-32 rounded-full bg-secondary/15 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-tertiary/15 blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="mb-4 inline-flex items-center rounded-full bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
              About Or HaKerem
            </span>
            <h1 className="font-playfair text-4xl font-bold leading-tight md:text-6xl" data-animate="text">
              About Or HaKerem – Luxury Rentals in Tel Aviv
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
              Or HaKerem is a boutique collection of luxury short-term rentals located in Tel Aviv&apos;s historic Kerem HaTeimanim neighborhood.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16" data-animate="fade-up">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-xl border border-primary/10 md:p-10">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Our Positioning
            </span>
            <h2 className="mt-4 font-playfair text-3xl font-bold text-primary md:text-4xl">
              A more personal standard of luxury
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary/80">
              We offer a unique experience combining modern comfort with the authentic charm of one of Tel Aviv&apos;s most vibrant areas. For guests seeking luxury apartments Tel Aviv can offer with both privacy and character, Or HaKerem provides a quieter, more considered alternative to conventional hospitality.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-primary/80">
              Among the boutique rentals Tel Aviv travelers choose for design, discretion, and location, our approach is deliberately intimate: a smaller collection, a stronger sense of place, and a stay shaped around quality rather than volume.
            </p>
          </div>

          <div className="rounded-3xl border border-secondary/20 bg-gradient-to-br from-secondary/10 via-white to-white p-8 shadow-lg md:p-10">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-tertiary">
              Trust & Experience
            </span>
            <h2 className="mt-4 font-playfair text-3xl font-bold text-primary">
              Hospitality built on repetition and care
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary/80">
              Or HaKerem hosts dozens of guests every week and specializes in providing high-end short-term stays and boutique event experiences.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-primary/80">
              That rhythm matters. It means every arrival, every request, and every detail is informed by real hosting experience rather than promise alone.
            </p>
          </div>
        </div>
      </section>

      <section className="py-4" data-animate="fade-up">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-8 shadow-xl border border-primary/10 md:p-10">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                What Makes Us Distinct
              </span>
              <h2 className="mt-4 font-playfair text-3xl font-bold text-primary md:text-4xl">
                Designed for guests who value place as much as comfort
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {valuePoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-2xl border border-primary/10 bg-cream p-6 transition-all duration-300 hover:border-secondary/30 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold text-primary">
                    {point.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-primary/75">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-secondary/20 bg-secondary/10 px-6 py-5">
              <p className="text-lg leading-relaxed text-primary/80">
                Our Kerem HaTeimanim apartments are especially valued by travelers who want a central stay without losing the texture of the neighborhood. For guests looking for Shabbat friendly rentals Tel Aviv visitors can trust, we combine practical support with a calm, premium atmosphere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16" data-animate="fade-up">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-tertiary/10 via-white to-white p-8 shadow-lg border border-tertiary/10 md:p-10">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-tertiary">
              Location Story
            </span>
            <h2 className="mt-4 font-playfair text-3xl font-bold text-primary md:text-4xl">
              Rooted in Kerem HaTeimanim
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary/80">
              Located in Kerem HaTeimanim, one of Tel Aviv&apos;s oldest neighborhoods, the building blends local heritage with modern luxury.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-primary/80">
              The setting is part of the experience: historic streets, a distinctly local rhythm, and immediate access to the city&apos;s coastline, market culture, and creative center.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl border border-primary/10 md:p-10">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Why Guests Choose Us
            </span>
            <h2 className="mt-4 font-playfair text-3xl font-bold text-primary md:text-4xl">
              Premium stays with context and consistency
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-primary/80">
              We are not simply offering a place to sleep. We are offering a more complete way to stay in Tel Aviv: central, design-led, neighborhood-rooted, and supported by responsive hosting.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-primary/80">
              Whether a guest is booking a short urban escape, a longer stay near the beach, or a private celebration, the goal remains the same: a stay that feels polished, local, and quietly memorable.
            </p>
          </div>
        </div>
      </section>

      <section className="py-4" data-animate="fade-up">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-light px-8 py-10 text-center text-white shadow-2xl md:px-12">
            <div className="mx-auto max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                Explore Or HaKerem
              </span>
              <h2 className="mt-5 font-playfair text-3xl font-bold md:text-4xl">
                Discover the properties and the neighborhood behind them
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/85">
                See our apartments, learn more about the stay experience, or get in touch for a tailored recommendation.
              </p>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/properties"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-secondary to-secondary-light px-8 py-4 font-semibold text-primary transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                View Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/15"
              >
                Contact Us
                <Home className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
