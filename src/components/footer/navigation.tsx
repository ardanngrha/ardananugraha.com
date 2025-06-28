import Link from "next/link"

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Writings", href: "/writings" },
  { label: "About", href: "/about" },
]

export default function NavigationSection() {
  return (
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
  )
}