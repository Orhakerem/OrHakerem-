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
  const { rootRef } = useResponsiveCalendarLayout();
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
  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
        timeZone: BUSINESS_TIME_ZONE,
      }).format(month),
    [month],
  );

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
      className="w-full space-y-5 rounded-3xl border border-primary/10 bg-white p-5 shadow-sm md:p-6"
    >
      <div className="flex items-start gap-3">
        <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="font-head text-xl font-semibold text-black">
            Choose your event date
          </p>
          <p className="mt-1 text-sm text-black/70">
            Select the date of your event directly from the calendar below.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/10 pb-4">
        <div>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45">
            {hasSelection ? 'Selected date' : 'No date selected'}
          </span>
          <span className="mt-1 block font-head text-lg font-semibold text-black">
            {hasSelection ? formatIsoDate(value!) : 'Pick a day below'}
          </span>
        </div>

        {hasSelection ? (
          <button
            type="button"
            onClick={clearDate}
            className="tap-reset inline-flex items-center gap-1.5 text-sm font-semibold text-black/60 transition hover:text-black"
          >
            <X className="h-4 w-4" />
            Clear
          </button>
        ) : null}
      </div>

      {availabilityStatus === 'error' ? (
        <p className="text-sm text-amber-700">
          Airbnb availability is temporarily unavailable. Refresh before submitting your
          event.
        </p>
      ) : null}

      <div>
        <div className="flex items-center justify-between gap-3">
          <p className="font-head text-lg font-semibold text-black">{monthLabel}</p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="tap-reset inline-flex h-9 w-9 items-center justify-center rounded-full text-black/60 transition hover:bg-primary/5 hover:text-black"
              aria-label="Show previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goToNextMonth}
              className="tap-reset inline-flex h-9 w-9 items-center justify-center rounded-full text-black/60 transition hover:bg-primary/5 hover:text-black"
              aria-label="Show next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <DayPicker
            mode="single"
            month={month}
            onMonthChange={(nextMonth) => setMonth(startOfMonthUtc(nextMonth))}
            selected={selectedDate}
            onSelect={handleSelect}
            numberOfMonths={1}
            pagedNavigation={false}
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
              months: 'flex flex-col gap-6',
              month: 'w-full max-w-[22rem] space-y-4',
              month_caption: 'hidden',
              weekdays: 'grid grid-cols-7 gap-1',
              weekday:
                'text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45',
              week: 'grid grid-cols-7 gap-1',
              day: 'booking-calendar-day',
              day_button:
                'booking-calendar-day-button tap-reset flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-medium text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10',
              disabled: 'booking-calendar-disabled',
              outside: 'booking-calendar-outside',
              today: 'booking-calendar-today',
              selected: 'booking-calendar-selected',
            }}
          />
        </div>
    </div>
  );
}
