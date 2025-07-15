"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { formatRelativeDate, isRecent } from "@/lib/utils";
import { Writing } from "@/lib/posts";
import { MdAccessTime } from "react-icons/md";

interface WritingCardProps {
  writing: Writing;
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
    <motion.div variants={cardVariants} initial="initial" animate="animate" whileHover="hover">
      <Link href={`/writings/${slug}`} className="group block p-1">
        {/* Main container: Flex for mobile, Grid for desktop */}
        <article className="flex flex-col md:grid md:grid-cols-6 md:gap-x-5 md:items-center">

          {/* Top content block: Date and Title */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1.5 flex-wrap">
              <span>{new Date(frontmatter.date).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })}</span>
              <span>({formatRelativeDate(frontmatter.date)})</span>
              {recent && (
                <span className="text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full text-xs font-semibold">
                  Recently released
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
              {frontmatter.title}
            </h2>
          </div>

          {/* Image block: Appears after title on mobile and in its own column on desktop */}
          <motion.div
            className="my-4 md:my-0 md:col-span-2 md:col-start-5 md:row-start-1 md:row-span-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="relative aspect-[16/11] rounded-lg overflow-hidden">
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </motion.div>

          {/* Bottom content block: Summary and Footer */}
          <div className="md:col-span-4">
            <p className="text-muted-foreground mt-1.5 leading-normal">
              {frontmatter.summary}
            </p>
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between mt-5 md:mt-10 text-sm">
              <div className="flex items-center gap-2">
                <MdAccessTime className="inline-block text-indigo-400 text-base" />
                <span className="text-muted-foreground whitespace-nowrap pr-4 text-xs">{readTime} min read</span>
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