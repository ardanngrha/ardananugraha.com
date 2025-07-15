'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ScrollToTopProps {
  className?: string
  threshold?: number
}

export function ScrollToTop({ className, threshold = 300 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [threshold])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50 transition-all duration-300 ease-in-out',
        isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 translate-y-4 pointer-events-none',
        className
      )}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        variant="outline"
        className="h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-background/80 backdrop-blur-sm border-2 hover:scale-105 touch-manipulation"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
      </Button>
    </div>
  )
}