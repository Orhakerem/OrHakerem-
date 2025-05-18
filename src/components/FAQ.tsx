'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>();

  const faqs = [
    {
      question: 'What are the check-in and check-out times?',
      answer:
        'Check-in is available from 3:00 PM, and check-out is until 11:00 AM. Early check-in or late check-out may be available upon request.',
    },
    {
      question: 'Do you offer Shabbat-friendly accommodations?',
      answer:
        'Yes, we provide full Shabbat support including Shabbat keys, hot plates, timers, and can arrange kosher meals upon request.',
    },
    {
      question: 'Is parking available?',
      answer:
        'Yes, secure parking is available for our guests. Please let us know in advance if you need parking during your stay.',
    },
    {
      question: 'What amenities are included?',
      answer:
        'All apartments include fully equipped kitchens, high-speed WiFi, smart TVs, luxury linens, and premium toiletries. Additional amenities vary by apartment.',
    },
    {
      question: 'Do you offer airport transfers?',
      answer:
        'Yes, we can arrange private airport transfers for our guests. Please request this service at least 48 hours before your arrival.',
    },
  ];

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
        <Link
            href="/faq"
            className="text-primary hover:text-[#D8B084] transition-colors duration-300 inline-flex items-center"
          >
          <h2 className="font-playfair text-3xl font-bold text-primary mb-4 transition-colors duration-300 hover:text-[#D8B084]">
            Frequently Asked Questions
          </h2>
     
          </Link>
        </div>
        <div className="grid gap-6 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
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
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
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
