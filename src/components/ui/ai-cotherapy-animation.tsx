"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

interface AiCoTherapyAnimationProps {
  isActive?: boolean;
  currentSubItem?: number;
}

export function AiCoTherapyAnimation({ 
  isActive = true, 
  currentSubItem = 1 
}: AiCoTherapyAnimationProps) {
  const [animationPhase, setAnimationPhase] = useState(0);
  const controls = useAnimation();

  // Animation sequence phases
  useEffect(() => {
    if (!isActive) return;

    const sequence = async () => {
      // Phase 1: Patient interaction
      setAnimationPhase(1);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Phase 2: AI analysis
      setAnimationPhase(2);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Phase 3: Therapeutic intervention
      setAnimationPhase(3);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset and loop
      setAnimationPhase(0);
    };

    const interval = setInterval(sequence, 6500);
    sequence(); // Start immediately

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 flex items-center justify-center">
      <svg
        width="320"
        height="280"
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background Grid Pattern */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
          
          {/* Gradient Definitions */}
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          
          <linearGradient id="patientGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
          
          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect width="320" height="280" fill="url(#grid)" />

        {/* Central AI Brain/Hub */}
        <g transform="translate(160, 140)">
          {/* AI Core Circle */}
          <motion.circle
            cx="0"
            cy="0"
            r="25"
            fill="url(#aiGradient)"
            initial={{ scale: 0.8 }}
            animate={{
              scale: animationPhase === 2 ? 1.2 : 1,
              boxShadow: animationPhase === 2 ? "0 0 30px rgba(79, 70, 229, 0.6)" : "0 0 15px rgba(79, 70, 229, 0.3)"
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          
          {/* AI Brain Pattern */}
          <motion.g
            animate={{
              opacity: animationPhase === 2 ? 1 : 0.6,
              scale: animationPhase === 2 ? 1.1 : 1
            }}
            transition={{ duration: 0.6 }}
          >
            {/* Neural Network Lines */}
            {[...Array(8)].map((_, i) => (
              <motion.path
                key={i}
                d={`M ${15 * Math.cos((i * Math.PI) / 4)} ${15 * Math.sin((i * Math.PI) / 4)} 
                    L ${8 * Math.cos((i * Math.PI) / 4)} ${8 * Math.sin((i * Math.PI) / 4)}`}
                stroke="white"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: animationPhase === 2 ? 1 : 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              />
            ))}
            
            {/* Central Node */}
            <circle cx="0" cy="0" r="3" fill="white" />
            
            {/* Outer Nodes */}
            {[...Array(8)].map((_, i) => (
              <motion.circle
                key={i}
                cx={15 * Math.cos((i * Math.PI) / 4)}
                cy={15 * Math.sin((i * Math.PI) / 4)}
                r="2"
                fill="white"
                animate={{
                  scale: animationPhase === 2 ? [1, 1.5, 1] : 1,
                  opacity: animationPhase === 2 ? [0.7, 1, 0.7] : 0.7
                }}
                transition={{ duration: 1, delay: i * 0.1, repeat: animationPhase === 2 ? Infinity : 0 }}
              />
            ))}
          </motion.g>
        </g>

        {/* Patient Avatar (Left) */}
        <g transform="translate(60, 80)">
          {/* Patient Circle */}
          <motion.circle
            cx="0"
            cy="0"
            r="20"
            fill="url(#patientGradient)"
            animate={{
              scale: animationPhase === 1 ? 1.1 : 1,
              opacity: animationPhase === 1 ? 1 : 0.8
            }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Patient Icon */}
          <g fill="white">
            {/* Head */}
            <circle cx="0" cy="-5" r="6" />
            {/* Body */}
            <ellipse cx="0" cy="8" rx="8" ry="10" />
          </g>
          
          {/* Speech Bubble */}
          <motion.g
            transform="translate(25, -15)"
            animate={{
              opacity: animationPhase === 1 ? 1 : 0,
              scale: animationPhase === 1 ? 1 : 0.8
            }}
            transition={{ duration: 0.5 }}
          >
            <ellipse cx="0" cy="0" rx="18" ry="12" fill="white" stroke="#E5E7EB" strokeWidth="1" />
            {/* Speech bubble tail */}
            <path d="M -15 8 L -20 15 L -10 12 Z" fill="white" />
            {/* Text dots */}
            <circle cx="-8" cy="0" r="1.5" fill="#6B7280" />
            <circle cx="0" cy="0" r="1.5" fill="#6B7280" />
            <circle cx="8" cy="0" r="1.5" fill="#6B7280" />
          </motion.g>
        </g>

        {/* Therapist Avatar (Right) */}
        <g transform="translate(260, 80)">
          {/* Therapist Circle */}
          <motion.circle
            cx="0"
            cy="0"
            r="20"
            fill="url(#dataGradient)"
            animate={{
              scale: animationPhase === 3 ? 1.1 : 1,
              opacity: animationPhase === 3 ? 1 : 0.8
            }}
            transition={{ duration: 0.6 }}
          />
          
          {/* Therapist Icon */}
          <g fill="white">
            {/* Head */}
            <circle cx="0" cy="-5" r="6" />
            {/* Body */}
            <ellipse cx="0" cy="8" rx="8" ry="10" />
            {/* Stethoscope/Medical symbol */}
            <circle cx="-10" cy="0" r="3" fill="none" stroke="white" strokeWidth="1.5" />
            <path d="M -7 0 L 7 0" stroke="white" strokeWidth="1.5" />
          </g>
        </g>

        {/* Data Flow Lines */}
        {/* Patient to AI */}
        <motion.path
          d="M 80 80 Q 120 60 135 140"
          stroke="#059669"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: animationPhase === 1 ? 1 : 0,
            opacity: animationPhase === 1 ? 1 : 0.3
          }}
          transition={{ duration: 0.8 }}
        />
        
        {/* AI to Therapist */}
        <motion.path
          d="M 185 140 Q 220 60 240 80"
          stroke="#DC2626"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: animationPhase === 3 ? 1 : 0,
            opacity: animationPhase === 3 ? 1 : 0.3
          }}
          transition={{ duration: 0.8 }}
        />

        {/* 24/7 Monitoring Indicators */}
        <g transform="translate(160, 200)">
          {/* Clock Icon */}
          <motion.g
            animate={{
              opacity: animationPhase === 2 ? 1 : 0.5,
              scale: animationPhase === 2 ? 1.1 : 1
            }}
          >
            <circle cx="0" cy="0" r="15" fill="white" stroke="#4F46E5" strokeWidth="2" />
            <circle cx="0" cy="0" r="2" fill="#4F46E5" />
            {/* Clock hands */}
            <motion.line
              x1="0" y1="0" x2="0" y2="-8"
              stroke="#4F46E5"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ rotate: animationPhase === 2 ? 360 : 0 }}
              transition={{ duration: 2, ease: "linear" }}
            />
            <line x1="0" y1="0" x2="5" y2="0" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>
          
          {/* 24/7 Text */}
          <text x="0" y="30" textAnchor="middle" className="text-xs font-medium fill-indigo-600">
            24/7 Support
          </text>
        </g>

        {/* Progress Indicators */}
        <g transform="translate(60, 180)">
          {/* CBT Exercises Badge */}
          <motion.rect
            x="-25" y="-8" width="50" height="16" rx="8"
            fill="#EBF8FF"
            stroke="#3B82F6"
            strokeWidth="1"
            animate={{
              opacity: animationPhase === 1 ? 1 : 0.6,
              scale: animationPhase === 1 ? 1.05 : 1
            }}
          />
          <text x="0" y="1" textAnchor="middle" className="text-xs font-medium fill-blue-600">
            CBT
          </text>
        </g>

        <g transform="translate(260, 180)">
          {/* Clinical Insights Badge */}
          <motion.rect
            x="-30" y="-8" width="60" height="16" rx="8"
            fill="#FEF3C7"
            stroke="#F59E0B"
            strokeWidth="1"
            animate={{
              opacity: animationPhase === 3 ? 1 : 0.6,
              scale: animationPhase === 3 ? 1.05 : 1
            }}
          />
          <text x="0" y="1" textAnchor="middle" className="text-xs font-medium fill-amber-600">
            Insights
          </text>
        </g>

        {/* Data Points Visualization */}
        {animationPhase === 2 && (
          <g>
            {[...Array(6)].map((_, i) => (
              <motion.circle
                key={i}
                cx={80 + i * 30}
                cy={240}
                r="3"
                fill="#4F46E5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  opacity: [0, 1, 0.8]
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              />
            ))}
          </g>
        )}

        {/* Status Labels */}
        <g transform="translate(160, 30)">
          <text x="0" y="0" textAnchor="middle" className="text-sm font-semibold fill-gray-700">
            AI Co-Therapy Assistant
          </text>
          <motion.text 
            x="0" y="16" textAnchor="middle" 
            className="text-xs fill-gray-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {animationPhase === 1 && "Analyzing Patient Input..."}
            {animationPhase === 2 && "Processing Clinical Data..."}
            {animationPhase === 3 && "Generating Insights..."}
            {animationPhase === 0 && "Ready for Support"}
          </motion.text>
        </g>
      </svg>
    </div>
  );
}