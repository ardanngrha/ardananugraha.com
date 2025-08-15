// Common easing functions
export const easings = {
  spring: { type: "spring" as const, stiffness: 120, damping: 15 },
  springFast: { type: "spring" as const, stiffness: 300, damping: 20 },
  springSlow: { type: "spring" as const, stiffness: 100, damping: 12 },
  springBouncy: { type: "spring" as const, stiffness: 300, damping: 25 },
} as const;

// Container animations
export const containerVariants = {
  // Basic container with stagger
  basic: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  
  // Slow stagger for hero sections
  hero: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  },

  // Fast stagger for lists
  list: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  },

  // Grid layouts
  grid: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const;

// Item/card animations
export const itemVariants = {
  // Basic slide up
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: easings.spring,
    },
  },

  // Slide up with scale
  slideUpScale: {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: easings.spring,
    },
  },

  // Project card specific
  projectCard: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 14,
      },
    },
  },

  // Writing card specific
  writingCard: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 15,
        duration: 0.4,
      },
    },
  },

  // Text elements
  text: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: easings.spring,
    },
  },

  // Section animations
  section: {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  },
} as const;

// Hover animations
export const hoverVariants = {
  // Basic lift
  lift: {
    y: -5,
    transition: easings.springFast,
  },

  // Lift with scale
  liftScale: {
    y: -5,
    scale: 1.02,
    boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
    transition: easings.springFast,
  },

  // Card hover
  card: {
    y: -2,
    transition: easings.springFast,
  },

  // Image scale
  imageScale: {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 15,
      },
    }
  },

  // Button hover
  button: {
    scale: 1.05,
    transition: easings.springFast,
  },
} as const;

// Carousel/slider animations
export const carouselVariants = {
  // Testimonials carousel
  testimonials: {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      rotate: 0,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 3,
      x: "0%",
      y: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
      filter: "grayscale(0)",
      transition: easings.springBouncy,
    },
    exit: (direction: number) => ({
      zIndex: 1,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      filter: "grayscale(1)",
      transition: easings.springBouncy,
    }),
  },

  // Image carousel
  imageCarousel: {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotate: direction > 0 ? 25 : -25,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotate: direction < 0 ? -25 : 25,
    }),
  },
} as const;

// Page transitions
export const pageVariants = {
  // Basic page enter
  enter: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },

  // Fade in
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  },
} as const;

// Loading/skeleton animations
export const loadingVariants = {
  pulse: {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  shimmer: {
    animate: {
      x: ["-100%", "100%"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
} as const;

// Special effects
export const effectVariants = {
  // Ripple effect
  ripple: {
    animate: {
      scale: [0, 3],
      opacity: [0.8, 0],
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  },

  // Theme switching ripple
  themeRipple: {
    animate: {
      scale: [0, 2.5],
      opacity: [0.3, 0],
      transition: {
        duration: 0.8,
        ease: "cubicBezier(0.4, 0, 0.2, 1)",
      },
    },
  },
} as const;

// Utility functions for common animation patterns
export const createStaggerContainer = (staggerDelay = 0.1, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

export const createSlideUpItem = (customTransition?: unknown) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: customTransition || easings.spring,
  },
});

export const createHoverLift = (yOffset = -5, customTransition?: unknown) => ({
  y: yOffset,
  transition: customTransition || easings.springFast,
});

// Responsive animation configs
export const responsiveConfigs = {
  // Reduce motion for mobile
  mobile: {
    transition: { duration: 0.2 },
  },
  
  // Full animations for desktop
  desktop: {
    transition: easings.spring,
  },
} as const;

// Export commonly used combinations
export const commonAnimations = {
  // Page with staggered content
  pageWithStagger: {
    container: containerVariants.basic,
    item: itemVariants.slideUp,
    hover: hoverVariants.lift,
  },

  // Card grid
  cardGrid: {
    container: containerVariants.grid,
    item: itemVariants.slideUpScale,
    hover: hoverVariants.card,
  },

  // Hero section
  heroSection: {
    container: containerVariants.hero,
    item: itemVariants.text,
  },
} as const;