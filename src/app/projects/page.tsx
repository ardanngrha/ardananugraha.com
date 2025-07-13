// src/app/projects/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { ProjectsBg } from '@/components/backgrounds/projects-bg';

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
    <div>
      <PageHeader
        title="Projects"
        description="Here are some of the projects I'm proud of. They range from web development to data science."
        background={<ProjectsBg />}
      />
      <div className="max-w-4xl mx-auto px-4 py-16">
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