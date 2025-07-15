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

    const { frontmatter, content } = writing;

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
              <article className="writing-content prose prose-neutral dark:prose-invert max-w-none prose-base sm:prose-lg
                prose-headings:scroll-mt-20 prose-headings:font-bold prose-headings:tracking-tight
                prose-h1:text-2xl sm:prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mb-4 sm:prose-h1:mb-6 md:prose-h1:mb-8 prose-h1:mt-6 sm:prose-h1:mt-8 md:prose-h1:mt-12 prose-h1:leading-tight
                prose-h2:text-xl sm:prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mb-3 sm:prose-h2:mb-4 md:prose-h2:mb-6 prose-h2:mt-6 sm:prose-h2:mt-8 md:prose-h2:mt-10 prose-h2:leading-tight
                prose-h3:text-lg sm:prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mb-2 sm:prose-h3:mb-3 md:prose-h3:mb-4 prose-h3:mt-4 sm:prose-h3:mt-6 md:prose-h3:mt-8 prose-h3:leading-tight
                prose-h4:text-base sm:prose-h4:text-lg md:prose-h4:text-xl prose-h4:mb-2 sm:prose-h4:mb-3 prose-h4:mt-4 sm:prose-h4:mt-6
                prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed prose-p:mb-3 sm:prose-p:mb-4 md:prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:transition-colors prose-a:break-words
                prose-strong:font-semibold prose-strong:text-foreground
                prose-em:italic prose-em:text-muted-foreground
                prose-code:bg-muted prose-code:px-1 sm:prose-code:px-1.5 md:prose-code:px-2 prose-code:py-0.5 sm:prose-code:py-1 prose-code:rounded-md 
                prose-code:text-xs sm:prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg prose-pre:p-3 sm:prose-pre:p-4 prose-pre:overflow-x-auto
                prose-pre:text-xs sm:prose-pre:text-sm prose-pre:leading-relaxed prose-pre:-mx-4 sm:prose-pre:mx-0
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-3 sm:prose-blockquote:pl-4 md:prose-blockquote:pl-6 
                prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:bg-muted/30 
                prose-blockquote:py-2 sm:prose-blockquote:py-3 md:prose-blockquote:py-4 prose-blockquote:rounded-r-lg prose-blockquote:my-3 sm:prose-blockquote:my-4 md:prose-blockquote:my-6
                prose-blockquote:-mx-4 sm:prose-blockquote:mx-0 prose-blockquote:px-3 sm:prose-blockquote:px-4 md:prose-blockquote:px-0
                prose-ul:my-3 sm:prose-ul:my-4 md:prose-ul:my-6 prose-ul:space-y-1 sm:prose-ul:space-y-2 prose-li:text-sm sm:prose-li:text-base prose-li:leading-relaxed
                prose-ol:my-3 sm:prose-ol:my-4 md:prose-ol:my-6 prose-ol:space-y-1 sm:prose-ol:space-y-2
                prose-li:marker:text-primary prose-li:pl-1 sm:prose-li:pl-2
                prose-table:border-collapse prose-table:border prose-table:border-border prose-table:rounded-lg prose-table:text-xs sm:prose-table:text-sm
                prose-table:overflow-hidden prose-table:-mx-4 sm:prose-table:mx-0
                prose-th:border prose-th:border-border prose-th:bg-muted prose-th:px-2 sm:prose-th:px-4 prose-th:py-2 prose-th:font-semibold prose-th:text-left
                prose-td:border prose-td:border-border prose-td:px-2 sm:prose-td:px-4 prose-td:py-2
                prose-hr:border-border prose-hr:my-4 sm:prose-hr:my-6 md:prose-hr:my-8
                prose-img:rounded-lg prose-img:shadow-lg prose-img:my-4 sm:prose-img:my-6 md:prose-img:my-8 prose-img:-mx-4 sm:prose-img:mx-0
                leading-relaxed">
                <MDXErrorBoundary
                  contentType="writing"
                  contentTitle={frontmatter.title}
                >
                  <MDXRemote source={content} />
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