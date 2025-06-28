export default function Copyright() {
  return (
    <div className="border-t mt-12 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            © 2024 Ardana Nugraha. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Built with</span>
            <div className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">Next.js</span>
              <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">Tailwind</span>
              <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">shadcn/ui</span>
              <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">Vercel</span>
              <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">Motion</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="mailto:contact.ardana@gmail.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            contact.ardana@gmail.com
          </a>
        </div>
      </div>
    </div>
  )
}