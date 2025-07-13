"use client"

import { RoughNotation, RoughNotationGroup } from "react-rough-notation"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import HeroBackground from "./background"

export default function Hero() {
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
    <div className="relative flex flex-col min-h-screen justify-center items-center text-center p-4 md:p-0">
      <HeroBackground />
      <div className="flex flex-col items-center gap-1 z-10">
        <Image
          src="/images/avatar.png"
          alt="Ardana Nugraha"
          width={128}
          height={128}
          className="rounded-full"
          priority
        />
        <div className="flex flex-col gap-4 text-center">
          {/* <h1 className="text-4xl md:text-5xl font-bold">Hi, I'm Ardana 👋</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl">
              I build things for the web.
            </p> */}
        </div>
        <p className="text-6xl md:text-7xl font-bold font-tik-tok gradient-text">I&apos;m Ardana</p>
        <p className="relative text-lg font-medium max-w-lg">
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
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="inline-flex items-center gap-1 px-2 py-2 bg-gray-100/50 dark:bg-gray-900/50 border border-gray-300/50 dark:border-gray-600/50 rounded-lg font-mono text-sm font-semibold h-12 w-fit">
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
          <div className="mt-3 sm:mt-0 flex justify-center h-12">
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
    </div>
  )
}