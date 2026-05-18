'use client';

import { useMemo, useState } from 'react';
import { Plus, MapPin, Home, CalendarCheck, ConciergeBell } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { faqEntries, type FAQEntry } from '@/lib/faq-data';

const CATEGORY_META: Record<
  FAQEntry['category'],
  { description: string; icon: LucideIcon }
> = {
  Location: {
    description: 'The neighborhood, beach access and the streets right outside the door.',
    icon: MapPin,
  },
  Stay: {
    description: 'Apartment amenities, layout and what to expect once you settle in.',
    icon: Home,
  },
  Booking: {
    description: 'Reservations, check-in, payment and cancellation essentials.',
    icon: CalendarCheck,
  },
  Services: {
    description: 'Concierge add-ons and bespoke requests we can take care of for you.',
    icon: ConciergeBell,
  },
};

export default function FAQPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const order: FAQEntry['category'][] = [];
    const map = new Map<FAQEntry['category'], FAQEntry[]>();
    for (const entry of faqEntries) {
      if (!map.has(entry.category)) {
        order.push(entry.category);
        map.set(entry.category, []);
      }
      map.get(entry.category)!.push(entry);
    }
    return order.map((category) => ({ category, items: map.get(category)! }));
  }, []);

  return (
    <div className="relative min-h-screen bg-cream">
      <section className="relative overflow-hidden bg-primary pt-32 pb-20 sm:pt-36 sm:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.55) 0, transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.35) 0, transparent 40%)',
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-medium uppercase tracking-[0.42em] text-white/70 text-[11px] sm:text-xs">
            Guest Handbook · Or HaKerem
          </p>
          <h1 className="mt-6 font-playfair font-bold leading-[1.05] text-white text-[2.5rem] sm:text-6xl lg:text-[4.25rem]">
            Frequently <span className="italic font-normal text-white/85">asked</span>
            <br className="hidden sm:block" /> questions
          </h1>
          <div className="mt-7 flex items-center justify-center gap-3 text-white/60" aria-hidden>
            <span className="h-px w-12 bg-white/40" />
            <span className="text-[10px] uppercase tracking-[0.5em]">{grouped.length} chapters</span>
            <span className="h-px w-12 bg-white/40" />
          </div>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Everything you may want to know before booking your stay — from the neighborhood and the apartments themselves to check-in, policies and the concierge services we can arrange on your behalf.
          </p>
        </div>
      </section>

      <nav
        aria-label="FAQ categories"
        className="border-y border-primary/10 bg-white/70 backdrop-blur"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4 text-sm">
            {grouped.map((group, idx) => {
              const Icon = CATEGORY_META[group.category].icon;
              return (
                <li key={group.category}>
                  <a
                    href={`#cat-${group.category.toLowerCase()}`}
                    className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-primary/70 transition hover:bg-primary/5 hover:text-primary"
                  >
                    <span className="font-mono text-[11px] text-primary/40">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{group.category}</span>
                    <span className="text-[11px] text-primary/40">({group.items.length})</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {grouped.map((group, groupIndex) => {
            const Icon = CATEGORY_META[group.category].icon;
            return (
              <section
                key={group.category}
                id={`cat-${group.category.toLowerCase()}`}
                className="scroll-mt-28 flex flex-col rounded-[1.75rem] border border-primary/10 bg-white shadow-[0_18px_50px_rgba(83,45,36,0.08)]"
              >
                <header className="flex items-start gap-4 border-b border-primary/10 px-6 py-6 sm:px-7">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/5 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary/45">
                        Chapter {String(groupIndex + 1).padStart(2, '0')}
                      </p>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-primary/45">
                        {group.items.length} {group.items.length === 1 ? 'entry' : 'entries'}
                      </span>
                    </div>
                    <h2 className="mt-1 font-playfair text-2xl font-bold text-primary sm:text-[1.7rem]">
                      {group.category}
                    </h2>
                    <p className="mt-1.5 text-sm leading-6 text-primary/65">
                      {CATEGORY_META[group.category].description}
                    </p>
                  </div>
                </header>

                <ul className="flex-1 divide-y divide-primary/10 px-6 sm:px-7">
                  {group.items.map((faq, index) => {
                    const key = `${group.category}-${index}`;
                    const isOpen = openKey === key;
                    return (
                      <li key={key}>
                        <button
                          type="button"
                          className="tap-reset group flex w-full items-start gap-4 py-4 text-left"
                          onClick={() => setOpenKey(isOpen ? null : key)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-${key}`}
                        >
                          <span className="font-mono text-[11px] text-primary/40 pt-1 w-6 shrink-0">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="flex-1 font-playfair text-base font-semibold leading-snug text-primary sm:text-[17px]">
                            {faq.question}
                          </span>
                          <span
                            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                              isOpen
                                ? 'rotate-45 border-primary bg-primary text-white'
                                : 'border-primary/25 bg-white text-primary group-hover:border-primary/60'
                            }`}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </span>
                        </button>
                        <div
                          id={`faq-${key}`}
                          className={`grid overflow-hidden transition-all duration-500 ease-out ${
                            isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="min-h-0 pl-10">
                            <div className="border-l-2 border-primary/15 pl-4 text-[15px] leading-7 text-primary/75">
                              {faq.answer}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-primary/10 bg-white px-6 py-8 text-center shadow-[0_18px_50px_rgba(83,45,36,0.08)] sm:px-10 sm:py-10">
          <p className="font-playfair text-xl text-primary sm:text-2xl">
            Didn&apos;t find what you were looking for?
          </p>
          <p className="mt-2 text-sm text-primary/65 sm:text-base">
            Write to us at{' '}
            <a
              href="mailto:keremliving@gmail.com"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              keremliving@gmail.com
            </a>{' '}
            — we usually reply within a few hours.
          </p>
        </div>
      </div>
    </div>
  );
}
