'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type MetaPixelFunction = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
  push: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
    __orHakeremMetaPixelIds?: string[];
    __orHakeremMetaLastPageView?: string;
  }
}

const META_PIXEL_SCRIPT_ID = 'or-hakerem-meta-pixel';

function ensureMetaPixel(pixelId: string) {
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod(...args);
      } else {
        fbq.queue.push(args);
      }
    } as MetaPixelFunction;

    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
  }

  if (!document.getElementById(META_PIXEL_SCRIPT_ID)) {
    const script = document.createElement('script');
    script.id = META_PIXEL_SCRIPT_ID;
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }

  window.__orHakeremMetaPixelIds ??= [];

  if (!window.__orHakeremMetaPixelIds.includes(pixelId)) {
    window.fbq('init', pixelId);
    window.__orHakeremMetaPixelIds.push(pixelId);
  }

  window.fbq('consent', 'grant');
}

export default function MetaPixel() {
  const pathname = usePathname();
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || '4487337044917960';

  useEffect(() => {
    ensureMetaPixel(pixelId);
  }, [pixelId]);

  useEffect(() => {
    ensureMetaPixel(pixelId);

    const route = `${window.location.pathname}${window.location.search}`;

    if (window.__orHakeremMetaLastPageView === route) {
      return;
    }

    window.fbq?.('track', 'PageView');
    window.__orHakeremMetaLastPageView = route;
  }, [pathname, pixelId]);

  return null;
}
