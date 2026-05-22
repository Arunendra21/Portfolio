"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);

  // High performance motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Apple-level physics spring interpolation for butter-smooth movement
  const springConfig = { damping: 30, stiffness: 250, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect if desktop pointer (fine) is available
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsMobile(!mediaQuery.matches);

    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Event listeners to handle interactive hover scales
    const addHoverEffect = () => setIsHovered(true);
    const removeHoverEffect = () => setIsHovered(false);

    const updateHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, .cyber-card, .hover-trigger'
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", addHoverEffect);
        el.addEventListener("mouseleave", removeHoverEffect);
      });
    };

    updateHoverListeners();

    // Re-bind hover listeners occasionally to handle dynamically rendered items
    const observer = new MutationObserver(updateHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [cursorX, cursorY]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Spring-interpolated Glowing Neon Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyber-cyan z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          boxShadow: isHovered
            ? "0 0 15px rgba(0, 240, 255, 0.6), inset 0 0 8px rgba(0, 240, 255, 0.4)"
            : "0 0 8px rgba(0, 240, 255, 0.2)",
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          borderColor: isHovered ? "#b923ff" : "#00f0ff", // Glow purple on hover
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
      >
      </motion.div>

      {/* Floating Micro-Coordinates (sci-fi overlay look) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] font-mono text-[8px] text-cyber-cyan/50 tracking-widest pl-6 pt-2 select-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div className="flex flex-col">
          <span>X: {coords.x}</span>
          <span>Y: {coords.y}</span>
        </div>
      </motion.div>
    </>
  );
}
