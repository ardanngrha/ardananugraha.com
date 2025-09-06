'use client';

import { motion } from 'motion/react';
import { WritingCard } from '@/components/writings/writing-card';
import { WritingsSectionProps } from '@/types/writings';
import { RippleButton } from '@/components/ui/ripple-button';
import { getIcon } from '@/lib/icons';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
export default function WritingsSection({ writings }: WritingsSectionProps) {
  return (
    <section className="py-16">
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold flex items-center gap-3 gradient-text pb-2 font-handwriting pr-2">
          {getIcon('FeatherAlt', 'w-8 h-8')}
          Featured Writings
        </h2>
      </motion.div>

      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {writings.map((writing) => (
          <WritingCard
            key={writing.slug}
            writing={writing}
            variant="featured"
          />
        ))}
      </motion.div>

      <div className="flex justify-center mt-8">
        <RippleButton
          href="/writings"
          variant="outline"
          className="px-6 py-3 w-auto flex-initial"
          aria-label="Read all my writings"
        >
          Read All My Writings
        </RippleButton>
      </div>
    </section>
  );
}
