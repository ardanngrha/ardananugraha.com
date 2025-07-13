import { AboutBg } from "@/components/backgrounds/about-bg";
import { PageHeader } from "@/components/page-header";
import { ImageCarousel } from "@/components/about/image";
import { TechStack } from "@/components/about/tech-stack";
import { ExperienceTimeline } from "@/components/about/experiences";
import { CheckCircle } from "lucide-react";

export default function AboutPage() {
  const doing = [
    {
      description: "Developing GRITA, an Advanced Distribution Management System (ADMS) for PLN's power grids using Event-Driven Architecture.",
    },
    {
      description: "Building microservices that connect 500+ field devices via Modbus TCP, IEC104, and ICCP protocols, processing millions of real-time data points within milliseconds.",
    },
    {
      description: "Creating web-based server simulators for Modbus TCP and IEC104, enabling comprehensive testing and validation.",
    },
    {
      description: "Collaborating with frontend developers to integrate high-performance real-time dashboards for monitoring and control.",
    },
    {
      description: "Managing deployment and containerization using Docker and Kubernetes on-premises.",
    },
  ]
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
              <TechStack />
            </div>
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8">What I&apos;m Currently Doing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doing.map((item, index) => (
              <div key={index} className="bg-secondary p-6 rounded-lg flex items-start gap-4">
                <CheckCircle className="text-primary w-6 h-6 mt-1" />
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold text-center mb-12">My Experiences</h2>
          <ExperienceTimeline />
        </div>
      </div>
    </div>
  );
}