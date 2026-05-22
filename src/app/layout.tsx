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
  title: "Arunendra Tripathi | AI Developer & Full Stack Software Engineer",
  description: "Step into the futuristic command center portfolio of Arunendra Tripathi. Full Stack Software Engineer, Research Intern (IIIT Vadodara, NIT Warangal), and AI Builder specializing in Next.js, MERN Stack, and Intelligent Systems.",
  keywords: [
    "Arunendra Tripathi",
    "Software Engineer",
    "Full Stack Developer",
    "AI Engineer",
    "IIIT Manipur",
    "Research Intern",
    "Next.js Portfolio",
    "Cyberpunk Portfolio",
    "Web Developer Portfolio",
    "Systems Engineer"
  ],
  authors: [{ name: "Arunendra Tripathi" }],
  metadataBase: new URL("https://arunendra.dev"),
  openGraph: {
    title: "Arunendra Tripathi | AI Developer & Full Stack Software Engineer",
    description: "Futuristic interactive command center portfolio of Arunendra Tripathi.",
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
