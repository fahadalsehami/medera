"use client";

import { Icons } from "@/components/icons";
import { NavMenu } from "@/components/nav-menu";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const INITIAL_WIDTH = "100vw";
const MAX_WIDTH = "100vw";

// Animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 200,
      staggerChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    y: 100,
    transition: { duration: 0.1 },
  },
};

const drawerMenuContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const drawerMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function Navbar() {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = siteConfig.nav.links.map((item) =>
        item.href.substring(1),
      );

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setHasScrolled(latest > 10);
    });
    return unsubscribe;
  }, [scrollY]);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const handleOverlayClick = () => setIsDrawerOpen(false);

  return (
    <header
      className="fixed top-0 z-[100] w-full transition-all duration-300"
    >
      <div
        className={cn(
          "w-full transition-all duration-300",
          hasScrolled
            ? "backdrop-blur-lg"
            : "",
        )}
        style={{ backgroundColor: hasScrolled ? '#f0f5f7ee' : 'transparent' }}
      >
          <div className="flex h-[56px] items-center px-6">
            <div className="flex-1">
              <NavMenu />
            </div>
            
            <div className="flex-1 flex justify-center">
              <Link href="/" className="flex items-center gap-3">
                <Icons.logo className="size-7 md:size-25" />
              </Link>
            </div>

            <div className="flex-1 flex justify-end flex-row items-center gap-3 shrink-0">
              <div className="flex items-center space-x-3">
                {/* WATCH DEMO Button - #70a2bc on hover only */}
                <Link
                  className="h-10 hidden md:flex items-center justify-center text-sm font-medium tracking-wide  bg-transparent text-black hover:text-[#70a2bc] hover:border hover:border-[#70a2bc]/50 hover:bg-[#70a2bc]/5 transition-all duration-200 px-4 gap-2 group"
                  href="#watch-demo"
                >
                  WATCH DEMO
                  <span className="ml-2 flex items-center justify-center w-8 h-8 bg-white/50 rounded-full">
                    <svg className="w-8 h-8" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="12" fill="transparent"/>
                      <polygon points="10,8 16,12 10,16" className="fill-[#2f2f2f] group-hover:fill-[#70a2bc] transition-colors"/>
                    </svg>
                  </span>
                </Link>
                
                {/* CONTACT US Button - Transparent with #70a2bc border */}
                <Link
                  className="h-10 hidden md:flex items-center justify-center text-sm font-medium tracking-wide  bg-transparent text-[#70a2bc] border border-[#70a2bc] hover:bg-[#70a2bc] hover:text-white active:bg-[#70a2bc] active:text-white transition-all duration-200 px-6"
                  href="#start-free"
                >
                  CONTACT US
                </Link>
              </div>
              <button
                className="md:hidden border border-border size-8 rounded-md cursor-pointer flex items-center justify-center"
                onClick={toggleDrawer}
              >
                {isDrawerOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={overlayVariants}
              transition={{ duration: 0.2 }}
              onClick={handleOverlayClick}
            />

            <motion.div
              className="fixed inset-x-0 w-[95%] mx-auto bottom-3 bg-background border border-border p-4 rounded-xl shadow-lg"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
            >
              {/* Mobile menu content */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Link href="/" className="flex items-center gap-3">
                    <Icons.logo className="size-7 md:size-10" />
                  </Link>
                  <button
                    onClick={toggleDrawer}
                    className="border border-border rounded-md p-1 cursor-pointer"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                <motion.ul
                  className="flex flex-col text-sm mb-4 rounded-md"
                  variants={drawerMenuContainerVariants}
                >
                  <AnimatePresence>
                    {siteConfig.nav.links.map((item) => (
                      <motion.li
                        key={item.id}
                        className="p-2.5 last:border-b-0"
                        variants={drawerMenuVariants}
                      >
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById(
                              item.href.substring(1),
                            );
                            element?.scrollIntoView({ behavior: "smooth" });
                            setIsDrawerOpen(false);
                          }}
                          className={`underline-offset-4 hover:text-[#70a2bc] transition-colors ${
                            activeSection === item.href.substring(1)
                              ? "text-[#70a2bc] font-medium"
                              : "text-primary/60"
                          }`}
                        >
                          {item.name}
                        </a>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </motion.ul>

                {/* Action buttons */}
                <div className="flex flex-col gap-3">
                  <Link
                    href="#watch-demo"
                    className="h-10 flex items-center justify-center text-sm font-medium tracking-wide  bg-transparent text-black hover:text-[#70a2bc] hover:border hover:border-[#70a2bc]/50 hover:bg-[#70a2bc]/5 transition-all duration-200 px-4 gap-2 group"
                  >
                    WATCH DEMO
                    <span className="ml-2 flex items-center justify-center w-8 h-8 bg-transparent">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="12" fill="transparent"/>
                        <polygon points="10,8 16,12 10,16" className="fill-[#2f2f2f] group-hover:fill-[#70a2bc] transition-colors"/>
                      </svg>
                    </span>
                  </Link>
                  <Link
                    href="#start-free"
                    className="h-10 flex items-center justify-center text-sm font-medium tracking-wide  bg-transparent text-[#70a2bc] border border-[#70a2bc] hover:bg-[#70a2bc] hover:text-white active:bg-[#70a2bc] active:text-white transition-all duration-200 px-6"
                  >
                    CONTACT US
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
