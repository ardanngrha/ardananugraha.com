"use client"

import { RoughNotation, RoughNotationGroup } from "react-rough-notation"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
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
    <div className="relative flex flex-col min-h-[calc(100vh-100px)] justify-center items-center text-center p-4 md:p-0">
      <HeroBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center gap-1 z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: 0.3 }}
        >
          <Image
            src="/images/avatar.png"
            alt="Ardana Nugraha"
            width={128}
            height={128}
            className="rounded-full"
            priority
          />
        </motion.div>
        <div className="flex flex-col gap-4 text-center">
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-6xl md:text-7xl font-bold font-tik-tok"
        >
          I&apos;m Ardana
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="relative text-lg font-medium max-w-lg"
        >
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
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
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
          <div className="flex justify-center h-12">
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
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100/50 dark:bg-green-900/50 border border-green-300/50 dark:border-green-600/50 rounded-lg font-mono text-sm font-semibold">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span>Available for job opportunities</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}