"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu } from "lucide-react";

interface Skill {
  name: string;
  category: "languages" | "aiml" | "web" | "database" | "tools";
  level: number;
  grade: "EXPERT" | "PROFICIENT" | "INTERMEDIATE";
}

const SKILLS: Skill[] = [
  // Languages
  { name: "Python", category: "languages", level: 90, grade: "EXPERT" },
  { name: "Go (Golang)", category: "languages", level: 85, grade: "PROFICIENT" },
  { name: "C++", category: "languages", level: 85, grade: "PROFICIENT" },
  { name: "C", category: "languages", level: 80, grade: "PROFICIENT" },
  { name: "JavaScript", category: "languages", level: 90, grade: "EXPERT" },
  { name: "TypeScript", category: "languages", level: 88, grade: "PROFICIENT" },
  { name: "SQL", category: "languages", level: 85, grade: "PROFICIENT" },

  // AI / ML & GenAI
  { name: "Machine Learning", category: "aiml", level: 88, grade: "PROFICIENT" },
  { name: "Computer Vision", category: "aiml", level: 85, grade: "PROFICIENT" },
  { name: "PyTorch", category: "aiml", level: 85, grade: "PROFICIENT" },
  { name: "TensorFlow", category: "aiml", level: 80, grade: "PROFICIENT" },
  { name: "Scikit-learn", category: "aiml", level: 88, grade: "PROFICIENT" },
  { name: "NumPy / Pandas", category: "aiml", level: 90, grade: "EXPERT" },
  { name: "RAG & Embeddings", category: "aiml", level: 85, grade: "PROFICIENT" },
  { name: "AI Agents", category: "aiml", level: 85, grade: "PROFICIENT" },
  { name: "LangChain / LangGraph", category: "aiml", level: 82, grade: "PROFICIENT" },
  { name: "LlamaIndex", category: "aiml", level: 78, grade: "INTERMEDIATE" },
  { name: "Prompt Engineering", category: "aiml", level: 90, grade: "EXPERT" },

  // Web & Backend
  { name: "React.js", category: "web", level: 92, grade: "EXPERT" },
  { name: "Next.js", category: "web", level: 90, grade: "EXPERT" },
  { name: "Node.js", category: "web", level: 88, grade: "PROFICIENT" },
  { name: "Express.js", category: "web", level: 88, grade: "PROFICIENT" },
  { name: "Fiber (Go)", category: "web", level: 82, grade: "PROFICIENT" },
  { name: "Tailwind CSS", category: "web", level: 92, grade: "EXPERT" },
  { name: "REST APIs", category: "web", level: 90, grade: "EXPERT" },
  { name: "JWT Auth", category: "web", level: 88, grade: "PROFICIENT" },

  // Database
  { name: "PostgreSQL", category: "database", level: 85, grade: "PROFICIENT" },
  { name: "TimescaleDB", category: "database", level: 78, grade: "INTERMEDIATE" },
  { name: "MongoDB", category: "database", level: 88, grade: "PROFICIENT" },
  { name: "Vector Databases", category: "database", level: 80, grade: "PROFICIENT" },

  // Tools
  { name: "Git", category: "tools", level: 90, grade: "EXPERT" },
  { name: "GitHub", category: "tools", level: 90, grade: "EXPERT" },
  { name: "Docker", category: "tools", level: 80, grade: "PROFICIENT" },
  { name: "SNMP", category: "tools", level: 78, grade: "INTERMEDIATE" },
];

const CATEGORIES = [
  { id: "all", label: "ALL" },
  { id: "languages", label: "LANGUAGES" },
  { id: "aiml", label: "AI / ML" },
  { id: "web", label: "WEB & BACKEND" },
  { id: "database", label: "DATABASES" },
  { id: "tools", label: "TOOLS" },
];

function SkillCard({ skill }: { skill: Skill }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Extremely soft 3D tilt (max 4 degrees) for sleek modern feeling
    const rX = -(y / (height / 2)) * 4;
    const rY = (x / (width / 2)) * 4;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="perspective-1000"
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="sheen card-glow w-full p-6 rounded-2xl border border-zinc-800/80 bg-[#0d0d12]/75 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-zinc-700/80 hover:shadow-[0_12px_32px_rgba(0,0,0,0.6)] transition-all duration-200 ease-out select-none group flex flex-col justify-between h-[120px] relative overflow-hidden"
      >
        {/* Soft elegant background hover glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div style={{ transform: "translateZ(20px)" }} className="flex justify-between items-center z-10">
          <span className="font-sans font-semibold text-[13px] sm:text-[14px] text-white tracking-wide">
            {skill.name}
          </span>
          <span
            className="font-mono text-[8px] sm:text-[9px] font-medium tracking-widest text-zinc-400 border border-zinc-800 px-2.5 py-0.5 rounded-full bg-zinc-900/80"
          >
            {skill.grade}
          </span>
        </div>

        {/* Custom minimalist thin progress bar */}
        <div style={{ transform: "translateZ(10px)" }} className="flex flex-col space-y-2 z-10 w-full">
          <div className="flex justify-between text-[9px] font-mono text-zinc-500 tracking-wider">
            <span>PROFICIENCY</span>
            <span className="text-zinc-300">{skill.level}%</span>
          </div>

          <div className="h-[4px] w-full bg-zinc-800/80 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = SKILLS.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section
      id="tech"
      className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden border-t border-zinc-900 bg-[#07070a]"
    >
      {/* Background Volumetric Muted Glows (no rainbow, just class) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,16,24,0.3),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-blue-900/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-indigo-900/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="w-[92%] max-w-6xl mx-auto flex flex-col space-y-12 z-10">
        {/* Header */}
        <div className="flex flex-col space-y-3 text-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-1.5 text-[9px] text-zinc-400 border border-zinc-800 bg-zinc-900/40 px-3.5 py-1 rounded-full tracking-widest font-mono uppercase"
          >
            <Cpu className="w-3 h-3 text-blue-400 animate-pulse" />
            <span>TECHNICAL SPECIFICATIONS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="aurora-text heading-underline font-sans font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight"
          >
            Skills & Expertise
          </motion.h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans max-w-md mx-auto leading-relaxed">
            A comprehensive matrix of core technologies, libraries, and database frameworks compiled through full stack software engineering.
          </p>
        </div>

        {/* Filter Navigation Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto select-none font-sans">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-[10px] tracking-wider border font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-white text-zinc-950 border-white shadow-[0_4px_12px_rgba(255,255,255,0.15)]"
                  : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill Card Grid Showcase */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
