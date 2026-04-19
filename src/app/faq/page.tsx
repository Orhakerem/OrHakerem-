'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

import { faqEntries } from '@/lib/faq-data';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number>();

  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Back Navigation */}
        <div className="mb-8" data-animate="fade-right">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-primary/20 bg-white/80 px-6 py-3 text-lg font-semibold text-primary shadow-lg transition-all duration-300"
          >
            <div className="relative mr-3">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <Home className="w-5 h-5 mr-2 opacity-70" />
            <span className="relative z-10">Back to Home</span>
          </Link>
        </div>

        <h1 className="text-center font-playfair text-4xl font-bold text-primary mb-12" data-animate="text">
          Frequently Asked Questions – Or HaKerem
        </h1>

        <div className="grid gap-6 max-w-3xl mx-auto" data-animate-group="cards">
          {faqEntries.map((faq, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-lg bg-white p-6 shadow-md"
              data-delay={String((index % 3) + 1)}
              onClick={() => setOpenIndex(openIndex === index ? undefined : index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-playfair text-xl font-bold text-primary">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-primary" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-primary" />
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
    </div>
  );
}
