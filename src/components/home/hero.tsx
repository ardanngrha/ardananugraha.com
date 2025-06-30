import HeroLeft from "./hero/left"
import HeroRight from "./hero/right"

export default function Hero() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center min-h-[calc(100vh-8vh)] gap-8">
      <HeroLeft />
      <HeroRight />
    </div>
  )
}