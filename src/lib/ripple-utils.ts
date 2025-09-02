/**
 * Utility functions for ripple effect calculations and positioning
 */

export interface RippleConfig {
  duration: number;
  maxRadius: number;
  startOpacity: number;
  endOpacity: number;
}

export interface RipplePosition {
  x: number;
  y: number;
  radius: number;
}

export interface RippleAnimation {
  id: string;
  x: number;
  y: number;
  radius: number;
  startTime: number;
  duration: number;
}

/**
 * Default configuration for ripple effects
 */
export const DEFAULT_RIPPLE_CONFIG: RippleConfig = {
  duration: 600, // milliseconds
  maxRadius: 100, // pixels
  startOpacity: 0.6,
  endOpacity: 0,
};

/**
 * Calculates the optimal radius for a ripple effect based on element dimensions
 * and click position to ensure the ripple covers the entire element
 */
export function calculateRippleRadius(
  elementWidth: number,
  elementHeight: number,
  clickX: number,
  clickY: number,
  maxRadius?: number,
): number {
  // Calculate distance to each corner
  const topLeft = Math.sqrt(clickX ** 2 + clickY ** 2);
  const topRight = Math.sqrt((elementWidth - clickX) ** 2 + clickY ** 2);
  const bottomLeft = Math.sqrt(clickX ** 2 + (elementHeight - clickY) ** 2);
  const bottomRight = Math.sqrt(
    (elementWidth - clickX) ** 2 + (elementHeight - clickY) ** 2,
  );

  // Use the maximum distance to ensure full coverage
  const calculatedRadius = Math.max(topLeft, topRight, bottomLeft, bottomRight);

  // Apply maximum radius limit if provided
  return maxRadius ? Math.min(calculatedRadius, maxRadius) : calculatedRadius;
}

/**
 * Calculates the position and radius for a ripple effect
 */
export function calculateRipplePosition(
  clickX: number,
  clickY: number,
  elementRect: DOMRect,
  config: Partial<RippleConfig> = {},
): RipplePosition {
  const { maxRadius } = { ...DEFAULT_RIPPLE_CONFIG, ...config };

  // Convert click coordinates to element-relative coordinates
  const x = clickX - elementRect.left;
  const y = clickY - elementRect.top;

  // Calculate optimal radius
  const radius = calculateRippleRadius(
    elementRect.width,
    elementRect.height,
    x,
    y,
    maxRadius,
  );

  return { x, y, radius };
}

/**
 * Creates a unique ID for ripple animations
 */
export function createRippleId(): string {
  return `ripple-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Calculates the current scale and opacity for a ripple animation
 * based on elapsed time and configuration
 */
export function calculateRippleProgress(
  startTime: number,
  currentTime: number,
  duration: number,
  config: Partial<RippleConfig> = {},
): { scale: number; opacity: number; isComplete: boolean } {
  const { startOpacity, endOpacity } = { ...DEFAULT_RIPPLE_CONFIG, ...config };

  const elapsed = currentTime - startTime;
  const progress = Math.min(elapsed / duration, 1);

  // Use easing function for smooth animation
  const easedProgress = easeOutQuart(progress);

  const scale = easedProgress;
  const opacity = startOpacity + (endOpacity - startOpacity) * easedProgress;
  const isComplete = progress >= 1;

  return { scale, opacity, isComplete };
}

/**
 * Easing function for smooth ripple animation
 * Uses ease-out-quart for natural deceleration
 */
export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

/**
 * Calculates CSS transform string for ripple positioning
 */
export function getRippleTransform(
  x: number,
  y: number,
  scale: number,
): string {
  return `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
}

/**
 * Generates CSS styles for a ripple element
 */
export function getRippleStyles(
  position: RipplePosition,
  progress: { scale: number; opacity: number },
  color: string,
): React.CSSProperties {
  return {
    position: 'absolute',
    left: 0,
    top: 0,
    width: position.radius * 2,
    height: position.radius * 2,
    borderRadius: '50%',
    backgroundColor: color,
    opacity: progress.opacity,
    transform: getRippleTransform(position.x, position.y, progress.scale),
    pointerEvents: 'none',
    zIndex: 0,
  };
}

/**
 * Calculates gradient background position based on mouse position
 * for hover ripple effects
 */
export function calculateGradientPosition(
  mouseX: number,
  mouseY: number,
  elementWidth: number,
  elementHeight: number,
): { backgroundPosition: string; backgroundSize: string } {
  // Convert mouse position to percentage
  const xPercent = (mouseX / elementWidth) * 100;
  const yPercent = (mouseY / elementHeight) * 100;

  // Create a larger gradient that follows the mouse
  const backgroundPosition = `${xPercent}% ${yPercent}%`;
  const backgroundSize = '200% 200%';

  return { backgroundPosition, backgroundSize };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
