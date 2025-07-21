// src/app/projects/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PageHeader } from '@/components/page-header';
import { ProjectsBg } from '@/components/backgrounds/projects-bg';
import { ProjectPageCard } from '@/components/projects/project-page-card';
import type { ContentItem } from '@/components/home/projects/types';

async function getAllProjects(): Promise<ContentItem[]> {
  const projectsDirectory = path.join(process.cwd(), 'public/content/projects');
  const filenames = await fs.readdir(projectsDirectory);

  const projects = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(projectsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: filename.replace(/\.mdx$/, ''),
        frontmatter: data as ContentItem['frontmatter'],
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
      <div className="flex flex-col max-w-5xl mx-auto px-4 py-16 gap-12">
        {allProjects.map((project) => (
          <ProjectPageCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}