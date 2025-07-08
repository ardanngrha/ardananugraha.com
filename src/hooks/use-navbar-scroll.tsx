import { useEffect, useState } from "react"
import { useMotionValueEvent, useScroll } from "motion/react"

export function useNavbarScroll() {
  const { scrollY } = useScroll()
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  // Handle mounting and initial scroll position
  useEffect(() => {
    setIsMounted(true)
    // Set initial visibility based on current scroll position
    setIsVisible(window.scrollY === 0)
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isMounted) return
    setIsVisible(latest === 0)
  })

  return { isVisible, isMounted }
}