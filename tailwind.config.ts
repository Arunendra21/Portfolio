import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030308",
        foreground: "#f3f4f6",
        cyber: {
          black: "#030308",
          dark: "#080815",
          gray: "#0d0d22",
          lightgray: "#161633",
          cyan: "#00f0ff",
          purple: "#b923ff",
          blue: "#0066ff",
          emerald: "#00ffb3",
          pink: "#ff007f",
        },
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        mono: ["var(--font-share-tech)", "monospace"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "neon-cyan": "0 0 10px rgba(0, 240, 255, 0.3), 0 0 20px rgba(0, 240, 255, 0.1)",
        "neon-purple": "0 0 10px rgba(185, 35, 255, 0.3), 0 0 20px rgba(185, 35, 255, 0.1)",
        "neon-blue": "0 0 10px rgba(0, 102, 255, 0.3), 0 0 20px rgba(0, 102, 255, 0.1)",
        "neon-emerald": "0 0 10px rgba(0, 255, 179, 0.3), 0 0 20px rgba(0, 255, 179, 0.1)",
        "cyber-grid": "inset 0 0 20px rgba(0, 240, 255, 0.05)",
      },
      backgroundImage: {
        "cyber-grid-pattern": "linear-gradient(rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.05) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "scanline": "scanline 6s linear infinite",
        "cyber-blink": "cyber-blink 1.5s infinite alternate",
        "glitch": "glitch 1s linear infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        "cyber-blink": {
          "0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%": {
            opacity: "1",
            filter: "drop-shadow(0 0 8px rgba(0, 240, 255, 0.8))",
          },
          "20%, 24%, 55%": {
            opacity: "0.5",
            filter: "none",
          },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
