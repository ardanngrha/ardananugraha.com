import Link from "next/link";
import { ModeToggle } from "./toggle-mode";
import Image from "next/image";
import { Tabs } from "@/components/tabs";

const navigationTabs = [
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "about", label: "About", href: "/about" },
];

export default function Navbar() {
  return (
    <div className="sticky top-5 z-50 bg-transparent backdrop-blur-md container mx-auto flex justify-between items-center border-2 rounded-full px-2 py-0.5 dark:border-gray-700 border-gray-300">
      <div className="flex items-center justify-center w-10 h-10">
        <Link href="/">
          <Image
            src="/images/an-white.png"
            alt="logo"
            width={30}
            height={35}
            className="dark:block hidden"
          />
          <Image
            src="/images/an-black.png"
            alt="logo"
            width={30}
            height={35}
            className="dark:hidden block"
          />
        </Link>
      </div>

      <Tabs tabs={navigationTabs} />

      <div className="flex items-center justify-center w-10 h-10">
        <ModeToggle />
      </div>
    </div>
  );
}