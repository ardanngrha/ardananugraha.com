'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^#{1,6}\s+(.+)$/gm;
    const headings: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[0].indexOf(' ');
      const text = match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      headings.push({ id, text, level });
    }

    setTocItems(headings);
  }, [content]);

  useEffect(() => {
    // Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0.1,
      }
    );

    // Wait for DOM to be ready and find all headings
    const findAndObserveHeadings = () => {
      const headingElements = tocItems.map(item => {
        // Try different selectors to find the heading
        const element = document.getElementById(item.id) ||
          document.querySelector(`[id="${item.id}"]`) ||
          document.querySelector(`h1, h2, h3, h4, h5, h6`)?.querySelector(`[id*="${item.id}"]`) ||
          Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).find(el =>
            el.textContent?.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim() === item.id
          );
        return element as HTMLElement;
      }).filter(Boolean);

      headingElements.forEach(el => el && observer.observe(el));

      return () => {
        headingElements.forEach(el => el && observer.unobserve(el));
      };
    };

    // Use a timeout to ensure DOM is ready
    const timeoutId = setTimeout(findAndObserveHeadings, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [tocItems]);

  if (tocItems.length === 0) {
    return null;
  }

  const scrollToSection = (id: string) => {
    // Try multiple methods to find the element
    let element = document.getElementById(id);

    if (!element) {
      // Try finding by data attribute or other selectors
      element = document.querySelector(`[id="${id}"]`) as HTMLElement;
    }

    if (!element) {
      // Try finding by text content match
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      element = headings.find(el =>
        el.textContent?.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim() === id
      ) as HTMLElement;
    }

    if (!element) {
      // Try finding by partial text match
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const tocItem = tocItems.find(item => item.id === id);
      if (tocItem) {
        element = headings.find(el =>
          el.textContent?.trim().toLowerCase().includes(tocItem.text.toLowerCase())
        ) as HTMLElement;
      }
    }

    if (element) {
      // Add some offset to account for fixed headers
      const yOffset = -20;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });

      // Update active state immediately
      setActiveId(id);
    } else {
      console.warn(`Could not find element with id: ${id}`);
    }
  };

  return (
    <nav
      className={cn(
        'space-y-2', // Hide on mobile, show on md+
        className
      )}
      aria-label="Table of contents"
    >
      {tocItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={cn(
            'block w-full text-left text-sm py-0.5 rounded transition-colors cursor-pointer',
            activeId === item.id
              ? 'text-primary font-semibold'
              : 'text-muted-foreground hover:text-foreground',
            item.level === 1 && 'font-medium',
            item.level === 2 && 'ml-1',
            item.level === 3 && 'ml-3 text-xs',
            item.level === 4 && 'ml-5 text-xs',
            item.level === 5 && 'ml-7 text-xs',
            item.level === 6 && 'ml-9 text-xs'
          )}
          title={item.text}
        >
          <span className="line-clamp-2 leading-tight">
            {item.text}
          </span>
        </button>
      ))}
    </nav>
  );
}