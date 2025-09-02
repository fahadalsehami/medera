"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CubeStepProgress } from "@/components/ui/cube-step-progress";

// Next-Generation Clinical AI Agent
const processSteps = [
  {
    id: "01",
    title: "Care Agent",
    shortTitle: "Agent",
    subtitle: "Specialized virtual care agents across the patient care continuum",
    heading: "Intelligent Clinical Care Coordination",
    description: "Deploy specialized virtual care agents across the patient care continuum. Provide comprehensive mental health and primary care support from initial intake through ongoing management.",
    subItems: [
      {
        number: "1",
        title: "Virtual Care Agent",
        description: "Comprehensive virtual clinician providing integrated mental health and primary care services. Conducts thorough clinical assessments, monitors patient progress, and delivers evidence-based interventions. Maintains continuity between medical and behavioral health care through coordinated treatment planning and real-time clinical decision support."
      },
      {
        number: "2",
        title: "Intake Agent",
        description: "Streamlines patient onboarding with comprehensive clinical assessment capabilities. Conducts systematic intake interviews, gathers medical histories, and performs initial mental health screenings. Documents presenting concerns, establishes baseline measurements, and identifies immediate care needs to facilitate seamless provider handoff."
      },
      {
        number: "3",
        title: "Follow-up Agent",
        description: "Ensures consistent patient engagement through structured follow-up protocols. Monitors treatment adherence, tracks symptom progression, and conducts periodic assessments between appointments. Identifies clinical changes requiring immediate attention and maintains therapeutic continuity through regular patient contact."
      },
      {
        number: "4",
        title: "Referral Agent",
        description: "Facilitates seamless transitions between care levels and specialties. Coordinates psychiatric consultations, therapy referrals, and specialist appointments based on clinical indicators. Manages referral documentation, tracks appointment scheduling, and ensures comprehensive care coordination between providers."
      }
    ]
  },
  {
    id: "02",
    title: "Smart Bundling",
    shortTitle: "Bundling",
    subtitle: "Cross-Condition Grouping + Billing",
    heading: "Integrated Diagnostic Documentation",
    description: "Identify co-occurring mental health conditions alongside medical diagnoses. Ensure comprehensive coding for diabetes with depression, hypertension with anxiety disorders",
    subItems: [
      {
        number: "1",
        title: "Comprehensive Diagnostic Capture",
        description: "Systematically identifies behavioral health conditions that commonly co-occur with medical diagnoses. Documents depression screening within diabetic care, anxiety assessment during cardiovascular visits. Ensures accurate diagnostic coding and appropriate reimbursement through comprehensive clinical documentation."
      },
      {
        number: "2",
        title: "Clinical Complexity Documentation",
        description: "Organizes patient conditions by clinical severity and care requirements. Documents relationships between chronic pain and mood disorders, substance use patterns with medical comorbidities. Creates accurate problem lists that reflect patient complexity for appropriate care planning and resource allocation"
      }
    ]
  },
  {
    id: "03",
    title: "Auto Actions",
    shortTitle: "Actions",
    subtitle: "One-Click Behavioral Health Orders",
    heading: "Intelligent Care Coordination",
    description: "Automatically initiate appropriate referrals, assessments, and safety protocols when behavioral health concerns are identified during clinical encounters.",
    subItems: [
      {
        number: "1",
        title: "Clinical Decision Support",
        description: "Generates evidence-based treatment recommendations including psychiatric consultations, medication evaluations, and therapeutic interventions when clinical indicators warrant attention. Initiates standardized assessments (PHQ-9, GAD-7) with relevant clinical context pre-populated for provider review."
      },
      {
        number: "2",
        title: "Patient Safety Protocols",
        description: "Activates comprehensive safety assessment workflows for patients at elevated risk. Implements safety planning procedures, emergency contact protocols, and structured follow-up scheduling based on clinical risk stratification. Ensures continuity of care through systematic monitoring"
      }
    ]
  },
  {
    id: "04",
    title: "Clear Evidence",
    shortTitle: "Evidence",
    subtitle: "Explainable Behavioral Detection",
    heading: "Evidence-Based Clinical Insights",
    description: "Provide clear clinical rationale for behavioral health recommendations. Deliver transparent, evidence-linked insights that support clinical decision-making.",
    subItems: [
      {
        number: "1",
        title: "Clinical Evidence Documentation",
        description: "Every behavioral health assessment links to specific clinical observations, communication patterns, and presenting symptoms. Providers access detailed clinical evidence with timestamped documentation showing the basis for each recommendation and alert"
      },
      {
        number: "2",
        title: "Clinical Communication",
        description: "Presents findings in standard clinical terminology familiar to healthcare providers. Documents observations such as 'Patient demonstrated psychomotor retardation, limited affect range, and expressed hopelessness themes' using established clinical language rather than algorithmic outputs"
      }
    ]
  }
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [currentSubItem, setCurrentSubItem] = useState(0);
  const [scrollProgressValue, setScrollProgressValue] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize scroll tracking for the section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Control visibility based on page scroll - only show after hero completes
  const { scrollYProgress: pageScrollProgress } = useScroll();
  const sectionOpacity = useTransform(
    pageScrollProgress,
    [0.08, 0.12], // Show after ~10% of page scroll (after hero's 800vh)
    [0, 1]
  );

  // Calculate total sub-items across all steps
  const getTotalSubItems = () => {
    return processSteps.reduce((total, step) => total + step.subItems.length, 0);
  };

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Pixel-perfect scroll-triggered progression with complete visual requirement
  useEffect(() => {
    if (!isMounted) return () => {};
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const totalSubItems = getTotalSubItems(); // 10 total sub-items across all steps (4+2+2+2)
      const globalProgress = latest * totalSubItems; // 0-10 range across entire section
      
      let cumulativeSubItems = 0;
      let newActiveStep = 0;
      let newCurrentSubItem = 0;
      let visualAnimationProgress = 0;

      // Find which step we're in
      for (let i = 0; i < processSteps.length; i++) {
        const stepSubItemCount = processSteps[i].subItems.length;
        
        if (globalProgress <= cumulativeSubItems + stepSubItemCount) {
          newActiveStep = i;
          const localStepProgress = globalProgress - cumulativeSubItems; // 0-stepSubItemCount range
          
          // SPECIAL CASE: Step 1, Care Agent with 4 sub-items
          if (newActiveStep === 0) {
            // Step 1 has 4 sub-items now (1.1, 1.2, 1.3, 1.4)
            newCurrentSubItem = Math.floor(localStepProgress) + 1;
            newCurrentSubItem = Math.max(1, Math.min(newCurrentSubItem, stepSubItemCount));
            
            // Special animation progress for sub-item 1.1
            if (newCurrentSubItem === 1) {
              visualAnimationProgress = localStepProgress; // 0.0 to 1.0 for sub-item 1.1 animation
            } else {
              visualAnimationProgress = 1.0; // Animation fully complete for other sub-items
            }
          } else if (newActiveStep === 1) {
            // SPECIAL CASE: Step 2 (Smart Bundling) - needs full animation
            if (localStepProgress < 1.0) {
              newCurrentSubItem = 1;
              visualAnimationProgress = localStepProgress; // 0.0 to 1.0 for animations
            } else {
              newCurrentSubItem = 2;
              visualAnimationProgress = 1.0; // Animation fully complete
            }
          } else {
            // Normal behavior for other steps (3, 4)
            newCurrentSubItem = Math.floor(localStepProgress) + 1;
            newCurrentSubItem = Math.max(1, Math.min(newCurrentSubItem, stepSubItemCount));
            visualAnimationProgress = 0; // No special animation for other steps
          }
          break;
        }
        
        cumulativeSubItems += stepSubItemCount;
      }
      
      // Pass the precise visual progress to the component
      if ((newActiveStep === 0 || newActiveStep === 1) && newCurrentSubItem === 1) {
        setScrollProgressValue(visualAnimationProgress); // Exact 0-1 progress for animations
      } else {
        setScrollProgressValue(latest); // Regular scroll progress for others
      }
      
      // Update state only when actually changed
      if (newActiveStep !== activeStep) {
        setActiveStep(newActiveStep);
      }
      
      if (newCurrentSubItem !== currentSubItem) {
        setCurrentSubItem(newCurrentSubItem);
      }
    });

    return unsubscribe;
  }, [scrollYProgress, activeStep, currentSubItem, isMounted]);

  return (
    <>
      {/* Invisible scroll container for tracking scroll progress */}
      <div 
        ref={ref}
        className="relative"
        style={{ height: '500vh' }} // Scroll space for all 4 steps
      />
      
      {/* Fixed Process Section - Always visible and stuck in viewport */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-screen overflow-hidden"
        style={{ 
          zIndex: 20,
          pointerEvents: 'auto',
          opacity: sectionOpacity
        }}
      >
        {/* Main content container with gradient background */}
        <div className="h-full w-full flex flex-col relative" style={{ 
          background: 'linear-gradient(135deg, #f5f9fb 0%, #f0f5f7 50%, #e8f0f4 100%)' 
        }}>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, #70a2bc 1px, transparent 1px),
                             radial-gradient(circle at 80% 20%, #a8998a 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
          
          {/* Cube Step Progress Indicator with Action Buttons */}
          <div className="relative flex justify-between items-center pt-16 pb-8 px-12 backdrop-blur-sm" style={{ 
            background: 'linear-gradient(90deg, rgba(240,245,247,0.95) 0%, rgba(245,249,251,0.95) 100%)',
            borderBottom: '1px solid rgba(112,162,188,0.1)'
          }}>
            <CubeStepProgress
              steps={processSteps.map(step => ({
                id: step.id,
                title: step.title,
                shortTitle: step.shortTitle,
                subtitle: step.subtitle,
                subItems: step.subItems
              }))}
              currentStep={activeStep}
              currentSubItem={currentSubItem}
              onStepClick={(stepIndex) => {
                // Calculate scroll position for the clicked step
                const totalSubItems = getTotalSubItems();
                let targetScroll = 0;
                
                // Calculate cumulative sub-items up to the target step
                for (let i = 0; i < stepIndex; i++) {
                  targetScroll += processSteps[i].subItems.length;
                }
                
                // Scroll to the calculated position
                const scrollPercentage = targetScroll / totalSubItems;
                const element = ref.current;
                
                if (element) {
                  const targetY = scrollPercentage * element.scrollHeight;
                  window.scrollTo({
                    top: targetY + element.offsetTop,
                    behavior: 'smooth'
                  });
                }
                
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
              <button className="text-sm text-[#2f2f2f] hover:text-[#70a2bc] transition-all duration-200 underline decoration-[#70a2bc]/30 hover:decoration-[#70a2bc] underline-offset-4">
                Learn more
              </button>
              <button className="bg-gradient-to-r from-[#70a2bc] to-[#5a8ca6] text-white px-5 py-2.5 text-xs font-medium hover:from-[#5a8ca6] hover:to-[#4a7c96] transition-all duration-200 tracking-wide rounded-md shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                EDITOR
              </button>
              <button className="border border-[#70a2bc] text-[#70a2bc] px-5 py-2.5 text-xs font-medium hover:bg-[#70a2bc] hover:text-white transition-all duration-200 tracking-wide rounded-md hover:shadow-md transform hover:-translate-y-0.5">
                DATASETS
              </button>
            </motion.div>
          </div>

          {/* Main Content Area - Adjusted Grid with Wider Right Column */}
          <div className="flex-1 px-12">
            <div className="grid grid-cols-[35%_65%] gap-16 h-full">
              
              {/* Left Column - Compact Content */}
              <div className="flex flex-col justify-start h-full pr-4">
                
                {/* Top Section: Main Heading and Description */}
                <motion.div
                  key={`content-${activeStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="mb-56"
                >
                  <h1 className="text-lg font-medium text-[#2f2f2f] leading-tight mb-4 max-w-lg">
                    {processSteps[activeStep].heading}
                  </h1>
                  <p className="text-sm text-[#6c757d] leading-relaxed font-normal max-w-md">
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
                    const isLastItem = index === processSteps[activeStep].subItems.length - 1;
                    
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
                        className="relative transition-all duration-300"
                      >
                        <div className="space-y-3">
                          {/* Number and Title with connecting line */}
                          <div className="flex items-start gap-4">
                            <div className="relative flex-shrink-0">
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                                isActiveSubItem 
                                  ? 'bg-gradient-to-br from-[#70a2bc] to-[#5a8ca6] text-white shadow-lg scale-110' 
                                  : 'bg-[#f0f5f7] text-[#495057] border border-[#e0e5e7]'
                              }`}>
                                {subItem.number}
                              </span>
                              {/* Vertical connecting line */}
                              {!isLastItem && (
                                <div 
                                  className="absolute left-[15px] top-9 w-[2px] transition-all duration-300"
                                  style={{ 
                                    height: isActiveSubItem ? 'calc(100% + 2rem)' : '2.5rem',
                                    background: isActiveSubItem 
                                      ? 'linear-gradient(180deg, #70a2bc 0%, transparent 100%)' 
                                      : '#dee2e6'
                                  }}
                                />
                              )}
                            </div>
                            <h3 className={`text-base font-medium leading-relaxed transition-all duration-300 ${
                              isActiveSubItem ? 'text-[#2f2f2f]' : 'text-[#6c757d]'
                            }`}>
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
                              <p className="text-sm text-[#6c757d] leading-relaxed max-w-lg pl-2 border-l-2 border-[#70a2bc]/20">
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

              {/* Right Column - Expanded Visual Area */}
              <div className="relative flex items-center justify-center h-full overflow-hidden rounded-2xl" style={{ 
                background: 'linear-gradient(135deg, #f8fafb 0%, #f0f5f7 100%)',
                boxShadow: 'inset 0 2px 10px rgba(112,162,188,0.05)'
              }}>
                {/* Animated background orbs */}
                <div className="absolute top-20 right-20 w-64 h-64 bg-[#70a2bc]/5 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#a8998a]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                {/* Care Fusion Visualization - Step 1 */}
                {activeStep === 0 && (
                  <motion.div
                    className="w-full h-[550px] max-w-[95%]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {/* Minimalist Grid Animation for Step 1 - Care Agent */}
                    {currentSubItem >= 1 && currentSubItem <= 4 && (
                      <motion.div 
                        className="relative w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Dynamic 4x4 Dashed Grid System with Animated Cells */}
                        {(() => {
                          // Calculate grid line positions based on active cell
                          const getGridLines = (subItem: number, scrollProg: number = 0) => {
                            // Create a 5x5 grid for better coverage
                            const basePositions = [0, 20, 40, 60, 80, 100];
                            let verticalPos = [...basePositions];
                            let horizontalPos = [...basePositions];
                            
                            // Adjust grid lines based on active sub-item
                            if (subItem === 1) {
                              // Cell 1.1 with animation states based on scroll progress
                              if (scrollProg < 0.3) {
                                // State 1: Initial zoom out (0-30%)
                                const expansion = scrollProg / 0.3;
                                verticalPos = [0, 20 + (50 * expansion), 40 + (40 * expansion), 60 + (25 * expansion), 80 + (10 * expansion), 100];
                                horizontalPos = [0, 20 + (50 * expansion), 40 + (40 * expansion), 60 + (25 * expansion), 80 + (10 * expansion), 100];
                              } else if (scrollProg < 0.6) {
                                // State 2: Fit to cell (30-60%)
                                verticalPos = [0, 70, 80, 85, 90, 100];
                                horizontalPos = [0, 70, 80, 85, 90, 100];
                              } else if (scrollProg < 0.8) {
                                // State 3: Zoom in to smaller size (60-80%)
                                const zoomProgress = (scrollProg - 0.6) / 0.2;
                                // Target size is 35% (smaller than current)
                                verticalPos = [0, 70 - (35 * zoomProgress), 80 - (20 * zoomProgress), 85 - (15 * zoomProgress), 90 - (10 * zoomProgress), 100];
                                horizontalPos = [0, 70 - (35 * zoomProgress), 80 - (20 * zoomProgress), 85 - (15 * zoomProgress), 90 - (10 * zoomProgress), 100];
                              } else {
                                // State 4: Keep small and expand cell 1.4 (80-100%)
                                // Cell 1.1 stays at 35% size
                                verticalPos = [0, 35, 60, 70, 80, 100];
                                horizontalPos = [0, 35, 60, 70, 80, 100];
                                
                                // Also expand cell 1.4 during this phase
                                if (scrollProg > 0.85) {
                                  const expandProgress = (scrollProg - 0.85) / 0.15;
                                  // Adjust for cell 1.4 expansion
                                  verticalPos[1] = 35 - (10 * expandProgress);
                                  verticalPos[2] = 60 - (10 * expandProgress);
                                  horizontalPos[3] = 70 + (15 * expandProgress);
                                  horizontalPos[4] = 80 + (10 * expandProgress);
                                }
                              }
                            } else if (subItem === 2) {
                              // Cell 1.2 (r1c2) expands - top-center
                              verticalPos = [0, 10, 15, 85, 90, 100];
                              horizontalPos = [0, 70, 80, 85, 90, 100];
                            } else if (subItem === 3) {
                              // Cell 1.3 (r1c3) expands - top-right
                              verticalPos = [0, 10, 15, 20, 30, 100];
                              horizontalPos = [0, 70, 80, 85, 90, 100];
                            } else if (subItem === 4) {
                              // Cell 1.4 (r2c1) expands - middle-left
                              verticalPos = [0, 70, 80, 85, 90, 100];
                              horizontalPos = [0, 10, 15, 85, 90, 100];
                            }
                            
                            return { verticalPos, horizontalPos };
                          };
                          
                          const { verticalPos, horizontalPos } = getGridLines(currentSubItem, currentSubItem === 1 ? scrollProgressValue : 0);
                          
                          return (
                            <>
                              {/* Animated Vertical Lines */}
                              {verticalPos.map((pos, index) => (
                                <motion.div 
                                  key={`v-line-${index}`}
                                  className="absolute top-0 h-full pointer-events-none"
                                  animate={{ left: `${pos}%` }}
                                  transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                  <svg 
                                    className="h-full opacity-30" 
                                    width="2" 
                                    viewBox="0 0 2 1000" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="none"
                                  >
                                    <path 
                                      d="M1 0 V1000" 
                                      stroke="#70a2bc" 
                                      strokeWidth="1" 
                                      strokeDasharray="6 6" 
                                      vectorEffect="non-scaling-stroke" 
                                    />
                                  </svg>
                                </motion.div>
                              ))}
                              
                              {/* Animated Horizontal Lines */}
                              {horizontalPos.map((pos, index) => (
                                <motion.div 
                                  key={`h-line-${index}`}
                                  className="absolute left-0 w-full pointer-events-none"
                                  animate={{ top: `${pos}%` }}
                                  transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                  <svg 
                                    className="w-full opacity-30" 
                                    height="2" 
                                    viewBox="0 0 1000 2" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg"
                                    preserveAspectRatio="none"
                                  >
                                    <path 
                                      d="M0 1 H1000" 
                                      stroke="#70a2bc" 
                                      strokeWidth="1" 
                                      strokeDasharray="6 6" 
                                      vectorEffect="non-scaling-stroke" 
                                    />
                                  </svg>
                                </motion.div>
                              ))}
                              
                              {/* Grid Cells with minimalist numbers only */}
                              <div className="absolute inset-0">
                                {/* Cell 1.1 - Virtual Care Agent (r1c1) */}
                                <motion.div
                                  className="absolute overflow-hidden"
                                  animate={{
                                    left: currentSubItem === 1 ? '0%' : '0%',
                                    top: currentSubItem === 1 ? '0%' : '0%',
                                    width: currentSubItem === 1 ? 
                                      (scrollProgressValue < 0.3 ? `${20 + (50 * (scrollProgressValue / 0.3))}%` :
                                       scrollProgressValue < 0.6 ? '70%' :
                                       scrollProgressValue < 0.8 ? `${70 - (35 * ((scrollProgressValue - 0.6) / 0.2))}%` :
                                       '35%') : '20%',
                                    height: currentSubItem === 1 ? 
                                      (scrollProgressValue < 0.3 ? `${20 + (50 * (scrollProgressValue / 0.3))}%` :
                                       scrollProgressValue < 0.6 ? '70%' :
                                       scrollProgressValue < 0.8 ? `${70 - (35 * ((scrollProgressValue - 0.6) / 0.2))}%` :
                                       '35%') : '20%',
                                    zIndex: currentSubItem === 1 ? 10 : 1
                                  }}
                                  transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                  <div className="w-full h-full flex items-center justify-center relative">
                                    {currentSubItem === 1 ? (
                                      <>
                                        {/* Video Session Image with zoom animation */}
                                        <motion.img
                                          src="/video-session.png"
                                          alt="Virtual Care Session"
                                          className="absolute object-contain"
                                          animate={{
                                            // Zoom animation states
                                            scale: scrollProgressValue < 0.3 
                                              ? 1.5 - (0.5 * (scrollProgressValue / 0.3))  // Zoom out from 1.5x to 1x
                                              : scrollProgressValue < 0.6 
                                              ? 1  // Stay at 1x
                                              : scrollProgressValue < 0.8
                                              ? 1 - (0.3 * ((scrollProgressValue - 0.6) / 0.2))  // Zoom in smaller to 0.7x
                                              : 0.7,  // Keep at 0.7x
                                            opacity: scrollProgressValue < 0.9 ? 1 : 1 - ((scrollProgressValue - 0.9) / 0.1),
                                            width: '90%',
                                            height: '90%'
                                          }}
                                          transition={{ duration: 0.3, ease: "easeInOut" }}
                                        />
                                        
                                        {/* Number overlay - shows after image fades */}
                                        <motion.span 
                                          className="text-[#70a2bc] font-light absolute"
                                          animate={{ 
                                            fontSize: '72px',
                                            opacity: scrollProgressValue > 0.9 ? (scrollProgressValue - 0.9) * 10 : 0
                                          }}
                                          transition={{ duration: 0.3 }}
                                        >
                                          1.1
                                        </motion.span>
                                      </>
                                    ) : (
                                      <motion.span 
                                        className="text-[#70a2bc] font-light"
                                        animate={{ 
                                          fontSize: '28px',
                                          opacity: 0.3
                                        }}
                                      >
                                        1.1
                                      </motion.span>
                                    )}
                                  </div>
                                </motion.div>
                                
                                {/* Cell 1.2 - Intake Agent (r1c2) */}
                                <motion.div
                                  className="absolute"
                                  animate={{
                                    left: currentSubItem === 2 ? '15%' : '40%',
                                    top: currentSubItem === 2 ? '0%' : '0%',
                                    width: currentSubItem === 2 ? '70%' : '20%',
                                    height: currentSubItem === 2 ? '70%' : '20%',
                                    zIndex: currentSubItem === 2 ? 10 : 1
                                  }}
                                  transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                  <div className="w-full h-full flex items-center justify-center">
                                    <motion.span 
                                      className="text-[#10B981] font-light"
                                      animate={{ 
                                        fontSize: currentSubItem === 2 ? '72px' : '28px',
                                        opacity: currentSubItem === 2 ? 1 : 0.3
                                      }}
                                    >
                                      1.2
                                    </motion.span>
                                  </div>
                                </motion.div>
                                
                                {/* Cell 1.3 - Follow-up Agent (r1c3) */}
                                <motion.div
                                  className="absolute"
                                  animate={{
                                    left: currentSubItem === 3 ? '30%' : '80%',
                                    top: currentSubItem === 3 ? '0%' : '0%',
                                    width: currentSubItem === 3 ? '70%' : '20%',
                                    height: currentSubItem === 3 ? '70%' : '20%',
                                    zIndex: currentSubItem === 3 ? 10 : 1
                                  }}
                                  transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                  <div className="w-full h-full flex items-center justify-center">
                                    <motion.span 
                                      className="text-[#8B5CF6] font-light"
                                      animate={{ 
                                        fontSize: currentSubItem === 3 ? '72px' : '28px',
                                        opacity: currentSubItem === 3 ? 1 : 0.3
                                      }}
                                    >
                                      1.3
                                    </motion.span>
                                  </div>
                                </motion.div>
                                
                                {/* Cell 1.4 - Referral Agent (r2c1) */}
                                <motion.div
                                  className="absolute overflow-hidden"
                                  animate={{
                                    left: currentSubItem === 4 ? '0%' : 
                                           (currentSubItem === 1 && scrollProgressValue > 0.85) ? '35%' : '0%',
                                    top: currentSubItem === 4 ? '15%' : 
                                          (currentSubItem === 1 && scrollProgressValue > 0.85) ? '35%' : '40%',
                                    width: currentSubItem === 4 ? '70%' : 
                                            (currentSubItem === 1 && scrollProgressValue > 0.85) ? 
                                            `${50 + (15 * ((scrollProgressValue - 0.85) / 0.15))}%` : '20%',
                                    height: currentSubItem === 4 ? '70%' : 
                                             (currentSubItem === 1 && scrollProgressValue > 0.85) ? 
                                             `${50 + (15 * ((scrollProgressValue - 0.85) / 0.15))}%` : '20%',
                                    zIndex: currentSubItem === 4 ? 10 : 
                                            (currentSubItem === 1 && scrollProgressValue > 0.85) ? 8 : 1
                                  }}
                                  transition={{ duration: 0.5, ease: "easeInOut" }}
                                >
                                  <div className="w-full h-full flex items-center justify-center relative">
                                    {(currentSubItem === 1 && scrollProgressValue > 0.85) ? (
                                      <div 
                                        className="perspective-distant relative w-full h-full flex items-center justify-center"
                                        style={{ 
                                          transform: 'translate(0vw, 10vh) scale(0.8)',
                                          perspective: '1000px'
                                        }}
                                      >
                                        <motion.div 
                                          className="relative transform-3d"
                                          animate={{
                                            rotateX: 5,
                                            rotateY: -30,
                                            scale: 0.8 + (0.2 * ((scrollProgressValue - 0.85) / 0.15))
                                          }}
                                          transition={{ duration: 0.5 }}
                                          style={{ transformStyle: 'preserve-3d' }}
                                        >
                                          {/* 3D Text Effect */}
                                          <div className="text-center space-y-2">
                                            <div className="inline-block transform-3d">
                                              <span 
                                                className="text-[#70a2bc] bg-[#70a2bc]/10 px-2 py-1 rounded inline-block"
                                                style={{ 
                                                  transform: 'translateZ(50px)',
                                                  fontSize: '14px'
                                                }}
                                              >
                                                Agent
                                              </span>
                                            </div>
                                            <div className="relative">
                                              <span 
                                                className="line-through text-gray-400 absolute"
                                                style={{ 
                                                  transform: 'translateZ(20px)',
                                                  fontSize: '12px',
                                                  opacity: 0.5
                                                }}
                                              >
                                                representative
                                              </span>
                                            </div>
                                            <div className="text-[#F59E0B] font-bold text-2xl mt-4">
                                              1.4
                                            </div>
                                          </div>
                                        </motion.div>
                                      </div>
                                    ) : (
                                      <motion.span 
                                        className="text-[#F59E0B] font-light"
                                        animate={{ 
                                          fontSize: currentSubItem === 4 ? '48px' : '24px',
                                          opacity: currentSubItem === 4 ? 1 : 0.4
                                        }}
                                      >
                                        1.4
                                      </motion.span>
                                    )}
                                  </div>
                                </motion.div>
                                
                                {/* Remaining cells (inactive) - just dots for 5x5 grid */}
                                {[
                                  // Row 1 (remaining after 1.1, 1.2, 1.3)
                                  { row: 1, col: 2, label: '·' },
                                  { row: 1, col: 4, label: '·' },
                                  // Row 2 (1.4 is at col 1)
                                  { row: 2, col: 2, label: '·' },
                                  { row: 2, col: 3, label: '·' },
                                  { row: 2, col: 4, label: '·' },
                                  { row: 2, col: 5, label: '·' },
                                  // Row 3
                                  { row: 3, col: 1, label: '·' },
                                  { row: 3, col: 2, label: '·' },
                                  { row: 3, col: 3, label: '·' },
                                  { row: 3, col: 4, label: '·' },
                                  { row: 3, col: 5, label: '·' },
                                  // Row 4
                                  { row: 4, col: 1, label: '·' },
                                  { row: 4, col: 2, label: '·' },
                                  { row: 4, col: 3, label: '·' },
                                  { row: 4, col: 4, label: '·' },
                                  { row: 4, col: 5, label: '·' },
                                  // Row 5
                                  { row: 5, col: 1, label: '·' },
                                  { row: 5, col: 2, label: '·' },
                                  { row: 5, col: 3, label: '·' },
                                  { row: 5, col: 4, label: '·' },
                                  { row: 5, col: 5, label: '·' }
                                ].map((cell) => (
                                  <motion.div
                                    key={`cell-${cell.row}-${cell.col}`}
                                    className="absolute"
                                    style={{
                                      left: `${(cell.col - 1) * 20}%`,
                                      top: `${(cell.row - 1) * 20}%`,
                                      width: '20%',
                                      height: '20%'
                                    }}
                                  >
                                    <div className="w-full h-full flex items-center justify-center">
                                      <span className="text-[#9aa0a6] text-3xl font-light opacity-15">
                                        {cell.label}
                                      </span>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </>
                          );
                        })()}
                      </motion.div>
                    )}

                    {/* Original SVG visualization - hidden when showing grid */}
                    {(currentSubItem < 1 || currentSubItem > 4) && (
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 800 550"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                    {/* Define gradients and shadows */}
                    <defs>
                      <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#fff8f0" />
                      </linearGradient>
                      <filter id="cardShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.08" />
                      </filter>
                      <filter id="glowEffect">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    
                    {/* Main Card Background - Enhanced with gradient and shadow */}
                    <motion.rect
                      x="100"
                      y="50"
                      width="600"
                      height="450"
                      fill="url(#cardGradient)"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      rx="12"
                      filter="url(#cardShadow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: activeStep === 0 && currentSubItem === 1 ? scrollProgressValue * 0.2 : 1,
                        opacity: activeStep === 0 && currentSubItem === 1 ? scrollProgressValue * 1 : 1
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    
                    {/* Top Navigation Buttons - Appear after card forms */}
                    <motion.g
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.2 ? (scrollProgressValue - 0.2) * 3.3 : 0) : 1,
                        y: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.2 ? 0 : 10) : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Clinical Note Button - Modern with gradient */}
                      <rect
                        x="130"
                        y="80"
                        width="140"
                        height="38"
                        fill="url(#activeTabGradient)"
                        stroke="#70a2bc"
                        strokeWidth="1"
                        rx="6"
                        filter="url(#glowEffect)"
                      />
                      <text
                        x="200"
                        y="102"
                        textAnchor="middle"
                        fill="#2f2f2f"
                        fontSize="14"
                        fontWeight="600"
                      >
                        Clinical Note
                      </text>
                      
                      {/* Active tab gradient */}
                      <defs>
                        <linearGradient id="activeTabGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="100%" stopColor="#f0f9ff" />
                        </linearGradient>
                      </defs>
                    </motion.g>
                    
                    <motion.g
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.25 ? (scrollProgressValue - 0.25) * 4 : 0) : 1,
                        y: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.25 ? 0 : 10) : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Summary Button - Minimalistic */}
                      <rect
                        x="280"
                        y="80"
                        width="120"
                        height="35"
                        fill="transparent"
                        stroke="#e5e7eb"
                        strokeWidth="0.5"
                      />
                      <text
                        x="340"
                        y="101"
                        textAnchor="middle"
                        fill="#9ca3af"
                        fontSize="13"
                        fontWeight="400"
                      >
                        Summary
                      </text>
                    </motion.g>
                    
                    {/* Content Sections - Animated progressively */}
                    
                    {/* Subjective Section */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.35 ? (scrollProgressValue - 0.35) * 3.3 : 0) : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <text
                        x="130"
                        y="160"
                        fill="#2f2f2f"
                        fontSize="18"
                        fontWeight="600"
                      >
                        Subjective
                      </text>
                      
                      {/* Content placeholder lines - Appear with stagger */}
                      <motion.rect 
                        x="130" y="180" height="3" rx="1.5" fill="#e5e7eb"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.4 ? Math.min((scrollProgressValue - 0.4) * 1000, 500) : 0) : 500
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.rect 
                        x="130" y="190" height="3" rx="1.5" fill="#e5e7eb"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.42 ? Math.min((scrollProgressValue - 0.42) * 900, 450) : 0) : 450
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.rect 
                        x="130" y="200" height="3" rx="1.5" fill="#e5e7eb"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.44 ? Math.min((scrollProgressValue - 0.44) * 960, 480) : 0) : 480
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.g>
                    
                    {/* Objective Section */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.55 ? (scrollProgressValue - 0.55) * 3.3 : 0) : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <text
                        x="130"
                        y="250"
                        fill="#2f2f2f"
                        fontSize="18"
                        fontWeight="600"
                      >
                        Objective
                      </text>
                      
                      {/* Content placeholder lines */}
                      <motion.rect 
                        x="130" y="270" height="3" rx="1.5" fill="#e5e7eb"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.6 ? Math.min((scrollProgressValue - 0.6) * 1040, 520) : 0) : 520
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.rect 
                        x="130" y="280" height="3" rx="1.5" fill="#e5e7eb"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.62 ? Math.min((scrollProgressValue - 0.62) * 920, 460) : 0) : 460
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.rect 
                        x="130" y="290" height="3" rx="1.5" fill="#e5e7eb"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.64 ? Math.min((scrollProgressValue - 0.64) * 980, 490) : 0) : 490
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.rect 
                        x="130" y="300" height="3" rx="1.5" fill="#e5e7eb"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.66 ? Math.min((scrollProgressValue - 0.66) * 880, 440) : 0) : 440
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.g>
                    
                    {/* Functional Assessment Section */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.75 ? (scrollProgressValue - 0.75) * 4 : 0) : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <text
                        x="130"
                        y="350"
                        fill="#2f2f2f"
                        fontSize="18"
                        fontWeight="600"
                      >
                        Functional Assessment
                      </text>
                      
                      {/* Content placeholder lines */}
                      <motion.rect 
                        x="130" y="370" height="3" rx="1.5" fill="#e5e7eb"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.8 ? Math.min((scrollProgressValue - 0.8) * 960, 480) : 0) : 480
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.rect 
                        x="130" y="380" height="3" rx="1.5" fill="#e5e7eb"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.82 ? Math.min((scrollProgressValue - 0.82) * 1020, 510) : 0) : 510
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.rect 
                        x="130" y="390" height="3" rx="1.5" fill="#e5e7eb"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.84 ? Math.min((scrollProgressValue - 0.84) * 900, 450) : 0) : 450
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.rect 
                        x="130" y="400" height="3" rx="1.5" fill="#e5e7eb"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.86 ? Math.min((scrollProgressValue - 0.86) * 940, 470) : 0) : 470
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.rect 
                        x="130" y="410" height="3" rx="1.5" fill="#e5e7eb"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.88 ? Math.min((scrollProgressValue - 0.88) * 840, 420) : 0) : 420
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.g>
                    
                    {/* Two Condition Cards - Both on Left Side */}
                    
                    {/* Primary Care Condition Card */}
                    <motion.g
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.9 ? (scrollProgressValue - 0.9) * 10 : 0) : 1,
                        y: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.9 ? 0 : 20) : 0
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {/* Card background - no rounded corners with shadow */}
                      <rect
                        x="50"
                        y="240"
                        width="280"
                        height="90"
                        fill="#f8f9fa"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                        filter="url(#smallShadow)"
                      />
                      
                      {/* Condition name - minimalistic */}
                      <text
                        x="70"
                        y="275"
                        fill="#6b7280"
                        fontSize="14"
                        fontWeight="500"
                      >
                        Diabetes
                      </text>
                      
                      {/* Content bar */}
                      <rect x="70" y="300" width="140" height="6" rx="3" fill="#e5e7eb" />
                      
                      {/* ICD code box - minimalistic with light border */}
                      <rect
                        x="240"
                        y="255"
                        width="70"
                        height="30"
                        fill="#ffffff"
                        stroke="#e5e7eb"
                        strokeWidth="0.5"
                      />
                      <text
                        x="275"
                        y="274"
                        fill="#6b7280"
                        fontSize="14"
                        fontWeight="500"
                        textAnchor="middle"
                      >
                        E11.65
                      </text>
                    </motion.g>
                    
                    {/* Mental Health Condition Card */}
                    <motion.g
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.95 ? (scrollProgressValue - 0.95) * 20 : 0) : 1,
                        y: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.95 ? 0 : 20) : 0
                      }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                    >
                      {/* Card background - no rounded corners with shadow */}
                      <rect
                        x="50"
                        y="345"
                        width="280"
                        height="90"
                        fill="#f8f9fa"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                        filter="url(#smallShadow)"
                      />
                      
                      {/* Condition name - minimalistic */}
                      <text
                        x="70"
                        y="380"
                        fill="#6b7280"
                        fontSize="14"
                        fontWeight="500"
                      >
                        Depression
                      </text>
                      
                      {/* Content bar */}
                      <rect x="70" y="390" width="180" height="6" rx="3" fill="#e5e7eb" />
                      
                      {/* ICD code box - minimalistic with light border */}
                      <rect
                        x="240"
                        y="360"
                        width="70"
                        height="30"
                        fill="#ffffff"
                        stroke="#e5e7eb"
                        strokeWidth="0.5"
                      />
                      <text
                        x="275"
                        y="379"
                        fill="#6b7280"
                        fontSize="14"
                        fontWeight="500"
                        textAnchor="middle"
                      >
                        F32.9
                      </text>
                    </motion.g>
                    
                    {/* Right Card - Linked Evidence */}
                    <motion.g
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ 
                        opacity: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.93 ? (scrollProgressValue - 0.93) * 14.3 : 0) : 1,
                        x: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.93 ? 0 : 20) : 0
                      }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                    >
                      {/* Main Evidence Card Container - no rounded corners */}
                      <rect
                        x="420"
                        y="180"
                        width="320"
                        height="300"
                        fill="#ffffff"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                      />
                      
                      {/* Header */}
                      <text
                        x="450"
                        y="210"
                        fill="#374151"
                        fontSize="16"
                        fontWeight="600"
                      >
                        EVIDENCE ATTRIBUTION
                      </text>
                      
                      {/* Divider line */}
                      <line
                        x1="420"
                        y1="230"
                        x2="740"
                        y2="230"
                        stroke="#e5e7eb"
                        strokeWidth="1"
                      />
                      
                      {/* Connection from right edge of 2nd card to chat bubble */}
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: activeStep === 0 && currentSubItem === 1 ? (scrollProgressValue > 0.96 ? 1 : 0) : 1
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        {/* Dashed line from right edge of Depression card to first evidence bubble */}
                        <line
                          x1="330"  
                          y1="390"  
                          x2="440"  
                          y2="310"  
                          stroke="#d1d5db"
                          strokeWidth="1.5"
                          strokeDasharray="5,5"
                        />
                        
                        {/* Start circle at right edge of 2nd card */}
                        <circle
                          cx="330"
                          cy="390"
                          r="4"
                          fill="#ffffff"
                          stroke="#d1d5db"
                          strokeWidth="1.5"
                        />
                        
                        {/* End circle at first evidence bubble */}
                        <circle
                          cx="440"
                          cy="310"
                          r="4"
                          fill="#ffffff"
                          stroke="#d1d5db"
                          strokeWidth="1.5"
                        />
                      </motion.g>
                      
                      {/* Evidence Box 1 - connected to Depression */}
                      <g>
                        <rect
                          x="440"
                          y="260"
                          width="280"
                          height="100"
                          fill="#f0f5f7"
                          stroke="#c7dce5"
                          strokeWidth="0.5"
                        />
                        
                        {/* Evidence content lines */}
                        <rect x="460" y="285" width="220" height="6" rx="3" fill="#b4d6e4" />
                        <rect x="460" y="300" width="200" height="6" rx="3" fill="#b4d6e4" />
                        <rect x="460" y="315" width="210" height="6" rx="3" fill="#b4d6e4" />
                        <rect x="460" y="330" width="180" height="6" rx="3" fill="#b4d6e4" />
                      </g>
                      
                      {/* Evidence Box 2 - connected to Diabetes */}
                      <g>
                        <rect
                          x="440"
                          y="380"
                          width="280"
                          height="80"
                          fill="#f0f5f7"
                          stroke="#c7dce5"
                          strokeWidth="0.5"
                        />
                        
                        {/* Evidence content lines */}
                        <rect x="460" y="400" width="220" height="6" rx="3" fill="#b4d6e4" />
                        <rect x="460" y="415" width="200" height="6" rx="3" fill="#b4d6e4" />
                        <rect x="460" y="430" width="210" height="6" rx="3" fill="#b4d6e4" />
                      </g>
                    </motion.g>
                    
                    {/* Shadow filters */}
                    <defs>
                      <filter id="cardShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="2" dy="4" stdDeviation="6" floodOpacity="0.1"/>
                      </filter>
                      <filter id="smallShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="1" dy="2" stdDeviation="3" floodOpacity="0.08"/>
                      </filter>
                    </defs>
                    </svg>
                    )}
                  </motion.div>
                )}
                
                {/* Smart Bundling Visualization - Step 2 - Problem Wrap-Up Workflow */}
                {activeStep === 1 && (
                  <motion.div
                    className="w-full h-[550px] max-w-[95%] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="relative w-full h-full">
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 800 550"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Defs for shadows and filters */}
                        <defs>
                          <filter id="workflowShadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.05"/>
                          </filter>
                          <filter id="stepShadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.04"/>
                          </filter>
                        </defs>
                        
                        {/* Bundling Header with Spinner */}
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <text x="400" y="50" fill="#a8998a" fontSize="16" fontWeight="500" textAnchor="middle">
                            Bundling
                          </text>
                          
                          {/* Animated spinner */}
                          <motion.g
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: "450px 45px" }}
                          >
                            <circle cx="450" cy="45" r="8" fill="none" stroke="#c0b4a8" strokeWidth="2" strokeDasharray="4 2" opacity="0.3" />
                            <path d="M 450 37 A 8 8 0 0 1 458 45" stroke="#a8998a" strokeWidth="2" strokeLinecap="round" />
                          </motion.g>
                        </motion.g>
                        
                        {/* Main Workflow Container */}
                        <motion.g
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          {/* Main card background - no border */}
                          <rect x="150" y="90" width="500" height="380" fill="#ffffff" filter="url(#workflowShadow)" />
                          
                          {/* Problem Summary Title */}
                          <text x="400" y="130" fill="#1e293b" fontSize="22" fontWeight="600" textAnchor="middle">
                            Problem Summary
                          </text>
                          
                          {/* Plus button */}
                          <motion.g
                            whileHover={{ scale: 1.1 }}
                            style={{ cursor: "pointer" }}
                          >
                            <circle cx="580" cy="125" r="16" fill="#70a2bc" stroke="#70a2bc" strokeWidth="1.5" />
                            <line x1="580" y1="117" x2="580" y2="133" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                            <line x1="572" y1="125" x2="588" y2="125" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                          </motion.g>
                        </motion.g>
                        
                        {/* Step 1 - Problem Identification */}
                        <motion.g
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: activeStep === 1 ? 1 : 0, y: activeStep === 1 ? 0 : 20 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          {/* Step 1 Card */}
                          <rect x="200" y="170" width="400" height="60" fill="#ffffff" stroke="#a8998a" strokeWidth="1" filter="url(#stepShadow)" />
                          
                          {/* Dots indicator */}
                          <g>
                            <circle cx="220" cy="195" r="2" fill="#c0b4a8" />
                            <circle cx="220" cy="200" r="2" fill="#c0b4a8" />
                            <circle cx="220" cy="205" r="2" fill="#c0b4a8" />
                            <circle cx="225" cy="195" r="2" fill="#c0b4a8" />
                            <circle cx="225" cy="200" r="2" fill="#c0b4a8" />
                            <circle cx="225" cy="205" r="2" fill="#c0b4a8" />
                          </g>
                          
                          {/* Step number */}
                          <text x="250" y="206" fill="#847568" fontSize="20" fontWeight="600">
                            1
                          </text>
                          
                          {/* Progress bar placeholder */}
                          <rect x="280" y="194" width="280" height="12" fill="#f4f0ed" />
                          <motion.rect
                            x="280" y="194" width="0" height="12" fill="#d4c8bc"
                            animate={{ width: activeStep === 1 ? 200 : 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                          />
                        </motion.g>
                        
                        {/* Step 2 - Problem Analysis */}
                        <motion.g
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: activeStep === 1 ? 1 : 0, 
                            y: activeStep === 1 && scrollProgressValue < 0.4 ? 0 : 
                               activeStep === 1 && scrollProgressValue >= 0.4 ? 80 : 20
                          }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          {/* Step 2 Card */}
                          <rect x="200" y="250" width="400" height="60" fill="#ffffff" stroke="#a8998a" strokeWidth="1" filter="url(#stepShadow)" />
                          
                          {/* Dots indicator */}
                          <g>
                            <circle cx="220" cy="275" r="2" fill="#c0b4a8" />
                            <circle cx="220" cy="280" r="2" fill="#c0b4a8" />
                            <circle cx="220" cy="285" r="2" fill="#c0b4a8" />
                            <circle cx="225" cy="275" r="2" fill="#c0b4a8" />
                            <circle cx="225" cy="280" r="2" fill="#c0b4a8" />
                            <circle cx="225" cy="285" r="2" fill="#c0b4a8" />
                          </g>
                          
                          {/* Step number - changes when reordered */}
                          <text x="250" y="286" fill="#847568" fontSize="20" fontWeight="600">
                            {scrollProgressValue >= 0.4 ? "3" : "2"}
                          </text>
                          
                          {/* Progress bar placeholder */}
                          <rect x="280" y="274" width="280" height="12" fill="#f4f0ed" />
                          <motion.rect
                            x="280" y="274" width="0" height="12" fill="#d4c8bc"
                            animate={{ width: activeStep === 1 ? 220 : 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                          />
                        </motion.g>
                        
                        {/* Step 3 - Bundle Creation */}
                        <motion.g
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: activeStep === 1 ? 1 : 0, 
                            y: activeStep === 1 && scrollProgressValue < 0.4 ? 0 : 
                               activeStep === 1 && scrollProgressValue >= 0.4 ? -80 : 20
                          }}
                          transition={{ duration: 0.5, delay: 0.7 }}
                        >
                          {/* Step 3 Card */}
                          <rect x="200" y="330" width="400" height="60" fill="#ffffff" stroke="#a8998a" strokeWidth="1" filter="url(#stepShadow)" />
                          
                          {/* Dots indicator */}
                          <g>
                            <circle cx="220" cy="355" r="2" fill="#c0b4a8" />
                            <circle cx="220" cy="360" r="2" fill="#c0b4a8" />
                            <circle cx="220" cy="365" r="2" fill="#c0b4a8" />
                            <circle cx="225" cy="355" r="2" fill="#c0b4a8" />
                            <circle cx="225" cy="360" r="2" fill="#c0b4a8" />
                            <circle cx="225" cy="365" r="2" fill="#c0b4a8" />
                          </g>
                          
                          {/* Step number - changes when reordered */}
                          <text x="250" y="366" fill="#847568" fontSize="20" fontWeight="600">
                            {scrollProgressValue >= 0.4 ? "2" : "3"}
                          </text>
                          
                          {/* Progress bar placeholder */}
                          <rect x="280" y="354" width="280" height="12" fill="#f4f0ed" />
                          <motion.rect
                            x="280" y="354" width="0" height="12" fill="#d4c8bc"
                            animate={{ width: activeStep === 1 ? 240 : 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                          />
                        </motion.g>
                        
                        {/* Connection Lines from Step 2 to Left Codes - Only show after reordering */}
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={{ opacity: activeStep === 1 && scrollProgressValue >= 0.5 ? 1 : 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          {/* Horizontal line from reordered Step 2 card going left */}
                          <line x1="200" y1="280" x2="140" y2="280" stroke="#c0b4a8" strokeWidth="1" strokeDasharray="4,2" />
                          
                          {/* Vertical line going down */}
                          <line x1="140" y1="280" x2="140" y2="400" stroke="#c0b4a8" strokeWidth="1" strokeDasharray="4,2" />
                          
                          {/* Three horizontal branches to codes */}
                          {/* Top branch to I12.9 */}
                          <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: activeStep === 1 && scrollProgressValue >= 0.5 ? 1 : 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <line x1="140" y1="320" x2="105" y2="320" stroke="#c0b4a8" strokeWidth="1" strokeDasharray="4,2" />
                            <circle cx="105" cy="320" r="2" fill="#c0b4a8" />
                          </motion.g>
                          
                          {/* Middle branch to F41.1 */}
                          <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: activeStep === 1 && scrollProgressValue >= 0.5 ? 1 : 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <line x1="140" y1="360" x2="105" y2="360" stroke="#c0b4a8" strokeWidth="1" strokeDasharray="4,2" />
                            <circle cx="105" cy="360" r="2" fill="#c0b4a8" />
                          </motion.g>
                          
                          {/* Bottom branch to 99215 */}
                          <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: activeStep === 1 && scrollProgressValue >= 0.5 ? 1 : 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            <line x1="140" y1="400" x2="105" y2="400" stroke="#c0b4a8" strokeWidth="1" strokeDasharray="4,2" />
                            <circle cx="105" cy="400" r="2" fill="#c0b4a8" />
                          </motion.g>
                        </motion.g>
                        
                        {/* ICD Code Labels - Positioned Vertically on Left - Show after reordering */}
                        <motion.g
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: activeStep === 1 && scrollProgressValue >= 0.6 ? 1 : 0, scale: activeStep === 1 && scrollProgressValue >= 0.6 ? 1 : 0.9 }}
                          transition={{ duration: 0.4, delay: 0.6 }}
                        >
                          {/* I12.9 */}
                          <rect x="20" y="303" width="85" height="34" fill="#ece4dc" stroke="#c0b4a8" strokeWidth="1" />
                          <text x="62.5" y="324" fill="#847568" fontSize="13" fontWeight="600" textAnchor="middle">
                            I12.9
                          </text>
                          
                          {/* F41.1 */}
                          <rect x="20" y="343" width="85" height="34" fill="#ece4dc" stroke="#c0b4a8" strokeWidth="1" />
                          <text x="62.5" y="364" fill="#847568" fontSize="13" fontWeight="600" textAnchor="middle">
                            F41.1
                          </text>
                          
                          {/* 99215 */}
                          <rect x="20" y="383" width="85" height="34" fill="#ece4dc" stroke="#c0b4a8" strokeWidth="1" />
                          <text x="62.5" y="404" fill="#847568" fontSize="13" fontWeight="600" textAnchor="middle">
                            99215
                          </text>
                        </motion.g>
                        
                        {/* Arrows flowing from codes to the right */}
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={{ opacity: activeStep === 1 && scrollProgressValue >= 0.7 ? 1 : 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                        >
                          {/* Lines from each code box flowing right back to workflow */}
                          <line x1="100" y1="320" x2="140" y2="320" stroke="#c0b4a8" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
                          <line x1="100" y1="360" x2="140" y2="360" stroke="#c0b4a8" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
                          <line x1="100" y1="400" x2="140" y2="400" stroke="#c0b4a8" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
                        </motion.g>
                        
                        {/* Generate Button - Shows after codes appear */}
                        <motion.g
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: activeStep === 1 && scrollProgressValue >= 0.75 ? 1 : 0, y: activeStep === 1 && scrollProgressValue >= 0.75 ? 0 : 10 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                        >
                          <rect x="300" y="410" width="200" height="36" fill="#ffffff" stroke="#a8998a" strokeWidth="1" />
                          <text x="400" y="432" fill="#1e293b" fontSize="15" fontWeight="600" textAnchor="middle">
                            Generate
                          </text>
                        </motion.g>
                      </svg>
                    </div>
                  </motion.div>
                )}
                
                {/* Auto Actions Visualization - Step 3 - Medical Prescription Interface */}
                {activeStep === 2 && (
                  <motion.div
                    className="w-full h-[550px] max-w-[95%]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 800 550"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Definitions with warm colors from Bundling */}
                      <defs>
                        <linearGradient id="warmCardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" />
                          <stop offset="50%" stopColor="#fff8f0" />
                          <stop offset="100%" stopColor="#fef3e8" />
                        </linearGradient>
                        <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#70a2bc" />
                          <stop offset="50%" stopColor="#a8998a" />
                          <stop offset="100%" stopColor="#c0b4a8" />
                        </linearGradient>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#70a2bc" opacity="0.2" />
                          <stop offset="50%" stopColor="#a8998a" opacity="0.5" />
                          <stop offset="100%" stopColor="#70a2bc" opacity="0.2" />
                        </linearGradient>
                        <filter id="cardShadow" x="-50%" y="-50%" width="200%" height="200%">
                          <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.12"/>
                        </filter>
                      </defs>
                      
                      {/* Main Prescription Card - Smaller and Left-aligned */}
                      <motion.g
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: activeStep === 2 ? 1 : 0, y: activeStep === 2 ? 0 : 20 }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Card Background with modern gradient and enhanced shadow */}
                        <rect x="30" y="50" width="550" height="100" fill="url(#warmCardGradient)" stroke="none" rx="12" filter="url(#cardShadow)" />
                        <rect x="30" y="50" width="550" height="100" fill="none" stroke="url(#borderGradient)" strokeWidth="1.5" rx="12" opacity="0.6" />
                        
                        {/* Modern Header with Icon */}
                        <g transform="translate(60, 75)">
                          <circle cx="0" cy="0" r="18" fill="#70a2bc" opacity="0.1" />
                          <path d="M -8 0 L -3 0 M 3 0 L 8 0 M 0 -8 L 0 -3 M 0 3 L 0 8" stroke="#70a2bc" strokeWidth="2" strokeLinecap="round" />
                        </g>
                        <text x="100" y="82" fill="#1e293b" fontSize="22" fontWeight="700">
                          Automated Treatment Protocol
                        </text>
                        <rect x="150" y="95" width="310" height="2" fill="url(#lineGradient)" rx="1" />
                        
                        {/* Status Pills */}
                        <g transform="translate(480, 65)">
                          <rect x="0" y="0" width="80" height="24" fill="#70a2bc" opacity="0.1" rx="12" />
                          <circle cx="18" cy="12" r="3" fill="#70a2bc" />
                          <text x="28" y="16" fill="#70a2bc" fontSize="11" fontWeight="600">ACTIVE</text>
                        </g>
                        <g transform="translate(480, 95)">
                          <rect x="0" y="0" width="80" height="24" fill="#5a8ca6" opacity="0.1" rx="12" />
                          <circle cx="18" cy="12" r="3" fill="#5a8ca6" className="animate-pulse" />
                          <text x="28" y="16" fill="#5a8ca6" fontSize="11" fontWeight="600">LIVE</text>
                        </g>
                      </motion.g>
                      
                      {/* Linked Evidence Section */}
                      <motion.g
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: activeStep === 2 && scrollProgressValue > 0.2 ? 1 : 0, scale: activeStep === 2 && scrollProgressValue > 0.2 ? 1 : 0.95 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {/* Evidence Card Container */}
                        <rect x="100" y="190" width="600" height="320" fill="#ffffff" stroke="#a8998a" strokeWidth="2" rx="4" filter="url(#cardShadow)" />
                        
                        {/* Evidence Header with Modern Icon */}
                        <g>
                          {/* Modern AI Icon */}
                          <g transform="translate(130, 215)">
                            {/* Brain/AI icon */}
                            <rect x="8" y="8" width="24" height="24" fill="none" stroke="#70a2bc" strokeWidth="2" rx="4" />
                            <circle cx="20" cy="20" r="3" fill="#70a2bc" />
                            <path d="M 8 20 L 14 20 M 26 20 L 32 20 M 20 8 L 20 14 M 20 26 L 20 32" stroke="#70a2bc" strokeWidth="1.5" strokeLinecap="round" />
                          </g>
                          <text x="175" y="235" fill="#1e293b" fontSize="20" fontWeight="600">
                            AI-Analyzed Evidence
                          </text>
                        </g>
                        
                        {/* Evidence Content Box 1 */}
                        <motion.g
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: activeStep === 2 && scrollProgressValue > 0.3 ? 1 : 0, x: activeStep === 2 && scrollProgressValue > 0.3 ? 0 : -10 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        >
                          <rect x="160" y="270" width="480" height="80" fill="#fff8f0" stroke="none" rx="4" />
                          
                          {/* Evidence bars representing text */}
                          <rect x="180" y="285" width="350" height="8" fill="#c0b4a8" rx="2" />
                          <rect x="180" y="300" width="420" height="8" fill="#c0b4a8" rx="2" />
                          <rect x="180" y="315" width="280" height="8" fill="#c0b4a8" rx="2" />
                          <line x1="160" y1="340" x2="640" y2="340" stroke="#c0b4a8" strokeWidth="1" />
                        </motion.g>
                        
                        {/* Evidence Content Box 2 */}
                        <motion.g
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: activeStep === 2 && scrollProgressValue > 0.4 ? 1 : 0, x: activeStep === 2 && scrollProgressValue > 0.4 ? 0 : -10 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                        >
                          <rect x="140" y="370" width="440" height="100" fill="#ece4dc" stroke="none" rx="4" />
                          
                          {/* Chat bubble pointer */}
                          <path d="M 140 420 L 120 430 L 140 440" fill="#ece4dc" />
                          
                          {/* Evidence content lines */}
                          <rect x="160" y="385" width="300" height="6" fill="#a8998a" rx="2" />
                          <rect x="160" y="398" width="380" height="6" fill="#a8998a" rx="2" />
                          <rect x="160" y="411" width="240" height="6" fill="#a8998a" rx="2" />
                          <rect x="160" y="424" width="340" height="6" fill="#a8998a" rx="2" />
                          <rect x="160" y="437" width="200" height="6" fill="#a8998a" rx="2" />
                        </motion.g>
                      </motion.g>
                      
                      {/* Dosage Information Box - No Border */}
                      <motion.g
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: activeStep === 2 && scrollProgressValue > 0.5 ? 1 : 0, scale: activeStep === 2 && scrollProgressValue > 0.5 ? 1 : 0.9 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                      >
                        <rect x="550" y="400" width="180" height="100" fill="#fff8f0" stroke="none" rx="4" />
                        
                        <text x="640" y="430" fill="#1e293b" fontSize="20" fontWeight="600" textAnchor="middle">
                          Auto-Execute
                        </text>
                        <text x="640" y="455" fill="#70a2bc" fontSize="14" fontWeight="500" textAnchor="middle">
                          ON DETECTION
                        </text>
                        
                        {/* Small indicator lines */}
                        <line x1="570" y1="470" x2="710" y2="470" stroke="#c0b4a8" strokeWidth="0.5" opacity="0.5" />
                        <rect x="620" y="480" width="40" height="3" fill="#70a2bc" rx="1" />
                      </motion.g>
                      
                    </svg>
                  </motion.div>
                )}
                
                {/* Clear Evidence Visualization - Step 4 - 3D Clinical Evidence Transformation */}
                {activeStep === 3 && (
                  <motion.div
                    className="w-full h-[550px] max-w-[95%] flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    style={{ perspective: '1200px' }}
                  >
                    {/* 3D Clinical Evidence Transformation - Inspired by Adaline */}
                    <motion.div
                      className="relative w-full max-w-[600px]"
                      style={{
                        transform: 'rotateX(5deg) rotateY(-15deg)',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      animate={{
                        rotateY: [-15, -10, -15],
                        rotateX: [5, 3, 5]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {/* Clinical Assessment Text Block */}
                      <div className="relative p-8 rounded-lg bg-white/95 shadow-2xl backdrop-blur" 
                           style={{ 
                             transformStyle: 'preserve-3d',
                             background: 'linear-gradient(135deg, #ffffff 0%, #f8fafb 100%)'
                           }}>
                        
                        {/* Header */}
                        <div className="mb-6 pb-4 border-b border-[#70a2bc]/20">
                          <h3 className="text-xl font-bold text-[#2f2f2f] mb-2">Clinical Evidence Transformation</h3>
                          <p className="text-sm text-[#6c757d]">AI-powered analysis converting observations to clinical insights</p>
                        </div>
                        
                        {/* Text Transformation Content */}
                        <div className="space-y-4 text-base leading-relaxed">
                          
                          {/* Original Observation */}
                          <div className="relative">
                            <span className="opacity-50 text-[#6c757d]">Patient states: "</span>
                            
                            {/* Removed/replaced text with strikethrough */}
                            <motion.span 
                              className="relative inline-block"
                              style={{ transform: 'translateZ(20px)' }}
                            >
                              <span className="line-through bg-red-50 px-1 text-red-400">
                                I just don't feel like doing anything anymore
                              </span>
                            </motion.span>
                            
                            <span className="opacity-50 text-[#6c757d]">" with </span>
                            
                            <motion.span 
                              className="relative inline-block"
                              style={{ transform: 'translateZ(20px)' }}
                            >
                              <span className="line-through bg-red-50 px-1 text-red-400">
                                flat affect and minimal eye contact
                              </span>
                            </motion.span>
                          </div>
                          
                          {/* Transformed Clinical Language */}
                          <div className="relative">
                            <span className="opacity-50 text-[#6c757d]">Clinical Assessment: </span>
                            
                            {/* New clinical text highlighted */}
                            <motion.span 
                              className="relative inline-block"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 }}
                              style={{ transform: 'translateZ(50px)' }}
                            >
                              <span className="bg-[#70a2bc]/10 text-[#70a2bc] px-2 py-1 rounded font-semibold">
                                Patient demonstrates anhedonia
                              </span>
                            </motion.span>
                            
                            <span className="opacity-50 text-[#6c757d]"> with </span>
                            
                            <motion.span 
                              className="relative inline-block"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.7 }}
                              style={{ transform: 'translateZ(50px)' }}
                            >
                              <span className="bg-[#70a2bc]/10 text-[#70a2bc] px-2 py-1 rounded font-semibold">
                                blunted affect and poor eye contact
                              </span>
                            </motion.span>
                          </div>
                          
                          {/* Additional Transformations */}
                          <div className="pt-4 border-t border-dashed border-[#c0b4a8]/30">
                            <div className="grid grid-cols-2 gap-4">
                              
                              {/* Voice Analysis */}
                              <div>
                                <p className="text-xs font-semibold text-[#6c757d] mb-2">Voice Pattern:</p>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 1 }}
                                  style={{ transform: 'translateZ(30px)' }}
                                >
                                  <span className="line-through text-red-300 text-sm">slow speech</span>
                                  <span className="mx-2">→</span>
                                  <span className="bg-[#a8998a]/10 text-[#a8998a] px-1 rounded text-sm font-medium">
                                    psychomotor retardation
                                  </span>
                                </motion.div>
                              </div>
                              
                              {/* Behavioral Analysis */}
                              <div>
                                <p className="text-xs font-semibold text-[#6c757d] mb-2">Behavioral Cue:</p>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 1.2 }}
                                  style={{ transform: 'translateZ(30px)' }}
                                >
                                  <span className="line-through text-red-300 text-sm">slumped posture</span>
                                  <span className="mx-2">→</span>
                                  <span className="bg-[#5a8ca6]/10 text-[#5a8ca6] px-1 rounded text-sm font-medium">
                                    diminished motor activity
                                  </span>
                                </motion.div>
                              </div>
                              
                            </div>
                          </div>
                          
                          {/* ICD-10 Mapping */}
                          <motion.div 
                            className="mt-6 p-4 bg-gradient-to-r from-[#fff8f0] to-[#fef3e8] rounded-lg border border-[#c0b4a8]/20"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.5 }}
                            style={{ transform: 'translateZ(60px)' }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs font-semibold text-[#6c757d] mb-1">Suggested Diagnosis:</p>
                                <p className="text-base font-bold text-[#2f2f2f]">Major Depressive Disorder</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-semibold text-[#6c757d] mb-1">ICD-10 Code:</p>
                                <p className="text-lg font-mono font-bold text-[#70a2bc]">F32.1</p>
                              </div>
                            </div>
                          </motion.div>
                          
                        </div>
                        
                        {/* Bottom Status Bar */}
                        <motion.div 
                          className="mt-6 pt-4 border-t-2 border-[#70a2bc]/30 flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2 }}
                        >
                          <div className="bg-[#70a2bc]/10 rounded-full px-4 py-2 flex items-center gap-3">
                            <span className="text-xs font-bold text-[#70a2bc]">Raw Observation</span>
                            <svg className="w-4 h-4 text-[#70a2bc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <span className="text-xs font-bold text-[#70a2bc]">Clinical Documentation</span>
                          </div>
                        </motion.div>
                        
                        {/* 3D Grid Lines */}
                        <div className="absolute inset-0 pointer-events-none opacity-10">
                          <div className="absolute top-0 left-0 w-full h-full"
                               style={{
                                 backgroundImage: `
                                   repeating-linear-gradient(0deg, #70a2bc 0px, transparent 1px, transparent 40px, #70a2bc 41px),
                                   repeating-linear-gradient(90deg, #70a2bc 0px, transparent 1px, transparent 40px, #70a2bc 41px)
                                 `
                               }} />
                        </div>
                        
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
