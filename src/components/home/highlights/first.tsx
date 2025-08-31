"use client";

import { motion, AnimatePresence, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { FaCode, FaRocket, FaBrain, FaUsers, FaServer } from "react-icons/fa";

interface JourneyStep {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  code: string;
  language: string;
  color: string;
}

const journeySteps: JourneyStep[] = [
  {
    year: "2020",
    title: "Hello World!",
    description: "Started my Computer Science degree, diving into Object-Oriented Programming and core concepts.",
    icon: FaCode,
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    // Started Computer Science
    // Learning OOP concepts
    return 0;
}`,
    language: "cpp",
    color: "from-slate-600 via-slate-700 to-slate-800 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900"
  },
  {
    year: "2021",
    title: "Entering Web Development",
    description: "Started working as a Laboratory Assistant for courses and joined communities.",
    icon: FaRocket,
    code: `// Lab Assistant for Web Programming
function createWebsite() {
  const skills = ['HTML', 'CSS', 'JS'];
  console.log('Building websites!');
  return skills;
}

createWebsite();`,
    language: "javascript",
    color: "from-emerald-600 via-emerald-700 to-teal-800 dark:from-emerald-700 dark:via-emerald-800 dark:to-teal-900"
  },
  {
    year: "2022",
    title: "Exploring Backend Engineering",
    description: "Explored backend systems and cloud architecture. Completed Dicoding's course and earned Backend Expert certification.",
    icon: FaServer,
    code: `import express from 'express';

const app = express();
// Backend Expert Certified
app.get('/', (req, res) => {
  res.send('Backend running!');
});

app.listen(3000);`,
    language: "typescript",
    color: "from-amber-600 via-orange-700 to-red-800 dark:from-amber-700 dark:via-orange-800 dark:to-red-900"
  },
  {
    year: "2023",
    title: "Deep Dive into AI/ML",
    description: "Graduated with distinction from Bangkit's ML program and earned a TensorFlow Developer certification.",
    icon: FaBrain,
    code: `import tensorflow as tf

# Bangkit ML Graduate
model = tf.keras.Sequential([
  tf.keras.layers.Dense(64, activation='relu'),
  tf.keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam')`,
    language: "python",
    color: "from-purple-600 via-violet-700 to-indigo-800 dark:from-purple-700 dark:via-violet-800 dark:to-indigo-900"
  },
  {
    year: "2024",
    title: "Become a Software Engineer",
    description: "Building large-scale microservices at PLN Icon Plus and mentoring students at Bangkit Academy and Dicoding.",
    icon: FaUsers,
    code: `from fastapi import FastAPI

app = FastAPI()

# PLN microservices
@app.get("/data")
async def get_data():
    return {"status": "OK", "points": 2500}`,
    language: "python",
    color: "from-rose-600 via-pink-700 to-red-800 dark:from-rose-700 dark:via-pink-800 dark:to-red-900"
  },
  {
    year: "2025",
    title: "Continuing Growth",
    description: "Continuing to learn and grow as a software engineer. Staying updated with industry trends and best practices.",
    icon: FaRocket,
    code: `
interface Growth {
  scale: 'national';
  tech: ['K8s', 'Kafka', 'React'];
}

const future = (g: Growth) => 
  \`Scaling with \${g.tech.join(', ')}\`;`,
    language: "typescript",
    color: "from-cyan-600 via-blue-700 to-indigo-800 dark:from-cyan-700 dark:via-blue-800 dark:to-indigo-900"
  }
];

const MAX_VISIBLE_CARDS = 6;

export default function SecondHighlight() {
  const [activeStep, setActiveStep] = useState(0);
  const [typedCode, setTypedCode] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [autoAdvanceEnabled, setAutoAdvanceEnabled] = useState(true);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Typing effect for code
  useEffect(() => {
    if (!isInView) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    const currentCode = journeySteps[activeStep].code;
    setIsTyping(true);
    setTypingComplete(false);
    setTypedCode("");

    let i = 0;
    const typeCharacter = () => {
      if (i < currentCode.length) {
        setTypedCode(currentCode.slice(0, i + 1));
        i++;
        typingTimeoutRef.current = setTimeout(typeCharacter, 20);
      } else {
        setIsTyping(false);
        setTypingComplete(true);
      }
    };

    typingTimeoutRef.current = setTimeout(typeCharacter, 100);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [activeStep, isInView]);

  // Auto advance to next step
  useEffect(() => {
    if (!isInView || !autoAdvanceEnabled || !typingComplete) return;

    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
    }

    autoAdvanceTimeoutRef.current = setTimeout(() => {
      setActiveStep((prev) => (prev + 1) % journeySteps.length);
    }, 1000);

    return () => {
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, [typingComplete, isInView, autoAdvanceEnabled]);

  // Handle manual step selection
  const handleStepClick = (index: number) => {
    setAutoAdvanceEnabled(false);
    setActiveStep(index);

    if (autoAdvanceTimeoutRef.current) {
      clearTimeout(autoAdvanceTimeoutRef.current);
    }

    setTimeout(() => {
      setAutoAdvanceEnabled(true);
    }, 10000);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section ref={containerRef} className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-12 lg:mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold gradient-text pb-4 font-handwriting pr-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
          >
            My Journey in Years
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4 }}
          >
            From first Hello World to become a Software Engineer <br /> Each step shaped who I am today
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Card Stack */}
          <div className="relative w-full pt-20 h-[350px] md:h-[450px] flex items-center justify-center">
            {journeySteps.map((step, index) => {
              const position = (index - activeStep + journeySteps.length) % journeySteps.length;
              const isVisible = position < MAX_VISIBLE_CARDS;

              const y = isVisible ? position * -20 : -80;
              const scale = isVisible ? 1 - position * 0.05 : 0.8;
              const opacity = isVisible ? 1 : 0;
              const zIndex = journeySteps.length - position;

              return (
                <motion.div
                  key={step.year}
                  className={`absolute w-11/12 h-52 p-8 flex flex-col justify-between rounded-2xl shadow-2xl cursor-pointer text-white bg-gradient-to-br ${step.color}`}
                  onClick={() => handleStepClick(index)}
                  initial={false}
                  animate={{ y, scale, opacity, zIndex }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  whileHover={{ y: y - 10, scale: scale + 0.02 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-white/70 text-sm font-medium mb-1">
                        {step.year}
                      </div>
                      <h3 className="text-xl font-bold leading-tight">
                        {step.title}
                      </h3>
                    </div>
                    <div className="flex-shrink-0 p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                      <step.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed flex-1">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="md:sticky">
            {/* Code Display */}
            <motion.div
              className="relative"
              key={activeStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[#1e1e1e] rounded-2xl p-6 shadow-2xl border border-border/50 overflow-hidden relative">
                {/* Terminal Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-4 text-gray-400 text-sm font-mono">
                      {journeySteps[activeStep].language}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${typingComplete ? 'bg-green-400' : isTyping ? 'bg-blue-400 animate-pulse' : 'bg-gray-600'}`}></div>
                    <span className="text-gray-500 text-xs">
                      {Math.round((typedCode.length / journeySteps[activeStep].code.length) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Code Content */}
                <div className="font-mono text-sm relative min-h-[200px]">
                  <AnimatePresence mode="wait">
                    <motion.pre
                      key={activeStep}
                      className="text-gray-300 whitespace-pre-wrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <code>
                        {typedCode}
                        {isTyping && (
                          <motion.span
                            className="inline-block w-2 h-5 bg-green-400 ml-1"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </code>
                    </motion.pre>
                  </AnimatePresence>
                </div>

                {/* Effects can remain the same */}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-3 mt-10">
          {journeySteps.map((_, index) => (
            <motion.button
              key={index}
              className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${index === activeStep
                ? 'bg-primary w-8'
                : index < activeStep
                  ? 'bg-green-500 w-3'
                  : 'bg-muted w-3'
                }`}
              onClick={() => handleStepClick(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              animate={{
                scale: index === activeStep ? 1.1 : 1
              }}
            />
          ))}
        </div>
      </div>
    </section >
  );
}