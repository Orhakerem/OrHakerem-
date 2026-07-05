'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp, FileText, Printer } from 'lucide-react';

import { createCanonicalUrl } from '@/app/seo';

const standardCancellationPolicy = [
  {
    title: 'More than 30 days before check-in',
    body: 'A 30% deposit will be charged.',
  },
  {
    title: '15 to 30 days before check-in',
    body: '30% of the total reservation amount will be charged and is non-refundable.',
  },
  {
    title: '7 to 15 days before check-in',
    body: '50% of the total reservation amount will be charged and is non-refundable.',
  },
  {
    title: 'Less than 7 days before check-in, no-show, or early departure',
    body: '100% of the reservation amount will be charged and is non-refundable.',
  },
];

const nonRefundableSituations = [
  'Theft or loss of personal belongings',
  'Noise from neighbors, renovations, or construction',
  'Building maintenance or cleanliness in shared areas',
  'Insects, pests, or natural hazards',
  'Internet issues not due to internal mismanagement',
  'Event cancellations or postponements',
  'Flight cancellations or general geopolitical instability without official restrictions',
];

const voucherPolicy = [
  'Guests will receive a non-refundable, non-transferable voucher equal to the amount paid',
  'Voucher is valid for 12 months from the original check-in date',
  'No cash refunds will be issued under these conditions',
];

const paymentSchedule = [
  '30% deposit at time of booking',
  '20% due 15 days before arrival',
  '50% due 7 days before arrival',
  'Security deposit authorization taken 1 day before arrival, released 5 days after checkout',
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Cancellation & Refund Policy',
  url: createCanonicalUrl('/cancellation'),
  description:
    'Or Hakerem cancellation and refund policy for short-term stays in Tel Aviv, including deposit schedules, non-refundable conditions, and voucher terms.',
};

export default function CancellationPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderBulletList = (items: string[]) => (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start text-black/80 leading-relaxed">
          <span className="mt-2 me-3 h-2 w-2 flex-shrink-0 rounded-full bg-secondary"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-end" data-animate="fade-left">
          <button
            onClick={handlePrint}
            className="inline-flex items-center rounded-full border border-primary/15 bg-white px-4 py-2 font-semibold text-black shadow-sm transition-all duration-300"
          >
            <Printer className="me-2 h-4 w-4" />
            Print
          </button>
        </div>

        <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-xl md:p-12" data-animate="fade-up">
          <div className="mb-12 text-center" data-animate="fade-up">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-head text-4xl font-bold text-black md:text-5xl" data-animate="text">
              Cancellation &amp; Refund Policy
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-black/75">
              Please review the cancellation, refund, payment, and voucher terms that apply to direct
              bookings at Or Hakerem.
            </p>
          </div>

          <section className="mb-10" data-animate="fade-up" data-delay="1">
            <h2 className="font-head text-3xl font-bold text-black">Standard Cancellation Policy</h2>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

            <div className="mt-8 rounded-2xl border border-primary/10 bg-cream/50 p-6 md:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                {standardCancellationPolicy.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-primary/10 bg-white p-5">
                    <h3 className="font-semibold text-black">{item.title}</h3>
                    <p className="mt-2 text-black/75 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-10" data-animate="fade-up" data-delay="2">
            <h2 className="font-head text-3xl font-bold text-black">Non-Refundable Situations</h2>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

            <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
              <p className="text-black/75 leading-relaxed">
                Refunds will not be provided for events beyond the company&apos;s control, including
                (but not limited to):
              </p>
              <div className="mt-5">{renderBulletList(nonRefundableSituations)}</div>
            </div>
          </section>

          <section className="mb-10" data-animate="fade-up" data-delay="3">
            <h2 className="font-head text-3xl font-bold text-black">
              Geopolitical Events &amp; Flight Disruptions – Voucher Policy
            </h2>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

            <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
              <p className="text-black/75 leading-relaxed">
                In cases of official travel bans, airport closures, or flight suspensions declared by
                authorities:
              </p>
              <div className="mt-5">{renderBulletList(voucherPolicy)}</div>
            </div>
          </section>

          <section data-animate="fade-up">
            <h2 className="font-head text-3xl font-bold text-black">Payment Schedule</h2>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

            <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
              <div className="rounded-2xl border border-secondary/20 bg-cream p-6">
                <h3 className="font-head text-2xl font-semibold text-black">Payment Schedule (Direct Bookings)</h3>
                <div className="mt-5">{renderBulletList(paymentSchedule)}</div>
              </div>

              <p className="mt-6 text-black/80 leading-relaxed">
                The company reserves the right to cancel or relocate reservations not fully paid before arrival.
              </p>
            </div>
          </section>
        </div>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 rounded-full bg-gradient-to-r from-secondary to-secondary-light p-4 text-black shadow-lg transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}
