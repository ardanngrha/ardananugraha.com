/**
 * Accessibility utilities for enhanced detail pages
 */

// Screen reader only text utility
export function srOnly(text: string): string {
  return text;
}

// Generate accessible descriptions for content
export function generateAccessibleDescription(
  type: 'project' | 'writing',
  title: string,
  summary?: string,
  tags?: string[],
  status?: string
): string {
  let description = `${type === 'project' ? 'Project' : 'Article'}: ${title}`;
  
  if (summary) {
    description += `. ${summary}`;
  }
  
  if (status && type === 'project') {
    description += `. Status: ${status.replace('-', ' ')}`;
  }
  
  if (tags && tags.length > 0) {
    const tagType = type === 'project' ? 'Technologies' : 'Tags';
    description += `. ${tagType}: ${tags.join(', ')}`;
  }
  
  return description;
}

// Generate ARIA labels for interactive elements
export function generateAriaLabel(
  action: string,
  target: string,
  context?: string
): string {
  let label = `${action} ${target}`;
  
  if (context) {
    label += ` ${context}`;
  }
  
  return label;
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Focus management utilities
export function trapFocus(element: HTMLElement): () => void {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  function handleTabKey(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }
  
  element.addEventListener('keydown', handleTabKey);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
}

// Announce content changes to screen readers
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  if (typeof window === 'undefined') return;
  
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Keyboard navigation helpers
export function handleKeyboardNavigation(
  event: React.KeyboardEvent,
  onEnter?: () => void,
  onSpace?: () => void,
  onEscape?: () => void
): void {
  switch (event.key) {
    case 'Enter':
      if (onEnter) {
        event.preventDefault();
        onEnter();
      }
      break;
    case ' ':
      if (onSpace) {
        event.preventDefault();
        onSpace();
      }
      break;
    case 'Escape':
      if (onEscape) {
        event.preventDefault();
        onEscape();
      }
      break;
  }
}

// Color contrast utilities
export function getContrastRatio(): number {
  // This is a simplified version - will use a proper color contrast library
  // For now, we'll return a placeholder value
  // TODO

  return 4.5; // WCAG AA standard
}

export function meetsContrastRequirements(
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean {
  const ratio = getContrastRatio();
  const requiredRatio = level === 'AAA' ? 7 : 4.5;
  return ratio >= requiredRatio;
}

// Skip link utilities
export function createSkipLink(targetId: string, text: string): HTMLElement {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'skip-link';
  skipLink.setAttribute('aria-label', `Skip to ${text.toLowerCase()}`);
  
  return skipLink;
}