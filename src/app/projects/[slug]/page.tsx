// src/app/projects/[slug]/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

// This function tells Next.js which routes to pre-render at build time.
export async function generateStaticParams() {
  const projectsDirectory = path.join(process.cwd(), 'public/content/projects');
  const filenames = await fs.readdir(projectsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ''),
  }));
}

// Helper function to get a specific project by its slug
async function getProject(slug: string) {
  const projectsDirectory = path.join(process.cwd(), 'public/content/projects');
  const filePath = path.join(projectsDirectory, `${slug}.mdx`);

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return { frontmatter: data, content, found: true };
  } catch {
    return { found: false, frontmatter: {}, content: '' };
  }
}

// The main page component
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { frontmatter, content, found } = await getProject(slug);

  if (!found) {
    return <div>Project not found.</div>;
  }

  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-2">{String(frontmatter.title)}</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Published on {new Date(String(frontmatter.date)).toLocaleDateString()}
      </p>

      <MDXRemote source={content} />
    </article>
  );
}