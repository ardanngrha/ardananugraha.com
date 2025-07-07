"use client"

import { Button } from "@/components/ui/button"

export default function Newsletter() {
  const handleRedirect = () => {
    window.open("https://ardananugraha.substack.com/", "_blank")
  }

  return (
    <div className="flex flex-col items-center md:items-start gap-2">
      <h3 className="font-semibold text-lg">Stay Updated</h3>
      <p className="text-sm text-muted-foreground text-center md:text-left">
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