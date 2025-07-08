import HeroLeft from "./hero/left"
import HeroRight from "./hero/right"

export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row h-screen justify-center md:justify-between items-center md:-mt-16 gap-8">
      <HeroLeft />
      <div className="hidden md:block">
        <HeroRight />
      </div>
    </div>
  )
}