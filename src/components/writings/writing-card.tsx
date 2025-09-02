'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { formatRelativeDate, isRecent } from '@/lib/utils';
import { EnhancedWriting } from '@/types/writings';
import { getIcon } from '@/lib/icons';

interface WritingCardProps {
  writing: EnhancedWriting;
  variant?: 'featured' | 'page';
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 15,
      duration: 0.4,
    },
  },
  hover: {
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

const imageVariants = {
  hover: {
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 15,
    },
  },
};

export function WritingCard({
  writing,
  variant = 'featured',
}: WritingCardProps) {
  const { slug, frontmatter, readTime } = writing;
  const recent = isRecent(frontmatter.date);

  return (
    <motion.div
      variants={cardVariants}
      initial={variant === 'page' ? 'hidden' : undefined}
      animate={variant === 'page' ? 'visible' : undefined}
      whileHover="hover"
      className="rounded-2xl"
      layout
    >
      <Link href={`/writings/${slug}`} className="group block">
        <article className="grid grid-cols-1 md:grid-cols-12 gap-x-6 items-center p-4">
          {/* Image block */}
          <motion.div
            className="col-span-12 md:col-span-4"
            variants={imageVariants}
          >
            <div className="relative aspect-[16/11] rounded-lg overflow-hidden mb-4 md:mb-0">
              {frontmatter.image ? (
                <Image
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  fill
                  className="object-cover transition-all duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={variant === 'featured'}
                />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">
                    No image
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Content block */}
          <div className="col-span-12 md:col-span-8 flex flex-col h-full">
            <motion.div
              className="flex items-center gap-2 text-sm text-muted-foreground mb-1.5 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span>
                {new Date(frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
              <span>({formatRelativeDate(frontmatter.date)})</span>
              {recent && (
                <motion.span
                  className="text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full text-xs font-semibold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                    delay: 0.2,
                  }}
                >
                  Recently released
                </motion.span>
              )}
            </motion.div>
            <motion.h2
              className="text-xl font-bold group-hover:text-primary group-hover:underline transition-colors duration-300 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {frontmatter.title}
            </motion.h2>
            <motion.p
              className="text-muted-foreground leading-normal mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {frontmatter.summary}
            </motion.p>
            <motion.div
              className="flex flex-col md:flex-row gap-4 justify-between mt-auto text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {getIcon(
                  'Time',
                  'inline-block text-muted-foreground text-base',
                )}
                <span className="text-muted-foreground whitespace-nowrap text-xs">
                  {readTime} min read
                </span>
              </motion.div>
              <div className="flex gap-2 flex-wrap justify-start md:justify-end text-xs">
                {frontmatter.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-mono lowercase"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.25 + index * 0.05,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
