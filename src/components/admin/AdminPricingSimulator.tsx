'use client';

import { useMemo, useRef, useState } from 'react';
import { CalendarDays, Calculator, RefreshCw, X } from 'lucide-react';
import { DayPicker, type DateRange } from 'react-day-picker';

import {
  BUSINESS_TIME_ZONE,
  compareIsoDates,
  createDateFromIso,
  getTodayIsoInTimeZone,
  isIsoDateString,
  toIsoDateString,
} from '@/lib/booking-dates';
import { addMonthsUtc, startOfMonthUtc } from '@/lib/calendar-months';
import type { AdminPricingSnapshot } from '@/lib/admin-pricing';

import {
  AdminPanel,
  AdminPill,
  AdminSelect,
} from './admin-ui';
import { getAdminCalendarClassNames } from './admin-calendar-styles';
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
  const [activeDateField, setActiveDateField] = useState<'checkIn' | 'checkOut'>('checkOut');
  const [month, setMonth] = useState<Date>(() =>
    startOfMonthUtc(createDateFromIso(todayIso)),
  );
  const [result, setResult] = useState<AdminPricingSimulationResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  // Incremented whenever the input changes or a new run starts, so a slow
  // response can never overwrite the result of a more recent simulation.
  const runSeqRef = useRef(0);

  const quote = result?.success ? result.quote : null;
  const error = result?.success === false ? result.error : null;
  const calendarClassNames = useMemo(() => getAdminCalendarClassNames(), []);
  const selectedRange = useMemo<DateRange | undefined>(() => {
    if (!input.checkIn) {
      return undefined;
    }

    return {
      from: createDateFromIso(input.checkIn),
      to: createDateFromIso(input.checkOut || input.checkIn),
    };
  }, [input.checkIn, input.checkOut]);

  function invalidateSimulation() {
    runSeqRef.current += 1;
    setResult(null);
  }

  function updateInput(key: keyof AdminPricingSimulationInput, value: string) {
    invalidateSimulation();
    setInput((current) => ({ ...current, [key]: value }));
  }

  function selectDate(value: string) {
    invalidateSimulation();

    if (!isIsoDateString(value) || compareIsoDates(value, todayIso) < 0) {
      return;
    }

    if (!input.checkIn || activeDateField === 'checkIn') {
      setInput((current) => ({
        ...current,
        checkIn: value,
        checkOut: '',
      }));
      setActiveDateField('checkOut');
      setMonth(startOfMonthUtc(createDateFromIso(value)));
      return;
    }

    if (compareIsoDates(value, input.checkIn) <= 0) {
      setInput((current) => ({
        ...current,
        checkIn: value,
        checkOut: '',
      }));
      setActiveDateField('checkOut');
      setMonth(startOfMonthUtc(createDateFromIso(value)));
      return;
    }

    setInput((current) => ({
      ...current,
      checkOut: value,
    }));
  }

  function clearDates() {
    invalidateSimulation();
    setInput((current) => ({
      ...current,
      checkIn: '',
      checkOut: '',
    }));
    setActiveDateField('checkIn');
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

    const seq = ++runSeqRef.current;
    setIsChecking(true);
    setResult(null);

    try {
      const simulation = await runSimulation(input);

      if (runSeqRef.current === seq) {
        setResult(simulation);
      }
    } catch (err) {
      console.error('Admin pricing simulation failed:', err);

      if (runSeqRef.current === seq) {
        setResult({
          success: false,
          error: 'Unable to run the server simulation.',
        });
      }
    } finally {
      // Runs cannot overlap (the button is disabled while checking), so the
      // spinner is always released even if the input changed mid-flight.
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
      <div className="grid gap-4 xl:grid-cols-[minmax(19rem,22rem)_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-xl border border-primary/15 bg-white">
          <div className="grid grid-cols-2 divide-x divide-primary/10 border-b border-primary/10 rtl:divide-x-reverse">
            <button
              type="button"
              onClick={() => setActiveDateField('checkIn')}
              aria-pressed={activeDateField === 'checkIn'}
              className={`px-4 py-4 text-start transition ${
                activeDateField === 'checkIn' ? 'bg-primary/[0.04]' : 'hover:bg-primary/[0.02]'
              }`}
            >
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-black/50">
                Check-in
              </span>
              <span className="mt-1 block text-sm font-semibold text-black">
                {input.checkIn || 'Select date'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveDateField(input.checkIn ? 'checkOut' : 'checkIn')}
              aria-pressed={activeDateField === 'checkOut'}
              className={`px-4 py-4 text-start transition ${
                activeDateField === 'checkOut' ? 'bg-primary/[0.04]' : 'hover:bg-primary/[0.02]'
              }`}
            >
              <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-black/50">
                Check-out
              </span>
              <span className="mt-1 block text-sm font-semibold text-black">
                {input.checkOut || 'Select date'}
              </span>
            </button>
          </div>

          <div className="px-3 py-4 sm:px-5">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-black/55">
                <CalendarDays className="h-3.5 w-3.5" />
                {activeDateField === 'checkOut' && input.checkIn ? 'Pick check-out' : 'Pick check-in'}
              </p>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setMonth((currentMonth) => addMonthsUtc(currentMonth, -1))}
                  aria-label="Show previous month"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/15 bg-white text-black transition hover:bg-cream/60"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setMonth((currentMonth) => addMonthsUtc(currentMonth, 1))}
                  aria-label="Show next month"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/15 bg-white text-black transition hover:bg-cream/60"
                >
                  ›
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              month={month}
              onMonthChange={(nextMonth) => setMonth(startOfMonthUtc(nextMonth))}
              onDayClick={(date) => selectDate(toIsoDateString(date))}
              selected={selectedRange}
              numberOfMonths={1}
              showOutsideDays
              timeZone={BUSINESS_TIME_ZONE}
              defaultMonth={startOfMonthUtc(createDateFromIso(todayIso))}
              hideNavigation
              disabled={(date) => compareIsoDates(toIsoDateString(date), todayIso) < 0}
              className="booking-calendar-root w-full"
              classNames={calendarClassNames}
            />
          </div>

          {input.checkIn || input.checkOut ? (
            <div className="flex items-center justify-end border-t border-primary/10 bg-cream/40 px-5 py-3">
              <button
                type="button"
                onClick={clearDates}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-black underline decoration-black/30 underline-offset-4 hover:decoration-black"
              >
                <X className="h-3.5 w-3.5" />
                Clear dates
              </button>
            </div>
          ) : null}
        </div>

        <div className="space-y-4">
          <AdminSelect
            label="Listing"
            value={input.listingId}
            onChange={(value) => updateInput('listingId', value)}
            options={listingOptions}
          />

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
      </div>
    </AdminPanel>
  );
}
