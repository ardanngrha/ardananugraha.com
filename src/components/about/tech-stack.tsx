"use client"

import { motion } from "motion/react";
import { FaPython, FaJs, FaJava, FaReact } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const techStack = [
  {
    name: "Python",
    icon: <FaPython className="h-8 w-8" />,
    reason: "Its versatility and extensive libraries make it my go-to for backend development and machine learning.",
  },
  {
    name: "TypeScript",
    icon: <FaJs className="h-8 w-8" />,
    reason: "I love the type safety and developer experience it brings to JavaScript projects, especially in large-scale applications.",
  },
  {
    name: "Java",
    icon: <FaJava className="h-8 w-8" />,
    reason: "A robust and reliable language that I enjoy using for building scalable and high-performance enterprise applications.",
  },
  {
    name: "React",
    icon: <FaReact className="h-8 w-8" />,
    reason: "Its component-based architecture and declarative nature make building complex UIs a breeze. The ecosystem is fantastic!",
  },
];

export function TechStack() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-4">
        {techStack.map((tech) => (
          <Tooltip key={tech.name}>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1, zIndex: 10 }}
              >
                <div className="bg-secondary rounded-lg p-4">{tech.icon}</div>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <h4>{tech.name}</h4>
              <p>{tech.reason}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}