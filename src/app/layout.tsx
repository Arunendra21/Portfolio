import type { Metadata } from "next";
import { Inter, Orbitron, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const shareTech = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arunendra Tripathi | Full Stack & Go Engineer, AI/ML Researcher",
  description: "Portfolio of Arunendra Tripathi — Full Stack & Go (Golang) Software Engineer, AI/ML Research Intern (IIIT Vadodara, NIT Warangal), and Kaggle Silver Medalist. Building high-performance Go + Fiber backends, React/Next.js frontends, and AI systems.",
  keywords: [
    "Arunendra Tripathi",
    "Software Engineer",
    "Full Stack Developer",
    "Go Developer",
    "Golang Backend Engineer",
    "AI ML Researcher",
    "Kaggle Silver Medalist",
    "IIIT Manipur",
    "Research Intern",
    "Next.js Portfolio",
    "Reversible Data Hiding"
  ],
  authors: [{ name: "Arunendra Tripathi" }],
  metadataBase: new URL("https://arunendra.dev"),
  openGraph: {
    title: "Arunendra Tripathi | Full Stack & Go Engineer, AI/ML Researcher",
    description: "Full Stack & Go Software Engineer, AI/ML Research Intern, and Kaggle Silver Medalist.",
    url: "https://arunendra.dev",
    siteName: "Arunendra Tripathi Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${orbitron.variable} ${shareTech.variable} antialiased bg-cyber-black text-foreground font-sans`}
      >
        <div className="scanlines" />
        {children}
      </body>
    </html>
  );
}
