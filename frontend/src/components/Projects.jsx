import React, { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../mock/mockData";
import ProjectCard from "./ProjectCard";
import { SectionHeader } from "./About";

const filters = [
  { id: "all", label: "All" },
  { id: "featured", label: "Featured" },
  { id: "ai", label: "AI / LLM" },
  { id: "ml", label: "Machine Learning" },
];

function matches(filter, project) {
  if (filter === "all") return true;
  if (filter === "featured") return project.featured;
  if (filter === "ai")
    return /LangChain|Groq|LLM|OpenAI|LangGraph/i.test(project.stack.join(" "));
  if (filter === "ml")
    return /scikit|Pandas|TensorFlow|PyTorch|Python/i.test(project.stack.join(" ")) && !project.featured;
  return true;
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const list = projects.filter((p) => matches(filter, p));

  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeader
            eyebrow="selected work"
            title="Projects that shipped and taught me something"
            subtitle="A focused slice of what I’ve built — AI platforms, multi-agent systems, and ML tools. Each one ships, each one has a story."
          />

          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`mono text-[11px] uppercase tracking-[0.18em] px-3 py-2 rounded-md border transition-colors ${
                  filter === f.id
                    ? "bg-cyan-300 text-slate-950 border-cyan-300"
                    : "border-white/10 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="mt-12 grid md:grid-cols-2 gap-5"
        >
          {list.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </motion.div>

        {list.length === 0 && (
          <div className="mt-12 text-center text-slate-500 mono">
            No projects match this filter yet.
          </div>
        )}
      </div>
    </section>
  );
}
