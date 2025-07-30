import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { FaFileSignature } from "react-icons/fa";
import { WritingCard } from "./writing-featured-card";
import { ContentItem } from "./types";

interface WritingsSectionProps {
  writings: ContentItem[];
  loading: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function WritingsSection({
  writings,
  loading,
}: WritingsSectionProps) {
  return (
    <section className="py-16">
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-3 gradient-text pb-2">
          <FaFileSignature className="w-8 h-8" />
          Featured Writings
        </h2>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-4 animate-pulse"
            >
              <div className="h-6 w-20 bg-muted rounded-full mb-4"></div>
              <div className="h-6 bg-muted rounded mb-2 w-3/4"></div>
              <div className="h-10 bg-muted rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {writings.map((writing) => (
            <WritingCard key={writing.slug} writing={writing} />
          ))}
        </motion.div>
      )}
      
      <div className="flex justify-center mt-8">
        <Button variant="outline" asChild>
          <Link href="/writings" className="inline-flex items-center gap-2">
            More
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </Button>
      </div>
    </section>
  );
}