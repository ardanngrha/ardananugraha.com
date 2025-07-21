import Link from "next/link";
import { motion } from "motion/react";
import { ContentItem } from "./types";

interface WritingCardProps {
  writing: ContentItem;
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 14,
    },
  },
};

export function WritingCard({ writing }: WritingCardProps) {
  return (
    <motion.div variants={cardVariants}>
      <Link href={`/writings/${writing.slug}`} className="block h-full">
        <div className="bg-white dark:bg-zinc-800/50 rounded-2xl p-6 flex flex-col h-full ring-1 ring-inset ring-gray-200 dark:ring-zinc-700/50 hover:ring-primary/50 dark:hover:ring-primary/50 transition-all duration-300 hover:shadow-2xl">
          {writing.frontmatter.category && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium self-start mb-4">
              {writing.frontmatter.category}
            </span>
          )}
          <h3 className="text-xl font-semibold mb-2">
            {writing.frontmatter.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {writing.frontmatter.summary}
          </p>
          <div className="text-xs text-muted-foreground mt-auto">
            {new Date(writing.frontmatter.date).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}