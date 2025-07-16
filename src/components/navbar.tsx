"use client"

import { DesktopTabs } from "./navbar/desktop-tabs"
import { MobileTabs } from "./navbar/mobile-tabs"
import { navigationTabs } from "./navbar/constants"
import { useNavbarScroll } from "@/hooks/use-navbar-scroll"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const { isVisible, isMounted } = useNavbarScroll()
  const pathname = usePathname()

  const isDetailPage = pathname.includes('/projects/') || pathname.includes('/writings/')

  if (!isMounted || isDetailPage) {
    return null
  }

  return (
    <>
      <DesktopTabs navigationTabs={navigationTabs} isVisible={isVisible} />
      <MobileTabs navigationTabs={navigationTabs} />
    </>
  )
}