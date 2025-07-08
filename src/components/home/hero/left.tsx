"use client"

import { RoughNotation, RoughNotationGroup } from "react-rough-notation"
import { useState, useEffect } from "react"

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
    </div>
  )
}