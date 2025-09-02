"use client";

import { motion } from "framer-motion";
import { BaseStepVisual } from "./base-step-visual";

interface IntegrateStepVisualProps {
  isActive?: boolean;
  currentSubItem?: number;
}

export function IntegrateStepVisual({ 
  isActive = true, 
  currentSubItem = 1
}: IntegrateStepVisualProps) {

  return (
    <BaseStepVisual>
      {/* Integrate Step Content */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0.6 }}
        transition={{ duration: 0.4 }}
      >
        {/* Documentation Flow Visual */}
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
        
        {/* Integrate icon/visual content */}
        <text
          x="480"
          y="340"
          textAnchor="middle"
          className="text-lg font-medium fill-gray-700"
        >
          Clinical Integration
        </text>
      </motion.g>
    </BaseStepVisual>
  );
}