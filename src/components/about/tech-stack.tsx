"use client";

import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import tech_stack from "@/data/about-tech-stack";

export function TechStack() {
  const duplicatedTools = [...tech_stack, ...tech_stack];
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
                  className="flex-shrink-0 mx-4 text-4xl text-center grayscale hover:grayscale-0 transition-all duration-300"
                  whileHover={{
                    scale: 1.2,
                    y: -5,
                    filter: "grayscale(0)",
                    transition: { duration: 0.2 }
                  }}
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