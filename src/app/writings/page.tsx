// src/app/writings/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

async function getAllPosts() {
  const writingsDirectory = path.join(process.cwd(), 'public/content/writings');
  const filenames = await fs.readdir(writingsDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(writingsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContents); // We only need frontmatter here

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
    <div className="pt-8 md:pt-16 pb-8 md:pb-16">
      {/* Centered title section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 font-handwriting">Writings</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
          Thoughts, insights, and tutorials on software development, technology trends, and my learning journey.
        </p>
      </div>

      {/* Writings content */}
      <div className="max-w-4xl mx-auto space-y-6">
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