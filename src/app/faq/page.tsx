'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

export default function FAQPage() {
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
    {
      question: 'What is your cancellation policy?',
      answer:
        'We offer flexible cancellation policies. Full refunds are available for cancellations made at least 7 days before check-in. Please check your specific booking for detailed cancellation terms.',
    },
    {
      question: 'Are pets allowed?',
      answer:
        'Unfortunately, we do not allow pets in our properties to ensure the comfort of all our guests.',
    },
    {
      question: 'Is there a minimum stay requirement?',
      answer:
        'Yes, we typically require a minimum stay of 2 nights. However, this may vary depending on the season and availability.',
    },
    {
      question: 'Do you provide cleaning services?',
      answer:
        'Yes, we offer regular cleaning services during your stay. Additional cleaning can be arranged upon request for an extra fee.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards, PayPal, and bank transfers. Payment details will be provided during the booking process.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Back Navigation */}
        <div className="mb-8">
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
              
              {/* Decorative elements */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-1 left-1 w-2 h-2 bg-tertiary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>

        <h1 className="text-center font-playfair text-4xl font-bold text-primary mb-12">
          Frequently Asked Questions
        </h1>

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
    </div>
  );
}