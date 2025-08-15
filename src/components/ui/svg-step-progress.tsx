"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface Step {
  id: number;
  label: string;
}

interface SVGStepProgressProps {
  steps: Step[];
  currentStep: number;
  onStepChange?: (step: number) => void;
  className?: string;
}

export function SVGStepProgress({ 
  steps, 
  currentStep, 
  onStepChange,
  className = "" 
}: SVGStepProgressProps) {
  const stepWidth = 100 / (steps.length - 1);

  return (
    <div className={`w-full ${className}`}>
      <div className="relative flex items-center justify-between">
        
        {/* Background Progress Line */}
        <svg 
          className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 z-0"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0 0.5 Q 25 0.3 50 0.5 Q 75 0.7 100 0.5"
            stroke="#E5E7EB"
            strokeWidth="0.1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>

        {/* Animated Progress Line */}
        <svg 
          className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 z-10"
          viewBox="0 0 100 1"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0 0.5 Q 25 0.3 50 0.5 Q 75 0.7 100 0.5"
            stroke="url(#progressGradient)"
            strokeWidth="0.15"
            fill="none"
            strokeDasharray="1 0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: currentStep / (steps.length - 1) }}
            transition={{ 
              duration: 0.8, 
              ease: "easeInOut",
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9CA3AF" />
              <stop offset="50%" stopColor="#6B7280" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
          </defs>
        </svg>

        {/* Steps */}
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isUpcoming = index > currentStep;
          
          return (
            <motion.button
              key={step.id}
              onClick={() => onStepChange?.(index)}
              className="relative z-20 flex flex-col items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-lg p-2"
              aria-current={isActive ? "step" : undefined}
              aria-label={`Step ${index + 1}: ${step.label}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step Circle SVG */}
              <div className="relative">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  className="drop-shadow-sm"
                >
                  {/* Outer glow for active step */}
                  {isActive && (
                    <motion.circle
                      cx="28"
                      cy="28"
                      r="26"
                      fill="none"
                      stroke="url(#activeGlow)"
                      strokeWidth="2"
                      opacity="0.3"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  )}

                  {/* Main Circle */}
                  <motion.circle
                    cx="28"
                    cy="28"
                    r="22"
                    fill={isActive ? "url(#activeGradient)" : isCompleted ? "url(#completedGradient)" : "#FAFAF7"}
                    stroke={
                      isActive ? "url(#activeStroke)" : 
                      isCompleted ? "url(#completedStroke)" : 
                      "#D1D5DB"
                    }
                    strokeWidth={isActive ? "3" : isCompleted ? "2.5" : "2"}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: "easeOut",
                      delay: index * 0.1 
                    }}
                    style={{
                      filter: isActive ? "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" : "none"
                    }}
                  />

                  {/* Step Number or Checkmark */}
                  {isCompleted ? (
                    <motion.g
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        ease: "backOut",
                        delay: 0.2 
                      }}
                    >
                      <path
                        d="M20 28 L25 33 L36 22"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </motion.g>
                  ) : (
                    <motion.text
                      x="28"
                      y="32"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`text-sm font-semibold ${
                        isActive ? "fill-white" : 
                        isUpcoming ? "fill-gray-400" : "fill-gray-600"
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </motion.text>
                  )}

                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#84CC16" />
                      <stop offset="50%" stopColor="#65A30D" />
                      <stop offset="100%" stopColor="#4D7C0F" />
                    </linearGradient>
                    
                    <linearGradient id="activeStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#65A30D" />
                      <stop offset="100%" stopColor="#4D7C0F" />
                    </linearGradient>
                    
                    <linearGradient id="activeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#84CC16" />
                      <stop offset="100%" stopColor="#65A30D" />
                    </linearGradient>

                    <linearGradient id="completedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F0FDF4" />
                      <stop offset="100%" stopColor="#DCFCE7" />
                    </linearGradient>
                    
                    <linearGradient id="completedStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#84CC16" />
                      <stop offset="100%" stopColor="#65A30D" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Step Label */}
              <motion.span
                className={`text-sm transition-colors duration-300 text-center max-w-20 ${
                  isActive ? "text-gray-900 font-semibold" :
                  isCompleted ? "text-gray-700 font-medium" :
                  "text-gray-400 font-medium"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              >
                {step.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// Demo Component with Auto-Advancement
export function SVGStepProgressDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const healthcareSteps: Step[] = [
    { id: 1, label: "Iterate" },
    { id: 2, label: "Evaluate" },
    { id: 3, label: "Deploy" },
    { id: 4, label: "Monitor" },
  ];

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % healthcareSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay, healthcareSteps.length]);

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-neutral-50 rounded-2xl">
      <div className="space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-light text-gray-900 tracking-tight">
            SVG Step Progress Indicator
          </h2>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Modern, minimalistic design with organic SVG shapes and smooth animations
          </p>
        </div>

        {/* Step Progress */}
        <div className="px-8">
          <SVGStepProgress
            steps={healthcareSteps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>

        {/* Status */}
        <div className="text-center space-y-2">
          <div className="text-sm text-gray-600">
            Current: <span className="font-semibold text-gray-900">
              {healthcareSteps[currentStep].label}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Step {currentStep + 1} of {healthcareSteps.length}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm border border-gray-300 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <button
            onClick={() => setCurrentStep(Math.min(healthcareSteps.length - 1, currentStep + 1))}
            disabled={currentStep === healthcareSteps.length - 1}
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
          
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-colors"
          >
            {isAutoPlay ? "Pause" : "Play"} Auto
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600 bg-white rounded-xl p-6">
          <div className="space-y-1">
            <div className="font-semibold text-gray-900">Organic SVG Shapes</div>
            <div>Hand-crafted SVG circles with soft, natural stroke edges</div>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-gray-900">Smooth Gradients</div>
            <div>Sage green to cream gradient fills with subtle shadows</div>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-gray-900">Animated Progress</div>
            <div>SVG path animation with stroke-dasharray effects</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimalist Version for Integration
export function MinimalSVGStepProgress({ 
  steps, 
  currentStep, 
  onStepChange 
}: SVGStepProgressProps) {
  return (
    <div className="flex items-center justify-start gap-8">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        
        return (
          <motion.button
            key={step.id}
            onClick={() => onStepChange?.(index)}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-lg p-2"
            aria-current={isActive ? "step" : undefined}
            aria-label={`Step ${index + 1}: ${step.label}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Compact SVG Circle */}
            <svg width="40" height="40" viewBox="0 0 40 40">
              <motion.circle
                cx="20"
                cy="20"
                r="16"
                fill={isActive ? "url(#miniActiveGradient)" : isCompleted ? "url(#miniCompletedGradient)" : "#FAFAF7"}
                stroke={isActive ? "#4D7C0F" : isCompleted ? "#65A30D" : "#D1D5DB"}
                strokeWidth={isActive ? "2.5" : "2"}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              />
              
              {isCompleted ? (
                <motion.path
                  d="M14 20 L18 24 L26 16"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              ) : (
                <text
                  x="20"
                  y="24"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`text-xs font-semibold ${
                    isActive ? "fill-white" : "fill-gray-400"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </text>
              )}

              <defs>
                <linearGradient id="miniActiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#84CC16" />
                  <stop offset="100%" stopColor="#4D7C0F" />
                </linearGradient>
                <linearGradient id="miniCompletedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F0FDF4" />
                  <stop offset="100%" stopColor="#DCFCE7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Step Label */}
            <span className={`text-sm transition-colors duration-300 ${
              isActive ? "text-gray-900 font-semibold" :
              isCompleted ? "text-gray-700" :
              "text-gray-400"
            }`}>
              {step.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}