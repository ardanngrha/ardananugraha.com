"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WritingCard } from '@/components/writings/writing-card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Writing } from '@/lib/posts';
import { FaChevronDown, FaTag } from 'react-icons/fa';
import { Separator } from "@/components/ui/separator"

type SortOption = 'newest' | 'oldest' | 'a-z' | 'z-a';

interface WritingsClientPageProps {
  allPosts: Writing[];
  allTopics: string[];
}

export default function WritingsClientPage({ allPosts, allTopics }: WritingsClientPageProps) {
  const [sortOrder, setSortOrder] = useState<SortOption>('newest');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const handleTopicClick = (topic: string) => {
    setSelectedTopics(prevTopics =>
      prevTopics.includes(topic)
        ? prevTopics.filter(t => t !== topic)
        : [...prevTopics, topic]
    );
  };

  const filteredAndSortedPosts = useMemo(() => {
    const filtered = selectedTopics.length === 0
      ? allPosts
      : allPosts.filter(post =>
        selectedTopics.some(topic => post.frontmatter.tags.includes(topic))
      );

    const sorter = (a: Writing, b: Writing) => {
      switch (sortOrder) {
        case 'oldest':
          return new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime();
        case 'a-z':
          return a.frontmatter.title.localeCompare(b.frontmatter.title);
        case 'z-a':
          return b.frontmatter.title.localeCompare(a.frontmatter.title);
        case 'newest':
        default:
          return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
      }
    }
    return filtered.slice().sort(sorter);
  }, [allPosts, sortOrder, selectedTopics]);

  const sortLabels: Record<SortOption, string> = {
    newest: 'Newest First',
    oldest: 'Oldest First',
    'a-z': 'A-Z',
    'z-a': 'Z-A'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="flex flex-col-reverse lg:grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 py-12">
      {/* Left side: Writings List */}
      <div className="lg:col-span-3">
        <motion.div
          key={selectedTopics.join('-')}
          className="flex flex-col"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredAndSortedPosts.map((post, index) => (
              <div key={post.slug}>
                <WritingCard writing={post} />
                {index < filteredAndSortedPosts.length - 1 && (
                  <Separator className="my-10" />
                )}
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Right side: Sidebar */}
      <aside className="lg:col-span-1 lg:sticky top-24 h-fit space-y-8">
        {/* Sorting Control */}
        <div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full h-auto text-left flex-col items-start px-4 py-3">
                <span className="w-full flex justify-between items-center">
                  {sortLabels[sortOrder]}
                  <FaChevronDown className="h-4 w-4" />
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  Sort posts by date or title
                </p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[calc(100vw-2rem)] sm:w-56">
              <DropdownMenuRadioGroup value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOption)}>
                <DropdownMenuRadioItem value="newest">Newest First</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="oldest">Oldest First</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="a-z">A-Z</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="z-a">Z-A</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Topics Filter */}
        <div>
          <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
            <FaTag className="h-5 w-5" />
            Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTopics.length === 0 ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTopics([])}
              className="transition-all"
            >
              All
            </Button>
            {allTopics.map(topic => (
              <Button
                key={topic}
                variant={selectedTopics.includes(topic) ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTopicClick(topic)}
                className="capitalize transition-all"
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}