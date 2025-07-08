"use client"

import { DesktopTabs } from "./navbar/desktop-tabs"
import { MobileTabs } from "./navbar/mobile-tabs"
import { navigationTabs } from "./navbar/constants"
import { useNavbarScroll } from "@/hooks/use-navbar-scroll"

export default function Navbar() {
  const { isVisible, isMounted } = useNavbarScroll()

  if (!isMounted) {
    return null
  }

  return (
    <>
      <DesktopTabs navigationTabs={navigationTabs} isVisible={isVisible} />
      <MobileTabs navigationTabs={navigationTabs} />
    </>
  )
}