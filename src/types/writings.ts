import { ContentItem } from './content';

export interface WritingFrontmatter {
  title: string;
  date: string;
  summary: string;
  image?: string;
  tags: string[];
  featured?: boolean;
  category?: string;
  readTime?: string;
  [key: string]: unknown;
}

export interface EnhancedWriting extends ContentItem {
  content: string;
  frontmatter: WritingFrontmatter;
}

export interface Writing {
    slug: string;
    frontmatter: WritingFrontmatter;
    readTime: number;
}