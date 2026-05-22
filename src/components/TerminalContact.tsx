"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, Copy, CheckCircle, X } from "lucide-react";

export default function TerminalContact() {
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" });
  const [sending, setSending] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "Transceiver offline.",
    "Awaiting client input packets...",
  ]);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setLogs((prev) => [...prev, `Metadata copied: [${label.toUpperCase()}]`]);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.msg) {
      setLogs((prev) => [...prev, "ERROR: Missing packet fields."]);
      return;
    }

    setSending(true);
    setLogs((prev) => [
      ...prev,
      `Resolving gateway endpoint...`,
      `Encrypting packet payloads (AES-256)...`,
    ]);

    try {
      const response = await fetch("https://formspree.io/f/xwvzbpyj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.msg,
        }),
      });

      if (response.ok) {
        setLogs((prev) => [
          ...prev,
          `Connecting to mail servers...`,
          `TRANSMISSION_COMPLETE: Message successfully sent!`,
        ]);
        setFormData({ name: "", email: "", msg: "" });
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 6000);
      } else {
        throw new Error("Transmission link disrupted.");
      }
    } catch (err) {
      setLogs((prev) => [
        ...prev,
        `ERROR: Transmission gateway failed.`,
        `Please email coordinates manually.`,
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 flex items-center justify-center overflow-hidden border-t border-zinc-900 bg-[#07070a]"
    >
      {/* Background Volumetric Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] bg-blue-950/5 rounded-full filter blur-[150px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-indigo-950/5 rounded-full filter blur-[150px] pointer-events-none animate-pulse-slow" />

      {/* Grid decors */}
      <div className="absolute inset-0 bg-dot-matrix opacity-10 pointer-events-none" />

      <div className="w-[92%] max-w-6xl mx-auto flex flex-col space-y-12 z-10">
        {/* Header */}
        <div className="flex flex-col space-y-3 text-center items-center font-sans">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center space-x-1.5 text-[9px] text-zinc-400 border border-zinc-800 bg-zinc-900/40 px-3.5 py-1 rounded-full tracking-widest font-mono uppercase"
          >
            <span>CONTACT</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight"
          >
            Establish Contact
          </motion.h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans max-w-md mx-auto leading-relaxed">
            Reach out via the encrypted gateway prompt or copy telemetry coordinates directly to your terminal.
          </p>
        </div>

        {/* Contact Split Pane Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans text-xs">
          
          {/* Left Pane: Interactive Mainframe Contact Form Terminal */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full w-full">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl border border-zinc-800 bg-[#0d0d12]/75 backdrop-blur-md flex-grow flex flex-col justify-between shadow-2xl w-full"
            >
              {/* Form header */}
              <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-6">
                <span className="text-zinc-300 font-mono tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-zinc-400" />
                  CONTACT_PROMPT v1.0
                </span>
                <span className="text-[9px] text-zinc-550 font-mono">SECURE_LINK: SSL_AES_256</span>
              </div>

              {/* Form Input fields */}
              <form onSubmit={handleSubmit} className="space-y-4 flex-grow w-full">
                <div className="flex flex-col space-y-1.5 text-left w-full">
                  <label className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase">
                    [01] SENDER_NAME:
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name..."
                    className="w-full bg-zinc-950 border border-zinc-850 hover:border-zinc-750 focus:border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-650 focus:outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col space-y-1.5 text-left w-full">
                  <label className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase">
                    [02] SENDER_EMAIL:
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address..."
                    className="w-full bg-zinc-950 border border-zinc-850 hover:border-zinc-750 focus:border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-650 focus:outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col space-y-1.5 text-left w-full">
                  <label className="text-[9px] text-zinc-550 font-mono tracking-wider uppercase">
                    [03] PACKET_MESSAGE:
                  </label>
                  <textarea
                    name="msg"
                    rows={4}
                    required
                    value={formData.msg}
                    onChange={handleInputChange}
                    placeholder="Type your message details here..."
                    className="w-full bg-zinc-950 border border-zinc-850 hover:border-zinc-750 focus:border-zinc-700 rounded-xl px-4 py-2.5 text-white placeholder-zinc-650 focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 bg-white text-zinc-950 font-sans font-semibold tracking-wider uppercase rounded-xl transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-2 shadow-[0_4px_12px_rgba(255,255,255,0.15)]"
                >
                  <Send className="w-4 h-4 text-zinc-950" />
                  <span>{sending ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}</span>
                </button>
              </form>

              {/* Running Status log terminal output inside form card */}
              <div className="mt-6 bg-zinc-950 border border-zinc-900 rounded-xl p-3.5 h-28 flex flex-col relative overflow-hidden">
                <div className="absolute top-1 right-2 text-[8px] text-zinc-600 font-mono">SYS_MONITOR</div>
                <div className="flex-grow overflow-y-auto space-y-1 pr-1 text-[10px] text-zinc-400 font-mono scrollbar-none select-none text-left">
                  {logs.map((log, idx) => (
                    <div key={idx} className="flex">
                      <span className="text-zinc-600 mr-1.5">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Pane: Holographic Coordinate Map Representing Prayagraj */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4 w-full">
            
            {/* Custom high-tech SVG vector coordinate map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-zinc-800 bg-[#0d0d12]/75 backdrop-blur-md flex-grow flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[260px] w-full"
            >
              {/* Scanline pattern */}
              <div className="absolute inset-0 bg-cyber-grid-pattern bg-[size:15px_15px] opacity-[0.02]" />
              
              <div className="flex justify-between items-center border-b border-zinc-900 pb-3 z-10 relative">
                <span className="font-mono text-[9px] text-zinc-400 font-bold tracking-wider">
                  GEOMETRIC RADAR TELEMETRY
                </span>
                <span className="text-[8px] text-zinc-555 font-mono">NODE: PRAYAGRAJ_IN</span>
              </div>

              {/* Radar Coordinate Map Overlay graphic */}
              <div className="relative w-full h-[150px] flex items-center justify-center overflow-hidden my-4 z-10">
                {/* Hologram sweep sweep animation radar grids */}
                <div className="absolute w-[180px] h-[180px] rounded-full border border-zinc-800 flex items-center justify-center opacity-60">
                  <div className="absolute w-[120px] h-[120px] rounded-full border border-zinc-850" />
                  <div className="absolute w-[60px] h-[60px] rounded-full border border-zinc-900/60" />
                </div>

                {/* Animated sweeping line overlay */}
                <motion.div
                  className="absolute w-[120px] h-[1px] bg-gradient-to-r from-blue-500/80 to-transparent origin-left"
                  style={{ x: "0%", y: "0%" }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                />

                {/* target blinking coordinate node represent Prayagraj */}
                <div className="absolute w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ transform: "translate(20px, -15px)" }} />
                <div className="absolute w-1.5 h-1.5 bg-indigo-500 rounded-full" style={{ transform: "translate(20px, -15px)" }} />
                <span className="absolute text-[8px] text-zinc-400 font-mono" style={{ transform: "translate(60px, -30px)" }}>
                  LAT_25.4358 <br/> LNG_81.8463
                </span>
              </div>

              <div className="border-t border-zinc-900 pt-3 flex flex-col space-y-1.5 text-left z-10 relative">
                <span className="font-mono text-[8px] text-zinc-500">CURRENT_LOC:</span>
                <span className="font-semibold text-[11px] text-white tracking-wide uppercase">
                  Prayagraj, Uttar Pradesh, India
                </span>
              </div>
            </motion.div>

            {/* Quick-copy coordinate details stack panel */}
            <div className="flex flex-col space-y-3 w-full">
              {[
                { label: "Email Address", val: "9arunendratripathi4826@gmail.com" },
              ].map((meta, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCopy(meta.val, meta.label)}
                  className="p-3.5 border border-zinc-800 bg-[#0d0d12]/70 hover:border-zinc-700/80 rounded-xl flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01] group w-full"
                >
                  <div className="flex flex-col text-left space-y-1">
                    <span className="font-mono text-[8px] text-zinc-500 uppercase">
                      {meta.label}
                    </span>
                    <span className="text-[11px] font-semibold text-white tracking-wide break-all max-w-[200px] sm:max-w-none">
                      {meta.val}
                    </span>
                  </div>
                  <button className="p-2 rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white transition-colors">
                    {copied === meta.label ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Sci-fi Glassmorphic Success Toast Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-6 right-6 z-[99999] max-w-sm sm:max-w-md p-5 rounded-2xl border border-emerald-500/30 bg-[#0d0d12]/90 backdrop-blur-md shadow-[0_12px_40px_rgba(16,185,129,0.15)] flex gap-4 select-none font-sans text-left"
          >
            <div className="p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 self-start">
              <CheckCircle className="w-5 h-5 animate-bounce" />
            </div>
            
            <div className="flex-grow space-y-1">
              <h4 className="font-bold text-sm text-white tracking-wide uppercase">
                TRANSMISSION COMPLETE
              </h4>
              <p className="text-[10px] sm:text-xs text-zinc-400 leading-relaxed font-mono">
                [SUCCESS]: Message successfully routed to communications array. Arunendra will receive your coordinates shortly.
              </p>
            </div>

            <button
              onClick={() => setShowPopup(false)}
              className="p-1 rounded-lg hover:bg-zinc-900 border border-transparent hover:border-zinc-800 text-zinc-500 hover:text-white transition-all self-start"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
