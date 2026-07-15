"use client";

import { motion } from "framer-motion";
import { GitBranch, Star, GitFork, Code, ExternalLink } from "lucide-react";

const repos = [
  {
    name: "resume-analyzer",
    desc: "AI hiring platform — RAG resume analysis, agentic chatbot, 24 custom tools, role-aware AI.",
    lang: "Python",
    stars: 18,
    forks: 4,
  },
  {
    name: "smartdocs-ai",
    desc: "RAG document Q&A — PDF upload, vector search with ChromaDB, persistent chat.",
    lang: "Python",
    stars: 12,
    forks: 3,
  },
  {
    name: "goemp-hrms-api",
    desc: "Enterprise HRMS — 1500+ REST APIs, workflow engine, RBAC, Redis caching, cron automation.",
    lang: "JavaScript",
    stars: 15,
    forks: 5,
  },
];

export default function GitHub() {
  return (
    <section className="section-padding relative">
      <div className="section-container">
        <motion.div
          style={{ opacity: 0 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-xs font-medium text-foreground/30 tracking-widest uppercase mb-4 block">
            Code
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
            Open source &{" "}
            <span className="text-gradient-blue">contributions</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {repos.map((repo, idx) => (
            <motion.a
              key={repo.name}
              href={`https://github.com/Navinmanohar/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ opacity: 0 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group block rounded-xl border border-border bg-card p-5 hover:border-foreground/20 hover:bg-muted transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="w-4 h-4 text-foreground/40" />
                <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  {repo.name}
                </span>
                <ExternalLink className="w-3 h-3 text-foreground/20 ml-auto" />
              </div>
              <p className="text-xs text-foreground/40 leading-relaxed mb-4 line-clamp-2">
                {repo.desc}
              </p>
              <div className="flex items-center gap-4 text-xs text-foreground/30">
                <span className="flex items-center gap-1">
                  <Code className="w-3 h-3" />
                  {repo.lang}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {repo.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="w-3 h-3" />
                  {repo.forks}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          style={{ opacity: 0 }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6"
        >
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-foreground/40" />
                <span className="text-sm font-medium text-foreground/70">
                  Contribution Activity
                </span>
              </div>
              <a
                href="https://github.com/Navinmanohar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent hover:text-accent/80 transition-colors"
              >
                View profile
              </a>
            </div>
            <div className="flex gap-0.5 items-end h-20">
              {[
                3, 1, 0, 4, 2, 0, 1, 5, 3, 0, 2, 3, 4, 1, 1, 2, 0, 4, 3, 2,
                0, 1, 3, 5, 2, 0, 1, 3, 4, 2, 0, 1, 5, 3, 2, 4, 0, 1, 2, 3,
                5, 1, 0, 2, 4, 3, 1, 0, 2, 3, 5, 1, 0, 2, 4, 3, 1, 0, 2, 3,
                5, 1, 0, 2, 4, 3, 1, 0, 2, 3, 5, 1, 0, 2, 4, 3, 1, 0, 2, 3,
                5, 1, 0, 2, 4, 3, 1, 0, 2, 3, 5, 1, 0, 2, 4, 3, 0, 1, 2, 3,
              ].map((v, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm transition-all hover:opacity-80"
                  style={{
                    height: `${Math.max(v * 16, 4)}px`,
                    backgroundColor:
                      v === 0
                        ? "color-mix(in srgb, var(--foreground) 6%, transparent)"
                        : v <= 2
                        ? "color-mix(in srgb, var(--accent) 25%, transparent)"
                        : v <= 4
                        ? "color-mix(in srgb, var(--accent) 45%, transparent)"
                        : "color-mix(in srgb, var(--accent) 65%, transparent)",
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-foreground/20">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
