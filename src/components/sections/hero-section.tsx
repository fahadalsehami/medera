"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// EMR company logos for trust section
const companies = [
  { name: "Epic", logo: "/epic-logo.svg" },
  { name: "Athenahealth", logo: "/athenahealth.png" },
  { name: "Tebra", logo: "/tebra.png" },
];

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Optimized scroll range for proper animation speed (8x viewport height)
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end start"]
  });

  // Control when the fixed section should hide
  const sectionOpacity = useTransform(
    scrollYProgress, 
    [0, 0.98, 1], 
    [1, 1, 0]
  );
  
  const sectionPointerEvents = useTransform(
    scrollYProgress,
    [0, 0.98, 1],
    ['auto', 'auto', 'none']
  );

  // PHASE 1: Background zoom in + title/trust fade out completely (0% -> 35%)
  const phase1BackgroundScale = useTransform(
    scrollYProgress, 
    [0, 0.35], 
    [1, 2.5]
  );
  

  // Text elements - complete fade out early
  const titleOpacity = useTransform(
    scrollYProgress, 
    [0, 0.15, 0.3], 
    [1, 0.3, 0]
  );
  
  const titleY = useTransform(
    scrollYProgress, 
    [0, 0.3], 
    ["0%", "-100%"]
  );
  
  const titleScale = useTransform(
    scrollYProgress, 
    [0, 0.3], 
    [1, 0.6]
  );

  const trustOpacity = useTransform(
    scrollYProgress, 
    [0, 0.1, 0.25], 
    [1, 0.5, 0]
  );
  
  const trustY = useTransform(
    scrollYProgress, 
    [0, 0.25], 
    ["0%", "-80%"]
  );


  // PHASE 3: Product animates - starts full screen, fits monitor, then fades before next section
  const productImageOpacity = useTransform(
    scrollYProgress, 
    [0.45, 0.55, 0.85, 0.95, 1], 
    [0, 1, 1, 0.3, 0]  // Fades out from 95% to 100% to avoid overlap
  );
  
  const productImageScale = useTransform(
    scrollYProgress, 
    [0.45, 0.55, 0.70, 0.85, 0.95, 1], 
    [1.0, 0.8, 0.43, 0.43, 0.43, 0.4]  // Slight scale down at end
  );
  
  const productImageX = useTransform(
    scrollYProgress, 
    [0.45, 0.55, 0.70, 0.85, 1], 
    ["0%", "0%", "0%", "0%", "0%"]
  );
  
  const productImageY = useTransform(
    scrollYProgress, 
    [0.45, 0.55, 0.70, 0.85, 0.95, 1], 
    ["0%", "0%", "5%", "5%", "5%", "-10%"]  // Moves up slightly at end
  );


  return (
    <>
      {/* True Sticky Hero Section - FIXED in place, only content animates */}
      <motion.section 
        ref={ref}
        className="fixed top-0 left-0 h-screen w-full overflow-hidden"
        style={{ 
          backgroundColor: '#f5f9fb', 
          zIndex: 30, 
          opacity: sectionOpacity,
          pointerEvents: sectionPointerEvents as any
        }}
      >
        {/* PHASE 1 & 2: Original Background with Zoom and Fade */}
        <motion.div 
          style={{
            scale: phase1BackgroundScale,
            opacity: useTransform(
              scrollYProgress, 
              [0, 0.35, 0.5], 
              [1, 0.8, 0]
            ),
          }}
          className="absolute inset-0 -z-10"
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/bg-01.webp')",
              transform: "scale(1.1)", // Prevent edge artifacts
            }}
          />
          
          {/* Progressive overlay */}
          <motion.div 
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.3], [0.1, 0.4])
            }}
            className="absolute inset-0 bg-black/20"
          />
        </motion.div>


        {/* PHASE 3: Product Interface - Starts full screen, zooms to fit monitor */}
        <motion.div 
          style={{
            opacity: productImageOpacity,
            scale: productImageScale,
            x: productImageX,
            y: productImageY,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/hero-product-shot.webp')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
          
          {/* Subtle glow effect around product */}
          <motion.div 
            style={{
              opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 0.3])
            }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 blur-3xl"
          />
        </motion.div>

        {/* Hero Content - Fades out completely in Phase 1 */}
        <div className="relative h-full w-full flex flex-col justify-center items-center">
          {/* Main Title */}
          <motion.div 
            style={{ 
              opacity: titleOpacity, 
              y: titleY,
              scale: titleScale 
            }}
            className="text-center w-full px-0 mb-16"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#2f2f2f] leading-tight tracking-tight">
              Agentic AI Orchestration for{" "}
              <br />
              Behavioral Health Assessment
            </h1>
          </motion.div>

          {/* Trust By Section */}
          <motion.div 
            style={{ 
              opacity: trustOpacity, 
              y: trustY 
            }}
            className="text-center w-full px-0"
          >
            <p className="text-sm text-[#6c757d] mb-4 tracking-wide font-medium uppercase">
              CLINICIAN-BUILT. PROFESSIONAL-TRUSTED. WORKFLOW-READY.
            </p>
            
            {/* Static EMR Logos - Minimalistic and centered */}
            <div className="flex items-center justify-center gap-4">
              {companies.map((company, index) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className={`w-auto object-contain opacity-70 hover:opacity-90 transition-opacity ${
                      company.name === 'Epic' ? 'h-10' : 'h-20'
                    }`}
                    style={{ 
                      filter: 'grayscale(100%) brightness(0.4) contrast(1.1)',
                      maxHeight: company.name === 'Epic' ? '40px' : '80px'
                    }}
                  />
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </motion.section>

      {/* Scroll Container - This creates the scroll area that triggers animations */}
      <div 
        ref={scrollContainerRef}
        className="h-[800vh] w-full relative"
      >
        {/* Invisible scroll trigger - this creates the actual scroll space */}
      </div>

      {/* Enhanced CSS for multi-phase animations */}
      <style jsx>{`
        @supports (animation-timeline: scroll()) {
          .multi-phase-zoom {
            animation: multi-phase-scroll linear both;
            animation-timeline: scroll();
            animation-range: 0 800vh;
          }
          
          @keyframes multi-phase-scroll {
            0% { transform: scale(1); opacity: 1; }
            35% { transform: scale(2.5); opacity: 0.8; }
            50% { opacity: 0; }
            55% { opacity: 0; }
            100% { opacity: 0; }
          }
        }
        
        /* Smooth hardware acceleration */
        * {
          scroll-behavior: smooth;
        }
        
        /* Optimize for performance */
        section {
          will-change: transform, opacity;
        }
      `}</style>
    </>
  );
}