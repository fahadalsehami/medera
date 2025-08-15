"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Step {
  id: number;
  label: string;
}

interface ModernStepProgressProps {
  steps: Step[];
  currentStep: number;
  subProgress?: { current: number; total: number };
  className?: string;
  onStepChange?: (step: number) => void;
}

export function ModernStepProgress({ 
  steps, 
  currentStep, 
  subProgress,
  className = "",
  onStepChange
}: ModernStepProgressProps) {
  const total = steps.length;
  const percent = (currentStep / (total - 1)) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Steps Row - Exact match to screenshot */}
      <div className="relative flex items-center justify-between gap-4">
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isDone = i < currentStep;
          const base = "group inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm transition-colors select-none cursor-pointer";
          const active = "bg-black text-white shadow-sm";
          const done = "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50";
          const idle = "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50";

          return (
            <motion.button
              key={step.id}
              onClick={() => onStepChange?.(i)}
              className={[base, isActive ? active : isDone ? done : idle].join(" ")}
              aria-current={isActive ? "step" : undefined}
              aria-label={`Go to step ${i + 1}: ${step.label}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <span
                className={[
                  "grid h-7 w-7 place-items-center rounded-full border text-[11px] font-semibold",
                  isActive
                    ? "border-white/50 bg-white/20 text-white"
                    : isDone
                    ? "border-gray-400 bg-white text-gray-600"
                    : "border-gray-300 bg-white text-gray-400",
                ].join(" ")}
              >
                {isDone ? (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="h-4 w-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <path
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 6 9 17l-5-5"
                    />
                  </motion.svg>
                ) : (
                  <span className="tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </span>
              <span className="font-medium">{step.label}</span>
              {isActive && subProgress && (
                <span className="text-xs opacity-75 ml-1">
                  {subProgress.current}/{subProgress.total}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Linear Progress Bar */}
      <div className="mt-5">
        <div
          className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percent)}
          aria-label="Overall step progress"
        >
          <motion.div
            className="h-full rounded-full bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>
            Step <span className="tabular-nums font-semibold">{currentStep + 1}</span> of
            <span className="tabular-nums font-semibold"> {total}</span>
          </span>
          <span className="tabular-nums">{Math.round(percent)}%</span>
        </div>
      </div>
    </div>
  );
}

// Example Demo Component - Exact match to your code
export function ModernStepProgressDemo() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const STEPS: Step[] = [
    { id: 1, label: "Iterate" },
    { id: 2, label: "Evaluate" },
    { id: 3, label: "Deploy" },
    { id: 4, label: "Monitor" },
  ];

  const total = STEPS.length;

  // Demo auto-advance (toggle by holding Option/Alt + click on the title)
  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => setCurrent((i) => (i + 1) % total), 2000);
    return () => clearInterval(t);
  }, [autoplay, total]);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1
        className="mb-6 text-2xl font-semibold tracking-tight"
        onClick={(e) => {
          // quick toggle for demo
          if ((e as any).altKey) setAutoplay((v) => !v);
        }}
        title="Alt/Option + Click to toggle autoplay"
      >
        Step Progress Indicator
      </h1>

      <ModernStepProgress
        steps={STEPS}
        currentStep={current}
        onStepChange={setCurrent}
      />

      {/* Controls (for demo) */}
      <div className="mt-6 flex gap-3">
        <button
          className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-50"
          onClick={() => setCurrent((i) => Math.max(0, i - 1))}
        >
          Back
        </button>
        <button
          className="rounded-xl bg-black px-4 py-2 text-sm text-white shadow-sm hover:bg-gray-800"
          onClick={() => setCurrent((i) => Math.min(total - 1, i + 1))}
        >
          Next
        </button>
        <button
          className="ml-auto rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs text-gray-600 hover:bg-gray-50"
          onClick={() => setAutoplay((v) => !v)}
        >
          {autoplay ? "Pause autoplay" : "Play autoplay"}
        </button>
      </div>

      {/* Notes */}
      <p className="mt-4 text-xs text-gray-500">
        Tip: Replace colors with your design tokens (e.g., <code>bg-primary</code>)
        and lift the state to control the current step from parent flows.
      </p>
    </div>
  );
}

// Alternative Minimal Version (Exactly Like Adaline.ai Screenshot)
export function MinimalStepProgress({ 
  steps, 
  currentStep, 
  subProgress 
}: ModernStepProgressProps) {
  return (
    <div className="flex items-center gap-6">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isDone = index < currentStep;

        return (
          <motion.div
            key={step.id}
            className={`flex items-center gap-3 transition-all duration-300 ${
              isActive ? 'opacity-100' : 'opacity-40'
            }`}
            whileHover={{ opacity: isActive ? 1 : 0.7 }}
          >
            {/* Step Pill/Circle - Exact Screenshot Match */}
            <div className={`relative transition-all duration-300 ${
              isActive 
                ? 'bg-white border-2 border-black rounded-2xl px-4 py-2 shadow-sm flex items-center gap-3' 
                : 'w-12 h-12 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center'
            }`}>
              
              {isActive ? (
                <>
                  <div className="w-7 h-7 rounded-full border-2 border-black flex items-center justify-center">
                    <span className="text-xs font-semibold text-black">
                      {String(step.id).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-black whitespace-nowrap">
                      {step.label}
                    </span>
                    {subProgress && (
                      <span className="text-xs text-gray-600">
                        {subProgress.current}/{subProgress.total}
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <span className="text-xs font-semibold text-gray-400">
                  {String(step.id).padStart(2, "0")}
                </span>
              )}
            </div>

            {/* Step Title for Non-Active */}
            {!isActive && (
              <span className="text-sm font-medium text-gray-400 hidden sm:block">
                {step.label}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}