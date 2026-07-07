"use client";

import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Clock, Zap, BarChart } from "lucide-react";

const experiences = [
  {
    company: "AppVin Technologies",
    role: "Software Developer (Backend Lead)",
    period: "Jan 2025 — Present",
    description:
      "Leading backend development for an enterprise HRMS platform (GoEMP). Designing and building scalable APIs, workflow engines, and multi-tenant architecture serving multiple organizations.",
    impact: [
      { value: "200+", label: "REST APIs designed & deployed", icon: Briefcase },
      { value: "45%", label: "Workflow efficiency improvement", icon: TrendingUp },
      { value: "70%", label: "Scheduling automation", icon: Clock },
      { value: "30%", label: "API latency reduction", icon: Zap },
    ],
  },
  {
    company: "GeeksforGeeks",
    role: "MTS (MERN Stack)",
    period: "Jul 2023 — Oct 2024",
    description:
      "Built backend services for a large-scale Doubt Portal and mentorship platform. Implemented RBAC, secure authentication, and improved deployment workflows.",
    impact: [
      { value: "70-80%", label: "Engagement increase", icon: TrendingUp },
      { value: "30-40%", label: "Team efficiency improvement", icon: BarChart },
      { value: "30%", label: "Faster feature rollout", icon: Zap },
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="section-container">
        <motion.div
          style={{ opacity: 0 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="text-xs font-medium text-foreground/30 tracking-widest uppercase mb-4 block">
            Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
            Building in{" "}
            <span className="text-gradient-blue">production</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                style={{ opacity: 0 }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-12"
              >
                <div className="absolute left-[13px] top-[3px] w-3 h-3 rounded-full bg-accent border-2 border-background" />

                <div className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:border-foreground/20 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-base font-medium text-foreground">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-accent/80">{exp.role}</p>
                    </div>
                    <span className="text-xs text-foreground/30 shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-sm text-foreground/50 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {exp.impact.map((imp) => (
                      <div
                        key={imp.label}
                        className="flex items-center gap-1.5 text-xs bg-foreground/[0.03] border border-border rounded-lg px-3 py-1.5"
                      >
                        <imp.icon className="w-3 h-3 text-accent" />
                        <span className="text-foreground/80 font-medium">
                          {imp.value}
                        </span>
                        <span className="text-foreground/40">{imp.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
