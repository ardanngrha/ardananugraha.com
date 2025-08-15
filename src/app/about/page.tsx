"use client";

import { motion } from "motion/react";
import { PageHeader } from "@/components/page-header";
import { AboutBg } from "@/components/backgrounds/about-bg";
import { ExperienceTimeline } from "@/components/about/experiences";
import { TechStack } from "@/components/about/tech-stack";
import { FavStack } from "@/components/about/fav-stack";
import { AboutImage } from "@/components/about/images";
import {
  pageVariants,
  containerVariants,
  itemVariants
} from '@/lib/animation-configs';

export default function AboutPage() {
  return (
    <motion.div
      className="min-h-screen"
      variants={pageVariants.enter}
      initial="hidden"
      animate="visible"
      key="about-page"
    >
      <PageHeader
        title="About Me"
        description="Get to know more about my journey, experiences, and the technologies I work with."
        background={<AboutBg />}
      />

      <motion.div
        className="container mx-auto px-4 py-16"
        variants={containerVariants.basic}
      >
        {/* Introduction Section */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={itemVariants.section}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div variants={itemVariants.text}>
              <motion.div className="space-y-4 leading-relaxed">
                <motion.p variants={itemVariants.text} className="font-semibold">
                  Hi There! Ardan here 👋🏻
                </motion.p>
                <motion.p variants={itemVariants.text} className="text-muted-foreground">
                  I&apos;m a software engineer who loves building cool things with code.
                  I started coding out of curiosity and now I spend my time creating
                  applications that people actually want to use.
                </motion.p>
                <motion.p variants={itemVariants.text} className="text-muted-foreground">
                  My approach to development is simple: write clean, maintainable
                  code, prioritize user experience, and never stop learning. Every
                  project is an opportunity to grow and create something that can
                  make a difference.
                </motion.p>
              </motion.div>
              <motion.div
                className="space-y-4 mt-6"
                variants={itemVariants.text}
              >
                <motion.p variants={itemVariants.text}>
                  Here are my current favorites tech stack:
                </motion.p>
                <FavStack />
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              variants={itemVariants.section}
            >
              <AboutImage />
            </motion.div>
          </div>
        </motion.div>

        {/* Experiences Section */}
        <motion.div
          className="my-16"
          variants={itemVariants.section}
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            variants={itemVariants.text}
          >
            My Experiences
          </motion.h2>
          <ExperienceTimeline />
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div
          className="my-16"
          variants={itemVariants.section}
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            variants={itemVariants.text}
          >
            Technologies I Work With
          </motion.h2>
          <TechStack />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}