import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ChatProvider } from "@/components/ai-assistant/ChatContext";
import ChatWrapper from "@/components/ai-assistant/ChatWrapper";
import VisitorTracker from "@/components/VisitorTracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Navin Manohar | AI Engineer | Full Stack Developer | Backend Developer",
  description:
    "AI Engineer | Full Stack Developer | Backend Developer with 2+ years experience building production-grade AI systems, RAG pipelines, agentic AI, FastAPI/Node.js backends, and scalable APIs. Built 150+ APIs, AI hiring platforms, and enterprise systems.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Backend Developer",
    "RAG",
    "FastAPI",
    "Node.js",
    "PostgreSQL",
    "Python",
    "LangChain",
    "Agentic AI",
    "Full Stack Engineer",
  ],
  openGraph: {
    title: "Navin Manohar | AI Engineer | Full Stack Developer | Backend Developer",
    description:
      "Building scalable AI systems, enterprise backends, RAG pipelines, and intelligent automation products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <ChatProvider>
            {children}
            <VisitorTracker />
            <ChatWrapper />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
