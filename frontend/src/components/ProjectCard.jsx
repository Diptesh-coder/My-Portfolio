import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Star } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -8;
    const ry = ((x / rect.width) - 0.5) * 10;
    setStyle({
      transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`,
      "--mx": `${x}px`,
      "--my": `${y}px`,
    });
  };

  const reset = () =>
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg)",
    });

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={style}
      className="group relative tilt rounded-2xl glass-strong overflow-hidden shine-border"
    >
      {/* Cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), ${project.accent}22, transparent 60%)`,
        }}
      />

      <div className="relative p-6 lg:p-7">
        {/* Accent bar */}
        <div
          className="absolute top-0 left-6 right-6 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          }}
        />

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
              {String(index + 1).padStart(2, "0")} / project
            </div>
            <h3
              className="mt-2 font-display text-2xl font-bold text-slate-50"
              style={{ textShadow: `0 0 22px ${project.accent}33` }}
            >
              {project.name}
            </h3>
            <div className="mt-1 text-sm text-slate-400">{project.subtitle}</div>
          </div>
          {project.featured && (
            <div
              className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-full mono text-[10px] uppercase tracking-[0.16em]"
              style={{
                background: `${project.accent}14`,
                border: `1px solid ${project.accent}44`,
                color: project.accent,
              }}
            >
              <Star className="h-3 w-3" />
              featured
            </div>
          )}
        </div>

        <p className="mt-5 text-slate-300/90 text-[15px] leading-relaxed">
          {project.description}
        </p>

        <ul className="mt-5 space-y-1.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-slate-400">
              <span
                className="mt-1.5 h-1 w-1 rounded-full shrink-0"
                style={{ background: project.accent }}
              />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="mono text-[11px] px-2 py-1 rounded-md border border-white/10 bg-white/[0.02] text-slate-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-7 flex items-center gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm glass hover:border-cyan-300/40 hover:text-cyan-300 transition-colors"
          >
            <Github className="h-4 w-4" />
            Source
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-950 bg-cyan-300 hover:bg-cyan-200 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Live demo
            </a>
          ) : (
            <span className="mono text-[11px] uppercase tracking-[0.18em] text-slate-500 ml-1">
              demo · private
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
