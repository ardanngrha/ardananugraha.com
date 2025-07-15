import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    username: string;
  }
}

// Base content item interface
export interface ContentItem {
  slug: string;
  readTime: number;
}

// Enhanced project frontmatter interface
export interface ProjectFrontmatter {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  status?: 'completed' | 'in-progress' | 'planned';
  featured?: boolean;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  bulletPoints?: string[];
  [key: string]: unknown;
}

// Enhanced writing frontmatter interface
export interface WritingFrontmatter {
  title: string;
  date: string;
  summary: string;
  image?: string;
  tags: string[];
  featured?: boolean;
  category?: string;
  readTime?: string;
  [key: string]: unknown;
}

// Enhanced project interface
export interface EnhancedProject extends ContentItem {
  content: string;
  frontmatter: ProjectFrontmatter;
}

// Enhanced writing interface
export interface EnhancedWriting extends ContentItem {
  content: string;
  frontmatter: WritingFrontmatter;
}