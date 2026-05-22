"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GlowingMouseTrail() {
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Soft spring config for a glowing volumetric cloud following the cursor with elegant lag
  const glowX = useSpring(mouseX, { stiffness: 45, damping: 30 });
  const glowY = useSpring(mouseY, { stiffness: 45, damping: 30 });

  useEffect(() => {
    setIsMounted(true);
    // Position glow in the center initially
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* Volumetric Neon Blue Core Glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-radial from-cyber-cyan/10 via-cyber-blue/5 to-transparent filter blur-[60px]"
        style={{
          x: glowX,
          y: glowY,
          left: -200,
          top: -200,
        }}
      />
      {/* Soft Purple Secondary Core Glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-radial from-cyber-purple/10 via-cyber-pink/2 to-transparent filter blur-[80px]"
        style={{
          x: glowX,
          y: glowY,
          left: -250,
          top: -250,
        }}
      />
    </div>
  );
}
