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
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="hidden md:block sticky top-5 z-50 bg-transparent backdrop-blur-md container mx-auto border-2 rounded-full px-2 py-0.5 dark:border-gray-700 border-gray-300"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center w-10 h-10">
              <Image
                src="/images/an-white.png"
                alt="logo"
                width={30}
                height={0}
                style={{ height: "auto", width: "auto" }}
                className="dark:block hidden w-6 h-6 sm:w-[30px] sm:h-auto"
              />
              <Image
                src="/images/an-black.png"
                alt="logo"
                width={30}
                height={0}
                style={{ height: "auto", width: "auto" }}
                className="dark:hidden block w-6 h-6 sm:w-[30px] sm:h-auto"
              />
            </div>

            <div className="flex-1 flex justify-center min-w-0">
              <Tabs tabs={navigationTabs} />
            </div>

            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
              <ModeToggle />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}