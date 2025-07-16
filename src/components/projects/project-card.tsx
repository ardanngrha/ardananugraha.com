"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiRedux,
  SiSocketdotio,
  SiMongodb,
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { ContentItem } from "@/components/home/projects/types";

// Maps tech stack names to their corresponding icons with colors
export const techIconMap: { [key: string]: React.ReactNode } = {
  "React.js": <FaReact className="text-blue-500" />,
  "React": <FaReact className="text-blue-500" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-500" />,
  "Node.js": <FaNodeJs className="text-green-600" />,
  "Express.js": <SiExpress className="text-gray-700 dark:text-gray-300" />,
  "Redux Toolkit": <SiRedux className="text-purple-600" />,
  "Socket.IO": <SiSocketdotio className="text-gray-800 dark:text-white" />,
  MongoDB: <SiMongodb className="text-green-500" />,
  TypeScript: <span className="text-blue-600 font-bold text-xs">TS</span>,
  JavaScript: <span className="text-yellow-500 font-bold text-xs">JS</span>,
  "Next.js": <span className="text-black dark:text-white font-bold text-xs">▲</span>,
};

interface ProjectCardProps {
  project: ContentItem;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 12 },
  },
};

export function ProjectPageCard({ project }: ProjectCardProps) {
  const { frontmatter, slug } = project;
  const { title, summary, image, tags, githubUrl, liveUrl, bulletPoints } = frontmatter;

  return (
    <motion.div
      variants={cardVariants}
      className="bg-card/30 border rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-primary/10 hover:border-primary/30"
    >
      <div className="p-6">
        {/* Project Title - Top */}
        <h3 className="text-2xl font-bold text-primary mb-6">{title}</h3>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side: Image */}
          <div className="lg:w-1/2">
            <Link href={`/projects/${slug}`} className="block">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/50 group">
                {image ? (
                  <Image
                    src={image as string}
                    alt={`${title} screenshot`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">
                      Project Preview
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold">View Details</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Right Side: Details */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Summary */}
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {summary}
              </p>
              {/* Bullet Points */}
              <ul className="list-disc list-inside">
                {bulletPoints?.map((point, index) => (
                  <li key={index} className="text-muted-foreground">
                    {point}
                  </li>
                )) || []}
              </ul>
            </div>

            <div className="flex flex-col flex-wrap gap-3 mt-6 pt-4 border-t border-border/50">
              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2">
                {tags?.map((tag: string) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1.5 bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded-full text-xs font-medium text-secondary-foreground transition-colors"
                  >
                    {techIconMap[tag] || null}
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
              {/* Action Buttons */}
              <div className="flex gap-2">
                {githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={githubUrl as string} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="w-4 h-4" />
                      <span>GitHub</span>
                    </Link>
                  </Button>
                )}
                {liveUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={liveUrl as string} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt className="w-4 h-4" />
                      <span>Live Site</span>
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}