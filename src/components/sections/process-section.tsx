"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { CubeStepProgress } from "@/components/ui/cube-step-progress";

// Intelligent Care Orchestration: Agentic AI for Seamless, Personalized Mental Health
const processSteps = [
  {
    id: "01",
    title: "CoPilot",
    subtitle: "Your Virtual Clinical Partner",
    heading: "Intelligent Care Orchestration: Agentic AI for Seamless, Personalized Mental Health",
    description: "Transform your practice with intelligent AI solutions that enhance patient care, streamline workflows, and improve outcomes across all aspects of behavioral health services.",
    subItems: [
      {
        number: "1",
        title: "AI Co-Therapy Assistant",
        description: "Enhance your therapeutic practice with an intelligent AI assistant that provides 24/7 patient support between sessions. This virtual companion delivers evidence-based interventions, maintains therapeutic continuity, and helps patients practice coping strategies. Perfect for extending your reach and ensuring consistent care when you're not available."
      },
      {
        number: "2",
        title: "Virtual Therapy Avatar",
        description: "Offer patients access to an intelligent virtual therapist that adapts communication style to individual needs, cultural backgrounds, and age groups. Provides accessible mental health support with accommodations for various physical and cognitive abilities."
      },
      {
        number: "3",
        title: "Smart Telehealth Enhancement",
        description: "Upgrade your telehealth platform with AI that analyzes patient behavior, emotions, and speech patterns during video sessions. Receive instant alerts for concerning changes, automated session summaries, and clinical insights that help you make more informed treatment decisions during remote consultations."
      },
      {
        number: "4",
        title: "Instant Referral & Authorization System",
        description: "Eliminate administrative delays with AI that automatically processes referrals and pre-authorizations based on patient assessments. The system matches patients with appropriate specialists and treatment programs while handling insurance requirements, reducing wait times from weeks to hours."
      }
    ]
  },
  {
    id: "02",
    title: "Integrate",
    subtitle: "Bridge Medical & Behavioral Health",
    heading: "Seamless Care Coordination & Documentation",
    description: "Streamline your clinical workflows with AI-powered documentation and seamless integration between primary care and mental health services for comprehensive patient care.",
    subItems: [
      {
        number: "1",
        title: "Intelligent Clinical Documentation",
        description: "Transform your documentation workflow with AI that automatically extracts key clinical information from patient interactions. Generate comprehensive notes, identify symptom patterns, and receive treatment recommendations that align with clinical guidelines, saving hours of administrative work daily."
      },
      {
        number: "2",
        title: "Integrated Primary Care-Mental Health Platform",
        description: "Connect your primary care and mental health services with shared AI-driven patient insights. Coordinate care plans automatically, facilitate seamless communication between providers, and ensure comprehensive treatment that addresses both physical and mental health needs."
      }
    ]
  },
  {
    id: "03",
    title: "Connect",
    subtitle: "Universal System Integration",
    heading: "Universal EHR Integration & Enterprise Security",
    description: "Seamlessly integrate AI capabilities into your existing systems while maintaining the highest standards of security and regulatory compliance for patient data protection.",
    subItems: [
      {
        number: "1",
        title: "Universal Electronic Health Record Integration",
        description: "Integrate AI capabilities directly into your existing EHR system, whether you use Epic, Cerner, or other platforms. Enjoy real-time data synchronization, automated clinical entries, and enhanced workflow efficiency without disrupting your current processes."
      },
      {
        number: "2",
        title: "Healthcare-Grade Security & Compliance",
        description: "Ensure complete regulatory compliance with comprehensive security infrastructure that meets all healthcare standards including HIPAA, SOC 2, and international privacy requirements. Built-in audit trails, encryption, and access controls protect patient information while maintaining operational efficiency."
      }
    ]
  },
  {
    id: "04",
    title: "Empower",
    subtitle: "Advanced Analytics & Insights",
    heading: "Crisis Detection & Evidence-Based Treatment Analytics",
    description: "Protect patients with advanced AI monitoring for crisis detection while leveraging comprehensive analytics to create personalized treatment plans and improve clinical outcomes.",
    subItems: [
      {
        number: "1",
        title: "Crisis Detection & Emergency Response",
        description: "Protect your patients with AI that continuously monitors for signs of suicide risk, violence potential, and clinical deterioration. Receive instant alerts when intervention is needed and access automated emergency protocols that connect patients with immediate help."
      },
      {
        number: "2",
        title: "Personalized Treatment Planning",
        description: "Create individualized treatment plans with AI that analyzes patient data across multiple dimensions. The system recommends optimal therapeutic approaches, predicts treatment outcomes, and adapts care plans based on patient progress and response patterns."
      },
      {
        number: "3",
        title: "Comprehensive Clinical Analytics",
        description: "Access powerful analytics that combine data from conversations, observations, and clinical assessments to provide comprehensive patient insights. Make data-driven treatment decisions with confidence using integrated analysis from multiple sources."
      }
    ]
  }
];

// Convert process steps to modern step progress format
const convertToStepFormat = () => {
  return processSteps.map((step, index) => ({
    id: index + 1,
    label: step.title
  }));
};

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [currentSubItem, setCurrentSubItem] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start center", "end start"]
  });

  // Control when the process section should appear (starts hidden, appears when hero completes)
  const sectionOpacity = useTransform(
    scrollYProgress, 
    [0, 0.05, 0.95, 1], 
    [0, 1, 1, 0]
  );

  // Calculate total sub-items across all steps
  const getTotalSubItems = () => {
    return processSteps.reduce((total, step) => total + step.subItems.length, 0);
  };

  // Enhanced scroll-triggered progression through steps and sub-items
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const totalSubItems = getTotalSubItems();
      const totalProgress = latest * totalSubItems;
      
      let cumulativeSubItems = 0;
      let newActiveStep = 0;
      let newCurrentSubItem = 0;

      for (let i = 0; i < processSteps.length; i++) {
        const stepSubItemCount = processSteps[i].subItems.length;
        
        if (totalProgress <= cumulativeSubItems + stepSubItemCount) {
          newActiveStep = i;
          newCurrentSubItem = Math.floor(totalProgress - cumulativeSubItems) + 1;
          newCurrentSubItem = Math.max(1, Math.min(newCurrentSubItem, stepSubItemCount));
          break;
        }
        
        cumulativeSubItems += stepSubItemCount;
      }
      
      if (newActiveStep !== activeStep) {
        setActiveStep(newActiveStep);
      }
      
      if (newCurrentSubItem !== currentSubItem) {
        setCurrentSubItem(newCurrentSubItem);
      }
    });

    return unsubscribe;
  }, [scrollYProgress, activeStep, currentSubItem]);

  return (
    <>
      {/* Sticky/Pinned Process Section - FIXED in place, appears after hero completes */}
      <motion.section 
        ref={ref}
        className="fixed top-0 left-0 h-screen w-screen bg-white overflow-hidden"
        style={{ 
          zIndex: 5, 
          marginLeft: 0, 
          marginRight: 0, 
          opacity: sectionOpacity,
          pointerEvents: sectionOpacity.get() > 0 ? 'auto' : 'none'
        }}
        initial={{ opacity: 0 }}
      >
        {/* Adaline.ai Style Layout */}
        <div className="h-full w-full flex flex-col">
          
          {/* Cube Step Progress Indicator with Action Buttons */}
          <div className="flex justify-between items-center pt-16 pb-8 px-12">
            <CubeStepProgress
              steps={processSteps.map(step => ({
                id: step.id,
                title: step.title,
                subtitle: step.subtitle
              }))}
              currentStep={activeStep}
              currentSubItem={currentSubItem}
              onStepClick={(stepIndex) => {
                setActiveStep(stepIndex);
                setCurrentSubItem(1);
              }}
            />
            
            {/* Action Buttons aligned to the right */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <button className="text-sm text-gray-500 hover:text-black transition-colors underline">
                Learn more
              </button>
              <button className="bg-black text-white px-4 py-2 rounded text-xs font-medium hover:bg-gray-800 transition-colors tracking-wide">
                EDITOR
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded text-xs font-medium hover:bg-gray-50 transition-colors tracking-wide">
                DATASETS
              </button>
            </motion.div>
          </div>

          {/* Main Content Area - Exact Adaline.ai Two Column Grid */}
          <div className="flex-1 px-12">
            <div className="grid grid-cols-2 gap-24 h-full">
              
              {/* Left Column - Minimalistic Adaline.ai Style */}
              <div className="flex flex-col justify-start h-full">
                
                {/* Top Section: Main Heading and Description */}
                <motion.div
                  key={`content-${activeStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="mb-56"
                >
                  <h1 className="text-lg font-medium text-black leading-tight mb-4 max-w-lg">
                    {processSteps[activeStep].heading}
                  </h1>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal max-w-md">
                    {processSteps[activeStep].description}
                  </p>
                </motion.div>

                {/* Middle Section: Numbered List with Inline Content */}
                <motion.div
                  key={`subitems-${activeStep}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="space-y-8"
                >
                  {processSteps[activeStep].subItems.map((subItem, index) => {
                    const itemNumber = index + 1;
                    const isActiveSubItem = currentSubItem === itemNumber;
                    
                    return (
                      <motion.div
                        key={subItem.number}
                        initial={{ opacity: 0.3 }}
                        animate={{ 
                          opacity: isActiveSubItem ? 1 : 0.3
                        }}
                        transition={{ 
                          duration: 0.3
                        }}
                        className="transition-all duration-300"
                      >
                        <div className="space-y-3">
                          {/* Number and Title */}
                          <div className="flex items-start gap-4">
                            <span className="text-sm font-normal text-gray-700 flex-shrink-0 pt-0.5">
                              {subItem.number}
                            </span>
                            <h3 className="text-sm font-medium text-gray-900 leading-relaxed">
                              {subItem.title}
                            </h3>
                          </div>
                          
                          {/* Content Description - Only show for active sub-item */}
                          {isActiveSubItem && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="ml-8"
                            >
                              <p className="text-xs text-gray-600 leading-relaxed max-w-lg">
                                {subItem.description}
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>

              </div>

              {/* Right Column - Exact Adaline.ai Demo Area */}
              <div className="flex items-start justify-end pt-4">
                <motion.div
                  key={`demo-${activeStep}-${currentSubItem}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full max-w-md h-80"
                >
                  {activeStep === 0 && <HealthcareIterateDemo currentSubItem={currentSubItem} />}
                  {activeStep === 1 && <HealthcareEvaluateDemo currentSubItem={currentSubItem} />}
                  {activeStep === 2 && <HealthcareDeployDemo currentSubItem={currentSubItem} />}
                  {activeStep === 3 && <HealthcareMonitorDemo currentSubItem={currentSubItem} />}
                </motion.div>
              </div>
              
            </div>
          </div>
        </div>
      </motion.section>

      {/* Scroll Container - Drives the animation */}
      <div 
        ref={scrollContainerRef}
        className="h-[600vh] w-screen relative z-0"
        style={{ marginLeft: 0, marginRight: 0, marginTop: 0 }}
      >
        {/* Invisible scroll trigger - starts after hero */}
      </div>
    </>
  );
}

// Exact Adaline.ai File Explorer Demo - Healthcare Version
function HealthcareIterateDemo({ currentSubItem }: { currentSubItem: number }) {
  return (
    <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header - Exact Adaline.ai Style */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <div className="text-sm font-medium text-gray-600">Shared</div>
        </div>

        {/* File Explorer Content - Exact Adaline.ai Layout */}
        <div className="flex-1 p-4">
          <div className="space-y-3">
            
            {/* Customer Service Folder */}
            <motion.div 
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: currentSubItem === 1 ? 1 : 0.6 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6.5 2L7.5 3H13.5V13H2.5V2H6.5Z" stroke="#F59E0B" strokeWidth="1" fill="#FEF3C7" />
                </svg>
              </div>
              <span className="text-sm text-gray-800 font-medium">Customer Service</span>
            </motion.div>

            {/* AI Representative File */}
            <motion.div 
              className={`flex items-center gap-3 pl-8 p-2 rounded-lg transition-all duration-300 ${
                currentSubItem === 1 ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
              }`}
              initial={{ opacity: 0.5 }}
              animate={{ 
                opacity: currentSubItem >= 1 ? 1 : 0.5,
                scale: currentSubItem === 1 ? 1.02 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2h10v12H3z" stroke="#10B981" strokeWidth="1" fill="#D1FAE5" />
                  <path d="M5 5h6M5 7h4M5 9h5" stroke="#10B981" strokeWidth="0.8" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">AI representative</span>
            </motion.div>

            {/* Test Cases File */}
            <motion.div 
              className={`flex items-center gap-3 pl-8 p-2 rounded-lg transition-all duration-300 ${
                currentSubItem === 2 ? 'bg-green-50 border border-green-200' : 'hover:bg-gray-50'
              }`}
              initial={{ opacity: 0.5 }}
              animate={{ 
                opacity: currentSubItem >= 2 ? 1 : 0.5,
                scale: currentSubItem === 2 ? 1.02 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2h10v12H3z" stroke="#10B981" strokeWidth="1" fill="#D1FAE5" />
                  <path d="M5 5h6M5 7h4M5 9h5" stroke="#10B981" strokeWidth="0.8" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Test Cases</span>
            </motion.div>

            {/* May Production Logs File */}
            <motion.div 
              className={`flex items-center gap-3 pl-8 p-2 rounded-lg transition-all duration-300 ${
                currentSubItem === 3 ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
              }`}
              initial={{ opacity: 0.5 }}
              animate={{ 
                opacity: currentSubItem >= 3 ? 1 : 0.5,
                scale: currentSubItem === 3 ? 1.02 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2h10v12H3z" stroke="#3B82F6" strokeWidth="1" fill="#DBEAFE" />
                  <circle cx="8" cy="8" r="2" fill="#3B82F6" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">May Production Logs</span>
            </motion.div>

            {/* June Production Logs File */}
            <motion.div 
              className="flex items-center gap-3 pl-8 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0.4 }}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2h10v12H3z" stroke="#6B7280" strokeWidth="1" fill="#F3F4F6" />
                  <circle cx="8" cy="8" r="2" fill="#6B7280" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">June Production Logs</span>
            </motion.div>

            {/* Home File */}
            <motion.div 
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0.4 }}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2l6 5v7H2V7l6-5z" stroke="#6B7280" strokeWidth="1" fill="none" />
                  <path d="M6 13v-3h4v3" stroke="#6B7280" strokeWidth="1" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Home</span>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Healthcare Clinical Tools Demo - Simple File Explorer Style
function HealthcareEvaluateDemo({ currentSubItem }: { currentSubItem: number }) {
  return (
    <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <div className="text-sm font-medium text-gray-600">Clinical Tools</div>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-3">
            <motion.div 
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                currentSubItem === 1 ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
              }`}
              animate={{ opacity: currentSubItem >= 1 ? 1 : 0.4 }}
            >
              <div className="w-4 h-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2h10v12H3z" stroke="#3B82F6" strokeWidth="1" fill="#DBEAFE" />
                  <path d="M5 5h6M5 7h4" stroke="#3B82F6" strokeWidth="0.8" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Clinical Documentation</span>
            </motion.div>
            <motion.div 
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                currentSubItem === 2 ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
              }`}
              animate={{ opacity: currentSubItem >= 2 ? 1 : 0.4 }}
            >
              <div className="w-4 h-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2h10v12H3z" stroke="#10B981" strokeWidth="1" fill="#D1FAE5" />
                  <circle cx="8" cy="8" r="2" fill="#10B981" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Care Coordination</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Healthcare Integration & Security Demo - Simple File Explorer Style
function HealthcareDeployDemo({ currentSubItem }: { currentSubItem: number }) {
  return (
    <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <div className="text-sm font-medium text-gray-600">Integration</div>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-3">
            <motion.div 
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                currentSubItem === 1 ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
              }`}
              animate={{ opacity: currentSubItem >= 1 ? 1 : 0.4 }}
            >
              <div className="w-4 h-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 5h12v8H2z" stroke="#8B5CF6" strokeWidth="1" fill="#F3E8FF" />
                  <path d="M4 7h8M4 9h6" stroke="#8B5CF6" strokeWidth="0.8" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">EHR Integration</span>
            </motion.div>
            <motion.div 
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                currentSubItem === 2 ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
              }`}
              animate={{ opacity: currentSubItem >= 2 ? 1 : 0.4 }}
            >
              <div className="w-4 h-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2l6 5v7H2V7l6-5z" stroke="#F59E0B" strokeWidth="1" fill="#FEF3C7" />
                  <path d="M6 10h4" stroke="#F59E0B" strokeWidth="0.8" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Security Compliance</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Healthcare Analytics & Monitoring Demo - Simple File Explorer Style
function HealthcareMonitorDemo({ currentSubItem }: { currentSubItem: number }) {
  return (
    <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="h-full flex flex-col">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
          <div className="text-sm font-medium text-gray-600">Analytics</div>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-3">
            <motion.div 
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                currentSubItem === 1 ? 'bg-red-50 border border-red-200' : 'hover:bg-gray-50'
              }`}
              animate={{ opacity: currentSubItem >= 1 ? 1 : 0.4 }}
            >
              <div className="w-4 h-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="#EF4444" strokeWidth="1" fill="#FEE2E2" />
                  <path d="M8 5v3l2 2" stroke="#EF4444" strokeWidth="1" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Crisis Detection</span>
            </motion.div>
            <motion.div 
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                currentSubItem === 2 ? 'bg-red-50 border border-red-200' : 'hover:bg-gray-50'
              }`}
              animate={{ opacity: currentSubItem >= 2 ? 1 : 0.4 }}
            >
              <div className="w-4 h-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2h10v12H3z" stroke="#6366F1" strokeWidth="1" fill="#E0E7FF" />
                  <path d="M5 5h6M5 7h4M5 9h5" stroke="#6366F1" strokeWidth="0.8" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Treatment Planning</span>
            </motion.div>
            <motion.div 
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                currentSubItem === 3 ? 'bg-red-50 border border-red-200' : 'hover:bg-gray-50'
              }`}
              animate={{ opacity: currentSubItem >= 3 ? 1 : 0.4 }}
            >
              <div className="w-4 h-4">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4h3v8H2zM6 6h3v6H6zM10 3h3v10h-3z" stroke="#14B8A6" strokeWidth="1" fill="#D1FAE5" />
                </svg>
              </div>
              <span className="text-sm text-gray-700">Clinical Analytics</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}