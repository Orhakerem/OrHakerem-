'use client';

import { useEffect, useRef, useState } from 'react';

export function useResponsiveCalendarLayout() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [numberOfMonths, setNumberOfMonths] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setNumberOfMonths(mq.matches ? 2 : 1);
    const handler = (e: MediaQueryListEvent) => setNumberOfMonths(e.matches ? 2 : 1);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return { rootRef, numberOfMonths };
}
