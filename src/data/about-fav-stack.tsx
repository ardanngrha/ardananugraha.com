import { FaPython, FaJava, FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

const favStack = [
  {
    name: "Python",
    icon: <FaPython className="h-8 w-8" />,
    reason: "Its versatility and extensive libraries make it my go-to for backend development and machine learning.",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="h-8 w-8" />,
    reason: "I love the type safety and developer experience it brings to JavaScript projects, especially in large-scale applications.",
  },
  {
    name: "Java",
    icon: <FaJava className="h-8 w-8" />,
    reason: "A robust and reliable language that I enjoy using for building scalable and high-performance enterprise applications.",
  },
  {
    name: "React",
    icon: <FaReact className="h-8 w-8" />,
    reason: "Its component-based architecture and declarative nature make building complex UIs a breeze. The ecosystem is fantastic!",
  },
];

export default favStack;