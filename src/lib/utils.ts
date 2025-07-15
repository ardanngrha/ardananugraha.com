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