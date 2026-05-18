'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronDown, CircleHelp } from 'lucide-react';

import LiquidGlassCTA from '@/components/LiquidGlassCTA';
import { homeFaqEntries } from '@/lib/faq-data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="home-faq-section bg-cream py-12 sm:py-14" data-animate="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="home-faq-shell grid items-start gap-6 rounded-[1.75rem] border border-primary/10 bg-white/80 p-5 shadow-[0_18px_60px_rgba(83,45,36,0.09)] backdrop-blur md:grid-cols-[0.82fr_1.18fr] md:p-7 lg:p-8">
          <div className="home-faq-header text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
              <CircleHelp className="h-4 w-4" />
              Guest notes
            </div>
            <h2 className="font-playfair text-3xl font-bold leading-tight text-primary sm:text-4xl">
              Fast answers before you book
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-primary/70 sm:text-base">
              The key details guests usually check first. The full FAQ keeps every policy and service answer in one place.
            </p>
            <div className="mt-5">
              <LiquidGlassCTA href="/faq">
                View all questions
                <ArrowUpRight className="h-4 w-4" />
              </LiquidGlassCTA>
            </div>
          </div>

          <div className="home-faq-grid grid gap-2.5" data-animate-group="cards">
            {homeFaqEntries.map((faq, index) => (
              <article
                key={faq.question}
                className="home-faq-item overflow-hidden rounded-2xl border border-primary/10 bg-cream/70 transition duration-300 hover:border-primary/25 hover:bg-white"
                data-delay={String((index % 3) + 1)}
              >
                <button
                  type="button"
                  className="tap-reset flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left sm:px-5"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`home-faq-answer-${index}`}
                >
                  <h3 className="font-playfair text-base font-bold leading-snug text-primary sm:text-lg">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={`home-faq-answer-${index}`}
                  className={`overflow-hidden text-sm leading-6 text-primary/75 transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-4 pb-4 sm:px-5">
                    {faq.answer}
                  </div>
                </div>
              </article>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
