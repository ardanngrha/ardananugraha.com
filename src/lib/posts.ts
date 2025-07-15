import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calculateReadTime } from './utils';

export interface WritingFrontmatter {
    title: string;
    date: string;
    summary: string;
    image: string;
    tags: string[];
    [key: string]: unknown;
}

export interface Writing {
    slug: string;
    frontmatter: WritingFrontmatter;
    readTime: number;
}

export async function getAllWritings(): Promise<Writing[]> {
  const writingsDirectory = path.join(process.cwd(), 'public/content/writings');
  const filenames = await fs.readdir(writingsDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(writingsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace(/\.mdx$/, ''),
        frontmatter: data as WritingFrontmatter,
        readTime: calculateReadTime(content),
      };
    })
  );

  // Default sort by date in descending order
  return posts.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}