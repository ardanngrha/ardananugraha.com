"use client"

import Link from "next/link";
import { ModeToggle } from "./toggle-mode";
import Image from "next/image";
import { Tabs } from "@/components/tabs";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

const navigationTabs = [
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "writings", label: "Writings", href: "/writings" },
  { id: "about", label: "About", href: "/about" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(typeof window !== 'undefined' ? window.scrollY === 0 : true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // If the latest scroll position is 0, make the navbar visible.
    // Otherwise, hide it.
    setIsVisible(latest === 0);
  });

  return (
    <AnimatePresence initial={false}>
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
                className="dark:block hidden"
              />
              <Image
                src="/images/an-black.png"
                alt="logo"
                width={30}
                height={0}
                style={{ height: "auto", width: "auto" }}
                className="dark:hidden block"
              />
            </Link>
          </div>

          <Tabs tabs={navigationTabs} />

          <div className="flex items-center justify-center w-10 h-10">
            <ModeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}