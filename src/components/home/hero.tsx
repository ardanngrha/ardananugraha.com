import HeroLeft from "./hero/left"
import HeroRight from "./hero/right"

export default function Hero() {
  return (
    <div className="flex flex-col md:flex-row h-screen justify-center md:justify-between items-center md:-mt-16 gap-8">
      <div className="md:w-1/2">
        <HeroLeft />
      </div>
      <div className="hidden md:block md:w-1/2">
        <HeroRight />
      </div>
    </div>
  )
}