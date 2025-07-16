import Link from 'next/link'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { EnhancedProject, EnhancedWriting } from '@/lib/types'
import { cn } from '@/lib/utils'

interface PrevNextNavigationProps {
  prev: EnhancedProject | EnhancedWriting | null
  next: EnhancedProject | EnhancedWriting | null
  contentType: 'project' | 'writing'
  className?: string
}

export function PrevNextNavigation({
  prev,
  next,
  contentType,
  className
}: PrevNextNavigationProps) {
  const basePath = contentType === 'project' ? '/projects' : '/writings'

  if (!prev && !next) {
    return null
  }

  return (
    <nav
      className={cn(
        'flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 py-6 sm:py-8 border-t border-border',
        className
      )}
      aria-label="Previous and next navigation"
    >
      {/* Previous Item */}
      <div className="flex-1 max-w-full sm:max-w-[calc(50%-0.5rem)]">
        {prev ? (
          <Link
            href={`${basePath}/${prev.slug}`}
            className="group flex items-center gap-3 p-4 sm:p-5 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 min-h-[80px] touch-manipulation"
          >
            <div className="flex-shrink-0">
              <FaChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm text-muted-foreground mb-1 font-medium">
                Previous {contentType}
              </div>
              <div className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {prev.frontmatter.title}
              </div>
              {prev.frontmatter.summary && (
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 line-clamp-1 sm:line-clamp-2">
                  {prev.frontmatter.summary}
                </div>
              )}
            </div>
          </Link>
        ) : (
          <div className="p-4 sm:p-5 min-h-[80px]">
            {/* Empty space to maintain layout balance */}
          </div>
        )}
      </div>

      {/* Next Item */}
      <div className="flex-1 max-w-full sm:max-w-[calc(50%-0.5rem)]">
        {next ? (
          <Link
            href={`${basePath}/${next.slug}`}
            className="group flex items-center gap-3 p-4 sm:p-5 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 text-left sm:text-right min-h-[80px] touch-manipulation"
          >
            <div className="min-w-0 flex-1 sm:order-1">
              <div className="text-xs sm:text-sm text-muted-foreground mb-1 font-medium">
                Next {contentType}
              </div>
              <div className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {next.frontmatter.title}
              </div>
              {next.frontmatter.summary && (
                <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2 line-clamp-1 sm:line-clamp-2">
                  {next.frontmatter.summary}
                </div>
              )}
            </div>
            <div className="flex-shrink-0 sm:order-2">
              <FaChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        ) : (
          <div className="p-4 sm:p-5 min-h-[80px]">
            {/* Empty space to maintain layout balance */}
          </div>
        )}
      </div>
    </nav>
  )
}