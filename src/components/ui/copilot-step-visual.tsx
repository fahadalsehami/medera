"use client";

import { motion } from "framer-motion";
import { BaseStepVisual } from "./base-step-visual";

interface CoPilotStepVisualProps {
  isActive?: boolean;
  currentSubItem?: number;
  scrollProgress?: number;
}

export function CoPilotStepVisual({ 
  isActive = true, 
  currentSubItem = 1,
  scrollProgress = 0
}: CoPilotStepVisualProps) {

  return (
    <BaseStepVisual>
      {/* AI Care Agent Visual */}
      
      {/* Sub-item 1: Multi-Modal Clinical Intelligence */}
      {currentSubItem === 1 && (
        <>
          {/* Patient Avatar */}
          <motion.circle
            cx="200"
            cy="300"
            r="60"
            fill="#70a2bc"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.text
            x="200"
            y="310"
            textAnchor="middle"
            fill="white"
            fontSize="16"
            fontWeight="500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Patient
          </motion.text>

          {/* Multi-modal analysis streams */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {/* Voice Analysis */}
            <motion.path
              d="M 260 280 Q 400 250 520 280"
              stroke="#10B981"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <rect x="520" y="260" width="120" height="40" rx="4" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1.5"/>
            <text x="580" y="285" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="500">Voice Analysis</text>

            {/* Behavioral Cues */}
            <motion.path
              d="M 260 300 Q 400 300 520 340"
              stroke="#3B82F6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
            <rect x="520" y="320" width="120" height="40" rx="4" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="1.5"/>
            <text x="580" y="345" textAnchor="middle" fill="#3B82F6" fontSize="12" fontWeight="500">Behavioral Cues</text>

            {/* Physiology */}
            <motion.path
              d="M 260 320 Q 400 350 520 400"
              stroke="#8B5CF6"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5 5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 1 }}
            />
            <rect x="520" y="380" width="120" height="40" rx="4" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="1.5"/>
            <text x="580" y="405" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontWeight="500">Physiology</text>
          </motion.g>

          {/* AI Processing Center */}
          <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}>
            <rect x="720" y="280" width="160" height="120" rx="8" fill="#f0f5f7" stroke="#70a2bc" strokeWidth="2"/>
            <text x="800" y="305" textAnchor="middle" fill="#70a2bc" fontSize="14" fontWeight="600">AI Care Agent</text>
            <text x="800" y="330" textAnchor="middle" fill="#64748b" fontSize="11">Processing...</text>
            
            {/* Processing indicators */}
            <motion.circle cx="760" cy="360" r="4" fill="#10B981" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} />
            <motion.circle cx="800" cy="360" r="4" fill="#3B82F6" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }} />
            <motion.circle cx="840" cy="360" r="4" fill="#8B5CF6" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 1 }} />
          </motion.g>

          {/* EHR Output */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            <motion.path
              d="M 880 340 L 960 340"
              stroke="#70a2bc"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            />
            <rect x="960" y="300" width="140" height="80" rx="4" fill="white" stroke="#70a2bc" strokeWidth="1.5"/>
            <text x="1030" y="320" textAnchor="middle" fill="#70a2bc" fontSize="12" fontWeight="600">EHR System</text>
            <text x="1030" y="340" textAnchor="middle" fill="#64748b" fontSize="10">Clinical Summary</text>
            <text x="1030" y="355" textAnchor="middle" fill="#64748b" fontSize="10">Medical History</text>
            <text x="1030" y="370" textAnchor="middle" fill="#64748b" fontSize="10">Diagnosis Support</text>
          </motion.g>

          {/* 24/7 Operation Indicator */}
          <motion.text
            x="200"
            y="400"
            textAnchor="middle"
            fill="#70a2bc"
            fontSize="11"
            fontWeight="500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            24/7 Operation
          </motion.text>
        </>
      )}

      {/* Sub-item 2: Condition-Specific Care Protocols */}
      {currentSubItem === 2 && (
        <>
          {/* Central AI Agent */}
          <motion.circle
            cx="550"
            cy="340"
            r="80"
            fill="#70a2bc"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.text
            x="550"
            y="340"
            textAnchor="middle"
            fill="white"
            fontSize="16"
            fontWeight="600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            AI Care Agent
          </motion.text>
          <motion.text
            x="550"
            y="360"
            textAnchor="middle"
            fill="white"
            fontSize="12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Adaptive Protocols
          </motion.text>

          {/* Condition-Specific Branches */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.2, delay: 0.5 }}>
            {/* Depression Screening */}
            <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <path d="M 470 340 L 320 240" stroke="#10B981" strokeWidth="2"/>
              <rect x="220" y="210" width="100" height="60" rx="4" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1.5"/>
              <text x="270" y="235" textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="500">Depression</text>
              <text x="270" y="250" textAnchor="middle" fill="#10B981" fontSize="10">Screening</text>
            </motion.g>

            {/* Anxiety Evaluation */}
            <motion.g initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <path d="M 550 260 L 550 160" stroke="#3B82F6" strokeWidth="2"/>
              <rect x="500" y="100" width="100" height="60" rx="4" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="1.5"/>
              <text x="550" y="125" textAnchor="middle" fill="#3B82F6" fontSize="11" fontWeight="500">Anxiety</text>
              <text x="550" y="140" textAnchor="middle" fill="#3B82F6" fontSize="10">Evaluation</text>
            </motion.g>

            {/* Post-Crisis Follow-up */}
            <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <path d="M 630 340 L 780 240" stroke="#EF4444" strokeWidth="2"/>
              <rect x="780" y="210" width="100" height="60" rx="4" fill="#EF4444" fillOpacity="0.1" stroke="#EF4444" strokeWidth="1.5"/>
              <text x="830" y="235" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="500">Post-Crisis</text>
              <text x="830" y="250" textAnchor="middle" fill="#EF4444" fontSize="10">Follow-up</text>
            </motion.g>

            {/* PTSD Assessment */}
            <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <path d="M 550 420 L 550 520" stroke="#8B5CF6" strokeWidth="2"/>
              <rect x="500" y="520" width="100" height="60" rx="4" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="1.5"/>
              <text x="550" y="545" textAnchor="middle" fill="#8B5CF6" fontSize="11" fontWeight="500">PTSD</text>
              <text x="550" y="560" textAnchor="middle" fill="#8B5CF6" fontSize="10">Assessment</text>
            </motion.g>

            {/* Substance Use */}
            <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
              <path d="M 470 380 L 320 480" stroke="#F59E0B" strokeWidth="2"/>
              <rect x="220" y="450" width="100" height="60" rx="4" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="1.5"/>
              <text x="270" y="475" textAnchor="middle" fill="#F59E0B" fontSize="11" fontWeight="500">Substance Use</text>
              <text x="270" y="490" textAnchor="middle" fill="#F59E0B" fontSize="10">Screening</text>
            </motion.g>

            {/* Bipolar Screening */}
            <motion.g initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
              <path d="M 630 380 L 780 480" stroke="#14B8A6" strokeWidth="2"/>
              <rect x="780" y="450" width="100" height="60" rx="4" fill="#14B8A6" fillOpacity="0.1" stroke="#14B8A6" strokeWidth="1.5"/>
              <text x="830" y="475" textAnchor="middle" fill="#14B8A6" fontSize="11" fontWeight="500">Bipolar</text>
              <text x="830" y="490" textAnchor="middle" fill="#14B8A6" fontSize="10">Screening</text>
            </motion.g>
          </motion.g>

          {/* Adaptive Context Indicator */}
          <motion.text
            x="550"
            y="620"
            textAnchor="middle"
            fill="#64748b"
            fontSize="12"
            fontStyle="italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Adapts approach based on presenting symptoms & clinical context
          </motion.text>
        </>
      )}

      {/* Grid overlay */}
      <g opacity="0.1">
        <line x1="0" y1="200" x2="1200" y2="200" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="0" y1="400" x2="1200" y2="400" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="0" y1="600" x2="1200" y2="600" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="300" y1="0" x2="300" y2="800" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="600" y1="0" x2="600" y2="800" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="900" y1="0" x2="900" y2="800" stroke="#64748b" strokeWidth="0.5" strokeDasharray="2 4" />
      </g>

    </BaseStepVisual>
  );
}