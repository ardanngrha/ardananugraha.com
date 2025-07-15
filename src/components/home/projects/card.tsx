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
      <Link href={`/projects/${project.slug}`} className="block h-full group">
        <div className="bg-card/30 border rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-primary/10 hover:border-primary/30 h-full flex flex-col">
          <div className="relative aspect-video overflow-hidden bg-muted/50">
            {project.frontmatter.image ? (
              <Image
                src={project.frontmatter.image as string}
                alt={project.frontmatter.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  Project Image
                </span>
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex gap-2 flex-wrap mb-4">
              {project.frontmatter.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-primary">
              {project.frontmatter.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {project.frontmatter.summary}
            </p>
            <div className="mt-auto pt-4 border-t border-border/50">
              <span className="text-sm text-primary font-semibold group-hover:underline">
                View Details →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}