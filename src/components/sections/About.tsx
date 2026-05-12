"use client";

import { motion } from "framer-motion";
import { Cpu, Network, Workflow, Brain } from "lucide-react";

const highlights = [
  {
    icon: Brain,
    label: "AI Engineering",
    desc: "RAG pipelines, agentic AI chatbots, LLM integrations, vector databases, and prompt engineering.",
  },
  {
    icon: Cpu,
    label: "Backend Architecture",
    desc: "Multi-tenant APIs, RBAC, workflow engines, FastAPI & Node.js services at scale.",
  },
  {
    icon: Network,
    label: "Database & ML",
    desc: "PostgreSQL with pgvector, Redis caching, Sequelize, and scikit-learn NLP classifiers.",
  },
  {
    icon: Workflow,
    label: "Production Impact",
    desc: "150+ APIs, 45% efficiency gains, 70% scheduling automation, 30% latency reduction.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <span className="text-xs font-medium text-foreground/30 tracking-widest uppercase mb-4 block">
            Engineering Mindset
          </span>

          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight leading-[1.15] mb-6">
            Backend developer turned{" "}
            <span className="text-gradient-blue">AI Engineer</span>
          </h2>

          <p className="text-base sm:text-lg text-foreground/60 leading-relaxed max-w-3xl mb-10">
            From workflow engines and RBAC architectures to RAG pipelines, agentic chatbots, 
            and LLM-powered systems — I engineer production-grade solutions that bridge the gap 
            between AI capabilities and enterprise reliability. Proficient in Node.js, FastAPI, 
            PostgreSQL, and LLM-powered systems with a proven track record of delivering 
            measurable impact.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group flex gap-3 p-4 rounded-xl border border-border bg-foreground/[0.02] hover:bg-muted hover:border-border transition-all"
              >
                <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground/90 mb-1">
                    {item.label}
                  </div>
                  <div className="text-xs text-foreground/40 leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
