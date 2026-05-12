"use client";

import { motion } from "framer-motion";
import { Brain, Server, Layout } from "lucide-react";

const cards = [
  {
    icon: Brain,
    title: "AI / LLM Systems",
    items: [
      "RAG Pipelines & Vector Search (ChromaDB)",
      "Agentic AI Chatbots & Tool Calling",
      "LLM API Integrations (Cerebras, Ollama)",
      "LangChain & Prompt Engineering",
      "Resume Analysis & AI Scoring",
      "NLP: TF-IDF, Sentiment Classification",
      "Scikit-learn: Naive Bayes, Random Forest",
      "Vector Embeddings & Semantic Search",
    ],
    border: "hover:border-accent/30",
  },
  {
    icon: Server,
    title: "Backend Architecture",
    items: [
      "FastAPI & Node.js Services",
      "Multi-tenant APIs (150+)",
      "RBAC & Auth Systems",
      "Workflow Engines",
      "PostgreSQL + pgvector",
      "Redis Caching",
    ],
    border: "hover:border-accent/30",
  },
  {
    icon: Layout,
    title: "Full Stack Products",
    items: [
      "Next.js + React Frontends",
      "MERN Stack Apps",
      "Admin Dashboards",
      "Real-time Systems",
      "Cron Automation",
      "CI/CD & Docker Deploy",
    ],
    border: "hover:border-accent/30",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function WhatIBuild() {
  return (
    <section className="section-padding relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="text-xs font-medium text-foreground/30 tracking-widest uppercase mb-4 block">
            What I Build
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
            Engineering across{" "}
            <span className="text-gradient-blue">AI & backend</span>
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 gap-4"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={item}
              className={`group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 ${card.border}`}
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-all">
                <card.icon className="w-5 h-5 text-accent" />
              </div>

              <h3 className="text-base font-medium text-foreground mb-4">
                {card.title}
              </h3>

              <ul className="space-y-2">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-foreground/50 group-hover:text-foreground/70 transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent/50 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
