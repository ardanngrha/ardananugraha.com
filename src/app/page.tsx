import dynamic from 'next/dynamic';
import Hero from '@/components/home/hero';
import ProjectsSection from '@/components/home/projects';
import WritingsSection from '@/components/home/writings';
import FirstHighlight from '@/components/home/highlights/first';
import { getFeaturedProjects, getFeaturedWritings } from '@/lib/posts';

export default async function Home() {
  const TestimonialsSection = dynamic(
    () => import('@/components/home/testimonials'),
    {
      loading: () => <div className="py-16 h-96 bg-muted/20 animate-pulse" />,
    },
  );

  const SecondHighlight = dynamic(
    () => import('@/components/home/highlights/second'),
    {
      loading: () => <div className="py-16 h-96 bg-muted/20 animate-pulse" />,
    },
  );
  const featuredProjects = await getFeaturedProjects();
  const featuredWritings = await getFeaturedWritings();

  return (
    <div>
      <Hero />
      <FirstHighlight />
      <SecondHighlight />
      <ProjectsSection projects={featuredProjects} />
      <WritingsSection writings={featuredWritings} />
      <TestimonialsSection />
    </div>
  );
}
