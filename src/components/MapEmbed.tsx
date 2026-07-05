'use client';

import { useState } from 'react';

import { useLocale } from '@/i18n/useLocale';
import { homeMessages } from '@/i18n/messages/home';

const MAP_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.969106191464!2d34.76409907581854!3d32.07008431977721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4c843acd13ab%3A0xb4aff2902a9ec6dd!2sHaKovshim%2035%2C%20Tel%20Aviv-Jaffa!5e0!3m2!1sfr!2sil!4v1771934464053!5m2!1sfr!2sil';

/**
 * Loads the Google Maps iframe only when the visitor clicks the placeholder.
 * Eliminates the Maps JS, Roboto font and ~147 KB of map image tiles from the
 * page load — they download only on demand.
 */
export default function MapEmbed() {
  const locale = useLocale();
  const t = homeMessages[locale].map;
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full" style={{ height: '450px', minHeight: '400px' }}>
      {loaded ? (
        <iframe
          src={MAP_URL}
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={t.iframeTitle}
        />
      ) : (
        /* Click-to-load placeholder that matches the iframe's visual weight */
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={t.loadAria}
          className="w-full h-full flex flex-col items-center justify-center gap-3 bg-primary/10 hover:bg-primary/15 transition-colors cursor-pointer"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary/70"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-primary/70 text-sm font-body">{t.view}</span>
        </button>
      )}
    </div>
  );
}
