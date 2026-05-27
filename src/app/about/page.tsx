import Image from 'next/image';
import { MapPin, Shield, UtensilsCrossed } from 'lucide-react';

import { createCanonicalUrl } from '@/app/seo';
import LiquidGlassCTA from '@/components/LiquidGlassCTA';
import { HOST } from '@/lib/host';

const valuePoints = [
  {
    icon: MapPin,
    title: 'Prime location',
    description:
      'A short walk from Carmel Market, Banana Beach, Nachalat Binyamin, and the energy of central Tel Aviv.',
  },
  {
    icon: Shield,
    title: 'Jewish-friendly stays',
    description:
      'Our apartments are designed for guests seeking thoughtful, Shabbat-friendly comfort in a refined and well-appointed setting.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Flexible event hosting',
    description:
      'For intimate celebrations and Jewish events, optional kosher services can be arranged with the same attention to detail as the venue itself.',
  },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Or Hakerem',
  url: createCanonicalUrl('/about'),
  description:
    'Boutique luxury stays and intimate event experiences in Kerem HaTeimanim, Tel Aviv, near Carmel Market, Banana Beach, and Nachalat Binyamin.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '35 Hakovshim Street',
    addressLocality: 'Tel Aviv',
    addressCountry: 'IL',
  },
  areaServed: 'Tel Aviv',
  email: 'keremliving@gmail.com',
  telephone: ['+33651179925', '+972526869791'],
  founder: {
    '@type': 'Person',
    name: HOST.name,
    jobTitle: HOST.jobTitle,
    image: `${createCanonicalUrl(HOST.image)}`,
    url: HOST.url,
    sameAs: HOST.sameAs,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-10 md:pb-20" style={{ backgroundColor: '#e8e4dc' }}>
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

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 md:py-20 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <span className="mb-3 md:mb-4 inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
              About Or HaKerem
            </span>
            <h1 className="font-head text-2xl md:text-6xl font-bold leading-tight" data-animate="text">
              About Or HaKerem – Luxury Stays in Tel Aviv
            </h1>
            <p className="mt-3 md:mt-6 max-w-3xl text-sm md:text-lg leading-relaxed text-white/90 md:text-xl">
              Or HaKerem is a boutique collection of luxury short-term stays located in Tel Aviv&apos;s historic Kerem HaTeimanim neighborhood, just minutes from Carmel Market, Banana Beach, and Nachalat Binyamin.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16" data-animate="fade-up">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div className="rounded-3xl bg-white p-5 md:p-10 shadow-xl border border-primary/10">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Our Positioning
            </span>
            <h2 className="mt-2 md:mt-4 font-head text-xl md:text-4xl font-bold text-black">
              A more personal standard of luxury
            </h2>
            <p className="mt-3 md:mt-6 text-sm md:text-lg leading-relaxed text-black/80">
              We offer a unique experience combining modern comfort with the authentic charm of one of Tel Aviv&apos;s most vibrant areas. For travelers seeking luxury apartments in Tel Aviv with both privacy and character, Or HaKerem provides a quieter, more considered alternative to conventional hospitality.
            </p>
            <p className="mt-3 md:mt-5 text-sm md:text-lg leading-relaxed text-black/80">
              Among the boutique stays in Tel Aviv chosen for design, discretion, and location, our approach is deliberately intimate: a smaller collection, a stronger sense of place, and one of the more distinctive unique stays in Tel Aviv for guests who value quality over volume.
            </p>
          </div>

          <div className="rounded-3xl border border-secondary/20 bg-gradient-to-br from-secondary/10 via-white to-white p-5 md:p-10 shadow-lg">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-tertiary">
              Trust & Experience
            </span>
            <h2 className="mt-2 md:mt-4 font-head text-xl md:text-3xl font-bold text-black">
              Hospitality built on repetition and care
            </h2>
            <p className="mt-3 md:mt-6 text-sm md:text-lg leading-relaxed text-black/80">
              Or HaKerem hosts dozens of guests every week across its boutique apartments and event spaces, making it a trusted choice for premium stays in Tel Aviv.
            </p>
            <p className="mt-3 md:mt-5 text-sm md:text-lg leading-relaxed text-black/80">
              That rhythm matters. It means every arrival, every request, and every detail is informed by real hosting experience, consistent guest expectations, and a hospitality standard shaped by repetition rather than promise alone.
            </p>
          </div>
        </div>
      </section>

      <section className="py-4" data-animate="fade-up">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white p-5 md:p-10 shadow-xl border border-primary/10">
            <div className="max-w-3xl">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                What Makes Us Distinct
              </span>
              <h2 className="mt-2 md:mt-4 font-head text-xl md:text-4xl font-bold text-black">
                Designed for guests who value place as much as comfort
              </h2>
            </div>

            <div className="mt-5 md:mt-10 grid gap-3 md:gap-6 md:grid-cols-3">
              {valuePoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-2xl border border-primary/10 bg-cream p-4 md:p-6"
                >
                  <div className="mb-3 md:mb-4 inline-flex rounded-2xl bg-primary/10 p-2.5 md:p-3 text-black">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-head text-lg md:text-2xl font-semibold text-black">
                    {point.title}
                  </h3>
                  <p className="mt-2 md:mt-4 text-sm md:text-base leading-relaxed text-black/75">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 md:mt-8 rounded-2xl border border-secondary/20 bg-secondary/10 px-5 py-4 md:px-6 md:py-5">
              <p className="text-sm md:text-lg leading-relaxed text-black/80">
                Our Kerem HaTeimanim apartments are especially valued by travelers who want a central stay without losing the texture of the neighborhood. Or HaKerem is one of the few boutique properties in Tel Aviv offering Shabbat-friendly accommodations and tailored Jewish event experiences. For guests looking for Shabbat-friendly stays in Tel Aviv, we combine practical support with a calm, premium atmosphere and tailored solutions for Jewish events, including optional kosher services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="host" className="scroll-mt-24 py-8 md:py-16" data-animate="fade-up">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:gap-10 rounded-3xl bg-white p-5 md:p-10 shadow-xl border border-primary/10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div className="relative mx-auto aspect-square w-40 md:w-full overflow-hidden rounded-3xl border border-primary/10 bg-cream">
              <Image
                src={HOST.image}
                alt={HOST.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 40vw, 160px"
              />
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                Meet Your Host
              </span>
              <h2 className="mt-2 md:mt-4 font-head text-xl md:text-4xl font-bold text-black">
                {HOST.name}
              </h2>
              <p className="mt-1 text-sm md:text-base font-semibold uppercase tracking-[0.18em] text-tertiary">
                {HOST.jobTitle}
              </p>
              <p className="mt-3 md:mt-6 text-sm md:text-lg leading-relaxed text-black/80">
                {HOST.bio}
              </p>
              <a
                href={HOST.sameAs[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 md:mt-6 inline-flex items-center text-sm md:text-base font-semibold text-primary underline underline-offset-4 hover:text-primary-light"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-16" data-animate="fade-up">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-tertiary/10 via-white to-white p-5 md:p-10 shadow-lg border border-tertiary/10">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-tertiary">
              Location Story
            </span>
            <h2 className="mt-2 md:mt-4 font-head text-xl md:text-4xl font-bold text-black">
              Rooted in Kerem HaTeimanim
            </h2>
            <p className="mt-3 md:mt-6 text-sm md:text-lg leading-relaxed text-black/80">
              Located in Kerem HaTeimanim, one of Tel Aviv&apos;s oldest neighborhoods, the building blends local heritage with modern luxury.
            </p>
            <p className="mt-3 md:mt-5 text-sm md:text-lg leading-relaxed text-black/80">
              Located in the heart of Kerem HaTeimanim, just minutes from Carmel Market and the beach, Or HaKerem offers a unique local experience in Tel Aviv, with easy access to Banana Beach and the character of Nachalat Binyamin.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 md:p-10 shadow-xl border border-primary/10">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Why Guests Choose Us
            </span>
            <h2 className="mt-2 md:mt-4 font-head text-xl md:text-4xl font-bold text-black">
              Premium stays with context and consistency
            </h2>
            <p className="mt-3 md:mt-6 text-sm md:text-lg leading-relaxed text-black/80">
              We are not simply offering a place to sleep. We are offering a more complete way to stay in Tel Aviv: central, design-led, neighborhood-rooted, and supported by responsive hosting.
            </p>
            <p className="mt-3 md:mt-5 text-sm md:text-lg leading-relaxed text-black/80">
              Whether a guest is booking a short urban escape, a longer stay near the beach, or a private celebration, the goal remains the same: to deliver one of the more polished boutique stays in Tel Aviv for guests seeking comfort, credibility, and a quietly memorable local experience. Whether you are visiting Tel Aviv for a short stay or planning a private event, Or HaKerem offers a unique and elevated experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-4" data-animate="fade-up">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-light px-5 py-7 md:px-12 md:py-10 text-center text-white shadow-2xl">
            <div className="mx-auto max-w-3xl">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                Explore Or HaKerem
              </span>
              <h2 className="mt-3 md:mt-5 font-head text-xl md:text-4xl font-bold">
                Discover the properties and the neighborhood behind them
              </h2>
              <p className="mt-3 md:mt-5 text-sm md:text-lg leading-relaxed text-white/85">
                See our apartments, learn more about the stay experience, or get in touch for a tailored recommendation.
              </p>
            </div>

            <div className="mt-5 md:mt-8 flex flex-col items-center justify-center gap-3 md:gap-4 sm:flex-row">
              <LiquidGlassCTA href="/properties" className="liquid-cta--sm">
                View Properties
              </LiquidGlassCTA>
              <LiquidGlassCTA href="/#contact" className="liquid-cta--sm">
                Contact Us
              </LiquidGlassCTA>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
