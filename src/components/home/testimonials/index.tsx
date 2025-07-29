import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TestimonialCard } from "./card";
import { testimonials } from "@/data/testimonials";

const SWIPE_CONFIDENCE_THRESHOLD = 10000;

export default function TestimonialsSection() {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const getIndex = (index: number) => {
    return ((index % testimonials.length) + testimonials.length) % testimonials.length;
  };

  const paginate = (newDirection: number) => {
    setCurrent([current + newDirection, newDirection]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      rotate: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 3,
      x: "0%",
      y: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
      filter: "grayscale(0)",
      transition: { type: "spring" as const, stiffness: 300, damping: 25 },
    },
    exit: (direction: number) => ({
      zIndex: 1,
      x: direction < 0 ? "100%" : "-100%",
      rotate: direction < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.8,
      transition: { type: "spring" as const, stiffness: 300, damping: 25 },
    }),
    left: {
      zIndex: 2,
      x: "-80%",
      y: 30,
      rotate: -15,
      opacity: 0.6,
      scale: 0.9,
      filter: "grayscale(0.7)",
      transition: { type: "spring" as const, stiffness: 300, damping: 25 },
    },
    right: {
      zIndex: 2,
      x: "80%",
      y: 30,
      rotate: 15,
      opacity: 0.6,
      scale: 0.9,
      filter: "grayscale(0.7)",
      transition: { type: "spring" as const, stiffness: 300, damping: 25 },
    },
  };

  const positions = ["left", "center", "right"];
  const visibleCards = [-1, 0, 1].map((offset) => ({
    pos: positions[offset + 1],
    index: getIndex(current + offset),
  }));

  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    {
      offset,
      velocity,
    }: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
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
      <h2 className="text-3xl font-bold mb-8">
        Some <span className="gradient-text">Words</span>
      </h2>
      <div className="relative w-full max-w-4xl h-[450px] flex items-center justify-center">
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
                if (pos === "left") paginate(-1);
                if (pos === "right") paginate(1);
              }}
              whileHover={pos !== "center" ? { scale: 0.95, y: 20 } : {}}
            >
              <TestimonialCard
                testimonial={testimonials[index]}
                isCenter={pos === "center"}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex space-x-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const newIndex = getIndex(index);
              const direction = newIndex > getIndex(current) ? 1 : -1;
              setCurrent([index, direction]);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === getIndex(current)
              ? "bg-primary scale-125"
              : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
              }`}
          />
        ))}
      </div>
    </motion.section>
  );
}