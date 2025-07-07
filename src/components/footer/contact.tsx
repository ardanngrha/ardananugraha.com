import Link from "next/link"

export default function Contact() {
  return (
    <div className="flex flex-col items-center md:items-start gap-2">
      <h3 className="font-semibold text-lg">Contact</h3>
      <div>
        <a
          href="mailto:contact.ardana@gmail.com"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          contact.ardana@gmail.com
        </a>
      </div>
      <div>
        <Link
          href="/resume.pdf"
          download
          className="inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Download Resume
        </Link>
      </div>
    </div>
  )
}