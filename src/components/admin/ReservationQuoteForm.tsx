'use client';

import { type FormEvent, type ReactNode, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Send, Trash2 } from 'lucide-react';

import { sendReservationQuote } from '@/actions/admin';
import {
  DEFAULT_RESERVATION_QUOTE,
  type ReservationLineItem,
  type ReservationQuoteData,
} from '@/lib/reservation-quote';

const INPUT_CLASS =
  'h-11 w-full rounded-lg border-2 border-secondary/40 bg-white px-3 text-sm text-black placeholder-primary/30 outline-none transition-colors duration-200 focus:border-primary/60 focus:ring-2 focus:ring-primary/10';

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}

function Field({ label, value, onChange, type = 'text', placeholder }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-primary/70">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={INPUT_CLASS}
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

interface SendResult {
  status: 'sent' | 'preview';
  message: string;
  previewHtml?: string;
}

export default function ReservationQuoteForm() {
  const [data, setData] = useState<ReservationQuoteData>(DEFAULT_RESERVATION_QUOTE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);

  function set<K extends keyof ReservationQuoteData>(key: K, value: ReservationQuoteData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function updateLineItem(index: number, key: keyof ReservationLineItem, value: string) {
    setData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item, i) =>
        i === index ? { ...item, [key]: value } : item,
      ),
    }));
  }

  function addLineItem() {
    setData((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, { description: '', unit: '', amount: '' }],
    }));
  }

  function removeLineItem(index: number) {
    setData((prev) => ({
      ...prev,
      lineItems: prev.lineItems.filter((_, i) => i !== index),
    }));
  }

  function openPreview() {
    if (!result?.previewHtml) {
      return;
    }
    const blob = new Blob([result.previewHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank', 'noopener,noreferrer');
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const response = await sendReservationQuote(data);
      if (response.success && response.status) {
        const next: SendResult = {
          status: response.status,
          message: response.message ?? 'Done.',
          previewHtml: response.previewHtml,
        };
        setResult(next);
        if (response.status === 'sent') {
          toast.success('Reservation email sent.');
        } else {
          toast('Email rendered as a preview.', { icon: '📄' });
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
      <Section index="i" title="Document">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Reservation №" value={data.reservationNumber} onChange={(v) => set('reservationNumber', v)} />
          <Field label="Issued on" value={data.issuedOn} onChange={(v) => set('issuedOn', v)} />
        </div>
      </Section>

      <Section index="ii" title="Traveller & stay">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Guest name" value={data.guestName} onChange={(v) => set('guestName', v)} />
          <Field label="ID / Passport №" value={data.idPassport} onChange={(v) => set('idPassport', v)} />
          <Field label="Nationality" value={data.nationality} onChange={(v) => set('nationality', v)} />
          <Field label="Contact" value={data.contact} onChange={(v) => set('contact', v)} />
          <Field label="Apartment" value={data.apartment} onChange={(v) => set('apartment', v)} />
          <Field label="Travellers" value={data.travellers} onChange={(v) => set('travellers', v)} />
          <Field label="Order date" value={data.orderDate} onChange={(v) => set('orderDate', v)} />
          <Field label="Nights" value={data.nights} onChange={(v) => set('nights', v)} />
        </div>
      </Section>

      <Section index="iii" title="Check-in & access">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Check-in date" value={data.checkInDate} onChange={(v) => set('checkInDate', v)} />
          <Field label="Check-in time" value={data.checkInTime} onChange={(v) => set('checkInTime', v)} />
          <Field label="Check-out date" value={data.checkOutDate} onChange={(v) => set('checkOutDate', v)} />
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
          <Field label="Subtotal" value={data.subtotal} onChange={(v) => set('subtotal', v)} />
          <Field label="Total" value={data.total} onChange={(v) => set('total', v)} />
        </div>
      </Section>

      <Section index="v" title="Payment status">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Payment method" value={data.paymentMethod} onChange={(v) => set('paymentMethod', v)} />
          <Field label="Deposit paid" value={data.depositPaid} onChange={(v) => set('depositPaid', v)} />
          <Field label="Paid on" value={data.paidOn} onChange={(v) => set('paidOn', v)} />
          <Field label="Balance due" value={data.balanceDue} onChange={(v) => set('balanceDue', v)} />
          <Field label="Balance remaining" value={data.balanceRemaining} onChange={(v) => set('balanceRemaining', v)} />
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
            {result.status === 'sent' ? 'Sent' : 'Preview'}
          </p>
          <p className="mt-1 text-sm text-black/80">{result.message}</p>
          {result.previewHtml ? (
            <button
              type="button"
              onClick={openPreview}
              className="mt-3 inline-flex items-center gap-2 rounded-full border-2 border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
            >
              View email
            </button>
          ) : null}
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
