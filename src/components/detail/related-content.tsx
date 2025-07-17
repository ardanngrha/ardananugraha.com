'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FaCalendar, FaExternalLinkAlt, FaGithub, FaClock } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import { EnhancedProject, EnhancedWriting } from '@/lib/types';
import { CardImageWithLoading } from './image-with-loading';
import { techIconMap } from '@/components/projects/project-card';

interface RelatedContentProps {
  items: (EnhancedProject | EnhancedWriting)[];
  type: 'projects' | 'writings';
  title?: string;
  maxItems?: number;
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 12 },
  },
  hover: {
    y: -2,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function RelatedContent({
  items,
  type,
  title,
  maxItems = 3,
  className
}: RelatedContentProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const displayItems = items.slice(0, maxItems);
  const isProjects = type === 'projects';
  const defaultTitle = isProjects ? 'Related Projects' : 'Related Articles';
  const viewAllLink = isProjects ? '/projects' : '/writings';

  return (
    <section className={cn('space-y-6', className)} aria-labelledby="related-content-heading">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 id="related-content-heading" className="text-2xl font-bold tracking-tight">
          {title || defaultTitle}
        </h2>
        {items.length > maxItems && (
          <Button variant="ghost" size="sm" asChild>
            <Link
              href={viewAllLink}
              className="text-muted-foreground hover:text-foreground"
              aria-label={`View all ${isProjects ? 'projects' : 'articles'}`}
            >
              View All
            </Link>
          </Button>
        )}
      </div>

      {/* Content Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {displayItems.map((item) => (
          <RelatedContentCard
            key={item.slug}
            item={item}
            type={type}
          />
        ))}
      </motion.div>
    </section>
  );
}

interface RelatedContentCardProps {
  item: EnhancedProject | EnhancedWriting;
  type: 'projects' | 'writings';
}

function RelatedContentCard({ item, type }: RelatedContentCardProps) {
  const { slug, frontmatter, readTime } = item;
  const isProject = type === 'projects';
  const href = isProject ? `/projects/${slug}` : `/writings/${slug}`;
  const projectData = isProject ? (item as EnhancedProject).frontmatter : null;
  const uniqueTags = frontmatter.tags ? [...new Set(frontmatter.tags)] : [];

  return (
    <motion.div variants={cardVariants} whileHover="hover" className="h-full">
      <Link
        href={href}
        className="group block touch-manipulation focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg h-full"
        aria-label={`Read more about ${frontmatter.title}`}
      >
        <article className="bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/30 h-full flex flex-col">
          {/* Image */}
          {frontmatter.image && (
            <div className="group flex-shrink-0 relative aspect-video overflow-hidden" role="img" aria-label={`Featured image for ${frontmatter.title}`}>
              <CardImageWithLoading
                src={frontmatter.image}
                alt={`Featured image for ${frontmatter.title}`}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          <div className="p-4 sm:p-5 space-y-3 flex-1 flex flex-col">
            {/* Status and Featured Badges */}
            <div className="flex flex-wrap gap-2" role="group" aria-label="Content status">
              {frontmatter.featured && (
                <Badge
                  variant="secondary"
                  className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 text-xs"
                  role="status"
                  aria-label="Featured content"
                >
                  ⭐ Featured
                </Badge>
              )}
              {isProject && projectData?.status && (
                <Badge
                  variant="outline"
                  className={cn(
                    'capitalize text-xs',
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
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {frontmatter.title}
            </h3>

            {/* Summary */}
            {frontmatter.summary && (
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {frontmatter.summary}
              </p>
            )}

            {/* Metadata */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto" role="group" aria-label="Content metadata">
              <div className="flex items-center gap-1">
                <FaCalendar className="w-3 h-3" aria-hidden="true" />
                <time dateTime={frontmatter.date} aria-label={`Published ${new Date(frontmatter.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}>
                  {new Date(frontmatter.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
              {!isProject && (
                <div className="flex items-center gap-1">
                  <FaClock className="w-3 h-3" />
                  <span>{readTime} min read</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {uniqueTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3" role="group" aria-label={`${isProject ? 'Technologies' : 'Tags'} used`}>
                {uniqueTags.slice(0, 3).map((tag) => (
                  <div key={tag} className="flex items-center gap-1.5 bg-secondary px-2 py-1 rounded-full text-xs font-medium text-secondary-foreground">
                    {isProject && techIconMap[tag] ? <span className="text-sm">{techIconMap[tag]}</span> : !isProject ? <Badge key={tag} variant="secondary" className="text-xs" role="note" aria-label={`Tag: ${tag}`}>{tag}</Badge> : null}
                    {isProject && <span>{tag}</span>}
                  </div>
                ))}
                {uniqueTags.length > 3 && (
                  <Badge variant="secondary" className="text-xs" role="note" aria-label={`${uniqueTags.length - 3} more ${isProject ? 'technologies' : 'tags'}`}>
                    +{uniqueTags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Project Actions */}
            {isProject && projectData && (projectData.githubUrl || projectData.liveUrl) && (
              <div className="flex gap-2 pt-2 mt-auto" role="group" aria-label="Project links">
                {projectData.githubUrl && (
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-2 text-xs rounded-md gap-1"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(projectData.githubUrl, '_blank', 'noopener,noreferrer');
                    }}
                    aria-label={`View source code for ${frontmatter.title} (opens in new tab)`}
                  >
                    <FaGithub className="w-3 h-3" aria-hidden="true" />
                    Code
                  </button>
                )}
                {projectData.liveUrl && (
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-2 text-xs rounded-md gap-1"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(projectData.liveUrl, '_blank', 'noopener,noreferrer');
                    }}
                    aria-label={`View live demo of ${frontmatter.title} (opens in new tab)`}
                  >
                    <FaExternalLinkAlt className="w-3 h-3" aria-hidden="true" />
                    Demo
                  </button>
                )}
              </div>
            )}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}


// Utility components for specific use cases
export function RelatedProjects({
  projects,
  title,
  maxItems,
  className
}: {
  projects: EnhancedProject[];
  title?: string;
  maxItems?: number;
  className?: string;
}) {
  return (
    <RelatedContent
      items={projects}
      type="projects"
      title={title}
      maxItems={maxItems}
      className={className}
    />
  );
}

export function RelatedWritings({
  writings,
  title,
  maxItems,
  className
}: {
  writings: EnhancedWriting[];
  title?: string;
  maxItems?: number;
  className?: string;
}) {
  return (
    <RelatedContent
      items={writings}
      type="writings"
      title={title}
      maxItems={maxItems}
      className={className}
    />
  );
}