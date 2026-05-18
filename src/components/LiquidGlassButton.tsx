'use client';

import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface LiquidGlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function LiquidGlassButton({
  children,
  className = '',
  ...props
}: LiquidGlassButtonProps) {
  return (
    <>
      <button
        {...props}
        data-slot="button"
        className={`liquid-glass-btn ${className}`}
      >
        <span className="liquid-glass-btn-shadow" aria-hidden="true" />
        <span
          className="liquid-glass-btn-distort"
          aria-hidden="true"
          style={{ backdropFilter: 'url("#liquid-glass-btn-filter")' }}
        />
        <span className="liquid-glass-btn-label">{children}</span>
      </button>

      <svg className="liquid-glass-btn-svg" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id="liquid-glass-btn-filter"
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
