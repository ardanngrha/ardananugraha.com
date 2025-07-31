import { useCallback, useEffect, useRef, useState } from 'react'

export interface MousePosition {
  x: number
  y: number
  isWithinBounds: boolean
}

interface UseMousePositionOptions {
  throttleMs?: number
  includeTouch?: boolean
}

/**
 * Hook for tracking mouse position within an element with performance throttling
 * Supports both mouse and touch events for mobile compatibility
 */
export function useMousePosition(options: UseMousePositionOptions = {}) {
  const { throttleMs = 16, includeTouch = true } = options // 16ms = ~60fps
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    isWithinBounds: false,
  })
  
  const elementRef = useRef<HTMLElement>(null)
  const lastUpdateTime = useRef<number>(0)
  const animationFrameId = useRef<number | undefined>(undefined)

  const updateMousePosition = useCallback((clientX: number, clientY: number) => {
    const now = Date.now()
    
    // Throttle updates for performance
    if (now - lastUpdateTime.current < throttleMs) {
      return
    }
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current)
    }
    
    animationFrameId.current = requestAnimationFrame(() => {
      if (!elementRef.current) return
      
      const rect = elementRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      const isWithinBounds = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height
      
      setMousePosition({ x, y, isWithinBounds })
      lastUpdateTime.current = now
    })
  }, [throttleMs])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    updateMousePosition(event.clientX, event.clientY)
  }, [updateMousePosition])

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (!includeTouch || event.touches.length === 0) return
    const touch = event.touches[0]
    updateMousePosition(touch.clientX, touch.clientY)
  }, [updateMousePosition, includeTouch])

  const handleMouseLeave = useCallback(() => {
    setMousePosition(prev => ({ ...prev, isWithinBounds: false }))
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (includeTouch) {
      setMousePosition(prev => ({ ...prev, isWithinBounds: false }))
    }
  }, [includeTouch])

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Mouse events
    element.addEventListener('mousemove', handleMouseMove, { passive: true })
    element.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    
    // Touch events for mobile support
    if (includeTouch) {
      element.addEventListener('touchmove', handleTouchMove, { passive: true })
      element.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
      
      if (includeTouch) {
        element.removeEventListener('touchmove', handleTouchMove)
        element.removeEventListener('touchend', handleTouchEnd)
      }
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [handleMouseMove, handleMouseLeave, handleTouchMove, handleTouchEnd, includeTouch])

  return {
    mousePosition,
    elementRef,
  }
}