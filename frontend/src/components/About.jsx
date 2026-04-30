import React from "react";
import { motion } from "framer-motion";
import { Cpu, Code2, Database, Shield, Sparkles, Rocket } from "lucide-react";
import { personalInfo, aboutHighlights, certifications } from "../mock/mockData";

const focusAreas = [
  {
    icon: Cpu,
    title: "Machine Learning",
    desc: "Classical ML, supervised & unsupervised pipelines, deployed with clean evaluation.",
    color: "text-cyan-300",
    ring: "hover:border-cyan-300/40",
  },
  {
    icon: Sparkles,
    title: "Deep Learning",
    desc: "Neural networks for vision, NLP and generative tasks using PyTorch & TensorFlow.",
    color: "text-violet-300",
    ring: "hover:border-violet-300/40",
  },
  {
    icon: Code2,
    title: "Full Stack Dev",
    desc: "React + FastAPI + MongoDB/Postgres \u2014 from idea to deployed product.",
    color: "text-sky-300",
    ring: "hover:border-sky-300/40",
  },
  {
    icon: Database,
    title: "RAG Systems",
    desc: "Retrieval-Augmented Generation with vector search, streaming and citations.",
    color: "text-cyan-300",
    ring: "hover:border-cyan-300/40",
  },
  {
    icon: Shield,
    title: "RBAC & Safety",
    desc: "Permission-safe AI: role-scoped retrieval, multi-tenant isolation and auditability.",
    color: "text-violet-300",
    ring: "hover:border-violet-300/40",
  },
  {
    icon: Rocket,
    title: "Scalable APIs",
    desc: "Production-grade FastAPI services with clean contracts, tests and observability.",
    color: "text-sky-300",
    ring: "hover:border-sky-300/40",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="about"
          title="Engineer by craft, builder by instinct"
        />

        <div className="mt-14 grid lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 glass-strong rounded-2xl p-8 shine-border relative"
          >
            <p className="text-slate-200 text-lg leading-relaxed">
              {personalInfo.bio}
            </p>
            <p className="mt-5 text-slate-400 leading-relaxed">
              I care deeply about the seams where models meet products — clean
              contracts, thoughtful UX, tight feedback loops. Whether I’m building a
              permission-safe RAG platform or a multi-agent research system, the goal is the
              same: make the intelligent part feel obvious, reliable and fast.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {aboutHighlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    {h.label}
                  </div>
                  <div className="mt-1 text-slate-100 font-medium">{h.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 space-y-3"
          >
            <div className="glass rounded-2xl p-6">
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                certifications
              </div>
              <ul className="mt-4 space-y-3">
                {certifications.map((c, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 shrink-0" />
                    <div>
                      <div className="text-slate-100">{c.name}</div>
                      <div className="mono text-[11px] text-slate-500">{c.issuer}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-violet-300">
                now
              </div>
              <div className="mt-3 text-slate-200">
                Building <span className="text-cyan-300">RAGVault</span> — a permission-safe
                AI platform — and exploring multi-agent research systems.
              </div>
              <div className="mt-4 mono text-[11px] text-slate-500">
                Based in {personalInfo.location}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {focusAreas.map((f, idx) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`glass rounded-xl p-6 transition-colors ${f.ring}`}
              >
                <div className={`h-10 w-10 rounded-lg glass flex items-center justify-center ${f.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-display text-lg font-semibold text-slate-100">
                  {f.title}
                </div>
                <div className="mt-1.5 text-sm text-slate-400 leading-relaxed">
                  {f.desc}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <span className="h-px w-10 bg-gradient-to-r from-cyan-400 to-violet-400" />
        <span className="mono text-[11px] uppercase tracking-[0.3em] text-cyan-300">
          {eyebrow}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="mt-4 font-display text-4xl sm:text-5xl font-bold tracking-tight section-heading-gradient"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <p className="mt-4 text-slate-400 text-lg max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
