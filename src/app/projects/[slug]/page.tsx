import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectWithContent, getAllProjects, getRelatedProjects, getProjectNavigation } from '@/lib/posts';
import { generateSEOMetadata, generateStructuredData } from '@/lib/seo';
import { DetailHero } from '@/components/detail/detail-hero';
import { ContentNavigation } from '@/components/detail/content-navigation';
import { RelatedProjects } from '@/components/detail/related-content';
import { ScrollToTop } from '@/components/detail/scroll-to-top';
import { PrevNextNavigation } from '@/components/detail/prev-next-navigation';
import { ShareButtons } from '@/components/detail/share-buttons';
import { ProjectNotFound } from '@/components/detail/content-not-found';
import { MDXErrorBoundary, ErrorBoundary } from '@/components/detail/error-boundary';
import { ReadingProgress } from '@/components/detail/reading-progress';
import { mdxComponents } from '@/lib/mdx';
import { TableOfContents } from '@/components/detail/table-of-contents';

// This function tells Next.js which routes to pre-render at build time.
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectWithContent(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const { frontmatter } = project;

  return generateSEOMetadata({
    title: frontmatter.title,
    description: frontmatter.summary,
    image: frontmatter.image,
    date: frontmatter.date,
    tags: frontmatter.tags,
    type: 'project',
    slug: project.slug,
    readTime: `${project.readTime} min`,
    status: frontmatter.status,
    githubUrl: frontmatter.githubUrl,
    liveUrl: frontmatter.liveUrl,
  });
}

// The main page component
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    const project = await getProjectWithContent(slug);

    if (!project) {
      return <ProjectNotFound slug={slug} />;
    }

    // Fetch related projects based on shared tags
    const relatedProjects = await getRelatedProjects(
      project.frontmatter.tags,
      project.slug,
      3
    );

    // Fetch navigation data for prev/next
    const navigation = await getProjectNavigation(project.slug);

    // Generate structured data
    const structuredData = generateStructuredData({
      title: project.frontmatter.title,
      description: project.frontmatter.summary,
      image: project.frontmatter.image,
      date: project.frontmatter.date,
      tags: project.frontmatter.tags,
      type: 'project',
      slug: project.slug,
      readTime: `${project.readTime} min`,
    });

    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-background">
          <ReadingProgress />
          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />

          {/* Navigation */}
          <div className="container mx-auto px-4 py-6">
            <ContentNavigation
              type="project"
              title={project.frontmatter.title}
            />
          </div>

          {/* Hero Section */}
          <div className="container mx-auto px-4 pb-8">
            <ErrorBoundary>
              <DetailHero
                item={project}
                type="project"
                className="mb-12"
              />
            </ErrorBoundary>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-12">
                {/* Main Article Content */}
                <div className="lg:col-span-3 order-2 lg:order-1">
                  <article className="prose prose-lg max-w-none dark:prose-invert project-content">
                    <MDXErrorBoundary
                      contentType="project"
                      contentTitle={project.frontmatter.title}
                    >
                      <MDXRemote
                        source={project.content}
                        options={{
                          mdxOptions: {
                            remarkPlugins: [],
                            rehypePlugins: [],
                          },
                        }}
                        components={mdxComponents}
                      />
                    </MDXErrorBoundary>
                  </article>
                </div>

                {/* Sidebar - Table of Contents */}
                <div className="lg:col-span-1 order-1 lg:order-2 hidden md:block">
                  <div className="lg:sticky lg:top-8 space-y-4 sm:space-y-6">
                    {/* Table of Contents */}
                    <div className="bg-muted/30 rounded-lg p-6 border border-border">
                      <TableOfContents content={project.content} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="my-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
            <ShareButtons
              title={project.frontmatter.title}
              url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://ardananugraha.dev'}/projects/${project.slug}`}
              description={project.frontmatter.summary}
            />
          </div>
          {/* Previous/Next Navigation */}
          <div className="container mx-auto px-4 pb-8">
            <div className="max-w-4xl mx-auto">
              <ErrorBoundary>
                <PrevNextNavigation
                  prev={navigation.prev}
                  next={navigation.next}
                  contentType="project"
                />
              </ErrorBoundary>
            </div>
          </div>

          {/* Related Projects Section */}
          {relatedProjects.length > 0 && (
            <div className="container mx-auto px-4 pb-16">
              <div className="max-w-6xl mx-auto">
                <ErrorBoundary>
                  <RelatedProjects
                    projects={relatedProjects}
                    className="border-t border-border pt-16"
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}

          {/* Scroll to Top Button */}
          <ScrollToTop />
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Error loading project:', error);
    return <ProjectNotFound slug={slug} />;
  }
}