"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { HiOutlineDotsHorizontal, HiOutlineBookOpen, HiOutlineInformationCircle } from "react-icons/hi"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

const dropdownItems = [
  {
    id: "guestbook",
    label: "Guest Book",
    href: "/guestbook",
    icon: <HiOutlineBookOpen className="w-4 h-4" />,
  },
  {
    id: "attribution",
    label: "Attribution",
    href: "/attribution",
    icon: <HiOutlineInformationCircle className="w-4 h-4" />,
  },
]

interface MoreDropdownProps {
  isActive: boolean
  isHovered: boolean
  onMouseEnterAction: () => void
  onMouseLeaveAction: () => void
  onOpenChangeAction: (open: boolean) => void
  showLabel?: boolean
  className?: string
}

export function MoreDropdown({
  isActive,
  isHovered,
  onMouseEnterAction,
  onMouseLeaveAction,
  onOpenChangeAction,
  showLabel = true,
  className,
}: MoreDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    onOpenChangeAction?.(open)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange} modal={false}>
      <DropdownMenuTrigger asChild>
        <motion.div
          className={cn(
            "relative z-10 flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 outline-none cursor-pointer",
            isOpen || isHovered || isActive
              ? "text-white dark:text-black"
              : "text-muted-foreground hover:text-foreground",
            !showLabel && "px-3",
            className
          )}
          onMouseEnter={onMouseEnterAction}
          onMouseLeave={onMouseLeaveAction}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiOutlineDotsHorizontal className="w-5 h-5" />
          {showLabel && "More"}
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 mt-2"
        sideOffset={5}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {dropdownItems.map((item) => (
            <DropdownMenuItem key={item.id} asChild>
              <Link
                href={item.href}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.icon}
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}