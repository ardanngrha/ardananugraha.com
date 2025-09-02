'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useMousePosition } from '@/hooks/use-mouse-position';
import {
  useThemeColors,
  createThemeColorProperties,
} from '@/hooks/use-theme-colors';
import {
  calculateRipplePosition,
  createRippleId,
  calculateRippleProgress,
  getRippleStyles,
  calculateGradientPosition,
  DEFAULT_RIPPLE_CONFIG,
  type RippleAnimation,
} from '@/lib/ripple-utils';
import { getSafeAnimationDuration, prefersReducedMotion } from '@/lib/utils';

export interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-live'?: 'off' | 'polite' | 'assertive';
  role?: string;
}

/**
 * RippleButton component with mouse tracking and click ripple effects
 * Supports both button and link functionality with accessibility features
 * Includes theme support and reduced motion preferences
 */
export function RippleButton({
  children,
  onClick,
  href,
  className,
  variant = 'secondary',
  disabled = false,
  type = 'button',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'aria-live': ariaLive,
  role,
  ...props
}: RippleButtonProps) {
  const { mousePosition, elementRef } = useMousePosition({ throttleMs: 16 });
  const themeColors = useThemeColors();
  const [ripples, setRipples] = useState<RippleAnimation[]>([]);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const reducedMotion = prefersReducedMotion();

  // Base styles for the button with enhanced accessibility
  const baseStyles = cn(
    'group relative py-3 px-4 rounded-2xl',
    'flex items-center justify-center gap-2 overflow-hidden',
    'border border-border/50 hover:border-primary/30',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border/50',
    'transition-all duration-200',
    // Enhanced focus styles for better accessibility
    'focus:ring-2 focus:ring-primary/50 focus:ring-offset-2',
    // High contrast mode support
    '@media (prefers-contrast: high) { border-width: 2px }',
    // Touch target size for mobile
    'min-h-[44px] min-w-[44px]',
    // Pressed state
    isPressed && 'scale-95',
    // Focus state
    isFocused && 'ring-2 ring-primary/50 ring-offset-2',
    {
      'bg-secondary/80 hover:bg-secondary text-foreground':
        variant === 'secondary',
      'bg-primary/80 hover:bg-primary text-primary-foreground':
        variant === 'primary',
      'border-border/50 hover:border-primary/30 hover:bg-accent hover:text-accent-foreground':
        variant === 'outline',
    },
    className,
  );

  // Handle click ripple effect with accessibility considerations
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;

      const element = elementRef.current;
      if (!element) return;

      // Only create ripple effect if motion is not reduced
      if (!reducedMotion) {
        const rect = element.getBoundingClientRect();
        const ripplePosition = calculateRipplePosition(
          event.clientX,
          event.clientY,
          rect,
          { maxRadius: Math.max(rect.width, rect.height) },
        );

        const newRipple: RippleAnimation = {
          id: createRippleId(),
          x: ripplePosition.x,
          y: ripplePosition.y,
          radius: ripplePosition.radius,
          startTime: Date.now(),
          duration: getSafeAnimationDuration(DEFAULT_RIPPLE_CONFIG.duration),
        };

        setRipples((prev) => [...prev, newRipple]);
      }

      // Call the provided onClick handler
      if (onClick) {
        onClick();
      }
    },
    [disabled, elementRef, onClick, reducedMotion],
  );

  // Handle keyboard interactions
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (disabled) return;

      // Handle Enter and Space key presses
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsPressed(true);

        // Trigger click for keyboard users
        if (onClick) {
          onClick();
        }
      }
    },
    [disabled, onClick],
  );

  const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsPressed(false);
    }
  }, []);

  // Handle focus states
  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsPressed(false);
  }, []);

  // Handle mouse states for better interaction feedback
  const handleMouseDown = useCallback(() => {
    if (!disabled) {
      setIsPressed(true);
    }
  }, [disabled]);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPressed(false);
  }, []);

  // Animate ripples
  useEffect(() => {
    if (ripples.length === 0) return;

    const animate = () => {
      const currentTime = Date.now();

      setRipples((prev) => {
        const activeRipples = prev.filter((ripple) => {
          const progress = calculateRippleProgress(
            ripple.startTime,
            currentTime,
            ripple.duration,
          );
          return !progress.isComplete;
        });

        return activeRipples;
      });

      if (ripples.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [ripples.length]);

  // Calculate gradient position for hover effect with reduced motion support
  const gradientStyle = React.useMemo(() => {
    if (reducedMotion || !mousePosition.isWithinBounds || !elementRef.current) {
      return {};
    }

    const rect = elementRef.current.getBoundingClientRect();
    const { backgroundPosition, backgroundSize } = calculateGradientPosition(
      mousePosition.x,
      mousePosition.y,
      rect.width,
      rect.height,
    );

    return {
      backgroundImage: `radial-gradient(circle 70px at ${backgroundPosition}, ${themeColors.ripple.primary} 0%, ${themeColors.ripple.secondary} 40%, transparent 70%)`,
      backgroundSize,
      backgroundPosition: backgroundPosition,
      backgroundRepeat: 'no-repeat',
    };
  }, [mousePosition, themeColors.ripple, reducedMotion, elementRef]);

  // Create CSS custom properties for theme colors
  const themeColorProperties = React.useMemo(() => {
    return createThemeColorProperties(themeColors);
  }, [themeColors]);

  // Render ripple animations with accessibility considerations
  const renderRipples = () => {
    if (reducedMotion) return null;

    const currentTime = Date.now();

    return ripples.map((ripple) => {
      const progress = calculateRippleProgress(
        ripple.startTime,
        currentTime,
        ripple.duration,
      );

      if (progress.isComplete) return null;

      const rippleStyles = getRippleStyles(
        { x: ripple.x, y: ripple.y, radius: ripple.radius },
        progress,
        themeColors.ripple.primary,
      );

      return (
        <div
          key={ripple.id}
          style={rippleStyles}
          className="ripple-effect"
          aria-hidden="true"
        />
      );
    });
  };

  // Common button content with accessibility enhancements
  const buttonContent = (
    <>
      {/* Mouse-following hover effect */}
      {!reducedMotion && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={gradientStyle}
          aria-hidden="true"
        />
      )}

      {/* Click ripple effects */}
      <AnimatePresence>{renderRipples()}</AnimatePresence>

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  );

  // Render as link if href is provided
  if (href && !disabled) {
    return (
      <Link
        ref={elementRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseStyles}
        style={themeColorProperties}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        aria-label={ariaLabel}
        aria-describedby={ariaDescribedby}
        aria-live={ariaLive}
        role={role || 'button'}
        tabIndex={0}
        {...props}
      >
        {buttonContent}
      </Link>
    );
  }

  // Render as button
  return (
    <button
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      type={type}
      className={baseStyles}
      style={themeColorProperties}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-live={ariaLive}
      aria-pressed={isPressed}
      role={role}
      {...props}
    >
      {buttonContent}
    </button>
  );
}

// Export default for easier imports
export default RippleButton;
