import Link from 'next/link';
import { BulletList } from '@/components/legal/LegalPageShell';

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

export default function TermsContentEn({ cancellationHref }: { cancellationHref: string }) {
  return (
    <>
      <section className="mb-10" data-animate="fade-up" data-delay="1">
        <h2 className="font-head text-3xl font-bold text-black">1. Cancellation &amp; Refund Policy</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <p className="text-black/80 leading-relaxed">
            Or Hakerem applies a tiered cancellation and refund policy based on how far in advance
            you cancel, alongside defined non-refundable situations and a voucher policy for
            officially declared travel disruptions.
          </p>
          <Link
            href={cancellationHref}
            className="mt-5 inline-flex items-center font-semibold text-primary underline underline-offset-4 transition-colors hover:text-primary-light"
          >
            View our full Cancellation &amp; Refund Policy
          </Link>
        </div>
      </section>

      <section className="mb-10" data-animate="fade-up" data-delay="2">
        <h2 className="font-head text-3xl font-bold text-black">2. Payment Schedule</h2>
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

      <section className="mb-10" data-animate="fade-up" data-delay="3">
        <h2 className="font-head text-3xl font-bold text-black">3. Guest Responsibilities</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <BulletList items={guestResponsibilities} />
        </div>
      </section>

      <section className="mb-10" data-animate="fade-up">
        <h2 className="font-head text-3xl font-bold text-black">4. Responsibilities of Or Hakerem</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-primary/10 bg-white p-6">
            <h3 className="font-head text-2xl font-semibold text-black">Or Hakerem is committed to</h3>
            <div className="mt-5">
              <BulletList items={companyResponsibilities} />
            </div>
          </div>

          <div className="rounded-2xl border border-primary/10 bg-white p-6">
            <h3 className="font-head text-2xl font-semibold text-black">Or Hakerem is not liable for</h3>
            <div className="mt-5">
              <BulletList items={companyLimitations} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10" data-animate="fade-up">
        <h2 className="font-head text-3xl font-bold text-black">5. Travel Insurance &amp; Geopolitical Disclaimer</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <p className="text-black/80 leading-relaxed">
            Guests are strongly advised to purchase travel insurance covering:
          </p>
          <div className="mt-5">
            <BulletList items={insuranceCoverage} />
          </div>

          <div className="mt-6 space-y-4 text-black/80 leading-relaxed">
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
        <h2 className="font-head text-3xl font-bold text-black">6. Termination, Penalties &amp; Overstay</h2>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-secondary to-transparent"></div>

        <div className="mt-8 rounded-2xl border border-primary/10 bg-white p-6 md:p-8">
          <div className="space-y-4 text-black/80 leading-relaxed">
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
    </>
  );
}
