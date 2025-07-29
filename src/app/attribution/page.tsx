"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { AttributionBg } from "@/components/backgrounds/attribution-bg";
import { PageHeader } from "@/components/page-header";
import inspirations from "@/data/attributions";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.6,
    },
  },
};

export default function AttributionPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <PageHeader
        title="Attribution"
        description="This website was made possible by the inspiration and work of many talented individuals and projects."
        background={<AttributionBg />}
      />
      
      <motion.div 
        className="mx-auto py-16"
        variants={containerVariants}
      >
        <motion.ul 
          className="text-left space-y-6"
          variants={containerVariants}
        >
          {inspirations.map((inspiration, index) => (
            <motion.li 
              key={inspiration.name} 
              className="text-lg"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                x: 10,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
            >
              <Link 
                href={inspiration.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-semibold text-primary hover:underline custom-cursor"
              >
                {inspiration.name}
              </Link>
              <span className="text-muted-foreground"> - {inspiration.reason}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}