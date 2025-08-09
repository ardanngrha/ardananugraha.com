import { FaPython, SiTypescript, FaReact, SiTensorflow } from "./tech-icons";

const favStack = [
  {
    name: "Python",
    icon: <FaPython className="h-8 w-8 text-blue-400" />,
    reason: "My go-to language for machine learning, data science, and backend development. Its versatility and extensive libraries make it perfect for everything from ML models to web APIs.",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="h-8 w-8 text-blue-500" />,
    reason: "I love the type safety and developer experience it brings to JavaScript projects, especially in large-scale applications. Essential for maintainable code.",
  },
  {
    name: "React",
    icon: <FaReact className="h-8 w-8 text-blue-400" />,
    reason: "Its component-based architecture and declarative nature make building complex UIs a breeze. The ecosystem is fantastic for modern web development!",
  },
  {
    name: "TensorFlow",
    icon: <SiTensorflow className="h-8 w-8 text-orange-500" />,
    reason: "My preferred framework for machine learning and deep learning projects. From recommendation systems to computer vision, it handles everything beautifully.",
  },
];

export default favStack;