'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

import GoogleAnalytics from '@/components/GoogleAnalytics';

type ConsentChoice = 'granted' | 'denied';

const STORAGE_KEY = 'cookie-consent';
const OPEN_EVENT = 'open-cookie-settings';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-J0Q3G9CZWW';

function clearAnalyticsCookies() {
  if (typeof document === 'undefined') return;

  const expired = 'Thu, 01 Jan 1970 00:00:00 GMT';
  const host = window.location.hostname;

  document.cookie.split(';').forEach((entry) => {
    const name = entry.split('=')[0]?.trim();

    if (!name || !(name.startsWith('_ga') || name === '_gid' || name === '_gat')) {
      return;
    }

    document.cookie = `${name}=; expires=${expired}; path=/`;
    document.cookie = `${name}=; expires=${expired}; path=/; domain=${host}`;
    document.cookie = `${name}=; expires=${expired}; path=/; domain=.${host}`;
  });
}

// Best-effort withdrawal when a visitor declines after previously accepting:
// flag GA to stop sending hits and clear any analytics cookies already set.
function disableAnalytics() {
  (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = true;
  clearAnalyticsCookies();
}

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState<ConsentChoice | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }

    if (stored === 'granted' || stored === 'denied') {
      setConsent(stored);
    } else {
      setBannerOpen(true);
    }

    const openHandler = () => setBannerOpen(true);
    window.addEventListener(OPEN_EVENT, openHandler);

    return () => window.removeEventListener(OPEN_EVENT, openHandler);
  }, []);

  const persist = (choice: ConsentChoice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* storage unavailable (private mode, blocked) — choice still applies for this session */
    }
  };

  const accept = () => {
    persist('granted');
    setConsent('granted');
    setBannerOpen(false);
  };

  const decline = () => {
    persist('denied');
    setConsent('denied');
    setBannerOpen(false);
    disableAnalytics();
  };

  // Avoid SSR/hydration mismatch — localStorage is only available after mount.
  if (!mounted) return null;

  return (
    <>
      {consent === 'granted' && <GoogleAnalytics />}

      {bannerOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          className="fixed bottom-24 left-3 right-3 z-50 rounded-2xl border border-primary/10 bg-white p-4 shadow-xl sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md sm:p-5"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Cookie className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-head text-base font-semibold text-black">We value your privacy</p>
                <p className="mt-1 text-sm leading-relaxed text-black/70">
                  We use cookies to measure site traffic with Google Analytics. Analytics load only if you
                  accept. See our{' '}
                  <Link
                    href="/privacy"
                    className="font-semibold text-primary underline underline-offset-2 hover:text-primary-light"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="flex gap-2 sm:justify-end">
              <button
                type="button"
                onClick={decline}
                className="flex-1 rounded-full border border-primary/20 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 sm:flex-none"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={accept}
                className="flex-1 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light sm:flex-none"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
