"use client";

import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import {
  FaJs, FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaGitAlt, FaGithub, FaAws, FaLinux
} from 'react-icons/fa';
import {
  SiTypescript, SiExpress, SiSpringboot, SiPostgresql, SiMongodb, SiRedis, SiNginx, SiNextdotjs, SiHtml5, SiCss3, SiGnubash, SiGooglecloud, SiTensorflow, SiDiscord, SiNotion
} from 'react-icons/si';
import { VscAzure } from "react-icons/vsc";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";

const tools = [
  { name: 'JavaScript', icon: <FaJs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'Java', icon: <FaJava /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Express.js', icon: <SiExpress /> },
  { name: 'Spring Boot', icon: <SiSpringboot /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'Redis', icon: <SiRedis /> },
  { name: 'Nginx', icon: <SiNginx /> },
  { name: 'React.js', icon: <FaReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'HTML', icon: <SiHtml5 /> },
  { name: 'CSS', icon: <SiCss3 /> },
  { name: 'Git', icon: <FaGitAlt /> },
  { name: 'Bash Scripting', icon: <SiGnubash /> },
  { name: 'Docker', icon: <FaDocker /> },
  { name: 'Linux', icon: <FaLinux /> },
  { name: 'GitHub Actions', icon: <FaGithub /> },
  { name: 'GCP', icon: <SiGooglecloud /> },
  { name: 'AWS', icon: <FaAws /> },
  { name: 'Azure', icon: <VscAzure /> },
  { name: 'TensorFlow', icon: <SiTensorflow /> },
  { name: 'Discord', icon: <SiDiscord /> },
  { name: 'Notion', icon: <SiNotion /> },
];

export function TechTools() {
  const duplicatedTools = [...tools, ...tools];
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const x = useMotionValue(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth / 2);
    }
  }, []);

  useAnimationFrame((time, delta) => {
    if (isDragging.current || isHovering || !contentWidth) return;

    let currentX = x.get();
    const speed = -70; // pixels per second
    const moveBy = speed * (delta / 1000);

    if (currentX <= -contentWidth) {
      currentX += contentWidth;
      x.set(currentX);
    }

    x.set(currentX + moveBy);
  });

  return (
    <TooltipProvider>
      <div
        ref={containerRef}
        className="w-full overflow-hidden cursor-grab py-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          ref={contentRef}
          className="flex"
          style={{ x }}
          drag="x"
          dragConstraints={{
            left: -contentWidth,
            right: 0,
          }}
          onDragStart={() => { isDragging.current = true; }}
          onDragEnd={() => { isDragging.current = false; }}
          whileTap={{ cursor: "grabbing" }}
        >
          {duplicatedTools.map((tool, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <motion.div
                  className="flex-shrink-0 mx-4 text-4xl text-center"
                  whileHover={{ scale: 1.2, y: -5, transition: { duration: 0.2 } }}
                >
                  {tool.icon}
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tool.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </motion.div>
      </div>
    </TooltipProvider>
  );
}