'use client';

import { useEffect, useState } from 'react';

export function useBackToTopVisibility(threshold = 400) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowBackToTop(window.scrollY > threshold);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return showBackToTop;
}
