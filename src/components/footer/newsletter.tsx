"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)
  const { toast } = useToast()

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubscribing(true)

    try {
      // Add your newsletter subscription logic here
      // For now, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call

      toast({
        title: "Subscribed successfully!",
        description: "Thank you for subscribing to my newsletter.",
      })

      setEmail("")
    } catch {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Stay Updated</h3>
      <p className="text-sm text-muted-foreground">
        Subscribe to my newsletter for the latest articles and project updates.
      </p>
      <form onSubmit={handleSubscribe} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-sm flex-1"
          required
        />
        <Button
          type="submit"
          disabled={isSubscribing}
          className="cursor-pointer text-sm"
        >
          {isSubscribing ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  )
}