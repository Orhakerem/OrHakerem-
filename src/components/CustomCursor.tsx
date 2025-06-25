'use client';

import { useEffect, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    if (typeof document !== 'undefined') {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);

      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseenter', onMouseEnter);
        document.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, []);

  if (!isVisible || typeof window === 'undefined') return null;

  return (
    <div
      className="custom-cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}