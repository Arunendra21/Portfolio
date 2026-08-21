"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin scroll-driven progress bar pinned to the very top of the viewport.
 * Reads document scroll and maps it to a horizontal scale for a smooth,
 * spring-eased "boot progress" feel that matches the command-center theme.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
}
