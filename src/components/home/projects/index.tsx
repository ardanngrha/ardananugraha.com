import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { FaWindowRestore } from "react-icons/fa";
import { ProjectCard } from "./project-featured-card";
import { ProjectContentItem } from "@/types/projects";

interface ProjectsSectionProps {
  projects: ProjectContentItem[];
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

export default function ProjectsSection({
  projects,
  loading,
}: ProjectsSectionProps) {
  return (
    <section className="py-16">
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <FaWindowRestore className="w-8 h-8" />
          Featured <span className="gradient-text">Works</span>
        </h2>
        {/* -- MORE BUTTON FOR DESKTOP -- */}
        <Button variant="outline" className="hidden md:inline-flex">
          <Link href="/projects" className="inline-flex items-center gap-2">
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
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-gray-50 dark:bg-zinc-800/50 rounded-2xl p-4 animate-pulse"
            >
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-20 bg-muted rounded-full"></div>
                <div className="h-6 w-24 bg-muted rounded-full"></div>
              </div>
              <div className="aspect-[16/10] bg-muted rounded-lg mb-4"></div>
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
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </motion.div>
      )}
      {/* -- MORE BUTTON FOR MOBILE -- */}
      <div className="flex justify-center mt-8 md:hidden">
        <Button variant="outline" asChild>
          <Link href="/projects" className="inline-flex items-center gap-2">
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