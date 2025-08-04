"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { formatRelativeDate, isRecent } from "@/lib/utils";
import { MdAccessTime } from "react-icons/md";
import { WritingContentItem } from "@/types/writings";

interface WritingCardProps {
  writing: WritingContentItem;
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 15,
      duration: 0.4
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20
    },
  }
};

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 15
    }
  }
};

export function WritingCard({ writing }: WritingCardProps) {
  const { slug, frontmatter } = writing;
  const recent = isRecent(frontmatter.date);
  // Calculate read time (simple estimation)
  const readTime = Math.max(1, Math.ceil((frontmatter.summary?.length || 0) / 200)) + 5;

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="rounded-2xl"
      layout
    >
      <Link href={`/writings/${slug}`} className="group block">
        <article className="grid grid-cols-1 md:grid-cols-12 gap-x-6 items-center p-4 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300">

          {/* Image block */}
          <motion.div
            className="col-span-12 md:col-span-3"
            variants={imageVariants}
          >
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-4 md:mb-0">
              {frontmatter.image ? (
                <Image
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  fill
                  className="object-cover transition-all duration-300 group-hover:brightness-110"
                  priority
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">No image</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Content block */}
          <div className="col-span-12 md:col-span-9 flex flex-col h-full">
            <motion.div
              className="flex items-center gap-2 text-sm text-muted-foreground mb-2 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span>{new Date(frontmatter.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <span>({formatRelativeDate(frontmatter.date)})</span>
              {recent && (
                <motion.span
                  className="text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full text-xs font-semibold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                >
                  Recently released
                </motion.span>
              )}
            </motion.div>

            <motion.h2
              className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors duration-300 mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {frontmatter.title}
            </motion.h2>

            <motion.p
              className="text-muted-foreground leading-normal mb-4 line-clamp-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {frontmatter.summary}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-between mt-auto text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <MdAccessTime className="inline-block text-muted-foreground text-base" />
                <span className="text-muted-foreground whitespace-nowrap text-sm">{readTime} min read</span>
              </div>

              <div className="flex gap-2 flex-wrap justify-start sm:justify-end text-xs">
                {frontmatter.tags?.slice(0, 3).map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-mono lowercase"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.25 + (index * 0.05),
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
                {frontmatter.tags && frontmatter.tags.length > 3 && (
                  <motion.span
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-mono"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.4,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    +{frontmatter.tags.length - 3}
                  </motion.span>
                )}
              </div>
            </motion.div>
          </div>

        </article>
      </Link>
    </motion.div>
  );
}