'use client';

import { Badge } from '@/components/ui/badge';
import {
  FiCalendar,
  FiClock,
  FiExternalLink,
  FiGithub,
} from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EnhancedProject } from '@/types/projects';
import { EnhancedWriting } from '@/types/writings';
import { HeroImageWithLoading } from './image-with-loading';
import { SimpleTags } from './tag-list';

interface DetailHeroProps {
  item: EnhancedProject | EnhancedWriting;
  type: 'project' | 'writing';
  className?: string;
}

export function DetailHero({ item, type, className }: DetailHeroProps) {
  const { frontmatter } = item;
  const isProject = type === 'project';
  const projectData = isProject ? (item as EnhancedProject).frontmatter : null;
  const writingData = !isProject ? (item as EnhancedWriting).frontmatter : null;

  return (
    <header className={cn('relative overflow-hidden', className)} role="banner">
      {/* Hero Image */}
      {frontmatter.image && (
        <div className="mb-8" role="img" aria-label={`Featured image for ${frontmatter.title}`}>
          <HeroImageWithLoading
            src={frontmatter.image}
            alt={`Featured image for ${frontmatter.title}`}
            className="rounded-lg"
          />
        </div>
      )}

      {/* Content */}
      <div className="space-y-6">
        {/* Status and Featured Badges */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Content status and badges">
          {frontmatter.featured && (
            <Badge
              variant="secondary"
              className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
              role="status"
              aria-label="This content is featured"
            >
              ⭐ Featured
            </Badge>
          )}
          {isProject && projectData?.status && (
            <Badge
              variant="outline"
              className={cn(
                'capitalize',
                projectData.status === 'completed' && 'bg-green-500/10 text-green-500 border-green-500/20',
                projectData.status === 'in-progress' && 'bg-blue-500/10 text-blue-500 border-blue-500/20',
                projectData.status === 'planned' && 'bg-gray-500/10 text-gray-500 border-gray-500/20'
              )}
              role="status"
              aria-label={`Project status: ${projectData.status.replace('-', ' ')}`}
            >
              {projectData.status.replace('-', ' ')}
            </Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
          {frontmatter.title}
        </h1>

        {/* Summary */}
        {frontmatter.summary && (
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl">
            {frontmatter.summary}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base text-muted-foreground" role="group" aria-label="Content metadata">
          <div className="flex items-center gap-1">
            <FiCalendar className="w-4 h-4" aria-hidden="true" />
            <time dateTime={frontmatter.date} aria-label={`Published on ${new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}>
              {new Date(frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          {/* Read Time */}
          {!isProject && (
            <div className="flex items-center gap-1">
              <FiClock className="w-4 h-4" aria-hidden="true" />
              <span aria-label={`Estimated reading time: ${item.readTime} minutes`}>
                {`${item.readTime} min read`}
              </span>
            </div>
          )}

          {/* Writing Category */}
          {!isProject && writingData?.category && (
            <Badge variant="outline" className="text-xs" role="note" aria-label={`Category: ${writingData.category}`}>
              {writingData.category}
            </Badge>
          )}
        </div>

        {/* Project Actions */}
        {isProject && projectData && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4" role="group" aria-label="Project links and actions">
              {projectData.githubUrl && (
                <Button asChild variant="default" size="default" className="min-h-[44px] touch-manipulation">
                  <a
                    href={projectData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3"
                    aria-label={`View source code for ${frontmatter.title} on GitHub (opens in new tab)`}
                  >
                    <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    <span className="font-medium">View Code</span>
                  </a>
                </Button>
              )}
              {projectData.liveUrl && (
                <Button asChild variant="outline" size="default" className="min-h-[44px] touch-manipulation">
                  <a
                    href={projectData.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3"
                    aria-label={`View live demo of ${frontmatter.title} (opens in new tab)`}
                  >
                    <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    <span className="font-medium">Live Demo</span>
                  </a>
                </Button>
              )}
            </div>

            {/* Technologies for projects */}
            {projectData.tags && projectData.tags.length > 0 && (
              <div className="mt-6">
                <SimpleTags
                  tags={projectData.tags}
                  className="pointer-events-none select-none"
                />
              </div>
            )}
          </div>
        )}

        {/* Tags for writings */}
        {!isProject && frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Tags for this article">
            {frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs" role="note" aria-label={`Tag: ${tag}`}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}