"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useState, useEffect, useRef } from "react";

interface Step {
  id: string;
  title: string;
  subtitle?: string;
}

interface CubeStepProgressProps {
  steps: Step[];
  currentStep: number;
  currentSubItem?: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

// Cube SVG Component with dice rolling animation
function AnimatedCube({ 
  stepNumber, 
  subProgress, 
  isActive, 
  isCompleted,
  onClick 
}: { 
  stepNumber: string;
  subProgress?: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick?: () => void;
}) {
  const [isRolling, setIsRolling] = useState(false);
  const [displayNumber, setDisplayNumber] = useState(stepNumber);
  
  // Default dice rolling animation on mount
  useEffect(() => {
    setIsRolling(true);
    const rollTimeout = setTimeout(() => {
      setIsRolling(false);
      setDisplayNumber(stepNumber);
    }, 1000);
    
    return () => clearTimeout(rollTimeout);
  }, [stepNumber]);
  
  // Trigger animation when subProgress changes
  useEffect(() => {
    if (isActive && subProgress) {
      setIsRolling(true);
      const rollTimeout = setTimeout(() => {
        setIsRolling(false);
        setDisplayNumber(subProgress);
      }, 800);
      
      return () => clearTimeout(rollTimeout);
    }
  }, [subProgress, isActive]);
  
  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <motion.svg
        width="32"
        height="38"
        viewBox="0 0 267 321"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={isRolling ? {
          rotateX: [0, 360, 720, 1080],
          rotateY: [0, 180, 360, 540],
          rotateZ: [0, 90, 180, 270]
        } : {
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0
        }}
        transition={isRolling ? {
          duration: 1,
          ease: "easeOut",
          times: [0, 0.3, 0.6, 1]
        } : {
          duration: 0.3
        }}
        style={{
          transformStyle: "preserve-3d"
        }}
      >
        <motion.path
          d="M125.778 164.304V306.866L7.5 235.845V93.2812L125.778 164.304ZM259.057 235.844L140.778 306.866V164.304L259.057 93.2812V235.844ZM251.986 80.0293L133.277 151.312L14.5693 80.0293L133.278 8.74707L251.986 80.0293Z"
          fill={isActive ? "#000000" : "#000000"}
          stroke="#FEFFFA"
          strokeWidth="15"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        
        {/* Number/Text overlay */}
        <motion.text
          x="133"
          y="170"
          textAnchor="middle"
          dominantBaseline="middle"
          className={`text-lg font-bold ${
            isActive ? "fill-white" : isCompleted ? "fill-white" : "fill-gray-600"
          }`}
          animate={isRolling ? {
            opacity: [1, 0, 0, 1],
            scale: [1, 0.5, 0.5, 1]
          } : {
            opacity: 1,
            scale: 1
          }}
          transition={isRolling ? {
            duration: 1,
            times: [0, 0.3, 0.7, 1]
          } : {
            duration: 0.3
          }}
        >
          {displayNumber}
        </motion.text>
      </motion.svg>
    </motion.div>
  );
}

export function CubeStepProgress({ 
  steps, 
  currentStep,
  currentSubItem,
  onStepClick,
  className = "" 
}: CubeStepProgressProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  const handleStepClick = (stepIndex: number) => {
    onStepClick?.(stepIndex);
  };
  
  return (
    <div ref={scrollContainerRef} className={`flex items-center gap-6 ${className}`}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const isHovered = hoveredStep === index;
        
        // Calculate sub-progress display
        let subProgressDisplay = "";
        if (isActive && currentSubItem) {
          subProgressDisplay = `${step.id}.${currentSubItem}`;
        }
        
        if (isActive) {
          // Active step layout: wrapped in transparent button with proper internal layout
          return (
            <motion.button
              key={step.id}
              className="border border-gray-200 bg-white/50 backdrop-blur-sm rounded-2xl px-4 py-3 cursor-pointer hover:border-gray-400 transition-colors duration-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleStepClick(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-3">
                {/* Minimalistic cube on the left */}
                <AnimatedCube
                  stepNumber={step.id}
                  subProgress={subProgressDisplay}
                  isActive={isActive}
                  isCompleted={isCompleted}
                  onClick={() => {}}
                />
                
                {/* Content block: title + numbers on top, progress bar below */}
                <motion.div
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  {/* Title and numbers on same line */}
                  <div className="flex items-center gap-4">
                    <span className="text-base font-medium text-black">
                      {step.title}
                    </span>
                    <span className="text-sm text-gray-500">
                      {currentSubItem || 1} / {steps[currentStep]?.id === "01" ? "4" : steps[currentStep]?.id === "04" ? "3" : "2"}
                    </span>
                  </div>
                  
                  {/* Progress bar below */}
                  <motion.div
                    className="flex items-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    {Array.from({ length: steps[currentStep]?.id === "01" ? 4 : steps[currentStep]?.id === "04" ? 3 : 2 }, (_, i) => i + 1).map((dotIndex) => (
                      <motion.div
                        key={dotIndex}
                        className={`h-0.5 rounded-full transition-colors duration-300 ${
                          dotIndex <= (currentSubItem || 1) 
                            ? 'bg-black w-6' 
                            : 'bg-gray-200 w-4'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3, delay: 0.5 + dotIndex * 0.1 }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.button>
          );
        } else {
          // Inactive steps: horizontal layout with higher opacity
          return (
            <motion.div
              key={step.id}
              className="cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              onClick={() => handleStepClick(index)}
              whileHover={{ opacity: 1 }}
            >
              <motion.div
                className={`transition-all duration-200 ${
                  isHovered 
                    ? 'border border-gray-200 bg-white/80 backdrop-blur-sm rounded-3xl px-4 py-2 shadow-sm flex items-center gap-3' 
                    : 'flex items-center gap-2'
                }`}
                layout
              >
                <AnimatedCube
                  stepNumber={step.id}
                  subProgress=""
                  isActive={false}
                  isCompleted={isCompleted}
                  onClick={() => {}}
                />
                
                <motion.span
                  className={`font-medium transition-all duration-200 whitespace-nowrap ${
                    isHovered 
                      ? 'text-sm text-gray-700' 
                      : 'text-sm text-gray-500'
                  }`}
                  layout
                >
                  {step.title}
                </motion.span>
              </motion.div>
            </motion.div>
          );
        }
      })}
    </div>
  );
}

// Demo component for testing
export function CubeStepProgressDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSubItem, setCurrentSubItem] = useState(1);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  const steps: Step[] = [
    { id: "01", title: "Iterate", subtitle: "AI Solutions" },
    { id: "02", title: "Evaluate", subtitle: "Clinical Tools" },
    { id: "03", title: "Deploy", subtitle: "Integration" },
    { id: "04", title: "Monitor", subtitle: "Analytics" },
  ];
  
  // Auto-advance demo with sub-items
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSubItem(prev => {
        if (prev >= 3) {
          setCurrentStep(prevStep => (prevStep + 1) % steps.length);
          return 1;
        }
        return prev + 1;
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay, steps.length]);
  
  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-white rounded-2xl border border-gray-100">
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-light text-gray-900 tracking-tight">
            Cube Dice Step Progress
          </h2>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            3D cube shapes with dice rolling animations showing step progression (1, 1.1, 1.2, 1.3)
          </p>
        </div>
        
        <div className="px-8">
          <CubeStepProgress
            steps={steps}
            currentStep={currentStep}
            currentSubItem={currentSubItem}
            onStepClick={setCurrentStep}
          />
        </div>
        
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              setCurrentSubItem(prev => Math.max(1, prev - 1));
            }}
            className="px-4 py-2 text-sm border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-colors"
          >
            Previous Sub
          </button>
          
          <button
            onClick={() => {
              setCurrentSubItem(prev => Math.min(3, prev + 1));
            }}
            className="px-4 py-2 text-sm bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            Next Sub
          </button>
          
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-colors"
          >
            {isAutoPlay ? "Pause" : "Play"} Auto
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600 bg-neutral-50 rounded-xl p-6">
          <div className="space-y-1">
            <div className="font-semibold text-gray-900">3D Cube Shape</div>
            <div>Isometric cube design with proper perspective</div>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-gray-900">Dice Rolling</div>
            <div>3D rotation animation when transitioning states</div>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-gray-900">Sub Progress</div>
            <div>Shows 1.1, 1.2, 1.3 progression within each step</div>
          </div>
        </div>
      </div>
    </div>
  );
}