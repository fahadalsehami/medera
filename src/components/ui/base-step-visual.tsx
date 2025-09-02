"use client";

import { motion } from "framer-motion";

interface BaseStepVisualProps {
  children?: React.ReactNode;
  className?: string;
}

export function BaseStepVisual({ children, className = "" }: BaseStepVisualProps) {
  return (
    <div className={`w-full h-full rounded-2xl p-2 flex items-center justify-center ${className}`} style={{ backgroundColor: '#f0f5f7' }}>
      <svg
        width="960"
        height="840"
        viewBox="0 0 960 840"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* 3x3 Large Dashed Squares Grid with Fade */}
        <defs>
          {/* Linear gradient for fade - fade on left edge of column 1 and right edge */}
          <linearGradient
            id="leftRightFade"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="10%" stopColor="white" stopOpacity="0.8" />
            <stop offset="20%" stopColor="white" stopOpacity="0.4" />
            <stop offset="35%" stopColor="white" stopOpacity="0" />
            <stop offset="60%" stopColor="white" stopOpacity="0" />
            <stop offset="75%" stopColor="white" stopOpacity="0.4" />
            <stop offset="85%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Clean background - no default grid */}

        {/* Custom content goes here */}
        {children}
      </svg>
    </div>
  );
}