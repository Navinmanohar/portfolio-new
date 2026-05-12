"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-border py-8"
    >
      <div className="section-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/30">
            &copy; {new Date().getFullYear()} Navin Manohar. Built with Next.js
            & Tailwind CSS.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
            >
              Home
            </a>
            <a
              href="#projects"
              className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-xs text-foreground/30 hover:text-foreground/60 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
