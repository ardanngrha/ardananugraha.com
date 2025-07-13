import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ContentItem {
  slug: string;
  frontmatter: {
    title: string;
    summary?: string;
    date: string;
    tags?: string[];
    image?: string | null;
    [key: string]: unknown;
  };
}

interface WritingsSectionProps {
  writings: ContentItem[];
  loading: boolean;
}

export default function WritingsSection({ writings, loading }: WritingsSectionProps) {
  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Featured <span className="gradient-text">Writings</span></h2>
        <Button variant="outline" asChild>
          <Link href="/writings" className="inline-flex items-center gap-2">
            More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-l-4 border-primary pl-6 py-4 animate-pulse">
              <div className="h-6 bg-muted rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded w-24"></div>
            </div>
          ))}

        </div>
      ) : (
        <div className="space-y-6">
          {writings.map((writing) => (
            <Link key={writing.slug} href={`/writings/${writing.slug}`}>
              <article className="border-l-4 border-primary pl-6 py-4 hover:bg-accent/5 transition-colors cursor-pointer mb-6">
                <h3 className="text-xl font-semibold mb-2">{writing.frontmatter.title}</h3>
                <p className="text-muted-foreground mb-2">{writing.frontmatter.summary}</p>
                <time className="text-sm text-muted-foreground">
                  {new Date(writing.frontmatter.date).toLocaleDateString()}
                </time>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}