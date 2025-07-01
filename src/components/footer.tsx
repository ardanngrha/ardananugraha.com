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
      <div className="flex flex-col md:flex-row gap-6 py-12">
        {/* Name and Now Playing */}
        <div className="col-span-1 flex-1">
          <NowPlaying />
        </div>

        <div className="flex flex-row gap-12">
          {/* Navigation */}
          <div className="col-span-1">
            <Navigation />
          </div>

          {/* Socials */}
          <div className="col-span-1">
            <Socials />
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <Contact />
          </div>
        </div>

        {/* Newsletter */}
        <div className="col-span-1 flex-1">
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