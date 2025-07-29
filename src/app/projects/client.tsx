"use client";

import { motion } from "motion/react";
import { ProjectPageCard } from '@/components/projects/project-page-card';
import { ProjectContentItem } from "@/types/projects";

interface ProjectsClientPageProps {
  projects: ProjectContentItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

export function ProjectsClientPage({ projects }: ProjectsClientPageProps) {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        className="space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key="projects-page" // Key ensures animation runs on navigation
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            variants={itemVariants}
            custom={index}
          >
            <ProjectPageCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}