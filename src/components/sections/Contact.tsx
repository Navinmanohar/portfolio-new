"use client";

import { motion } from "framer-motion";
import { Mail, GitBranch, Globe, ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="text-xs font-medium text-foreground/30 tracking-widest uppercase mb-4 block">
            Get in Touch
          </span>

          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-6">
            Let&apos;s build something{" "}
            <span className="text-gradient-blue">intelligent</span>
          </h2>

          <p className="text-sm sm:text-base text-foreground/50 leading-relaxed mb-8">
            Available for AI Engineering, Backend Engineering,
            and Full Stack AI Product roles.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <a
              href="mailto:navinmanohar78086@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground h-10 px-5 rounded-xl hover:bg-primary/90 transition-all"
            >
              <Mail className="w-4 h-4" />
              navinmanohar78086@gmail.com
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/Navinmanohar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-foreground/40 hover:text-foreground transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/navin-manohar-48b1a5226/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-foreground/40 hover:text-foreground transition-colors"
            >
              <Globe className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
