"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, GitBranch, Globe, ArrowUpRight, Send, FileText } from "lucide-react";
import ResumeRequestModal from "@/components/ResumeRequestModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Contact() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/contact/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company: company || null, role: role || null }),
      });

      if (!res.ok) throw new Error("Failed");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent pointer-events-none" />

      <div className="section-container">
        <motion.div
          style={{ opacity: 0 }}
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

          <p className="text-sm sm:text-base text-foreground/50 leading-relaxed mb-6">
            Available for AI Engineering, Full Stack Development,
            and Backend Engineering roles.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: 0 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-lg mx-auto mb-8"
        >
          {sent ? (
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                <Send className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-sm text-foreground mb-1">Message sent!</p>
              <p className="text-xs text-foreground/40">I&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground/60 block mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground/60 block mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    suppressHydrationWarning
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-foreground/60 block mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company (optional)"
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground/60 block mb-1">
                    Role
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Role (optional)"
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 outline-none focus:border-accent/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground/60 block mb-1">
                  Message *
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project or opportunity"
                  required
                  rows={3}
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 outline-none focus:border-accent/50 transition-colors resize-none"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white text-sm font-medium h-9 rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </motion.div>

        <motion.div
          style={{ opacity: 0 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <button
            onClick={() => setResumeOpen(true)}
            className="inline-flex items-center gap-2 text-sm font-medium border border-accent/30 text-accent h-10 px-5 rounded-xl hover:bg-accent/10 transition-all"
          >
            <FileText className="w-4 h-4" />
            Request Resume
          </button>
          <a
            href="mailto:navinmanohar78086@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground h-10 px-5 rounded-xl hover:bg-primary/90 transition-all"
          >
            <Mail className="w-4 h-4" />
            Email Direct
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        <motion.div
          style={{ opacity: 0 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4"
        >
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
        </motion.div>
      </div>

      <ResumeRequestModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
