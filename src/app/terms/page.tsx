'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp, FileText, Printer } from 'lucide-react';

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

const guestResponsibilities = [
  'Present a valid passport and entry visa upon check-in',
  'Take full responsibility for any damage caused during the stay',
  'Turn off all lights, A/C, and appliances when leaving the property',
  'Refrain from smoking, hosting events, or bringing animals',
  'Use the property respectfully and responsibly',
  'Follow local noise regulations and respect the neighbors',
  'Immediately report any damage, malfunction, or issue to us',
];

const companyResponsibilities = [
  'Ensuring the property is professionally cleaned prior to arrival',
  'Providing linens and towels appropriate for the number of registered guests',
  'Responding to maintenance issues in a timely manner',
  'Relocating the guest to a similar or superior property, or offering a refund, if the property becomes uninhabitable',
  'Cancelling a booking in cases where guest behavior or unpaid balances may pose a risk to the property or company',
];

const companyLimitations = [
  'Theft or damage to personal belongings',
  'Noise or disruptions from the building or surroundings',
  'Insects, pests, or environmental disturbances',
  'Events beyond its control (force majeure or third-party disruptions)',
  'Cancellations or changes to third-party events that motivated the stay',
];

const insuranceCoverage = [
  'Trip cancellation',
  'Medical emergencies',
  'Flight disruptions',
  'Force majeure and geopolitical risks',
];

export default function TermsPage() {
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
        <li key={item} className="flex items-start text-primary/80 leading-relaxed">
          <span className="mt-2 mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-secondary"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-end" data-animate="fade-left">
          <button
            onClick={handlePrint}
            className="inline-flex items-center rounded-full border border-primary/15 bg-white px-4 py-2 font-semibold text-primary shadow-sm transition-all duration-300"
          >
            <Printer className="mr-2 h-4 w-4" />
            Print
          </button>
        </div>

        <div className="rounded-3xl border border-primary/10 bg-white p-8 shadow-xl md:p-12" data-animate="fade-up">
          <div className="mb-12 text-center" data-animate="fade-up">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-playfair text-4xl font-bold text-primary md:text-5xl" data-animate="text">
              Terms &amp; Conditions
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-primary/75">
              Please review the following booking, payment, stay, and responsibility terms for Or Hakerem.
            </p>
          </div>

          <section className="mb-10" data-animate="fade-up" data-delay="1">
            <h2 className="font-playfair text-3xl font-bold text-primary">1. Cancellation &amp; Refund Policy</h2>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

            <div className="mt-8 rounded-2xl border border-primary/10 bg-cream/50 p-6 md:p-8">
              <h3 className="font-playfair text-2xl font-semibold text-primary">1.1 Standard Cancellation Policy</h3>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {standardCancellationPolicy.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-primary/10 bg-white p-5">
                    <h4 className="font-semibold text-primary">{item.title}</h4>
                    <p className="mt-2 text-primary/75 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-primary/10 bg-white p-6">
                <h3 className="font-playfair text-2xl font-semibold text-primary">1.2 Non-Refundable Situations</h3>
                <p className="mt-4 text-primary/75 leading-relaxed">
                  Refunds will not be provided for events beyond the company&apos;s control, including
                  (but not limited to):
                </p>
                <div className="mt-5">{renderBulletList(nonRefundableSituations)}</div>
              </div>

              <div className="rounded-2xl border border-primary/10 bg-white p-6">
                <h3 className="font-playfair text-2xl font-semibold text-primary">
                  1.3 Geopolitical Events &amp; Flight Disruptions – Voucher Policy
                </h3>
                <p className="mt-4 text-primary/75 leading-relaxed">
                  In cases of official travel bans, airport closures, or flight suspensions declared by authorities:
                </p>
                <div className="mt-5">{renderBulletList(voucherPolicy)}</div>
              </div>
            </div>
          </section>

          <section className="mb-10" data-animate="fade-up" data-delay="2">
            <h2 className="font-playfair text-3xl font-bold text-primary">2. Payment Schedule &amp; VAT Policy</h2>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

            <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
              <p className="text-primary/80 leading-relaxed">
                All prices are quoted in foreign currency and are exclusive of VAT. Payments must be made in NIS.
              </p>

              <div className="mt-6 rounded-2xl border border-secondary/20 bg-cream p-6">
                <h3 className="font-playfair text-2xl font-semibold text-primary">Payment Schedule (Direct Bookings)</h3>
                <div className="mt-5">{renderBulletList(paymentSchedule)}</div>
              </div>

              <p className="mt-6 text-primary/80 leading-relaxed">
                The company reserves the right to cancel or relocate reservations not fully paid before arrival.
              </p>
            </div>
          </section>

          <section className="mb-10" data-animate="fade-up" data-delay="3">
            <h2 className="font-playfair text-3xl font-bold text-primary">3. Guest Responsibilities</h2>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

            <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
              {renderBulletList(guestResponsibilities)}
            </div>
          </section>

          <section className="mb-10" data-animate="fade-up">
            <h2 className="font-playfair text-3xl font-bold text-primary">4. Responsibilities of Or Hakerem</h2>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-primary/10 bg-white p-6">
                <h3 className="font-playfair text-2xl font-semibold text-primary">Or Hakerem is committed to</h3>
                <div className="mt-5">{renderBulletList(companyResponsibilities)}</div>
              </div>

              <div className="rounded-2xl border border-primary/10 bg-white p-6">
                <h3 className="font-playfair text-2xl font-semibold text-primary">Or Hakerem is not liable for</h3>
                <div className="mt-5">{renderBulletList(companyLimitations)}</div>
              </div>
            </div>
          </section>

          <section className="mb-10" data-animate="fade-up">
            <h2 className="font-playfair text-3xl font-bold text-primary">5. Travel Insurance &amp; Geopolitical Disclaimer</h2>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

            <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
              <p className="text-primary/80 leading-relaxed">
                Guests are strongly advised to purchase travel insurance covering:
              </p>
              <div className="mt-5">{renderBulletList(insuranceCoverage)}</div>

              <div className="mt-6 space-y-4 text-primary/80 leading-relaxed">
                <p>
                  Geopolitical tensions or security situations in Israel are not considered force majeure unless
                  officially declared by authorities (for example: airport closure or travel ban).
                </p>
                <p>In such cases, guests will receive a credit voucher as outlined in section 1.3.</p>
                <p>
                  Or Hakerem is not responsible for cancellations based on personal concerns unless official
                  restrictions apply.
                </p>
              </div>
            </div>
          </section>

          <section data-animate="fade-up">
            <h2 className="font-playfair text-3xl font-bold text-primary">6. Termination, Penalties &amp; Overstay</h2>
            <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

            <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
              <div className="space-y-4 text-primary/80 leading-relaxed">
                <p>
                  The rental period terminates automatically on the agreed check-out date, without notice.
                </p>
                <p>
                  Failure to vacate the property on time will result in a penalty of 2× the daily rate per extra
                  day, until the property is fully vacated and keys returned.
                </p>
                <p>
                  Any breach of the Terms &amp; Conditions entitles Or Hakerem to terminate the stay immediately,
                  without refund or compensation.
                </p>
              </div>
            </div>
          </section>
        </div>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 rounded-full bg-gradient-to-r from-secondary to-secondary-light p-4 text-primary shadow-lg transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}
