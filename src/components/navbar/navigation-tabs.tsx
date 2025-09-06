'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MoreDropdown } from './more-dropdown';
import { TabsProps } from '@/types/navbar';

export function Tabs({ tabs, showLabels = true }: TabsProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(() => {
    return tabs.find((tab) => tab.href === pathname)?.id || null;
  });
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const tabsRef = useRef<
    (HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | null)[]
  >([]);

  useEffect(() => {
    const currentTab = tabs.find((tab) => tab.href === pathname);
    if (currentTab) {
      setActiveTab(currentTab?.id || null);
    } else {
      const dropdownPaths = ['/guestbook', '/credits'];
      if (dropdownPaths.includes(pathname)) {
        setActiveTab('more');
      } else {
        setActiveTab(null);
      }
    }
  }, [pathname, tabs]);

  // Handle mounting and position recalculation
  useEffect(() => {
    setIsMounted(true);

    // Recalculate position after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Force a re-render to recalculate positions
      setActiveTab((prev) => prev);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const getTabPosition = (tabId: string | null) => {
    if (!tabId || !isMounted) return { left: 0, width: 0 };

    const tabIndex = tabs.findIndex((tab) => tab.id === tabId);
    const tabElement = tabsRef.current[tabIndex];

    if (!tabElement) return { left: 0, width: 0 };

    const containerElement = tabElement.parentElement;
    if (!containerElement) return { left: 0, width: 0 };

    const containerRect = containerElement.getBoundingClientRect();
    const tabRect = tabElement.getBoundingClientRect();

    return {
      left: tabRect.left - containerRect.left,
      width: tabRect.width,
    };
  };

  // Determine which tab should show the background
  const getBackgroundTab = () => {
    // Fix: Prioritize hovered tab even when dropdown is open
    if (hoveredTab) {
      return hoveredTab;
    }
    // If More dropdown is open and no hover, show background on More tab
    if (moreDropdownOpen) {
      return tabs.find((tab) => tab.isDropdown)?.id || null;
    }
    // Otherwise, show active tab
    return activeTab;
  };

  const backgroundPosition = getTabPosition(getBackgroundTab());

  return (
    <div className="relative flex items-center gap-1">
      {/* Sliding background */}
      <div
        className="absolute top-0 h-full bg-gray-800 dark:bg-gray-300 rounded-full transition-all duration-200 ease-out z-0"
        style={{
          left: backgroundPosition.left,
          width: backgroundPosition.width,
          opacity:
            (hoveredTab || activeTab || moreDropdownOpen) && isMounted ? 1 : 0,
        }}
      />

      {tabs.map((tab, index) => {
        // Handle dropdown tab separately
        if (tab.isDropdown) {
          return (
            <div
              key={tab.id}
              ref={(el) => {
                tabsRef.current[index] = el as HTMLDivElement;
              }}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <MoreDropdown
                isActive={activeTab === tab.id || moreDropdownOpen}
                isHovered={hoveredTab === tab.id}
                onMouseEnterAction={() => setHoveredTab(tab.id)}
                onMouseLeaveAction={() => setHoveredTab(null)}
                onOpenChangeAction={setMoreDropdownOpen}
                showLabel={showLabels}
                // Pass information about whether any other tab is hovered
                isAnyTabHovered={hoveredTab !== null && hoveredTab !== tab.id}
              />
            </div>
          );
        }

        return (
          <Link
            key={tab.id}
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            href={tab.href}
            data-tab={tab.id}
            className={cn(
              'relative z-10 flex items-center gap-2 px-3 py-2 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200',
              hoveredTab === tab.id ||
                (hoveredTab === null &&
                  !moreDropdownOpen &&
                  activeTab === tab.id)
                ? 'text-white dark:text-black'
                : 'text-muted-foreground hover:text-foreground',
              // Adjust padding when labels are hidden
              !showLabels && 'px-3',
            )}
            onClick={() => setActiveTab(tab.id)}
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {tab.logo}
            {showLabels && tab.label}
          </Link>
        );
      })}
    </div>
  );
}
