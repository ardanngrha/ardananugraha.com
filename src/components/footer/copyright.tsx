export default function Copyright() {
  return (
    <div className="space-y-2 flex flex-col items-center justify-center text-center">
      <p className="text-sm text-muted-foreground">
        © 2024. All rights reserved.
      </p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Built with</span>
        <div className="flex items-center gap-1 flex-wrap">
          <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">Next.js</span>
          <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">Tailwind</span>
          <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">shadcn/ui</span>
          <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">Vercel</span>
          <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">Motion</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground font-mono">
        Local Time: {new Date().toLocaleTimeString()}
      </p>
    </div>
  )
}