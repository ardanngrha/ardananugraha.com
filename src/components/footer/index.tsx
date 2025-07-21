import NowPlaying from "./now-playing"
import Navigation from "./navigation"
import Newsletter from "./newsletter"
import Copyright from "./copyright"
import Socials from "./socials"
import Contact from "./contact"
import { Separator } from "../ui/separator"

export default function Footer() {
  return (
    <footer className="mb-16 md:mb-0">
      <Separator />
      {/* Main Row - 5 columns */}
      <div className="flex flex-col md:flex-row gap-6 py-12 items-center md:items-start">
        {/* Now Playing */}
        <div className="col-span-1 md:mr-20 flex justify-center md:justify-start">
          <NowPlaying />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-12">
          {/* Navigation */}
          <div className="col-span-1 hidden md:flex justify-center md:justify-start order-1 md:order-1">
            <Navigation />
          </div>

          {/* Socials */}
          <div className="col-span-1 flex justify-center md:justify-start order-1 md:order-2">
            <Socials />
          </div>

          {/* Contact */}
          <div className="col-span-1 flex justify-center md:justify-start order-2 md:order-3">
            <Contact />
          </div>
        </div>

        {/* Newsletter */}
        <div className="col-span-1 flex-1 flex justify-center md:justify-start">
          <Newsletter />
        </div>
      </div>

      <Separator />

      {/* Copyright Row */}
      <div className="py-12">
        <Copyright />
      </div>

    </footer>
  )
}