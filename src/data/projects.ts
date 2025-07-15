import { getAllProjects, getProjectWithContent, getRelatedProjects } from '@/lib/posts';
import { EnhancedProject } from '@/lib/types';

// Re-export project utility functions for easy access
export { getAllProjects, getProjectWithContent, getRelatedProjects };

// Additional project-specific utility functions
export async function getFeaturedProjects(limit?: number): Promise<EnhancedProject[]> {
  const allProjects = await getAllProjects();
  const featuredProjects = allProjects.filter(project => project.frontmatter.featured);
  
  return limit ? featuredProjects.slice(0, limit) : featuredProjects;
}

export async function getProjectsByStatus(status: 'completed' | 'in-progress' | 'planned'): Promise<EnhancedProject[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter(project => project.frontmatter.status === status);
}

export async function getProjectsByTag(tag: string): Promise<EnhancedProject[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter(project => 
    project.frontmatter.tags.includes(tag)
  );
}

export async function getAllProjectTags(): Promise<string[]> {
  const allProjects = await getAllProjects();
  const tagSet = new Set<string>();
  
  allProjects.forEach(project => {
    project.frontmatter.tags.forEach(tag => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}