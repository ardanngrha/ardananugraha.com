"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { AttributionBg } from "@/components/backgrounds/attribution-bg";
import { PageHeader } from "@/components/page-header";
import inspirations from "@/data/attributions";

export default function AttributionPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
    >
      <PageHeader
        title="Attribution"
        description="This website was made possible by the inspiration and work of many talented individuals and projects."
        background={<AttributionBg />}
      />
      <motion.div
        className="mx-auto flex flex-col gap-10 py-10"
      >
          <motion.div>
            <motion.p>
                The journey of   creating this website was greatly influenced by the following inspirations. Each of these projects and individuals has contributed to the design, functionality, or overall vision of this site. A heartfelt thank you to all of them!
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
    </motion.div>
  );
}