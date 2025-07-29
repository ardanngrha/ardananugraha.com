"use client"

import { Tabs } from "@/components/navbar/navigation-tabs"
import { ModeToggle } from "./toggle-mode"
import { MobileTabsProps } from "@/types/navbar"

export function MobileTabs({ navigationTabs }: MobileTabsProps) {
  return (
    <>
      {/* Mobile Navigation - Floating Bottom */}
      <div className="md:hidden fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
        {/* Outer glow effect */}
        <div className="relative">
          {/* Glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl scale-110 opacity-50 dark:opacity-30" />

          {/* Gradient border wrapper */}
          <div className="relative p-[1px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full">
            {/* Main mobile navbar */}
            <div className="bg-gray-100/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-full px-4 shadow-2xl shadow-gray-900/10 dark:shadow-gray-900/30">
              <div className="flex justify-center items-center gap-1.5">
                <Tabs tabs={navigationTabs} showLabels={false} />
                <div className="flex items-center justify-center py-1.5">
                  <ModeToggle variant="mobile" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile spacing to prevent content from being hidden behind bottom nav */}
      <div className="md:hidden" />
    </>
  )
}