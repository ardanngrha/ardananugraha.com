import tech_icons from '@/data/tech-icons';
import { JSX } from 'react';

// Create a mapping from tech names to their icons
export const techIconMap: Record<string, JSX.Element> = tech_icons.reduce((acc, tech) => {
  acc[tech.name] = tech.icon;
  return acc;
}, {} as Record<string, JSX.Element>);

// Helper function to get icon for a technology
export function getTechIcon(techName: string): JSX.Element | null {
  return techIconMap[techName] || null;
}