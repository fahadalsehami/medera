"use client";

import { motion } from "framer-motion";
import { BaseStepVisual } from "./base-step-visual";

interface EmpowerStepVisualProps {
  isActive?: boolean;
  currentSubItem?: number;
}

export function EmpowerStepVisual({ 
  isActive = true, 
  currentSubItem = 1
}: EmpowerStepVisualProps) {

  return (
    <BaseStepVisual>
      {/* Empower Step Content */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.6 }}
        transition={{ duration: 0.4 }}
      >
        {/* Analytics & Crisis Detection Visual */}
        <rect
          x="300"
          y="200"
          width="360"
          height="240"
          rx="12"
          fill="white"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
        
        {/* Empower icon/visual content */}
        <text
          x="480"
          y="340"
          textAnchor="middle"
          className="text-lg font-medium fill-gray-700"
        >
          Advanced Analytics
        </text>
      </motion.g>
    </BaseStepVisual>
  );
}