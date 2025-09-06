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

export interface ProjectContentItem {
  slug: string;
  frontmatter: ProjectFrontmatter;
}

export interface EnhancedProject extends ProjectContentItem {
  content: string;
  readTime?: number;
}

export interface ProjectCardProps {
  project: ProjectContentItem;
  variant?: 'featured' | 'page';
}

export interface ProjectsSectionProps {
  projects: ProjectContentItem[];
}

export interface ProjectsClientPageProps {
  projects: ProjectContentItem[];
}
