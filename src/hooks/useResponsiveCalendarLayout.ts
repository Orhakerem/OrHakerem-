'use client';

import { useRef } from 'react';

export function useResponsiveCalendarLayout() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  return {
    rootRef,
  };
}
