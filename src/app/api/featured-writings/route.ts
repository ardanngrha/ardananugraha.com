import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const writingsDirectory = path.join(process.cwd(), 'public/content/writings');
    const filenames = await fs.readdir(writingsDirectory);

    const writings = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(writingsDirectory, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug: filename.replace(/\.mdx$/, ''),
          frontmatter: data,
        };
      })
    );

    const featuredWritings = writings
      .filter(writing => writing.frontmatter.featured)
      .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

    // Ensure multiple of 2
    const evenCount = featuredWritings.length - (featuredWritings.length % 2);
    return NextResponse.json(featuredWritings.slice(0, evenCount > 0 ? evenCount : 2));
  } catch (error) {
    console.error('Error fetching featured writings:', error);
    return NextResponse.json([], { status: 500 });
  }
}