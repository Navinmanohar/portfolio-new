"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileText, GitBranch, Sparkles } from "lucide-react";
import { useChat } from "@/components/ai-assistant/ChatContext";

const floatingCards = [
  { label: "RAG Systems", sub: "Vector Search", x: "10%", y: "20%", delay: 0 },
  { label: "FastAPI", sub: "Python Backend", x: "70%", y: "15%", delay: 0.15 },
  { label: "PostgreSQL", sub: "pgvector", x: "80%", y: "55%", delay: 0.3 },
  { label: "Cerebras AI", sub: "LLaMA 3.3 70B", x: "15%", y: "60%", delay: 0.45 },
];

export default function Hero() {
  const { open: openChat } = useChat();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="section-container w-full pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-medium text-foreground/40 border border-border rounded-full px-3 py-1 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-4"
            >
              <span>Navin Manohar</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-lg sm:text-xl text-accent font-medium">
                AI Engineer
              </span>
              <span className="text-lg sm:text-xl text-foreground/40 mx-2">|</span>
              <span className="text-lg sm:text-xl text-foreground/70">
                Backend Developer
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base sm:text-lg text-foreground/60 leading-relaxed max-w-xl mb-3"
            >
              Building scalable AI systems, enterprise backends, RAG pipelines, and intelligent automation products.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm text-foreground/40 leading-relaxed max-w-xl mb-8"
            >
              2+ years of experience building production-grade APIs, AI applications, multi-tenant systems, and workflow automation — with measurable impact: 150+ APIs, 45% efficiency gains, and end-to-end AI platforms.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 text-sm font-medium bg-primary text-primary-foreground h-9 px-5 rounded-lg hover:bg-primary/90 transition-all"
              >
                View Projects
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="/Navin_Manohar_Resume_Updated_compressed.pdf"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-sm font-medium border border-border text-foreground/80 h-9 px-5 rounded-lg hover:bg-muted hover:text-foreground transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                Download Resume
              </a>
              <a
                href="https://github.com/Navinmanohar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium border border-border text-foreground/80 h-9 px-5 rounded-lg hover:bg-muted hover:text-foreground transition-all"
              >
                <GitBranch className="w-3.5 h-3.5" />
                GitHub
              </a>
              <button
                onClick={openChat}
                className="inline-flex items-center gap-1.5 text-sm font-medium border border-accent/30 text-accent h-9 px-5 rounded-lg hover:bg-accent/10 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask AI
              </button>
            </motion.div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              {floatingCards.map((card) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + card.delay,
                    ease: "easeOut",
                  }}
                  className="absolute"
                  style={{ left: card.x, top: card.y }}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: card.delay,
                    }}
                    className="bg-card border border-border rounded-xl p-3.5 min-w-[140px] backdrop-blur-sm"
                  >
                    <div className="text-xs font-medium text-foreground/90 mb-0.5">
                      {card.label}
                    </div>
                    <div className="text-[10px] text-foreground/40">{card.sub}</div>
                  </motion.div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-card border border-border rounded-2xl p-5 min-w-[180px] backdrop-blur-sm glow"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs text-foreground/50">AI Systems Active</span>
                  </div>
                  <div className="text-2xl font-medium text-foreground mb-1">150+</div>
                  <div className="text-[11px] text-foreground/40">
                    REST APIs & AI Tools Deployed
                  </div>
                  <div className="mt-3 flex gap-1.5">
                    <div className="h-1.5 flex-1 rounded-full bg-accent/30 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                    <div className="h-1.5 flex-1 rounded-full bg-accent/30 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                    <div className="h-1.5 flex-1 rounded-full bg-accent/30 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "92%" }}
                        transition={{ duration: 1.5, delay: 1.4, ease: "easeOut" }}
                        className="h-full rounded-full bg-accent"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
