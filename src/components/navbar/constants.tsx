import { HiOutlineHome, HiOutlineBriefcase, HiOutlinePencilAlt, HiOutlineUser, HiOutlineDotsHorizontal } from "react-icons/hi"

export const navigationTabs = [
  { id: "home", label: "Home", href: "/", logo: <HiOutlineHome className="w-5 h-5" /> },
  { id: "projects", label: "Projects", href: "/projects", logo: <HiOutlineBriefcase className="w-5 h-5" /> },
  { id: "writings", label: "Writings", href: "/writings", logo: <HiOutlinePencilAlt className="w-5 h-5" /> },
  { id: "about", label: "About", href: "/about", logo: <HiOutlineUser className="w-5 h-5" /> },
  { id: "more", label: "More", href: "#", logo: <HiOutlineDotsHorizontal className="w-5 h-5" />, isDropdown: true },
]