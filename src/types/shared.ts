import { ReactNode } from 'react';
import { EnhancedProject } from './projects';
import { EnhancedWriting } from './writings';

export interface PageHeaderProps {
  title: string;
  description: string;
  background: React.ReactNode;
}

export interface ContentItem {
  slug: string;
  readTime: number;
}

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export interface ContentNavigationProps {
  type: 'project' | 'writing';
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

export interface ContentNotFoundProps {
  type: 'project' | 'writing';
  slug?: string;
  className?: string;
}

export interface TagListProps {
  tags: string[];
  selectedTags?: string[];
  onTagClick?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  showFilter?: boolean;
  contentType?: 'project' | 'writing';
  variant?: 'default' | 'interactive' | 'filter';
  className?: string;
}

export interface ViewCounterProps {
  slug: string;
  type: 'project' | 'writing';
  className?: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface TableOfContentsProps {
  content: string;
  className?: string;
}

export interface ShareButtonsProps {
  title: string;
  url: string;
  description?: string;
  className?: string;
}

export interface ScrollToTopProps {
  className?: string;
  threshold?: number;
}

export interface PrevNextNavigationProps {
  prev: EnhancedProject | EnhancedWriting | null;
  next: EnhancedProject | EnhancedWriting | null;
  contentType: 'project' | 'writing';
  className?: string;
}

export interface ImageWithLoadingProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: string;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: string) => void;
}

export interface MDXErrorBoundaryProps {
  children: ReactNode;
  contentType?: 'project' | 'writing';
  contentTitle?: string;
}

export interface DetailHeroProps {
  item: EnhancedProject | EnhancedWriting;
  type: 'project' | 'writing';
  className?: string;
}

export interface CurrentTrack {
  name: string;
  artist: string;
  isPlaying: boolean;
  albumImageUrl: string;
  songUrl: string;
}
