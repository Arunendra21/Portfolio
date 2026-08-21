"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitFork, ExternalLink, X, Cpu, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  image: string;
  github: string;
  demo: string;
  isBlueprint?: boolean;
  architecture?: string;
}

const PROJECTS: Project[] = [
  {
    id: "codeorbit",
    title: "CodeOrbit",
    tagline: "AI Developer Analytics Hub",
    description: "A comprehensive developer analytics cockpit aggregating GitHub commit cycles, LeetCode algorithmic progress, and code frequencies. Built with Gemini AI and Groq LLAMA-3 models to parse developer data and synthesize tailored diagnostic study schedules.",
    features: [
      "OAuth 2.0 multi-platform verification endpoints.",
      "Real-time data visualization charts and telemetry metrics.",
      "Gemini AI analytical scheduler engine.",
      "High-availability asynchronous scraping queues."
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    image: "/codeorbit_logo.png",
    architecture: "Next.js Dashboard <--> Express API Core <--> MongoDB Cluster & Groq Llama-3 AI Engine",
    github: "https://github.com/Arunendra21/Codeorbit",
    demo: "https://codeorbit-psi.vercel.app/",
  },
  {
    id: "scholarsynth",
    title: "ScholarSynth",
    tagline: "Intelligent Paper Parser Core",
    description: "An AI-powered academic helper engine that digests heavy research publications, compiles context-aware analytical abstracts, and dynamically generates custom testing suites.",
    features: [
      "Gemini LLM multi-page PDF processing nodes.",
      "Vector database embeddings for semantic section queries.",
      "Dynamic interactive quiz constructor dashboards.",
      "One-click LaTeX mathematical formula renderer modules."
    ],
    tech: ["React.js", "Tailwind CSS", "GCP", "Google Gemini API", "VectorDB", "Node.js"],
    image: "/scholarsynth.png",
    architecture: "React.js Client <--> Node.js Server <--> Google Gemini Flash API & Pinecone DB",
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: "projectflow",
    title: "ProjectFlow",
    tagline: "Team Project Management Platform",
    description: "A production-ready full-stack project management application similar to Jira/Trello, built for teams to create projects, assign tasks, manage workflows, and track progress with role-based access control.",
    features: [
      "Role-Based Access Control — Admin and Member roles with middleware-enforced permissions.",
      "Project & Task Management — Create/edit projects with status tracking, progress calculations, and Kanban workflows.",
      "Dashboards & Analytics — Interactive team metrics charts powered by Recharts, activity logs, and commenting threads.",
      "Robust Security & State — JWT + bcrypt authentication, persistent sessions, and Zustand state management."
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Prisma ORM", "Zustand", "Tailwind CSS"],
    image: "/projectflow.png",
    architecture: "Next.js 14 Client <--> Express.js Backend Server <--> PostgreSQL + Prisma ORM Database",
    github: "https://github.com/Arunendra21/Team_task_manager",
    demo: "https://wholesome-luck-production-04bd.up.railway.app/",
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Prevent body scroll when project specifications modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden border-t border-zinc-900 bg-[#07070a]"
    >
      {/* Decors */}
      <div className="absolute inset-0 bg-dot-matrix opacity-10 pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[450px] h-[450px] bg-blue-950/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-indigo-950/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="w-[92%] max-w-6xl mx-auto flex flex-col space-y-12 z-10">
        {/* Header */}
        <div className="flex flex-col space-y-3 text-center items-center font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-1.5 text-[9px] text-zinc-400 border border-zinc-800 bg-zinc-900/40 px-3.5 py-1 rounded-full tracking-widest font-mono uppercase"
          >
            <span>PORTFOLIO</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="aurora-text heading-underline font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight"
          >
            Featured Works
          </motion.h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans max-w-md mx-auto leading-relaxed">
            A curated showcase of dynamic applications, developer dashboards, and intelligent system architectures built from scratch.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 font-sans">
          {PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="sheen card-glow group flex flex-col h-full border border-zinc-800/80 bg-[#0d0d12]/75 hover:border-zinc-700/80 transition-all duration-300 select-none rounded-2xl overflow-hidden hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            >
              {/* Media showcase frame */}
              <div className="relative w-full h-[200px] bg-zinc-950 overflow-hidden border-b border-zinc-900">
                {proj.isBlueprint ? (
                  /* Cyber Blueprint Animated SVG */
                  <div className="w-full h-full flex flex-col justify-center items-center p-6 relative">
                    <div className="absolute inset-0 bg-cyber-grid-pattern bg-[size:15px_15px] opacity-[0.05]" />
                    <Cpu className="w-12 h-12 text-zinc-500 animate-pulse opacity-60 mb-2" />
                    <span className="font-mono text-[9px] text-zinc-400 tracking-wider">
                      SCHEMATIC_NODE_MAPPING // {proj.id.toUpperCase()}_v1.0
                    </span>
                    {/* Circuit vector lines decorative */}
                    <svg className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="10" y1="20" x2="40" y2="20" stroke="#00f0ff" strokeWidth="0.5" strokeDasharray="2, 2" />
                      <line x1="40" y1="20" x2="50" y2="40" stroke="#00f0ff" strokeWidth="0.5" />
                      <line x1="50" y1="40" x2="90" y2="40" stroke="#b923ff" strokeWidth="0.5" strokeDasharray="3, 3" />
                      <circle cx="50" cy="40" r="1.5" fill="#00f0ff" />
                    </svg>
                  </div>
                ) : (
                  /* Native asset render */
                  <div className="w-full h-full relative">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className={proj.id === "codeorbit" ? "object-contain p-6 group-hover:scale-[1.02] transition-transform duration-700 opacity-95" : "object-cover group-hover:scale-[1.03] transition-transform duration-700 opacity-80"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-90" />
                  </div>
                )}
                {/* Tech category badge */}
                <span className="absolute top-3 left-3 z-10 font-mono text-[8px] border border-zinc-800 text-zinc-400 bg-zinc-900/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {proj.tech[0]}
                </span>
              </div>

              {/* Text specifications */}
              <div className="p-6 flex flex-col flex-grow text-left space-y-4 justify-between">
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-col space-y-1">
                    <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition-colors tracking-wide">
                      {proj.id === "codeorbit" ? (
                        <>
                          <span className="text-blue-500">Code</span>
                          <span className="text-white group-hover:text-white transition-colors">Orbit</span>
                        </>
                      ) : (
                        proj.title
                      )}
                    </h3>
                    <span className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase">
                      {proj.tagline}
                    </span>
                  </div>

                  <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                {/* Tech Badge rack */}
                <div className="flex flex-col space-y-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[8px] bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                    {proj.tech.length > 4 && (
                      <span className="font-mono text-[8px] bg-blue-950/20 border border-blue-900/30 text-blue-400 px-2 py-0.5 rounded">
                        +{proj.tech.length - 4} MORE
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setActiveProject(proj)}
                    className="w-full py-2 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white font-medium text-[10px] tracking-wider uppercase rounded-xl transition-all flex items-center justify-center space-x-2"
                  >
                    <span>[VIEW SPECIFICATIONS]</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expandable Immersive Fullscreen Overlay Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="w-full max-w-3xl max-h-[85vh] rounded-2xl border border-zinc-800 bg-[#0d0d12]/95 text-left flex flex-col overflow-hidden shadow-2xl relative font-sans"
            >
              {/* scanline holographic decoration */}
              <div className="absolute inset-0 bg-cyber-grid-pattern bg-[size:15px_15px] opacity-[0.02] z-0" />

              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 z-[99] p-2 rounded-full border border-zinc-800 hover:border-zinc-700 bg-zinc-900/80 text-zinc-400 hover:text-white transition-all shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="overflow-y-auto flex-1 scrollbar-none z-10">
                <div className="relative w-full h-[220px] bg-zinc-950 border-b border-zinc-900 flex items-center justify-center overflow-hidden">
                  {activeProject.id === "codeorbit" ? (
                    <div className="w-full h-full bg-[#07070a] flex items-center justify-center p-8 relative">
                      <div className="absolute inset-0 bg-cyber-grid-pattern bg-[size:20px_20px] opacity-[0.03]" />
                      <div className="relative w-full max-w-[420px] h-full">
                        <Image
                          src="/codeorbit_logo.png"
                          alt="CodeOrbit Logo"
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>
                  ) : activeProject.isBlueprint ? (
                    <div className="w-full h-full flex flex-col justify-center items-center p-6 relative">
                      <div className="absolute inset-0 bg-cyber-grid-pattern bg-[size:20px_20px] opacity-[0.05]" />
                      <Cpu className="w-16 h-16 text-zinc-500 animate-pulse opacity-60 mb-2" />
                      <span className="font-mono text-xs text-zinc-400 tracking-widest uppercase">
                        HOLOGRAPHIC_CORE // {activeProject.id.toUpperCase()}_v1.0
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-full relative">
                      <Image
                        src={activeProject.image}
                        alt={activeProject.title}
                        fill
                        className="object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-transparent opacity-95" />
                    </div>
                  )}
                  {/* Title overlay details */}
                  {activeProject.id !== "codeorbit" && (
                    <div className="absolute bottom-6 left-6 z-10 flex flex-col space-y-1">
                      <span className="font-mono text-[8px] text-zinc-400 tracking-widest uppercase border border-zinc-800 px-2.5 py-0.5 rounded-full bg-zinc-900/80 self-start">
                        SYSTEM ARCHITECTURE
                      </span>
                      <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight uppercase mt-1">
                        {activeProject.title}
                      </h2>
                    </div>
                  )}
                </div>

                {/* Spec details grid container */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Sub Header info */}
                  <div className="flex flex-col space-y-2 border-b border-zinc-900 pb-4">
                    <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase font-bold">
                      {"// SUMMARY"}
                    </span>
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Architecture spec */}
                  {activeProject.architecture && (
                    <div className="flex flex-col space-y-2 border-b border-zinc-900 pb-4 text-xs">
                      <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase font-bold">
                        {"// SYSTEM ARCHITECTURE SCHEMA"}
                      </span>
                      <code className="p-3 bg-zinc-950 rounded-xl border border-zinc-900 text-emerald-400 font-mono block">
                        {activeProject.architecture}
                      </code>
                    </div>
                  )}

                  {/* Features matrix details */}
                  <div className="flex flex-col space-y-3">
                    <span className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase font-bold">
                      {"// CAPABILITIES & UTILITIES"}
                    </span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-zinc-400">
                      {activeProject.features.map((feat, idx) => (
                        <li
                          key={idx}
                          className="flex items-start space-x-2.5 p-3.5 bg-zinc-900/40 border border-zinc-850 rounded-2xl"
                        >
                          <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-col space-y-2 pt-2">
                    <span className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase font-bold">
                      {"// SKILLSET_BINDS"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[9px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer action bar */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-900 flex items-center justify-end gap-3 z-10">
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 border border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300 hover:text-white rounded-xl font-mono text-[9px] tracking-wider uppercase transition-all duration-300 flex items-center space-x-2"
                >
                  <GitFork className="w-3.5 h-3.5" />
                  <span>[SOURCE_CODE]</span>
                </a>
                <a
                  href={activeProject.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white hover:bg-zinc-200 text-zinc-950 font-mono font-bold text-[9px] tracking-wider uppercase rounded-xl transition-all duration-300 flex items-center space-x-2 hover:scale-[1.02] shadow-[0_4px_12px_rgba(255,255,255,0.15)]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>[LIVE_DEMO]</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
