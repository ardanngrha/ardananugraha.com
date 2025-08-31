import { FaLaptopCode, FaCode, FaRocket, FaBrain, FaUsers, FaServer, FaDatabase } from "react-icons/fa";
import { MdScreenshotMonitor } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { JourneyStep, StackCategory } from "@/types/highlights";

export const journeySteps: JourneyStep[] = [
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
    gradient: "from-slate-400 via-slate-500 to-slate-600"
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
    gradient: "from-emerald-400 via-emerald-500 to-teal-600"
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
    gradient: "from-amber-400 via-orange-500 to-red-600"
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
    gradient: "from-purple-400 via-violet-500 to-indigo-600"
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
    gradient: "from-rose-400 via-pink-500 to-red-600"
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
    gradient: "from-cyan-400 via-blue-500 to-indigo-600"
  }
];

export const stackCategories: StackCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: MdScreenshotMonitor,
    technologies: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS"],
    words: ["pixel-perfect interfaces", "seamless user journeys", "interactive experiences"],
    gradient: "from-blue-400 to-purple-500",
    activeGradient: "from-blue-400 via-purple-500 to-pink-500"
  },
  {
    id: "backend",
    title: "Backend",
    icon: FaLaptopCode,
    technologies: ["Node.js", "Express", "Spring Boot", "FastAPI", "Flask", "Django", "JavaScript", "TypeScript", "Java", "Python"],
    words: ["robust APIs", "distributed systems", "high-performance servers"],
    gradient: "from-green-400 to-blue-500",
    activeGradient: "from-green-400 via-teal-500 to-blue-500"
  },
  {
    id: "ai-ml",
    title: "AI & ML",
    icon: FaBrain,
    technologies: ["TensorFlow", "Python"],
    words: ["intelligent algorithms", "machine learning", "data-driven insights"],
    gradient: "from-purple-400 to-pink-500",
    activeGradient: "from-purple-400 via-pink-500 to-red-500"
  },
  {
    id: "database",
    title: "Database",
    icon: FaDatabase,
    technologies: ["PostgreSQL", "MongoDB", "Redis"],
    words: ["efficient data storage", "optimized queries", "real-time caching"],
    gradient: "from-indigo-400 to-blue-500",
    activeGradient: "from-indigo-400 via-blue-500 to-teal-500"
  },
  {
    id: "messaging",
    title: "Messaging",
    icon: TiMessages,
    technologies: ["Kafka", "RabbitMQ"],
    words: ["event-driven architecture", "reliable message queues", "real-time data streaming"],
    gradient: "from-yellow-400 to-orange-500",
    activeGradient: "from-yellow-400 via-orange-500 to-red-500"
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    icon: FaServer,
    technologies: ["AWS", "GCP", "Docker", "Kubernetes", "Linux", "Nginx"],
    words: ["scalable cloud solutions", "automated deployments", "system reliability"],
    gradient: "from-orange-400 to-red-500",
    activeGradient: "from-orange-400 via-red-500 to-pink-500"
  }
];