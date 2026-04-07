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
            className="text-primary hover:text-[#D8B084] transition-colors duration-300 inline-flex items-center"
          >
          <h2 className="font-playfair text-3xl font-bold text-primary mb-4 transition-colors duration-300 hover:text-[#D8B084]" data-animate="text">
            Frequently Asked Questions
          </h2>
     
          </Link>
        </div>
        <div className="home-faq-grid grid gap-6 max-w-3xl mx-auto" data-animate-group="cards">
          {homeFaqEntries.map((faq, index) => (
            <div
              key={index}
              className="home-faq-item group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              data-delay={String((index % 3) + 1)}
              onClick={() => setOpenIndex(openIndex === index ? undefined : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-playfair text-xl font-bold text-primary transition-colors duration-300 hover:text-[#D8B084] group-hover:text-[#D8B084]">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-primary transition-colors duration-300 hover:text-[#D8B084] group-hover:text-[#D8B084]" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-primary transition-colors duration-300 hover:text-[#D8B084] group-hover:text-[#D8B084]" />
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
