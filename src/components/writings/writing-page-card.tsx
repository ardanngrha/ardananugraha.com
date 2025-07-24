"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { formatRelativeDate, isRecent } from "@/lib/utils";
import { EnhancedWriting } from "@/types/writings";
import { MdAccessTime } from "react-icons/md";

interface WritingCardProps {
  writing: EnhancedWriting;
}

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: {
    y: -5,
    boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  }
};

export function WritingCard({ writing }: WritingCardProps) {
  const { slug, frontmatter, readTime } = writing;
  const recent = isRecent(frontmatter.date);

  return (
    <motion.div variants={cardVariants} initial="initial" animate="animate" whileHover="hover" className="rounded-2xl">
      <Link href={`/writings/${slug}`} className="group block">
        <article className="grid grid-cols-1 md:grid-cols-12 gap-x-6 items-center p-4">

          {/* Image block */}
          <motion.div
            className="col-span-12 md:col-span-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="relative aspect-[16/11] rounded-lg overflow-hidden mb-4 md:mb-0">
              {frontmatter.image ? (
                <Image
                  src={frontmatter.image}
                  alt={frontmatter.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">No image</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Content block */}
          <div className="col-span-12 md:col-span-8 flex flex-col h-full">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1.5 flex-wrap">
              <span>{new Date(frontmatter.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <span>({formatRelativeDate(frontmatter.date)})</span>
              {recent && (
                <span className="text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full text-xs font-semibold">
                  Recently released
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold group-hover:text-primary transition-colors duration-300 mb-2">
              {frontmatter.title}
            </h2>
            <p className="text-muted-foreground leading-normal mb-4">
              {frontmatter.summary}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-between mt-auto text-sm">
              <div className="flex items-center gap-2">
                <MdAccessTime className="inline-block text-muted-foreground text-base" />
                <span className="text-muted-foreground whitespace-nowrap text-xs">{readTime} min read</span>
              </div>
              <div className="flex gap-2 flex-wrap justify-start md:justify-end text-xs">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-mono lowercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </article>
      </Link>
    </motion.div>
  );
}