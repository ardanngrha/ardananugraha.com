import { MDXRemote } from 'next-mdx-remote/rsc';
import { getWritingWithContent, getRelatedWritings, getWritingNavigation } from '@/lib/posts';
import { DetailHero } from '@/components/detail/detail-hero';
import { ContentNavigation } from '@/components/detail/content-navigation';
import { RelatedWritings } from '@/components/detail/related-content';
import { ScrollToTop } from '@/components/detail/scroll-to-top';
import { PrevNextNavigation } from '@/components/detail/prev-next-navigation';
import { ShareButtons } from '@/components/detail/share-buttons';
import { generateSEOMetadata, generateStructuredData } from '@/lib/seo';
import { WritingNotFound } from '@/components/detail/content-not-found';
import { MDXErrorBoundary, ErrorBoundary } from '@/components/detail/error-boundary';
import { Metadata } from 'next';
import { ReadingProgress } from '@/components/detail/reading-progress';
import { mdxComponents } from '@/lib/mdx';

// This function tells Next.js which routes to pre-render at build time.
export async function generateStaticParams() {
  // Import here to avoid build issues
  const { getAllEnhancedWritings } = await import('@/lib/posts');
  const writings = await getAllEnhancedWritings();

  return writings.map((writing) => ({
    slug: writing.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const writing = await getWritingWithContent(slug);

  if (!writing) {
    return {
      title: 'Writing Not Found',
    };
  }

  const { frontmatter } = writing;

  return generateSEOMetadata({
    title: frontmatter.title,
    description: frontmatter.summary,
    image: frontmatter.image,
    date: frontmatter.date,
    tags: frontmatter.tags,
    type: 'writing',
    slug: writing.slug,
    readTime: `${writing.readTime} min read`,
  });
}

// The main page component
export default async function WritingPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  try {
    const writing = await getWritingWithContent(slug);

    if (!writing) {
      return <WritingNotFound slug={slug} />;
    }

    const { frontmatter } = writing;

    // Fetch related writings based on shared tags
    const relatedWritings = await getRelatedWritings(
      frontmatter.tags,
      writing.slug,
      3
    );

    // Fetch navigation data for prev/next
    const navigation = await getWritingNavigation(writing.slug);

    // Generate structured data
    const structuredData = generateStructuredData({
      title: frontmatter.title,
      description: frontmatter.summary,
      image: frontmatter.image,
      date: frontmatter.date,
      tags: frontmatter.tags,
      type: 'writing',
      slug: writing.slug,
      readTime: `${writing.readTime} min read`,
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

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-5xl">
            {/* Navigation */}
            <ContentNavigation
              type="writing"
              title={frontmatter.title}
              className="mb-6 sm:mb-8"
            />

            {/* Hero Section */}
            <ErrorBoundary>
              <DetailHero
                item={writing}
                type="writing"
                className="mb-8 sm:mb-12"
              />
            </ErrorBoundary>

            {/* Article Content */}
            <div className="relative">
              <article className="prose prose-neutral dark:prose-invert">
                <MDXErrorBoundary
                  contentType="writing"
                  contentTitle={frontmatter.title}
                >
                  <MDXRemote
                    source={writing.content}
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

              {/* Reading progress indicator could go here in future */}
            </div>

            {/* Share Section */}
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
              <ShareButtons
                title={frontmatter.title}
                url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://ardananugraha.dev'}/writings/${writing.slug}`}
                description={frontmatter.summary}
              />
            </div>

            {/* Previous/Next Navigation */}
            <ErrorBoundary>
              <PrevNextNavigation
                prev={navigation.prev}
                next={navigation.next}
                contentType="writing"
                className="mt-8 sm:mt-12"
              />
            </ErrorBoundary>

            {/* Related Writings Section */}
            {relatedWritings.length > 0 && (
              <div className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-border">
                <ErrorBoundary>
                  <RelatedWritings
                    writings={relatedWritings}
                  />
                </ErrorBoundary>
              </div>
            )}
          </div>

          {/* Scroll to Top Button */}
          <ScrollToTop />
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Error loading writing:', error);
    return <WritingNotFound slug={slug} />;
  }
}