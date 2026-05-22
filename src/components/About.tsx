"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Globe, Shield, Terminal, ArrowUpRight } from "lucide-react";
import TechSphereWrapper from "./TechSphereWrapper";

const STRENGTHS = [
  {
    icon: <Terminal className="w-5 h-5 text-blue-400" />,
    title: "Full Stack Development",
    desc: "Architecting high-performance client panels and backend architectures using the MERN & Next.js ecosystem.",
  },
  {
    icon: <Globe className="w-5 h-5 text-indigo-400" />,
    title: "AI Integration",
    desc: "Integrating cutting-edge LLMs (Gemini, LLAMA-3) to create intelligent analysis systems and agentic pipelines.",
  },
  {
    icon: <Shield className="w-5 h-5 text-cyan-400" />,
    title: "Problem Solving",
    desc: "Strong computer science fundamentals, analytical thinking, and efficient algorithmic models.",
  },
  {
    icon: <Award className="w-5 h-5 text-zinc-300" />,
    title: "Research & Analysis",
    desc: "Active academic researcher with internships at NIT Warangal and IIIT Vadodara specializing in optimizations.",
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-indigo-300" />,
    title: "Scalable Systems",
    desc: "Structuring decoupled architectures, robust database synchronization, and scalable cloud deployments.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden border-t border-zinc-900 bg-[#07070a]"
    >
      {/* Background Volumetric lights */}
      <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] bg-blue-950/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[450px] h-[450px] bg-indigo-950/5 rounded-full filter blur-[150px] pointer-events-none" />

      {/* Grid Decors */}
      <div className="absolute inset-0 bg-dot-matrix opacity-10 pointer-events-none" />

      <div className="w-[92%] max-w-6xl mx-auto flex flex-col space-y-16 z-10">
        {/* Header */}
        <div className="flex flex-col space-y-3 text-center items-center font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-1.5 text-[9px] text-zinc-400 border border-zinc-800 bg-zinc-900/40 px-3.5 py-1 rounded-full tracking-widest font-mono uppercase"
          >
            <span>BIOGRAPHY</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight"
          >
            About Arunendra
          </motion.h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans max-w-md mx-auto leading-relaxed">
            A CSE student blending robust full-stack software development with scientific research in artificial intelligence.
          </p>
        </div>

        {/* Content Split: Text & 3D Sphere */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center font-sans">
          {/* Left Hand: About content and academics */}
          <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-zinc-800/80 bg-[#0d0d12]/75 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            >
              <h3 className="font-semibold text-white tracking-wide text-lg mb-4 flex items-center gap-2">
                <span>Academic Overview</span>
              </h3>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                Currently pursuing a <strong>B.Tech in Computer Science and Engineering</strong> (specializing in 
                Artificial Intelligence & Data Science) at <strong>IIIT Manipur</strong> (Indian Institute of Information Technology, Manipur).
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Passionate about core system engineering, backend data workflow optimization, and building secure full-stack applications. 
                Constantly exploring the frontiers of open-source projects, modern technology frameworks, and mathematical algorithms.
              </p>
            </motion.div>

            {/* Micro details grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="p-4 border border-zinc-800/80 bg-zinc-900/40 rounded-xl font-mono text-[10px] text-zinc-300 tracking-wider flex items-center justify-between hover:border-zinc-700/80 transition-colors">
                <span>ACADEMICS: CSE (AI & DS)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </div>
              <div className="p-4 border border-zinc-800/80 bg-zinc-900/40 rounded-xl font-mono text-[10px] text-zinc-300 tracking-wider flex items-center justify-between hover:border-zinc-700/80 transition-colors">
                <span>INTERESTS: SYSTEMS OPTIMIZATION</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </div>
            </motion.div>
          </div>

          {/* Right Hand: 3D rotating Tag Cloud Sphere */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="w-full max-w-[420px] rounded-2xl border border-zinc-800/80 bg-[#0d0d12]/50 backdrop-blur-md relative p-2 shadow-2xl">
              {/* Scanline decoration */}
              <div className="absolute inset-0 bg-cyber-grid-pattern bg-[size:15px_15px] opacity-[0.03] z-0" />
              <TechSphereWrapper />
            </div>
          </motion.div>
        </div>

        {/* Core Strengths Grid Panel */}
        <div className="flex flex-col space-y-6 pt-8 font-sans">
          <h3 className="font-semibold text-zinc-400 tracking-widest text-center text-xs uppercase mb-2">
            {"// KEY STRENGTHS & SPECIALIZATIONS"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {STRENGTHS.map((str, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-5 rounded-2xl border border-zinc-800 bg-[#0d0d12]/60 hover:border-zinc-700/80 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-start space-y-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] shadow-inner text-left"
              >
                <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-850 w-fit">
                  {str.icon}
                </div>
                <div className="flex flex-col space-y-1">
                  <h4 className="font-semibold text-white tracking-wide text-[12px] uppercase">
                    {str.title}
                  </h4>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    {str.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
