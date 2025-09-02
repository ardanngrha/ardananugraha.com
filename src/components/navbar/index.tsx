'use client';

import { DesktopTabs } from './desktop-tabs';
import { MobileTabs } from './mobile-tabs';
import { navigationTabs } from '@/data/navigation';
import { useNavbarScroll } from '@/hooks/use-navbar-scroll';

export default function Navbar() {
  const { isVisible } = useNavbarScroll();

  return (
    <>
      <DesktopTabs navigationTabs={navigationTabs} isVisible={isVisible} />
      <MobileTabs navigationTabs={navigationTabs} />
    </>
  );
}
