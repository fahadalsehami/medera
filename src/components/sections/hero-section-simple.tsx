"use client";

import { motion } from "framer-motion";

// EMR company logos for trust section
const companies = [
  { name: "Epic", logo: "/epic-logo.svg" },
  { name: "Athenahealth", logo: "/athenahealth.png" },
  { name: "Tebra", logo: "/tebra.png" },
];

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/bg-01.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 z-10" />
      
      {/* Content */}
      <div className="relative z-20 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#2f2f2f] leading-tight tracking-tight mb-8"
        >
          Agentic AI Orchestration for<br />
          Behavioral Health Assessment
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm text-[#6c757d] mb-6 tracking-wide font-medium uppercase"
        >
          CLINICIAN-BUILT. PROFESSIONAL-TRUSTED. WORKFLOW-READY.
        </motion.p>
        
        {/* EMR Logos */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          {companies.map((company) => (
            <div key={company.name} className="flex items-center">
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
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Spacer for scroll */}
      <div className="absolute bottom-0 left-0 w-full h-screen" />
    </section>
  );
}