import Link from 'next/link';

import type { AdminDashboardSummary } from '@/lib/admin-pricing';

interface AdminDashboardProps {
  summary: AdminDashboardSummary;
}

const DASHBOARD_CARDS = [
  {
    href: '/admin/devis',
    eyebrow: 'Devis',
    title: 'Reservation quote',
    description: 'Prepare and send the branded reservation invoice email to the customer.',
  },
  {
    href: '/admin/pricing',
    eyebrow: 'Pricing',
    title: 'Pricing editor',
    description: 'Manage listing rates, seasons, date overrides, and adjustment rules.',
  },
] as const;

export default function AdminDashboard({ summary }: AdminDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {DASHBOARD_CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/[0.02]"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/60">
              {card.eyebrow}
            </p>
            <h2 className="mt-2 font-head text-2xl font-light tracking-h3 text-black">
              {card.title}
            </h2>
            <p className="mt-2 text-sm text-black/60">{card.description}</p>
          </Link>
        ))}
      </div>

      {summary.unavailableReason ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
          Pricing dashboard data is unavailable: {summary.unavailableReason}
        </div>
      ) : null}

      <section className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
        <div className="grid gap-3 sm:grid-cols-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/60">
              Tiers
            </p>
            <p className="mt-1 font-head text-3xl font-light text-black">
              {summary.pricingTierCount}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/60">
              Seasons
            </p>
            <p className="mt-1 font-head text-3xl font-light text-black">
              {summary.activeSeasonCount}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/60">
              Dates
            </p>
            <p className="mt-1 font-head text-3xl font-light text-black">
              {summary.specialDateCount}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary/60">
              Rules
            </p>
            <p className="mt-1 font-head text-3xl font-light text-black">
              {summary.activeAdjustmentRuleCount}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/60">
              Quote history
            </p>
            <h2 className="mt-1 font-head text-2xl font-light tracking-h3 text-black">
              Recent sent quotes
            </h2>
          </div>
        </div>

        {summary.recentQuotes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <thead className="text-[10px] uppercase tracking-[0.18em] text-black/45">
                <tr>
                  <th className="py-2 pe-4 font-semibold">Reservation</th>
                  <th className="py-2 pe-4 font-semibold">Guest</th>
                  <th className="py-2 pe-4 font-semibold">Apartment</th>
                  <th className="py-2 pe-4 font-semibold">Dates</th>
                  <th className="py-2 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {summary.recentQuotes.map((quote) => (
                  <tr key={quote.id}>
                    <td className="py-3 pe-4 font-medium text-black">
                      {quote.reservationNumber}
                    </td>
                    <td className="py-3 pe-4 text-black/65">
                      {quote.guestName}
                      <span className="block text-xs text-black/45">{quote.customerEmail}</span>
                    </td>
                    <td className="py-3 pe-4 text-black/65">{quote.apartment}</td>
                    <td className="py-3 pe-4 text-black/65">
                      {quote.checkIn && quote.checkOut
                        ? `${quote.checkIn} - ${quote.checkOut}`
                        : 'Dates unavailable'}
                    </td>
                    <td className="py-3 text-right font-semibold text-black">
                      {quote.totalLabel}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-black/55">No sent quote history is available yet.</p>
        )}
      </section>
    </div>
  );
}
