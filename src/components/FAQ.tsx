'use client';

import { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';

import LiquidGlassCTA from '@/components/LiquidGlassCTA';
import { homeFaqEntries } from '@/lib/faq-data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="home-faq-section bg-cream py-12 sm:py-14" data-animate="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="home-faq-shell grid items-start gap-6 rounded-[1.75rem] border border-white/10 bg-primary p-5 shadow-[0_18px_60px_rgba(83,45,36,0.25)] md:grid-cols-[0.82fr_1.18fr] md:p-7 lg:p-8">
          <div className="home-faq-header text-start">
            <h2 className="font-head text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Fast answers before you book
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/80 sm:text-base">
              The key details guests usually check first. The full FAQ keeps every policy and service answer in one place.
            </p>
            <div className="mt-6 text-center">
              <LiquidGlassCTA href="/faq" className="liquid-cta--sm">
                View all questions
                <ArrowUpRight className="h-4 w-4" />
              </LiquidGlassCTA>
            </div>
          </div>

          <div className="home-faq-grid grid gap-2.5" data-animate-group="cards">
            {homeFaqEntries.map((faq, index) => (
              <article
                key={faq.question}
                className="home-faq-item overflow-hidden rounded-2xl border border-white/15 bg-white/10 transition duration-300 hover:border-white/30 hover:bg-white/15"
                data-delay={String((index % 3) + 1)}
              >
                <button
                  type="button"
                  className="tap-reset flex w-full items-center justify-between gap-4 px-4 py-3.5 text-start sm:px-5"
                  onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`home-faq-answer-${index}`}
                >
                  <h3 className="font-head text-base font-bold leading-snug text-white sm:text-lg">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-white transition duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  id={`home-faq-answer-${index}`}
                  className={`overflow-hidden text-sm leading-6 text-white/85 transition-all duration-300 ease-in-out ${
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
