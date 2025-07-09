"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect, useState } from "react"

export default function Copyright() {
  const [mounted, setMounted] = useState(false)

  // Motion values for time components
  const seconds = useMotionValue(0)
  const minutes = useMotionValue(0)
  const hours = useMotionValue(0)
  const day = useMotionValue(0)
  const month = useMotionValue(0)
  const year = useMotionValue(0)

  // Transform to rounded values with leading zeros
  const roundedSeconds = useTransform(() => Math.round(seconds.get()).toString().padStart(2, '0'))
  const roundedMinutes = useTransform(() => Math.round(minutes.get()).toString().padStart(2, '0'))
  const roundedHours = useTransform(() => Math.round(hours.get()).toString().padStart(2, '0'))
  const roundedDay = useTransform(() => Math.round(day.get()).toString().padStart(2, '0'))
  const roundedMonth = useTransform(() => Math.round(month.get()).toString().padStart(2, '0'))
  const roundedYear = useTransform(() => Math.round(year.get()).toString())

  useEffect(() => {
    setMounted(true)

    const updateTime = () => {
      const now = new Date()

      const currentSeconds = now.getSeconds()
      const currentMinutes = now.getMinutes()
      const currentHours = now.getHours()
      const currentDay = now.getDate()
      const currentMonth = now.getMonth() + 1 // getMonth() returns 0-11
      const currentYear = now.getFullYear()

      // Animate to current time and date values
      animate(seconds, currentSeconds, { duration: 0.5 })
      animate(minutes, currentMinutes, { duration: 0.5 })
      animate(hours, currentHours, { duration: 0.5 })
      animate(day, currentDay, { duration: 0.5 })
      animate(month, currentMonth, { duration: 0.5 })
      animate(year, currentYear, { duration: 0.5 })
    }

    // Initial time set
    updateTime()

    // Update every second
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [seconds, minutes, hours, day, month, year])

  if (!mounted) {
    return (
      <div className="space-y-2 flex flex-col items-center justify-center text-center">
        <p className="text-sm text-muted-foreground">
          © 2024. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Built with</span>
          <div className="flex items-center gap-1 flex-wrap">
            <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">Next.js</span>
            <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">Tailwind</span>
            <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">shadcn/ui</span>
            <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">Vercel</span>
            <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">Motion</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground font-mono">
          Local Time: --:--:-- | --/--/----
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2 flex flex-col items-center justify-center text-center gap-2">
      <p className="text-sm text-muted-foreground">
        © 2025. All rights reserved.
      </p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Built with</span>
        <div className="flex items-center gap-1 flex-wrap font-mono">
          <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="px-1.5 py-0.5 bg-secondary rounded text-xs hover:bg-secondary/80 transition-colors">Next.js</a>
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="px-1.5 py-0.5 bg-secondary rounded text-xs hover:bg-secondary/80 transition-colors">Tailwind</a>
          <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="px-1.5 py-0.5 bg-secondary rounded text-xs hover:bg-secondary/80 transition-colors">shadcn/ui</a>
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="px-1.5 py-0.5 bg-secondary rounded text-xs hover:bg-secondary/80 transition-colors">Vercel</a>
          <a href="https://motion.dev" target="_blank" rel="noopener noreferrer" className="px-1.5 py-0.5 bg-secondary rounded text-xs hover:bg-secondary/80 transition-colors">Motion</a>
        </div>
      </div>
      <p className="font-handwriting">
        <motion.span className="inline-block min-w-[2ch] text-center">
          {roundedDay}
        </motion.span>
        /
        <motion.span className="inline-block min-w-[2ch] text-center">
          {roundedMonth}
        </motion.span>
        /
        <motion.span className="inline-block min-w-[4ch] text-center">
          {roundedYear}
        </motion.span>
        <span> | </span>
        <motion.span className="inline-block min-w-[2ch] text-center">
          {roundedHours}
        </motion.span>
        :
        <motion.span className="inline-block min-w-[2ch] text-center">
          {roundedMinutes}
        </motion.span>
        :
        <motion.span className="inline-block min-w-[2ch] text-center">
          {roundedSeconds}
        </motion.span>
      </p>
    </div>
  )
}