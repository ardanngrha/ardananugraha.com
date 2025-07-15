import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates the estimated reading time for a piece of content.
 * @param content - The text content to be measured.
 * @returns The estimated reading time in minutes.
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const noOfWords = content.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
}

/**
 * Formats a date string into a relative time format (e.g., "2 mo ago").
 * @param dateString - The ISO date string to format.
 * @returns A string representing the relative time.
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const years = Math.floor(diffInSeconds / 31536000);
  if (years > 0) return `${years} yr${years > 1 ? 's' : ''} ago`;

  const months = Math.floor(diffInSeconds / 2592000);
  if (months > 0) return `${months} mo ago`;

  const days = Math.floor(diffInSeconds / 86400);
  if (days > 0) return `${days} d ago`;

  const hours = Math.floor(diffInSeconds / 3600);
  if (hours > 0) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
  
  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;

  return `just now`;
}

/**
 * Checks if a post is recent based on a given number of days.
 * @param dateString - The date of the post.
 * @param days - The threshold in days to be considered recent.
 * @returns A boolean indicating if the post is recent.
 */
export function isRecent(dateString: string, days = 30): boolean {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays <= days;
}

/**
 * Generates SEO-friendly metadata for content items.
 * @param item - The content item (project or writing).
 * @returns An object containing SEO metadata.
 */
export function generateSEOMetadata(item: {
  frontmatter: {
    title: string;
    summary: string;
    tags: string[];
    image?: string;
  };
  slug: string;
}) {
  return {
    title: item.frontmatter.title,
    description: item.frontmatter.summary,
    keywords: item.frontmatter.tags.join(', '),
    openGraph: {
      title: item.frontmatter.title,
      description: item.frontmatter.summary,
      images: item.frontmatter.image ? [{ url: item.frontmatter.image }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: item.frontmatter.title,
      description: item.frontmatter.summary,
      images: item.frontmatter.image ? [item.frontmatter.image] : [],
    },
  };
}

/**
 * Extracts and formats read time from frontmatter or calculates it from content.
 * @param frontmatter - The frontmatter object that may contain readTime.
 * @param content - The content string to calculate read time from.
 * @returns A formatted read time string.
 */
export function getFormattedReadTime(
  frontmatter: { readTime?: string },
  content: string
): string {
  if (frontmatter.readTime) {
    return frontmatter.readTime;
  }
  
  const calculatedMinutes = calculateReadTime(content);
  return `${calculatedMinutes} min read`;
}

/**
 * Normalizes tags for consistent comparison and filtering.
 * @param tags - Array of tag strings.
 * @returns Array of normalized tag strings.
 */
export function normalizeTags(tags: string[]): string[] {
  return tags.map(tag => tag.toLowerCase().trim()).filter(Boolean);
}

/**
 * Finds common tags between two arrays of tags.
 * @param tags1 - First array of tags.
 * @param tags2 - Second array of tags.
 * @returns Array of common tags.
 */
export function findCommonTags(tags1: string[], tags2: string[]): string[] {
  const normalizedTags1 = normalizeTags(tags1);
  const normalizedTags2 = normalizeTags(tags2);
  
  return normalizedTags1.filter(tag => normalizedTags2.includes(tag));
}

/**
 * Truncates text to a specified length with ellipsis.
 * @param text - The text to truncate.
 * @param maxLength - Maximum length of the text.
 * @returns Truncated text with ellipsis if needed.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}