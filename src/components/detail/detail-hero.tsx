import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { EnhancedProject, EnhancedWriting } from '@/lib/types';
import { HeroImageWithLoading } from './image-with-loading';

interface DetailHeroProps {
  item: EnhancedProject | EnhancedWriting;
  type: 'project' | 'writing';
  className?: string;
}

export function DetailHero({ item, type, className }: DetailHeroProps) {
  const { frontmatter } = item;
  const isProject = type === 'project';
  const projectData = isProject ? (item as EnhancedProject).frontmatter : null;

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
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <time dateTime={frontmatter.date} aria-label={`Published on ${new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}>
              {new Date(frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          
          {/* Read Time */}
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" aria-hidden="true" />
            <span aria-label={`Estimated reading time: ${isProject ? item.readTime : (frontmatter as any).readTime || item.readTime} minutes`}>
              {isProject 
                ? `${item.readTime} min read`
                : (frontmatter as any).readTime || `${item.readTime} min read`
              }
            </span>
          </div>

          {/* Writing Category */}
          {!isProject && (frontmatter as any).category && (
            <Badge variant="outline" className="text-xs" role="note" aria-label={`Category: ${(frontmatter as any).category}`}>
              {(frontmatter as any).category}
            </Badge>
          )}
        </div>

        {/* Project Actions */}
        {isProject && projectData && (
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
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
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
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  <span className="font-medium">Live Demo</span>
                </a>
              </Button>
            )}
          </div>
        )}

        {/* Tags */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label={`${isProject ? 'Technologies' : 'Tags'} used in this ${isProject ? 'project' : 'article'}`}>
            {frontmatter.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs" role="note" aria-label={`${isProject ? 'Technology' : 'Tag'}: ${tag}`}>
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Project Bullet Points */}
        {isProject && projectData?.bulletPoints && projectData.bulletPoints.length > 0 && (
          <section className="bg-muted/50 rounded-lg p-6" aria-labelledby="key-features-heading">
            <h3 id="key-features-heading" className="font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2" role="list">
              {projectData.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2" role="listitem">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </header>
  );
}