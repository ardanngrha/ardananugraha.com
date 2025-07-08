import Link from "next/link"

const socialLinks = [
  { label: "X (Twitter)", href: "https://x.com/ardanngrha" },
  { label: "Instagram", href: "https://instagram.com/adanngrha" },
  { label: "GitHub", href: "https://github.com/ardanngrha" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ardana-nugraha" },
]

export default function Socials() {
  return (
    <div className="flex flex-col items-center md:items-start gap-3">
      <h3 className="text-muted-foreground text-sm">Socials</h3>
      <nav className="grid grid-cols-2 gap-2 md:flex md:flex-col md:items-start">
        {socialLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors text-center md:text-left"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}