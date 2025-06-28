export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-muted rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-muted rounded mb-8 w-1/4"></div>

      <div className="space-y-4">
        <div className="h-4 bg-muted rounded"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
        <div className="h-4 bg-muted rounded w-4/5"></div>
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </div>
    </div>
  )
}