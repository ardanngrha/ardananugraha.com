import {
  getAllProjects,
  getAllEnhancedWritings,
  getProjectWithContent,
  getWritingWithContent,
  getRelatedProjects,
  getRelatedWritings,
} from './posts';
import { generateSEOMetadata, getFormattedReadTime } from './utils';
import { EnhancedProject } from '../types/projects';
import { EnhancedWriting } from '../types/writings';

// Content fetching utilities
export async function getContentWithMetadata(
  type: 'project' | 'writing',
  slug: string,
): Promise<
  | ((EnhancedProject | EnhancedWriting) & {
      seoMetadata: ReturnType<typeof generateSEOMetadata>;
    })
  | null
> {
  let content: EnhancedProject | EnhancedWriting | null = null;

  if (type === 'project') {
    content = await getProjectWithContent(slug);
  } else {
    content = await getWritingWithContent(slug);
  }

  if (!content) return null;

  return {
    ...content,
    seoMetadata: generateSEOMetadata(content),
  };
}

// Navigation utilities
export async function getAdjacentContent(
  type: 'projects' | 'writings',
  currentSlug: string,
): Promise<{
  previous: EnhancedProject | EnhancedWriting | null;
  next: EnhancedProject | EnhancedWriting | null;
}> {
  let allContent: (EnhancedProject | EnhancedWriting)[] = [];

  if (type === 'projects') {
    allContent = await getAllProjects();
  } else {
    allContent = await getAllEnhancedWritings();
  }

  const currentIndex = allContent.findIndex(
    (item) => item.slug === currentSlug,
  );

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? allContent[currentIndex - 1] : null,
    next:
      currentIndex < allContent.length - 1
        ? allContent[currentIndex + 1]
        : null,
  };
}

// Enhanced content filtering
export async function getFilteredContent<
  T extends EnhancedProject | EnhancedWriting,
>(
  type: 'projects' | 'writings',
  filters: {
    tags?: string[];
    featured?: boolean;
    status?: 'completed' | 'in-progress' | 'planned'; // Only for projects
    category?: string; // Only for writings
    limit?: number;
  } = {},
): Promise<T[]> {
  let allContent: (EnhancedProject | EnhancedWriting)[] = [];

  if (type === 'projects') {
    allContent = await getAllProjects();
  } else {
    allContent = await getAllEnhancedWritings();
  }

  let filteredContent = allContent;

  // Filter by tags
  if (filters.tags && filters.tags.length > 0) {
    filteredContent = filteredContent.filter((item) =>
      filters.tags!.some((tag) => item.frontmatter.tags.includes(tag)),
    );
  }

  // Filter by featured status
  if (filters.featured !== undefined) {
    filteredContent = filteredContent.filter(
      (item) => item.frontmatter.featured === filters.featured,
    );
  }

  // Filter by project status (only for projects)
  if (type === 'projects' && filters.status) {
    filteredContent = filteredContent.filter(
      (item) => (item as EnhancedProject).frontmatter.status === filters.status,
    );
  }

  // Filter by writing category (only for writings)
  if (type === 'writings' && filters.category) {
    filteredContent = filteredContent.filter(
      (item) =>
        (item as EnhancedWriting).frontmatter.category === filters.category,
    );
  }

  // Apply limit
  if (filters.limit) {
    filteredContent = filteredContent.slice(0, filters.limit);
  }

  return filteredContent as T[];
}

// Content statistics
export async function getContentStats(): Promise<{
  projects: {
    total: number;
    featured: number;
    completed: number;
    inProgress: number;
    planned: number;
  };
  writings: {
    total: number;
    featured: number;
    categories: Record<string, number>;
  };
  tags: {
    all: string[];
    popular: Array<{ tag: string; count: number }>;
  };
}> {
  const [allProjects, allWritings] = await Promise.all([
    getAllProjects(),
    getAllEnhancedWritings(),
  ]);

  // Project stats
  const projectStats = {
    total: allProjects.length,
    featured: allProjects.filter((p) => p.frontmatter.featured).length,
    completed: allProjects.filter((p) => p.frontmatter.status === 'completed')
      .length,
    inProgress: allProjects.filter(
      (p) => p.frontmatter.status === 'in-progress',
    ).length,
    planned: allProjects.filter((p) => p.frontmatter.status === 'planned')
      .length,
  };

  // Writing stats
  const categories: Record<string, number> = {};
  allWritings.forEach((writing) => {
    if (writing.frontmatter.category) {
      categories[writing.frontmatter.category] =
        (categories[writing.frontmatter.category] || 0) + 1;
    }
  });

  const writingStats = {
    total: allWritings.length,
    featured: allWritings.filter((w) => w.frontmatter.featured).length,
    categories,
  };

  // Tag stats
  const tagCounts: Record<string, number> = {};
  [...allProjects, ...allWritings].forEach((item) => {
    item.frontmatter.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const allTags = Object.keys(tagCounts).sort();
  const popularTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    projects: projectStats,
    writings: writingStats,
    tags: {
      all: allTags,
      popular: popularTags,
    },
  };
}

// Content search functionality
export async function searchContent(
  query: string,
  type?: 'projects' | 'writings',
): Promise<{
  projects: EnhancedProject[];
  writings: EnhancedWriting[];
}> {
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) {
    return { projects: [], writings: [] };
  }

  const [allProjects, allWritings] = await Promise.all([
    type === 'writings' ? [] : getAllProjects(),
    type === 'projects' ? [] : getAllEnhancedWritings(),
  ]);

  const searchInContent = (
    item: EnhancedProject | EnhancedWriting,
  ): boolean => {
    const searchableText = [
      item.frontmatter.title,
      item.frontmatter.summary,
      ...item.frontmatter.tags,
      item.content,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(searchTerm);
  };

  return {
    projects: allProjects.filter(searchInContent),
    writings: allWritings.filter(searchInContent),
  };
}

// Export all utility functions for easy access
export {
  getAllProjects,
  getAllEnhancedWritings,
  getProjectWithContent,
  getWritingWithContent,
  getRelatedProjects,
  getRelatedWritings,
  generateSEOMetadata,
  getFormattedReadTime,
};
