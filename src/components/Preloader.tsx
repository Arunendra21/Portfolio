"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "SYSTEM INIT: Launching Quantum Kernel v3.4.1...",
  "CORE: Synchronizing AI neural network arrays...",
  "INTERFACE: Establishing secure protocol handshake...",
  "GRID: Loading interactive spatial UI modules...",
  "DATABASES: Connecting CodeOrbit activity nodes...",
  "SYSTEM SECURE: Encryption verified. Welcome, user.",
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Progress counter ticker
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 2; // Random jump for realism
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Log ticker syncing with progress
    const logInterval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[logIndex]]);
        setLogIndex((prev) => prev + 1);
      } else {
        clearInterval(logInterval);
      }
    }, 400);

    return () => clearInterval(logInterval);
  }, [logIndex]);

  useEffect(() => {
    if (progress === 100) {
      const completionTimer = setTimeout(() => {
        setIsDone(true);
        // Delay callback slightly to allow exit animation to begin
        setTimeout(onComplete, 800);
      }, 800);
      return () => clearTimeout(completionTimer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -100,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cyber-black text-foreground select-none"
        >
          {/* Subtle Grid overlay in background */}
          <div className="absolute inset-0 bg-cyber-grid-pattern bg-[size:30px_30px] opacity-10 pointer-events-none" />
          
          <div className="w-[90%] max-w-xl flex flex-col space-y-8 z-10">
            {/* Spinning Holographic SVG Core Graphics */}
            <div className="relative flex justify-center items-center">
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="w-24 h-24 text-cyber-cyan filter drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                viewBox="0 0 100 100"
              >
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1" strokeDasharray="10, 8" fill="none" />
                <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="2" strokeDasharray="30, 15" fill="none" opacity="0.7" />
                <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" strokeDasharray="5, 5" fill="none" opacity="0.5" />
              </motion.svg>
              <div className="absolute font-mono text-xs tracking-widest text-cyber-purple animate-pulse">
                CORE
              </div>
            </div>

            {/* Percentage Indicator */}
            <div className="flex flex-col items-center space-y-2">
              <span className="font-orbitron font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple filter drop-shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                {progress}%
              </span>
              <span className="font-mono text-xs text-cyber-cyan tracking-wider animate-pulse">
                {progress < 100 ? "INITIALIZING INTERFACE..." : "SYSTEM BOOT COMPLETED"}
              </span>
            </div>

            {/* Futuristic Progress Bar */}
            <div className="h-2 w-full bg-cyber-lightgray rounded-full overflow-hidden border border-cyber-cyan/10 relative p-[1px]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple"
                style={{ width: `${progress}%` }}
                layout
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(0,240,255,0.2)_50%)] bg-[size:4px_100%] pointer-events-none" />
            </div>

            {/* Boot Logs Terminal Screen */}
            <div className="h-40 bg-cyber-dark/80 border border-cyber-cyan/20 rounded-md p-4 font-mono text-[10px] sm:text-xs text-cyber-emerald/90 overflow-hidden flex flex-col space-y-1 backdrop-blur-md relative shadow-cyber-grid shadow-inner">
              <div className="absolute top-1 right-2 flex space-x-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
              </div>
              <div className="text-cyber-cyan/50 pb-1 border-b border-cyber-cyan/10 mb-1 flex items-center justify-between">
                <span>TERMINAL_OUTPUT // ARUN_BOOT_LOG</span>
                <span className="animate-pulse">● REC</span>
              </div>
              <div className="flex-1 overflow-y-auto space-y-1 scrollbar-none pr-1">
                {logs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex"
                  >
                    <span className="text-cyber-cyan/70 mr-2">&gt;</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
                {progress < 100 && (
                  <div className="flex items-center text-cyber-cyan">
                    <span className="text-cyber-cyan/70 mr-2">&gt;</span>
                    <span className="w-2 h-4 bg-cyber-cyan animate-pulse inline-block" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
