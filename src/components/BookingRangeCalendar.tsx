'use client';

import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { DayPicker, type Modifiers } from 'react-day-picker';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  addNights,
  BUSINESS_TIME_ZONE,
  type BookingDateRange,
  compareIsoDates,
  createDateFromIso,
  formatIsoDate,
  getFirstBlockedDateAfter,
  getNightCount,
  getTodayIsoInTimeZone,
  sanitizeBookingDateRange,
  toIsoDateString,
} from '@/lib/booking-dates';
import type { CalendarSyncStatus } from '@/lib/bookable-properties';

interface BookingRangeCalendarProps {
  value: BookingDateRange;
  onChange: (range: BookingDateRange) => void;
  blockedDates?: readonly string[];
  availabilityStatus?: CalendarSyncStatus;
}

type ActiveField = 'checkIn' | 'checkOut';

function startOfMonthUtc(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, 12));
}

function addMonthsUtc(date: Date, months: number) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1, 12));
}

function isSameMonthUtc(left: Date, right: Date) {
  return (
    left.getUTCFullYear() === right.getUTCFullYear() &&
    left.getUTCMonth() === right.getUTCMonth()
  );
}

export default function BookingRangeCalendar({
  value,
  onChange,
  blockedDates = [],
  availabilityStatus = 'ready',
}: BookingRangeCalendarProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const todayIso = getTodayIsoInTimeZone();
  const todayMonth = useMemo(
    () => startOfMonthUtc(createDateFromIso(todayIso)),
    [todayIso],
  );
  const blockedDateSet = useMemo(() => new Set(blockedDates), [blockedDates]);
  const displayValue = useMemo(
    () => sanitizeBookingDateRange(value.checkIn, value.checkOut, todayIso, false, blockedDates),
    [blockedDates, todayIso, value.checkIn, value.checkOut],
  );
  const [activeField, setActiveField] = useState<ActiveField>(() =>
    value.checkIn ? 'checkOut' : 'checkIn',
  );
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showTwoMonths, setShowTwoMonths] = useState(false);
  const [month, setMonth] = useState<Date>(() =>
    startOfMonthUtc(createDateFromIso(value.checkIn ?? todayIso)),
  );

  useEffect(() => {
    const rootElement = rootRef.current;

    if (!rootElement) {
      return;
    }

    const syncLayout = (width: number) => {
      setShowSidePanel(width >= 960);
      setShowTwoMonths(width >= 860);
    };

    syncLayout(rootElement.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      syncLayout(entry.contentRect.width);
    });

    observer.observe(rootElement);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setMonth(startOfMonthUtc(createDateFromIso(displayValue.checkIn ?? todayIso)));
  }, [displayValue.checkIn, todayIso]);

  useEffect(() => {
    if (
      value.checkIn !== displayValue.checkIn ||
      value.checkOut !== displayValue.checkOut
    ) {
      onChange(displayValue);
    }
  }, [displayValue, onChange, value.checkIn, value.checkOut]);

  useEffect(() => {
    if (!displayValue.checkIn) {
      setActiveField('checkIn');
      return;
    }

    if (!displayValue.checkOut) {
      setActiveField('checkOut');
    }
  }, [displayValue.checkIn, displayValue.checkOut]);

  const selectedRange = useMemo(() => {
    if (!displayValue.checkIn) {
      return undefined;
    }

    return {
      from: createDateFromIso(displayValue.checkIn),
      to: createDateFromIso(displayValue.checkOut ?? displayValue.checkIn),
    };
  }, [displayValue.checkIn, displayValue.checkOut]);
  const maxCheckOutIso = useMemo(() => {
    if (!displayValue.checkIn) {
      return null;
    }

    return getFirstBlockedDateAfter(displayValue.checkIn, blockedDates);
  }, [blockedDates, displayValue.checkIn]);

  const handleFieldFocus = (field: ActiveField) => {
    if (field === 'checkOut' && !displayValue.checkIn) {
      setActiveField('checkIn');
      setMonth(todayMonth);
      return;
    }

    setActiveField(field);

    if (field === 'checkOut' && displayValue.checkIn) {
      setMonth(startOfMonthUtc(createDateFromIso(displayValue.checkIn)));
      return;
    }

    setMonth(startOfMonthUtc(createDateFromIso(displayValue.checkIn ?? todayIso)));
  };

  const handleDayClick = (date: Date, modifiers: Modifiers) => {
    if (modifiers.disabled) {
      return;
    }

    const clickedIso = toIsoDateString(date);

    if (!displayValue.checkIn || activeField === 'checkIn') {
      const nextCheckOut =
        displayValue.checkOut && compareIsoDates(displayValue.checkOut, clickedIso) > 0
          ? displayValue.checkOut
          : addNights(clickedIso, 1);

      onChange({
        checkIn: clickedIso,
        checkOut: nextCheckOut,
      });
      setActiveField('checkOut');
      setMonth(startOfMonthUtc(createDateFromIso(clickedIso)));

      return;
    }

    if (compareIsoDates(clickedIso, displayValue.checkIn) <= 0) {
      onChange({
        checkIn: clickedIso,
        checkOut: addNights(clickedIso, 1),
      });
      setActiveField('checkOut');
      setMonth(startOfMonthUtc(createDateFromIso(clickedIso)));

      return;
    }

    onChange({
      checkIn: displayValue.checkIn,
      checkOut: clickedIso,
    });
  };

  const clearDates = () => {
    onChange({ checkIn: null, checkOut: null });
    setActiveField('checkIn');
    setMonth(todayMonth);
  };

  const goToPreviousMonth = () => {
    setMonth((currentMonth) => {
      const previousMonth = addMonthsUtc(currentMonth, -1);
      return previousMonth < todayMonth ? todayMonth : previousMonth;
    });
  };

  const goToNextMonth = () => {
    setMonth((currentMonth) => addMonthsUtc(currentMonth, 1));
  };

  const nights = getNightCount(displayValue);
  const hasSelection = Boolean(displayValue.checkIn && displayValue.checkOut);
  const canGoToPreviousMonth = !isSameMonthUtc(month, todayMonth);
  const canUseBlockedBoundaryAsCheckout = Boolean(
    displayValue.checkIn &&
      activeField === 'checkOut' &&
      maxCheckOutIso &&
      blockedDateSet.has(maxCheckOutIso),
  );
  const disabledDays = (date: Date) => {
    const isoDate = toIsoDateString(date);

    if (compareIsoDates(isoDate, todayIso) < 0) {
      return true;
    }

    if (!displayValue.checkIn || activeField === 'checkIn') {
      return blockedDateSet.has(isoDate);
    }

    if (compareIsoDates(isoDate, displayValue.checkIn) <= 0) {
      return true;
    }

    if (maxCheckOutIso && compareIsoDates(isoDate, maxCheckOutIso) > 0) {
      return true;
    }

    return false;
  };
  const unavailableDays = (date: Date) => blockedDateSet.has(toIsoDateString(date));

  return (
    <div
      ref={rootRef}
      className="w-full rounded-3xl border border-primary/10 bg-white p-4 shadow-sm md:p-6"
    >
      <div
        className={
          showSidePanel ? 'grid gap-6 grid-cols-[280px_minmax(0,1fr)]' : 'space-y-6'
        }
      >
        <div className="space-y-4 rounded-2xl border border-primary/10 bg-gradient-to-br from-cream to-white p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <p className="font-playfair text-xl font-semibold text-primary">
                Choose your stay
              </p>
              <p className="mt-1 text-sm text-primary/70">
                {activeField === 'checkOut' && displayValue.checkIn
                  ? 'Your check-in stays selected while you extend the stay.'
                  : 'Choose a check-in date, then adjust the check-out in the same calendar.'}
              </p>
            </div>
          </div>

          {canUseBlockedBoundaryAsCheckout ? (
            <div className="rounded-2xl border border-primary/10 bg-white px-4 py-3 text-sm text-primary/75">
              Airbnb-blocked nights stay unavailable. You can still check out on the first blocked
              day.
            </div>
          ) : null}

          {availabilityStatus === 'error' ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Airbnb availability is temporarily unavailable. Refresh before submitting your stay.
            </div>
          ) : null}

          <div className={showSidePanel ? 'grid gap-3' : 'grid gap-3 sm:grid-cols-2'}>
            <button
              type="button"
              onClick={() => handleFieldFocus('checkIn')}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                activeField === 'checkIn'
                  ? 'border-black/10 bg-slate-900 text-white shadow-lg shadow-black/10'
                  : 'border-primary/10 bg-white text-primary hover:border-black/10 hover:bg-black/[0.02]'
              }`}
            >
              <span
                className={`block text-[11px] font-semibold uppercase tracking-[0.22em] ${
                  activeField === 'checkIn' ? 'text-white/75' : 'text-primary/45'
                }`}
              >
                Check-in
              </span>
              <span
                className={`mt-2 block font-playfair text-lg font-semibold ${
                  activeField === 'checkIn' ? 'text-white' : 'text-primary'
                }`}
              >
                {displayValue.checkIn ? formatIsoDate(displayValue.checkIn) : 'Add date'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleFieldFocus('checkOut')}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                activeField === 'checkOut'
                  ? 'border-black/10 bg-slate-900 text-white shadow-lg shadow-black/10'
                  : 'border-primary/10 bg-white text-primary hover:border-black/10 hover:bg-black/[0.02]'
              }`}
            >
              <span
                className={`block text-[11px] font-semibold uppercase tracking-[0.22em] ${
                  activeField === 'checkOut' ? 'text-white/75' : 'text-primary/45'
                }`}
              >
                Check-out
              </span>
              <span
                className={`mt-2 block font-playfair text-lg font-semibold ${
                  activeField === 'checkOut' ? 'text-white' : 'text-primary'
                }`}
              >
                {displayValue.checkOut
                  ? formatIsoDate(displayValue.checkOut)
                  : 'Choose after check-in'}
              </span>
            </button>
          </div>

          <div className="rounded-2xl border border-secondary/20 bg-secondary/10 px-4 py-4 text-primary shadow-sm">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/45">
              Stay
            </span>
            <span className="mt-2 block font-playfair text-lg font-semibold">
              {hasSelection ? `${nights} night${nights === 1 ? '' : 's'}` : 'No dates selected'}
            </span>
            <p className="mt-2 text-sm text-primary/70">
              {hasSelection
                ? `${formatIsoDate(displayValue.checkIn!)} to ${formatIsoDate(displayValue.checkOut!)}`
                : 'Past dates stay unavailable and the range updates live inside the calendar.'}
            </p>
          </div>

          {hasSelection ? (
            <button
              type="button"
              onClick={clearDates}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:border-black/10 hover:bg-black/[0.02]"
            >
              <X className="h-4 w-4" />
              Clear dates
            </button>
          ) : null}
        </div>

        <div className="rounded-3xl border border-primary/10 bg-cream/60 p-4 md:p-6">
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/45">
                  {activeField === 'checkOut' && displayValue.checkIn
                    ? 'Adjusting check-out'
                    : 'Adjusting check-in'}
                </p>
                <p className="mt-1 font-playfair text-xl font-semibold text-primary">
                  {hasSelection
                    ? `${nights} night${nights === 1 ? '' : 's'} selected`
                    : 'Select your dates'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  disabled={!canGoToPreviousMonth}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-white text-primary transition hover:border-black/10 hover:bg-black/[0.02] disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Show previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-white text-primary transition hover:border-black/10 hover:bg-black/[0.02]"
                  aria-label="Show next month"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          <DayPicker
            mode="range"
            month={month}
            onMonthChange={(nextMonth) => setMonth(startOfMonthUtc(nextMonth))}
            onDayClick={handleDayClick}
            selected={selectedRange}
            numberOfMonths={showTwoMonths ? 2 : 1}
            pagedNavigation={showTwoMonths}
            showOutsideDays
            timeZone={BUSINESS_TIME_ZONE}
            defaultMonth={todayMonth}
            startMonth={todayMonth}
            hideNavigation
            disabled={disabledDays}
            modifiers={{
              unavailable: unavailableDays,
            }}
            modifiersClassNames={{
              unavailable: 'booking-calendar-unavailable',
            }}
            className="booking-calendar-root mt-5 w-full"
            classNames={{
              months: showTwoMonths
                ? 'flex flex-col gap-6 md:flex-row md:gap-8'
                : 'flex flex-col gap-6',
              month: 'w-full max-w-[22rem] space-y-4',
              month_caption: 'flex h-10 items-center justify-center',
              caption_label: 'font-playfair text-lg font-semibold text-primary',
              weekdays: 'grid grid-cols-7 gap-1',
              weekday:
                'text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/45',
              week: 'grid grid-cols-7 gap-1',
              day: 'booking-calendar-day',
              day_button:
                'booking-calendar-day-button flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-medium text-primary transition hover:bg-black/[0.06] focus:outline-none focus:ring-2 focus:ring-black/10',
              disabled: 'booking-calendar-disabled',
              outside: 'booking-calendar-outside',
              today: 'booking-calendar-today',
              selected: 'booking-calendar-selected',
              range_start: 'booking-calendar-range-start',
              range_middle: 'booking-calendar-range-middle',
              range_end: 'booking-calendar-range-end',
            }}
          />
        </div>
      </div>
    </div>
  );
}
