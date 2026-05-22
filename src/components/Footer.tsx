"use client";

import { ArrowUp, ShieldCheck } from "lucide-react";

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

export default function Footer() {
  const scrollToApex = (e: React.MouseEvent) => {
    e.preventDefault();
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#07070a] border-t border-zinc-900 py-12 select-none overflow-hidden font-sans text-xs text-zinc-400">
      {/* Subtle Grid backdrop */}
      <div className="absolute inset-0 bg-dot-matrix opacity-10 pointer-events-none" />

      <div className="w-[92%] max-w-6xl mx-auto flex flex-col space-y-8 z-10 relative">
        
        {/* Top Dock: Brand Logo & Back to top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a
            href="#hero"
            onClick={scrollToApex}
            className="flex items-center space-x-2.5 text-white group"
          >
            <LogoIcon />
            <span className="font-sans font-extrabold tracking-tight text-xs sm:text-[13px] uppercase text-white group-hover:text-blue-400 transition-colors">
              Arunendra<span className="font-light text-zinc-550 ml-0.5">Tripathi</span>
            </span>
          </a>

          {/* Quick links dock */}
          <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {[
              { label: "ABOUT", hash: "#about" },
              { label: "TECH", hash: "#tech" },
              { label: "PROJECTS", hash: "#projects" },
              { label: "EXPERIENCE", hash: "#experience" },
              { label: "CONTACT", hash: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.hash}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.hash)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-white transition-colors"
              >
                //{link.label}
              </a>
            ))}
          </nav>

          {/* Scroll to Apex back-to-top button */}
          <button
            onClick={scrollToApex}
            className="px-4 py-2 border border-zinc-800 hover:border-zinc-700 text-zinc-350 hover:text-white rounded-full flex items-center space-x-2 text-[10px] tracking-wider uppercase transition-all hover:scale-[1.03]"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>SCROLL TO TOP</span>
          </button>
        </div>

        {/* Separator line */}
        <div className="w-full h-[1px] bg-zinc-900" />

        {/* Bottom Dock: Copyright & Security log */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[9px] text-zinc-550">
          <div className="flex items-center space-x-2">
            <span>© 2026 ARUNENDRA TRIPATHI</span>
            <span>|</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center space-x-1.5 text-zinc-400 bg-zinc-900/40 border border-zinc-800 px-3.5 py-1 rounded-full text-[9px] font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>SECURE CONNECTION</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
