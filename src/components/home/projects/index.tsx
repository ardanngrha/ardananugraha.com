import { motion } from "motion/react";
import { CgCodeSlash } from "react-icons/cg";
import { ProjectCard } from "./project-featured-card";
import { ProjectContentItem } from "@/types/projects";
import { RippleButton } from "@/components/ui/ripple-button";

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
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold flex items-center gap-3 gradient-text pb-2">
          <CgCodeSlash className="w-8 h-8" />
          Featured Works
        </h2>
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

      <div className="flex justify-center mt-8">
        <RippleButton
          href="/projects"
          variant="outline"
          className="px-6 py-3 w-auto flex-initial"
          aria-label="View all my projects"
        >
          View All My Projects
        </RippleButton>
      </div>
    </section>
  );
}