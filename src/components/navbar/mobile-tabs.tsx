"use client"

import { Tabs } from "@/components/navbar/navigation-tabs"
import { ModeToggle } from "./toggle-mode"
import { MobileTabsProps } from "@/types/navbar"

export function MobileTabs({ navigationTabs }: MobileTabsProps) {
  return (
    <>
      {/* Mobile Navigation - Floating Bottom */}
      <div className="md:hidden fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-background/50 backdrop-blur-xl border border-border/50 rounded-full px-4 shadow-lg">
          <div className="flex justify-center items-center gap-1.5">
            <Tabs tabs={navigationTabs} showLabels={false} />
            <div className="flex items-center justify-center py-1.5">
              <ModeToggle variant="mobile" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile spacing to prevent content from being hidden behind bottom nav */}
      <div className="md:hidden" />
    </>
  )
}