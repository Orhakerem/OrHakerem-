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
            className="inline-flex items-center text-primary transition-opacity duration-300 hover:opacity-80"
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
              className="home-faq-item group cursor-pointer rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
              data-delay={String((index % 3) + 1)}
              onClick={() => setOpenIndex(openIndex === index ? undefined : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-playfair text-xl font-bold text-primary transition-opacity duration-300 group-hover:opacity-80">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-primary transition-opacity duration-300 group-hover:opacity-80" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-primary transition-opacity duration-300 group-hover:opacity-80" />
                )}
              </div>
              <div
                className={`mt-4 text-primary/80 transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
