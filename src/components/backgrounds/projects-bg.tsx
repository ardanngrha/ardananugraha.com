import React from "react"

/**
 * Animated SVG background for the Projects page, showing a workshop scene.
 */
export const ProjectsBg = () => (
  <svg
    className="h-full w-full"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 800 300"
    xmlns="http://www.w3.org/2000/svg"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <defs>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(-50px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .tool-1 { animation: slideIn 0.6s ease-out forwards; animation-delay: 0.2s; }
          .tool-2 { animation: slideIn 0.6s ease-out forwards; animation-delay: 0.5s; }
          .tool-3 { animation: slideIn 0.6s ease-out forwards; animation-delay: 0.8s; }
          .tool-4 { animation: slideIn 0.6s ease-out forwards; animation-delay: 1.1s; }
        `}
      </style>
    </defs>
    <g
      className="fill-none stroke-current"
      strokeWidth="2"
      transform="rotate(-10 400 150) scale(1.1)"
    >
      {/* Set Square */}
      <path d="M 150 100 L 150 200 L 250 200 Z" className="tool-1 opacity-0" />
      {/* Hammer */}
      <g className="tool-2 opacity-0">
        <path d="M 500 80 L 580 160" strokeWidth="4" />
        <rect x="460" y="50" width="80" height="40" rx="5" fill="currentColor" />
      </g>
      {/* Pencil */}
      <g className="tool-3 opacity-0">
        <path d="M 650 180 L 750 200" strokeWidth="3" />
        <path d="M 650 180 L 640 175 L 645 185 Z" fill="currentColor" />
      </g>
      {/* Wood Shavings */}
      <g className="tool-4 opacity-0">
        <path d="M 300 220 C 310 200, 330 200, 340 220" />
        <path d="M 320 240 C 330 220, 350 220, 360 240" />
      </g>
    </g>
  </svg>
)