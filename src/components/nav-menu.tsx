"use client";

import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface ProductItem {
  name: string;
  href: string;
  description: string;
  subtitle: string;
  features: string[];
  icon: React.ReactNode;
}

interface NavItem {
  name: string;
  href?: string;
  hasDropdown?: boolean;
  products?: ProductItem[];
}

const products: ProductItem[] = [
  {
    name: "AI CO-THERAPY",
    subtitle: "Sketch, test and refine",
    href: "#ai-co-therapy",
    description: "Advanced AI-powered co-therapy solutions for mental health professionals",
    features: ["Therapy Editor", "Patient Analytics", "Session Reports"],
    icon: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg width="200" height="160" viewBox="0 0 200 160" fill="none" className="opacity-30 group-hover:opacity-100 transition-all duration-700">
          {/* Large abstract interconnected circles representing therapy connections - scaled up */}
          <circle cx="50" cy="55" r="35" fill="none" stroke="#1976D2" strokeWidth="3" className="animate-pulse"/>
          <circle cx="120" cy="40" r="25" fill="none" stroke="#1976D2" strokeWidth="3"/>
          <circle cx="150" cy="85" r="30" fill="none" stroke="#1976D2" strokeWidth="3"/>
          <circle cx="80" cy="105" r="20" fill="none" stroke="#1976D2" strokeWidth="3"/>
          <circle cx="40" cy="25" r="15" fill="none" stroke="#1976D2" strokeWidth="2"/>
          <circle cx="170" cy="50" r="18" fill="none" stroke="#1976D2" strokeWidth="2"/>
          
          {/* Connection lines */}
          <path d="M75 65 L98 50" stroke="#1976D2" strokeWidth="3" opacity="0.7"/>
          <path d="M135 55 L138 70" stroke="#1976D2" strokeWidth="3" opacity="0.7"/>
          <path d="M100 90 L130 95" stroke="#1976D2" strokeWidth="3" opacity="0.7"/>
          <path d="M55 45 L45 35" stroke="#1976D2" strokeWidth="2" opacity="0.5"/>
          <path d="M155 60 L165 55" stroke="#1976D2" strokeWidth="2" opacity="0.5"/>
          
          {/* Central node */}
          <circle cx="100" cy="75" r="12" fill="#1976D2" className="animate-bounce"/>
          
          {/* Plus signs for growth/healing */}
          <g className="opacity-70">
            <path d="M40 50 L40 60 M35 55 L45 55" stroke="#1976D2" strokeWidth="3" strokeLinecap="round"/>
            <path d="M140 75 L140 85 M135 80 L145 80" stroke="#1976D2" strokeWidth="3" strokeLinecap="round"/>
            <path d="M170 30 L170 40 M165 35 L175 35" stroke="#1976D2" strokeWidth="2" strokeLinecap="round"/>
          </g>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
      </div>
    ),
  },
  {
    name: "INTELLIGENT DOCUMENTS",
    subtitle: "Reflect and measure",
    href: "#intelligent-documents",
    description: "Extract and process documents with AI-powered intelligence",
    features: ["Document Parser", "Smart Extraction", "Data Analytics"],
    icon: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg width="200" height="160" viewBox="0 0 200 160" fill="none" className="opacity-30 group-hover:opacity-100 transition-all duration-700">
          {/* Large abstract document layers - scaled up */}
          <rect x="30" y="30" width="90" height="75" rx="8" fill="none" stroke="#7B1FA2" strokeWidth="3" transform="rotate(-8 75 67)"/>
          <rect x="40" y="40" width="90" height="75" rx="8" fill="none" stroke="#7B1FA2" strokeWidth="3" transform="rotate(3 85 77)"/>
          <rect x="50" y="50" width="90" height="75" rx="8" fill="none" stroke="#7B1FA2" strokeWidth="3"/>
          
          {/* Data extraction lines */}
          <g className="opacity-80">
            <rect x="60" y="70" width="30" height="3" rx="1.5" fill="#7B1FA2"/>
            <rect x="60" y="78" width="35" height="3" rx="1.5" fill="#7B1FA2"/>
            <rect x="60" y="86" width="25" height="3" rx="1.5" fill="#7B1FA2"/>
            <rect x="60" y="94" width="32" height="3" rx="1.5" fill="#7B1FA2"/>
            <rect x="60" y="102" width="28" height="3" rx="1.5" fill="#7B1FA2"/>
          </g>
          
          {/* AI processing indicator - larger */}
          <circle cx="140" cy="55" r="20" fill="none" stroke="#7B1FA2" strokeWidth="3" className="animate-spin" style={{animationDuration: '4s'}}/>
          <circle cx="140" cy="55" r="10" fill="#7B1FA2" opacity="0.4"/>
          <circle cx="140" cy="55" r="5" fill="#7B1FA2" className="animate-pulse"/>
          
          {/* Data flow arrows */}
          <g className="opacity-70">
            <path d="M100 75 L110 65 L110 85 Z" fill="#7B1FA2"/>
            <path d="M115 72 L125 62 L125 82 Z" fill="#7B1FA2"/>
            <path d="M130 70 L140 60 L140 80 Z" fill="#7B1FA2"/>
          </g>
          
          {/* Additional geometric elements */}
          <g className="opacity-50">
            <circle cx="35" cy="40" r="8" fill="none" stroke="#7B1FA2" strokeWidth="2"/>
            <circle cx="155" cy="95" r="12" fill="none" stroke="#7B1FA2" strokeWidth="2"/>
          </g>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
      </div>
    ),
  },
];

const navs: NavItem[] = [
  {
    name: "PRODUCTS",
    hasDropdown: true,
    products: products,
  },
  {
    name: "PRICING",
    href: "#pricing",
  },
  {
    name: "BLOG",
    href: "#blog",
  },
];

export function NavMenu() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (itemName: string) => {
    if (navs.find(nav => nav.name === itemName)?.hasDropdown) {
      setActiveDropdown(itemName);
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTimeout(() => {
      if (!isHovering) {
        setActiveDropdown(null);
        setHoveredProduct(null);
      }
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    setIsHovering(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsHovering(false);
    setActiveDropdown(null);
    setHoveredProduct(null);
  };

  const handleProductHover = (productName: string) => {
    setHoveredProduct(productName);
  };

  const handleProductLeave = () => {
    setHoveredProduct(null);
  };

  return (
    <div className="w-full hidden md:block relative">
      <ul className="flex items-center space-x-8">
        {navs.map((item) => (
          <li
            key={item.name}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center space-x-1 cursor-pointer text-sm font-medium text-primary/80 hover:text-primary transition-colors duration-200">
              <span>{item.name}</span>
              {item.hasDropdown && (
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === item.name ? 'rotate-180' : ''
                  }`} 
                />
              )}
            </div>
            
            {/* Dropdown Menu - Full Width Adaline Style */}
            <AnimatePresence>
              {item.hasDropdown && activeDropdown === item.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="fixed top-full left-0 right-0 mt-4 bg-background/98 backdrop-blur-xl border-t border-border/30 shadow-2xl z-50"
                  style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  {/* Main content area with abstract illustrations */}
                  <div className="relative">
                    {/* Background abstract shapes */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/5 to-transparent"></div>
                      <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-secondary/5 to-transparent"></div>
                      <svg className="absolute top-0 right-0 w-full h-full opacity-[0.02]" viewBox="0 0 800 400">
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="1" fill="currentColor"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)"/>
                      </svg>
                    </div>
                    
                    {/* Products Grid */}
                    <div className="relative z-10 py-16 px-8">
                      <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 gap-16">
                        {item.products?.map((product, index) => (
                          <motion.a
                            key={product.name}
                            href={product.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative p-8 rounded-2xl transition-all duration-500 border border-transparent hover:border-border/30 hover:bg-accent/10 ${
                              hoveredProduct && hoveredProduct !== product.name ? 'opacity-40' : 'opacity-100'
                            }`}
                            onMouseEnter={() => handleProductHover(product.name)}
                            onMouseLeave={handleProductLeave}
                          >
                            {/* Abstract illustration area */}
                            <div className="mb-8 relative overflow-hidden rounded-xl h-48 flex items-center justify-center">
                              {product.icon}
                            </div>
                            
                            {/* Content */}
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <div className="text-xs font-medium text-primary/40 uppercase tracking-wider">
                                  {product.subtitle}
                                </div>
                                <h3 className="text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-base text-primary/60 leading-relaxed">
                                  {product.description}
                                </p>
                              </div>
                              
                              {/* Features list */}
                              <div className="space-y-1">
                                {product.features.map((feature, idx) => (
                                  <div key={idx} className="text-xs text-primary/50">
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            {/* Hover effect overlay */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </motion.a>
                        ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </div>
  );
}