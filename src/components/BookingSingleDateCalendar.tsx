'use client';

import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { enUS as dayPickerEn, fr as dayPickerFr, he as dayPickerHe } from 'react-day-picker/locale';

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
import { isRtl, type Locale } from '@/i18n/config';
import { useLocale } from '@/i18n/useLocale';
import { bookingMessages, DISPLAY_LOCALE } from '@/i18n/messages/booking';

const DAY_PICKER_LOCALES: Record<Locale, typeof dayPickerEn> = {
  en: dayPickerEn,
  fr: dayPickerFr,
  he: dayPickerHe,
};

interface BookingSingleDateCalendarProps {
  value: string | null;
  onChange: (date: string | null) => void;
  blockedDates?: readonly string[];
  availabilityStatus?: CalendarSyncStatus;
  desktopMonths?: 1 | 2;
}

export default function BookingSingleDateCalendar({
  value,
  onChange,
  blockedDates = [],
  availabilityStatus = 'ready',
  desktopMonths = 1,
}: BookingSingleDateCalendarProps) {
  const locale = useLocale();
  const t = bookingMessages[locale];
  const { rootRef, numberOfMonths } = useResponsiveCalendarLayout();
  const monthsToShow = desktopMonths === 2 ? numberOfMonths : 1;
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
      className="w-full space-y-5 rounded-3xl border border-primary/10 bg-white p-5 shadow-sm md:p-6"
    >
      <div className="flex items-start gap-3">
        <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="font-head text-xl font-semibold text-black">
            {t.singleDate.heading}
          </p>
          <p className="mt-1 text-sm text-black/70">
            {t.singleDate.subheading}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primary/10 pb-4">
        <div>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-black/45">
            {hasSelection ? t.singleDate.selectedDate : t.singleDate.noDateSelected}
          </span>
          <span className="mt-1 block font-head text-lg font-semibold text-black">
            {hasSelection ? formatIsoDate(value!, DISPLAY_LOCALE[locale]) : t.singleDate.pickADay}
          </span>
        </div>

        {hasSelection ? (
          <button
            type="button"
            onClick={clearDate}
            className="tap-reset inline-flex items-center gap-1.5 text-sm font-semibold text-black/60 transition hover:text-black"
          >
            <X className="h-4 w-4" />
            {t.singleDate.clear}
          </button>
        ) : null}
      </div>

      {availabilityStatus === 'ready' ? null : (
        <p className="text-sm text-amber-700">
          {availabilityStatus === 'error'
            ? t.singleDate.availabilityError
            : t.singleDate.availabilityStale}
        </p>
      )}

      <div>
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="tap-reset inline-flex h-9 w-9 items-center justify-center rounded-full text-black/60 transition hover:bg-primary/5 hover:text-black"
            aria-label={t.calendar.prevMonthAria}
          >
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          </button>
          <button
            type="button"
            onClick={goToNextMonth}
            className="tap-reset inline-flex h-9 w-9 items-center justify-center rounded-full text-black/60 transition hover:bg-primary/5 hover:text-black"
            aria-label={t.calendar.nextMonthAria}
          >
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </button>
        </div>

        <DayPicker
            mode="single"
            locale={DAY_PICKER_LOCALES[locale]}
            dir={isRtl(locale) ? 'rtl' : 'ltr'}
            month={month}
            onMonthChange={(nextMonth) => setMonth(startOfMonthUtc(nextMonth))}
            selected={selectedDate}
            onSelect={handleSelect}
            numberOfMonths={monthsToShow}
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
              months: 'flex flex-col gap-6 md:flex-row md:justify-center md:gap-4',
              month: 'w-full max-w-[22rem] mx-auto space-y-4',
              month_caption: 'flex h-10 items-center justify-center',
              caption_label: 'font-head text-lg font-semibold text-black',
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
