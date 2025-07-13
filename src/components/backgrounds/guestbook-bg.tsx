import React from "react"

/**
 * Animated SVG background for the Guestbook page, with fading-in signatures.
 */
export const GuestbookBg = () => (
  <svg
    className="h-full w-full"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 800 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .sig-1 { animation: fadeIn 0.5s ease-in forwards; animation-delay: 0.2s; }
          .sig-2 { animation: fadeIn 0.5s ease-in forwards; animation-delay: 0.5s; }
          .sig-3 { animation: fadeIn 0.5s ease-in forwards; animation-delay: 0.8s; }
          .sig-4 { animation: fadeIn 0.5s ease-in forwards; animation-delay: 1.1s; }
          .sig-5 { animation: fadeIn 0.5s ease-in forwards; animation-delay: 1.4s; }
        `}
      </style>
    </defs>
    <g
      className="fill-none stroke-current opacity-70"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path
        className="sig-1 opacity-0"
        transform="translate(100 180) scale(1.2)"
        d="M 0 50 C 10 0, 40 0, 50 50 S 80 100, 90 50"
      />
      <path
        className="sig-2 opacity-0"
        transform="translate(450 80) rotate(15)"
        d="M 0 30 C 20 -20, 70 -20, 90 30 L 70 80 C 50 130, 20 130, 0 80 Z"
      />
      <path
        className="sig-3 opacity-0"
        transform="translate(650 200) scale(0.8) rotate(-10)"
        d="M 0 100 Q 50 0, 100 100 T 200 100"
      />
      <path
        className="sig-4 opacity-0"
        transform="translate(250 80) scale(1.1)"
        d="M 0 0 L 30 50 L 60 0 L 90 50 L 120 0"
      />
      <path
        className="sig-5 opacity-0"
        transform="translate(50 50) rotate(-25)"
        d="M 0 20 C 30 0, 50 40, 80 20"
      />
    </g>
  </svg>
)