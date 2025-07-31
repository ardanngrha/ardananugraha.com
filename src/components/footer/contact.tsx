import Link from "next/link"

export default function Contact() {
  return (
    <div className="flex flex-col items-center md:items-start gap-2">
      <h3 className="text-muted-foreground text-sm">Contact</h3>
      <div>
        <Link
          href="mailto:contact.ardana@gmail.com"
          className="text-sm transition-colors custom-cursor hover:text-primary hover:underline"
        >
          contact.ardana@gmail.com
        </Link>
      </div>
      <div>
        <Link
          href="/resume.pdf"
          download
          className="inline-flex text-sm transition-colors hover:text-primary hover:underline"
        >
          Download Resume
        </Link>
      </div>
    </div>
  )
}