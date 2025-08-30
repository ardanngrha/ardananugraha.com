"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function useNavbarScroll() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true)

    // Check if we're on a detail page
    const isDetailPage = pathname.startsWith('/projects/') || pathname.startsWith('/writings/')

    // On desktop, hide navbar for detail pages
    const handleVisibility = () => {
      // Get screen width
      const isDesktop = window.innerWidth >= 768 // md breakpoint

      if (isDesktop && isDetailPage) {
        setIsVisible(false)
        return
      }

      // Original scroll logic for other pages
      // If the user is at the very top of the page, always show the navbar
      if (window.scrollY === 0) {
        setIsVisible(true)
        return
      }

      const footer = document.querySelector('footer')
      if (!footer) return

      const footerRect = footer.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      // Add 100px buffer - navbar will hide when footer is 100px from viewport
      const buffer = 100
      const isFooterVisible = footerRect.top < (viewportHeight + buffer)
      setIsVisible(!isFooterVisible)
    }

    // Initial check
    handleVisibility()

    // Add scroll listener with throttling for performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleVisibility()
          ticking = false
        })
        ticking = true
      }
    }

    // Add resize listener to handle screen size changes
    const handleResize = () => {
      handleVisibility()
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [pathname]) // Add pathname as dependency

  return { isVisible, isMounted }
}