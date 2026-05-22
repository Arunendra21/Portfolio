"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "hero", label: "HOME", hash: "#hero" },
  { id: "about", label: "ABOUT", hash: "#about" },
  { id: "tech", label: "TECH", hash: "#tech" },
  { id: "projects", label: "PROJECTS", hash: "#projects" },
  { id: "experience", label: "EXPERIENCE", hash: "#experience" },
  { id: "contact", label: "CONTACT", hash: "#contact" },
];

const LogoIcon = () => (
  <svg
    className="w-[20px] h-[20px] text-white group-hover:text-blue-400 transition-colors duration-300"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Geometric Custom Monogram A + T */}
    <path
      d="M6 8H26"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M16 8L8 24"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M16 8L24 24"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M11 18H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll height to add borders and monitor active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section intersection scrollspy logic
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 200; // Offset for accuracy

      sections.forEach((sec) => {
        if (!sec) return;
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(sec.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setActiveSection(hash.substring(1));
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Floating Pill Nav Dock */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[99] w-[92%] max-w-5xl rounded-full border transition-all duration-300 font-sans text-[11px] font-medium tracking-wider select-none ${
          isScrolled
            ? "bg-[#0d0d12]/85 backdrop-blur-md border-zinc-800/80 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Logo Branding */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center space-x-2.5 text-white group"
          >
            <LogoIcon />
            <span className="font-sans font-extrabold tracking-tight text-xs sm:text-[13px] uppercase text-white group-hover:text-blue-400 transition-colors">
              Arunendra<span className="font-light text-zinc-500 ml-0.5">Tripathi</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-1 relative">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.hash}
                onClick={(e) => handleNavClick(e, item.hash)}
                className={`relative px-4 py-1.5 rounded-full transition-all duration-200 hover:text-white ${
                  activeSection === item.id ? "text-white font-semibold" : "text-zinc-400"
                }`}
              >
                {/* Active Indicator Sliding Background */}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </a>
            ))}
          </nav>

          {/* Systems Status Dot */}
          <div className="hidden lg:flex items-center space-x-1.5 text-[9px] font-mono text-zinc-400 bg-zinc-900/40 border border-zinc-800 px-3.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SYS_STATUS: ONLINE</span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[70px] left-[4%] right-[4%] z-[98] md:hidden rounded-2xl border border-zinc-800 bg-[#0d0d12]/95 backdrop-blur-xl p-6 font-sans text-xs overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.hash}
                  onClick={(e) => handleNavClick(e, item.hash)}
                  className={`px-4 py-2.5 rounded-xl border tracking-widest text-center transition-all ${
                    activeSection === item.id
                      ? "border-zinc-700 bg-zinc-800/40 text-white font-bold"
                      : "border-transparent text-zinc-400 hover:border-zinc-800 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center space-x-1.5 text-[9px] font-mono text-zinc-400 bg-zinc-900/40 border border-zinc-800 px-3 py-2 rounded-xl justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>SECURE CONTAINER LINK ACTIVE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
