"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Sparkles } from "lucide-react";
import Image from "next/image";

// Rotating typewriter subtitles
const SUBTITLES = [
  "Software Engineer",
  "Full Stack Developer",
  "AI Builder",
  "Problem Solver",
  "Open Source Contributor"
];

// Stats metrics
const STATS = [
  { label: "PRs Merged", value: 100, suffix: "+" },
  { label: "Projects Built", value: 15, suffix: "+" },
  { label: "Research Internships", value: 2, suffix: "" },
  { label: "Tech Skills Learned", value: 25, suffix: "+" },
];

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const LeetCodeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414 0-1.954l-2.36-2.333c-.54-.54-1.41-.54-1.95 0l-2.38 2.38c-.54.54-1.41.54-1.95 0l-.39-.39c-.54-.54-.54-1.41 0-1.95l2.39-2.38c.54-.54.54-1.41 0-1.95l-2.38-2.38c-.54-.54-.54-1.41 0-1.95l.39-.39c.54-.54 1.41-.54 1.95 0l6.77 6.77c.54.54 1.41.54 1.95 0l2.38-2.38c.54-.54.54-1.41 0-1.95l-6.77-6.77c-.27-.27-.64-.44-1.03-.44z"/>
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [subIdx, setSubIdx] = useState(0);
  const [subText, setSubText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [resumeSynthesizing, setResumeSynthesizing] = useState(false);
  const [synthesisProgress, setSynthesisProgress] = useState(0);

  // 1. Matrix Code Rain Canvas (Cyan & Purple theme)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&+-/*";
    const fontSize = 14;
    const columns = width / fontSize;
    const rainDrops = Array.from({ length: columns }, () => 1);

    const draw = () => {
      // Create a fading translucent black overlay to trail the characters
      ctx.fillStyle = "rgba(3, 3, 8, 0.08)";
      ctx.fillRect(0, 0, width, height);

      // Randomize drops coloring between cyber cyan and purple
      rainDrops.forEach((y, x) => {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillStyle = Math.random() > 0.5 ? "#00f0ff" : "#b923ff";
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(text, x * fontSize, y * fontSize);

        if (y * fontSize > height && Math.random() > 0.975) {
          rainDrops[x] = 0;
        }
        rainDrops[x]++;
      });
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 2. Typewriter Effect
  useEffect(() => {
    const handleType = () => {
      const fullText = SUBTITLES[subIdx];
      if (!isDeleting) {
        setSubText(fullText.substring(0, subText.length + 1));
        setTypingSpeed(100);
        if (subText === fullText) {
          // Pause at full word before deleting
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        setSubText(fullText.substring(0, subText.length - 1));
        setTypingSpeed(50);
        if (subText === "") {
          setIsDeleting(false);
          setSubIdx((prev) => (prev + 1) % SUBTITLES.length);
        }
      }
    };

    const typingTimeout = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [subText, isDeleting, subIdx, typingSpeed]);

  // Trigger stats animation delay
  useEffect(() => {
    const timer = setTimeout(() => setStatsLoaded(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  // 3. Resume Synthesizer System
  const triggerResumeSynthesis = () => {
    if (resumeSynthesizing) return;
    setResumeSynthesizing(true);
    setSynthesisProgress(0);

    const progressTimer = setInterval(() => {
      setSynthesisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            setResumeSynthesizing(false);
            // Open a futuristic formatted print/text resume screen
            const resumeWindow = window.open("", "_blank");
            if (resumeWindow) {
              resumeWindow.document.write(getResumeHtml());
              resumeWindow.document.close();
            }
          }, 600);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const getResumeHtml = () => {
    return `
      <html>
        <head>
          <title>Arunendra Tripathi - Synthesized Core Resume</title>
          <style>
            body { font-family: monospace; background: #030308; color: #f3f4f6; padding: 40px; margin: 0; line-height: 1.5; }
            .container { max-width: 800px; margin: 0 auto; border: 1px solid #00f0ff; padding: 30px; box-shadow: 0 0 20px rgba(0, 240, 255, 0.2); background: rgba(8, 8, 21, 0.95); }
            h1 { font-family: sans-serif; color: #00f0ff; margin-bottom: 5px; text-transform: uppercase; border-bottom: 2px solid #b923ff; padding-bottom: 10px; }
            .subtitle { color: #b923ff; margin-bottom: 20px; font-weight: bold; }
            .section-title { color: #00f0ff; text-transform: uppercase; margin-top: 30px; border-bottom: 1px dashed rgba(0, 240, 255, 0.4); padding-bottom: 5px; }
            .exp-item, .proj-item { margin-bottom: 15px; }
            .item-header { display: flex; justify-content: space-between; font-weight: bold; color: #00ffb3; }
            a { color: #00f0ff; text-decoration: none; }
            a:hover { text-decoration: underline; }
            .btn-print { background: #00f0ff; color: #030308; border: none; padding: 10px 20px; font-weight: bold; cursor: pointer; margin-bottom: 20px; font-family: monospace; }
            .btn-print:hover { background: #b923ff; color: white; }
            @media print { .btn-print { display: none; } body { background: white; color: black; padding: 20px; } .container { border: none; box-shadow: none; background: white; color: black; } h1 { border-bottom: 2px solid black; color: black; } .section-title { color: black; border-bottom: 1px dashed black; } .item-header { color: black; } }
          </style>
        </head>
        <body>
          <div style="max-width: 800px; margin: 0 auto;">
            <button class="btn-print" onclick="window.print()">[PRINT / SAVE TO PDF]</button>
          </div>
          <div class="container">
            <h1>ARUNENDRA TRIPATHI</h1>
            <div class="subtitle">SOFTWARE ENGINEER | FULL STACK DEVELOPER | AI ENGINEER</div>
            <p>
              <strong>Email:</strong> 9arunendratripathi4826@gmail.com | 
              <strong>Location:</strong> Prayagraj, India <br/>
              <strong>GitHub:</strong> <a href="https://github.com/Arunendra21" target="_blank">github.com/Arunendra21</a> | 
              <strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/arunendratripathi/" target="_blank">linkedin.com/in/arunendratripathi</a>
            </p>
            
            <div class="section-title">EDUCATION</div>
            <div class="exp-item" style="margin-top: 10px;">
              <div class="item-header">
                <span>IIIT Manipur</span>
                <span>2023 - 2027</span>
              </div>
              <div>B.Tech in Computer Science and Engineering (Specialization in AI & Data Science)</div>
            </div>

            <div class="section-title">RESEARCH & WORK EXPERIENCE</div>
            <div class="exp-item" style="margin-top: 10px;">
              <div class="item-header">
                <span>Dciphers IT Solutions - Software Engineer Intern</span>
                <span>May 2026 - Present</span>
              </div>
              <div>• Designed and built highly performant, responsive web interfaces and microservice architectures.</div>
              <div>• Optimized backend API payloads and formulated structured indexing schemas to accelerate query processing.</div>
            </div>
            
            <div class="exp-item">
              <div class="item-header">
                <span>IIIT Vadodara - Research Intern</span>
                <span>Jan 2026 - Present</span>
              </div>
              <div>• Formulated data-driven backend workflows and system index optimizers.</div>
              <div>• Benchmarked and optimized algorithms for deep scalability.</div>
            </div>

            <div class="exp-item">
              <div class="item-header">
                <span>NIT Warangal - Research Intern</span>
                <span>Dec 2025 - Jan 2026</span>
              </div>
              <div>• Modeled advanced computational systems and optimization procedures.</div>
              <div>• Conducted thorough comparative performance analyses.</div>
            </div>

            <div class="section-title">TECHNICAL SKILLS</div>
            <p>
              <strong>Languages:</strong> JavaScript, TypeScript, C++, Python, HTML, CSS <br/>
              <strong>Frontend:</strong> React, Next.js, Tailwind CSS <br/>
              <strong>Backend & DB:</strong> Node.js, Express.js, MongoDB, PostgreSQL, MySQL <br/>
              <strong>Tools & Cloud:</strong> Git, GitHub, Docker, Linux, GCP, Firebase, Vercel
            </p>

            <div class="section-title">FLAGSHELF PROJECTS</div>
            <div class="proj-item" style="margin-top: 10px;">
              <div class="item-header">
                <span>CodeOrbit – Coding Performance Dashboard</span>
                <span>Next.js, Node.js, MongoDB</span>
              </div>
              <div>• Aggregates live metrics from LeetCode, GitHub, Codeforces; delivers Groq AI growth insights.</div>
            </div>
            <div class="proj-item">
              <div class="item-header">
                <span>ScholarSynth – AI Research Analysis Core</span>
                <span>React, Gemini API, KaTeX</span>
              </div>
              <div>• Parses research PDFs using Gemini APIs to output smart quizzes, digests, and math formulas.</div>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden select-none"
    >
      {/* 1. Interactive Matrix Rain Background Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20 pointer-events-none" />

      {/* Cyber Grid Lines Overlay */}
      <div className="absolute inset-0 bg-cyber-grid-pattern bg-[size:40px_40px] opacity-[0.05] z-0 pointer-events-none" />

      {/* Volumetric Neon Ambient Lights */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-cyber-cyan/5 rounded-full filter blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[10%] w-[350px] h-[350px] bg-cyber-purple/5 rounded-full filter blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: "2s" }} />

      <div className="w-[92%] max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 z-10 items-center">
        {/* Left Hand: Hero Information Console */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          {/* Cyber Title Header Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="self-start flex items-center space-x-1.5 text-[9px] text-zinc-400 bg-zinc-900/40 border border-zinc-800 px-3.5 py-1 rounded-full tracking-widest font-mono uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>COMMAND_ROOT // SYSTEM: ACTIVE</span>
          </motion.div>

          {/* Name Header */}
          <div className="flex flex-col space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-sans font-extrabold text-4xl sm:text-7xl text-white tracking-tight uppercase"
            >
              Arunendra
              <br />
              Tripathi
            </motion.h1>

            {/* Typewriter text subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-mono text-base sm:text-2xl text-cyber-emerald/90 flex items-center tracking-widest min-h-[40px]"
            >
              <span>{"// "}</span>
              <span className="ml-2 font-bold">{subText}</span>
              <span className="ml-1 w-2.5 h-6 bg-cyber-emerald animate-pulse inline-block" />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-white/70 max-w-xl text-sm sm:text-base leading-relaxed"
          >
            Undergraduate CSE (AI & Data Science) student at IIIT Manipur. Research-driven
            Software Engineer specializing in AI pipeline engineering, MERN databases,
            and computational systems optimization. Drawing blueprints for the future of intelligent products.
          </motion.p>

          {/* CTAs and Resume synthesis button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-xl bg-white text-zinc-950 font-sans font-semibold text-xs tracking-wider transition-all duration-300 hover:bg-zinc-200 active:scale-[0.98] shadow-[0_4px_12px_rgba(255,255,255,0.15)]"
            >
              VIEW PROJECTS
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-xl bg-transparent border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-sans font-semibold text-xs tracking-wider transition-all duration-300 hover:bg-zinc-900 active:scale-[0.98]"
            >
              GET IN TOUCH
            </a>
            <button
              onClick={triggerResumeSynthesis}
              disabled={resumeSynthesizing}
              className="px-6 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-sans font-semibold text-xs tracking-wider transition-all duration-300 hover:bg-zinc-800 active:scale-[0.98] flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>{resumeSynthesizing ? `SYNTHESIZING... ${synthesisProgress}%` : "SYNTHESIZE RESUME"}</span>
            </button>
          </motion.div>

          {/* Social icons glow row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex items-center space-x-4 pt-4"
          >
            {[
              { icon: <GithubIcon className="w-4 h-4" />, url: "https://github.com/Arunendra21", label: "Github" },
              { icon: <LinkedinIcon className="w-4 h-4" />, url: "https://www.linkedin.com/in/arunendratripathi/", label: "LinkedIn" },
              { icon: <LeetCodeIcon className="w-4 h-4" />, url: "https://leetcode.com", label: "LeetCode" },
              { icon: <MailIcon className="w-4 h-4" />, url: "mailto:9arunendratripathi4826@gmail.com", label: "Email" },
            ].map((soc, idx) => (
              <a
                key={idx}
                href={soc.url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-900 transition-all hover:scale-110"
                aria-label={soc.label}
              >
                {soc.icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right Hand: Interactive Hologram Profile Frame */}
        <div className="lg:col-span-5 flex justify-center items-center relative select-none">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-3xl border border-zinc-800 bg-[#0d0d12]/75 backdrop-blur-md overflow-hidden shadow-2xl group animate-pulse-slow"
          >
            {/* Profile Avatar Image */}
            <div className="absolute inset-0 p-4 z-10">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-zinc-850 bg-zinc-950">
                <Image
                  src="/arunendra_photo.jpeg"
                  alt="Arunendra Tripathi Avatar Hologram"
                  fill
                  priority
                  className="object-cover opacity-90 group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-cyber-grid-pattern bg-[size:15px_15px] opacity-[0.02] z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none z-10" />
              </div>
            </div>

            {/* Hologram targeting widgets decor */}
            <div className="absolute top-6 left-6 z-20 font-mono text-[8px] text-zinc-500 tracking-wider">
              <span>TARGET_SYSTEM: ON</span>
              <br />
              <span>LOCK: 99.4%</span>
            </div>
            <div className="absolute bottom-6 right-6 z-20 font-mono text-[8px] text-zinc-500 tracking-wider text-right">
              <span>SYS_SYNC: OK</span>
              <br />
              <span>FACIAL_ID: ARUN_T</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Statistics Countdown row */}
      <div className="absolute bottom-6 left-0 w-full z-10">
        <div className="w-[92%] max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={statsLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="p-4 flex flex-col items-center justify-center border border-zinc-800 bg-[#0d0d12]/75 backdrop-blur-md rounded-2xl hover:border-zinc-700/80 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
              >
                <span className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  {/* High performance ticker counter */}
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-zinc-500 tracking-wider text-center mt-1.5 uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
