"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import HeroBackground from "./background"
import { toast } from "sonner"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentTime, setCurrentTime] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [languageIndex, setLanguageIndex] = useState(0)

  // Memoize the languages array to prevent unnecessary re-renders
  const languages = useMemo(() => ["Python", "JavaScript", "Java"], [])

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }))
    }

    updateTime() // Initial call
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  // Typewriter effect for programming languages
  useEffect(() => {
    const currentLang = languages[languageIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting) {
      // Typing effect
      if (currentLanguage.length < currentLang.length) {
        timeout = setTimeout(() => {
          setCurrentLanguage(currentLang.substring(0, currentLanguage.length + 1))
        }, 100) // Typing speed
      } else {
        // Pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 2000) // Display time
      }
    } else {
      // Deleting effect
      if (currentLanguage.length > 0) {
        timeout = setTimeout(() => {
          setCurrentLanguage(currentLanguage.substring(0, currentLanguage.length - 1))
        }, 50) // Deleting speed (faster than typing)
      } else {
        // Move to next language
        setIsDeleting(false)
        setLanguageIndex((prev) => (prev + 1) % languages.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentLanguage, isDeleting, languageIndex, languages])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact.ardana@gmail.com")
      toast.success("Email copied to clipboard!", {
        duration: 3000,
        description: "You can now paste it anywhere.",
      })
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  return (
    <div className="relative flex flex-col min-h-[calc(100vh-100px)] justify-center items-center p-4 md:p-0">
      <HeroBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col gap-1 z-10"
      >
        {/* Profile Card */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Hey it&apos;s,
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 w-full max-w-2xl relative"
        >
          {/* Main Card */}
          <div className="bg-card/90 backdrop-blur-sm rounded-4xl px-6 pt-6 pb-2 md:py-6 border relative z-10 shadow-lg">
            {/* Status indicator */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground text-sm">Available for work</span>
              </div>
              <span className="text-muted-foreground text-sm">{currentTime}</span>
            </div>

            {/* Profile info */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src="/images/avatar.png"
                  alt="Ardana Nugraha"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="text-foreground text-xl font-semibold">Ardana Nugraha</h3>
                <p className="text-muted-foreground text-sm">Software Engineer</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 mb-4">
              <Link
                href="/about"
                className="group relative flex-1 bg-secondary/80 hover:bg-secondary text-foreground py-3 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden border border-border/50 hover:border-primary/30"
                onMouseMove={handleMouseMove}
              >
                {/* Mouse-following ripple effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 70px at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary), 0.1) 0%, rgba(var(--primary), 0.05) 40%, transparent 70%)`
                  }}
                />
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="relative z-10">
                  <span className="hidden sm:inline">More About Me</span>
                  <span className="sm:hidden">About Me</span>
                </span>
              </Link>
              <button
                onClick={handleCopyEmail}
                className="group relative flex-1 bg-secondary/80 hover:bg-secondary text-foreground py-3 px-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 overflow-hidden border border-border/50 hover:border-primary/30 cursor-pointer"
                onMouseMove={handleMouseMove}
              >
                {/* Mouse-following ripple effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle 70px at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary), 0.1) 0%, rgba(var(--primary), 0.05) 40%, transparent 70%)`
                  }}
                />
                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="relative z-10">Copy Email</span>
              </button>
            </div>
          </div>

          {/* Stacked Card - Currently Working */}
          <div className="absolute -bottom-10 left-0 right-0 z-0">
            <div className="bg-gradient-to-r from-blue-300 to-blue-500 dark:from-blue-300 dark:to-blue-500 text-white pt-20 pb-3 px-6 rounded-b-4xl shadow-md">
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium">Currently Working at PLN Icon Plus</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-20 text-4xl md:text-5xl"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="relative font-bold"
          >
            I work with <span className="text-primary relative">
              <span className="invisible">JavaScript</span>
              <span className="absolute left-0 top-1 gradient-text pb-2">{currentLanguage}<span className="animate-pulse">|</span></span>
            </span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="relative font-bold mt-3"
          >
            to build applications.
          </motion.p>
        </motion.div>
      </motion.div>
    </div >
  )
}