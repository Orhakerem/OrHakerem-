'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

interface LiquidGlassCTAProps {
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export default function LiquidGlassCTA({
  href,
  onClick,
  type = 'button',
  children,
  className = '',
  target,
  rel,
}: LiquidGlassCTAProps) {
  const inner = (
    <>
      <span className="liquid-cta-shadow" aria-hidden="true" />
      <span
        className="liquid-cta-distort"
        aria-hidden="true"
        style={{ backdropFilter: 'url("#liquid-cta-glass")' }}
      />
      <span className="liquid-cta-label">{children}</span>
    </>
  );

  return (
    <>
      {href ? (
        <Link
          href={href}
          className={`liquid-cta ${className}`}
          data-slot="button"
          target={target}
          rel={rel}
        >
          {inner}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className={`liquid-cta ${className}`}
          data-slot="button"
        >
          {inner}
        </button>
      )}

      <svg className="liquid-cta-svg" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id="liquid-cta-glass"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05 0.05"
              numOctaves={1}
              seed={1}
              result="turbulence"
            />
            <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurredNoise"
              scale={70}
              xChannelSelector="R"
              yChannelSelector="B"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
            <feComposite in="finalBlur" in2="finalBlur" operator="over" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
