"use client"

import { useState, useEffect } from "react" // Import useEffect
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  FiShare2,
  FiLinkedin,
  FiFacebook,
  FiLink,
  FiCheck,
  FiInstagram,
} from "react-icons/fi"
import { FaThreads, FaXTwitter } from "react-icons/fa6";

interface ShareButtonsProps {
  title: string
  url: string
  description?: string
  className?: string
}

export function ShareButtons({
  title,
  url,
  description,
  className,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [showNativeShare, setShowNativeShare] = useState(false) // Add this state

  // Use useEffect to set the state on the client side
  useEffect(() => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      setShowNativeShare(true)
    }
  }, [])


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

      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error(
        "Failed to copy link" + (error instanceof Error ? `: ${error.message}` : "")
      )
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        console.log("Share cancelled or failed:", error)
      }
    }
  }

  const shareUrls = {
    twitter: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    instagram: `https://www.instagram.com/create/story/?url=${encodeURIComponent(url)}`, // Instagram Stories (opens story creation)
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    threads: `https://www.threads.net/intent/post?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`,
  }

  const openShareWindow = (url: string) => {
    window.open(
      url,
      "share-window",
      "width=600,height=400,scrollbars=yes,resizable=yes"
    )
  }

  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 ${className}`}
    >
      <span className="text-sm font-medium text-muted-foreground">Share:</span>

      {showNativeShare && (
        <Button
          variant="outline"
          size="default"
          onClick={handleNativeShare}
          className="sm:hidden min-h-[44px] touch-manipulation w-full sm:w-auto"
        >
          <FiShare2 className="size-4 mr-1" />
          Share
        </Button>
      )}

      <div className="hidden sm:flex items-center gap-2 flex-wrap">
        <Button
          variant="outline"
          size="default"
          onClick={() => openShareWindow(shareUrls.twitter)}
          className="hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20 min-h-[44px] touch-manipulation cursor-pointer"
        >
          <FaXTwitter className="size-4 mr-1" />
          <span className="hidden md:inline">X</span>
        </Button>

        <Button
          variant="outline"
          size="default"
          onClick={() => openShareWindow(shareUrls.instagram)}
          className="hover:bg-pink-50 hover:border-pink-200 dark:hover:bg-pink-950/20 min-h-[44px] touch-manipulation cursor-pointer"
        >
          <FiInstagram className="size-4 mr-1" />
          <span className="hidden md:inline">Instagram</span>
        </Button>

        <Button
          variant="outline"
          size="default"
          onClick={() => openShareWindow(shareUrls.linkedin)}
          className="hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20 min-h-[44px] touch-manipulation cursor-pointer"
        >
          <FiLinkedin className="size-4 mr-1" />
          <span className="hidden md:inline">LinkedIn</span>
        </Button>

        <Button
          variant="outline"
          size="default"
          onClick={() => openShareWindow(shareUrls.facebook)}
          className="hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-950/20 min-h-[44px] touch-manipulation cursor-pointer"
        >
          <FiFacebook className="size-4 mr-1" />
          <span className="hidden md:inline">Facebook</span>
        </Button>

        <Button
          variant="outline"
          size="default"
          onClick={() => openShareWindow(shareUrls.threads)}
          className="hover:bg-gray-50 hover:border-gray-200 dark:hover:bg-gray-950/20 min-h-[44px] touch-manipulation cursor-pointer"
        >
          <FaThreads className="size-4 mr-1" />
          <span className="hidden md:inline">Threads</span>
        </Button>
      </div>

      <Button
        variant="outline"
        size="default"
        onClick={handleCopyLink}
        className={`transition-colors min-h-[44px] touch-manipulation w-full sm:w-auto cursor-pointer ${copied
          ? "bg-green-50 border-green-200 text-green-700 dark:bg-green-950/20 dark:border-green-800 dark:text-green-400"
          : "hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
      >
        {copied ? (
          <>
            <FiCheck className="size-4 mr-1" />
            Copied!
          </>
        ) : (
          <>
            <FiLink className="size-4 mr-1" />
            Copy Link
          </>
        )}
      </Button>
    </div>
  )
}