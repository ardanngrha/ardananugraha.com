import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const projectsDirectory = path.join(
      process.cwd(),
      'public/content/projects',
    );
    const filenames = await fs.readdir(projectsDirectory);

    const projects = await Promise.all(
      filenames.map(async (filename) => {
        const filePath = path.join(projectsDirectory, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data } = matter(fileContents);

        return {
          slug: filename.replace(/\.mdx$/, ''),
          frontmatter: data,
        };
      }),
    );

    const featuredProjects = projects
      .filter((project) => project.frontmatter.featured)
      .sort(
        (a, b) =>
          new Date(b.frontmatter.date).getTime() -
          new Date(a.frontmatter.date).getTime(),
      );

    // Ensure multiple of 2
    const evenCount = featuredProjects.length - (featuredProjects.length % 2);
    return NextResponse.json(
      featuredProjects.slice(0, evenCount > 0 ? evenCount : 2),
      {
        headers: {
          'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
        },
      },
    );
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return NextResponse.json([], {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  }
}
