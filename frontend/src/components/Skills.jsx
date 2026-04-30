import React, { Suspense, useState, lazy } from "react";
import { motion } from "framer-motion";
import { skillCategories } from "../mock/mockData";
import { SectionHeader } from "./About";

const SkillOrb = lazy(() => import("./SkillOrb"));

// --- Module-level constants ---
const FADE_IN_INITIAL = { opacity: 0, x: -10 };
const FADE_IN_VIEW = { opacity: 1, x: 0 };
const FADE_VIEWPORT = { once: true, amount: 0.3 };
const BAR_FADE_VIEWPORT = { once: true };
const STAGGER_DELAY = 0.04;
const FADE_DURATION = 0.35;
const BAR_DURATION = 0.9;
const BAR_BASE_DELAY = 0.1;
const ACCENT_VIOLET = "#a78bfa";

function CategoryButton({ category, active, onClick }) {
  const isActive = active === category.id;
  const className = `mono text-[11px] uppercase tracking-[0.18em] px-3 py-2 rounded-md border transition-colors ${
    isActive
      ? "border-transparent text-slate-950"
      : "border-white/10 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-300"
  }`;
  const style = isActive
    ? { background: category.color, borderColor: category.color }
    : undefined;
  return (
    <button onClick={onClick} className={className} style={style}>
      {category.name}
    </button>
  );
}

function SkillBar({ skill, index, accentColor }) {
  return (
    <motion.div
      initial={FADE_IN_INITIAL}
      whileInView={FADE_IN_VIEW}
      viewport={FADE_VIEWPORT}
      transition={{ duration: FADE_DURATION, delay: index * STAGGER_DELAY }}
      className="glass rounded-xl p-4"
    >
      <div className="flex items-center justify-between">
        <div className="text-slate-100 font-medium">{skill.name}</div>
        <div className="mono text-[11px] text-slate-400">{skill.level}%</div>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={BAR_FADE_VIEWPORT}
          transition={{
            duration: BAR_DURATION,
            ease: "easeOut",
            delay: BAR_BASE_DELAY + index * STAGGER_DELAY,
          }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accentColor}, ${ACCENT_VIOLET})`,
          }}
        />
      </div>
    </motion.div>
  );
}

function SphereStage({ current }) {
  return (
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
  );
}

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
          <SphereStage current={current} />

          <div className="lg:col-span-6">
            <div className="flex flex-wrap gap-1.5">
              {skillCategories.map((c) => (
                <CategoryButton
                  key={c.id}
                  category={c}
                  active={active}
                  onClick={() => setActive(c.id)}
                />
              ))}
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {current.skills.map((s, i) => (
                <SkillBar
                  key={s.name}
                  skill={s}
                  index={i}
                  accentColor={current.color}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
