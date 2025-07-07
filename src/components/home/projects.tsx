import Link from "next/link"
import Image from "next/image"
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

interface ProjectsSectionProps {
  projects: ContentItem[];
  loading: boolean;
}

export default function ProjectsSection({ projects, loading }: ProjectsSectionProps) {
  return (
    <section className="py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Featured Projects</h2>
        <Button variant="outline" asChild>
          <Link href="/projects" className="inline-flex items-center gap-2">
            More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg overflow-hidden animate-pulse">
              <div className="aspect-video bg-muted"></div>
              <div className="p-6">
                <div className="h-6 bg-muted rounded mb-3"></div>
                <div className="h-4 bg-muted rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-muted rounded"></div>
                  <div className="h-6 w-20 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  {project.frontmatter.image ? (
                    <Image
                      src={project.frontmatter.image as string}
                      alt={project.frontmatter.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <div className={`${project.frontmatter.image ? 'hidden' : 'flex'} w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 items-center justify-center`}>
                    <span className="text-muted-foreground text-sm">Project Image</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.frontmatter.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.frontmatter.summary}</p>
                  {project.frontmatter.tags && (
                    <div className="flex gap-2 flex-wrap">
                      {project.frontmatter.tags.map((tech: string) => (
                        <span key={tech} className="px-2 py-1 bg-secondary text-secondary-foreground font-mono rounded text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}