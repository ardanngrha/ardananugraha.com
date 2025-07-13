import { AboutBg } from "@/components/backgrounds/about-bg"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About Me"
        description="A little bit about my journey, my skills, and what I'm passionate about."
        background={<AboutBg />}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="prose dark:prose-invert max-w-4xl mx-auto">
          <p>
            Hello! I&apos;m Ardana, a software developer with a passion for
            building beautiful and functional applications. My journey into the
            world of code started years ago, and since then, I&apos;ve been
            honing my skills in various technologies.
          </p>
          <p>
            I specialize in Python, Typescript, and Java, and I have experience
            working with a wide range of frameworks and libraries. I enjoy the
            challenge of solving complex problems and the satisfaction of seeing
            my work come to life.
          </p>
          <p>
            When I&apos;m not coding, you can find me exploring new technologies,
            contributing to open-source projects, or enjoying a good cup of
            -            coffee. I&apos;m always eager to learn and grow, both as a developer
            and as a person.
          </p>
          <p>
            Feel free to{" "}
            <Link href="/contact">get in touch</Link> if you&apos;d like to
            collaborate or just say hi!
          </p>
        </div>
      </div>
    </div>
  )
}