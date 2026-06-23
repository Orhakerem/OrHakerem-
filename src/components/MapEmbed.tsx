'use client';

import { useState, useRef, useEffect } from 'react';

const MAP_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.969106191464!2d34.76409907581854!3d32.07008431977721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4c843acd13ab%3A0xb4aff2902a9ec6dd!2sHaKovshim%2035%2C%20Tel%20Aviv-Jaffa!5e0!3m2!1sfr!2sil!4v1771934464053!5m2!1sfr!2sil';

/**
 * Loads the Google Maps iframe only when the section scrolls into view.
 * Eliminates ~500 KB of Maps JS + Roboto font from the initial homepage load.
 */
export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full"
      style={{ height: '450px', minHeight: '400px' }}
    >
      {loaded ? (
        <iframe
          src={MAP_URL}
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Or Hakerem Location - 35 Hakovshim Street, Tel Aviv"
        />
      ) : (
        /* Placeholder that matches the iframe's visual weight */
        <div
          className="w-full h-full flex items-center justify-center bg-primary/10 cursor-pointer"
          onClick={() => setLoaded(true)}
          role="button"
          aria-label="Load map"
        >
          <span className="text-primary/50 text-sm font-body">Loading map…</span>
        </div>
      )}
    </div>
  );
}
