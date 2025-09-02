"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { useState, useRef } from "react";

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
    name: "CARE FUSION",
    subtitle: "Unified Medical + Mental Health",
    href: "#care-fusion",
    description: "Seamlessly integrate behavioral health detection into routine medical visits",
    features: ["Multi-Modal Clinical Intelligence", "Condition-Specific Protocols", "Real-time Voice Analysis"],
    icon: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg width="200" height="160" viewBox="0 0 200 160" fill="none" className="opacity-30 group-hover:opacity-100 transition-all duration-700">
          {/* Medical cross merging with brain/mind circles */}
          <g className="transform translate-x-2 translate-y-2">
            {/* Medical cross */}
            <rect x="85" y="40" width="30" height="80" rx="4" fill="none" stroke="#70a2bc" strokeWidth="3"/>
            <rect x="60" y="65" width="80" height="30" rx="4" fill="none" stroke="#70a2bc" strokeWidth="3"/>
            
            {/* Mind/therapy circles overlapping */}
            <circle cx="100" cy="80" r="35" fill="none" stroke="#5a8ca6" strokeWidth="2" opacity="0.6" className="animate-pulse"/>
            <circle cx="85" cy="70" r="20" fill="none" stroke="#5a8ca6" strokeWidth="2" opacity="0.5"/>
            <circle cx="115" cy="90" r="20" fill="none" stroke="#5a8ca6" strokeWidth="2" opacity="0.5"/>
            
            {/* Fusion energy lines */}
            <path d="M100 45 L100 115" stroke="#9caf88" strokeWidth="2" opacity="0.7" strokeDasharray="4 4" className="animate-pulse"/>
            <path d="M65 80 L135 80" stroke="#9caf88" strokeWidth="2" opacity="0.7" strokeDasharray="4 4" className="animate-pulse"/>
            
            {/* Central fusion point */}
            <circle cx="100" cy="80" r="8" fill="#70a2bc" className="animate-bounce"/>
          </g>
          
          {/* Floating data points */}
          <g className="opacity-60">
            <circle cx="40" cy="40" r="3" fill="#70a2bc"/>
            <circle cx="160" cy="120" r="3" fill="#70a2bc"/>
            <circle cx="30" cy="100" r="3" fill="#5a8ca6"/>
            <circle cx="170" cy="50" r="3" fill="#5a8ca6"/>
          </g>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
      </div>
    ),
  },
  {
    name: "SMART BUNDLING",
    subtitle: "Cross-Condition Code Optimization",
    href: "#smart-bundling",
    description: "Bundle mental health with medical diagnoses for maximum reimbursement",
    features: ["Medical + Mental Health Codes", "Risk-Stratified Clustering", "Automated Billing Optimization"],
    icon: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg width="200" height="160" viewBox="0 0 200 160" fill="none" className="opacity-30 group-hover:opacity-100 transition-all duration-700">
          {/* Bundled cubes representing code grouping */}
          <g className="transform translate-x-5">
            {/* Main bundle group */}
            <rect x="50" y="50" width="40" height="40" rx="4" fill="none" stroke="#7B1FA2" strokeWidth="3"/>
            <rect x="60" y="60" width="40" height="40" rx="4" fill="none" stroke="#7B1FA2" strokeWidth="3"/>
            <rect x="70" y="70" width="40" height="40" rx="4" fill="none" stroke="#7B1FA2" strokeWidth="3"/>
            
            {/* Secondary bundle */}
            <rect x="100" y="45" width="35" height="35" rx="4" fill="none" stroke="#9c27b0" strokeWidth="2" opacity="0.7"/>
            <rect x="110" y="55" width="35" height="35" rx="4" fill="none" stroke="#9c27b0" strokeWidth="2" opacity="0.7"/>
            
            {/* Connection links */}
            <path d="M90 80 L100 75" stroke="#7B1FA2" strokeWidth="2" opacity="0.6"/>
            <path d="M110 90 L120 85" stroke="#7B1FA2" strokeWidth="2" opacity="0.6"/>
            
            {/* Dollar signs for billing */}
            <text x="75" y="85" fill="#9caf88" fontSize="16" fontWeight="bold" opacity="0.8">$</text>
            <text x="115" y="75" fill="#9caf88" fontSize="14" fontWeight="bold" opacity="0.7">$</text>
            
            {/* Optimization arrows */}
            <path d="M130 100 L145 85 L145 100 Z" fill="#7B1FA2" opacity="0.6" className="animate-pulse"/>
          </g>
          
          {/* Floating optimization indicators */}
          <g className="opacity-50">
            <circle cx="35" cy="45" r="4" fill="#7B1FA2"/>
            <circle cx="165" cy="105" r="4" fill="#9c27b0"/>
            <rect x="150" y="40" width="8" height="8" rx="2" fill="#7B1FA2"/>
          </g>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
      </div>
    ),
  },
  {
    name: "AUTO ACTIONS",
    subtitle: "One-Click Behavioral Orders",
    href: "#auto-actions",
    description: "Instantly generate referrals and safety protocols when mental health flags detected",
    features: ["AI-Generated Treatment Orders", "Automated Safety Protocols", "Crisis Intervention Workflows"],
    icon: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg width="200" height="160" viewBox="0 0 200 160" fill="none" className="opacity-30 group-hover:opacity-100 transition-all duration-700">
          {/* Lightning bolt for instant actions */}
          <g className="transform translate-x-10">
            <path d="M90 30 L70 70 L85 70 L75 110 L120 60 L95 60 L110 30 Z" 
                  fill="none" stroke="#f57c00" strokeWidth="3" className="animate-pulse"/>
            <path d="M90 30 L70 70 L85 70 L75 110 L120 60 L95 60 L110 30 Z" 
                  fill="#f57c00" opacity="0.2"/>
            
            {/* Action ripples */}
            <circle cx="95" cy="70" r="25" fill="none" stroke="#ff9800" strokeWidth="2" opacity="0.4" className="animate-ping"/>
            <circle cx="95" cy="70" r="35" fill="none" stroke="#ff9800" strokeWidth="1" opacity="0.3" className="animate-ping" style={{animationDelay: '0.5s'}}/>
            <circle cx="95" cy="70" r="45" fill="none" stroke="#ff9800" strokeWidth="1" opacity="0.2" className="animate-ping" style={{animationDelay: '1s'}}/>
            
            {/* Quick action indicators */}
            <g className="opacity-70">
              <rect x="130" y="55" width="25" height="3" rx="1.5" fill="#f57c00"/>
              <rect x="130" y="62" width="30" height="3" rx="1.5" fill="#f57c00"/>
              <rect x="130" y="69" width="20" height="3" rx="1.5" fill="#f57c00"/>
            </g>
          </g>
          
          {/* Speed lines */}
          <g className="opacity-40">
            <rect x="30" y="65" width="15" height="2" rx="1" fill="#ff9800"/>
            <rect x="25" y="72" width="12" height="2" rx="1" fill="#ff9800"/>
            <rect x="35" y="79" width="10" height="2" rx="1" fill="#ff9800"/>
          </g>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
      </div>
    ),
  },
  {
    name: "CLEAR EVIDENCE",
    subtitle: "Explainable AI Detection",
    href: "#clear-evidence",
    description: "Visual evidence showing exactly why AI flagged mental health concerns",
    features: ["Source-Linked Clinical Insights", "Provider-Friendly Explanations", "Timestamped Evidence"],
    icon: (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg width="200" height="160" viewBox="0 0 200 160" fill="none" className="opacity-30 group-hover:opacity-100 transition-all duration-700">
          {/* Magnifying glass examining data */}
          <g className="transform translate-x-5 translate-y-5">
            {/* Magnifying glass */}
            <circle cx="80" cy="70" r="30" fill="none" stroke="#4caf50" strokeWidth="3"/>
            <line x1="100" y1="90" x2="125" y2="115" stroke="#4caf50" strokeWidth="4" strokeLinecap="round"/>
            
            {/* Evidence points inside magnifying glass */}
            <g className="opacity-80">
              <circle cx="70" cy="65" r="3" fill="#66bb6a"/>
              <circle cx="80" cy="70" r="3" fill="#66bb6a"/>
              <circle cx="85" cy="75" r="3" fill="#66bb6a"/>
              <line x1="70" y1="65" x2="80" y2="70" stroke="#66bb6a" strokeWidth="1" opacity="0.5"/>
              <line x1="80" y1="70" x2="85" y2="75" stroke="#66bb6a" strokeWidth="1" opacity="0.5"/>
            </g>
            
            {/* Document with evidence markers */}
            <rect x="110" y="40" width="50" height="65" rx="3" fill="none" stroke="#4caf50" strokeWidth="2" opacity="0.6"/>
            <g className="opacity-70">
              <rect x="118" y="50" width="20" height="2" rx="1" fill="#4caf50"/>
              <rect x="118" y="56" width="25" height="2" rx="1" fill="#4caf50"/>
              <rect x="118" y="62" width="15" height="2" rx="1" fill="#81c784"/>
              <rect x="118" y="68" width="22" height="2" rx="1" fill="#4caf50"/>
              <rect x="118" y="74" width="18" height="2" rx="1" fill="#81c784"/>
              
              {/* Highlight box */}
              <rect x="115" y="60" width="35" height="8" rx="1" fill="#4caf50" opacity="0.2"/>
            </g>
            
            {/* Check marks for validation */}
            <g className="opacity-60">
              <path d="M145 85 L148 88 L153 83" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M145 93 L148 96 L153 91" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </g>
          
          {/* Floating evidence particles */}
          <g className="opacity-50">
            <circle cx="35" cy="35" r="2" fill="#66bb6a" className="animate-pulse"/>
            <circle cx="165" cy="100" r="2" fill="#66bb6a" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
            <circle cx="30" cy="95" r="2" fill="#81c784" className="animate-pulse" style={{animationDelay: '1s'}}/>
          </g>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
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
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (itemName: string) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (navs.find(nav => nav.name === itemName)?.hasDropdown) {
      setActiveDropdown(itemName);
    }
  };

  const handleMouseLeave = () => {
    // Set a timeout to close the dropdown
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredProduct(null);
    }, 100);
  };

  const handleDropdownMouseEnter = () => {
    // Clear timeout when entering dropdown
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
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
            <div 
              className={`flex items-center space-x-1 cursor-pointer text-sm font-medium transition-colors duration-200 ${
                activeItem === item.name 
                  ? 'text-[#70a2bc]' 
                  : 'text-primary/80 hover:text-[#70a2bc]'
              }`}
              onClick={() => {
                if (item.href) {
                  setActiveItem(item.name);
                  const element = document.getElementById(item.href.substring(1));
                  element?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
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
                    <div className="relative z-10 py-12 px-8">
                      <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 gap-8">
                        {item.products?.map((product, index) => (
                          <motion.a
                            key={product.name}
                            href={product.href}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`group relative p-6 rounded-xl transition-all duration-500 border border-transparent hover:border-border/30 hover:bg-accent/10 ${
                              hoveredProduct && hoveredProduct !== product.name ? 'opacity-40' : 'opacity-100'
                            }`}
                            onMouseEnter={() => handleProductHover(product.name)}
                            onMouseLeave={handleProductLeave}
                          >
                            {/* Abstract illustration area */}
                            <div className="mb-6 relative overflow-hidden rounded-lg h-32 flex items-center justify-center bg-gradient-to-br from-gray-50 to-transparent">
                              {product.icon}
                            </div>
                            
                            {/* Content */}
                            <div className="space-y-2">
                              <div className="space-y-1">
                                <div className="text-[10px] font-medium text-primary/40 uppercase tracking-wider">
                                  {product.subtitle}
                                </div>
                                <h3 className="text-lg font-bold text-primary group-hover:text-[#70a2bc] transition-colors">
                                  {product.name}
                                </h3>
                                <p className="text-sm text-primary/60 leading-relaxed line-clamp-2">
                                  {product.description}
                                </p>
                              </div>
                              
                              {/* Features list - compact */}
                              <div className="flex flex-wrap gap-2 pt-2">
                                {product.features.slice(0, 2).map((feature, idx) => (
                                  <div key={idx} className="text-[10px] text-primary/50 bg-gray-50 px-2 py-1 rounded">
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