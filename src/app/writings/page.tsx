// src/app/writings/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { WritingsBg } from '@/components/backgrounds/writings-bg';
import { PageHeader } from '@/components/page-header';

async function getAllPosts() {
  const writingsDirectory = path.join(process.cwd(), 'public/content/writings');
  const filenames = await fs.readdir(writingsDirectory);

  const posts = await Promise.all(
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

  // Sort posts by date in descending order
  return posts.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export default async function WritingsPage() {
  const allPosts = await getAllPosts();

  return (
    <div>
      <PageHeader
        title="Writings"
        description="Thoughts, insights, and tutorials on software development, technology trends, and my learning journey."
        background={<WritingsBg />}
      />
      <div className="max-w-4xl mx-auto px-4 py-16">
        {allPosts.map((post) => (
          <div key={post.slug}>
            <Link href={`/writings/${post.slug}`}>
              <h2 className="text-2xl font-semibold hover:underline">
                {post.frontmatter.title}
              </h2>
            </Link>
            <p className="text-muted-foreground mt-2">
              {post.frontmatter.summary}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {new Date(post.frontmatter.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}