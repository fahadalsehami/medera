"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Step {
  id: string;
  title: string;
  subtitle?: string;
}

interface HandDrawnStepProgressProps {
  steps: Step[];
  currentStep: number;
  currentSubItem?: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export function HandDrawnStepProgress({ 
  steps, 
  currentStep,
  currentSubItem,
  onStepClick,
  className = "" 
}: HandDrawnStepProgressProps) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  const scrollToSection = (stepIndex: number) => {
    onStepClick?.(stepIndex);
    
    const sectionId = `section-${steps[stepIndex].id.toLowerCase()}`;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const progressPercent = (currentStep / (steps.length - 1)) * 100;
  
  return (
    <div className={`w-full ${className}`}>
      {/* Step circles row - matching Adaline.ai screenshot exactly */}
      <div className="flex items-center justify-between relative mb-6">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isHovered = hoveredStep === index;
          
          return (
            <motion.button
              key={step.id}
              onClick={() => scrollToSection(index)}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              className="relative z-10 flex flex-col items-center gap-2 group focus:outline-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.15 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive ? (
                <motion.div
                  className="bg-white border-2 border-black rounded-2xl px-4 py-2 shadow-sm flex items-center gap-3"
                  initial={{ width: 48 }}
                  animate={{ width: "auto" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="w-7 h-7 rounded-full border-2 border-black bg-transparent flex items-center justify-center">
                    <span className="text-xs font-semibold text-black">{step.id}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-black whitespace-nowrap">
                      {step.title}
                    </span>
                    {currentSubItem && (
                      <span className="text-xs text-gray-600">
                        {currentSubItem}/3
                      </span>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className={`w-12 h-12 rounded-full border-2 bg-transparent flex items-center justify-center transition-all duration-300 ${
                    isCompleted ? "border-green-400" : "border-gray-300"
                  } ${isHovered ? "border-black" : ""}`}
                  whileHover={{ borderColor: "#000000" }}
                >
                  {isCompleted ? (
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4, ease: "backOut" }}
                    >
                      <path
                        d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                        fill="#22C55E"
                        strokeWidth="1"
                      />
                    </motion.svg>
                  ) : (
                    <span className="text-xs font-semibold text-gray-400">{step.id}</span>
                  )}
                </motion.div>
              )}
              
              {!isActive && (
                <motion.span
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isCompleted ? "text-gray-600" : "text-gray-400"
                  } ${isHovered ? "text-gray-800" : ""}`}
                >
                  {step.title}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
      
      {/* Linear progress bar */}
      <div className="relative">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-black rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ 
              duration: 0.8, 
              ease: "easeInOut",
              delay: 0.3 
            }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>
            Step <span className="font-semibold">{currentStep + 1}</span> of <span className="font-semibold">{steps.length}</span>
          </span>
          <span className="font-semibold">{Math.round(progressPercent)}%</span>
        </div>
      </div>
    </div>
  );
}

export function HandDrawnStepProgressDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubItem, setCurrentSubItem] = useState(1);
  
  const steps: Step[] = [
    { id: "01", title: "Iterate", subtitle: "AI Solutions" },
    { id: "02", title: "Evaluate", subtitle: "Clinical Tools" },
    { id: "03", title: "Deploy", subtitle: "Integration" },
    { id: "04", title: "Monitor", subtitle: "Analytics" },
  ];
  
  return (
    <div className="w-full max-w-5xl mx-auto p-8 bg-white rounded-2xl border border-gray-100">
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-light text-gray-900 tracking-tight">
            Adaline.ai Style Step Progress
          </h2>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Exact match to screenshot with transparent circles, light borders, and proper progress bar
          </p>
        </div>
        
        <div className="px-8">
          <HandDrawnStepProgress
            steps={steps}
            currentStep={currentStep}
            currentSubItem={currentSubItem}
            onStepClick={setCurrentStep}
          />
        </div>
        
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm border border-gray-300 rounded-xl bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}