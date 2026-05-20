'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

import { homeFaqEntries } from '@/lib/faq-data';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>();

  return (
    <section className="home-faq-section py-20 bg-cream" data-animate="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="home-faq-header text-center mb-12">
        <Link
            href="/faq"
            className="inline-flex items-center text-primary"
          >
          <h2 className="mb-4 font-playfair text-3xl font-bold text-primary" data-animate="text">
            Frequently Asked Questions
          </h2>
     
          </Link>
        </div>
        <div className="home-faq-grid grid gap-6 max-w-3xl mx-auto" data-animate-group="cards">
          {homeFaqEntries.map((faq, index) => (
            <div
              key={index}
              className="home-faq-item rounded-lg bg-white shadow-md"
              data-delay={String((index % 3) + 1)}
            >
              <button
                type="button"
                className="tap-reset flex w-full items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(openIndex === index ? undefined : index)}
                aria-expanded={openIndex === index}
                aria-controls={`home-faq-answer-${index}`}
              >
                <h3 className="font-playfair text-xl font-bold text-primary">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-primary" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-primary" />
                )}
              </button>
              <div
                id={`home-faq-answer-${index}`}
                className={`overflow-hidden text-primary/80 transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
