"use client"

import { RoughNotation, RoughNotationGroup } from "react-rough-notation"
import { useState, useEffect } from "react"
// import Link from "next/link"

export default function HeroLeft() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Delaying the animation ensures the component is mounted and ready
    const timer = setTimeout(() => setIsMounted(true), 500)
    return () => clearTimeout(timer)
  }, [])

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
            animationDuration={800}
          >
            Python
          </RoughNotation>
          ,{" "}
          <RoughNotation
            type="underline"
            color="#60A5FA" // Blue
            strokeWidth={2}
            order={2}
            animationDuration={800}
          >
            Typescript
          </RoughNotation>
          , and{" "}
          <RoughNotation
            type="underline"
            color="#F87171" // Red
            strokeWidth={2}
            order={3}
            animationDuration={800}
          >
            Java
          </RoughNotation>
        </RoughNotationGroup>{" "}
        to build applications
      </p>
      <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-gray-100/50 dark:bg-gray-900/50 border border-gray-300/50 dark:border-gray-600/50 rounded-lg font-mono text-sm font-semibold">
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

      {/* <div className="mt-4">
        <Link
          href="/about"
          className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <span>more about me</span>
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div> */}
    </div>
  )
}