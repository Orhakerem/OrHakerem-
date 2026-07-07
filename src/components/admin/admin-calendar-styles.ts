export function getAdminCalendarClassNames() {
  return {
    months: 'flex flex-col gap-6 md:flex-row md:gap-6',
    month: 'w-full max-w-[20rem] mx-auto space-y-3',
    month_caption: 'flex h-9 items-center justify-center',
    caption_label: 'font-head text-base font-semibold text-black',
    weekdays: 'grid grid-cols-7 gap-1',
    weekday:
      'text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-black/45',
    week: 'grid grid-cols-7 gap-1',
    day: 'booking-calendar-day',
    day_button:
      'booking-calendar-day-button tap-reset flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 sm:h-11 sm:w-11',
    disabled: 'booking-calendar-disabled',
    outside: 'booking-calendar-outside',
    today: 'booking-calendar-today',
    selected: 'booking-calendar-selected',
    range_start: 'booking-calendar-range-start',
    range_middle: 'booking-calendar-range-middle',
    range_end: 'booking-calendar-range-end',
  };
}
