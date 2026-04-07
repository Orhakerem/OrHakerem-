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
          <div className="inline-block relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Link
              href="/"
              className="relative inline-flex items-center bg-white/80 backdrop-blur-sm text-primary px-6 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-primary/20"
            >
              <div className="relative mr-3">
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <div className="absolute inset-0 bg-secondary/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
              </div>
              <Home className="w-5 h-5 mr-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Back to Home</span>
            </Link>
          </div>
        </div>

        <h1 className="text-center font-playfair text-4xl font-bold text-primary mb-12" data-animate="text">
          Frequently Asked Questions – Or HaKerem
        </h1>

        <div className="grid gap-6 max-w-3xl mx-auto" data-animate-group="cards">
          {faqEntries.map((faq, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
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
    </div>
  );
}
