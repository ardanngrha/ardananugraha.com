"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isAnimating, setIsAnimating] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  const toggleTheme = () => {
    if (isAnimating) return

    setIsAnimating(true)

    // Get button position for animation origin
    const button = buttonRef.current
    if (button) {
      const rect = button.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      // Create ripple effect
      const ripple = document.createElement('div')
      ripple.className = 'theme-transition-overlay'
      ripple.style.cssText = `
        position: fixed;
        top: ${y}px;
        left: ${x}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: ${theme === 'dark' ? '#ffffff' : '#000000'};
        z-index: 9999;
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      `

      document.body.appendChild(ripple)

      // Trigger animation
      requestAnimationFrame(() => {
        const maxDimension = Math.max(window.innerWidth, window.innerHeight)
        const diagonal = Math.sqrt(Math.pow(maxDimension, 2) + Math.pow(maxDimension, 2))

        ripple.style.width = `${diagonal * 2}px`
        ripple.style.height = `${diagonal * 2}px`
      })

      // Change theme after animation starts
      setTimeout(() => {
        setTheme(theme === "dark" ? "light" : "dark")
      }, 300)

      // Clean up
      setTimeout(() => {
        document.body.removeChild(ripple)
        setIsAnimating(false)
      }, 600)
    }
  }

  return (
    <Button
      ref={buttonRef}
      variant="outline"
      size="icon"
      className="rounded-full border-gray-800 dark:border-gray-300 hover:bg-gray-700 dark:hover:bg-gray-100 bg-gray-800 dark:bg-gray-300 transition-all duration-300 cursor-pointer"
      onClick={toggleTheme}
      disabled={isAnimating}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 dark:text-gray-800 text-gray-300" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 dark:text-gray-800 text-gray-300" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}