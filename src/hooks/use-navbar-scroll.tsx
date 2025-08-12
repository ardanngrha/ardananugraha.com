"use client"

import { useEffect, useState } from "react"

export function useNavbarScroll() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
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
    handleScroll()

    // Add scroll listener with throttling for performance
    let ticking = false
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [])

  return { isVisible, isMounted }
}