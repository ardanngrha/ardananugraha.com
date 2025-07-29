"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge"
import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaExternalLinkAlt,
  FaPython,
  FaJava,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiRedux,
  SiSocketdotio,
  SiMongodb,
  SiTypescript,
  SiJavascript,
  SiNextdotjs,
  SiTensorflow,
  SiSwift,
  SiApple,
  SiAndroid,
  SiGooglecloud,
  SiHtml5,
  SiCss3,
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { ProjectContentItem } from "@/types/projects";

// Maps tech stack names to their corresponding icons with colors
export const techIconMap: { [key: string]: React.ReactNode } = {
  React: <FaReact className="text-blue-500" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-500" />,
  "Node.js": <FaNodeJs className="text-green-600" />,
  "Express.js": <SiExpress className="text-gray-700 dark:text-gray-300" />,
  "Redux Toolkit": <SiRedux className="text-purple-600" />,
  "Socket.IO": <SiSocketdotio className="text-gray-800 dark:text-white" />,
  MongoDB: <SiMongodb className="text-green-500" />,
  TypeScript: <SiTypescript className="text-blue-600" />,
  JavaScript: <SiJavascript className="text-yellow-500" />,
  "Next.js": <SiNextdotjs className="text-black dark:text-white" />,
  Python: <FaPython className="text-blue-400" />,
  Java: <FaJava className="text-red-500" />,
  "Machine Learning": <SiTensorflow className="text-orange-500" />,
  TensorFlow: <SiTensorflow className="text-orange-500" />,
  "Data Science": <FaPython className="text-blue-400" />,
  "Statistical Analysis": <FaPython className="text-blue-400" />,
  Pandas: <FaPython className="text-blue-400" />,
  "Computer Vision": <SiTensorflow className="text-orange-500" />,
  "Deep Learning": <SiTensorflow className="text-orange-500" />,
  "Image Processing": <SiTensorflow className="text-orange-500" />,
  "REST API": <SiExpress className="text-gray-700 dark:text-gray-300" />,
  Authentication: <SiExpress className="text-gray-700 dark:text-gray-300" />,
  Swift: <SiSwift className="text-orange-600" />,
  SwiftUI: <SiSwift className="text-orange-600" />,
  macOS: <SiApple className="text-gray-800 dark:text-white" />,
  "Native App": <SiApple className="text-gray-800 dark:text-white" />,
  Productivity: <SiApple className="text-gray-800 dark:text-white" />,
  "Full Stack": <FaReact className="text-blue-500" />,
  Android: <SiAndroid className="text-green-500" />,
  "Mobile Development": <SiAndroid className="text-green-500" />,
  FastAPI: <FaPython className="text-blue-400" />,
  GCP: <SiGooglecloud className="text-blue-600" />,
  HTML: <SiHtml5 className="text-orange-600" />,
  CSS: <SiCss3 className="text-blue-600" />,
  "Web Development": <SiHtml5 className="text-orange-600" />,
  "Responsive Design": <SiCss3 className="text-blue-600" />,
  "Recommendation System": <SiTensorflow className="text-orange-500" />,
};

interface ProjectCardProps {
  project: ProjectContentItem;
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
      <div className="p-6 group">
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
                    className="object-cover transition-transform duration-300 group-hover:scale-105 grayscale group-hover:grayscale-0"
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
              <ul className="space-y-2">
                {bulletPoints?.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                )) || []}
              </ul>
            </div>

            <div className="flex flex-col flex-wrap gap-3 mt-6 pt-4 border-t border-border/50">
              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-2 grayscale group-hover:grayscale-0">
                {tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-2">
                    {techIconMap[tag]} {tag}
                  </Badge>
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