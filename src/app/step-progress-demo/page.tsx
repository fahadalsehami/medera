import { ModernStepProgressDemo } from "@/components/ui/modern-step-progress";
import { SVGStepProgressDemo } from "@/components/ui/svg-step-progress";
import { HandDrawnStepProgressDemo } from "@/components/ui/hand-drawn-step-progress";
import { CubeStepProgressDemo } from "@/components/ui/cube-step-progress";

export default function StepProgressDemoPage() {
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold text-gray-900">
            Modern Step Progress Indicator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A modern, horizontal step progress indicator with pill/squircle shapes, 
            smooth animations, and responsive design built with React, Tailwind CSS, and Framer Motion.
          </p>
        </div>

        {/* Cube Dice Step Progress Demo */}
        <CubeStepProgressDemo />
        
        {/* Hand-Drawn Adaline.ai Style Demo */}
        <HandDrawnStepProgressDemo />
        
        {/* SVG Demo */}
        <SVGStepProgressDemo />
        
        {/* Original Demo */}
        <ModernStepProgressDemo />

        {/* Features List */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">✨ Modern Design</h3>
              <p className="text-sm text-gray-600">
                Pill/squircle outline buttons with soft rounded edges (border-radius ~16px)
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">🎯 Three States</h3>
              <p className="text-sm text-gray-600">
                Active (filled), Completed (checkmark), Upcoming (outlined)
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">⚡ Smooth Animations</h3>
              <p className="text-sm text-gray-600">
                0.3s ease-in-out transitions with Framer Motion
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">📱 Responsive</h3>
              <p className="text-sm text-gray-600">
                Looks great on mobile and desktop with adaptive layout
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">♿ Accessible</h3>
              <p className="text-sm text-gray-600">
                Good contrast ratios and semantic HTML structure
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">🎨 Customizable</h3>
              <p className="text-sm text-gray-600">
                Easy to customize colors, sizes, and animations
              </p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Usage Example</h3>
          <pre className="text-sm overflow-x-auto">
            <code>{`import { ModernStepProgress } from "@/components/ui/modern-step-progress";

const steps = [
  { id: "01", title: "Iterate", subtitle: "AI Solutions" },
  { id: "02", title: "Evaluate", subtitle: "Clinical Tools" },
  { id: "03", title: "Deploy", subtitle: "Integration" },
  { id: "04", title: "Monitor", subtitle: "Analytics" }
];

<ModernStepProgress
  steps={steps}
  currentStep={0}
  currentSubProgress={{ current: 2, total: 3 }}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}