'use client';

import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import React, { useEffect, useMemo, useState } from 'react';

import { useResponsiveCalendarLayout } from '@/hooks/useResponsiveCalendarLayout';
import {
  BUSINESS_TIME_ZONE,
  compareIsoDates,
  createDateFromIso,
  formatIsoDate,
  getTodayIsoInTimeZone,
  toIsoDateString,
} from '@/lib/booking-dates';
import { addMonthsUtc, startOfMonthUtc } from '@/lib/calendar-months';
import type { CalendarSyncStatus } from '@/lib/bookable-properties';

interface BookingSingleDateCalendarProps {
  value: string | null;
  onChange: (date: string | null) => void;
  blockedDates?: readonly string[];
  availabilityStatus?: CalendarSyncStatus;
}

export default function BookingSingleDateCalendar({
  value,
  onChange,
  blockedDates = [],
  availabilityStatus = 'ready',
}: BookingSingleDateCalendarProps) {
  const { rootRef, showSidePanel, showTwoMonths } = useResponsiveCalendarLayout();
  const todayIso = getTodayIsoInTimeZone();
  const todayMonth = useMemo(
    () => startOfMonthUtc(createDateFromIso(todayIso)),
    [todayIso],
  );
  const [month, setMonth] = useState<Date>(() =>
    startOfMonthUtc(createDateFromIso(value ?? todayIso)),
  );

  useEffect(() => {
    setMonth(startOfMonthUtc(createDateFromIso(value ?? todayIso)));
  }, [todayIso, value]);

  const selectedDate = useMemo(
    () => (value ? createDateFromIso(value) : undefined),
    [value],
  );
  const blockedDateSet = useMemo(() => new Set(blockedDates), [blockedDates]);

  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      onChange(null);
      return;
    }

    const selectedIso = toIsoDateString(date);

    if (compareIsoDates(selectedIso, todayIso) < 0 || blockedDateSet.has(selectedIso)) {
      return;
    }

    onChange(selectedIso);
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
  const disabledDays = (date: Date) => {
    const isoDate = toIsoDateString(date);

    return compareIsoDates(isoDate, todayIso) < 0 || blockedDateSet.has(isoDate);
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
              className="tap-reset inline-flex items-center justify-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary"
            >
              <X className="h-4 w-4" />
              Clear date
            </button>
          ) : null}

          {availabilityStatus === 'error' ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Airbnb availability is temporarily unavailable. Refresh before submitting your
              event.
            </div>
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
                  className="tap-reset inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-white text-primary"
                  aria-label="Show previous month"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={goToNextMonth}
                  className="tap-reset inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-white text-primary"
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
                'booking-calendar-day-button tap-reset flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10',
              disabled: 'booking-calendar-disabled',
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
