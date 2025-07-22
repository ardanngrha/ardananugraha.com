import { ContentItem } from './content';

export interface ProjectFrontmatter {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  status?: 'completed' | 'in-progress' | 'planned';
  featured?: boolean;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  bulletPoints?: string[];
  [key: string]: unknown;
}

export interface EnhancedProject extends ContentItem {
  content: string;
  frontmatter: ProjectFrontmatter;
}