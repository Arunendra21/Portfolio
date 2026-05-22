"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  isTyping?: boolean;
}

const QUICK_PROMPTS = [
  { label: "🚀 Who is Arunendra?", query: "who is arunendra" },
  { label: "💻 Core Tech Stack?", query: "tech stack" },
  { label: "🔬 Research Internships?", query: "research internships" },
  { label: "📂 Best Projects?", query: "projects" },
  { label: "📬 Contact Details?", query: "contact" },
];

const RESPONSES: Record<string, string> = {
  arunendra: "Arunendra Tripathi is a Software Engineer, Full Stack Developer, and AI Engineer pursuing his BTech in CSE (AI & Data Science) at IIIT Manipur. He specializes in designing robust full-stack applications, intelligent AI pipelines, and high-performance algorithms.",
  "tech stack": "My primary technical stack covers:\n• Frontend: React, Next.js (latest), TypeScript, Tailwind CSS\n• Backend: Node.js, Express.js, REST APIs\n• Databases: MongoDB, PostgreSQL, MySQL\n• Languages: JavaScript, Python, C++\n• Tools: Git, Docker, Linux, GCP, Firebase, Vercel",
  "research internships": "I have completed two prestigious research internships:\n1. IIIT Vadodara (2026 - Present): Focused on backend-driven data workflows, algorithm optimizations, and high-scalability indexing.\n2. NIT Warangal (Dec 2025 - Jan 2026): Designed system optimization models and conducted performance comparative analyses.",
  projects: "My flagship products include:\n1. CodeOrbit: Unified coding performance dashboard aggregating GitHub, LeetCode, etc., with Groq LLAMA-3 AI recommendations.\n2. ScholarSynth: AI Research Paper Analyzer leveraging Google Gemini APIs to summarize papers and compile quizzes.\n3. Food Redistribution: MERN platform coordinating surplus food collections for NGOs.",
  contact: "Let's build something extraordinary! You can reach me here:\n• Location: Prayagraj, India\n• Email: 9arunendratripathi4826@gmail.com\n(You can also use the contact form below or reach out via LinkedIn/GitHub links)",
  hire: "I am actively seeking Software Engineer, Full Stack Developer, and AI Engineer positions! I bring rich React skills, research-backed system thinking, and MERN database proficiency to high-growth teams.",
};

export default function OrbAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Neural connection secure. I am ARUN_AI_BOT v1.0. How can I assist your investigation of Arunendra's portfolio?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isAiTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsgId = Date.now().toString();
    setMessages((prev) => [...prev, { id: userMsgId, sender: "user", text }]);
    setInputValue("");
    setIsAiTyping(true);

    // Simulate AI thinking and typing response
    setTimeout(() => {
      const lower = text.toLowerCase();
      let responseText = "Analysis complete. Query parameters processed, but no direct entry found. Try asking about 'tech stack', 'projects', 'research internships', or 'who is arunendra'.";

      for (const [key, value] of Object.entries(RESPONSES)) {
        if (lower.includes(key) || key.includes(lower)) {
          responseText = value;
          break;
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "ai", text: responseText },
      ]);
      setIsAiTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-mono">
      <AnimatePresence>
        {/* Breathing Floating Hologram Orb */}
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-blue to-cyber-purple p-[2px] flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(0,240,255,0.5)] focus:outline-none hover:scale-105 transition-transform"
          >
            <div className="w-full h-full rounded-full bg-cyber-dark flex items-center justify-center relative overflow-hidden group">
              <Bot className="w-6 h-6 text-cyber-cyan group-hover:text-cyber-purple transition-colors" />
              <div className="absolute inset-0 bg-cyber-cyan/15 animate-ping rounded-full pointer-events-none" />
              <div className="absolute -inset-2 bg-gradient-radial from-cyber-cyan/20 to-transparent animate-pulse" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Full Glassmorphic Chat Widget Container */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-[90vw] sm:w-[360px] h-[480px] rounded-xl border border-cyber-cyan/20 bg-cyber-dark/95 backdrop-blur-xl flex flex-col overflow-hidden shadow-2xl filter drop-shadow-[0_0_20px_rgba(0,240,255,0.15)] tech-corner"
          >
            {/* Hologram scanline effect on chat */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />

            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-cyber-cyan/10 to-cyber-purple/10 border-b border-cyber-cyan/20 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Bot className="w-5 h-5 text-cyber-cyan" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-cyber-emerald animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-cyber-cyan tracking-wider flex items-center gap-1">
                    ARUN_AI_BOT <Sparkles className="w-3 h-3 animate-pulse" />
                  </span>
                  <span className="text-[9px] text-cyber-cyan/60">SYS_STATUS: READY</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-cyber-cyan/60 hover:text-cyber-cyan hover:bg-cyber-cyan/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Panel */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-none text-xs"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-2.5 whitespace-pre-line leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-cyber-cyan/10 border border-cyber-cyan/30 text-white rounded-tr-none"
                        : "bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-cyan rounded-tl-none"
                    }`}
                  >
                    <span className="block text-[8px] text-white/40 mb-1">
                      {msg.sender === "user" ? "INVESTIGATOR//" : "ARUN_AI//"}
                    </span>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isAiTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-lg p-2.5 bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-cyan rounded-tl-none flex items-center space-x-2">
                    <span className="text-[8px] text-white/40">COMPUTING_RESPONSE</span>
                    <span className="flex space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Action Suggestion Prompts */}
            <div className="px-4 py-2 border-t border-cyber-cyan/10 bg-cyber-black/40 flex items-center space-x-2 overflow-x-auto scrollbar-none select-none">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt.query}
                  onClick={() => handleSend(prompt.query)}
                  className="flex-shrink-0 px-2 py-1 text-[9px] rounded-full border border-cyber-cyan/30 hover:border-cyber-cyan text-cyber-cyan bg-cyber-cyan/5 hover:bg-cyber-cyan/15 transition-all"
                >
                  {prompt.label}
                </button>
              ))}
            </div>

            {/* Chat Input Panel */}
            <div className="p-3 border-t border-cyber-cyan/20 bg-cyber-black/70 flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend(inputValue);
                }}
                placeholder="Ask ARUN_AI_BOT about Arunendra..."
                className="flex-1 bg-cyber-dark border border-cyber-cyan/20 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-cyber-cyan transition-colors placeholder:text-white/20 font-mono"
              />
              <button
                onClick={() => handleSend(inputValue)}
                className="p-2 rounded-md bg-cyber-cyan/10 border border-cyber-cyan/30 hover:bg-cyber-cyan hover:text-cyber-black text-cyber-cyan transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
