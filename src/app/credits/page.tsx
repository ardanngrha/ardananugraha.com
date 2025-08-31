"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CreditsBg } from "@/components/backgrounds/credits-bg";
import { PageHeader } from "@/components/page-header";
import { inspirations } from "@/data/credits";

export default function CreditsPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
    >
      <PageHeader
        title="Credits"
        description="This website was made possible by the inspiration and work of many talented individuals and projects."
        background={<CreditsBg />}
      />
      <motion.div
        className="mx-auto flex flex-col gap-10 py-10"
      >
        <motion.div className="flex flex-col gap-3 text-justify">
          <motion.p>
            The journey of creating this website began as a simple idea: to build a personal space that truly reflects my growth as a developer. I started by researching portfolio sites that resonated with me, taking notes on layouts, color schemes, and interactive elements that felt engaging and authentic.
          </motion.p>
          <motion.p>
            The initial phase was filled with sketches and wireframes, iterating on how to present my work and story in a way that felt both professional and approachable. I spent countless hours experimenting with different design systems, typography, and animation libraries, striving for a balance between aesthetics and usability.
          </motion.p>
          <motion.p>
            As I moved into development, I chose technologies that would allow for rapid prototyping and smooth user experiences. Next.js provided the perfect foundation for building a fast, scalable site, while Tailwind CSS enabled me to quickly style components with consistency. I integrated motion and animation libraries to add subtle transitions and effects, making the site feel alive and interactive.
          </motion.p>
          <motion.p>
            Throughout the process, I drew inspiration from the work of talented creators in the web community. Their open-source projects, blog posts, and design philosophies helped me overcome technical challenges and refine my vision. I learned the importance of accessibility, performance optimization, and responsive design, ensuring the site works beautifully across devices.
          </motion.p>
          <motion.p>
            The most rewarding part was seeing the site come together piece by piece—from the hero section that greets visitors, to the project showcases and writing portfolio. Each section was crafted with care, reflecting not just my skills but the journey behind them. I am grateful for the support and inspiration from friends, mentors, and the broader tech community.
          </motion.p>
          <motion.p>
            This website is more than a portfolio; it&apos;s a testament to continuous learning, collaboration, and the joy of building something meaningful. Thank you for visiting and sharing in this story.
          </motion.p>
          <motion.p>
            The journey of creating this website was greatly influenced by the following inspirations. Each of these projects and individuals has contributed to the design, functionality, or overall vision of this site. A heartfelt thank you to all of them!
          </motion.p>

        </motion.div>
        <motion.ul
          className="text-left space-y-2"
        >
          {inspirations.map((inspiration) => (
            <motion.li
              key={inspiration.name}
            >
              <Link
                href={inspiration.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline custom-cursor"
              >
                {inspiration.name}
              </Link>
              <span className="text-muted-foreground"> - {inspiration.reason}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div >
  );
}