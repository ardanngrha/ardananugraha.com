"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollPosition = window.scrollY
      setProgress((scrollPosition / totalHeight) * 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return <Progress value={progress} className="fixed top-0 left-0 w-full h-1 rounded-none" />
}