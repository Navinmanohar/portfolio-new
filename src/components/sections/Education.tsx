"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    school: "Bhagwan Parshuram Institute of Technology",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2020 — 2024",
    score: "80%",
  },
  {
    school: "Government Polytechnic College",
    degree: "Diploma in Electrical Engineering",
    period: "2017 — 2020",
    score: "75%",
  },
];

const certificates = [
  {
    title: "Full Stack Web Development",
    issuer: "GeeksforGeeks",
    date: "Mar 2023",
  },
  {
    title: "Data Structure and Algorithm",
    issuer: "Udemy",
    date: "Aug 2023",
  },
];

export default function Education() {
  return (
    <section className="section-padding relative">
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
            Education
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
            Academic background &{" "}
            <span className="text-gradient-blue">certifications</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {education.map((edu, idx) => (
            <motion.div
              key={edu.school}
              style={{ opacity: 0 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-xl border border-border bg-card p-5 hover:border-foreground/20 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4.5 h-4.5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-foreground mb-0.5">
                    {edu.school}
                  </h3>
                  <p className="text-sm text-foreground/50">{edu.degree}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-foreground/30">{edu.period}</span>
                    <span className="text-xs text-accent/80 font-medium">
                      {edu.score}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{ opacity: 0 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="text-xs font-medium text-foreground/30 uppercase tracking-wider mb-4">
            Certifications
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.title}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground/80">
                    {cert.title}
                  </div>
                  <div className="text-xs text-foreground/40">
                    {cert.issuer} &middot; {cert.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
