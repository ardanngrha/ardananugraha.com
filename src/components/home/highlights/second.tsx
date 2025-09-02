'use client';

import { motion, AnimatePresence, useInView } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { getIcon } from '@/lib/icons';
import { stackCategories } from '@/data/home-highlights';

export default function SecondHighlight() {
  const [activeCard, setActiveCard] = useState(0);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start the auto-rotation timer
  const startAutoRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % stackCategories.length);
    }, 5000);
  };

  // Function to stop the auto-rotation timer
  const stopAutoRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Start/stop auto-rotation based on visibility
  useEffect(() => {
    if (isInView) {
      startAutoRotation();
    } else {
      stopAutoRotation();
    }

    return () => stopAutoRotation();
  }, [isInView]);

  // Handle card click - reset timer
  const handleCardClick = (index: number) => {
    setActiveCard(index);
    if (isInView) {
      startAutoRotation(); // Reset the timer
    }
  };

  const currentCategory = stackCategories[activeCard];

  return (
    <section
      ref={sectionRef}
      className="py-20 px-4 overflow-hidden bg-gradient-to-br from-background via-background/80 to-background"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold gradient-text font-handwriting pr-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Full-Stack Architecture
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            From beautiful interfaces and robust APIs to intelligent models,
            reliable databases, scalable infrastructure, and real-time
            messaging—covering the full stack, end to end.
          </motion.p>
        </div>

        <div className="space-y-16">
          {/* Tech Logos Section */}
          <motion.div
            className="flex justify-center items-center gap-6 md:gap-8 flex-wrap"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`logos-${activeCard}`}
                className="flex items-center gap-6 md:gap-8 flex-wrap justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                {currentCategory.technologies.map((tech, index) => {
                  const Icon = getIcon(tech);
                  return (
                    <motion.div
                      key={tech}
                      className="relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 hover:scale-110 transition-transform cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                      }}
                      whileHover={{
                        scale: 1.2,
                        transition: { duration: 0.3 },
                      }}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                    >
                      <div className="text-3xl md:text-4xl">{Icon}</div>

                      {/* Tooltip */}
                      <AnimatePresence>
                        {hoveredTech === tech && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-3 py-1 rounded-md text-sm font-medium whitespace-nowrap border shadow-lg z-10"
                          >
                            {tech}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-popover"></div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Words Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`words-${activeCard}`}
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                {currentCategory.words.map((word, index) => (
                  <motion.p
                    key={word}
                    className="text-lg md:text-xl text-muted-foreground font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.1,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    {word}
                  </motion.p>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Cards Section - Fixed grid layout */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {stackCategories.map((category, index) => {
              const isActive = index === activeCard;
              const Icon = category.icon;

              return (
                <motion.div
                  key={category.id}
                  className={`
                    relative p-6 rounded-2xl cursor-pointer transition-all duration-300
                    ${
                      isActive
                        ? 'bg-card border-2 border-primary/50 shadow-2xl'
                        : 'bg-card/50 border border-border/50 hover:border-primary/30'
                    }
                  `}
                  onClick={() => handleCardClick(index)}
                  whileHover={{ scale: isActive ? 1.02 : 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  {/* Animated gradient background for active card */}
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.activeGradient} opacity-10`}
                    />
                  )}

                  {/* Static gradient border for active card */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-2xl opacity-50"
                      style={{
                        background: `linear-gradient(45deg, ${
                          category.activeGradient.split(' ')[1]
                        }, ${category.activeGradient.split(' ')[3]})`,
                        padding: '1px',
                      }}
                    >
                      <div className="w-full h-full bg-card rounded-2xl" />
                    </div>
                  )}

                  {/* Card content */}
                  <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                    <motion.div
                      className={`
                        p-3 rounded-xl transition-all duration-300
                        ${
                          isActive
                            ? `bg-gradient-to-br ${category.gradient} text-white shadow-lg`
                            : 'bg-muted text-muted-foreground'
                        }
                      `}
                    >
                      <Icon className="w-6 h-6" />
                    </motion.div>

                    <div>
                      <h3
                        className={`
                        font-semibold text-sm md:text-base transition-colors duration-300
                        ${isActive ? 'text-primary' : 'text-foreground'}
                      `}
                      >
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  {/* Pulsing effect for active card */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Progress indicator */}
          <motion.div
            className="flex justify-center items-center space-x-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            {stackCategories.map((_, index) => (
              <motion.button
                key={index}
                className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${
                  index === activeCard
                    ? 'bg-primary w-8'
                    : index < activeCard
                    ? 'bg-blue-500 w-3'
                    : 'bg-muted w-3'
                }`}
                onClick={() => handleCardClick(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                animate={{
                  scale: index === activeCard ? 1.1 : 1,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
