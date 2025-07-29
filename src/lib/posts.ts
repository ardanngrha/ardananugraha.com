import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { calculateReadTime } from './utils';
import { ProjectFrontmatter, EnhancedProject } from '@/types/projects';
import { WritingFrontmatter, EnhancedWriting } from '@/types/writings';

// Enhanced utility functions for projects
export async function getAllProjects(): Promise<EnhancedProject[]> {
  const projectsDirectory = path.join(process.cwd(), 'public/content/projects');
  
  try {
    const filenames = await fs.readdir(projectsDirectory);
    
    const projects = await Promise.all(
      filenames
        .filter(filename => filename.endsWith('.mdx'))
        .map(async (filename) => {
          const filePath = path.join(projectsDirectory, filename);
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data, content } = matter(fileContents);

          return {
            slug: filename.replace(/\.mdx$/, ''),
            frontmatter: data as ProjectFrontmatter,
            content,
            readTime: calculateReadTime(content),
          };
        })
    );

    // Sort by date in descending order, then by featured status
    return projects.sort((a, b) => {
      // Featured projects first
      if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
      if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
      
      // Then by date
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
  } catch (error) {
    console.error('Error reading projects directory:', error);
    return [];
  }
}

export async function getProjectWithContent(slug: string): Promise<EnhancedProject | null> {
  const projectsDirectory = path.join(process.cwd(), 'public/content/projects');
  const filePath = path.join(projectsDirectory, `${slug}.mdx`);

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as ProjectFrontmatter,
      content,
      readTime: calculateReadTime(content),
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

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

// Enhanced utility functions for writings
export async function getAllWritings(): Promise<EnhancedWriting[]> {
  const writingsDirectory = path.join(process.cwd(), 'public/content/writings');
  
  try {
    const filenames = await fs.readdir(writingsDirectory);

    const posts = await Promise.all(
      filenames
        .filter(filename => filename.endsWith('.mdx'))
        .map(async (filename) => {
          const filePath = path.join(writingsDirectory, filename);
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data, content } = matter(fileContents);

          return {
            slug: filename.replace(/\.mdx$/, ''),
            frontmatter: data as WritingFrontmatter,
            content,
            readTime: calculateReadTime(content),
          };
        })
    );

    // Sort by date in descending order, then by featured status
    return posts.sort((a, b) => {
      // Featured writings first
      if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
      if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
      
      // Then by date
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
  } catch (error) {
    console.error('Error reading writings directory:', error);
    return [];
  }
}

export async function getAllEnhancedWritings(): Promise<EnhancedWriting[]> {
  const writingsDirectory = path.join(process.cwd(), 'public/content/writings');
  
  try {
    const filenames = await fs.readdir(writingsDirectory);

    const writings = await Promise.all(
      filenames
        .filter(filename => filename.endsWith('.mdx'))
        .map(async (filename) => {
          const filePath = path.join(writingsDirectory, filename);
          const fileContents = await fs.readFile(filePath, 'utf8');
          const { data, content } = matter(fileContents);

          return {
            slug: filename.replace(/\.mdx$/, ''),
            frontmatter: data as WritingFrontmatter,
            content,
            readTime: calculateReadTime(content),
          };
        })
    );

    // Sort by date in descending order, then by featured status
    return writings.sort((a, b) => {
      // Featured writings first
      if (a.frontmatter.featured && !b.frontmatter.featured) return -1;
      if (!a.frontmatter.featured && b.frontmatter.featured) return 1;
      
      // Then by date
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
  } catch (error) {
    console.error('Error reading writings directory:', error);
    return [];
  }
}

export async function getWritingWithContent(slug: string): Promise<EnhancedWriting | null> {
  const writingsDirectory = path.join(process.cwd(), 'public/content/writings');
  const filePath = path.join(writingsDirectory, `${slug}.mdx`);

  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as WritingFrontmatter,
      content,
      readTime: calculateReadTime(content),
    };
  } catch (error) {
    console.error(`Error reading writing ${slug}:`, error);
    return null;
  }
}

// Related content functions
export async function getRelatedProjects(
  tags: string[], 
  currentSlug: string, 
  limit: number = 3
): Promise<EnhancedProject[]> {
  const allProjects = await getAllProjects();
  
  // Filter out current project and find projects with matching tags
  const relatedProjects = allProjects
    .filter(project => project.slug !== currentSlug)
    .map(project => {
      const matchingTags = project.frontmatter.tags.filter(tag => 
        tags.includes(tag)
      );
      return {
        ...project,
        matchScore: matchingTags.length,
      };
    })
    .filter(project => project.matchScore > 0)
    .sort((a, b) => {
      // Sort by match score first, then by date
      if (a.matchScore !== b.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    })
    .slice(0, limit);

  return relatedProjects.map(item => ({
    slug: item.slug,
    frontmatter: item.frontmatter,
    content: item.content,
    readTime: item.readTime,
  }));
}

export async function getRelatedWritings(
  tags: string[], 
  currentSlug: string, 
  limit: number = 3
): Promise<EnhancedWriting[]> {
  const allWritings = await getAllEnhancedWritings();
  
  // Filter out current writing and find writings with matching tags
  const relatedWritings = allWritings
    .filter(writing => writing.slug !== currentSlug)
    .map(writing => {
      const matchingTags = writing.frontmatter.tags.filter(tag => 
        tags.includes(tag)
      );
      return {
        ...writing,
        matchScore: matchingTags.length,
      };
    })
    .filter(writing => writing.matchScore > 0)
    .sort((a, b) => {
      // Sort by match score first, then by date
      if (a.matchScore !== b.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    })
    .slice(0, limit);

  return relatedWritings.map(item => ({
    slug: item.slug,
    frontmatter: item.frontmatter,
    content: item.content,
    readTime: item.readTime,
  }));
}

// Generic related content function
export async function getRelatedContent<T extends EnhancedProject | EnhancedWriting>(
  contentType: 'projects' | 'writings',
  tags: string[],
  currentSlug: string,
  limit: number = 3
): Promise<T[]> {
  if (contentType === 'projects') {
    return getRelatedProjects(tags, currentSlug, limit) as Promise<T[]>;
  } else {
    return getRelatedWritings(tags, currentSlug, limit) as Promise<T[]>;
  }
}

// Navigation functions for prev/next
export async function getProjectNavigation(currentSlug: string): Promise<{
  prev: EnhancedProject | null;
  next: EnhancedProject | null;
}> {
  const allProjects = await getAllProjects();
  const currentIndex = allProjects.findIndex(project => project.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? allProjects[currentIndex - 1] : null,
    next: currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null,
  };
}

export async function getWritingNavigation(currentSlug: string): Promise<{
  prev: EnhancedWriting | null;
  next: EnhancedWriting | null;
}> {
  const allWritings = await getAllEnhancedWritings();
  const currentIndex = allWritings.findIndex(writing => writing.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? allWritings[currentIndex - 1] : null,
    next: currentIndex < allWritings.length - 1 ? allWritings[currentIndex + 1] : null,
  };
}