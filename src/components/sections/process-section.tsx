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
    title: "Automation",
    shortTitle: "Automation",
    subtitle: "EHR Integration & Clinical Enrichment",
    heading: "Intelligent Care Coordination",
    description: "Automatically initiate appropriate referrals, assessments, and safety protocols when behavioral health concerns are identified during clinical encounters.",
    subItems: [
      {
        number: "1",
        title: "Seamless EHR Integration & Workflow Automation",
        description: "Automatically populates structured clinical data directly into existing EHR systems without disrupting provider workflow. Translates complex patient interactions into standardized clinical documentation, ICD-10 codes, and billable encounters. Integrates with Epic, Cerner, and other major EHR platforms through native APIs, ensuring real-time data synchronization and comprehensive clinical record maintenance."
      },
      {
        number: "2",
        title: "Automated Medical Translation & Clinical Enrichment",
        description: "Converts patient communications into precise medical terminology with comprehensive clinical context. Transforms lay descriptions like 'feeling down and tired' into structured clinical language: 'Patient reports persistent depressed mood with associated fatigue, consistent with major depressive episode criteria.' Enriches documentation with relevant clinical correlations, differential diagnoses, and evidence-based assessment recommendations."
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
            // Extended handling for each sub-step with proper transitions
            if (localStepProgress < 1.0) {
              // Step 1.1: 0-1 range
              newCurrentSubItem = 1;
              visualAnimationProgress = localStepProgress; // 0.0 to 1.0 for sub-item 1.1 animation
            } else if (localStepProgress >= 1.0 && localStepProgress < 2.5) {
              // Step 1.2 extended range - requires 1.5x more scrolling than normal
              newCurrentSubItem = 2;
              visualAnimationProgress = Math.min((localStepProgress - 1.0) / 1.5, 1.0); // 0.0 to 1.0 over 1.5 units
            } else if (localStepProgress >= 2.5 && localStepProgress < 3.0) {
              // Step 1.3: 2.5-3.0 range with smooth transition
              newCurrentSubItem = 3;
              visualAnimationProgress = (localStepProgress - 2.5) / 0.5; // 0.0 to 1.0 over 0.5 units
            } else if (localStepProgress >= 3.0) {
              // Step 1.4: 3.0+ range
              newCurrentSubItem = 4;
              visualAnimationProgress = Math.min((localStepProgress - 3.0) / 1.0, 1.0); // 0.0 to 1.0 over 1 unit
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
          } else if (newActiveStep === 2) {
            // SPECIAL CASE: Step 3 (Automated Clinical Workflows) - handle 3.1 and 3.2 transitions
            if (localStepProgress < 1.0) {
              newCurrentSubItem = 1;
              visualAnimationProgress = localStepProgress; // 0.0 to 1.0 for step 3.1
            } else {
              newCurrentSubItem = 2;
              visualAnimationProgress = localStepProgress - 1.0; // 0.0 to 1.0 for step 3.2
            }
          } else {
            // Normal behavior for other steps (4)
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
      } else if (newActiveStep === 0 && newCurrentSubItem === 2) {
        setScrollProgressValue(visualAnimationProgress); // Extended 0-1 progress for step 1.2 animations
      } else if (newActiveStep === 0 && newCurrentSubItem === 3) {
        setScrollProgressValue(visualAnimationProgress); // 0-1 progress for step 1.3 animations
      } else if (newActiveStep === 0 && newCurrentSubItem === 4) {
        setScrollProgressValue(visualAnimationProgress); // 0-1 progress for step 1.4 animations
      } else if (newActiveStep === 2) {
        setScrollProgressValue(visualAnimationProgress); // 0-1 progress for Step 3 animations
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
                              <span className={`text-sm font-light transition-all duration-300 ${
                                isActiveSubItem 
                                  ? 'text-[#70a2bc] scale-110' 
                                  : 'text-[#6c757d] opacity-50'
                              }`}>
                                {subItem.number}
                              </span>
                              {/* Vertical connecting line */}
                              {!isLastItem && (
                                <div 
                                  className="absolute left-[8px] top-6 w-[1px] transition-all duration-300"
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
                              } else if (scrollProg < 0.75) {
                                // State 3: Zoom in to smaller size (60-75%)
                                const zoomProgress = (scrollProg - 0.6) / 0.15;
                                // Target size is 35% (smaller than current)
                                verticalPos = [0, 70 - (35 * zoomProgress), 80 - (20 * zoomProgress), 85 - (15 * zoomProgress), 90 - (10 * zoomProgress), 100];
                                horizontalPos = [0, 70 - (35 * zoomProgress), 80 - (20 * zoomProgress), 85 - (15 * zoomProgress), 90 - (10 * zoomProgress), 100];
                              } else {
                                // State 4: Keep cell 1.1 expanded for second visual (75-100%)
                                // Cell 1.1 expands back to show medical conversation
                                if (scrollProg < 0.78) {
                                  // Transition phase: expand cell 1.1 back
                                  const expandProgress = (scrollProg - 0.75) / 0.03;
                                  verticalPos = [0, 35 + (35 * expandProgress), 60 + (20 * expandProgress), 70 + (15 * expandProgress), 80 + (10 * expandProgress), 100];
                                  horizontalPos = [0, 35 + (35 * expandProgress), 60 + (20 * expandProgress), 70 + (15 * expandProgress), 80 + (10 * expandProgress), 100];
                                } else {
                                  // Full expansion for medical conversation
                                  verticalPos = [0, 70, 80, 85, 90, 100];
                                  horizontalPos = [0, 70, 80, 85, 90, 100];
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
                                  transition={{ duration: 0.8, ease: "easeInOut" }}
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
                                  transition={{ duration: 0.8, ease: "easeInOut" }}
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
                                       scrollProgressValue < 0.75 ? `${70 - (35 * ((scrollProgressValue - 0.6) / 0.15))}%` :
                                       scrollProgressValue < 0.78 ? `${35 + (35 * ((scrollProgressValue - 0.75) / 0.03))}%` :
                                       '70%') : '20%',
                                    height: currentSubItem === 1 ? 
                                      (scrollProgressValue < 0.3 ? `${20 + (50 * (scrollProgressValue / 0.3))}%` :
                                       scrollProgressValue < 0.6 ? '70%' :
                                       scrollProgressValue < 0.75 ? `${70 - (35 * ((scrollProgressValue - 0.6) / 0.15))}%` :
                                       scrollProgressValue < 0.78 ? `${35 + (35 * ((scrollProgressValue - 0.75) / 0.03))}%` :
                                       '70%') : '20%',
                                    zIndex: currentSubItem === 1 ? 10 : 1
                                  }}
                                  transition={{ duration: 0.8, ease: "easeInOut" }}
                                >
                                  <div className="w-full h-full flex items-center justify-center relative">
                                    {currentSubItem === 1 ? (
                                      <>
                                        {/* First Visual: Video Session Image - only show until 75% */}
                                        {scrollProgressValue < 0.75 && (
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
                                                : 1 - (0.4 * ((scrollProgressValue - 0.6) / 0.15)),  // Zoom smaller to 0.6x
                                              opacity: scrollProgressValue < 0.7 ? 1 : 1 - ((scrollProgressValue - 0.7) / 0.05),
                                              width: '90%',
                                              height: '90%'
                                            }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                          />
                                        )}
                                        
                                        {/* Second Visual: Medical Conversation - show after 75% */}
                                        {scrollProgressValue >= 0.75 && (
                                          <motion.div 
                                            className="absolute inset-0 p-6 overflow-hidden perspective-distant"
                                            initial={{ opacity: 0 }}
                                            animate={{ 
                                              opacity: 1,
                                              scale: 0.8 + (0.2 * ((scrollProgressValue - 0.75) / 0.25))
                                            }}
                                            transition={{ duration: 0.8 }}
                                            style={{
                                              transform: 'translate(0vw, 5vh) scale(1.1)',
                                              perspective: '1000px'
                                            }}
                                          >
                                            {/* Transparent Card Frame with 3D */}
                                            <motion.div 
                                              className="relative w-full h-full max-w-[400px] mx-auto select-none transform-3d"
                                              animate={{
                                                rotateX: 5 + (5 * Math.min((scrollProgressValue - 0.75) / 0.25, 1)),
                                                rotateY: -30 + (10 * Math.min((scrollProgressValue - 0.75) / 0.25, 1)),
                                              }}
                                              transition={{ duration: 0.6 }}
                                              style={{ 
                                                transform: 'rotateX(5deg) rotateY(-30deg)',
                                                transformStyle: 'preserve-3d'
                                              }}
                                            >
                                              <div 
                                                className="atlas-product-base break-words whitespace-pre-line transform-3d w-full h-full bg-transparent border border-[#70a2bc]/10 p-4 flex flex-col relative"
                                                style={{ 
                                                  transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)',
                                                  transform: `rotateX(${1.36 + (scrollProgressValue - 0.75) * 4}deg) rotateY(${11.8 - (scrollProgressValue - 0.75) * 8}deg)`,
                                                  transformStyle: 'preserve-3d',
                                                  backgroundImage: 'repeating-linear-gradient(45deg, rgba(112, 162, 188, 0.02) 0px, rgba(112, 162, 188, 0.02) 1px, transparent 1px, transparent 5px)'
                                                }}
                                              >
                                                {/* Grid overlay lines */}
                                                <div className="absolute right-0 left-0 flex flex-row justify-between pointer-events-none">
                                                  <div className="relative -z-10 h-0 w-0">
                                                    <svg className="absolute top-1/2 h-[200vh] -translate-y-1/2" width="2" viewBox="0 0 2 4000" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.1 }}>
                                                      <path d="M1 0 V4000" stroke="#70a2bc" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"/>
                                                    </svg>
                                                  </div>
                                                  <div className="relative -z-10 h-0 w-0">
                                                    <svg className="absolute top-1/2 h-[200vh] -translate-y-1/2" width="2" viewBox="0 0 2 4000" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.1 }}>
                                                      <path d="M1 0 V4000" stroke="#70a2bc" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"/>
                                                    </svg>
                                                  </div>
                                                </div>
                                                <div className="absolute top-0 bottom-0 flex flex-col justify-between pointer-events-none">
                                                  <div className="relative h-0 w-full">
                                                    <svg className="absolute left-1/2 w-[200vw] min-w-[4000px] -translate-x-1/2" height="2" viewBox="0 0 4000 2" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.1 }}>
                                                      <path d="M0 1 H4000" stroke="#70a2bc" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"/>
                                                    </svg>
                                                  </div>
                                                  <div className="relative h-0 w-full">
                                                    <svg className="absolute left-1/2 w-[200vw] min-w-[4000px] -translate-x-1/2" height="2" viewBox="0 0 4000 2" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.1 }}>
                                                      <path d="M0 1 H4000" stroke="#70a2bc" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"/>
                                                    </svg>
                                                  </div>
                                                </div>
                                                <motion.div 
                                                  className="relative flex-1 overflow-auto"
                                                  style={{ transformStyle: 'preserve-3d' }}
                                                >
                                                {/* Medical conversation content */}
                                                <div className="space-y-3 text-[11px] leading-relaxed">
                                                  {/* Patient Message Part 1 */}
                                                  <motion.div 
                                                    className="space-y-1"
                                                    animate={{ 
                                                      opacity: scrollProgressValue > 0.76 ? 1 : 0,
                                                      y: scrollProgressValue > 0.76 ? 0 : 20
                                                    }}
                                                    transition={{ duration: 0.5 }}
                                                  >
                                                    <p className="font-semibold text-[#2f2f2f]">Mrs. Johnson:</p>
                                                    <p className="text-[#6c757d]">
                                                      I have persistent{' '}
                                                      <motion.span 
                                                        className="relative inline-block transform-3d"
                                                        animate={{
                                                          scale: scrollProgressValue > 0.78 ? 1.1 : 1
                                                        }}
                                                      >
                                                        <span 
                                                          className="relative inline-block transform-3d"
                                                        >
                                                          <span 
                                                            className="bg-surface-base text-on-surface-base-disabled inline-block h-[21px] line-through"
                                                            style={{ 
                                                              opacity: scrollProgressValue > 0.79 ? 0.5 : 0,
                                                              transform: 'translateZ(20px)'
                                                            }}
                                                          >
                                                            <span className="bg-surface-tint-base">chest pain </span>
                                                          </span>
                                                          <span 
                                                            className="absolute inset-0"
                                                            style={{ 
                                                              backgroundImage: 'repeating-linear-gradient(45deg, rgb(153, 153, 153) 0px, rgb(153, 153, 153) 1px, transparent 1px, transparent 5px)',
                                                              opacity: scrollProgressValue > 0.79 ? 0.5 : 0
                                                            }}
                                                          />
                                                        </span>
                                                        <span 
                                                          className="text-[#70a2bc] bg-[#70a2bc]/10 inline-block h-[21px] px-1 font-semibold"
                                                          style={{ 
                                                            opacity: 1,
                                                            transform: scrollProgressValue > 0.78 ? 'translateZ(50px)' : 'translateZ(0px)',
                                                            transition: 'transform 0.4s ease-out'
                                                          }}
                                                        >
                                                          left chest pain
                                                        </span>
                                                        {scrollProgressValue > 0.79 && (
                                                          <span 
                                                            className="absolute -top-4 left-0 text-[9px] text-[#70a2bc] bg-transparent px-1 py-0.5"
                                                            style={{ transform: 'translateZ(60px)' }}
                                                          >
                                                            → Cardiovascular
                                                          </span>
                                                        )}
                                                      </motion.span>
                                                      {' '}for three weeks. It's dull, aching, worse with stress. I also have{' '}
                                                      <motion.span 
                                                        className="relative inline-block transform-3d"
                                                        animate={{
                                                          scale: scrollProgressValue > 0.81 ? 1.1 : 1
                                                        }}
                                                      >
                                                        <span 
                                                          className="text-[#a8998a] bg-[#a8998a]/10 px-0.5 rounded inline-block font-semibold"
                                                          style={{ 
                                                            transform: scrollProgressValue > 0.81 ? 'translateZ(30px)' : 'translateZ(0px)',
                                                            transition: 'transform 0.4s ease-out'
                                                          }}
                                                        >
                                                          diabetes
                                                        </span>
                                                        {scrollProgressValue > 0.82 && (
                                                          <span 
                                                            className="absolute -top-4 left-0 text-[9px] text-[#a8998a] bg-white/90 px-1 py-0.5 rounded shadow-sm border border-[#a8998a]/20"
                                                            style={{ transform: 'translateZ(50px)' }}
                                                          >
                                                            → Endocrine
                                                          </span>
                                                        )}
                                                      </motion.span>
                                                      ,{' '}
                                                      <motion.span 
                                                        className="relative inline-block transform-3d"
                                                        animate={{
                                                          scale: scrollProgressValue > 0.84 ? 1.1 : 1
                                                        }}
                                                      >
                                                        <span 
                                                          className="text-[#70a2bc] bg-[#70a2bc]/10 px-0.5 rounded inline-block font-semibold"
                                                          style={{ 
                                                            transform: scrollProgressValue > 0.84 ? 'translateZ(30px)' : 'translateZ(0px)',
                                                            transition: 'transform 0.4s ease-out'
                                                          }}
                                                        >
                                                          foot swelling
                                                        </span>
                                                        {scrollProgressValue > 0.85 && (
                                                          <span 
                                                            className="absolute -top-4 left-0 text-[9px] text-[#70a2bc] bg-white/90 px-1 py-0.5 rounded shadow-sm border border-[#70a2bc]/20"
                                                            style={{ transform: 'translateZ(50px)' }}
                                                          >
                                                            → Vascular
                                                          </span>
                                                        )}
                                                      </motion.span>
                                                      , terrible nightmares, and{' '}
                                                      <motion.span 
                                                        className="relative inline-block transform-3d"
                                                        animate={{
                                                          scale: scrollProgressValue > 0.87 ? 1.1 : 1
                                                        }}
                                                      >
                                                        <span 
                                                          className="text-[#a8998a] bg-[#a8998a]/10 px-0.5 rounded inline-block font-semibold"
                                                          style={{ 
                                                            transform: scrollProgressValue > 0.87 ? 'translateZ(30px)' : 'translateZ(0px)',
                                                            transition: 'transform 0.4s ease-out'
                                                          }}
                                                        >
                                                          insomnia
                                                        </span>
                                                        {scrollProgressValue > 0.88 && (
                                                          <span 
                                                            className="absolute -top-4 left-0 text-[9px] text-[#a8998a] bg-white/90 px-1 py-0.5 rounded shadow-sm border border-[#a8998a]/20"
                                                            style={{ transform: 'translateZ(50px)' }}
                                                          >
                                                            → Neurological
                                                          </span>
                                                        )}
                                                      </motion.span>
                                                      . I'm scared.
                                                    </p>
                                                  </motion.div>

                                                  {/* Doctor Response */}
                                                  <motion.div 
                                                    className="space-y-1"
                                                    animate={{ 
                                                      opacity: scrollProgressValue > 0.88 ? 1 : 0,
                                                      y: scrollProgressValue > 0.88 ? 0 : 20
                                                    }}
                                                    transition={{ duration: 0.5 }}
                                                  >
                                                    <p className="font-semibold text-[#2f2f2f]">Dr. Martinez:</p>
                                                    <p className="text-[#6c757d]">
                                                      Tell me about the chest pain and swelling.
                                                    </p>
                                                  </motion.div>

                                                  {/* Patient Follow-up */}
                                                  <motion.div 
                                                    className="space-y-1"
                                                    animate={{ 
                                                      opacity: scrollProgressValue > 0.90 ? 1 : 0,
                                                      y: scrollProgressValue > 0.90 ? 0 : 20
                                                    }}
                                                    transition={{ duration: 0.5 }}
                                                  >
                                                    <p className="font-semibold text-[#2f2f2f]">Mrs. Johnson:</p>
                                                    <p className="text-[#6c757d]">
                                                      The pain{' '}
                                                      <motion.span 
                                                        className="relative inline-block transform-3d"
                                                        animate={{
                                                          scale: scrollProgressValue > 0.95 ? 1.1 : 1
                                                        }}
                                                      >
                                                        <span 
                                                          className="text-[#70a2bc] bg-[#70a2bc]/10 px-0.5 rounded inline-block font-semibold"
                                                          style={{ 
                                                            transform: scrollProgressValue > 0.92 ? 'translateZ(30px)' : 'translateZ(0px)',
                                                            transition: 'transform 0.4s ease-out'
                                                          }}
                                                        >
                                                          radiates to my left arm
                                                        </span>
                                                        {scrollProgressValue > 0.93 && (
                                                          <span 
                                                            className="absolute -top-4 left-0 text-[9px] text-[#70a2bc] bg-white/90 px-1 py-0.5 rounded shadow-sm border border-[#70a2bc]/20"
                                                            style={{ transform: 'translateZ(50px)' }}
                                                          >
                                                            → Cardiac symptom
                                                          </span>
                                                        )}
                                                      </motion.span>
                                                      {' '}sometimes. My{' '}
                                                      <motion.span 
                                                        className="relative inline-block transform-3d"
                                                        animate={{
                                                          scale: scrollProgressValue > 0.94 ? 1.1 : 1
                                                        }}
                                                      >
                                                        <span 
                                                          className="text-[#a8998a] bg-[#a8998a]/10 px-0.5 rounded inline-block font-semibold"
                                                          style={{ 
                                                            transform: scrollProgressValue > 0.94 ? 'translateZ(30px)' : 'translateZ(0px)',
                                                            transition: 'transform 0.4s ease-out'
                                                          }}
                                                        >
                                                          ankles swell
                                                        </span>
                                                        {scrollProgressValue > 0.95 && (
                                                          <span 
                                                            className="absolute -top-4 left-0 text-[9px] text-[#a8998a] bg-white/90 px-1 py-0.5 rounded shadow-sm border border-[#a8998a]/20"
                                                            style={{ transform: 'translateZ(50px)' }}
                                                          >
                                                            → Edema
                                                          </span>
                                                        )}
                                                      </motion.span>
                                                      , especially evenings. My blood sugar's been high due to stress and poor sleep.
                                                    </p>
                                                  </motion.div>
                                                </div>
                                              </motion.div>
                                              
                                              {/* Action Buttons - appear after conversation */}
                                              <motion.div 
                                                className="flex justify-center gap-3 pt-3 border-t border-[#70a2bc]/10"
                                                animate={{
                                                  opacity: scrollProgressValue > 0.96 ? 1 : 0,
                                                  y: scrollProgressValue > 0.96 ? 0 : 10
                                                }}
                                                transition={{ duration: 0.5 }}
                                                style={{ transformStyle: 'preserve-3d' }}
                                              >
                                                <button 
                                                  className="px-4 py-2 bg-[#70a2bc] text-white text-[10px] font-medium hover:bg-[#5a8ca6] transition-all transform-3d"
                                                  style={{
                                                    transform: 'translateZ(30px)',
                                                    boxShadow: '0 4px 8px rgba(112, 162, 188, 0.2)'
                                                  }}
                                                >
                                                  Generate Summary
                                                </button>
                                                <button 
                                                  className="px-4 py-2 bg-transparent border border-[#a8998a]/40 text-[#a8998a] text-[10px] font-medium hover:bg-[#a8998a]/10 transition-all transform-3d"
                                                  style={{
                                                    transform: 'translateZ(20px)',
                                                    boxShadow: '0 2px 4px rgba(168, 153, 138, 0.1)'
                                                  }}
                                                >
                                                  View Full Report
                                                </button>
                                              </motion.div>
                                            </div>
                                          </motion.div>
                                          </motion.div>
                                        )}
                                        
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </motion.div>
                                
                                {/* Cell 1.2 - Intake Agent (r1c2) */}
                                <motion.div
                                  className="absolute overflow-hidden"
                                  animate={{
                                    left: currentSubItem === 2 ? '15%' : '40%',
                                    top: currentSubItem === 2 ? '0%' : '0%',
                                    width: currentSubItem === 2 ? '70%' : '20%',
                                    height: currentSubItem === 2 ? '70%' : '20%',
                                    zIndex: currentSubItem === 2 ? 10 : 1
                                  }}
                                  transition={{ duration: 0.8, ease: "easeInOut" }}
                                >
                                  <div className="w-full h-full flex items-center justify-center relative">
                                    {currentSubItem === 2 ? (
                                      <motion.div 
                                        className="absolute inset-0 p-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                      >
                                        {/* Voice Agent Interface Container - Transparent Background */}
                                        <div className="w-full h-full bg-transparent backdrop-blur-none flex flex-col">
                                          
                                          {/* Header Section - Transparent */}
                                          <div className="p-4 border-b border-[#70a2bc]/20">
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-3">
                                                <div className="relative">
                                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#70a2bc] to-[#5a8ca6] flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                                    </svg>
                                                  </div>
                                                  <motion.div 
                                                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                  />
                                                </div>
                                                <div>
                                                  <h3 className="text-sm font-semibold text-[#2f2f2f]">AI Intake Agent</h3>
                                                  <p className="text-xs text-[#6c757d]">Clinical Assessment</p>
                                                </div>
                                              </div>
                                              <div className="flex items-center gap-2">
                                                <span className="text-xs text-[#70a2bc] font-medium"></span>
                                              </div>
                                            </div>
                                          </div>
                                          
                                          {/* Main Content Area - Split View */}
                                          <div className="flex-1 flex overflow-hidden">
                                            
                                            {/* Left Side - Scroll-Driven Voice Conversation */}
                                            <div className="w-1/2 p-4 border-r border-[#70a2bc]/20">
                                              <div className="space-y-3 h-full">
                                                {/* Scroll-driven conversation messages */}
                                                
                                                {/* Message 1 - AI Greeting (0-10% scroll) */}
                                                {currentSubItem === 2 && (
                                                  <motion.div 
                                                    className="flex gap-2"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ 
                                                      opacity: scrollProgressValue > 0 ? Math.min(scrollProgressValue * 5, 1) : 0,
                                                      x: scrollProgressValue > 0 ? 0 : -10
                                                    }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                  >
                                                    <div className="w-6 h-6 rounded-full bg-[#70a2bc]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                      <span className="text-xs text-[#70a2bc] font-medium">AI</span>
                                                    </div>
                                                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 max-w-[85%] shadow-sm border border-[#70a2bc]/10">
                                                      <p className="text-xs text-[#2f2f2f]">Hi Sarah, I'm here to help with your intake today. What brings you in?</p>
                                                    </div>
                                                  </motion.div>
                                                )}
                                                
                                                {/* Message 2 - Patient Chief Complaint (10-25% scroll) */}
                                                {currentSubItem === 2 && (
                                                  <motion.div 
                                                    className="flex gap-2 justify-end"
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ 
                                                      opacity: scrollProgressValue > 0.05 ? Math.min((scrollProgressValue - 0.05) * 3.33, 1) : 0,
                                                      x: scrollProgressValue > 0.05 ? 0 : 10
                                                    }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                  >
                                                    <div className="bg-[#70a2bc]/10 backdrop-blur-sm rounded-lg p-2 max-w-[85%] shadow-sm border border-[#a8998a]/20">
                                                      <p className="text-xs text-[#2f2f2f]">I've been having these really bad headaches for three months now, and they're just not going away.</p>
                                                    </div>
                                                    <div className="w-6 h-6 rounded-full bg-[#a8998a]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                      <span className="text-xs text-[#a8998a] font-medium">S</span>
                                                    </div>
                                                  </motion.div>
                                                )}
                                                
                                                {/* Message 3 - AI Follow-up (25-35% scroll) */}
                                                {currentSubItem === 2 && (
                                                  <motion.div 
                                                    className="flex gap-2"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ 
                                                      opacity: scrollProgressValue > 0.15 ? Math.min((scrollProgressValue - 0.15) * 3.33, 1) : 0,
                                                      x: scrollProgressValue > 0.15 ? 0 : -10
                                                    }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                  >
                                                    <div className="w-6 h-6 rounded-full bg-[#70a2bc]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                      <span className="text-xs text-[#70a2bc] font-medium">AI</span>
                                                    </div>
                                                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 max-w-[85%] shadow-sm border border-[#70a2bc]/10">
                                                      <p className="text-xs text-[#2f2f2f]">I'm sorry to hear that. Can you tell me more about these headaches?</p>
                                                    </div>
                                                  </motion.div>
                                                )}
                                                
                                                {/* Message 4 - Patient Pain Details (35-50% scroll) */}
                                                {currentSubItem === 2 && (
                                                  <motion.div 
                                                    className="flex gap-2 justify-end"
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ 
                                                      opacity: scrollProgressValue > 0.25 ? Math.min((scrollProgressValue - 0.25) * 2.5, 1) : 0,
                                                      x: scrollProgressValue > 0.25 ? 0 : 10
                                                    }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                  >
                                                    <div className="bg-[#70a2bc]/10 backdrop-blur-sm rounded-lg p-2 max-w-[85%] shadow-sm border border-[#a8998a]/20">
                                                      <p className="text-xs text-[#2f2f2f]">They're way worse than normal headaches. Like an 8 out of 10 pain, and I get dizzy and nauseous too.</p>
                                                    </div>
                                                    <div className="w-6 h-6 rounded-full bg-[#a8998a]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                      <span className="text-xs text-[#a8998a] font-medium">S</span>
                                                    </div>
                                                  </motion.div>
                                                )}
                                                
                                                {/* Message 5 - AI Frequency Question (50-60% scroll) */}
                                                {currentSubItem === 2 && (
                                                  <motion.div 
                                                    className="flex gap-2"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ 
                                                      opacity: scrollProgressValue > 0.35 ? Math.min((scrollProgressValue - 0.35) * 2.5, 1) : 0,
                                                      x: scrollProgressValue > 0.35 ? 0 : -10
                                                    }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                  >
                                                    <div className="w-6 h-6 rounded-full bg-[#70a2bc]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                      <span className="text-xs text-[#70a2bc] font-medium">AI</span>
                                                    </div>
                                                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 max-w-[85%] shadow-sm border border-[#70a2bc]/10">
                                                      <p className="text-xs text-[#2f2f2f]">How often are you getting them?</p>
                                                    </div>
                                                  </motion.div>
                                                )}
                                                
                                                {/* Message 6 - Patient Frequency Response (60-75% scroll) */}
                                                {currentSubItem === 2 && (
                                                  <motion.div 
                                                    className="flex gap-2 justify-end"
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ 
                                                      opacity: scrollProgressValue > 0.45 ? Math.min((scrollProgressValue - 0.45) * 2, 1) : 0,
                                                      x: scrollProgressValue > 0.45 ? 0 : 10
                                                    }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                  >
                                                    <div className="bg-[#70a2bc]/10 backdrop-blur-sm rounded-lg p-2 max-w-[85%] shadow-sm border border-[#a8998a]/20">
                                                      <p className="text-xs text-[#2f2f2f]">Maybe three or four times a week? And I'm taking Advil constantly.</p>
                                                    </div>
                                                    <div className="w-6 h-6 rounded-full bg-[#a8998a]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                      <span className="text-xs text-[#a8998a] font-medium">S</span>
                                                    </div>
                                                  </motion.div>
                                                )}
                                                
                                                {/* Message 7 - AI Symptoms Question (75-85% scroll) */}
                                                {currentSubItem === 2 && (
                                                  <motion.div 
                                                    className="flex gap-2"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ 
                                                      opacity: scrollProgressValue > 0.55 ? Math.min((scrollProgressValue - 0.55) * 2, 1) : 0,
                                                      x: scrollProgressValue > 0.55 ? 0 : -10
                                                    }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                  >
                                                    <div className="w-6 h-6 rounded-full bg-[#70a2bc]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                      <span className="text-xs text-[#70a2bc] font-medium">AI</span>
                                                    </div>
                                                    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 max-w-[85%] shadow-sm border border-[#70a2bc]/10">
                                                      <p className="text-xs text-[#2f2f2f]">Are you experiencing any other symptoms?</p>
                                                    </div>
                                                  </motion.div>
                                                )}
                                                
                                                {/* Message 8 - Patient Additional Symptoms (85-100% scroll) */}
                                                {currentSubItem === 2 && (
                                                  <motion.div 
                                                    className="flex gap-2 justify-end"
                                                    initial={{ opacity: 0, x: 10 }}
                                                    animate={{ 
                                                      opacity: scrollProgressValue > 0.65 ? Math.min((scrollProgressValue - 0.65) * 1.43, 1) : 0,
                                                      x: scrollProgressValue > 0.65 ? 0 : 10
                                                    }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                  >
                                                    <div className="bg-[#70a2bc]/10 backdrop-blur-sm rounded-lg p-2 max-w-[85%] shadow-sm border border-[#a8998a]/20">
                                                      <p className="text-xs text-[#2f2f2f]">Yeah, I've been super anxious lately and can't sleep. I wake up at like 3 AM every night.</p>
                                                    </div>
                                                    <div className="w-6 h-6 rounded-full bg-[#a8998a]/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                      <span className="text-xs text-[#a8998a] font-medium">S</span>
                                                    </div>
                                                  </motion.div>
                                                )}
                                              </div>
                                            </div>
                                            
                                            {/* Right Side - Scroll-Driven Auto-filling Intake Form */}
                                            <div className="w-1/2 p-4">
                                              <div className="space-y-3">
                                                <div className="flex items-center justify-between mb-3">
                                                  <h4 className="text-sm font-semibold text-[#2f2f2f]">Clinical Intake Form</h4>
                                                  <div className="flex items-center gap-1">
                                                    <motion.div 
                                                      className="w-2 h-2 bg-green-500 rounded-full"
                                                      animate={{ opacity: [0.5, 1, 0.5] }}
                                                      transition={{ duration: 1.5, repeat: Infinity }}
                                                    />
                                                    <span className="text-xs text-[#6c757d]">Live Processing</span>
                                                  </div>
                                                </div>
                                                
                                                {/* Patient Demographics - Appears immediately */}
                                                {currentSubItem === 2 && (
                                                  <motion.div 
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: scrollProgressValue > 0 ? 1 : 0 }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                  >
                                                  <label className="text-xs font-medium text-[#6c757d] block mb-1">Patient Information</label>
                                                  <motion.div 
                                                    className="border border-[#e5e7eb] rounded p-2 bg-white/60 backdrop-blur-sm"
                                                    initial={{ borderColor: '#e5e7eb' }}
                                                    animate={{ borderColor: scrollProgressValue > 0 ? ['#e5e7eb', '#70a2bc', '#e5e7eb'] : '#e5e7eb' }}
                                                    transition={{ duration: 1 }}
                                                  >
                                                    <motion.p 
                                                      className="text-xs text-[#2f2f2f] font-medium"
                                                      initial={{ opacity: 0 }}
                                                      animate={{ opacity: scrollProgressValue > 0 ? 1 : 0 }}
                                                      transition={{ duration: 0.3 }}
                                                    >
                                                      Sarah, Age 44
                                                    </motion.p>
                                                  </motion.div>
                                                </motion.div>
                                                )}
                                                
                                                {/* Chief Complaint - Fills when patient mentions headaches (10% scroll) */}
                                                {currentSubItem === 2 && (
                                                  <motion.div 
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: scrollProgressValue > 0.05 ? 1 : 0 }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                  >
                                                  <label className="text-xs font-medium text-[#6c757d] block mb-1">Chief Complaint</label>
                                                  <motion.div 
                                                    className="border border-[#e5e7eb] rounded p-2 bg-white/60 backdrop-blur-sm"
                                                    initial={{ borderColor: '#e5e7eb', scale: 1 }}
                                                    animate={{ 
                                                      borderColor: scrollProgressValue > 0.1 ? ['#e5e7eb', '#70a2bc', '#e5e7eb'] : '#e5e7eb',
                                                      scale: scrollProgressValue > 0.1 ? [1, 1.02, 1] : 1
                                                    }}
                                                    transition={{ duration: 1 }}
                                                  >
                                                    <motion.p 
                                                      className="text-xs text-[#2f2f2f]"
                                                      initial={{ opacity: 0, width: 0 }}
                                                      animate={{ 
                                                        opacity: scrollProgressValue > 0.1 ? 1 : 0,
                                                        width: scrollProgressValue > 0.1 ? 'auto' : 0
                                                      }}
                                                      transition={{ duration: 1.2, ease: "easeOut" }}
                                                    >
                                                      Severe headaches x3 months, persistent
                                                    </motion.p>
                                                  </motion.div>
                                                </motion.div>
                                                )}
                                                
                                                {/* Duration - Fills after headache complaint */}
                                                <motion.div 
                                                  initial={{ opacity: 0 }}
                                                  animate={{ opacity: 1 }}
                                                  transition={{ delay: 1.3 }}
                                                >
                                                  <label className="text-xs font-medium text-[#6c757d] block mb-1">Duration</label>
                                                  <motion.div 
                                                    className="border border-[#e5e7eb] rounded p-2 bg-white/60 backdrop-blur-sm"
                                                    initial={{ borderColor: '#e5e7eb' }}
                                                    animate={{ borderColor: ['#e5e7eb', '#70a2bc', '#e5e7eb'] }}
                                                    transition={{ duration: 1, delay: 1.4 }}
                                                  >
                                                    <motion.p 
                                                      className="text-xs text-[#2f2f2f]"
                                                      initial={{ opacity: 0 }}
                                                      animate={{ opacity: 1 }}
                                                      transition={{ delay: 1.6 }}
                                                    >
                                                      3 months, ongoing
                                                    </motion.p>
                                                  </motion.div>
                                                </motion.div>
                                                
                                                {/* Pain Scale - Fills after patient mentions "8 out of 10" */}
                                                <motion.div 
                                                  initial={{ opacity: 0 }}
                                                  animate={{ opacity: 1 }}
                                                  transition={{ delay: 1.9 }}
                                                >
                                                  <label className="text-xs font-medium text-[#6c757d] block mb-1">Pain Scale (0-10)</label>
                                                  <motion.div 
                                                    className="border border-[#e5e7eb] rounded p-2 bg-white/60 backdrop-blur-sm"
                                                    initial={{ borderColor: '#e5e7eb' }}
                                                    animate={{ 
                                                      borderColor: ['#e5e7eb', '#70a2bc', '#e5e7eb'],
                                                      scale: [1, 1.05, 1]
                                                    }}
                                                    transition={{ duration: 1, delay: 2.0 }}
                                                  >
                                                    <div className="flex gap-1 items-center">
                                                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                        <motion.div
                                                          key={num}
                                                          className={`w-4 h-4 rounded text-xs flex items-center justify-center ${
                                                            num <= 8 ? 'bg-gradient-to-r from-[#70a2bc] to-[#5a8ca6] text-white' : 'bg-gray-200 text-gray-400'
                                                          }`}
                                                          initial={{ scale: 0.8, opacity: 0.3 }}
                                                          animate={{ 
                                                            scale: num === 8 ? 1.2 : (num <= 8 ? 1 : 0.8),
                                                            opacity: num === 8 ? 1 : (num <= 8 ? 0.8 : 0.3)
                                                          }}
                                                          transition={{ delay: 2.1 + (num * 0.05), duration: 0.3 }}
                                                        >
                                                          {num}
                                                        </motion.div>
                                                      ))}
                                                      <motion.span 
                                                        className="ml-2 text-xs font-semibold text-[#70a2bc]"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 2.6 }}
                                                      >
                                                        8/10 Severe
                                                      </motion.span>
                                                    </div>
                                                  </motion.div>
                                                </motion.div>
                                                
                                                {/* Associated Symptoms - Fills as patient mentions each symptom */}
                                                <motion.div 
                                                  initial={{ opacity: 0 }}
                                                  animate={{ opacity: 1 }}
                                                  transition={{ delay: 2.0 }}
                                                >
                                                  <label className="text-xs font-medium text-[#6c757d] block mb-1">Associated Symptoms</label>
                                                  <motion.div 
                                                    className="border border-[#e5e7eb] rounded p-2 bg-white/60 backdrop-blur-sm space-y-1"
                                                    initial={{ borderColor: '#e5e7eb' }}
                                                    animate={{ borderColor: ['#e5e7eb', '#70a2bc', '#e5e7eb'] }}
                                                    transition={{ duration: 1, delay: 2.1 }}
                                                  >
                                                    {/* Dizziness - appears when mentioned */}
                                                    <motion.div 
                                                      className="flex items-center gap-2"
                                                      initial={{ opacity: 0, x: -10 }}
                                                      animate={{ opacity: 1, x: 0 }}
                                                      transition={{ delay: 2.2 }}
                                                    >
                                                      <motion.div 
                                                        className="w-2 h-2 rounded bg-[#70a2bc]"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 2.3, type: "spring" }}
                                                      />
                                                      <span className="text-xs text-[#2f2f2f]">Dizziness</span>
                                                    </motion.div>
                                                    {/* Nausea - appears when mentioned */}
                                                    <motion.div 
                                                      className="flex items-center gap-2"
                                                      initial={{ opacity: 0, x: -10 }}
                                                      animate={{ opacity: 1, x: 0 }}
                                                      transition={{ delay: 2.4 }}
                                                    >
                                                      <motion.div 
                                                        className="w-2 h-2 rounded bg-[#70a2bc]"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 2.5, type: "spring" }}
                                                      />
                                                      <span className="text-xs text-[#2f2f2f]">Nausea</span>
                                                    </motion.div>
                                                    {/* Anxiety - appears when mentioned later */}
                                                    <motion.div 
                                                      className="flex items-center gap-2"
                                                      initial={{ opacity: 0, x: -10 }}
                                                      animate={{ opacity: 1, x: 0 }}
                                                      transition={{ delay: 3.9 }}
                                                    >
                                                      <motion.div 
                                                        className="w-2 h-2 rounded bg-[#a8998a]"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 4.0, type: "spring" }}
                                                      />
                                                      <span className="text-xs text-[#2f2f2f]">Anxiety</span>
                                                    </motion.div>
                                                    {/* Sleep disruption - appears when mentioned */}
                                                    <motion.div 
                                                      className="flex items-center gap-2"
                                                      initial={{ opacity: 0, x: -10 }}
                                                      animate={{ opacity: 1, x: 0 }}
                                                      transition={{ delay: 4.1 }}
                                                    >
                                                      <motion.div 
                                                        className="w-2 h-2 rounded bg-[#a8998a]"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 4.2, type: "spring" }}
                                                      />
                                                      <span className="text-xs text-[#2f2f2f]">Sleep disruption</span>
                                                    </motion.div>
                                                  </motion.div>
                                                </motion.div>
                                                
                                                {/* Frequency - Fills when patient mentions frequency */}
                                                <motion.div 
                                                  initial={{ opacity: 0 }}
                                                  animate={{ opacity: 1 }}
                                                  transition={{ delay: 2.9 }}
                                                >
                                                  <label className="text-xs font-medium text-[#6c757d] block mb-1">Frequency</label>
                                                  <motion.div 
                                                    className="border border-[#e5e7eb] rounded p-2 bg-white/60 backdrop-blur-sm"
                                                    initial={{ borderColor: '#e5e7eb' }}
                                                    animate={{ borderColor: ['#e5e7eb', '#70a2bc', '#e5e7eb'] }}
                                                    transition={{ duration: 1, delay: 3.0 }}
                                                  >
                                                    <motion.p 
                                                      className="text-xs text-[#2f2f2f]"
                                                      initial={{ opacity: 0 }}
                                                      animate={{ opacity: 1 }}
                                                      transition={{ delay: 3.2 }}
                                                    >
                                                      3-4 times per week
                                                    </motion.p>
                                                  </motion.div>
                                                </motion.div>
                                                
                                                {/* Current Medications - Fills when patient mentions Advil */}
                                                <motion.div 
                                                  initial={{ opacity: 0 }}
                                                  animate={{ opacity: 1 }}
                                                  transition={{ delay: 3.0 }}
                                                >
                                                  <label className="text-xs font-medium text-[#6c757d] block mb-1">Current Medications</label>
                                                  <motion.div 
                                                    className="border border-[#e5e7eb] rounded p-2 bg-white/60 backdrop-blur-sm"
                                                    initial={{ borderColor: '#e5e7eb' }}
                                                    animate={{ borderColor: ['#e5e7eb', '#a8998a', '#e5e7eb'] }}
                                                    transition={{ duration: 1, delay: 3.1 }}
                                                  >
                                                    <motion.p 
                                                      className="text-xs text-[#2f2f2f]"
                                                      initial={{ opacity: 0 }}
                                                      animate={{ opacity: 1 }}
                                                      transition={{ delay: 3.3 }}
                                                    >
                                                      Ibuprofen (Advil) - frequent use
                                                    </motion.p>
                                                  </motion.div>
                                                </motion.div>
                                              </div>
                                            </div>
                                          </div>
                                          
                                          {/* Audio Waveform Visualization - Transparent */}
                                          <div className="h-16 border-t border-[#70a2bc]/20 flex items-center justify-center px-4 bg-transparent">
                                            <div className="flex items-center gap-1 h-full">
                                              {Array.from({ length: 40 }).map((_, i) => (
                                                <motion.div
                                                  key={i}
                                                  className="w-1 bg-gradient-to-t from-[#70a2bc] to-[#5a8ca6] rounded-full"
                                                  animate={{
                                                    height: ['20%', `${30 + Math.random() * 40}%`, '20%']
                                                  }}
                                                  transition={{
                                                    duration: 0.8 + Math.random() * 0.4,
                                                    repeat: Infinity,
                                                    delay: i * 0.05,
                                                    ease: "easeInOut"
                                                  }}
                                                />
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      </motion.div>
                                    ) : null}
                                  </div>
                                </motion.div>
                                
                                {/* Cell 1.3 - Follow-up Agent (r1c3) */}
                                <motion.div
                                  className="absolute"
                                  animate={{
                                    left: currentSubItem === 3 ? '15%' : '80%',
                                    top: currentSubItem === 3 ? '5%' : '0%',
                                    width: currentSubItem === 3 ? '80%' : '20%',
                                    height: currentSubItem === 3 ? '85%' : '20%',
                                    zIndex: currentSubItem === 3 ? 10 : 1
                                  }}
                                  transition={{ duration: 0.8, ease: "easeInOut" }}
                                >
                                  <div className="w-full h-full flex items-center justify-center">
                                    {currentSubItem === 3 ? (
                                      <motion.div 
                                        className="w-full h-full flex items-center justify-center"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ 
                                          opacity: scrollProgressValue > 0.3 ? 1 : scrollProgressValue * 3.3,
                                          scale: scrollProgressValue > 0.3 ? 1 : 0.8 + (scrollProgressValue * 0.67)
                                        }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                      >
                                        {/* Step 1.3 - Follow-up Agent Visualization */}
                                        <div className="relative w-full h-full">
                                          
                                          {/* Transcript Card - Adjusted Position */}
                                          <motion.div 
                                            className="absolute w-[70%] h-[70%]"
                                            style={{
                                              top: '0px',
                                              right: '20px'
                                            }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ 
                                              opacity: currentSubItem === 3 ? 1 : 0,
                                              y: currentSubItem === 3 ? 0 : 20
                                            }}
                                            transition={{ duration: 1.2, ease: "easeInOut" }}
                                          >
                                            <div className="w-full h-full bg-transparent border border-[#70a2bc]/20 flex flex-col">
                                              
                                              {/* Minimalist Header - Compact */}
                                              <div className="bg-white/50 border-b border-[#70a2bc]/20 px-3 py-1.5">
                                                <div className="flex items-center gap-3">
                                                  <div className="flex items-center gap-1">
                                                    <div className="w-1 h-1 bg-[#70a2bc] rounded-full"></div>
                                                    <span className="text-[10px] font-medium text-[#70a2bc]">Transcript</span>
                                                  </div>
                                                  <span className="text-[10px] text-[#6c757d]/60">Prior Note</span>
                                                </div>
                                              </div>
                                              
                                              {/* Transcript Content - Compact */}
                                              <div className="flex-1 p-3 space-y-2 overflow-y-auto bg-transparent">
                                                
                                                {/* Live Status - Smaller */}
                                                <motion.div 
                                                  className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px]"
                                                  initial={{ opacity: 0 }}
                                                  animate={{ 
                                                    opacity: currentSubItem === 3 && scrollProgressValue > 0.2 ? 1 : 0
                                                  }}
                                                  transition={{ duration: 0.8, ease: "easeInOut" }}
                                                >
                                                  <motion.div
                                                    className="w-1.5 h-1.5 bg-green-500 rounded-full"
                                                    animate={{ 
                                                      scale: [1, 1.2, 1],
                                                      opacity: [1, 0.6, 1]
                                                    }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                  />
                                                  <span className="text-[#6c757d]">Live Transcribing</span>
                                                </motion.div>
                                                
                                                {/* Conversation Messages with Scroll Animation */}
                                                <motion.div 
                                                  className="space-y-2"
                                                  initial={{ opacity: 0 }}
                                                  animate={{ opacity: 1 }}
                                                  transition={{ duration: 0.5, delay: 0.3 }}
                                                >
                                                  {/* Agent Question */}
                                                  <motion.div 
                                                    className="border-l border-[#70a2bc]/30 pl-2"
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ 
                                                      opacity: currentSubItem === 3 && scrollProgressValue > 0.3 ? 1 : 0,
                                                      y: currentSubItem === 3 && scrollProgressValue > 0.3 ? 0 : 8
                                                    }}
                                                    transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
                                                  >
                                                    <span className="text-[10px] text-[#70a2bc] font-medium">Agent</span>
                                                    <p className="text-xs text-[#2f2f2f] mt-0.5">
                                                      Do you feel like that discomfort or shortness of breath is worse with activity?
                                                    </p>
                                                  </motion.div>
                                                  
                                                  {/* Patient Response */}
                                                  <motion.div 
                                                    className="border-l border-[#a8998a]/30 pl-2 ml-6"
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ 
                                                      opacity: currentSubItem === 3 && scrollProgressValue > 0.35 ? 1 : 0,
                                                      y: currentSubItem === 3 && scrollProgressValue > 0.35 ? 0 : 8
                                                    }}
                                                    transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
                                                  >
                                                    <span className="text-[10px] text-[#a8998a] font-medium">Patient</span>
                                                    <p className="text-xs text-[#2f2f2f] mt-0.5">
                                                      Yes, when I'm walking up the stairs, all of that is worse.
                                                    </p>
                                                  </motion.div>
                                                  
                                                  {/* Agent Follow-up */}
                                                  <motion.div 
                                                    className="border-l border-[#70a2bc]/30 pl-2"
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ 
                                                      opacity: currentSubItem === 3 && scrollProgressValue > 0.4 ? 1 : 0,
                                                      y: currentSubItem === 3 && scrollProgressValue > 0.4 ? 0 : 8
                                                    }}
                                                    transition={{ duration: 0.8, delay: 0.7, ease: "easeInOut" }}
                                                  >
                                                    <span className="text-[10px] text-[#70a2bc] font-medium">Agent</span>
                                                    <p className="text-xs text-[#2f2f2f] mt-0.5">
                                                      Have you noticed any chest pain or pressure at the same time?
                                                    </p>
                                                  </motion.div>
                                                  
                                                  {/* Patient Final Response */}
                                                  <motion.div 
                                                    className="border-l border-[#a8998a]/30 pl-2 ml-6"
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ 
                                                      opacity: currentSubItem === 3 && scrollProgressValue > 0.45 ? 1 : 0,
                                                      y: currentSubItem === 3 && scrollProgressValue > 0.45 ? 0 : 8
                                                    }}
                                                    transition={{ duration: 0.8, delay: 0.9, ease: "easeInOut" }}
                                                  >
                                                    <span className="text-[10px] text-[#a8998a] font-medium">Patient</span>
                                                    <p className="text-xs text-[#2f2f2f] mt-0.5">
                                                      Very mildly the last couple of days, that's why I came in.
                                                    </p>
                                                  </motion.div>
                                                </motion.div>
                                              </div>
                                              
                                            </div>
                                          </motion.div>
                                          
                                          {/* Phone with Recording - Adjusted Position */}
                                          <motion.div 
                                            className="absolute z-10"
                                            style={{ 
                                              right: '-20px', 
                                              bottom: '70px'
                                            }}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ 
                                              opacity: currentSubItem === 3 && scrollProgressValue > 0.25 ? 1 : 0,
                                              scale: currentSubItem === 3 && scrollProgressValue > 0.25 ? 1 : 0.9
                                            }}
                                            transition={{ duration: 1.0, ease: "easeInOut", delay: 0.2 }}
                                          >
                                            <svg 
                                              viewBox="0 0 200 400" 
                                              className="w-[150px] h-[270px]"
                                              style={{ filter: 'drop-shadow(0 10px 25px rgba(112, 162, 188, 0.25))' }}
                                            >
                                              {/* Phone Body with Primary Color Background - Tiny Rounded */}
                                              <rect
                                                x="10"
                                                y="10"
                                                width="180"
                                                height="380"
                                                rx="8"
                                                fill="#70a2bc"
                                                stroke="#000000"
                                                strokeWidth="2"
                                              />
                                              
                                              {/* Status Bar */}
                                              <text
                                                x="30"
                                                y="40"
                                                fontSize="11"
                                                fill="white"
                                                fontFamily="system-ui"
                                                fontWeight="500"
                                              >
                                                11:41
                                              </text>
                                              
                                              {/* Signal and Battery Icons */}
                                              <g transform="translate(140, 28)">
                                                <circle cx="0" cy="0" r="1.5" fill="white" opacity="0.9"/>
                                                <circle cx="5" cy="-2" r="1.5" fill="white" opacity="0.9"/>
                                                <circle cx="10" cy="-4" r="1.5" fill="white" opacity="0.9"/>
                                                <circle cx="15" cy="-6" r="1.5" fill="white" opacity="0.9"/>
                                                <rect x="25" y="-6" width="20" height="10" rx="2" fill="none" stroke="white" strokeWidth="1.5" opacity="0.9"/>
                                                <rect x="27" y="-4" width="14" height="6" rx="1" fill="white" opacity="0.9"/>
                                              </g>
                                              
                                              {/* Header */}
                                              <text
                                                x="100"
                                                y="80"
                                                fontSize="14"
                                                fill="white"
                                                fontFamily="system-ui"
                                                fontWeight="600"
                                                textAnchor="middle"
                                              >
                                                Sarah Johnson
                                              </text>
                                              
                                              {/* Voice Waveform Animation */}
                                              <g transform="translate(100, 180)">
                                                {[-30, -20, -10, 0, 10, 20, 30].map((offset, i) => (
                                                  <motion.rect
                                                    key={i}
                                                    x={offset - 2}
                                                    y={-20}
                                                    width="4"
                                                    height="40"
                                                    fill="white"
                                                    opacity="0.8"
                                                    animate={{
                                                      height: [20 + Math.random() * 20, 40 + Math.random() * 20, 20 + Math.random() * 20],
                                                      y: [-10 - Math.random() * 10, -20 - Math.random() * 10, -10 - Math.random() * 10]
                                                    }}
                                                    transition={{
                                                      duration: 1.5 + Math.random() * 0.5,
                                                      repeat: Infinity,
                                                      delay: i * 0.1,
                                                      ease: "easeInOut"
                                                    }}
                                                  />
                                                ))}
                                              </g>
                                              
                                              {/* Bottom Text */}
                                              <text
                                                x="100"
                                                y="280"
                                                fontSize="11"
                                                fill="white"
                                                fontFamily="system-ui"
                                                textAnchor="middle"
                                                opacity="0.9"
                                              >
                                              </text>
                                              
                                              {/* Recording Button */}
                                              <g transform="translate(100, 320)">
                                                {/* Outer Circle */}
                                                <circle
                                                  cx="0"
                                                  cy="0"
                                                  r="30"
                                                  fill="none"
                                                  stroke="white"
                                                  strokeWidth="3"
                                                  opacity="0.9"
                                                />
                                                
                                                {/* Recording Icon - Red */}
                                                <circle
                                                  cx="0"
                                                  cy="0"
                                                  r="12"
                                                  fill="#ef4444"
                                                />
                                                
                                                {/* Red Pulsing Effect */}
                                                <motion.circle
                                                  cx="0"
                                                  cy="0"
                                                  r="12"
                                                  fill="#ef4444"
                                                  opacity="0.4"
                                                  animate={{
                                                    r: [12, 18, 12],
                                                    opacity: [0.4, 0, 0.4]
                                                  }}
                                                  transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    ease: "easeOut"
                                                  }}
                                                />
                                                
                                                {/* Pulsing Animation */}
                                                <motion.circle
                                                  cx="0"
                                                  cy="0"
                                                  r="30"
                                                  fill="none"
                                                  stroke="white"
                                                  strokeWidth="2"
                                                  opacity="0.5"
                                                  animate={{
                                                    r: [30, 35, 30],
                                                    opacity: [0.5, 0.2, 0.5]
                                                  }}
                                                  transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                  }}
                                                />
                                              </g>
                                              
                                              {/* Timer */}
                                              <text
                                                x="100"
                                                y="365"
                                                fontSize="12"
                                                fill="white"
                                                fontFamily="system-ui"
                                                fontWeight="500"
                                                textAnchor="middle"
                                              >
                                                12:24
                                              </text>
                                            </svg>
                                          </motion.div>
                                          
                                        </div>
                                      </motion.div>
                                    ) : ( 
                                      <div className="text-xs text-[#70a2bc] opacity-50">1.3</div>
                                    )}
                                  </div>
                                </motion.div>
                                
                                {/* Cell 1.4 - Referral Agent (r2c1) */}
                                <motion.div
                                  className="absolute"
                                  animate={{
                                    left: currentSubItem === 4 ? '0%' : '0%',
                                    top: currentSubItem === 4 ? '15%' : '40%',
                                    width: currentSubItem === 4 ? '70%' : '20%',
                                    height: currentSubItem === 4 ? '70%' : '20%',
                                    zIndex: currentSubItem === 4 ? 10 : 1
                                  }}
                                  transition={{ duration: 0.8, ease: "easeInOut" }}
                                >
                                  <div className="w-full h-full flex items-center justify-center">
                                    {currentSubItem === 4 ? (
                                      <motion.div 
                                        className="perspective-distant"
                                        initial={{ opacity: 0 }}
                                        animate={{ 
                                          opacity: scrollProgressValue > 0.05 ? 1 : 0
                                        }}
                                        transition={{ duration: 1.2, ease: "easeInOut" }}
                                        style={{
                                          transform: 'translate(0vw, 0vh) scale(1.1)'
                                        }}
                                      >
                                        <div 
                                          className="relative w-full max-w-[400px] select-none transform-3d mx-auto"
                                          style={{
                                            transform: `rotateX(${5 - scrollProgressValue * 2}deg) rotateY(${-30 + scrollProgressValue * 10}deg)`
                                          }}
                                        >
                                          <motion.div 
                                            className="atlas-product-base break-words whitespace-pre-line transform-3d text-[11px] leading-relaxed text-[#6c757d]"
                                            style={{ 
                                              transition: 'transform 2s cubic-bezier(0.16, 1, 0.3, 1)',
                                              transform: `rotateX(${1.38386 + scrollProgressValue * 2}deg) rotateY(${11.9425 - scrollProgressValue * 5}deg)`,
                                              transformStyle: 'preserve-3d'
                                            }}
                                          >
                                            {/* Opening text with typing effect */}
                                            {(() => {
                                              const fullText = "Clinical AI analyzing patient symptoms for diagnostic extraction:";
                                              const typingProgress = Math.min(scrollProgressValue * 3, 1);
                                              const charsToShow = Math.floor(fullText.length * typingProgress);
                                              const currentText = fullText.slice(0, charsToShow);
                                              return (
                                                <>
                                                  <span className="font-semibold text-[#2f2f2f] block">
                                                    {currentText}
                                                    {typingProgress < 1 && <span className="inline-block w-0.5 h-4 bg-[#70a2bc] animate-pulse" />}
                                                  </span>
                                                  {'\n\n'}
                                                </>
                                              );
                                            })()}
                                            
                                            {/* Line 1 - Chest Pain → CARDIAC */}
                                            <motion.span
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: scrollProgressValue > 0.15 ? 1 : 0 }}
                                              transition={{ duration: 0.8, delay: 0.1 }}
                                            >
                                              <span className="relative inline-block transform-3d">
                                                <span 
                                                  className="bg-surface-base text-on-surface-base-disabled inline-block h-[21px] line-through"
                                                  style={{ 
                                                    opacity: 0.6, 
                                                    transform: 'translateZ(20px)',
                                                    background: 'linear-gradient(90deg, rgba(255,200,200,0.3), rgba(255,200,200,0.1))',
                                                    padding: '0 4px',
                                                    borderRadius: '2px'
                                                  }}
                                                >
                                                  <span className="bg-surface-tint-base">chest pain </span>
                                                </span>
                                                <span className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgb(239, 68, 68, 0.3) 0px, rgb(239, 68, 68, 0.3) 1px, transparent 1px, transparent 5px)', opacity: 0.5 }}></span>
                                              </span>
                                              <span> → </span>
                                              <span className="inline-block transform-3d mx-1">
                                                <span 
                                                  className="text-on-primary-container bg-primary-container inline-block h-[21px]"
                                                  style={{ 
                                                    opacity: 1, 
                                                    transform: 'translateZ(50px)',
                                                    background: '#70a2bc',
                                                    color: 'white',
                                                    padding: '0 6px',
                                                    fontWeight: 600
                                                  }}
                                                >
                                                  Cardiology
                                                </span>
                                              </span>
                                              <span>referral: EKG + troponin </span>
                                            </motion.span>
                                            
                                            {'\n'}
                                            
                                            {/* Line 2 - PTSD → TRAUMA */}
                                            <motion.span
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: scrollProgressValue > 0.25 ? 1 : 0 }}
                                              transition={{ duration: 0.8, delay: 0.2 }}
                                            >
                                              <span className="relative inline-block transform-3d">
                                                <span 
                                                  className="bg-surface-base text-on-surface-base-disabled inline-block h-[21px] line-through"
                                                  style={{ 
                                                    opacity: 0.6, 
                                                    transform: 'translateZ(20px)',
                                                    background: 'linear-gradient(90deg, rgba(200,220,255,0.3), rgba(200,220,255,0.1))',
                                                    padding: '0 4px',
                                                    borderRadius: '2px'
                                                  }}
                                                >
                                                  <span className="text-blue-400">nightmares </span>
                                                </span>
                                                <span className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgb(112, 162, 188, 0.3) 0px, rgb(112, 162, 188, 0.3) 1px, transparent 1px, transparent 5px)', opacity: 0.5 }}></span>
                                              </span>
                                              <span className="relative inline-block transform-3d">
                                                <span 
                                                  className="bg-surface-base text-on-surface-base-disabled inline-block h-[21px] line-through"
                                                  style={{ 
                                                    opacity: 0.6, 
                                                    transform: 'translateZ(20px)',
                                                    padding: '0 2px'
                                                  }}
                                                >
                                                  <span className="text-gray-400">and </span>
                                                </span>
                                              </span>
                                              <span className="relative inline-block transform-3d">
                                                <span 
                                                  className="bg-surface-base text-on-surface-base-disabled inline-block h-[21px] line-through"
                                                  style={{ 
                                                    opacity: 0.6, 
                                                    transform: 'translateZ(20px)',
                                                    background: 'linear-gradient(90deg, rgba(200,220,255,0.3), rgba(200,220,255,0.1))',
                                                    padding: '0 4px',
                                                    borderRadius: '2px'
                                                  }}
                                                >
                                                  <span className="text-blue-400">anxiety </span>
                                                </span>
                                                <span className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgb(112, 162, 188, 0.3) 0px, rgb(112, 162, 188, 0.3) 1px, transparent 1px, transparent 5px)', opacity: 0.5 }}></span>
                                              </span>
                                              <span> → </span>
                                              <span className="inline-block transform-3d mx-1">
                                                <span 
                                                  className="text-on-primary-container bg-primary-container inline-block h-[21px]"
                                                  style={{ 
                                                    opacity: 1, 
                                                    transform: 'translateZ(45px)',
                                                    background: '#70a2bc',
                                                    color: 'white',
                                                    padding: '0 6px',
                                                    fontWeight: 600
                                                  }}
                                                >
                                                  PTSD
                                                </span>
                                              </span>
                                              <span>screening + </span>
                                              <span className="inline-block transform-3d mx-1">
                                                <span 
                                                  className="text-on-primary-container bg-primary-container inline-block h-[21px]"
                                                  style={{ 
                                                    opacity: 1, 
                                                    transform: 'translateZ(45px)',
                                                    background: '#70a2bc',
                                                    color: 'white',
                                                    padding: '0 6px',
                                                    fontWeight: 600
                                                  }}
                                                >
                                                  CBT
                                                </span>
                                              </span>
                                              <span>therapy referral </span>
                                            </motion.span>
                                            
                                            {'\n'}
                                            
                                            {/* Line 3 - Blood Sugar → DIABETES */}
                                            <motion.span
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: scrollProgressValue > 0.35 ? 1 : 0 }}
                                              transition={{ duration: 0.8, delay: 0.3 }}
                                            >
                                              <span className="relative inline-block transform-3d">
                                                <span 
                                                  className="bg-surface-base text-on-surface-base-disabled inline-block h-[21px] line-through"
                                                  style={{ opacity: 0.6, transform: 'translateZ(20px)' }}
                                                >
                                                  <span className="bg-surface-tint-base">blood </span>
                                                </span>
                                                <span className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgb(153, 153, 153) 0px, rgb(153, 153, 153) 1px, transparent 1px, transparent 5px)', opacity: 0.5 }}></span>
                                              </span>
                                              <span className="relative inline-block transform-3d">
                                                <span 
                                                  className="bg-surface-base text-on-surface-base-disabled inline-block h-[21px] line-through"
                                                  style={{ opacity: 0.6, transform: 'translateZ(20px)' }}
                                                >
                                                  <span className="bg-surface-tint-base">sugar </span>
                                                </span>
                                                <span className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgb(153, 153, 153) 0px, rgb(153, 153, 153) 1px, transparent 1px, transparent 5px)', opacity: 0.5 }}></span>
                                              </span>
                                              <span> → </span>
                                              <span className="inline-block transform-3d mx-1">
                                                <span 
                                                  className="text-on-primary-container bg-primary-container inline-block h-[21px]"
                                                  style={{ 
                                                    opacity: 1, 
                                                    transform: 'translateZ(40px)',
                                                    background: '#a8998a',
                                                    color: 'white',
                                                    padding: '0 6px',
                                                    fontWeight: 600
                                                  }}
                                                >
                                                  Type 2 DM
                                                </span>
                                              </span>
                                              <span>monitoring: HbA1c + glucose log </span>
                                              {'\n\n'}
                                            </motion.span>
                                            
                                            {/* Treatment Plan Header */}
                                            <motion.span
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: scrollProgressValue > 0.45 ? 1 : 0 }}
                                              transition={{ duration: 0.8, delay: 0.4 }}
                                            >
                                              <span className="font-semibold text-[#2f2f2f] block mt-2">
Integrated Care Action Plan:
                                              </span>
                                              {'\n'}
                                            </motion.span>
                                            
                                            {/* Treatment Items */}
                                            <motion.span
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: scrollProgressValue > 0.5 ? 1 : 0 }}
                                              transition={{ duration: 0.8, delay: 0.5 }}
                                            >
                                              <span className="block mt-1">
• Priority 1: </span>
                                              <span className="inline-block transform-3d">
                                                <span 
                                                  className="text-on-primary-container bg-primary-container inline-block h-[21px]"
                                                  style={{ 
                                                    opacity: 1, 
                                                    transform: 'translateZ(35px)',
                                                    background: '#70a2bc',
                                                    color: 'white',
                                                    padding: '0 4px',
                                                    fontWeight: 600,
                                                  }}
                                                >
                                                  STAT
                                                </span>
                                              </span>
                                              <span>cardiac workup - </span>
                                              <span className="inline-block transform-3d mx-1">
                                                <span 
                                                  className="text-on-primary-container bg-primary-container inline-block h-[21px]"
                                                  style={{ 
                                                    opacity: 1, 
                                                    transform: 'translateZ(35px)',
                                                    background: '#ef4444',
                                                    color: 'white',
                                                    padding: '0 6px',
                                                    fontWeight: 600
                                                  }}
                                                >
                                                  12-lead EKG
                                                </span>
                                              </span>
                                              <span>+ troponin, BNP, D-dimer</span>
                                            </motion.span>
                                            
                                            <motion.span
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: scrollProgressValue > 0.6 ? 1 : 0 }}
                                              transition={{ duration: 0.8, delay: 0.6 }}
                                            >
                                              <span className="block mt-1">
• Priority 1: </span>
                                              <span className="relative inline-block transform-3d">
                                                <span 
                                                  className="bg-surface-base text-on-surface-base-disabled inline-block h-[21px] line-through"
                                                  style={{ 
                                                    opacity: 0.5, 
                                                    transform: 'translateZ(20px)'
                                                  }}
                                                >
                                                  <span className="bg-surface-tint-base">Follow-up </span>
                                                </span>
                                                <span className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgb(153, 153, 153) 0px, rgb(153, 153, 153) 1px, transparent 1px, transparent 5px)', opacity: 0.5 }}></span>
                                              </span>
                                              <span className="inline-block transform-3d">
                                                <span 
                                                  className="text-on-primary-container bg-primary-container inline-block h-[21px]"
                                                  style={{ 
                                                    opacity: 1, 
                                                    transform: 'translateZ(50px)',
                                                    background: '#f59e0b',
                                                    color: 'white',
                                                    padding: '0 4px',
                                                    fontWeight: 600,
                                                  }}
                                                >
                                                  7-DAY
                                                </span>
                                              </span>
                                              <span>follow-up - </span>
                                              <span className="inline-block transform-3d mx-1">
                                                <span 
                                                  className="text-on-primary-container bg-primary-container inline-block h-[21px]"
                                                  style={{ 
                                                    opacity: 1, 
                                                    transform: 'translateZ(50px)',
                                                    background: '#f59e0b',
                                                    color: 'white',
                                                    padding: '0 6px',
                                                    fontWeight: 600
                                                  }}
                                                >
                                                  PHQ-9
                                                </span>
                                              </span>
                                              <span>+ GAD-7 assessment</span>
                                            </motion.span>
                                            
                                            {/* Line 3 - Chronic Management */}
                                            <motion.span
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: scrollProgressValue > 0.7 ? 1 : 0 }}
                                              transition={{ duration: 0.8, delay: 0.7 }}
                                            >
                                              <span className="block mt-1">
• Priority 3: </span>
                                              <span className="relative inline-block transform-3d">
                                                <span 
                                                  className="bg-surface-base text-on-surface-base-disabled inline-block h-[21px] line-through"
                                                  style={{ 
                                                    opacity: 0.5, 
                                                    transform: 'translateZ(20px)'
                                                  }}
                                                >
                                                  <span className="bg-surface-tint-base">Ongoing care </span>
                                                </span>
                                                <span className="absolute inset-0" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgb(153, 153, 153) 0px, rgb(153, 153, 153) 1px, transparent 1px, transparent 5px)', opacity: 0.5 }}></span>
                                              </span>
                                              <span> → </span>
                                              <span className="inline-block transform-3d mx-1">
                                                <span 
                                                  className="text-on-primary-container bg-primary-container inline-block h-[21px]"
                                                  style={{ 
                                                    opacity: 1, 
                                                    transform: 'translateZ(50px)',
                                                    background: '#5a8ca6',
                                                    color: 'white',
                                                    padding: '0 6px',
                                                    fontWeight: 600
                                                  }}
                                                >
                                                  MONTHLY
                                                </span>
                                              </span>
                                              <span>integrated care - </span>
                                              <span className="inline-block transform-3d mx-1">
                                                <span 
                                                  className="text-on-primary-container bg-primary-container inline-block h-[21px]"
                                                  style={{ 
                                                    opacity: 1, 
                                                    transform: 'translateZ(50px)',
                                                    background: '#5a8ca6',
                                                    color: 'white',
                                                    padding: '0 6px',
                                                    fontWeight: 600
                                                  }}
                                                >
                                                  DM care plan
                                                </span>
                                              </span>
                                              <span>+ medication reconciliation</span>
                                            </motion.span>
                                          </motion.div>
                                        </div>
                                      </motion.div>
                                    ) : (
                                      <div className="text-xs text-[#70a2bc] opacity-50">1.4</div>
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
                
                {/* AUTOMATED CLINICAL WORKFLOWS - Step 3 with Sticky Adaline Animation */}
                {activeStep === 2 && (
                  <motion.div
                    className="w-full h-full sticky top-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Step 3.1 - EHR Integration (currentSubItem === 1) */}
                    {currentSubItem === 1 ? (
                    <div 
                      className="relative w-full h-full overflow-hidden"
                      style={{ 
                        background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
                        minHeight: '100vh'
                      }}
                    >
                      {/* Main Container with Transform */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          style={{
                            transform: `translate(0vw, ${10 - scrollProgressValue * 20}vh) scale(${0.8 + scrollProgressValue * 0.2})`,
                            transition: 'transform 0.5s ease-out'
                          }}
                        >
                          <div 
                            className="relative mx-auto"
                            style={{ 
                              maxWidth: '472px',
                              perspective: '1000px'
                            }}
                          >
                            {/* Grid System */}
                            <div className="absolute inset-0 pointer-events-none">
                              {/* Vertical Grid Lines */}
                              <svg className="absolute left-0 top-1/2 -translate-y-1/2" width="2" height="4000" viewBox="0 0 2 4000" fill="none" style={{ opacity: 0.2 }}>
                                <path d="M1 0 V4000" stroke="#264013" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                              </svg>
                              <svg className="absolute right-0 top-1/2 -translate-y-1/2" width="2" height="4000" viewBox="0 0 2 4000" fill="none" style={{ opacity: 0.2 }}>
                                <path d="M1 0 V4000" stroke="#264013" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                              </svg>
                              
                              {/* Horizontal Grid Lines */}
                              <svg className="absolute top-0 left-1/2 -translate-x-1/2" height="2" width="4000" viewBox="0 0 4000 2" fill="none" style={{ opacity: 0.2, width: '200vw' }}>
                                <path d="M0 1 H4000" stroke="#264013" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                              </svg>
                              <svg className="absolute bottom-0 left-1/2 -translate-x-1/2" height="2" width="4000" viewBox="0 0 4000 2" fill="none" style={{ opacity: 0.2, width: '200vw' }}>
                                <path d="M0 1 H4000" stroke="#264013" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
                              </svg>
                            </div>

                            {/* 3D Image Panels Container */}
                            <div 
                              className="relative"
                              style={{ 
                                transformStyle: 'preserve-3d',
                                width: '472px',
                                height: '500px'
                              }}
                            >
                              {/* 8 EHR Vendor Logo Panels - Fast Sequential Animation */}
                              {[
                                {
                                  id: 'epic',
                                  name: 'Epic',
                                  logo: '/logos/epic.png',
                                  width: 200,
                                  height: 120,
                                  x: -250,
                                  y: -150,
                                  z: 200,
                                  delay: 0
                                },
                                {
                                  id: 'cerner',
                                  name: 'Cerner',
                                  logo: '/logos/cerner.png',
                                  width: 180,
                                  height: 100,
                                  x: 250,
                                  y: -150,
                                  z: 150,
                                  delay: 0.05
                                },
                                {
                                  id: 'athenahealth',
                                  name: 'Athenahealth',
                                  logo: '/logos/athenahealth.png',
                                  width: 220,
                                  height: 110,
                                  x: -300,
                                  y: 100,
                                  z: 100,
                                  delay: 0.1
                                },
                                {
                                  id: 'tebra',
                                  name: 'Tebra',
                                  logo: '/logos/tebra.png',
                                  width: 160,
                                  height: 100,
                                  x: 300,
                                  y: 100,
                                  z: 50,
                                  delay: 0.15
                                },
                                {
                                  id: 'nextgen',
                                  name: 'NextGen',
                                  logo: '/logos/nextgene.png',
                                  width: 180,
                                  height: 110,
                                  x: 0,
                                  y: -200,
                                  z: 0,
                                  delay: 0.2
                                },
                                {
                                  id: 'elixir',
                                  name: 'Elixir',
                                  logo: '/logos/elixir.png',
                                  width: 170,
                                  height: 100,
                                  x: 0,
                                  y: 180,
                                  z: -50,
                                  delay: 0.25
                                },
                                {
                                  id: 'curemd',
                                  name: 'CureMD',
                                  logo: '/logos/curemd.png',
                                  width: 150,
                                  height: 90,
                                  x: -200,
                                  y: 0,
                                  z: -100,
                                  delay: 0.3
                                },
                                {
                                  id: 'cerbo',
                                  name: 'Cerbo',
                                  logo: '/logos/cerbo.png',
                                  width: 160,
                                  height: 100,
                                  x: 200,
                                  y: 0,
                                  z: -150,
                                  delay: 0.35
                                }
                              ].map((panel) => {
                                // Calculate panel animation progress
                                const panelProgress = Math.max(0, Math.min(1, (scrollProgressValue - panel.delay) / 0.2));
                                const panelOpacity = panelProgress;
                                const panelTransform = `translate3d(${panel.x}px, ${panel.y}px, ${panel.z}px) scale(${0.5 + panelProgress * 0.5})`;
                                
                                return (
                                  <div
                                    key={panel.id}
                                    className="absolute"
                                    style={{
                                      width: `${panel.width}px`,
                                      height: `${panel.height}px`,
                                      transform: panelTransform,
                                      opacity: panelOpacity,
                                      transition: 'all 0.2s ease-out',
                                      willChange: 'transform, opacity',
                                      left: '50%',
                                      top: '50%',
                                      marginLeft: `-${panel.width / 2}px`,
                                      marginTop: `-${panel.height / 2}px`,
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.transform = `${panelTransform} translateZ(20px) scale(1.05)`;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.transform = panelTransform;
                                    }}
                                  >
                                    <div className="overflow-hidden rounded-lg">
                                      <div 
                                        className="h-full flex items-center justify-center p-4"
                                        style={{
                                          background: 'transparent',
                                          border: 'none',
                                          boxShadow: 'none'
                                        }}
                                      >
                                        {/* Actual Logo Image */}
                                        <img 
                                          src={panel.logo}
                                          alt={panel.name}
                                          className="w-full h-full object-contain"
                                          style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                          }}
                                        />
                                      </div>
                                    </div>
                                    {/* File Label */}
                                    <div className="mt-2 text-center" style={{ fontSize: '12px', color: '#1a202c' }}>
                                      <div>{panel.name} Integration</div>
                                      <div style={{ color: '#677289' }}>Connected</div>
                                    </div>
                                  </div>
                                );
                              })}

                              {/* Central Dynamic Variable Badge */}
                              <div 
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                                style={{ 
                                  opacity: scrollProgressValue > 0.5 ? 1 : 0,
                                  transition: 'opacity 0.5s ease-in-out'
                                }}
                              >
                                <div 
                                  className="inline-flex items-center gap-1 px-2"
                                  style={{
                                    height: '21px',
                                    fontSize: '0.875rem',
                                    lineHeight: '1.25rem',
                                    borderRadius: '4px',
                                    border: '1px solid #9caf88',
                                    backgroundColor: '#f3f4f6',
                                    color: '#9caf88'
                                  }}
                                >
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                    <circle cx="9" cy="9" r="2" />
                                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                  </svg>
                                  <span>35+ EHR Integrations</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    ) : (
                      <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: '100vh' }}>
                        <div style={{ translate: '0vw 10vh', transform: 'scale(0.8)' }}>
                          <div className="text-on-surface-base atlas-product-sm relative w-full" style={{ maxWidth: '569px', opacity: 1, transform: 'none' }}>
                            <div className="left flex w-full justify-stretch" style={{ opacity: 0.5, transform: 'scale(0.95)' }}>
                              <div className="absolute right-0 left-0 flex flex-row justify-between">
                                <div className="relative -z-10 h-0 w-0">
                                  <svg className="absolute top-1/2 h-[200vh] -translate-y-1/2" width="2" viewBox="0 0 2 4000" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.2 }}>
                                    <path d="M1 0 V4000" stroke="#264013" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"></path>
                                  </svg>
                                </div>
                                <div className="relative -z-10 h-0 w-0">
                                  <svg className="absolute top-1/2 h-[200vh] -translate-y-1/2" width="2" viewBox="0 0 2 4000" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.2 }}>
                                    <path d="M1 0 V4000" stroke="#264013" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"></path>
                                  </svg>
                                </div>
                              </div>
                              <div className="absolute top-0 bottom-0 flex flex-col justify-between">
                                <div className="relative h-0 w-full">
                                  <svg className="absolute left-1/2 w-[200vw] min-w-[4000px] -translate-x-1/2" height="2" viewBox="0 0 4000 2" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.2 }}>
                                    <path d="M0 1 H4000" stroke="#264013" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"></path>
                                  </svg>
                                </div>
                                <div className="relative h-0 w-full">
                                  <svg className="absolute left-1/2 w-[200vw] min-w-[4000px] -translate-x-1/2" height="2" viewBox="0 0 4000 2" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.2 }}>
                                    <path d="M0 1 H4000" stroke="#264013" strokeWidth="1" strokeDasharray="4 4" vectorEffect="non-scaling-stroke"></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="bg-white border border-gray-200 z-30 flex h-fit flex-col items-start justify-start rounded-lg py-2 shadow-lg absolute top-[27.5%] w-full opacity-30" style={{ opacity: 1, transform: 'none' }}>
                              <div className="flex h-fit w-full flex-col items-end justify-start gap-2 px-2">
                                <div className="flex h-fit w-full flex-row items-start justify-start gap-1">
                                  <div className="flex h-fit w-fit flex-row items-center justify-start">
                                    <div className="bg-green-100 flex h-6 w-6 flex-row items-center justify-center rounded-md">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 size-4">
                                        <path d="M7 10v12"></path>
                                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path>
                                      </svg>
                                    </div>
                                    <div className="flex h-6 w-6 flex-row items-center justify-center rounded-md">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 size-4">
                                        <path d="M17 14V2"></path>
                                        <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"></path>
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="flex h-fit w-full flex-row items-center justify-start">
                                    <span className="text-sm text-gray-800 block">
                                      The response correctly identified the user&apos;s intent.
                                      <span className="border-r-green-500 border-r-2" style={{ opacity: 0.778998 }}></span>
                                    </span>
                                  </div>
                                </div>
                                <div className="flex h-fit w-full flex-row items-center justify-between gap-2 pl-1.5">
                                  <span className="text-xs text-gray-500 block">Press &quot;esc&quot; to dismiss</span>
                                  <div className="flex h-fit w-fit flex-row items-center justify-start gap-2">
                                    <div className="flex h-fit w-fit flex-col items-start justify-start gap-1">
                                      <div className="bg-gray-100 flex h-6 w-fit flex-row items-center justify-start gap-1 rounded-md px-2 py-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 size-3.5">
                                          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                                          <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
                                          <path d="M3 12A9 3 0 0 0 21 12"></path>
                                        </svg>
                                        <span className="text-xs text-gray-700 block font-bold tracking-wider">Test Cases</span>
                                      </div>
                                    </div>
                                    <div className="bg-[#9caf88] flex h-6 w-fit flex-row items-center justify-center gap-1 rounded-md px-1.5 shadow-md">
                                      <span className="text-sm text-white block font-bold">Save</span>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white size-3.5">
                                        <polyline points="9 10 4 15 9 20"></polyline>
                                        <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
                
                {/* Clear Evidence Visualization - Step 4 */}
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
