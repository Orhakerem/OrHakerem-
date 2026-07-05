'use client';

import { useMemo, useState } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';

import { compareIsoDates, getTodayIsoInTimeZone, isIsoDateString } from '@/lib/booking-dates';
import type { AdminPricingSnapshot } from '@/lib/admin-pricing';

import {
  AdminField,
  AdminPanel,
  AdminPill,
  AdminSelect,
} from './admin-ui';
import type {
  AdminPricingSimulationInput,
  AdminPricingSimulationResult,
} from './AdminPricingEditor';

const COMBINED_LISTING_ID = 'penthouse+studio';

interface AdminPricingSimulatorProps {
  snapshot: AdminPricingSnapshot;
  runSimulation?: (
    input: AdminPricingSimulationInput,
  ) => Promise<AdminPricingSimulationResult>;
}

function formatMoney(value: number, currency: string) {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency} ${value.toFixed(0)}`;
  }
}

function formatPercentFromBasisPoints(value: number) {
  if (value === 0) {
    return '0%';
  }

  const percent = value / 100;
  const sign = percent > 0 ? '+' : '';

  return `${sign}${Number.isInteger(percent) ? percent : percent.toFixed(2)}%`;
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getListingOptions(snapshot: AdminPricingSnapshot) {
  return [
    ...snapshot.listings.map((listing) => ({
      value: listing.listingId,
      label: listing.title,
    })),
    { value: COMBINED_LISTING_ID, label: 'Penthouse + Studio' },
  ];
}

function validateInput(input: AdminPricingSimulationInput) {
  if (!input.listingId || !input.checkIn || !input.checkOut) {
    return 'Choose a listing and dates.';
  }

  if (!isIsoDateString(input.checkIn) || !isIsoDateString(input.checkOut)) {
    return 'Use valid ISO dates.';
  }

  if (compareIsoDates(input.checkOut, input.checkIn) <= 0) {
    return 'Check-out must be after check-in.';
  }

  return null;
}

export default function AdminPricingSimulator({
  snapshot,
  runSimulation,
}: AdminPricingSimulatorProps) {
  const listingOptions = useMemo(() => getListingOptions(snapshot), [snapshot]);
  const todayIso = getTodayIsoInTimeZone();
  const [input, setInput] = useState<AdminPricingSimulationInput>(() => ({
    listingId: snapshot.listings[0]?.listingId ?? '',
    checkIn: todayIso,
    checkOut: '',
  }));
  const [result, setResult] = useState<AdminPricingSimulationResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const quote = result?.success ? result.quote : null;
  const error = result?.success === false ? result.error : null;

  function updateInput(key: keyof AdminPricingSimulationInput, value: string) {
    setResult(null);
    setInput((current) => ({ ...current, [key]: value }));
  }

  async function handleRunSimulation() {
    const validationError = validateInput(input);

    if (validationError) {
      setResult({ success: false, error: validationError });
      return;
    }

    if (!runSimulation) {
      setResult({ success: false, error: 'Server simulator is not configured.' });
      return;
    }

    setIsChecking(true);
    setResult(null);

    try {
      setResult(await runSimulation(input));
    } catch (err) {
      console.error('Admin pricing simulation failed:', err);
      setResult({
        success: false,
        error: 'Unable to run the server simulation.',
      });
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <AdminPanel
      title="Simulator"
      eyebrow="Server check"
      icon={Calculator}
      action={<AdminPill tone={quote ? 'success' : 'neutral'}>{quote ? 'Synced' : 'API engine'}</AdminPill>}
    >
      <div className="space-y-4">
        <AdminSelect
          label="Listing"
          value={input.listingId}
          onChange={(value) => updateInput('listingId', value)}
          options={listingOptions}
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <AdminField
            label="Check-in"
            type="date"
            value={input.checkIn}
            onChange={(value) => updateInput('checkIn', value)}
          />
          <AdminField
            label="Check-out"
            type="date"
            value={input.checkOut}
            onChange={(value) => updateInput('checkOut', value)}
          />
        </div>

        <button
          type="button"
          onClick={handleRunSimulation}
          disabled={isChecking}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border-2 border-primary/25 px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
          {isChecking ? 'Checking' : 'Run simulation'}
        </button>

        {error ? (
          <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {error}
          </p>
        ) : null}

        {quote ? (
          <div className="overflow-hidden rounded-xl border border-primary/10">
            <div className="border-b border-primary/10 bg-cream/50 px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/60">
                {quote.listingTitle}
              </p>
              <p className="mt-1 text-sm font-semibold text-black">
                {quote.nights} {quote.nights === 1 ? 'night' : 'nights'}
              </p>
            </div>
            <div className="max-h-80 overflow-auto">
              <table className="w-full min-w-[38rem] text-left text-sm">
                <thead className="sticky top-0 bg-white text-[10px] uppercase tracking-[0.18em] text-black/45">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Season</th>
                    <th className="px-4 py-3 font-semibold">Day</th>
                    <th className="px-4 py-3 text-right font-semibold">Base</th>
                    <th className="px-4 py-3 text-right font-semibold">Rule</th>
                    <th className="px-4 py-3 text-right font-semibold">Final</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  {quote.nightlyBreakdown.map((night) => (
                    <tr key={night.date}>
                      <td className="px-4 py-3 font-medium text-black">{night.date}</td>
                      <td className="px-4 py-3 text-black/65">{titleCase(night.seasonType)}</td>
                      <td className="px-4 py-3 text-black/65">{titleCase(night.dayType)}</td>
                      <td className="px-4 py-3 text-right text-black/65">
                        {formatMoney(night.basePrice, quote.currency)}
                      </td>
                      <td className="px-4 py-3 text-right text-black/65">
                        {formatPercentFromBasisPoints(night.adjustmentBasisPoints)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-black">
                        {formatMoney(night.finalPrice, quote.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-2 border-t border-primary/10 bg-cream/35 px-4 py-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-black/60">Base nights</span>
                <span className="font-semibold text-black">
                  {formatMoney(quote.baseNightTotal, quote.currency)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-black/60">Adjustments</span>
                <span className="font-semibold text-black">
                  {formatMoney(quote.adjustmentTotal, quote.currency)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-black/60">Cleaning</span>
                <span className="font-semibold text-black">
                  {formatMoney(quote.cleaningFee, quote.currency)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-primary/10 pt-2">
                <span className="font-semibold text-black">Total</span>
                <span className="font-head text-2xl font-light text-black">
                  {formatMoney(quote.totalPrice, quote.currency)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-secondary/40 bg-cream/40 px-4 py-8 text-center text-sm text-black/55">
            Run a server simulation to preview the public pricing engine result.
          </div>
        )}
      </div>
    </AdminPanel>
  );
}
