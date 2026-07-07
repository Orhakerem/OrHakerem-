import { BulletList } from '@/components/legal/LegalPageShell';

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

export default function CancellationContentEn() {
  return (
    <>
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
          <div className="mt-5">
            <BulletList items={nonRefundableSituations} />
          </div>
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
          <div className="mt-5">
            <BulletList items={voucherPolicy} />
          </div>
        </div>
      </section>

      <section data-animate="fade-up">
        <h2 className="font-head text-3xl font-bold text-black">Payment Schedule</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <div className="rounded-2xl border border-secondary/20 bg-cream p-6">
            <h3 className="font-head text-2xl font-semibold text-black">Payment Schedule (Direct Bookings)</h3>
            <div className="mt-5">
              <BulletList items={paymentSchedule} />
            </div>
          </div>

          <p className="mt-6 text-black/80 leading-relaxed">
            The company reserves the right to cancel or relocate reservations not fully paid before arrival.
          </p>
        </div>
      </section>
    </>
  );
}
