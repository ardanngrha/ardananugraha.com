'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GradientShadowCardProps {
  children: React.ReactNode;
  className?: string;
  shadowIntensity?: 'light' | 'medium' | 'strong';
  disabled?: boolean;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export const GradientShadowCard = React.forwardRef<
  HTMLDivElement,
  GradientShadowCardProps
>(
  (
    {
      children,
      className,
      shadowIntensity = 'medium',
      disabled = false,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref,
  ) => {
    const shadowRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Performance optimization: Use Intersection Observer to only animate visible elements
    useEffect(() => {
      const container = containerRef.current;
      if (!container || disabled) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Enable animations when element is visible
              container.style.willChange = 'box-shadow, transform';
            } else {
              // Disable animations when element is not visible
              container.style.willChange = 'auto';
            }
          });
        },
        {
          rootMargin: '50px',
          threshold: 0.1,
        },
      );

      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }, [disabled]);

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLDivElement) => {
        containerRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref],
    );

    const intensityClasses = {
      light: 'gradient-shadow-light',
      medium: 'gradient-shadow-medium',
      strong: 'gradient-shadow-strong',
    };

    const shadowIntensityValue =
      shadowIntensity === 'light'
        ? '0.15'
        : shadowIntensity === 'strong'
        ? '0.5'
        : '0.3';

    return (
      <div
        ref={combinedRef}
        className={cn(
          'gradient-shadow-card',
          'relative isolate',
          // Performance optimizations
          'gpu-accelerated',
          'contain-layout',
          // Smooth transitions with GPU acceleration
          'transition-all duration-300 ease-out',
          // Accessibility: ensure focus indicators are not obscured
          'focus-within:z-10',
          // Hover state management
          !disabled && 'group',
          intensityClasses[shadowIntensity],
          className,
        )}
        style={
          {
            '--shadow-intensity': shadowIntensityValue,
            // Optimize for animations
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden' as const,
          } as React.CSSProperties
        }
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedBy}
        {...props}
      >
        {children}

        {/* Gradient shadow overlay with performance optimizations */}
        <div
          ref={shadowRef}
          className={cn(
            // Positioning and layering
            'absolute inset-0 -z-10 rounded-[inherit]',
            // Performance optimizations
            'gpu-accelerated',
            'will-change-[opacity,transform]',
            // Visual properties
            'opacity-0 transition-opacity duration-300 ease-out',
            'pointer-events-none',
            'bg-gradient-to-br from-[var(--shadow-gradient-start)] via-[var(--shadow-gradient-mid)] to-[var(--shadow-gradient-end)]',
            'blur-md scale-105',
            // Hover state - only if not disabled
            !disabled && 'group-hover:opacity-[var(--shadow-intensity)]',
            // Reduced motion support
            'motion-reduce:transition-none motion-reduce:transform-none',
          )}
          aria-hidden="true"
          style={{
            // Additional performance optimizations
            contain: 'layout style paint',
            transform: 'translateZ(0) scale(1.05)',
            filter: `blur(${
              shadowIntensity === 'light'
                ? '8px'
                : shadowIntensity === 'strong'
                ? '16px'
                : '12px'
            })`,
          }}
        />

        {/* Screen reader announcement for shadow state changes */}
        <div
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
          id={ariaDescribedBy}
        >
          {!disabled && 'Interactive card with gradient shadow effect'}
        </div>
      </div>
    );
  },
);

GradientShadowCard.displayName = 'GradientShadowCard';
