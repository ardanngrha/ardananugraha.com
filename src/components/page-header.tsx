"use client"

import React from "react"
import { motion } from "motion/react"
import { PageHeaderProps } from "@/types/shared"

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  background,
}) => {
  return (
    <section className="relative overflow-hidden border-b bg-background/50 pt-12 pb-16 md:pt-28 md:pb-24">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0 text-foreground/5 opacit-50 dark:text-foreground/10">
        {background}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container relative z-10 mx-auto px-4 text-center"
      >
        <h1 className="text-6xl font-bold tracking-tight md:text-6xl pb-2 gradient-text font-handwriting pr-2">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {description}
        </p>
      </motion.div>
    </section>
  )
}