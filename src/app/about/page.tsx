import { AboutBg } from "@/components/backgrounds/about-bg";
import { PageHeader } from "@/components/page-header";
import { ImageCarousel } from "@/components/about/images";
import { FavStack } from "@/components/about/fav-stack";
import { ExperienceTimeline } from "@/components/about/experiences";
import { TechStack } from "@/components/about/tech-stack";

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About Me"
        description="A little bit about my journey, my skills, and what I'm passionate about."
        background={<AboutBg />}
      />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <ImageCarousel />
          </div>
          <div className="flex flex-col gap-4 prose dark:prose-invert">
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
            <div className="space-y-4">
              <p>
                Here are some of the technologies I&apos;m currently excited about:
              </p>
              <FavStack />
            </div>
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold text-center mb-12">My Experiences</h2>
          <ExperienceTimeline />
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold text-center mb-12">Tech and Tools I Use</h2>
          <TechStack />
        </div>
      </div>
    </div>
  );
}