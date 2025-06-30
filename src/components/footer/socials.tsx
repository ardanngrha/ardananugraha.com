import Link from "next/link"

const socialLinks = [
  { label: "X (Twitter)", href: "https://x.com/ardanngrha" },
  { label: "Instagram", href: "https://instagram.com/adanngrha" },
  { label: "GitHub", href: "https://github.com/ardanngrha" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ardana-nugraha" },
]

export default function Socials() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Socials</h3>
      <nav className="flex flex-col space-y-2">
        {socialLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}