"use client"

import { motion } from "framer-motion";

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
    ]
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
    ]
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
    ]
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
    ]
  },
];

export function ExperienceTimeline() {
  return (
    <div className="space-y-12">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold">{exp.role}</h3>
            <p className="text-primary">{exp.company}</p>
            <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
            <p className="text-sm text-muted-foreground">{exp.country} • {exp.jobType}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-muted-foreground mb-4">{exp.description}</p>
            <ul className="list-disc list-inside space-y-2">
              {exp.tasks.map((task, i) => (
                <li key={i} className="text-muted-foreground">{task}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}