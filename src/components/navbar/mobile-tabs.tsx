"use client"

import { Tabs } from "@/components/navigation-tabs"
import { ModeToggle } from "./toggle-mode"

interface MobileTabsProps {
  navigationTabs: Array<{
    id: string
    label: string
    href: string
    logo: React.ReactNode
  }>
}

export function MobileTabs({ navigationTabs }: MobileTabsProps) {
  return (
    <>
      {/* Mobile Navigation - Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex-1 flex justify-center">
            <Tabs tabs={navigationTabs} showLabels={false} />
          </div>
          <div className="flex items-center justify-center w-8 h-8 ml-4">
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Mobile spacing to prevent content from being hidden behind bottom nav */}
      <div className="md:hidden h-16" />
    </>
  )
}