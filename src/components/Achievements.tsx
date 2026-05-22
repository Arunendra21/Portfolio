"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitPullRequest, GitFork, Star, Flame, Calendar, BookOpen } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  tag: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "girlscript",
    title: "GirlScript Summer of Code",
    subtitle: "Open Source Contributor",
    duration: "2024",
    description: "Contributed to core frontend repositories, refactored components, and resolved critical repository issues during the summer program.",
    tag: "OPEN SOURCE",
  },
  {
    id: "leetcode",
    title: "LeetCode 50 Days Badge",
    subtitle: "Algorithmic Consistency",
    duration: "2024",
    description: "Earned the official 50 Days Badge for solving complex computational data structure and algorithm challenges consistently.",
    tag: "ALGORITHMS",
  },
  {
    id: "mckinsey",
    title: "McKinsey Virtual Experience",
    subtitle: "Strategy Consulting Program",
    duration: "2024",
    description: "Completed strategic corporate simulation analyzing operational workflows, market entries, and digital models.",
    tag: "STRATEGY",
  },
  {
    id: "hacktober",
    title: "Hacktoberfest Contributor",
    subtitle: "Global Open Source Fest",
    duration: "2024",
    description: "Merged multiple verified pull requests into various global repositories, supporting open source software expansion.",
    tag: "OPEN SOURCE",
  },
  {
    id: "gemini",
    title: "Gemini Verified Student",
    subtitle: "Generative AI Scholar",
    duration: "2025",
    description: "Successfully qualified for the Gemini Verified Student Program, mastering LLM prompts, structural embeddings, and API pipelines.",
    tag: "ARTIFICIAL INTEL",
  },
  {
    id: "olympiad",
    title: "Zone Olympiad Qualifier",
    subtitle: "Mathematical Excellence",
    duration: "High School",
    description: "Ranked top-tier in zone-level competitive mathematics and logical reasoning olympiads.",
    tag: "MATHEMATICS",
  },
];

export default function Achievements() {
  const [activeTab, setActiveTab] = useState<"achievements" | "github">("achievements");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Generate simulated GitHub contribution pixel blocks (53 columns x 7 rows)
  const renderGithubGrid = () => {
    const pixels = [];
    // 53 weeks * 7 days = 371 grid cells
    for (let i = 0; i < 371; i++) {
      const rand = Math.random();
      const intensity = rand > 0.88 ? 3 : rand > 0.65 ? 2 : rand > 0.45 ? 1 : 0;

      // Color mapping: sleek modern zinc-800 to elegant indigo gradient shades
      const colors = [
        "bg-zinc-900 border border-zinc-950", // 0
        "bg-blue-900/20 border border-blue-900/10 shadow-[0_0_2px_rgba(59,130,246,0.1)]", // 1
        "bg-blue-600/40 border border-blue-500/20 shadow-[0_0_5px_rgba(59,130,246,0.2)]", // 2
        "bg-indigo-500 border border-indigo-400/30 shadow-[0_0_8px_rgba(99,102,241,0.3)]", // 3
      ];

      pixels.push(
        <div
          key={i}
          className={`w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] rounded-[1.5px] transition-all hover:scale-[1.3] ${colors[intensity]}`}
          title={`Day ${i}: ${intensity * 2} commits`}
        />
      );
    }
    return pixels;
  };

  return (
    <section
      id="achievements"
      className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden border-t border-zinc-900 bg-[#07070a]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-blue-950/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-indigo-950/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="w-[92%] max-w-6xl mx-auto flex flex-col space-y-12 z-10">
        {/* Header */}
        <div className="flex flex-col space-y-3 text-center items-center font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-1.5 text-[9px] text-zinc-400 border border-zinc-800 bg-zinc-900/40 px-3.5 py-1 rounded-full tracking-widest font-mono uppercase"
          >
            <span>ACCOMPLISHMENTS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight"
          >
            Honors & Contributions
          </motion.h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans max-w-md mx-auto leading-relaxed">
            A comprehensive registry of academic milestones, strategic programs, and open source contributions.
          </p>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex justify-center space-x-2 font-sans select-none">
          <button
            onClick={() => setActiveTab("achievements")}
            className={`px-5 py-2 rounded-full text-[10px] tracking-wider border font-medium transition-all duration-300 ${
              activeTab === "achievements"
                ? "bg-white text-zinc-950 border-white shadow-[0_4px_12px_rgba(255,255,255,0.15)]"
                : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
            }`}
          >
            HONORS REGISTRY
          </button>
          <button
            onClick={() => setActiveTab("github")}
            className={`px-5 py-2 rounded-full text-[10px] tracking-wider border font-medium transition-all duration-300 ${
              activeTab === "github"
                ? "bg-white text-zinc-950 border-white shadow-[0_4px_12px_rgba(255,255,255,0.15)]"
                : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
            }`}
          >
            GITHUB METRICS
          </button>
        </div>

        {/* Dynamic Panel Content */}
        <div className="pt-4 min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === "achievements" ? (
              /* ACHIEVEMENT REGISTRY PANEL */
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans"
              >
                {ACHIEVEMENTS.map((ach) => {
                  const isExpanded = expandedId === ach.id;

                  return (
                    <div
                      key={ach.id}
                      onClick={() => setExpandedId(isExpanded ? null : ach.id)}
                      className="p-6 rounded-2xl border border-zinc-800/80 bg-[#0d0d12]/75 backdrop-blur-md cursor-pointer select-none transition-all duration-300 flex flex-col justify-between hover:scale-[1.01] hover:border-zinc-700/80 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                    >
                      <div className="flex flex-col space-y-3">
                        <div className="flex justify-between items-start font-mono text-[8px] text-zinc-500">
                          <span>{ach.tag}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5" />
                            {ach.duration}
                          </span>
                        </div>

                        <div className="flex flex-col space-y-1">
                          <h3 className="font-semibold text-sm sm:text-base text-white tracking-wide transition-colors group-hover:text-blue-400">
                            {ach.title}
                          </h3>
                          <span className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase">
                            {ach.subtitle}
                          </span>
                        </div>

                        <p className="text-zinc-400 text-xs leading-relaxed pt-1">
                          {ach.description}
                        </p>
                      </div>

                      {/* Micro info tag click pointer */}
                      <span className="font-mono text-[8px] text-zinc-650 tracking-wider uppercase pt-4 block self-start mt-2">
                        {isExpanded ? "[COLLAPSE DETAILS]" : "[EXPAND METADATA]"}
                      </span>

                      {/* Expandable sub description panel */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden border-t border-zinc-900 mt-4 pt-4 text-[10px] text-zinc-400 font-mono space-y-2 leading-relaxed"
                          >
                            <div>&gt; AUTH_STATUS: VERIFIED_SUCCESS</div>
                            <div>&gt; REGISTRY_NODE: {ach.id.toUpperCase()}_DAT</div>
                            <div className="text-[10px] text-zinc-550 pt-1 font-sans">
                              Record synchronized against official verified credentials and program indices.
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              /* GITHUB OPEN-SOURCE MAINFRAME PANEL */
              <motion.div
                key="github"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="w-full space-y-8 font-sans text-left"
              >
                {/* Contribution Graph Core */}
                <div className="p-6 rounded-2xl border border-zinc-800 bg-[#0d0d12]/75 backdrop-blur-md overflow-hidden shadow-2xl flex flex-col space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-900 pb-3">
                    <span className="font-mono text-[10px] text-zinc-300 font-bold tracking-wider flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                      CONTRIBUTION CORE // @arunendra
                    </span>
                    <span className="font-mono text-[9px] text-zinc-500 tracking-wider">
                      842+ COMMITS SYNCED THIS CYCLE
                    </span>
                  </div>

                  {/* Contribution Heat Map Pixel Grid Wrapper */}
                  <div className="overflow-x-auto scrollbar-none py-2 select-none">
                    <div className="grid grid-flow-col grid-rows-7 gap-[2px] min-w-[550px] w-full justify-center">
                      {renderGithubGrid()}
                    </div>
                  </div>

                  {/* Heat map color code footer */}
                  <div className="flex justify-between items-center font-mono text-[8px] text-zinc-500 pt-2 border-t border-zinc-900">
                    <span>JANUARY // PRESENT</span>
                    <div className="flex items-center space-x-1.5">
                      <span>LESS</span>
                      <div className="w-[8px] h-[8px] bg-zinc-900 rounded-[1px]" />
                      <div className="w-[8px] h-[8px] bg-blue-900/20 rounded-[1px]" />
                      <div className="w-[8px] h-[8px] bg-blue-600/40 rounded-[1px]" />
                      <div className="w-[8px] h-[8px] bg-indigo-500 rounded-[1px]" />
                      <span>MORE</span>
                    </div>
                  </div>
                </div>

                {/* Git Statistics Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "PULL REQUESTS", value: "100+", icon: <GitPullRequest className="w-4 h-4 text-blue-400" /> },
                    { label: "COMMITS SYNCED", value: "842+", icon: <Flame className="w-4 h-4 text-orange-400" /> },
                    { label: "REPOSITORIES", value: "12", icon: <GitFork className="w-4 h-4 text-emerald-400" /> },
                    { label: "ACADEMICS READ", value: "15+", icon: <BookOpen className="w-4 h-4 text-purple-400" /> },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl border border-zinc-800 bg-[#0d0d12]/75 backdrop-blur-md hover:border-zinc-700/80 transition-all flex items-center space-x-4 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:scale-[1.02]"
                    >
                      <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-850">
                        {stat.icon}
                      </div>
                      <div className="flex flex-col text-left font-sans">
                        <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none">
                          {stat.value}
                        </span>
                        <span className="font-mono text-[8px] text-zinc-500 tracking-wider mt-1.5">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
