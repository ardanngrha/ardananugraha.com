'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaChevronRight, FaHome } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
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
  const router = useRouter();

  // Default breadcrumbs based on content type
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    {
      label: type === 'project' ? 'Projects' : 'Writings',
      href: type === 'project' ? '/projects' : '/writings'
    },
  ];

  const allBreadcrumbs = [...defaultBreadcrumbs, ...breadcrumbs];
  const backUrl = type === 'project' ? '/projects' : '/writings';
  const backLabel = type === 'project' ? 'Back to Projects' : 'Back to Writings';

  return (
    <nav className={cn('space-y-3 sm:space-y-4', className)} aria-label="Content navigation">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-1 text-xs sm:text-sm text-muted-foreground overflow-x-auto scrollbar-hide">
        {allBreadcrumbs.map((item, index) => (
          <div key={item.href} className="flex items-center flex-shrink-0">
            {index === 0 && <FaHome className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />}
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

      {/* Back Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <Button
          variant="ghost"
          size="default"
          onClick={() => router.push(backUrl)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground min-h-[44px] touch-manipulation px-4 py-2"
          aria-label={backLabel}
        >
          <FaArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{backLabel}</span>
          <span className="sm:hidden">{type === 'project' ? 'Projects' : 'Writings'}</span>
        </Button>

        {/* Browser Back Button Alternative */}
        <Button
          variant="ghost"
          size="default"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground min-h-[44px] touch-manipulation px-4 py-2"
          aria-label="Go back to previous page"
        >
          <FaArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
      </div>
    </nav>
  );
}