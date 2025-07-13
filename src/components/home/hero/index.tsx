import HeroLeft from "./left"
import HeroRight from "./right"
import HeroBackground from "./background"

export default function Hero() {
  return (
    <div className="relative flex flex-col md:flex-row h-screen justify-center md:justify-between items-center md:-mt-16 gap-8">
      <HeroBackground />
      <div className="md:w-1/2 z-10">
        <HeroLeft />
      </div>
      <div className="hidden md:block md:w-1/2 z-10">
        <HeroRight />
      </div>
    </div>
  )
}