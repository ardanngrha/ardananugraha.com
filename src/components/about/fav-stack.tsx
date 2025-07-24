"use client"

import { motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import favStack from "@/data/about-fav-stack";

export function FavStack() {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-4">
        {favStack.map((tech) => (
          <Tooltip key={tech.name}>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1, zIndex: 10 }}
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