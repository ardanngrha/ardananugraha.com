"use client"

import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import { Tabs } from "@/components/navbar/navigation-tabs"
import { ModeToggle } from "./toggle-mode"

interface DesktopTabsProps {
  navigationTabs: Array<{
    id: string
    label: string
    href: string
    logo: React.ReactNode
  }>
  isVisible: boolean
}

export function DesktopTabs({ navigationTabs, isVisible }: DesktopTabsProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="hidden md:block sticky top-5 z-50 container mx-auto"
        >
          {/* Outer glow effect */}
          <div className="relative">
            {/* Glow background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl scale-110 opacity-50 dark:opacity-30" />

            {/* Main navbar */}
            <div className="relative bg-gray-100/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-gray-200/90 dark:border-zinc-800 rounded-full px-2 py-1.5 shadow-2xl shadow-gray-900/10 dark:shadow-gray-900/30">
              <div className="relative flex justify-between items-center">
                {/* Logo section with hover effect */}
                <motion.div
                  className="flex items-center justify-center w-9 h-9 pl-2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src="/images/an-black.png"
                    alt="logo"
                    width={30}
                    height={30}
                    className="w-8 h-8 dark:filter dark:brightness-0 dark:invert"
                  />
                </motion.div>

                {/* Navigation tabs */}
                <div className="flex-1 flex justify-center min-w-0 mx-4">
                  <Tabs tabs={navigationTabs} />
                </div>

                {/* Theme toggle with enhanced styling */}
                <div className="flex items-center justify-center w-8 h-8">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}