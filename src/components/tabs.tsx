"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  href: string
}

interface TabsProps {
  tabs: Tab[]
}

export function Tabs({ tabs }: TabsProps) {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(() => {
    return tabs.find(tab => tab.href === pathname)?.id || null
  })

  useEffect(() => {
    const currentTab = tabs.find(tab => tab.href === pathname)
    if (currentTab) {
      setActiveTab(currentTab?.id || null)
    } else {
      setActiveTab(null)
    }
  }, [pathname, tabs])

  return (
    <div className="relative flex items-center">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          data-tab={tab.id}
          className={cn(
            "relative z-10 px-2 py-2 sm:px-4 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200",
            "hover:text-foreground/80",
            activeTab === tab.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  )
}