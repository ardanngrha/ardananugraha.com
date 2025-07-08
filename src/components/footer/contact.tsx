import Link from "next/link"

export default function Contact() {
  return (
    <div className="flex flex-col items-center md:items-start gap-2">
      <h3 className="text-muted-foreground text-sm">Contact</h3>
      <div>
        <a
          href="mailto:contact.ardana@gmail.com"
          className="text-sm transition-colors"
        >
          contact.ardana@gmail.com
        </a>
      </div>
      <div>
        <Link
          href="/resume.pdf"
          download
          className="inline-flex text-sm transition-colors"
        >
          Download Resume
        </Link>
      </div>
    </div>
  )
}