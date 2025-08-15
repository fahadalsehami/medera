"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function FooterSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate visibility and scroll progress
        if (rect.top < windowHeight && rect.bottom > 0) {
          setIsVisible(true);
          const progress = Math.min(1, Math.max(0, (windowHeight - rect.top) / windowHeight));
          setScrollProgress(progress);
        } else {
          setIsVisible(false);
          setScrollProgress(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate stars for the background
  const generateStars = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 2,
    }));
  };

  const stars = generateStars(150);

  return (
    <footer ref={footerRef} className="relative min-h-screen overflow-hidden">
      {/* Animated starfield background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-blue-900/40 to-green-900/60">
        {/* Stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Hero section with scroll-triggered animation */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div 
            className="text-center transform transition-all duration-1000 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 50}px) scale(${0.8 + scrollProgress * 0.2})`,
            }}
          >
            {/* Animated title with typewriter effect */}
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white"
              style={{
                opacity: scrollProgress > 0.3 ? 1 : 0,
                transform: `translateY(${scrollProgress > 0.3 ? 0 : 30}px)`,
                transition: 'all 0.8s ease-out',
              }}
            >
              Start your journey
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                with Medera
              </span>
            </h1>

            {/* CTA Button with delayed animation */}
            <div
              style={{
                opacity: scrollProgress > 0.6 ? 1 : 0,
                transform: `translateY(${scrollProgress > 0.6 ? 0 : 20}px)`,
                transition: 'all 0.6s ease-out 0.3s',
              }}
            >
              <Button 
                size="lg" 
                asChild 
                className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-medium rounded-full border-2 border-white/20 backdrop-blur-sm"
              >
                <Link href="#">START FOR FREE</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Interface overlay animation (appears during scroll) */}
        {scrollProgress > 0.4 && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: Math.min(1, (scrollProgress - 0.4) * 2),
              transform: `scale(${0.9 + scrollProgress * 0.1})`,
            }}
          >
            {/* Mock interface elements */}
            <div className="absolute top-1/4 left-8 md:left-16 bg-gray-900/80 backdrop-blur-md rounded-lg border border-white/10 p-4 max-w-sm">
              <div className="text-white text-sm mb-2">Production Status</div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-xs">API calls: 200M+ per day</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-blue-400 text-xs">Uptime: 99.998%</span>
              </div>
            </div>

            <div className="absolute top-1/3 right-8 md:right-16 bg-gray-900/80 backdrop-blur-md rounded-lg border border-white/10 p-4 max-w-sm">
              <div className="text-white text-sm mb-2">Active Models</div>
              <div className="space-y-1">
                <div className="text-xs text-gray-300">GPT-4 • Claude-3 • Gemini</div>
                <div className="text-xs text-gray-300">LLaMA-2 • Mistral • PaLM</div>
                <div className="text-xs text-green-400">300+ models available</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer links section */}
        <div 
          className="relative mt-auto"
          style={{
            opacity: scrollProgress > 0.8 ? 1 : 0,
            transform: `translateY(${scrollProgress > 0.8 ? 0 : 40}px)`,
            transition: 'all 0.6s ease-out',
          }}
        >
          {/* Dark background for footer */}
          <div className="bg-black/90 backdrop-blur-sm border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-12">
              {/* Logo section */}
              <div className="flex items-center mb-8">
                <Icons.logo className="size-8 mr-3" />
                <span className="text-white text-xl font-bold">Medera</span>
              </div>

              {/* Footer links grid */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
                {/* Pillars */}
                <div>
                  <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Pillars</h3>
                  <ul className="space-y-2">
                    <li><Link href="/iterate" className="text-gray-400 hover:text-white text-sm transition-colors">Iterate</Link></li>
                    <li><Link href="/evaluate" className="text-gray-400 hover:text-white text-sm transition-colors">Evaluate</Link></li>
                    <li><Link href="/deploy" className="text-gray-400 hover:text-white text-sm transition-colors">Deploy</Link></li>
                    <li><Link href="/monitor" className="text-gray-400 hover:text-white text-sm transition-colors">Monitor</Link></li>
                  </ul>
                </div>

                {/* Products */}
                <div>
                  <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Products</h3>
                  <ul className="space-y-2">
                    <li><Link href="/editor" className="text-gray-400 hover:text-white text-sm transition-colors">Editor</Link></li>
                    <li><Link href="/playground" className="text-gray-400 hover:text-white text-sm transition-colors">Playground</Link></li>
                    <li><Link href="/evaluations" className="text-gray-400 hover:text-white text-sm transition-colors">Evaluations</Link></li>
                    <li><Link href="/datasets" className="text-gray-400 hover:text-white text-sm transition-colors">Datasets</Link></li>
                    <li><Link href="/deployments" className="text-gray-400 hover:text-white text-sm transition-colors">Deployments</Link></li>
                    <li><Link href="/logs" className="text-gray-400 hover:text-white text-sm transition-colors">Logs</Link></li>
                    <li><Link href="/analytics" className="text-gray-400 hover:text-white text-sm transition-colors">Analytics</Link></li>
                    <li><Link href="https://github.com/mederainc/gateway" className="text-gray-400 hover:text-white text-sm transition-colors">Gateway</Link></li>
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Company</h3>
                  <ul className="space-y-2">
                    <li><Link href="https://labs.medera.ai" className="text-gray-400 hover:text-white text-sm transition-colors">Labs</Link></li>
                    <li><Link href="https://mederaapplied.com" className="text-gray-400 hover:text-white text-sm transition-colors">Applied</Link></li>
                    <li><Link href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</Link></li>
                    <li><Link href="/blog" className="text-gray-400 hover:text-white text-sm transition-colors">Blog</Link></li>
                    <li><Link href="/careers" className="text-gray-400 hover:text-white text-sm transition-colors">Careers</Link></li>
                    <li><Link href="/get-started" className="text-gray-400 hover:text-white text-sm transition-colors">Book a Demo</Link></li>
                    <li><Link href="https://en.wikipedia.org/wiki/ADALINE" className="text-gray-400 hover:text-white text-sm transition-colors">Wikipedia</Link></li>
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Resources</h3>
                  <ul className="space-y-2">
                    <li><Link href="/docs" className="text-gray-400 hover:text-white text-sm transition-colors">Documentation</Link></li>
                    <li><Link href="/docs/api-reference/overview" className="text-gray-400 hover:text-white text-sm transition-colors">API Reference</Link></li>
                    <li><Link href="/dpa" className="text-gray-400 hover:text-white text-sm transition-colors">DPA</Link></li>
                    <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link></li>
                    <li><Link href="/vulnerability" className="text-gray-400 hover:text-white text-sm transition-colors">Report vulnerability</Link></li>
                  </ul>
                </div>

                {/* Connect */}
                <div>
                  <h3 className="text-white font-medium mb-4 text-sm uppercase tracking-wider">Connect</h3>
                  <ul className="space-y-2">
                    <li><Link href="https://github.com/mederainc" className="text-gray-400 hover:text-white text-sm transition-colors">Github</Link></li>
                    <li><Link href="https://x.com/mederainc" className="text-gray-400 hover:text-white text-sm transition-colors">X (Twitter)</Link></li>
                    <li><Link href="https://www.linkedin.com/company/mederainc" className="text-gray-400 hover:text-white text-sm transition-colors">LinkedIn</Link></li>
                    <li><Link href="https://www.youtube.com/@mederaai" className="text-gray-400 hover:text-white text-sm transition-colors">YouTube</Link></li>
                  </ul>
                </div>
              </div>

              {/* Bottom copyright */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/10">
                <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors mb-4 sm:mb-0">
                  Medera Homepage
                </Link>
                <p className="text-gray-400 text-sm">
                  © 2025 Medera. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}