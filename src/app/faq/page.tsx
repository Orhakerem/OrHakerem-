'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronDown, MessageCircle } from 'lucide-react';

import LiquidGlassCTA from '@/components/LiquidGlassCTA';
import { faqCategories, faqEntries } from '@/lib/faq-data';

const categoryIntros: Record<(typeof faqCategories)[number], string> = {
  Location: 'Neighborhood, beach, market, and central Tel Aviv access.',
  Stay: 'Apartment standards, parking, amenities, and house rules.',
  Booking: 'Check-in, payments, policies, and direct reservation details.',
  Services: 'Guest support, transfers, Shabbat setup, and cleaning.',
};

const indexedFaqEntries = faqEntries.map((faq, index) => ({ ...faq, index }));
const groupedFaqEntries = faqCategories.map((category) => ({
  category,
  entries: indexedFaqEntries.filter((faq) => faq.category === category),
}));

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <main className="faq-page min-h-screen bg-cream pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-end gap-4">
          <LiquidGlassCTA
            href="/#contact"
            className="z-[1601] px-4 py-2.5 text-sm font-semibold tracking-normal text-primary shadow-[0_12px_32px_rgba(165,56,43,0.14)]"
          >
            Ask directly
            <ArrowUpRight className="h-4 w-4" />
          </LiquidGlassCTA>
        </div>

        <section className="faq-hero mb-10 overflow-hidden rounded-[2rem] border border-primary/10 bg-white/90 p-6 shadow-[0_24px_80px_rgba(83,45,36,0.1)] sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-end">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                <MessageCircle className="h-4 w-4" />
                Reviewed guest information
              </div>
              <h1 className="max-w-3xl font-playfair text-4xl font-bold leading-tight text-primary sm:text-5xl">
                Frequently asked questions for Or HaKerem
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-primary/70 sm:text-lg">
                Practical answers for planning a stay in Kerem HaTeimanim, from location and arrival details to payment, Shabbat support, cleaning, and cancellation terms.
              </p>
            </div>

            <div className="grid gap-3 rounded-2xl bg-cream/80 p-4 text-primary">
              <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                <span className="text-sm text-primary/60">Total answers</span>
                <span className="font-playfair text-3xl font-bold">{faqEntries.length}</span>
              </div>
              <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                <span className="text-sm text-primary/60">Categories</span>
                <span className="font-playfair text-3xl font-bold">{faqCategories.length}</span>
              </div>
              <div className="text-sm leading-6 text-primary/70">
                Need something specific? The contact team can confirm availability, services, or special arrangements before you book.
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[17rem_1fr] lg:items-start">
          <aside className="faq-sidebar lg:sticky lg:top-28" data-animate="fade-right">
            <nav className="rounded-2xl border border-primary/10 bg-white/80 p-3 shadow-[0_14px_45px_rgba(83,45,36,0.07)]">
              {groupedFaqEntries.map(({ category, entries }) => (
                <a
                  key={category}
                  href={`#faq-${category.toLowerCase()}`}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-primary transition duration-300 hover:bg-primary/10"
                >
                  {category}
                  <span className="rounded-full bg-cream px-2.5 py-1 text-xs text-primary/60">
                    {entries.length}
                  </span>
                </a>
              ))}
            </nav>
          </aside>

          <div className="grid gap-6" data-animate-group="cards">
            {groupedFaqEntries.map(({ category, entries }, categoryIndex) => (
              <section
                key={category}
                id={`faq-${category.toLowerCase()}`}
                className="faq-category rounded-[1.75rem] border border-primary/10 bg-white/90 p-4 shadow-[0_18px_60px_rgba(83,45,36,0.08)] sm:p-6"
                data-delay={String((categoryIndex % 3) + 1)}
              >
                <div className="mb-4 border-b border-primary/10 pb-4 sm:flex sm:items-end sm:justify-between sm:gap-6">
                  <div>
                    <p className="mb-2 text-sm font-semibold text-primary/60">FAQ / {category}</p>
                    <h2 className="font-playfair text-2xl font-bold text-primary sm:text-3xl">
                      {category}
                    </h2>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-6 text-primary/60 sm:mt-0 sm:text-right">
                    {categoryIntros[category]}
                  </p>
                </div>

                <div className="grid gap-3">
                  {entries.map((faq) => (
                    <article
                      key={faq.question}
                      className="overflow-hidden rounded-2xl border border-primary/10 bg-cream/60 transition duration-300 hover:border-primary/25 hover:bg-white"
                    >
                      <button
                        type="button"
                        className="tap-reset flex w-full items-center justify-between gap-5 px-4 py-4 text-left sm:px-5"
                        onClick={() => setOpenIndex(openIndex === faq.index ? -1 : faq.index)}
                        aria-expanded={openIndex === faq.index}
                        aria-controls={`faq-answer-${faq.index}`}
                      >
                        <h3 className="font-playfair text-lg font-bold leading-snug text-primary sm:text-xl">
                          {faq.question}
                        </h3>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-primary transition duration-300 ${
                            openIndex === faq.index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div
                        id={`faq-answer-${faq.index}`}
                        className={`overflow-hidden text-primary/80 transition-all duration-300 ease-in-out ${
                          openIndex === faq.index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-4 pb-5 text-sm leading-7 sm:px-5 sm:text-base">
                          {faq.answer}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
