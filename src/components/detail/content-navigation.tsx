'use client';

import Link from 'next/link';
import { HiOutlineHome } from 'react-icons/hi';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb';

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
      <Breadcrumb>
        <BreadcrumbList>
          {allBreadcrumbs.map((item, index) => (
            <BreadcrumbItem key={item.href}>
              {index === 0 && <HiOutlineHome className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />}
              <BreadcrumbLink asChild>
                <Link href={item.href}>{item.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}