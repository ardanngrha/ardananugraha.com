// src/app/projects/page.tsx
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { PageHeader } from '@/components/page-header';
import { ProjectsBg } from '@/components/backgrounds/projects-bg';
import { ProjectContentItem } from '@/types/projects';
import { ProjectsClientPage } from './client';

async function getAllProjects(): Promise<ProjectContentItem[]> {
  const projectsDirectory = path.join(process.cwd(), 'public/content/projects');
  const filenames = await fs.readdir(projectsDirectory);

  const projects = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(projectsDirectory, filename);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug: filename.replace(/\.mdx$/, ''),
        frontmatter: data as ProjectContentItem['frontmatter'],
      };
    }),
  );

  // Sort projects by date in descending order
  return projects.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );
}

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Here are some of the projects I'm proud of. They range from software engineering to machine learning."
        background={<ProjectsBg />}
      />
      <ProjectsClientPage projects={allProjects} />
    </div>
  );
}
