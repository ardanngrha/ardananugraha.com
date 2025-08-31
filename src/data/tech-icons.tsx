import {
  FaJs, FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaGitAlt, FaGithub, FaAws, FaLinux, FaAndroid, FaSwift
} from 'react-icons/fa';
import {
  SiTypescript, SiExpress, SiSpringboot, SiPostgresql, SiMongodb, SiRedis, SiNginx, SiNextdotjs, SiHtml5, SiCss3, SiGnubash, SiGooglecloud, SiTensorflow, SiDiscord, SiNotion, SiFastapi, SiBootstrap, SiJquery,
  SiFigma,
  SiFlask,
  SiKubernetes,
  SiDjango,
  SiRabbitmq,
  SiApachekafka
} from 'react-icons/si';
import { VscAzure, VscVscode } from "react-icons/vsc";

const tech_icons = [
  { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-blue-500" /> },
  { name: 'Python', icon: <FaPython className="text-blue-400" /> },
  { name: 'Java', icon: <FaJava className="text-red-500" /> },
  { name: 'Node.js', icon: <FaNodeJs className="text-green-600" /> },
  { name: 'Express', icon: <SiExpress className="text-gray-800 dark:text-gray-200" /> },
  { name: 'Spring Boot', icon: <SiSpringboot className="text-green-700" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-700" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
  { name: 'Redis', icon: <SiRedis className="text-red-500" /> },
  { name: 'Nginx', icon: <SiNginx className="text-green-700" /> },
  { name: 'React', icon: <FaReact className="text-blue-400" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-black dark:text-white" /> },
  { name: 'HTML', icon: <SiHtml5 className="text-orange-600" /> },
  { name: 'CSS', icon: <SiCss3 className="text-blue-600" /> },
  { name: 'Git', icon: <FaGitAlt className="text-orange-500" /> },
  { name: 'Bash', icon: <SiGnubash className="text-green-700" /> },
  { name: 'Docker', icon: <FaDocker className="text-blue-500" /> },
  { name: 'Linux', icon: <FaLinux className="text-yellow-500" /> },
  { name: 'GitHub Actions', icon: <FaGithub className="text-gray-800 dark:text-gray-200" /> },
  { name: 'GCP', icon: <SiGooglecloud className="text-blue-600" /> },
  { name: 'AWS', icon: <FaAws className="text-orange-400" /> },
  { name: 'Azure', icon: <VscAzure className="text-blue-700" /> },
  { name: 'TensorFlow', icon: <SiTensorflow className="text-orange-500" /> },
  { name: 'Discord', icon: <SiDiscord className="text-indigo-500" /> },
  { name: 'Notion', icon: <SiNotion className="text-black dark:text-white" /> },
  { name: 'Android', icon: <FaAndroid className="text-green-400" /> },
  { name: 'FastAPI', icon: <SiFastapi className="text-green-500" /> },
  { name: 'Swift', icon: <FaSwift className="text-orange-500" /> },
  { name: 'Bootstrap', icon: <SiBootstrap className="text-purple-600" /> },
  { name: 'jQuery', icon: <SiJquery className="text-blue-400" /> },
  { name: 'Figma', icon: <SiFigma className="text-purple-500" /> },
  { name: 'VSCode', icon: <VscVscode className="text-blue-500" /> },
  { name: 'Flask', icon: <SiFlask className="text-blue-500" /> },
  { name: 'Kubernetes', icon: <SiKubernetes className="text-blue-500" /> },
  { name: 'Django', icon: <SiDjango className="text-green-500" /> },
  { name: 'RabbitMQ', icon: <SiRabbitmq className="text-orange-500" /> },
  { name: 'Kafka', icon: <SiApachekafka className="text-purple-500" /> }
];

export default tech_icons;

export {
  FaPython,
  SiTypescript,
  FaReact,
  SiTensorflow,
};