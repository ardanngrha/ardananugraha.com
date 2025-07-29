import Link from "next/link"

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Writings", href: "/writings" },
  { label: "About", href: "/about" },
]

export default function Navigation() {
  return (
    <div className="flex flex-col items-center md:items-start gap-3">
      <h3 className="text-muted-foreground text-sm">Navigate</h3>
      <nav className="flex flex-col gap-2 items-center md:items-start">
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm transition-colors hover:text-primary hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}