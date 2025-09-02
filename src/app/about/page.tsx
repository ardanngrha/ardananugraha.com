'use client';

import { motion } from 'motion/react';
import { PageHeader } from '@/components/page-header';
import { AboutBg } from '@/components/backgrounds/about-bg';
import { ExperienceTimeline } from '@/components/about/experiences';
import { TechStack } from '@/components/about/tech-stack';
import { FavStack } from '@/components/about/fav-stack';
import { AboutImage } from '@/components/about/images';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 15,
    },
  },
};

export default function AboutPage() {
  return (
    <motion.div
      className="min-h-screen"
      initial="hidden"
      animate="visible"
      key="about-page" // Key ensures animation runs on navigation
    >
      <PageHeader
        title="About Me"
        description="Get to know more about my journey, experiences, and the technologies I work with."
        background={<AboutBg />}
      />

      <motion.div
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
      >
        {/* Introduction Section */}
        <motion.div className="max-w-4xl mx-auto" variants={sectionVariants}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div variants={textVariants}>
              <motion.div className="space-y-4 leading-relaxed">
                <motion.p variants={textVariants} className="font-semibold">
                  Hi There! Ardan here 👋🏻
                </motion.p>
                <motion.p
                  variants={textVariants}
                  className="text-muted-foreground"
                >
                  I&apos;m a software engineer who loves building cool things
                  with code. I started coding out of curiosity and now I spend
                  my time creating applications that people actually want to
                  use.
                </motion.p>
                <motion.p
                  variants={textVariants}
                  className="text-muted-foreground"
                >
                  My approach to development is simple: write clean,
                  maintainable code, prioritize user experience, and never stop
                  learning. Every project is an opportunity to grow and create
                  something that can make a difference.
                </motion.p>
              </motion.div>
              <motion.div className="space-y-4 mt-6" variants={textVariants}>
                <motion.p variants={textVariants}>
                  Here are my current favorites tech stack:
                </motion.p>
                <FavStack />
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              variants={sectionVariants}
            >
              <AboutImage />
            </motion.div>
          </div>
        </motion.div>

        {/* Experiences Section */}
        <motion.div
          className="my-16 w-full flex flex-col items-center"
          variants={sectionVariants}
        >
          <motion.p
            className="text-5xl font-bold text-center mb-12 font-handwriting gradient-text p-2 w-full"
            variants={textVariants}
          >
            My Experiences
          </motion.p>
          <ExperienceTimeline />
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          className="my-16 w-full flex flex-col items-center"
          variants={sectionVariants}
        >
          <motion.p
            className="text-5xl font-bold text-center mb-12 font-handwriting gradient-text p-2 w-full"
            variants={textVariants}
          >
            Technologies I&apos;ve been Work With
          </motion.p>
          <TechStack />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
