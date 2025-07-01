import HeroLeft from "./hero/left"
import HeroRight from "./hero/right"

export default function Hero() {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center min-h-screen pt-20 gap-8">
      <HeroLeft />
      <HeroRight />
    </div>
  )
}