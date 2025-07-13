
export interface ContentItem {
  slug: string;
  frontmatter: {
    title: string;
    summary?: string;
    date: string;
    tags?: string[];
    image?: string | null;
    [key: string]: unknown;
  };
}