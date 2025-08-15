"use client"

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import experiences from "@/data/about-experiences";

export function ExperienceTimeline() {
  return (
    <div className="space-y-12">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="md:col-span-1 flex items-start gap-4">
            <div>
              <h3 className="font-bold">{exp.role}</h3>
              <div className="flex flex-row items-center gap-2">
                <Image src={exp.icon} alt={`${exp.company} logo`} width={16} height={16} className="h-4 w-4 object-contain rounded" />
                <Link href={exp.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm custom-cursor">
                  {exp.company}
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
              <p className="text-sm text-muted-foreground">{exp.country} • {exp.jobType}</p>
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="text-muted-foreground mb-4">{exp.description}</p>
            <ul className="space-y-2">
              {exp.tasks.map((task, i) => (
                <li key={i} className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}