import NowPlaying from "./footer/now-playing"
import NavigationSection from "./footer/navigation"
import Newsletter from "./footer/newsletter"
import Copyright from "./footer/copyright"

export default function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NowPlaying />
          <NavigationSection />
          <Newsletter />
        </div>
        <Copyright />
      </div>
    </footer>
  )
}