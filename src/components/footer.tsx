"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import emailjs from '@emailjs/browser'
import getNowPlayingItem from "@/lib/spotify-api"

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Writings", href: "/writings" },
  { label: "About", href: "/about" },
]

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}



export default function Footer() {
  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
        const refreshToken = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

        if (!clientId || !clientSecret || !refreshToken) {
          console.warn('Spotify environment variables not configured');
          return;
        }

        const track = await getNowPlayingItem(
          clientId,
          clientSecret,
          refreshToken
        );

        if (track) {
          setCurrentTrack({
            name: track.title,
            artist: track.artist,
            isPlaying: track.isPlaying,
            albumImageUrl: track.albumImageUrl
          });
        }
      } catch (error) {
        console.error('Failed to fetch current track:', error);
      }
    };

    fetchCurrentTrack();
    // Refresh every 30 seconds
    const interval = setInterval(fetchCurrentTrack, 30000);
    return () => clearInterval(interval);
  }, []);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [currentTrack, setCurrentTrack] = useState({
    name: "Bohemian Rhapsody",
    artist: "Queen",
    isPlaying: false,
    albumImageUrl: ""
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'contact.ardana@gmail.com'
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      })

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      })
      setIsContactModalOpen(false)
    } catch (error) {
      console.error('EmailJS error:', error)
      toast({
        title: "Failed to send message",
        description: "Please try again or contact me directly at contact.ardana@gmail.com",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Currently Playing Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Currently Playing</h3>
            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-lg">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                {currentTrack.albumImageUrl ? (
                  <Image
                    src={currentTrack.albumImageUrl}
                    alt={`${currentTrack.name} album cover`}
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                ) : (
                  <span className="text-muted-foreground">No Image</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{currentTrack.name}</p>
                <p className="text-muted-foreground text-xs truncate">{currentTrack.artist}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className={`w-1 h-1 rounded-full ${currentTrack.isPlaying ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                  <span className="text-xs text-muted-foreground">
                    {currentTrack.isPlaying ? 'Now playing' : 'Last played'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Navigate</h3>
            <nav className="flex flex-col space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to my newsletter for the latest articles and project updates.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="text-sm"
              />
              <Button size="sm" className="w-full">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Get in Touch</h3>
            <p className="text-sm text-muted-foreground">
              Have a project in mind? Let&apos;s talk about it.
            </p>
            <Dialog open={isContactModalOpen} onOpenChange={setIsContactModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  Send Message
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Send me a message</DialogTitle>
                  <DialogDescription>
                    I&apos;ll get back to you as soon as possible at contact.ardana@gmail.com
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me more..."
                      rows={4}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsContactModalOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Bottom Section */}
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
                  <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">TypeScript</span>
                  <span className="px-1.5 py-0.5 bg-secondary rounded text-xs">Tailwind</span>
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
      </div>
    </footer>
  )
}