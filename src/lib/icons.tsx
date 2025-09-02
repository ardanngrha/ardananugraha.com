import { icons } from '@/data/icons';
import { cloneElement, isValidElement, JSX } from 'react';

// Create a mapping from tech names to their icons
export const iconMap: Record<string, JSX.Element> = icons.reduce(
  (acc, tech) => {
    acc[tech.name] = tech.icon;
    return acc;
  },
  {} as Record<string, JSX.Element>,
);

// Helper function to get icon for a technology
export function getIcon(techName: string, className = '') {
  const Icon = iconMap[techName];
  if (isValidElement(Icon)) {
    const iconElement = Icon as React.ReactElement<React.ComponentProps<'svg'>>;
    return cloneElement(iconElement, {
      className: [iconElement.props.className, className]
        .filter(Boolean)
        .join(' '),
    });
  }
  return null;
}
