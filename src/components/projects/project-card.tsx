'use client';

import { motion } from 'motion/react';
import { ProjectContentItem } from '@/types/projects';
import Image from 'next/image';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { RippleButton } from '@/components/ui/ripple-button';
import { getIcon } from '@/lib/icons';

interface ProjectCardProps {
  project: ProjectContentItem;
  variant?: 'featured' | 'page';
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 14,
    },
  },
};

export function ProjectCard({
  project,
  variant = 'featured',
}: ProjectCardProps) {
  const { slug, frontmatter } = project;

  return (
    <motion.div
      variants={cardVariants}
      className="w-full"
      initial={variant === 'page' ? 'hidden' : undefined}
      animate={variant === 'page' ? 'visible' : undefined}
    >
      <article className="flex flex-col md:flex-row rounded-2xl overflow-hidden min-h-[240px] transition-all duration-300">
        {/* Content Section - Left */}
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
          {/* Header */}
          <div className="space-y-3">
            {/* Status Badge - Only show if not completed */}
            {frontmatter.status &&
              frontmatter.status !== 'completed' &&
              frontmatter.status !== 'in-progress' && (
                <div className="flex items-center">
                  <span
                    className={`
                  px-3 py-1 rounded-full text-xs font-medium capitalize
                  ${
                    frontmatter.status === 'planned'
                      ? 'bg-gray-500/10 text-gray-500'
                      : ''
                  }
                `}
                  >
                    {frontmatter.status.replace('-', ' ')}
                  </span>
                </div>
              )}

            {/* Title */}
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold text-foreground leading-tight">
                {frontmatter.title}
              </h3>
              {frontmatter.status === 'in-progress' && (
                <span className="px-3 py-1 rounded-full text-xs font-medium capitalize bg-orange-500/10 text-orange-500 border border-orange-500/20">
                  in progress
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed line-clamp-2">
              {frontmatter.summary}
            </p>

            {/* Tech Stack */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {frontmatter.tags.slice(0, 4).map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-1 px-2 py-1 bg-secondary rounded text-xs font-medium"
                    >
                      {getIcon(tech) && (
                        <span className="text-sm">{getIcon(tech)}</span>
                      )}
                      <span>{tech}</span>
                    </div>
                  ))}
                  {frontmatter.tags.length > 4 && (
                    <div className="flex items-center px-2 py-1 bg-secondary rounded text-xs font-medium text-muted-foreground">
                      +{frontmatter.tags.length - 4}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-3 justify-between">
            <div className="flex gap-2">
              {frontmatter.githubUrl && (
                <RippleButton
                  href={frontmatter.githubUrl}
                  variant="outline"
                  className="px-3 py-2 text-xs flex items-center gap-1 custom-cursor"
                  aria-label="View source code"
                >
                  <FaGithub className="h-3 w-3" />
                  Repository
                </RippleButton>
              )}
              {frontmatter.liveUrl && (
                <RippleButton
                  href={frontmatter.liveUrl}
                  variant="outline"
                  className="px-3 py-2 text-xs flex items-center gap-1 custom-cursor"
                  aria-label="View live demo"
                >
                  <FaExternalLinkAlt className="h-3 w-3" />
                  Live Site
                </RippleButton>
              )}
            </div>

            <RippleButton
              href={`/projects/${slug}`}
              variant="outline"
              className="px-4 py-2 text-sm flex items-center gap-2"
            >
              View Project
              <FaArrowRight className="h-3 w-3" />
            </RippleButton>
          </div>
        </div>

        {/* Image Section - Right */}
        <div className="md:w-[40%] lg:w-[35%] relative order-first md:order-last">
          {frontmatter.image ? (
            <div className="relative w-full h-full min-h-[180px] md:min-h-full">
              <Image
                src={frontmatter.image}
                alt={`Screenshot of ${frontmatter.title}`}
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, 35vw"
                priority={variant === 'featured'}
              />
            </div>
          ) : (
            <div className="w-full h-full min-h-[180px] md:min-h-full bg-secondary flex items-center justify-center">
              <span className="text-muted-foreground text-sm">
                No preview available
              </span>
            </div>
          )}
        </div>
      </article>
    </motion.div>
  );
}
