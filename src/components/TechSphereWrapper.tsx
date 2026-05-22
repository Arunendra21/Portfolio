"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import dynamic from "next/dynamic";
import { Cpu } from "lucide-react";
import { motion } from "framer-motion";

// 1. Highly Animated 2D Cyber Tag Cloud Fallback
const TECH_TAGS = [
  "React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL",
  "MySQL", "TypeScript", "JavaScript", "Python", "C++", "Docker",
  "Git", "GitHub", "Linux", "GCP", "Firebase", "Vercel",
  "Tailwind", "REST APIs", "KaTeX", "Framer Motion", "GSAP"
];

function CyberTagFallback() {
  return (
    <div className="w-full h-[320px] sm:h-[400px] flex flex-col justify-between p-6 border border-cyber-purple/15 bg-cyber-dark/30 rounded-xl relative overflow-hidden font-mono select-none">
      <div className="absolute inset-0 bg-cyber-grid-pattern bg-[size:15px_15px] opacity-[0.03]" />
      
      {/* Top Banner Status */}
      <div className="w-full flex justify-between items-center z-10 text-[9px] text-cyber-purple/60">
        <span>SYSTEM_FALLBACK: TAG_GRID_ON</span>
        <span>SYS_STATUS: COMPAT_MODE</span>
      </div>

      {/* Floating Animated Tags Grid */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-md my-auto z-10">
        {TECH_TAGS.map((tag, idx) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: idx * 0.02 }}
            whileHover={{ scale: 1.08, borderColor: "rgba(0, 240, 255, 0.4)", color: "#00f0ff" }}
            className="px-3 py-1 text-[10px] sm:text-[11px] border border-white/5 bg-cyber-black/55 text-white/60 rounded-md cursor-pointer transition-colors hover:shadow-[0_0_8px_rgba(0,240,255,0.25)]"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Bottom Status Ticker */}
      <div className="w-full flex justify-between items-center z-10 text-[8px] text-white/30">
        <span>MATRIX_LOCK: ENGAGED</span>
        <span>DRAG_ROTATE: LOCKED</span>
      </div>
    </div>
  );
}

// 2. React Error Boundary Component
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class TechSphereErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("TechSphere Three.js runtime error caught. Displaying elegant cyber fallback.", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <CyberTagFallback />;
    }
    return this.children;
  }
}

// Client-only dynamic import for R3F Canvas to bypass Server-Side Rendering
const DynamicTechSphere = dynamic(() => import("./TechSphere"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] sm:h-[400px] flex flex-col items-center justify-center border border-cyber-cyan/15 bg-cyber-dark/30 rounded-xl relative overflow-hidden font-mono">
      <div className="absolute inset-0 bg-cyber-grid-pattern bg-[size:20px_20px] opacity-[0.05]" />
      <Cpu className="w-8 h-8 text-cyber-cyan animate-spin mb-3 opacity-60" />
      <span className="text-[10px] text-cyber-cyan/60 tracking-widest animate-pulse">
        CALIBRATING_3D_TAG_MATRIX...
      </span>
    </div>
  ),
});

export default function TechSphereWrapper() {
  return (
    <TechSphereErrorBoundary>
      <DynamicTechSphere />
    </TechSphereErrorBoundary>
  );
}
