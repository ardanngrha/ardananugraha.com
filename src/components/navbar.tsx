"use client"

import { DesktopTabs } from "./navbar/desktop-tabs"
import { MobileTabs } from "./navbar/mobile-tabs"
import { navigationTabs } from "./navbar/constants"
import { useNavbarScroll } from "@/hooks/use-navbar-scroll"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const { isVisible } = useNavbarScroll()
  const pathname = usePathname()
  const isDetailPage = pathname.includes('/projects/') || pathname.includes('/writings/')

  return (
    <>
      {/* Desktop navbar will be hidden on detail pages to maximize content visibility */}
      {!isDetailPage && (
        <DesktopTabs navigationTabs={navigationTabs} isVisible={isVisible} />
      )}
      {/* Mobile navbar is always visible */}
      <MobileTabs navigationTabs={navigationTabs} />
    </>
  )
}