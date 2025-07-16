'use client';

import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ContentNavigationProps {
  type: 'project' | 'writing';
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

export function ContentNavigation({
  type,
  title,
  breadcrumbs = [],
  className
}: ContentNavigationProps) {

  // Default breadcrumbs based on content type
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    {
      label: type === 'project' ? 'Projects' : 'Writings',
      href: type === 'project' ? '/projects' : '/writings'
    },
  ];

  const allBreadcrumbs = [...defaultBreadcrumbs, ...breadcrumbs];

  return (
    <nav className={cn('space-y-3 sm:space-y-4', className)} aria-label="Content navigation">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-1 text-xs sm:text-sm text-muted-foreground overflow-x-auto scrollbar-hide">
        {allBreadcrumbs.map((item, index) => (
          <div key={item.href} className="flex items-center flex-shrink-0">
            {index === 0 && <HiOutlineHome className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />}
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors whitespace-nowrap min-h-[44px] flex items-center touch-manipulation"
              aria-label={`Maps to ${item.label}`}
            >
              {item.label}
            </Link>
            {index < allBreadcrumbs.length - 1 && (
              <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 flex-shrink-0" aria-hidden="true" />
            )}
          </div>
        ))}
        {/* Current page */}
        <div className="flex items-center flex-shrink-0">
          <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1" aria-hidden="true" />
          <span className="text-foreground font-medium truncate max-w-[150px] sm:max-w-xs" title={title}>
            {title}
          </span>
        </div>
      </div>
    </nav>
  );
}