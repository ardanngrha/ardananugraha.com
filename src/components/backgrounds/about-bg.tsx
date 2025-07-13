import React from "react"

/**
 * Animated SVG background for the About page, depicting forward progress with chevrons.
 */
export const AboutBg = () => (
  <svg
    className="h-full w-full"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 800 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>
        {`
          @keyframes slideUpFadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .chevron {
            opacity: 0;
            animation: slideUpFadeIn 0.7s ease-out forwards;
          }
          .chevron-1 { animation-delay: 0.2s; }
          .chevron-2 { animation-delay: 0.4s; }
          .chevron-3 { animation-delay: 0.6s; }
          .chevron-4 { animation-delay: 0.8s; }
        `}
      </style>
    </defs>
    <g
      className="fill-none stroke-current"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M 200 220 L 250 170 L 300 220"
        className="chevron chevron-1"
        opacity="0.2"
      />
      <path
        d="M 320 200 L 370 150 L 420 200"
        className="chevron chevron-2"
        opacity="0.4"
      />
      <path
        d="M 440 180 L 490 130 L 540 180"
        className="chevron chevron-3"
        opacity="0.6"
      />
      <path
        d="M 560 160 L 610 110 L 660 160"
        className="chevron chevron-4"
        opacity="0.8"
      />
    </g>
  </svg>
)