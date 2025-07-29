import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectWithContent, getAllProjects, getRelatedProjects, getProjectNavigation } from '@/lib/posts';
import { generateSEOMetadata, generateStructuredData } from '@/lib/seo';
import { DetailHero } from '@/components/detail/detail-hero';
import { ContentNavigation } from '@/components/detail/content-navigation';
import { InteractiveTags } from '@/components/detail/tag-list';
import { RelatedProjects } from '@/components/detail/related-content';
import { ScrollToTop } from '@/components/detail/scroll-to-top';
import { PrevNextNavigation } from '@/components/detail/prev-next-navigation';
import { ShareButtons } from '@/components/detail/share-buttons';
import { ProjectNotFound } from '@/components/detail/content-not-found';
import { MDXErrorBoundary, ErrorBoundary } from '@/components/detail/error-boundary';
import { ReadingProgress } from '@/components/detail/reading-progress';
import { mdxComponents } from '@/lib/mdx';

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
                  <article className="prose prose-lg max-w-none dark:prose-invert">
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

                {/* Sidebar */}
                <div className="lg:col-span-1 order-1 lg:order-2">
                  <div className="lg:sticky lg:top-8 space-y-4 sm:space-y-6">
                    {/* Project Metadata Card */}
                    <div className="bg-muted/30 rounded-lg p-6 border border-border">
                      <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                        Project Details
                      </h3>
                      <div className="space-y-4">
                        {/* Status */}
                        {project.frontmatter.status && (
                          <div>
                            <span className="text-sm font-medium text-muted-foreground block mb-1">Status</span>
                            <span className="text-sm capitalize">
                              {project.frontmatter.status.replace('-', ' ')}
                            </span>
                          </div>
                        )}

                        {/* Date */}
                        <div>
                          <span className="text-sm font-medium text-muted-foreground block mb-1">Completed</span>
                          <span className="text-sm">
                            {new Date(project.frontmatter.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>

                        {/* Read Time */}
                        <div>
                          <span className="text-sm font-medium text-muted-foreground block mb-1">Read Time</span>
                          <span className="text-sm">{project.readTime} min read</span>
                        </div>

                        {/* Links */}
                        {(project.frontmatter.githubUrl || project.frontmatter.liveUrl) && (
                          <div className="pt-2 border-t border-border">
                            <span className="text-sm font-medium text-muted-foreground block mb-3">Links</span>
                            <div className="space-y-2">
                              {project.frontmatter.githubUrl && (
                                <a
                                  href={project.frontmatter.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                  </svg>
                                  View Source
                                </a>
                              )}
                              {project.frontmatter.liveUrl && (
                                <a
                                  href={project.frontmatter.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                  Live Demo
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Technologies */}
                    {project.frontmatter.tags && project.frontmatter.tags.length > 0 && (
                      <div className="bg-muted/30 rounded-lg p-6 border border-border">
                        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">
                          Technologies
                        </h3>
                        <InteractiveTags
                          tags={project.frontmatter.tags}
                          contentType="project"
                        />
                      </div>
                    )}
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