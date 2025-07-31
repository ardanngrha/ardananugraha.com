"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ContentItem } from "./types";
import { GradientShadowCard } from "@/components/ui/gradient-shadow-card";

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
      <GradientShadowCard 
        shadowIntensity="medium"
        aria-label={`Featured writing: ${writing.frontmatter.title}`}
        className="h-full"
      >
        <Link href={`/writings/${writing.slug}`} className="block h-full">
          <div className="bg-card border rounded-2xl p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300">
            {writing.frontmatter.category && (
              <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium self-start mb-4">
                {writing.frontmatter.category}
              </span>
            )}
            <h3 className="text-xl font-semibold mb-2 text-primary">
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
      </GradientShadowCard>
    </motion.div>
  );
}