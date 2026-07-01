"use client";

import React from "react";

interface CurveSeparatorProps {
  type?: "concave" | "convex" | "s-curve" | "straight";
  fillClass?: string;     // Color class for the wave itself (e.g. "fill-surface")
  bgClass?: string;       // Color class for the background behind the wave (e.g. "bg-primary")
  className?: string;     // Additional classes (e.g. "absolute bottom-0 left-0 w-full")
  flipY?: boolean;        // Inverts Y axis (flips top/bottom)
}

export default function CurveSeparator({
  type = "concave",
  fillClass = "fill-surface",
  bgClass = "",
  className = "relative w-full",
  flipY = false,
}: CurveSeparatorProps) {
  // SVG paths with viewBox 0 0 1440 100
  const paths = {
    concave: "M0,0 Q720,70 1440,0 L1440,100 L0,100 Z",
    convex: "M0,70 Q720,0 1440,70 L1440,100 L0,100 Z",
    "s-curve": "M0,35 C360,70 1080,0 1440,35 L1440,100 L0,100 Z",
    straight: "M0,0 L1440,0 L1440,100 L0,100 Z",
  };

  const path = paths[type] || paths.concave;
  const colorName = fillClass.replace("fill-", "");
  const colorVal = `var(--color-${colorName})`;

  return (
    <div 
      className={`${className} ${bgClass} overflow-hidden pointer-events-none select-none`} 
      style={{ 
        lineHeight: 0,
        transform: flipY ? "scaleY(-1)" : undefined,
        marginTop: "-1px",
        marginBottom: "-1px",
      }}
    >
      <svg
        viewBox="0 0 1440 100"
        className="w-full h-[25px] md:h-[50px]"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d={path} 
          style={{
            fill: colorVal,
            stroke: colorVal,
            strokeWidth: 1.5,
          }}
        />
      </svg>
    </div>
  );
}
