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

      const buffer = 100
      const isFooterVisible = footerRect.top < (viewportHeight + buffer)
      setIsVisible(!isFooterVisible)
    }

    // passive listeners
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

    // Use passive listener for better performance
    window.addEventListener('scroll', throttledHandleScroll, {
      passive: true,
      capture: false
    })

    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll)
    }
  }, [isMounted])

  return { isVisible, isMounted }
}