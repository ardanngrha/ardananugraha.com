import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted',
        className
      )}
    />
  );
}

// Hero section skeleton loader
export function DetailHeroSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Hero Image Skeleton */}
      <Skeleton className="w-full h-64 md:h-80 lg:h-96 rounded-lg" />

      {/* Badges Skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>

      {/* Title Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 md:h-10 lg:h-12 w-3/4" />
        <Skeleton className="h-8 md:h-10 lg:h-12 w-1/2" />
      </div>

      {/* Summary Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-5 w-3/5" />
      </div>

      {/* Metadata Skeleton */}
      <div className="flex gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex gap-3">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-20" />
      </div>

      {/* Tags Skeleton */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-14" />
        <Skeleton className="h-5 w-18" />
      </div>

      {/* Key Features Skeleton (for projects) */}
      <div className="bg-muted/50 rounded-lg p-6 space-y-3">
        <Skeleton className="h-5 w-24" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  );
}

// Main content skeleton loader
export function ContentSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Paragraph blocks */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      {/* Heading */}
      <Skeleton className="h-7 w-2/3 mt-8" />

      {/* More paragraphs */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Code block */}
      <Skeleton className="h-32 w-full rounded-lg" />

      {/* More content */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      {/* Another heading */}
      <Skeleton className="h-7 w-1/2 mt-8" />

      {/* List items */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

// Sidebar metadata skeleton loader
export function SidebarSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Project Details Card */}
      <div className="bg-muted/30 rounded-lg p-6 border border-border space-y-4">
        <Skeleton className="h-4 w-24" />
        <div className="space-y-3">
          <div>
            <Skeleton className="h-3 w-12 mb-1" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div>
            <Skeleton className="h-3 w-16 mb-1" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div>
            <Skeleton className="h-3 w-14 mb-1" />
            <Skeleton className="h-4 w-18" />
          </div>
        </div>

        {/* Links section */}
        <div className="pt-2 border-t border-border space-y-2">
          <Skeleton className="h-3 w-10 mb-3" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Technologies Card */}
      <div className="bg-muted/30 rounded-lg p-6 border border-border space-y-4">
        <Skeleton className="h-4 w-20" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-18" />
        </div>
      </div>

      {/* Share Section */}
      <div className="bg-muted/30 rounded-lg p-6 border border-border space-y-4">
        <Skeleton className="h-4 w-12" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>
    </div>
  );
}

// Related content skeleton loader
export function RelatedContentSkeleton({
  itemCount = 3,
  className
}: {
  title?: string;
  itemCount?: number;
  className?: string;
}) {
  return (
    <section className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-6 w-16" />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: itemCount }).map((_, index) => (
          <RelatedContentCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

// Individual related content card skeleton
function RelatedContentCardSkeleton() {
  return (
    <div className="bg-card border rounded-lg overflow-hidden shadow-sm">
      {/* Image */}
      <Skeleton className="aspect-video w-full" />

      <div className="p-4 space-y-3">
        {/* Badges */}
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
        </div>

        {/* Summary */}
        <div className="space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Metadata */}
        <div className="flex gap-3">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-14" />
        </div>

        {/* Tags */}
        <div className="flex gap-1">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-10" />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-14" />
        </div>
      </div>
    </div>
  );
}

// Navigation skeleton loader
export function NavigationSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex justify-between items-center', className)}>
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  );
}

// Prev/Next navigation skeleton
export function PrevNextNavigationSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex justify-between gap-4', className)}>
      {/* Previous */}
      <div className="flex-1 max-w-sm">
        <div className="bg-card border rounded-lg p-4 space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Next */}
      <div className="flex-1 max-w-sm">
        <div className="bg-card border rounded-lg p-4 space-y-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}

// Image loading skeleton with fade-in effect
export function ImageSkeleton({
  className,
  aspectRatio = "aspect-video"
}: {
  className?: string;
  aspectRatio?: string;
}) {
  return (
    <div className={cn('relative overflow-hidden rounded-lg', aspectRatio, className)}>
      <Skeleton className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    </div>
  );
}

// Complete page skeleton for detail pages
export function DetailPageSkeleton({ type }: { type: 'project' | 'writing' }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <NavigationSkeleton />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pb-8">
        <DetailHeroSkeleton className="mb-12" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <ContentSkeleton />
            </div>

            {/* Sidebar (only for projects) */}
            {type === 'project' && (
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <SidebarSkeleton />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prev/Next Navigation */}
      <div className="container mx-auto px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          <PrevNextNavigationSkeleton />
        </div>
      </div>

      {/* Related Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <RelatedContentSkeleton
            title={type === 'project' ? 'Related Projects' : 'Related Articles'}
            className="border-t border-border pt-16"
          />
        </div>
      </div>
    </div>
  );
}