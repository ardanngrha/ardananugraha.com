import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';
import { ContentNotFoundProps } from '@/types/shared';

export function ContentNotFound({
  type,
  slug,
  className,
}: ContentNotFoundProps) {
  const isProject = type === 'project';
  const contentType = isProject ? 'Project' : 'Article';
  const listingPath = isProject ? '/projects' : '/writings';
  const listingLabel = isProject ? 'Projects' : 'Writings';

  return (
    <main className={cn('min-h-screen bg-background', className)} role="main">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Icon */}
          <div
            className="flex justify-center"
            role="img"
            aria-label="Content not found illustration"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
                {getIcon('FileExcel', 'w-12 h-12 text-muted-foreground')}
              </div>
              <div
                className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center"
                role="img"
                aria-label="Error indicator"
              >
                <span
                  className="text-destructive-foreground text-sm font-bold"
                  aria-hidden="true"
                >
                  !
                </span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {contentType} Not Found
            </h1>
            <p className="text-xl text-muted-foreground" role="status">
              {slug
                ? `The ${contentType.toLowerCase()} "${slug}" doesn't exist or has been moved.`
                : `The ${contentType.toLowerCase()} you're looking for doesn't exist.`}
            </p>
          </div>

          {/* Suggestions */}
          <section
            className="bg-muted/30 rounded-lg p-6 text-left space-y-4"
            aria-labelledby="suggestions-heading"
          >
            <h2 id="suggestions-heading" className="font-semibold text-lg">
              What you can do:
            </h2>
            <ul className="space-y-2 text-muted-foreground" role="list">
              <li className="flex items-start gap-2" role="listitem">
                <span
                  className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>Check the URL for any typos</span>
              </li>
              <li className="flex items-start gap-2" role="listitem">
                <span
                  className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Browse all {listingLabel.toLowerCase()} to find what
                  you&apos;re looking for
                </span>
              </li>
              <li className="flex items-start gap-2" role="listitem">
                <span
                  className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>
                  Use the search functionality to find related content
                </span>
              </li>
              <li className="flex items-start gap-2" role="listitem">
                <span
                  className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>Return to the homepage to explore other sections</span>
              </li>
            </ul>
          </section>

          {/* Action Buttons */}
          <nav
            className="flex flex-col sm:flex-row gap-4 justify-center"
            aria-label="Navigation options"
          >
            <Button
              asChild
              size="lg"
              className="flex items-center gap-2 min-h-[44px] touch-manipulation"
            >
              <Link
                href={listingPath}
                aria-label={`Browse all ${listingLabel.toLowerCase()}`}
              >
                {getIcon('Search', 'w-4 h-4')}
                Browse All {listingLabel}
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="flex items-center gap-2 min-h-[44px] touch-manipulation"
            >
              <Link href="/" aria-label="Go to homepage">
                {getIcon('Home', 'w-4 h-4')}
                Go to Homepage
              </Link>
            </Button>
          </nav>

          {/* Back Navigation */}
          <div className="pt-8 border-t border-border">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground min-h-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Link
                href={listingPath}
                aria-label={`Back to ${listingLabel} listing`}
              >
                {getIcon('ArrowLeft', 'w-4 h-4')}
                Back to {listingLabel}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

// Specialized components for different content types
export function ProjectNotFound({
  slug,
  className,
}: {
  slug?: string;
  className?: string;
}) {
  return <ContentNotFound type="project" slug={slug} className={className} />;
}

export function WritingNotFound({
  slug,
  className,
}: {
  slug?: string;
  className?: string;
}) {
  return <ContentNotFound type="writing" slug={slug} className={className} />;
}
