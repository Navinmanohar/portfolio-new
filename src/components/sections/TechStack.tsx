"use client";

import { motion } from "framer-motion";

const categories = [
  {
    label: "AI / LLM",
    items: [
      "RAG Systems",
      "LangChain",
      "Agentic AI",
      "Prompt Engineering",
      "Vector Databases",
      "ChromaDB",
      "Ollama",
      "Cerebras API",
      "LLaMA 3.3 70B",
    ],
  },
  {
    label: "ML / NLP",
    items: [
      "Scikit-learn",
      "NLP (TF-IDF)",
      "Sentiment Analysis",
      "Text Classification",
      "Naive Bayes",
      "Decision Trees",
      "Random Forest",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "Python",
      "REST APIs",
      "System Design",
      "RBAC",
      "WebSockets",
    ],
  },
  {
    label: "Databases & Caching",
    items: [
      "PostgreSQL",
      "pgvector",
      "MongoDB",
      "SQLAlchemy",
      "Sequelize",
      "Redis",
      "SQLite",
    ],
  },
  {
    label: "Frontend & DevOps",
    items: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Docker",
      "GitHub Actions",
      "JWT Auth",
    ],
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function TechStack() {
  return (
    <section className="section-padding relative">
      <div className="section-container">
        <motion.div
          style={{ opacity: 0 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <span className="text-xs font-medium text-foreground/30 tracking-widest uppercase mb-4 block">
            Tech Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
            Tools & technologies I work with
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.label}
              variants={item}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="text-xs font-medium text-foreground/30 uppercase tracking-wider mb-3">
                {cat.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-foreground/60 bg-foreground/[0.04] border border-border rounded-md px-2.5 py-1"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
