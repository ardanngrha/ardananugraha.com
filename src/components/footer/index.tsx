import NowPlaying from "./now-playing"
import Navigation from "./navigation"
import Newsletter from "./newsletter"
import Copyright from "./copyright"
import Connect from "./connect"
import { Separator } from "../ui/separator"

export default function Footer() {
  return (
    <footer className="mb-16 md:mb-0">
      <Separator />
      {/* Main Row - 5 columns */}
      <div className="flex flex-col md:flex-row gap-6 py-12 items-center md:items-start">
        {/* Now Playing */}
        <div className="col-span-1 md:mr-15 flex justify-center md:justify-start">
          <NowPlaying />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-12">
          {/* Navigation */}
          <div className="col-span-1 md:mr-15 hidden md:flex justify-center md:justify-start order-1 md:order-1">
            <Navigation />
          </div>

          {/* Connect */}
          <div className="col-span-1 md:mr-15 flex justify-center md:justify-start order-1 md:order-2">
            <Connect />
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