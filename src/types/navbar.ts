export interface DesktopTabsProps {
  navigationTabs: Array<{
    id: string
    label: string
    href: string
    logo: React.ReactNode
  }>
  isVisible: boolean
}

export interface MobileTabsProps {
  navigationTabs: Array<{
    id: string
    label: string
    href: string
    logo: React.ReactNode
  }>
}

export interface MoreDropdownProps {
  isActive: boolean
  isHovered: boolean
  onMouseEnterAction: () => void
  onMouseLeaveAction: () => void
  onOpenChangeAction: (open: boolean) => void
  showLabel?: boolean
  className?: string
  isAnyTabHovered?: boolean
}

interface Tab {
  id: string
  label: string
  href: string
  logo: React.ReactNode
  isDropdown?: boolean
}

export interface TabsProps {
  tabs: Tab[]
  showLabels?: boolean
}

export interface ModeToggleProps {
  variant?: "default" | "mobile"
}