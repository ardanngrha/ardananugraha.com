"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const images = [
  {
    src: "/images/me.jpeg",
    description: "A professional headshot.",
    year: "2024",
    rotation: -1,
  },
  {
    src: "/images/google.jpg",
    description: "Visiting the Google office.",
    year: "2023",
    rotation: 2.5,
  },
  {
    src: "/images/pln.jpg",
    description: "At the PLN (State Electricity Company) office.",
    year: "2024",
    rotation: -2,
  },
  {
    src: "/images/bni.jpg",
    description: "During my internship at BNI (Bank Negara Indonesia).",
    year: "2023",
    rotation: 1,
  },
  {
    src: "/images/gojek.jpg",
    description: "A visit to the Gojek headquarters.",
    year: "2023",
    rotation: -1.5,
  },
  {
    src: "/images/gdsc.jpg",
    description: "With the Google Developer Student Clubs team.",
    year: "2022",
    rotation: 2,
  },
];

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

export function ImageCarousel() {
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
        <button
          onClick={() => paginate(-1)}
          className="hidden sm:flex text-primary p-2 rounded-full transition-colors hover:bg-primary/10 mr-2 md:mr-4 flex-shrink-0"
        >
          <FaChevronLeft className="h-8 w-8" />
        </button>

        {/* Carousel Container */}
        <div className="relative w-full max-w-sm h-[420px] m:h-[480px] sm:max-w-xs flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page} // Use page state for re-rendering
              className="absolute w-full h-full p-2 sm:p-4 bg-card border rounded-2xl shadow-lg cursor-grab active:cursor-grabbing"
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
                <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={currentImage.src}
                    alt={currentImage.description}
                    fill
                    className="object-cover"
                    priority={imageIndex === 0}
                    sizes="(max-width: 640px) 100vw, 320px"
                  />
                </div>
                <div className="text-center flex-grow flex flex-col justify-center">
                  <p className="font-handwriting text-lg md:text-xl font-bold">{currentImage.description}</p>
                  <p className="font-handwriting text-base font-bold">{currentImage.year}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button (Desktop) */}
        <button
          onClick={() => paginate(1)}
          className="hidden sm:flex text-primary p-2 rounded-full transition-colors hover:bg-primary/10 ml-2 md:ml-4 flex-shrink-0"
        >
          <FaChevronRight className="h-8 w-8" />
        </button>
      </div>

      {/* Arrow Buttons (Mobile) */}
      <div className="sm:hidden flex items-center justify-center mt-4">
        <button
          onClick={() => paginate(-1)}
          className="text-primary p-2 rounded-full transition-colors hover:bg-primary/10 mx-6"
        >
          <FaChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="text-primary p-2 rounded-full transition-colors hover:bg-primary/10 mx-6"
        >
          <FaChevronRight className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}