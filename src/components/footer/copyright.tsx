"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect, useState } from "react"

export default function Copyright() {
  const [mounted, setMounted] = useState(false)

  // Motion values for time components
  const seconds = useMotionValue(0)
  const minutes = useMotionValue(0)
  const hours = useMotionValue(0)

  // Transform to rounded values with leading zeros
  const roundedSeconds = useTransform(() => Math.round(seconds.get()).toString().padStart(2, '0'))
  const roundedMinutes = useTransform(() => Math.round(minutes.get()).toString().padStart(2, '0'))
  const roundedHours = useTransform(() => Math.round(hours.get()).toString().padStart(2, '0'))

  useEffect(() => {
    setMounted(true)

    const updateTime = () => {
      const now = new Date()
      const jakartaTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }))

      const currentSeconds = jakartaTime.getSeconds()
      const currentMinutes = jakartaTime.getMinutes()
      const currentHours = jakartaTime.getHours()

      // Animate to current time values
      animate(seconds, currentSeconds, { duration: 0.5 })
      animate(minutes, currentMinutes, { duration: 0.5 })
      animate(hours, currentHours, { duration: 0.5 })
    }

    // Initial time set
    updateTime()

    // Update every second
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [seconds, minutes, hours])

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
          Local Time: --:--:-- UTC+7
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2 flex flex-col items-center justify-center text-center">
      <p className="text-sm text-muted-foreground">
        © 2025. All rights reserved.
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
        Local Time:
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
        {" "}UTC+7
      </p>
    </div>
  )
}