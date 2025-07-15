// src/components/home/projects/types.ts
export interface ProjectFrontmatter {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  image?: string; // Stays optional
  githubUrl?: string; // Explicitly optional
  liveUrl?: string; // Explicitly optional
}

export interface ContentItem {
  slug: string;
  frontmatter: ProjectFrontmatter;
}