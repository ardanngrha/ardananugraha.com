"use client"

import React from "react"
import { motion } from "motion/react"
import { PageHeaderProps } from "@/types/shared"
import { containerVariants, itemVariants } from '@/lib/animation-configs';

export function PageHeader({ title, description, background }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b bg-background/50 pt-12 pb-16 md:pt-28 md:pb-24">
      {/* Background SVG container */}
      <div className="absolute inset-0 z-0 text-foreground/5 opacit-50 dark:text-foreground/10">
        {background}
      </div>

      {/* Content */}
      <motion.div
        className="container relative z-10 mx-auto px-4 text-center"
        variants={containerVariants.hero}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="mx-auto max-w-4xl pb-2 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl gradient-text"
          variants={itemVariants.text}
        >
          {title}
        </motion.h1>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl"
          variants={itemVariants.text}
        >
          {description}
        </motion.p>
      </motion.div>
    </section>
  )
}