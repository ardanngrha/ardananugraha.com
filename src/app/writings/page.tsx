import { PageHeader } from '@/components/page-header';
import { WritingsBg } from '@/components/backgrounds/writings-bg';
import { getAllWritings } from '@/lib/posts';
import WritingsClientPage from './client';

export default async function WritingsPage() {
  const allPosts = await getAllWritings();
  const allTopics = [...new Set(allPosts.flatMap(p => p.frontmatter.tags || []))];

  return (
    <div>
      <PageHeader
        title="Writings"
        description="Thoughts, insights, and tutorials on software development, technology trends, and my learning journey."
        background={<WritingsBg />}
      />
      <WritingsClientPage allPosts={allPosts} allTopics={allTopics} />
    </div>
  );
}