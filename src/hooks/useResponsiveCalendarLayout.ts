'use client';

import { useEffect, useRef, useState } from 'react';

export function useResponsiveCalendarLayout() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [showTwoMonths, setShowTwoMonths] = useState(false);

  useEffect(() => {
    const rootElement = rootRef.current;

    if (!rootElement) {
      return;
    }

    function syncLayout(width: number) {
      setShowSidePanel(width >= 960);
      setShowTwoMonths(width >= 860);
    }

    syncLayout(rootElement.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (!entry) {
        return;
      }

      syncLayout(entry.contentRect.width);
    });

    observer.observe(rootElement);

    return () => observer.disconnect();
  }, []);

  return {
    rootRef,
    showSidePanel,
    showTwoMonths,
  };
}
