import {
  FaJs, FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaGitAlt, FaGithub, FaAws, FaLinux
} from 'react-icons/fa';
import {
  SiTypescript, SiExpress, SiSpringboot, SiPostgresql, SiMongodb, SiRedis, SiNginx, SiNextdotjs, SiHtml5, SiCss3, SiGnubash, SiGooglecloud, SiTensorflow, SiDiscord, SiNotion
} from 'react-icons/si';
import { VscAzure } from "react-icons/vsc";

const tech_stack = [
  { name: 'JavaScript', icon: <FaJs /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'Java', icon: <FaJava /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'Express.js', icon: <SiExpress /> },
  { name: 'Spring Boot', icon: <SiSpringboot /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'Redis', icon: <SiRedis /> },
  { name: 'Nginx', icon: <SiNginx /> },
  { name: 'React.js', icon: <FaReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'HTML', icon: <SiHtml5 /> },
  { name: 'CSS', icon: <SiCss3 /> },
  { name: 'Git', icon: <FaGitAlt /> },
  { name: 'Bash Scripting', icon: <SiGnubash /> },
  { name: 'Docker', icon: <FaDocker /> },
  { name: 'Linux', icon: <FaLinux /> },
  { name: 'GitHub Actions', icon: <FaGithub /> },
  { name: 'GCP', icon: <SiGooglecloud /> },
  { name: 'AWS', icon: <FaAws /> },
  { name: 'Azure', icon: <VscAzure /> },
  { name: 'TensorFlow', icon: <SiTensorflow /> },
  { name: 'Discord', icon: <SiDiscord /> },
  { name: 'Notion', icon: <SiNotion /> },
];

export default tech_stack;