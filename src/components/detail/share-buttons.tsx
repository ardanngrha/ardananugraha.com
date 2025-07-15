"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { 
  Share2, 
  Twitter, 
  Linkedin, 
  Facebook, 
  Link2, 
  Check 
} from "lucide-react"

interface ShareButtonsProps {
  title: string
  url: string
  description?: string
  className?: string
}

export function ShareButtons({ title, url, description, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareData = {
    title,
    url,
    text: description || title,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        // User cancelled or error occurred
        console.log("Share cancelled or failed:", error)
      }
    }
  }

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  }

  const openShareWindow = (url: string) => {
    window.open(
      url,
      "share-window",
      "width=600,height=400,scrollbars=yes,resizable=yes"
    )
  }

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 ${className}`}>
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      
      {/* Native share button (mobile) */}
      {typeof navigator !== "undefined" && 'share' in navigator && (
        <Button
          variant="outline"
          size="default"
          onClick={handleNativeShare}
          className="sm:hidden min-h-[44px] touch-manipulation w-full sm:w-auto"
        >
          <Share2 className="size-4 mr-2" />
          Share
        </Button>
      )}

      {/* Desktop share buttons */}
      <div className="hidden sm:flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="default"
          onClick={() => openShareWindow(shareUrls.twitter)}
          className="hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20 min-h-[44px] touch-manipulation"
        >
          <Twitter className="size-4 mr-2" />
          <span className="hidden md:inline">Twitter</span>
        </Button>

        <Button
          variant="outline"
          size="default"
          onClick={() => openShareWindow(shareUrls.linkedin)}
          className="hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20 min-h-[44px] touch-manipulation"
        >
          <Linkedin className="size-4 mr-2" />
          <span className="hidden md:inline">LinkedIn</span>
        </Button>

        <Button
          variant="outline"
          size="default"
          onClick={() => openShareWindow(shareUrls.facebook)}
          className="hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20 min-h-[44px] touch-manipulation"
        >
          <Facebook className="size-4 mr-2" />
          <span className="hidden md:inline">Facebook</span>
        </Button>
      </div>

      {/* Copy link button */}
      <Button
        variant="outline"
        size="default"
        onClick={handleCopyLink}
        className={`transition-colors min-h-[44px] touch-manipulation w-full sm:w-auto ${
          copied 
            ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-800 dark:text-green-400" 
            : "hover:bg-gray-50 dark:hover:bg-gray-800"
        }`}
      >
        {copied ? (
          <>
            <Check className="size-4 mr-2" />
            Copied!
          </>
        ) : (
          <>
            <Link2 className="size-4 mr-2" />
            Copy Link
          </>
        )}
      </Button>
    </div>
  )
}