import React, { Suspense, useMemo, useRef, useState, lazy } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "../mock/mockData";
import { SectionHeader } from "./About";

const SkillOrb = lazy(() => import("./SkillOrb"));

export default function Skills() {
  const [active, setActive] = useState(skillCategories[0].id);
  const current = skillCategories.find((c) => c.id === active);

  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="toolbelt"
          title="The stack I reach for"
          subtitle="Frontend, backend, AI/ML and tooling — a rotating sphere of the tools I trust."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 relative h-[420px] rounded-2xl glass-strong overflow-hidden shine-border">
            <Suspense fallback={<div className="absolute inset-0" />}>
              <SkillOrb accent={current.color} skills={current.skills} />
            </Suspense>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060b]/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 mono text-[11px] uppercase tracking-[0.22em] text-slate-400">
              <span style={{ color: current.color }}>{current.name}</span>{" "}
              <span className="text-slate-600">· drag to rotate</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="flex flex-wrap gap-1.5">
              {skillCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`mono text-[11px] uppercase tracking-[0.18em] px-3 py-2 rounded-md border transition-colors ${
                    active === c.id
                      ? "border-transparent text-slate-950"
                      : "border-white/10 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-300"
                  }`}
                  style={
                    active === c.id
                      ? { background: c.color, borderColor: c.color }
                      : {}
                  }
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {current.skills.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="glass rounded-xl p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-slate-100 font-medium">{s.name}</div>
                    <div className="mono text-[11px] text-slate-400">{s.level}%</div>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 + i * 0.04 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${current.color}, #a78bfa)`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
