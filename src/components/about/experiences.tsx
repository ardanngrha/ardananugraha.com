"use client"

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const experiences = [
  {
    company: "PLN Icon Plus",
    role: "Software Engineer",
    period: "Mar 2024 - Present",
    country: "Indonesia",
    jobType: "On-site",
    description: "Developing GRITA, an Advanced Distribution Management System (ADMS) for PLN's power grids using Event-Driven Architecture.",
    tasks: [
      "Building microservices that connect 500+ field devices via Modbus TCP, IEC104, and ICCP protocols.",
      "Processing millions of real-time data points within milliseconds.",
      "Creating web-based server simulators for Modbus TCP and IEC104.",
      "Collaborating with frontend developers to integrate high-performance real-time dashboards.",
      "Managing deployment and containerization using Docker and Kubernetes."
    ],
    icon: "https://cdn-icons-png.flaticon.com/512/2111/2111624.png",
    website: "https://www.dicoding.com/",
  },
  {
    company: "Dicoding Indonesia",
    role: "Backend Engineer Mentor",
    period: "Nov 2024 - Apr 2025 | May 2023 - Nov 2023",
    country: "Indonesia",
    jobType: "Remote",
    description: "Successfully Mentored 70+ students in intermediate and expert-level backend development.",
    tasks: [
      "Led 20+ weekly progress review meetings.",
      "Troubleshooting complex issues, optimizing system designs, and ensuring learning objectives were met.",
      "Provided lessons on backend technologies, architecture, and best practices."
    ],
    icon: "https://cdn-icons-png.flaticon.com/512/2111/2111624.png",
    website: "https://www.dicoding.com/",
  },
  {
    company: "Dicoding Indonesia - Bangkit Academy",
    role: "Machine Learning Mentor",
    period: "Feb 2024 - Aug 2024",
    country: "Indonesia",
    jobType: "Remote",
    description: "Mentored and guided 25 students through an intensive machine learning curriculum, weekly meetings, resulting in an exceptional graduation rate.",
    tasks: [
      "Designed and facilitated engaging Instructor-Led Training sessions.",
      "Covering advanced topics in machine learning, data analysis, Al applications, and soft skills.",
      "Provided personalized feedback and support to students."
    ],
    icon: "https://cdn-icons-png.flaticon.com/512/2111/2111624.png",
    website: "https://www.dicoding.com/",
  },
  {
    company: "PT Bank Negara Indonesia (Persero) Tbk.",
    role: "API Developer Intern",
    period: "Aug 2023 - Dec 2023",
    country: "Indonesia",
    jobType: "Hybrid",
    description: "Developed BNI's Policy Maker, a low-code platform that enables internal developers to efficiently create, manage, and deploy APIs.",
    tasks: [
      "Designed and implemented a drag-and-drop interface.",
      "Streamlining API creation for non-technical users.",
      "Achieved a perfect completion score of 90 (Α)."
    ],
    icon: "https://cdn-icons-png.flaticon.com/512/2111/2111624.png",
    website: "https://www.dicoding.com/",
  },
];

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
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className="md:col-span-1 flex items-start gap-4">
            <div>
              <h3 className="font-bold">{exp.role}</h3>
              <div className="flex flex-row items-center gap-2">
                <Image src={exp.icon} alt={`${exp.company} logo`} width={16} height={16} className="h-4 w-4 object-contain" />
                <Link href={exp.website} target="_blank" rel="noopener noreferrer" className="text-primary underline text-sm">
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