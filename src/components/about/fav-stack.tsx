"use client"

import { motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { favStack } from "@/data/about-fav-stack";
import { useState } from "react";

export function FavStack() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-4">
        {favStack.map((tech, idx) => (
          <Tooltip
            key={tech.name}
            open={activeIndex === idx ? true : undefined}
          >
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1, zIndex: 10, filter: "grayscale(0)" }}
                animate={
                  activeIndex === idx
                    ? { scale: 1.1, zIndex: 10, filter: "grayscale(0)" }
                    : {}
                }
                className="grayscale hover:grayscale-0 transition-all duration-50 select-none"
                onTouchStart={() => setActiveIndex(idx)}
                onTouchEnd={() => setActiveIndex(null)}
                onTouchCancel={() => setActiveIndex(null)}
              >
                <div className="bg-secondary rounded-lg p-4">{tech.icon}</div>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <h4 className="font-bold text-sm mb-1">{tech.name}</h4>
              <p className="text-xs">{tech.reason}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}