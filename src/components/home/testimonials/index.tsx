import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TestimonialCard } from './card';
import { testimonials } from '@/data/testimonials';
import { Button } from '@/components/ui/button';
import { getIcon } from '@/lib/icons';

const SWIPE_CONFIDENCE_THRESHOLD = 10000;

export default function TestimonialsSection() {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const getIndex = (index: number) => {
    return (
      ((index % testimonials.length) + testimonials.length) %
      testimonials.length
    );
  };

  const paginate = (newDirection: number) => {
    setCurrent([current + newDirection, newDirection]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      rotate: 0,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 3,
      x: '0%',
      y: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
      filter: 'grayscale(0)',
      transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
    },
    exit: (direction: number) => ({
      zIndex: 1,
      x: direction < 0 ? '100%' : '-100%',
      rotate: 0,
      opacity: 0,
      scale: 0.8,
      transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
    }),
    left: {
      zIndex: 2,
      x: '-80%',
      y: 30,
      rotate: 0,
      opacity: 0.6,
      scale: 0.9,
      filter: 'grayscale(0.7)',
      transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
    },
    right: {
      zIndex: 2,
      x: '80%',
      y: 30,
      rotate: 0,
      opacity: 0.6,
      scale: 0.9,
      filter: 'grayscale(0.7)',
      transition: { type: 'spring' as const, stiffness: 300, damping: 25 },
    },
  };

  const positions = ['left', 'center', 'right'];
  const visibleCards = [-1, 0, 1].map((offset) => ({
    pos: positions[offset + 1],
    index: getIndex(current + offset),
  }));

  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    {
      offset,
      velocity,
    }: { offset: { x: number; y: number }; velocity: { x: number; y: number } },
  ) => {
    const swipe = Math.abs(offset.x) * velocity.x;

    if (swipe < -SWIPE_CONFIDENCE_THRESHOLD) {
      paginate(1);
    } else if (swipe > SWIPE_CONFIDENCE_THRESHOLD) {
      paginate(-1);
    }
  };

  return (
    <motion.section
      className="py-16 flex flex-col items-center overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl md:text-5xl flex items-center gap-3 font-bold mb-8 gradient-text font-handwriting pr-2">
        {getIcon('FeatherAlt', 'w-8 h-8')}
        Some Words
      </h2>
      <div className="relative w-full max-w-4xl h-[450px] flex items-center justify-center">
        <Button
          className="hidden sm:flex text-primary p-2 rounded-full transition-colors hover:bg-primary/10 left-0 z-10 mr-2 absolute cursor-pointer"
          aria-label="Previous testimonial"
          onClick={() => paginate(-1)}
          variant="ghost"
          size="icon"
        >
          {getIcon('ChevronLeft', 'h-8 w-8')}
        </Button>
        <AnimatePresence initial={false} custom={direction}>
          {visibleCards.map(({ pos, index }) => (
            <motion.div
              key={current + index}
              className="absolute"
              custom={direction}
              variants={variants}
              initial="enter"
              animate={pos}
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={handleDragEnd}
              onClick={() => {
                if (pos === 'left') paginate(-1);
                if (pos === 'right') paginate(1);
              }}
              whileHover={pos !== 'center' ? { scale: 0.95, y: 20 } : {}}
            >
              <TestimonialCard
                testimonial={testimonials[index]}
                isCenter={pos === 'center'}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        <Button
          className="hidden sm:flex text-primary p-2 rounded-full transition-colors hover:bg-primary/10 right-0 z-10 absolute cursor-pointer"
          aria-label="Next testimonial"
          onClick={() => paginate(1)}
          variant="ghost"
          size="icon"
        >
          {getIcon('ChevronRight', 'h-8 w-8')}
        </Button>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === getIndex(current)
                ? 'bg-primary w-8'
                : 'bg-muted w-3 hover:bg-muted-foreground/50'
            }`}
            onClick={() => {
              const newIndex = getIndex(index);
              const direction = newIndex > getIndex(current) ? 1 : -1;
              setCurrent([index, direction]);
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            animate={{
              scale: index === getIndex(current) ? 1.1 : 1,
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </motion.section>
  );
}
