'use client';

import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { CalendarDays, Plus, Send, Trash2, X } from 'lucide-react';
import {
  DayPicker,
  type DateRange,
  type OnSelectHandler,
} from 'react-day-picker';

import { sendReservationQuote } from '@/actions/admin';
import {
  ADMIN_APARTMENT_OPTIONS,
  getAvailabilityStatusForAdminApartment,
  getBlockedDatesForAdminApartment,
  getBlockedStayNights,
  normalizeAdminApartment,
  type AdminAvailabilitySnapshot,
} from '@/lib/admin-availability';
import {
  calculateAdminQuote,
  createDateFromAdminDate,
  createInitialAdminQuote,
  formatIsoDateForAdmin,
  parseAdminDateToIso,
} from '@/lib/admin-quote-calculations';
import {
  BUSINESS_TIME_ZONE,
  compareIsoDates,
  createDateFromIso,
  getFirstBlockedDateAfter,
  getTodayIsoInTimeZone,
  toIsoDateString,
} from '@/lib/booking-dates';
import { addMonthsUtc, startOfMonthUtc } from '@/lib/calendar-months';
import {
  type ReservationLineItem,
  type ReservationQuoteData,
} from '@/lib/reservation-quote';
import type {
  AdminCustomerRequestSummary,
  AdminRequestSourceInput,
} from '@/lib/admin-requests';

import { getAdminCalendarClassNames } from './admin-calendar-styles';

const INPUT_CLASS =
  'h-11 w-full rounded-lg border-2 border-secondary/40 bg-white px-3 text-sm text-black placeholder-primary/30 outline-none transition-colors duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/10';
const READONLY_CLASS =
  'h-11 w-full rounded-lg border-2 border-secondary/20 bg-cream/50 px-3 text-sm font-semibold text-black outline-none';

interface FieldProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  readOnly = false,
}: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={readOnly ? READONLY_CLASS : INPUT_CLASS}
      />
    </label>
  );
}

interface SectionProps {
  index: string;
  title: string;
  children: ReactNode;
}

function Section({ index, title, children }: SectionProps) {
  return (
    <section className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
      <header className="mb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-primary/60">
          Section {index}
        </p>
        <h2 className="mt-1 font-head text-2xl font-light tracking-h3 text-black">{title}</h2>
      </header>
      {children}
    </section>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={INPUT_CLASS}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

interface AdminDateFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  allowClear?: boolean;
}

function AdminDateField({
  label,
  value,
  onChange,
  allowClear = true,
}: AdminDateFieldProps) {
  const selectedDate = useMemo(() => createDateFromAdminDate(value), [value]);
  const todayIso = getTodayIsoInTimeZone();
  const todayMonth = useMemo(
    () => startOfMonthUtc(createDateFromIso(todayIso)),
    [todayIso],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState<Date>(() =>
    startOfMonthUtc(selectedDate ?? createDateFromIso(todayIso)),
  );

  useEffect(() => {
    if (selectedDate) {
      setMonth(startOfMonthUtc(selectedDate));
    }
  }, [selectedDate]);

  const handleSelect = (date: Date | undefined) => {
    if (!date) {
      return;
    }

    onChange(formatIsoDateForAdmin(toIsoDateString(date)));
    setMonth(startOfMonthUtc(date));
    setIsOpen(false);
  };

  return (
    <div className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70">
        {label}
      </span>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className={`${INPUT_CLASS} flex items-center justify-between text-start`}
        >
          <span>{value || 'Select date'}</span>
          <CalendarDays className="h-4 w-4 text-primary/70" aria-hidden="true" />
        </button>
        {allowClear && value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            aria-label={`Clear ${label}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border-2 border-secondary/40 text-primary/70 transition-colors hover:border-primary/40 hover:text-primary"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>
      {isOpen ? (
        <div className="mt-3 rounded-xl border border-primary/10 bg-white p-3 shadow-sm">
          <DayPicker
            mode="single"
            month={month}
            onMonthChange={(nextMonth) => setMonth(startOfMonthUtc(nextMonth))}
            selected={selectedDate}
            onSelect={handleSelect}
            showOutsideDays
            timeZone={BUSINESS_TIME_ZONE}
            defaultMonth={todayMonth}
            className="booking-calendar-root w-full"
            classNames={getAdminCalendarClassNames()}
          />
        </div>
      ) : null}
    </div>
  );
}

interface AdminStayCalendarProps {
  checkInDate: string;
  checkOutDate: string;
  blockedDates: readonly string[];
  availabilityStatus: 'ready' | 'stale' | 'error';
  onChange: (range: { checkInDate: string; checkOutDate: string }) => void;
}

function AdminStayCalendar({
  checkInDate,
  checkOutDate,
  blockedDates,
  availabilityStatus,
  onChange,
}: AdminStayCalendarProps) {
  const todayIso = getTodayIsoInTimeZone();
  const checkInIso = parseAdminDateToIso(checkInDate);
  const checkOutIso = parseAdminDateToIso(checkOutDate);
  const blockedDateSet = useMemo(() => new Set(blockedDates), [blockedDates]);
  const [activeField, setActiveField] = useState<'checkIn' | 'checkOut'>(
    checkInIso ? 'checkOut' : 'checkIn',
  );
  const [month, setMonth] = useState<Date>(() =>
    startOfMonthUtc(createDateFromIso(checkInIso ?? todayIso)),
  );
  const selectedRange = useMemo<DateRange | undefined>(() => {
    if (!checkInIso) {
      return undefined;
    }

    return {
      from: createDateFromIso(checkInIso),
      to: createDateFromIso(checkOutIso ?? checkInIso),
    };
  }, [checkInIso, checkOutIso]);
  const maxCheckOutIso = useMemo(
    () => (checkInIso ? getFirstBlockedDateAfter(checkInIso, blockedDates) : null),
    [blockedDates, checkInIso],
  );
  const keepDayPickerSelectionControlled: OnSelectHandler<DateRange | undefined> = () =>
    undefined;

  useEffect(() => {
    setMonth(startOfMonthUtc(createDateFromIso(checkInIso ?? todayIso)));
  }, [checkInIso, todayIso]);

  useEffect(() => {
    if (!checkInIso) {
      setActiveField('checkIn');
      return;
    }

    if (!checkOutIso) {
      setActiveField('checkOut');
    }
  }, [checkInIso, checkOutIso]);

  const handleFieldFocus = (field: 'checkIn' | 'checkOut') => {
    if (field === 'checkOut' && !checkInIso) {
      setActiveField('checkIn');
      return;
    }

    setActiveField(field);
  };

  const handleDayClick = (date: Date) => {
    const clickedIso = toIsoDateString(date);
    const clickedAdminDate = formatIsoDateForAdmin(clickedIso);
    const isBlocked = blockedDateSet.has(clickedIso);
    const canUseAsCheckOutBoundary =
      activeField === 'checkOut' && checkInIso && clickedIso === maxCheckOutIso;

    if (isBlocked && !canUseAsCheckOutBoundary) {
      return;
    }

    if (!checkInIso || activeField === 'checkIn') {
      onChange({ checkInDate: clickedAdminDate, checkOutDate: '' });
      setActiveField('checkOut');
      setMonth(startOfMonthUtc(date));
      return;
    }

    if (compareIsoDates(clickedIso, checkInIso) <= 0) {
      onChange({ checkInDate: clickedAdminDate, checkOutDate: '' });
      setActiveField('checkOut');
      setMonth(startOfMonthUtc(date));
      return;
    }

    if (maxCheckOutIso && compareIsoDates(clickedIso, maxCheckOutIso) > 0) {
      return;
    }

    onChange({ checkInDate, checkOutDate: clickedAdminDate });
  };

  const disabledDays = (date: Date) => {
    const isoDate = toIsoDateString(date);

    if (
      activeField === 'checkOut' &&
      checkInIso &&
      maxCheckOutIso &&
      isoDate === maxCheckOutIso
    ) {
      return false;
    }

    if (activeField === 'checkOut' && checkInIso && compareIsoDates(isoDate, checkInIso) <= 0) {
      return true;
    }

    if (activeField === 'checkOut' && maxCheckOutIso && compareIsoDates(isoDate, maxCheckOutIso) > 0) {
      return true;
    }

    return blockedDateSet.has(isoDate);
  };

  const unavailableDays = (date: Date) => blockedDateSet.has(toIsoDateString(date));
  const goToPreviousMonth = () => setMonth((currentMonth) => addMonthsUtc(currentMonth, -1));
  const goToNextMonth = () => setMonth((currentMonth) => addMonthsUtc(currentMonth, 1));

  return (
    <div className="sm:col-span-2">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70">
        Stay dates
      </span>
      <div className="overflow-hidden rounded-xl border border-primary/15 bg-white">
        {availabilityStatus === 'error' ? (
          <p className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Calendar sync is temporarily unavailable. Refresh before sending the invoice.
          </p>
        ) : null}
        {availabilityStatus === 'stale' ? (
          <p className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Calendar sync is partially stale. Blocked dates shown may be incomplete.
          </p>
        ) : null}
        <div className="grid grid-cols-2 divide-x rtl:divide-x-reverse divide-primary/10 border-b border-primary/10">
          <button
            type="button"
            onClick={() => handleFieldFocus('checkIn')}
            aria-pressed={activeField === 'checkIn'}
            className={`px-4 py-4 text-start transition ${
              activeField === 'checkIn' ? 'bg-primary/[0.04]' : 'hover:bg-primary/[0.02]'
            }`}
          >
            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-black/50">
              Check-in
            </span>
            <span className="mt-1 block text-sm font-semibold text-black">
              {checkInDate || 'Select date'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => handleFieldFocus('checkOut')}
            aria-pressed={activeField === 'checkOut'}
            className={`px-4 py-4 text-start transition ${
              activeField === 'checkOut' ? 'bg-primary/[0.04]' : 'hover:bg-primary/[0.02]'
            }`}
          >
            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-black/50">
              Check-out
            </span>
            <span className="mt-1 block text-sm font-semibold text-black">
              {checkOutDate || 'Select date'}
            </span>
          </button>
        </div>
        <div className="px-3 pt-4 pb-2 sm:px-6 sm:pt-6">
          <div className="mb-3 flex items-center justify-between px-1 sm:mb-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/55">
              {activeField === 'checkOut' && checkInIso ? 'Pick check-out' : 'Pick check-in'}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={goToPreviousMonth}
                aria-label="Show previous month"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/15 bg-white text-black transition hover:bg-cream/60"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goToNextMonth}
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
            onDayClick={handleDayClick}
            onSelect={keepDayPickerSelectionControlled}
            selected={selectedRange}
            numberOfMonths={1}
            showOutsideDays
            timeZone={BUSINESS_TIME_ZONE}
            defaultMonth={startOfMonthUtc(createDateFromIso(todayIso))}
            hideNavigation
            disabled={disabledDays}
            modifiers={{ unavailable: unavailableDays }}
            modifiersClassNames={{ unavailable: 'booking-calendar-unavailable' }}
            className="booking-calendar-root w-full"
            classNames={getAdminCalendarClassNames()}
          />
        </div>
        {checkInDate || checkOutDate ? (
          <div className="flex items-center justify-end border-t border-primary/10 bg-cream/40 px-5 py-3">
            <button
              type="button"
              onClick={() => onChange({ checkInDate: '', checkOutDate: '' })}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-black underline underline-offset-4 decoration-black/30 hover:decoration-black"
            >
              <X className="h-3.5 w-3.5" />
              Clear dates
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

interface SendResult {
  status: 'sent' | 'preview';
  message: string;
}

interface ReservationQuoteFormProps {
  availabilitySnapshot: AdminAvailabilitySnapshot;
  initialQuote?: ReservationQuoteData;
  sourceContext?: AdminRequestSourceInput | null;
  sourceRequest?: AdminCustomerRequestSummary | null;
}

export default function ReservationQuoteForm({
  availabilitySnapshot,
  initialQuote,
  sourceContext = null,
  sourceRequest = null,
}: ReservationQuoteFormProps) {
  const [data, setData] = useState<ReservationQuoteData>(() =>
    initialQuote ? calculateAdminQuote(initialQuote) : createInitialAdminQuote(),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);
  const blockedDates = useMemo(
    () =>
      getBlockedDatesForAdminApartment(
        data.apartment,
        availabilitySnapshot.blockedDatesByProperty,
      ),
    [availabilitySnapshot.blockedDatesByProperty, data.apartment],
  );
  const availabilityStatus = getAvailabilityStatusForAdminApartment(
    data.apartment,
    availabilitySnapshot.availabilityStatusByProperty,
  );

  function updateData(
    updater: (prev: ReservationQuoteData) => Partial<ReservationQuoteData>,
  ) {
    setData((prev) => calculateAdminQuote({ ...prev, ...updater(prev) }));
  }

  function set<K extends keyof ReservationQuoteData>(key: K, value: ReservationQuoteData[K]) {
    updateData(() => ({ [key]: value }) as Partial<ReservationQuoteData>);
  }

  function setApartment(value: string) {
    const nextApartment = normalizeAdminApartment(value);

    setData((prev) => {
      const next = calculateAdminQuote({ ...prev, apartment: nextApartment });
      const checkIn = parseAdminDateToIso(next.checkInDate);
      const checkOut = parseAdminDateToIso(next.checkOutDate);
      const nextBlockedDates = getBlockedDatesForAdminApartment(
        nextApartment,
        availabilitySnapshot.blockedDatesByProperty,
      );

      if (
        (checkIn && nextBlockedDates.includes(checkIn)) ||
        (checkIn &&
          checkOut &&
          getBlockedStayNights({ checkIn, checkOut }, nextBlockedDates).length > 0)
      ) {
        return calculateAdminQuote({ ...next, checkInDate: '', checkOutDate: '' });
      }

      return next;
    });
  }

  function updateLineItem(index: number, key: keyof ReservationLineItem, value: string) {
    updateData((prev) => ({
      lineItems: prev.lineItems.map((item, i) =>
        i === index ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function addLineItem() {
    updateData((prev) => ({
      lineItems: [...prev.lineItems, { description: '', unit: '', amount: '' }],
    }));
  }

  function removeLineItem(index: number) {
    updateData((prev) => ({
      lineItems: prev.lineItems.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await sendReservationQuote(calculateAdminQuote(data), sourceContext);
      if (response.success && response.status) {
        const next: SendResult = {
          status: response.status,
          message: response.message ?? 'Done.',
        };
        setResult(next);
        if (response.status === 'sent') {
          toast.success('Reservation email sent.');
        } else {
          toast('Email was not delivered.', { icon: '!' });
        }
      } else {
        toast.error(response.error ?? 'Failed to send reservation email.');
      }
    } catch (err) {
      console.error('Send reservation quote failed:', err);
      toast.error('Failed to send reservation email.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {sourceRequest ? (
        <div className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/60">
            Source request
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-head text-2xl font-light tracking-h3 text-black">
                {sourceRequest.title}
              </p>
              <p className="mt-1 text-sm text-black/60">
                {sourceRequest.guestName} · {sourceRequest.dateLabel} · {sourceRequest.amountLabel}
              </p>
            </div>
            <span className="rounded-full border border-primary/15 bg-cream/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {sourceRequest.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      ) : null}

      <Section index="i" title="Document">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Reservation №" value={data.reservationNumber} onChange={(v) => set('reservationNumber', v)} />
          <AdminDateField label="Issued on" value={data.issuedOn} onChange={(v) => set('issuedOn', v)} allowClear={false} />
        </div>
      </Section>

      <Section index="ii" title="Traveller & stay">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Guest name" value={data.guestName} onChange={(v) => set('guestName', v)} />
          <Field label="ID / Passport №" value={data.idPassport} onChange={(v) => set('idPassport', v)} />
          <Field label="Nationality" value={data.nationality} onChange={(v) => set('nationality', v)} />
          <Field label="Contact" value={data.contact} onChange={(v) => set('contact', v)} />
          <SelectField label="Apartment" value={data.apartment} onChange={setApartment} options={ADMIN_APARTMENT_OPTIONS} />
          <Field label="Travellers" value={data.travellers} onChange={(v) => set('travellers', v)} />
          <AdminDateField label="Order date" value={data.orderDate} onChange={(v) => set('orderDate', v)} allowClear={false} />
          <Field label="Nights" value={data.nights} readOnly />
        </div>
      </Section>

      <Section index="iii" title="Check-in & access">
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminStayCalendar
            checkInDate={data.checkInDate}
            checkOutDate={data.checkOutDate}
            blockedDates={blockedDates}
            availabilityStatus={availabilityStatus}
            onChange={(range) => updateData(() => range)}
          />
          <Field label="Check-in time" value={data.checkInTime} onChange={(v) => set('checkInTime', v)} />
          <Field label="Check-out time" value={data.checkOutTime} onChange={(v) => set('checkOutTime', v)} />
          <Field label="Apartment access" value={data.apartmentAccess} onChange={(v) => set('apartmentAccess', v)} />
        </div>
      </Section>

      <Section index="iv" title="Invoice breakdown">
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <Field label="Currency" value={data.currency} onChange={(v) => set('currency', v)} />
        </div>

        <div className="space-y-3">
          {data.lineItems.map((item, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-xl border border-secondary/30 bg-cream/40 p-3 sm:grid-cols-[1fr_7rem_7rem_auto]"
            >
              <Field label="Description" value={item.description} onChange={(v) => updateLineItem(index, 'description', v)} />
              <Field label="Unit" value={item.unit} onChange={(v) => updateLineItem(index, 'unit', v)} />
              <Field label="Amount" value={item.amount} onChange={(v) => updateLineItem(index, 'amount', v)} />
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => removeLineItem(index)}
                  disabled={data.lineItems.length <= 1}
                  aria-label={`Remove line item ${index + 1}`}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border-2 border-secondary/40 text-primary/70 transition-colors hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addLineItem}
          className="mt-3 inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-secondary/50 px-4 py-2 text-sm font-medium text-primary/80 transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add line item
        </button>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field label="Subtotal" value={data.subtotal} readOnly />
          <Field label="Total" value={data.total} readOnly />
        </div>
      </Section>

      <Section index="v" title="Payment status">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Payment method" value={data.paymentMethod} onChange={(v) => set('paymentMethod', v)} />
          <Field label="Deposit paid" value={data.depositPaid} onChange={(v) => set('depositPaid', v)} />
          <AdminDateField label="Paid on" value={data.paidOn} onChange={(v) => set('paidOn', v)} />
          <Field label="Balance due" value={data.balanceDue} readOnly />
          <Field label="Balance remaining" value={data.balanceRemaining} readOnly />
        </div>
      </Section>

      <Section index="vi" title="Closing & delivery">
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70">
              Closing note
            </span>
            <textarea
              value={data.closingNote}
              onChange={(event) => set('closingNote', event.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border-2 border-secondary/40 bg-white px-3 py-2 text-sm text-black outline-none transition-colors duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/10"
            />
          </label>
          <Field
            label="Customer email (recipient)"
            type="email"
            value={data.customerEmail}
            onChange={(v) => set('customerEmail', v)}
            placeholder="customer@example.com"
          />
        </div>
      </Section>

      {result ? (
        <div
          data-testid="send-result"
          data-status={result.status}
          className="rounded-2xl border border-primary/15 bg-white p-5 shadow-sm"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary/60">
            {result.status === 'sent' ? 'Sent' : 'Not delivered'}
          </p>
          <p className="mt-1 text-sm text-black/80">{result.message}</p>
        </div>
      ) : null}

      <div className="sticky bottom-4 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="button-hover-clean inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-cream shadow-xl transition-all duration-300 hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {isSubmitting ? 'Sending…' : 'Send reservation email'}
        </button>
      </div>
    </form>
  );
}
