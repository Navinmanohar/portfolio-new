"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import { useChat } from "@/components/ai-assistant/ChatContext";
import { Sun, Moon, Sparkles } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggle } = useTheme();
  const { open: openChat } = useChat();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems.map((item) => item.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <a
          href="#"
          className="text-sm font-medium tracking-tight text-foreground/90 hover:text-foreground transition-colors"
        >
          NM<span className="text-blue-500">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm transition-colors duration-200",
                activeSection === item.href.slice(1)
                  ? "text-foreground"
                  : "text-foreground/50 hover:text-foreground/80"
              )}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={toggle}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-border hover:bg-muted transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-foreground/70" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-foreground/70" />
            )}
          </button>
          <button
            onClick={openChat}
            className="flex items-center gap-1.5 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI
          </button>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium bg-primary text-primary-foreground h-8 px-4 rounded-lg hover:bg-primary/90 transition-all"
          >
            Hire Me
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggle}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-border hover:bg-muted transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-3.5 h-3.5 text-foreground/70" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-foreground/70" />
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative w-6 h-6 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block w-5 h-px bg-foreground/70 transition-all duration-300",
                  mobileOpen && "rotate-45 translate-y-1"
                )}
              />
              <span
                className={cn(
                  "block w-5 h-px bg-foreground/70 transition-all duration-300",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block w-5 h-px bg-foreground/70 transition-all duration-300",
                  mobileOpen && "-rotate-45 -translate-y-1"
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col px-4 py-4 gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => { openChat(); setMobileOpen(false); }}
                className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors py-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Assistant
              </button>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 text-sm font-medium bg-primary text-primary-foreground h-9 px-4 rounded-lg hover:bg-primary/90 transition-all mt-2"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
