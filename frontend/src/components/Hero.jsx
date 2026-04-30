import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Linkedin, Sparkles } from "lucide-react";
import { personalInfo, coreSkills } from "../mock/mockData";

const ThreeBackground = lazy(() => import("./ThreeBackground"));

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] w-full flex items-center pt-20 pb-16 overflow-hidden"
    >
      <Suspense fallback={<div className="absolute inset-0" />}>
        <ThreeBackground />
      </Suspense>

      {/* subtle gradient scrim for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05060b]/30 to-[#05060b]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={item} className="pill">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300">
              <span className="absolute inset-0 rounded-full bg-cyan-300 animate-ping" />
            </span>
            available for opportunities
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02] tracking-tight"
          >
            <span className="block text-slate-100">Hi, I’m {personalInfo.firstName}.</span>
            <span className="block mt-2 section-heading-gradient neon-text">
              I build intelligent systems.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 text-lg sm:text-xl text-slate-300/90 max-w-2xl"
          >
            <span className="mono text-cyan-300">{personalInfo.title}</span>
            <span className="mx-2 text-slate-500">|</span>
            <span className="mono text-violet-300">{personalInfo.subtitle}</span>
            <br className="hidden sm:block" />
            <span className="mt-3 block text-slate-400">{personalInfo.tagline}.</span>
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-200 transition-colors"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-slate-100 glass hover:border-cyan-300/50 transition-colors"
            >
              <Mail className="h-4 w-4 text-cyan-300" />
              Contact Me
            </a>
            <div className="flex items-center gap-2 pl-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 inline-flex items-center justify-center rounded-lg glass hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 inline-flex items-center justify-center rounded-lg glass hover:border-violet-400/40 hover:text-violet-300 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap gap-2 max-w-2xl"
          >
            {coreSkills.map((s) => (
              <span key={s} className="pill" style={{}}>
                <Sparkles className="h-3 w-3" />
                {s}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 lg:mt-24 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl"
        >
          {[
            { k: "6+", v: "Shipped projects" },
            { k: "AI/ML", v: "Core specialization" },
            { k: "RAG", v: "Permission-safe" },
            { k: "2026", v: "B.Tech grad year" },
          ].map((s) => (
            <div
              key={s.v}
              className="glass rounded-xl px-4 py-4 hover:border-cyan-300/30 transition-colors"
            >
              <div className="font-display text-2xl font-bold text-slate-50">{s.k}</div>
              <div className="mono text-[11px] uppercase tracking-[0.14em] text-slate-400 mt-1">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mono text-[10px] uppercase tracking-[0.3em] text-slate-500"
        >
          scroll
        </motion.div>
      </div>
    </section>
  );
}
