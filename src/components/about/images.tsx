"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { images } from "@/data/about-images";
import { Button } from "../ui/button";

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    rotate: direction > 0 ? 25 : -25,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    rotate: direction < 0 ? -25 : 25,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function AboutImage() {
  const [[page, direction], setPage] = useState([0, 0]);

  // Correctly wrap the index to create an infinite loop
  const imageIndex = ((page % images.length) + images.length) % images.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  if (!images || images.length === 0) {
    return <div>No images to display.</div>;
  }

  const currentImage = images[imageIndex];

  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      <div className="flex items-center justify-center w-full">
        {/* Previous Button (Desktop) */}
        <Button
          onClick={() => paginate(-1)}
          className="hidden sm:flex text-primary p-2 rounded-full transition-colors hover:bg-primary/10 mr-2 md:mr-4 flex-shrink-0 cursor-pointer"
          variant="ghost"
          size="icon"
        >
          <FaChevronLeft className="h-8 w-8" />
        </Button>

        {/* Carousel Container */}
        <div className="relative w-full max-w-xs h-[380px] sm:h-[420px] flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              className="absolute w-full h-full p-4 bg-card border rounded-2xl shadow-lg cursor-grab active:cursor-grabbing overflow-hidden"
              custom={direction}
              variants={variants}
              initial="enter"
              animate={{ ...variants.center, rotate: currentImage.rotation }}
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                rotate: { type: "spring", stiffness: 300, damping: 30 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) paginate(1);
                else if (swipe > swipeConfidenceThreshold) paginate(-1);
              }}
              whileHover={{ y: -10, scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-col h-full pointer-events-none">
                <div className="relative w-full aspect-square rounded-lg overflow-visible flex items-center justify-center bg-transparent">
                  <div className="relative w-65 h-65 mx-auto">
                    <Image
                      src={currentImage.src}
                      alt={currentImage.description}
                      fill
                      className="object-contain shadow-2xl"
                      priority={imageIndex === 0}
                      sizes="(max-width: 640px) 180px, 220px"
                    />
                  </div>
                </div>
                <div className="text-center flex-grow flex flex-col justify-center px-2">
                  <p className="font-handwriting text sm:text-lg md:text-xl font-bold mb-1 line-clamp-2">{currentImage.description}</p>
                  <p className="font-handwriting text sm:text-lg font-bold text-muted-foreground">{currentImage.year}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button (Desktop) */}
        <Button
          onClick={() => paginate(1)}
          className="hidden sm:flex text-primary p-2 rounded-full transition-colors hover:bg-primary/10 ml-2 md:ml-4 flex-shrink-0 cursor-pointer"
          variant="ghost"
          size="icon"
        >
          <FaChevronRight className="h-8 w-8" />
        </Button>
      </div>

      {/* Arrow Buttons (Mobile) */}
      <div className="sm:hidden flex items-center justify-center mt-4">
        <Button
          onClick={() => paginate(-1)}
          className="text-primary p-2 rounded-full transition-colors hover:bg-primary/10 mx-6 cursor-pointer"
          variant="ghost"
          size="icon"
        >
          <FaChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          onClick={() => paginate(1)}
          className="text-primary p-2 rounded-full transition-colors hover:bg-primary/10 mx-6 cursor-pointer"
          variant="ghost"
          size="icon"
        >
          <FaChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}