"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import GlowingMouseTrail from "@/components/GlowingMouseTrail";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import TerminalContact from "@/components/TerminalContact";
import Footer from "@/components/Footer";
import OrbAssistant from "@/components/OrbAssistant";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* 1. Futuristic Boot Loading Screen */}
      <Preloader onComplete={() => setIsLoading(false)} />

      {/* 2. Mainframe Command Center Dashboard */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative min-h-screen bg-cyber-black text-foreground selection:bg-cyber-cyan/30"
          >
            {/* Scroll-driven neon progress rail */}
            <ScrollProgress />

            {/* Butter-Smooth Custom Cyber-Cursor follower (Desktop only) */}
            <CustomCursor />

            {/* Glowing Mouse Volumetric Trail Background Layer */}
            <GlowingMouseTrail />

            {/* Translucent Floating Dock Navigation Menu */}
            <Navbar />

            {/* Scrollable Command Center Sections */}
            <main className="relative w-full overflow-x-hidden">
              <Hero />
              <About />
              <TechStack />
              <Projects />
              <Experience />
              <Achievements />
              <TerminalContact />
            </main>

            {/* Floating Holographic AI Core Orb Assistant */}
            <OrbAssistant />

            {/* Premium Cybernetic Footer Apex Controls */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
