import NowPlaying from "./footer/now-playing"
import Navigation from "./footer/navigation"
import Newsletter from "./footer/newsletter"
import Copyright from "./footer/copyright"
import Socials from "./footer/socials"
import Contact from "./footer/contact"

export default function Footer() {
  return (
    <footer className="border-t">
      {/* Main Row - 5 columns */}
      <div className="flex flex-col md:flex-row gap-6 py-12 items-center md:items-start">
        {/* Now Playing */}
        <div className="col-span-1 flex-1 flex justify-center md:justify-start">
          <NowPlaying />
        </div>

        <div className="flex flex-row gap-4 md:gap-12">
          {/* Navigation */}
          <div className="col-span-1 flex justify-center md:justify-start">
            <Navigation />
          </div>

          {/* Socials */}
          <div className="col-span-1 flex justify-center md:justify-start order-2 md:order-3">
            <Socials />
          </div>

          {/* Contact */}
          <div className="col-span-1 flex justify-center md:justify-start order-1 md:order-2">
            <Contact />
          </div>
        </div>

        {/* Newsletter */}
        <div className="col-span-1 flex-1 flex justify-center md:justify-start">
          <Newsletter />
        </div>
      </div>

      {/* Copyright Row */}
      <div className="border-t py-12">
        <Copyright />
      </div>
    </footer>
  )
}