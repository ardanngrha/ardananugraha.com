import React from "react"

/**
 * Animated SVG background for the Writings page, showing a pen drawing a line.
 */
export const WritingsBg = () => (
  <svg
    className="h-full w-full"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 800 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>
        {`
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes movePen {
            0% {
              offset-distance: 0%;
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              offset-distance: 100%;
              opacity: 0;
            }
          }
        `}
      </style>
    </defs>
    <g className="fill-none stroke-current">
      {/* The path for the pen to follow and the line to be drawn */}
      <path
        id="writing-path"
        d="M 50 200 C 150 100, 250 300, 400 150 C 550 0, 650 250, 750 120"
        strokeWidth="2"
        strokeDasharray="1500"
        strokeDashoffset="1500"
        style={{ animation: "draw 4s ease-out forwards" }}
      />
      {/* The pen icon that moves along the path */}
      <g
        style={{
          offsetPath: "path('M 50 200 C 150 100, 250 300, 400 150 C 550 0, 650 250, 750 120')",
          animation: "movePen 4s ease-out forwards",
        }}
      >
        <path
          d="M -15 -5 L 0 0 L -15 5 Z M 0 0 L 20 0"
          className="fill-current"
          strokeWidth="2"
          transform="translate(5, -15) rotate(15)"
        />
      </g>
    </g>
  </svg>
)