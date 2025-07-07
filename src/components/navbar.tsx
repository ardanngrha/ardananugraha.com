"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "./toggle-mode";
import Image from "next/image";
import { Tabs } from "@/components/navigation-tabs";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";

const navigationTabs = [
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "writings", label: "Writings", href: "/writings" },
  { id: "about", label: "About", href: "/about" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting and initial scroll position
  useEffect(() => {
    setIsMounted(true);
    // Set initial visibility based on current scroll position
    setIsVisible(window.scrollY === 0);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isMounted) return;
    setIsVisible(latest === 0);
  });

  // Don't render anything until mounted to prevent hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="sticky top-5 z-50 bg-transparent backdrop-blur-md container mx-auto flex justify-between items-center border-2 rounded-full px-2 py-0.5 dark:border-gray-700 border-gray-300"
        >
          <div className="flex items-center justify-center w-10 h-10">
            <Link href="/">
              <Image
                src="/images/an-white.png"
                alt="logo"
                width={30}
                height={0}
                style={{ height: "auto", width: "auto" }}
                className="dark:block hidden w-6 h-6 sm:w-[30px] sm:h-auto"
              />
              <Image
                src="/images/an-black.png"
                alt="logo"
                width={30}
                height={0}
                style={{ height: "auto", width: "auto" }}
                className="dark:hidden block w-6 h-6 sm:w-[30px] sm:h-auto"
              />
            </Link>
          </div>

          <div className="flex-1 flex justify-center min-w-0">
            <Tabs tabs={navigationTabs} />
          </div>

          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
            <ModeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}