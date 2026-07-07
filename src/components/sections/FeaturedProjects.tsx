"use client";

import { motion } from "framer-motion";
import {
  GitBranch,
  Cpu,
  Layers,
  Brain,
  BarChart,
  ChevronDown,
  Database,
  Globe,
  Cog,
  Search,
} from "lucide-react";
import { useState } from "react";

const projects = [
  {
    title: "GoEMP HRMS",
    subtitle: "Enterprise HRMS Platform + AI Agentic Chatbot",
    inProgress: true,
    description:
      "Enterprise HRMS platform with multi-tenant architecture — Attendance, Leave Management, Auto Payroll Processing, Contract Management, Help Desk Ticketing, and Rota/Shift Management with Agentic bot.",
    metrics: [
      { value: "200+", label: "REST APIs", icon: Layers },
      { value: "AI Agent", label: "Chatbot with RAG", icon: Brain },
      { value: "Multi-level", label: "Workflow Engine", icon: Cpu },
    ],
    features: [
      "Multi-level workflow engine (Leave, Expense, Assets)",
      "RBAC & team hierarchy",
      "Redis caching & PostgreSQL optimization",
      "Cron automation & scheduling",
      "Multi-tenant architecture",
      "AI agentic chatbot with RAG & tool calling",
      "LLM-powered HR policy Q&A & employee support",
      "Persistent AI chat with context-aware responses",
    ],
    tech: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Sequelize",
      "Redis",
      "Python",
      "LangChain",
      "FastAPI",
      "Vector DB",
    ],
    github: "https://github.com/Navinmanohar",
  },
  {
    title: "HireFlow AI",
    subtitle: "Intelligent Hiring Platform",
    inProgress: true,
    description:
      "Built a full-stack AI hiring platform powered by agentic AI, RAG-based resume analysis, and role-aware AI assistants. Features 24 custom AI tools with automated scoring and persistent chat. All AI built with Python.",
    metrics: [
      { value: "24", label: "Custom AI Tools", icon: Cpu },
      { value: "Role-aware", label: "AI Agent", icon: Layers },
      { value: "RAG-based", label: "Resume Analysis", icon: Brain },
    ],
    features: [
      "Resume parsing with AI scoring (0–100)",
      "Auto shortlisting & skill gap analysis",
      "AI interview question generation",
      "Candidate comparison & persistent AI chat",
      "HR vs Employee role-aware AI agent",
    ],
    tech: [
      "Python",
      "FastAPI",
      "Next.js 16",
      "React 19",
      "PostgreSQL",
      "SQLAlchemy",
      "Cerebras AI",
      "LLaMA 3.3 70B",
    ],
    github: "https://github.com/Navinmanohar/resume-analyzer",
  },
  {
    title: "SmartDocs AI",
    subtitle: "RAG Document Q&A System",
    description:
      "Built a RAG-powered document assistant — upload PDFs, ask questions, and get accurate AI answers with semantic search and persistent chat history.",
    features: [
      "PDF upload & vector embeddings",
      "Semantic search with ChromaDB",
      "Chat with documents interface",
      "Multi-document support",
      "Persistent chat history with SQLite",
    ],
    tech: [
      "Python",
      "FastAPI",
      "RAG",
      "ChromaDB",
      "Ollama",
      "Sentence Transformers",
      "SQLite",
    ],
    github: "https://github.com/Navinmanohar/smartdocs-ai",
  },
  {
    title: "Sentiment Analyzer",
    subtitle: "NLP Text Classifier",
    description:
      "Trained a Logistic Regression classifier on 25,000 IMDB reviews achieving 88% accuracy using Python & scikit-learn. Built a FastAPI endpoint for real-time sentiment prediction with confidence scores.",
    metrics: [
      { value: "88%", label: "Classification Accuracy", icon: BarChart },
      { value: "25K", label: "IMDB Reviews", icon: Layers },
      { value: "Real-time", label: "FastAPI Endpoint", icon: Cpu },
    ],
    features: [
      "TF-IDF vectorization pipeline",
      "Logistic Regression classifier",
      "Real-time sentiment prediction",
      "Confidence score output",
      "FastAPI REST endpoint",
    ],
    tech: [
      "Python",
      "Scikit-learn",
      "NLP",
      "TF-IDF",
      "FastAPI",
      "Pandas",
      "Joblib",
    ],
    github: "https://github.com/Navinmanohar/sentiment-analyzer",
  },
  {
    title: "Canteen Web App",
    subtitle: "Multi-Vendor Food Ordering Platform",
    description:
      "A multi-vendor web app built with the MERN stack. 3-role system: User (order/pay/track), Admin (manage items/orders), Super Admin (oversee analytics).",
    features: [
      "Multi-vendor architecture",
      "Order placement & payment",
      "Order tracking system",
      "Admin dashboard",
      "Super admin analytics",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT"],
    github: "https://github.com/Navinmanohar",
  },
  {
    title: "Social Media Platform",
    subtitle: "Real-time Backend",
    description:
      "Architected backend infrastructure supporting real-time messaging and content management with scalable database design.",
    features: [
      "Real-time messaging system",
      "Content management API",
      "Scalable database schema",
      "User authentication",
      "Friend/follow system",
    ],
    tech: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "WebSockets",
      "Redis",
    ],
    github: "https://github.com/Navinmanohar",
  },
];

export default function FeaturedProjects() {
  const [archOpen, setArchOpen] = useState(false);

  return (
    <section id="projects" className="section-padding relative">
      <div className="section-container">
        <motion.div
          style={{ opacity: 0 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="text-xs font-medium text-foreground/30 tracking-widest uppercase mb-4 block">
            Featured Projects
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
            Production-grade{" "}
            <span className="text-gradient-blue">AI & backend</span> systems
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: 0 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          <button
            onClick={() => setArchOpen(!archOpen)}
            className="flex items-center gap-2 text-xs font-medium text-foreground/40 hover:text-foreground transition-colors mb-4"
          >
            <Cpu className="w-3.5 h-3.5" />
            Architecture Overview
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${archOpen ? "rotate-180" : ""}`}
            />
          </button>

          {archOpen && (
            <motion.div
              style={{ opacity: 0 }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-card border border-border rounded-2xl p-6 overflow-hidden"
            >
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto">
                    <Globe className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-sm font-medium text-foreground">Frontend</div>
                  <div className="text-[11px] text-foreground/40">
                    Next.js 16 · React 19 · Tailwind CSS v4 · Framer Motion
                  </div>
                  <div className="text-[11px] text-foreground/30">
                    Vercel (Deploy)
                  </div>
                  <div className="mt-2 flex justify-center gap-1">
                    <span className="block w-1.5 h-1.5 rounded-full bg-accent/50" />
                    <span className="block w-8 h-px bg-border self-center" />
                    <span className="block w-1.5 h-1.5 rounded-full bg-accent/50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto">
                    <Cog className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-sm font-medium text-foreground">Backend</div>
                  <div className="text-[11px] text-foreground/40">
                    FastAPI · SQLAlchemy · Cerebras AI (LLaMA 3.1 8B) · JWT Auth
                  </div>
                  <div className="text-[11px] text-foreground/30">
                    Render / Railway (Deploy)
                  </div>
                  <div className="mt-2 flex justify-center gap-1">
                    <span className="block w-1.5 h-1.5 rounded-full bg-accent/50" />
                    <span className="block w-8 h-px bg-border self-center" />
                    <span className="block w-1.5 h-1.5 rounded-full bg-accent/50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto">
                    <Database className="w-5 h-5 text-accent" />
                  </div>
                  <div className="text-sm font-medium text-foreground">Data Layer</div>
                  <div className="text-[11px] text-foreground/40">
                    PostgreSQL · pgvector · Sentence Transformers · Resend
                  </div>
                  <div className="text-[11px] text-foreground/30">
                    Neon / Supabase (DB)
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-foreground/50 mb-3">
                  <Search className="w-3.5 h-3.5" />
                  RAG Pipeline Flow
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="bg-accent/10 text-accent border border-accent/20 rounded-md px-2 py-1">
                    User Query
                  </span>
                  <span className="text-foreground/20">→</span>
                  <span className="bg-foreground/[0.04] text-foreground/60 border border-border rounded-md px-2 py-1">
                    Embedding (384-d)
                  </span>
                  <span className="text-foreground/20">→</span>
                  <span className="bg-foreground/[0.04] text-foreground/60 border border-border rounded-md px-2 py-1">
                    pgvector Top-4
                  </span>
                  <span className="text-foreground/20">→</span>
                  <span className="bg-foreground/[0.04] text-foreground/60 border border-border rounded-md px-2 py-1">
                    Context Assembly
                  </span>
                  <span className="text-foreground/20">→</span>
                  <span className="bg-accent/10 text-accent border border-accent/20 rounded-md px-2 py-1">
                    Cerebras LLM
                  </span>
                  <span className="text-foreground/20">→</span>
                  <span className="bg-foreground/[0.04] text-foreground/60 border border-border rounded-md px-2 py-1">
                    Response
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="grid gap-6">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              style={{ opacity: 0 }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-foreground/20 transition-all duration-500"
            >
              {project.inProgress && (
                <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 text-[10px] font-medium text-amber-400/90 bg-amber-400/10 border border-amber-400/20 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  In Progress
                </div>
              )}

              <div className="grid lg:grid-cols-5 gap-6 lg:gap-10">
                <div className="lg:col-span-3">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Cpu className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium text-foreground">
                        {project.title}
                      </h3>
                      <p className="text-sm text-foreground/40">{project.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-foreground/60 leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {project.metrics && (
                    <div className="flex flex-wrap gap-3 mb-5">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="flex items-center gap-2 text-xs bg-foreground/[0.03] border border-border rounded-lg px-3 py-1.5"
                        >
                          <m.icon className="w-3 h-3 text-accent" />
                          <span className="text-foreground/80 font-medium">
                            {m.value}
                          </span>
                          <span className="text-foreground/40">{m.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mb-5">
                    <div className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-2">
                      Features
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                      {project.features.map((f) => (
                        <li
                          key={f}
                          className="text-sm text-foreground/50 flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-accent/50 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-2 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-medium text-foreground/50 uppercase tracking-wider mb-2">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] text-foreground/60 bg-foreground/[0.04] border border-border rounded-md px-2 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground/60 hover:text-foreground border border-border hover:border-foreground/20 rounded-lg px-3 py-1.5 transition-all"
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
