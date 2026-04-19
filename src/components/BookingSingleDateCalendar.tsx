'use client';

import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  BUSINESS_TIME_ZONE,
  createDateFromIso,
  formatIsoDate,
  getTodayIsoInTimeZone,
  toIsoDateString,
} from '@/lib/booking-dates';

interface BookingSingleDateCalendarProps {
  value: string | null;
  onChange: (date: string | null) => void;
}

function startOfMonthUtc(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, 12));
}

function addMonthsUtc(date: Date, months: number) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1, 12));
}

export default function BookingSingleDateCalendar({
  value,
  onChange,
}: BookingSingleDateCalendarProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const todayIso = getTodayIsoInTimeZone();
  const todayMonth = useMemo(
    () => startOfMonthUtc(createDateFromIso(todayIso)),
    [todayIso],
  );
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showTwoMonths, setShowTwoMonths] = useState(false);
  const [month, setMonth] = useState<Date>(() =>
    startOfMonthUtc(createDateFromIso(value ?? todayIso)),
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
    setMonth(startOfMonthUtc(createDateFromIso(value ?? todayIso)));
  }, [todayIso, value]);

  const selectedDate = useMemo(
    () => (value ? createDateFromIso(value) : undefined),
    [value],
  );

  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      onChange(null);
      return;
    }

    onChange(toIsoDateString(date));
    setMonth(startOfMonthUtc(date));
  };

  const clearDate = () => {
    onChange(null);
    setMonth(todayMonth);
  };

  const goToPreviousMonth = () => {
    setMonth((currentMonth) => addMonthsUtc(currentMonth, -1));
  };

  const goToNextMonth = () => {
    setMonth((currentMonth) => addMonthsUtc(currentMonth, 1));
  };

  const hasSelection = Boolean(value);

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
                Choose your event date
              </p>
              <p className="mt-1 text-sm text-primary/70">
                Select the date of your event directly from the calendar below.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-full rounded-2xl border border-black/10 bg-slate-900 px-4 py-4 text-left text-white shadow-lg shadow-black/10 transition"
          >
            <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
              Event date
            </span>
            <span className="mt-2 block font-playfair text-lg font-semibold text-white">
              {value ? formatIsoDate(value) : 'Add date'}
            </span>
          </button>

          <div className="rounded-2xl border border-secondary/20 bg-secondary/10 px-4 py-4 text-primary shadow-sm">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/45">
              Selected day
            </span>
            <span className="mt-2 block font-playfair text-lg font-semibold">
              {hasSelection ? formatIsoDate(value!) : 'No date selected'}
            </span>
            <p className="mt-2 text-sm text-primary/70">
              {hasSelection
                ? 'Your event request will be sent with this date.'
                : 'Choose the day you would like us to review for your event.'}
            </p>
          </div>

          {hasSelection ? (
            <button
              type="button"
              onClick={clearDate}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:border-black/10 hover:bg-black/[0.02]"
            >
              <X className="h-4 w-4" />
              Clear date
            </button>
          ) : null}
        </div>

        <div className="rounded-3xl border border-primary/10 bg-cream/60 p-4 md:p-6">
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/45">
                  Event calendar
                </p>
                <p className="mt-1 font-playfair text-xl font-semibold text-primary">
                  {hasSelection ? formatIsoDate(value!) : 'Select your event date'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPreviousMonth}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-white text-primary transition hover:border-black/10 hover:bg-black/[0.02]"
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
            mode="single"
            month={month}
            onMonthChange={(nextMonth) => setMonth(startOfMonthUtc(nextMonth))}
            selected={selectedDate}
            onSelect={handleSelect}
            numberOfMonths={showTwoMonths ? 2 : 1}
            pagedNavigation={showTwoMonths}
            showOutsideDays
            timeZone={BUSINESS_TIME_ZONE}
            defaultMonth={todayMonth}
            hideNavigation
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
              outside: 'booking-calendar-outside',
              today: 'booking-calendar-today',
              selected: 'booking-calendar-selected',
            }}
          />
        </div>
      </div>
    </div>
  );
}
