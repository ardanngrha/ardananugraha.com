
export interface ContentItem {
  slug: string;
  frontmatter: {
    title: string;
    summary?: string;
    date: string;
    category?: string;
    [key: string]: unknown;
  };
}