import React from "react"

interface PageHeaderProps {
  title: string
  description: string
  background: React.ReactNode
}

/**
 * A reusable component for page title sections.
 * It includes a title, description, and a decorative background element.
 * @param {string} title - The main title of the page.
 * @param {string} description - A short description or subtitle.
 * @param {React.ReactNode} background - A React component (ideally an SVG) to be used as the background.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  background,
}) => {
  return (
    <section className="relative overflow-hidden border-b bg-background/50 pt-28 pb-16 md:pt-40 md:pb-24">
      {/* Background SVG container */}
      <div className="absolute inset-0 z-0 text-foreground/5 opacit-50 dark:text-foreground/10">
        {background}
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
          {description}
        </p>
      </div>
    </section>
  )
}