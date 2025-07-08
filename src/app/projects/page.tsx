// src/app/projects/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

async function getAllProjects() {
  const projectsDirectory = path.join(process.cwd(), 'public/content/projects');
  const filenames = await fs.readdir(projectsDirectory);

  const projects = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(projectsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContents); // We only need frontmatter here

      return {
        slug: filename.replace(/\.mdx$/, ''),
        frontmatter: data,
      };
    })
  );

  // Sort projects by date in descending order
  return projects.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <div className="pt-8 md:pt-16">
      {/* Centered title section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Projects</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore my portfolio of software projects, from web applications to open-source contributions.
        </p>
      </div>

      {/* Projects content */}
      <div className="max-w-4xl mx-auto space-y-6">
        {allProjects.map((project) => (
          <div key={project.slug}>
            <Link href={`/projects/${project.slug}`}>
              <h2 className="text-2xl font-semibold hover:underline">
                {project.frontmatter.title}
              </h2>
            </Link>
            <p className="text-muted-foreground mt-2">
              {project.frontmatter.summary}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {new Date(project.frontmatter.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}