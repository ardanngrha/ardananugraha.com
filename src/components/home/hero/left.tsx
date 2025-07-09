"use client"

import { RoughNotation, RoughNotationGroup } from "react-rough-notation"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function HeroLeft() {
  const [isMounted, setIsMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  return (
    <div className="flex-col">
      <p className="text-7xl font-bold">I&apos;m Ardana</p>
      <p className="relative text-lg font-medium">
        I work with{" "}
        <RoughNotationGroup show={isMounted}>
          <RoughNotation
            type="underline"
            color="#34D399" // Green
            strokeWidth={2}
            order={1}
            animationDuration={500}
          >
            Python
          </RoughNotation>
          ,{" "}
          <RoughNotation
            type="underline"
            color="#60A5FA" // Blue
            strokeWidth={2}
            order={2}
            animationDuration={500}
          >
            Typescript
          </RoughNotation>
          , and{" "}
          <RoughNotation
            type="underline"
            color="#F87171" // Red
            strokeWidth={2}
            order={3}
            animationDuration={500}
          >
            Java
          </RoughNotation>
        </RoughNotationGroup>{" "}
        to build applications.
      </p>
      <div className="mt-5 flex flex-col md:flex-row md:items-center md:gap-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100/50 dark:bg-gray-900/50 border border-gray-300/50 dark:border-gray-600/50 rounded-lg font-mono text-sm font-semibold h-12 w-fit mx-auto md:mx-0">
          <span className="text-green-600 dark:text-green-400">$</span>
          <span className="text-gray-700 dark:text-gray-300">currently_working_at</span>
          <a
            href="https://plniconplus.co.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            PLN Icon Plus
          </a>
        </div>

        <div className="mt-4 md:mt-0 flex justify-center md:justify-start h-12">
          <Link
            href="/about"
            className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gray-100/50 dark:bg-gray-900/50 border border-gray-300/50 dark:border-gray-600/50 rounded-lg font-medium text-sm text-gray-700 dark:text-gray-300 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            {/* Base background */}
            <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-900/50" />
            {/* Mouse-following ripple effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: `radial-gradient(circle 70px at ${mousePosition.x}px ${mousePosition.y}px, rgba(156, 163, 175, 0.15) 0%, rgba(156, 163, 175, 0.08) 40%, transparent 70%)`
              }}
            />
            <span className="relative z-10">more about me</span>
          </Link>
        </div>
      </div>
    </div>
  )
}