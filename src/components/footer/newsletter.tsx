"use client"

import { Button } from "@/components/ui/button"

export default function Newsletter() {
  const handleRedirect = () => {
    window.open("https://ardananugraha.substack.com/", "_blank")
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Stay Updated</h3>
      <p className="text-sm text-muted-foreground">
        Subscribe to my newsletter for the latest articles and project updates.
      </p>
      <Button
        onClick={handleRedirect}
        className="cursor-pointer text-sm"
      >
        Subscribe
      </Button>
    </div>
  )
}