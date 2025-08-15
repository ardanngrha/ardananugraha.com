"use client";

import { motion } from "motion/react";
import { useEffect, useState, useMemo } from "react";
import { FaCode, FaBrain, FaChalkboardTeacher, FaCloud } from "react-icons/fa";

export default function FirstHighlight() {
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);

  const points = useMemo(() => [
    {
      label: "Software Engineering",
      icon: FaCode,
      color: "from-blue-400 to-blue-600",
      description: "Building scalable applications",
      gradient: "bg-gradient-to-r from-blue-500/20 to-blue-600/20",
    },
    {
      label: "Machine Learning",
      icon: FaBrain,
      color: "from-purple-400 to-purple-600",
      description: "Training intelligent models",
      gradient: "bg-gradient-to-r from-purple-500/20 to-purple-600/20",
    },
    {
      label: "Mentoring",
      icon: FaChalkboardTeacher,
      color: "from-pink-400 to-red-400",
      description: "Guiding next generation",
      gradient: "bg-gradient-to-r from-pink-500/20 to-red-400/20",
    },
    {
      label: "Cloud Computing",
      icon: FaCloud,
      color: "from-cyan-400 to-blue-400",
      description: "Scaling in the cloud",
      gradient: "bg-gradient-to-r from-cyan-500/20 to-blue-400/20",
    },
  ], []);

  useEffect(() => {
    let raf: number;
    let last = performance.now();

    function animateProgress(now: number) {
      const delta = (now - last) / 1000;
      last = now;

      setProgress((prev) => {
        let next = prev + delta * 0.2;
        if (next >= 1) next -= 1;
        return next;
      });
      raf = requestAnimationFrame(animateProgress);
    }

    raf = requestAnimationFrame(animateProgress);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const tolerance = 0.05;
    let newActiveIdx = activeIdx;

    if (progress >= 0 - tolerance && progress <= 0 + tolerance) newActiveIdx = 0;
    else if (progress >= 0.25 - tolerance && progress <= 0.25 + tolerance) newActiveIdx = 1;
    else if (progress >= 0.5 - tolerance && progress <= 0.5 + tolerance) newActiveIdx = 2;
    else if (progress >= 0.75 - tolerance && progress <= 0.75 + tolerance) newActiveIdx = 3;

    if (newActiveIdx !== activeIdx) {
      setActiveIdx(newActiveIdx);
    }
  }, [progress, activeIdx]);

  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold gradient-text pb-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Growing Through Codes and Knowledge Sharing
          </motion.h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              I don&apos;t just write code—I architect solutions. From crafting software to training machine learning models, from analyzing complex datasets
              to mentoring the next generation of developers.
            </motion.p>

            <motion.p
              className="text-lg text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Every project is an opportunity to push boundaries.
            </motion.p>
          </motion.div>

          {/* Right Side - Enhanced Skills Display */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Active skill card */}
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`relative p-6 rounded-2xl border border-border/50 backdrop-blur-sm ${points[activeIdx].gradient}`}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className={`p-3 rounded-xl bg-gradient-to-br ${points[activeIdx].color} shadow-lg`}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {(() => {
                    const IconComponent = points[activeIdx].icon;
                    return <IconComponent className="w-6 h-6 text-white" />;
                  })()}
                </motion.div>

                <div className="flex-1">
                  <motion.h3
                    className="font-bold text-lg text-foreground mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {points[activeIdx].label}
                  </motion.h3>
                  <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {points[activeIdx].description}
                  </motion.p>
                </div>
              </div>

              {/* Subtle pulse animation */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}