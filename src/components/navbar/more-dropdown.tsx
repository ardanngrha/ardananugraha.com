'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { MoreDropdownProps } from '@/types/navbar';
import { getIcon } from '@/lib/icons';
import { dropdownItems } from '@/data/navigation';

export function MoreDropdown({
  isActive,
  isHovered,
  onMouseEnterAction,
  onMouseLeaveAction,
  onOpenChangeAction,
  showLabel = true,
  className,
  isAnyTabHovered = false,
}: MoreDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChangeAction?.(open);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange} modal={false}>
      <DropdownMenuTrigger asChild>
        <motion.button
          type="button"
          className={cn(
            'relative z-10 flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 outline-none cursor-pointer border-0 bg-transparent',
            isHovered ||
              (isOpen && !isAnyTabHovered) ||
              (isActive && !isAnyTabHovered)
              ? 'text-white dark:text-black'
              : 'text-muted-foreground hover:text-foreground',
            !showLabel && 'px-3',
            className,
          )}
          onMouseEnter={onMouseEnterAction}
          onMouseLeave={onMouseLeaveAction}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={showLabel ? undefined : 'More navigation options'}
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          {/* Mobile: Down when closed, Up when opened */}
          {/* Desktop (md+): Up when closed, Down when opened */}
          <div className="md:hidden" aria-hidden="true">
            {isOpen
              ? getIcon('ChevronUpOutlined', 'w-5 h-5')
              : getIcon('ChevronDownOutlined', 'w-5 h-5')}
          </div>
          <div className="hidden md:block" aria-hidden="true">
            {isOpen
              ? getIcon('ChevronDownOutlined', 'w-5 h-5')
              : getIcon('ChevronUpOutlined', 'w-5 h-5')}
          </div>
          {showLabel && <span>More</span>}
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 mt-2"
        sideOffset={5}
        onCloseAutoFocus={(e) => e.preventDefault()}
        id="more-dropdown-menu"
      >
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {dropdownItems.map((item) => (
            <DropdownMenuItem key={item.id} asChild>
              <Link
                href={item.href}
                className="group flex items-start gap-3 w-full px-3 py-3 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                aria-label={`Navigate to ${item.label}: ${item.description}`}
              >
                <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="text-sm font-medium group-hover:underline">
                    {item.label}
                  </span>
                  <span className="text-xs text-muted-foreground leading-tight">
                    {item.description}
                  </span>
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
