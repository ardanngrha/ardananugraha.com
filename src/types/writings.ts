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

export interface WritingContentItem {
  slug: string;
  frontmatter: WritingFrontmatter;
}

export interface EnhancedWriting extends WritingContentItem {
  content: string;
  readTime: number;
}

export interface WritingCardProps {
  writing: EnhancedWriting;
  variant?: 'featured' | 'page';
}

export interface WritingsSectionProps {
  writings: EnhancedWriting[];
}
