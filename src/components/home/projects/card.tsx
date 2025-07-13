import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ContentItem } from "./types";

interface ProjectCardProps {
  project: ContentItem;
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

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div variants={cardVariants}>
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <div className="bg-white dark:bg-zinc-800/50 rounded-2xl p-4 flex flex-col h-full ring-1 ring-inset ring-gray-200 dark:ring-zinc-700/50 hover:ring-primary/50 dark:hover:ring-primary/50 transition-all duration-300 hover:shadow-2xl">
          <div className="flex gap-2 flex-wrap mb-4">
            {project.frontmatter.tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="aspect-[16/10] rounded-lg overflow-hidden mb-4 relative bg-muted">
            {project.frontmatter.image ? (
              <Image
                src={project.frontmatter.image as string}
                alt={project.frontmatter.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  Project Image
                </span>
              </div>
            )}
          </div>
          <div className="mt-auto flex flex-col">
            <h3 className="text-xl font-semibold mb-2">
              {project.frontmatter.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.frontmatter.summary}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}