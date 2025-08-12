import React from "react"

/**
 * Animated SVG background for the Attribution page, showing interconnected nodes.
 */
export const CreditsBg = () => (
  <svg
    className="h-full w-full"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 800 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style>
        {`
          @keyframes drawLine {
            to { stroke-dashoffset: 0; }
          }
          @keyframes fadeInNode {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
          }
          .line {
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
            animation: drawLine 1s ease-out forwards;
          }
          .node {
            opacity: 0;
            transform-origin: center;
            animation: fadeInNode 0.5s ease-out forwards;
          }
          .line-1 { animation-delay: 0.2s; }
          .line-2 { animation-delay: 0.4s; }
          .line-3 { animation-delay: 0.6s; }
          .line-4 { animation-delay: 0.8s; }
          .node-1 { animation-delay: 0.5s; }
          .node-2 { animation-delay: 0.8s; }
          .node-3 { animation-delay: 1.0s; }
          .node-4 { animation-delay: 1.4s; }
        `}
      </style>
    </defs>
    <g className="stroke-current">
      {/* Lines */}
      <path d="M 150 150 L 300 100" strokeWidth="1.5" className="line line-1" />
      <path d="M 150 150 L 300 200" strokeWidth="1.5" className="line line-2" />
      <path d="M 300 100 L 500 125" strokeWidth="1.5" className="line line-3" />
      <path d="M 300 200 L 500 125" strokeWidth="1.5" className="line line-3" />
      <path d="M 500 125 L 650 80" strokeWidth="1.5" className="line line-4" />
      <path d="M 500 125 L 650 220" strokeWidth="1.5" className="line line-4" />
      {/* Nodes */}
      <circle cx="150" cy="150" r="12" className="node node-1 fill-background" strokeWidth="2" />
      <circle cx="300" cy="100" r="8" className="node node-2 fill-background" strokeWidth="2" />
      <circle cx="300" cy="200" r="10" className="node node-2 fill-background" strokeWidth="2" />
      <circle cx="500" cy="125" r="15" className="node node-3 fill-background" strokeWidth="2" />
      <circle cx="650" cy="80" r="7" className="node node-4 fill-background" strokeWidth="2" />
      <circle cx="650" cy="220" r="11" className="node node-4 fill-background" strokeWidth="2" />
    </g>
  </svg>
)