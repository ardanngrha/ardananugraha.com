'use client';

import Link from 'next/link';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import React from 'react';
import { ContentNavigationProps } from '@/types/shared';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function ContentNavigation({
  type,
  title,
  breadcrumbs = [],
  className,
}: ContentNavigationProps) {
  // Default breadcrumbs based on content type
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    {
      label: type === 'project' ? 'Projects' : 'Writings',
      href: type === 'project' ? '/projects' : '/writings',
    },
  ];

  const allBreadcrumbs = [...defaultBreadcrumbs, ...breadcrumbs];

  return (
    <nav
      className={cn(
        'space-y-3 sm:space-y-4 mt-1 md:mt-4',
        // Ensure the breadcrumb row can calculate shrinking space
        className,
      )}
      aria-label="Content navigation"
    >
      <Breadcrumb>
        <BreadcrumbList className="flex flex-nowrap items-center gap-1 sm:gap-2 w-full min-w-0 overflow-hidden">
          {allBreadcrumbs.map((item, index) => (
            <React.Fragment key={item.href}>
              <BreadcrumbItem className="flex-shrink-0">
                <BreadcrumbLink asChild>
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 whitespace-nowrap"
                  >
                    {index === 0 && (
                      <>{getIcon('HomeOutlined', 'w-4 h-4 sm:w-5 sm:h-5')}</>
                    )}
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="flex-shrink-0" />
            </React.Fragment>
          ))}

          {/* Current page (flexes and truncates) */}
          <BreadcrumbItem className="flex-1 min-w-0">
            <BreadcrumbPage
              className="block w-full truncate whitespace-nowrap"
              title={title} /* Tooltip / full title */
              aria-label={`Current page: ${title}`}
            >
              {title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
