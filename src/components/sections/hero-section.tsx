"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";

// Company logos for trust section
const companies = [
  { name: "HubSpot", logo: "HUBSPOT" },
  { name: "Databrook", logo: "DATABROOK" },
  { name: "Carvana", logo: "CARVANA" },
  { name: "Microsoft", logo: "MICROSOFT" },
  { name: "OpenAI", logo: "OPENAI" },
  { name: "Google", logo: "GOOGLE" },
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
    [0, 0.99, 1], 
    [1, 1, 0]
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


  // PHASE 3: Product animates - starts full screen, fits 100% perfect monitor screen
  const productImageOpacity = useTransform(
    scrollYProgress, 
    [0.45, 0.55, 0.85, 1], 
    [0, 1, 1, 1]
  );
  
  const productImageScale = useTransform(
    scrollYProgress, 
    [0.45, 0.55, 0.70, 0.85, 1], 
    [1.0, 0.8, 0.43, 0.43, 0.43]
  );
  
  const productImageX = useTransform(
    scrollYProgress, 
    [0.45, 0.55, 0.70, 0.85, 1], 
    ["0%", "0%", "0%", "0%", "0%"]
  );
  
  const productImageY = useTransform(
    scrollYProgress, 
    [0.45, 0.55, 0.70, 0.85, 1], 
    ["0%", "0%", "5%", "5%", "5%"]
  );

  // Auto-animated scrolling logos state
  const [visibleLogos, setVisibleLogos] = useState<Array<{company: typeof companies[0], id: number}>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLogos(prev => {
        const newLogos = [...prev];
        
        // Add new logo from right
        if (Math.random() > 0.7) { // 30% chance to add new logo
          const randomCompany = companies[Math.floor(Math.random() * companies.length)];
          newLogos.push({
            company: randomCompany,
            id: Date.now() + Math.random()
          });
        }
        
        // Remove old logos that have moved off screen
        return newLogos.filter((_, index) => index < 5);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* True Sticky Hero Section - FIXED in place, only content animates */}
      <motion.section 
        ref={ref}
        className="fixed top-0 left-0 h-screen w-screen bg-white overflow-hidden"
        style={{ zIndex: 10, marginLeft: 0, marginRight: 0, opacity: sectionOpacity }}
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-black leading-tight tracking-tight">
              The single platform to iterate,{" "}
              <br />
              evaluate, deploy, and monitor LLMs
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
            <p className="text-sm text-gray-600 mb-8 tracking-wide font-medium">
              TRUSTED BY
            </p>
            
            {/* Static Company Logos */}
            <div className="flex justify-center items-center space-x-12 mb-12">
              {companies.slice(0, 3).map((company, index) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-gray-700 font-medium text-sm tracking-wider"
                >
                  {company.logo}
                </motion.div>
              ))}
            </div>

            {/* Auto-Animated Scrolling Icons */}
            <div className="relative h-12 overflow-hidden">
              <div className="absolute inset-0 flex items-center">
                {visibleLogos.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ 
                      x: "100vw", 
                      opacity: 0 
                    }}
                    animate={{ 
                      x: `-${100 + (index * 200)}px`, 
                      opacity: [0, 1, 1, 0] 
                    }}
                    transition={{ 
                      duration: 8,
                      ease: "linear",
                      opacity: {
                        times: [0, 0.1, 0.9, 1],
                        duration: 8
                      }
                    }}
                    className="absolute whitespace-nowrap text-gray-500 font-medium text-xs tracking-widest"
                    style={{
                      left: `${index * 200}px`
                    }}
                  >
                    {item.company.logo}
                  </motion.div>
                ))}
              </div>
              
              {/* Fade gradients */}
              <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
              <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Scroll Container - This creates the scroll area that triggers animations */}
      <div 
        ref={scrollContainerRef}
        className="h-[800vh] w-screen relative"
        style={{ marginLeft: 0, marginRight: 0 }}
      >
        {/* Invisible scroll trigger */}
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