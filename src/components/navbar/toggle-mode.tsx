"use client"

import * as React from "react"
import { FaMoon } from "react-icons/fa"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { MdOutlineWbSunny } from "react-icons/md";
import { cn } from "@/lib/utils"
import { ModeToggleProps } from "@/types/navbar"

export function ModeToggle({ variant = "default" }: ModeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (isAnimating) return

    const isMobileDevice = variant === "mobile" || window.innerWidth < 768;

    if (isMobileDevice) {
      // On mobile, change theme instantly without transition
      document.body.style.transition = 'none';
      const currentTheme = resolvedTheme || theme;
      setTheme(currentTheme === "dark" ? "light" : "dark");
      // Restore transition after a short delay
      setTimeout(() => {
        document.body.style.transition = '';
      }, 100);
    } else {
      // Ripple effect for desktop
      setIsAnimating(true);
      const button = buttonRef.current;
      if (button) {
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        const currentTheme = resolvedTheme || theme;
        const ripple = document.createElement('div');
        ripple.className = 'theme-transition-overlay';
        ripple.style.cssText = `
          position: fixed;
          top: ${y}px;
          left: ${x}px;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: ${currentTheme === 'dark' ? '#ffffff' : '#000000'};
          z-index: 99999;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        document.body.appendChild(ripple);

        requestAnimationFrame(() => {
          const maxDimension = Math.max(window.innerWidth, window.innerHeight);
          const diagonal = Math.sqrt(Math.pow(maxDimension, 2) + Math.pow(maxDimension, 2));
          ripple.style.width = `${diagonal * 2.5}px`;
          ripple.style.height = `${diagonal * 2.5}px`;
        });

        setTimeout(() => {
          setTheme(currentTheme === "dark" ? "light" : "dark");
        }, 400);

        setTimeout(() => {
          if (document.body.contains(ripple)) {
            document.body.removeChild(ripple);
          }
          setIsAnimating(false);
        }, 800);
      }
    }
  }

  const isMobile = variant === "mobile"

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "transition-all duration-300",
          isMobile
            ? "rounded-xl w-10 h-10 hover:bg-transparent"
            : "rounded-xl border-gray-800 dark:border-gray-300 hover:bg-gray-700 dark:hover:bg-gray-100 bg-gray-800 dark:bg-gray-300"
        )}
        disabled
      >
        <div className={cn(isMobile ? "h-5 w-5" : "h-[1.2rem] w-[1.2rem]")} />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      ref={buttonRef}
      variant={isMobile ? "ghost" : "outline"}
      size="icon"
      className={cn(
        "transition-all duration-300 cursor-pointer",
        isMobile
          ? "rounded-xl w-10 h-10 hover:bg-transparent text-muted-foreground hover:text-foreground"
          : "rounded-full border-gray-800 dark:border-gray-300 hover:bg-gray-700 dark:hover:bg-gray-100 bg-gray-800 dark:bg-gray-300"
      )}
      onClick={toggleTheme}
      disabled={isAnimating}
    >
      <MdOutlineWbSunny className={cn(
        "scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90",
        isMobile
          ? "h-5 w-5 text-muted-foreground"
          : "h-[1.2rem] w-[1.2rem] dark:text-gray-800 text-gray-300"
      )} />
      <FaMoon className={cn(
        "absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0",
        isMobile
          ? "h-5 w-5 text-muted-foreground"
          : "h-[1.2rem] w-[1.2rem] dark:text-gray-800 text-gray-300"
      )} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}