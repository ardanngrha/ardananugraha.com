"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/home/hero"
import ProjectsSection from "@/components/home/projects"
import WritingsSection from "@/components/home/writings"
import TestimonialsSection from "@/components/home/testimonials"
import { toast } from "sonner"
import ContentItem from "@/types/home"

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<ContentItem[]>([]);
  const [featuredWritings, setFeaturedWritings] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.warning("Under Construction", {
        description: "This website is still a work in progress. Feel free to explore!",
        closeButton: true,
        duration: 5000, // Show for 5 seconds
      });
    }, 1000);

    async function fetchFeaturedContent() {
      try {
        // Fetch featured projects and writings
        const [projectsRes, writingsRes] = await Promise.all([
          fetch('/api/featured-projects'),
          fetch('/api/featured-writings')
        ]);

        if (projectsRes.ok && writingsRes.ok) {
          const projects = await projectsRes.json();
          const writings = await writingsRes.json();

          setFeaturedProjects(projects);
          setFeaturedWritings(writings);
        }
      } catch (error) {
        console.error('Error fetching featured content:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedContent();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Hero />
      <ProjectsSection projects={featuredProjects} loading={loading} />
      <WritingsSection writings={featuredWritings} loading={loading} />
      <TestimonialsSection />
    </div>
  );
}