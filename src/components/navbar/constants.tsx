import { HiHome, HiBriefcase, HiPencilAlt, HiUser } from "react-icons/hi"

export const navigationTabs = [
  { id: "home", label: "Home", href: "/", logo: <HiHome className="w-5 h-5" /> },
  { id: "projects", label: "Projects", href: "/projects", logo: <HiBriefcase className="w-5 h-5" /> },
  { id: "writings", label: "Writings", href: "/writings", logo: <HiPencilAlt className="w-5 h-5" /> },
  { id: "about", label: "About", href: "/about", logo: <HiUser className="w-5 h-5" /> },
]