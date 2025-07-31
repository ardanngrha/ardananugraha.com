import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export interface ThemeAwareColors {
  ripple: {
    primary: string
    secondary: string
  }
  shadow: {
    gradient: [string, string, string]
    opacity: number
  }
}

/**
 * Hook for managing theme-aware colors that integrates with existing CSS custom properties
 * Automatically updates colors when theme changes and provides fallbacks
 */
export function useThemeColors(): ThemeAwareColors {
  const { resolvedTheme } = useTheme()
  const [colors, setColors] = useState<ThemeAwareColors>({
    ripple: {
      primary: 'rgba(59, 130, 246, 0.1)',
      secondary: 'rgba(59, 130, 246, 0.05)',
    },
    shadow: {
      gradient: ['#3b82f6', '#8b5cf6', '#ec4899'],
      opacity: 0.3,
    },
  })

  useEffect(() => {
    // Wait for theme to be resolved and DOM to be available
    if (typeof window === 'undefined' || !resolvedTheme) return

    const updateColors = () => {
      const isDark = resolvedTheme === 'dark'

      // Get CSS custom property values or use fallbacks
      const getCustomProperty = (property: string, fallback: string): string => {
        if (typeof window === 'undefined') return fallback
        const value = getComputedStyle(document.documentElement)
          .getPropertyValue(property)
          .trim()
        return value || fallback
      }

      // Define theme-specific colors
      const themeColors: ThemeAwareColors = isDark
        ? {
          ripple: {
            primary: 'rgba(6, 182, 212, 0.15)', // cyan with opacity
            secondary: 'rgba(6, 182, 212, 0.08)',
          },
          shadow: {
            gradient: ['#3b82f6', '#8b5cf6', '#ec4899'], // blue to purple to pink
            opacity: 0.4,
          },
        }
        : {
          ripple: {
            primary: 'rgba(59, 130, 246, 0.12)', // blue with opacity
            secondary: 'rgba(59, 130, 246, 0.06)',
          },
          shadow: {
            gradient: ['#3b82f6', '#8b5cf6', '#ec4899'], // blue to purple to pink
            opacity: 0.25,
          },
        }

      // Try to use existing gradient colors from CSS custom properties
      const gradientStart = getCustomProperty('--shadow-gradient-start', themeColors.shadow.gradient[0])
      const gradientMid = getCustomProperty('--shadow-gradient-mid', themeColors.shadow.gradient[1])
      const gradientEnd = getCustomProperty('--shadow-gradient-end', themeColors.shadow.gradient[2])

      // Update colors with CSS custom property values if available
      const updatedColors: ThemeAwareColors = {
        ...themeColors,
        shadow: {
          ...themeColors.shadow,
          gradient: [gradientStart, gradientMid, gradientEnd],
        },
      }

      setColors(updatedColors)
    }

    // Update colors immediately
    updateColors()

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleThemeChange = () => {
      // Small delay to ensure CSS custom properties are updated
      setTimeout(updateColors, 50)
    }

    mediaQuery.addEventListener('change', handleThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleThemeChange)
    }
  }, [resolvedTheme])

  return colors
}

/**
 * Utility function to convert hex color to rgba with opacity
 */
export function hexToRgba(hex: string, opacity: number): string {
  // Remove # if present
  hex = hex.replace('#', '')

  // Handle 3-digit hex
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('')
  }

  // Parse RGB values
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

/**
 * Utility function to create CSS custom properties for theme colors
 */
export function createThemeColorProperties(colors: ThemeAwareColors): Record<string, string> {
  return {
    '--ripple-primary': colors.ripple.primary,
    '--ripple-secondary': colors.ripple.secondary,
    '--shadow-gradient-start': colors.shadow.gradient[0],
    '--shadow-gradient-mid': colors.shadow.gradient[1],
    '--shadow-gradient-end': colors.shadow.gradient[2],
    '--shadow-opacity': colors.shadow.opacity.toString(),
  }
}