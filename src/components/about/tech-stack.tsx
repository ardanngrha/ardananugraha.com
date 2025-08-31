"use client";

import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import { icons } from "@/data/icons";

export function TechStack() {
  const displayedTechs = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'React', 'Next.js',
    'Node.js', 'Express', 'Spring Boot', 'PostgreSQL', 'MongoDB',
    'Docker', 'AWS', 'GCP', 'Git', 'TensorFlow', 'Linux', 'Redis', 'HTML', 'CSS', 'Bash',
    'Discord', 'Notion', 'FastAPI', 'Bootstrap', 'VSCode', 'Kafka', 'Kubernetes', 'Flask', 'RabbitMQ', 'GitHub'
  ];

  // Filter tech_icons to only show selected technologies
  const filteredTools = icons.filter(tool => displayedTechs.includes(tool.name));
  const duplicatedTools = [...filteredTools, ...filteredTools];

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const x = useMotionValue(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.scrollWidth / 2);
    }
  }, []);

  useAnimationFrame((time, delta) => {
    if (isDragging.current || isHovering || activeIndex !== null || !contentWidth) return;

    let currentX = x.get();
    const speed = -70; // pixels per second
    const moveBy = speed * (delta / 1000);

    if (currentX <= -contentWidth) {
      currentX += contentWidth;
      x.set(currentX);
    }

    x.set(currentX + moveBy);
  });

  // Resume auto-scroll after tooltip closes (touch end/cancel)
  useEffect(() => {
    if (activeIndex !== null) return;
    // When tooltip closes, auto-scroll resumes via useAnimationFrame
  }, [activeIndex]);

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
          {duplicatedTools.map((tool, index) => {
            const isActive = activeIndex === index;
            return (
              <Tooltip key={index} open={isActive ? true : undefined}>
                <TooltipTrigger asChild>
                  <motion.div
                    className="flex-shrink-0 mx-4 text-4xl text-center grayscale hover:grayscale-0 transition-all duration-50 select-none"
                    whileHover={{
                      scale: 1.2,
                      y: -5,
                      filter: "grayscale(0)",
                      transition: { duration: 0.2 }
                    }}
                    animate={isActive ? { scale: 1.2, y: -5, filter: "grayscale(0)" } : {}}
                    onTouchStart={() => {
                      setActiveIndex(index);
                      setIsHovering(true); // Stop auto-scroll
                    }}
                    onTouchEnd={() => {
                      setActiveIndex(null);
                      setIsHovering(false); // Resume auto-scroll
                    }}
                    onTouchCancel={() => {
                      setActiveIndex(null);
                      setIsHovering(false); // Resume auto-scroll
                    }}
                  >
                    {tool.icon}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{tool.name}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </motion.div>
      </div>
    </TooltipProvider>
  );
}