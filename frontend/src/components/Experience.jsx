import React from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./About";
import { experience } from "../mock/mockData";
import { Briefcase, GraduationCap, Sparkles } from "lucide-react";

const iconFor = (title) => {
  if (/B\.Tech|College|School|Education/i.test(title)) return GraduationCap;
  if (/Simulation|Internship|Engineer/i.test(title)) return Briefcase;
  return Sparkles;
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="journey"
          title="Timeline & experience"
          subtitle="Where I am, what I’ve shipped, and the foundation I’m building on."
        />

        <div className="mt-14 relative">
          {/* Spine */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/40 via-violet-400/40 to-transparent" />

          <ul className="space-y-10">
            {experience.map((exp, idx) => {
              const Icon = iconFor(exp.role + " " + exp.company);
              const left = idx % 2 === 0;
              return (
                <li key={exp.id} className="relative">
                  <div className="md:grid md:grid-cols-2 md:gap-10 items-start">
                    {/* Left column */}
                    <motion.div
                      initial={{ opacity: 0, x: left ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6 }}
                      className={`pl-12 md:pl-0 ${
                        left ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"
                      }`}
                    >
                      <div className="glass-strong rounded-2xl p-6 shine-border">
                        <div className="flex items-center gap-2 mono text-[11px] uppercase tracking-[0.2em] text-cyan-300">
                          <span>{exp.period}</span>
                        </div>
                        <h3 className="mt-2 font-display text-xl font-semibold text-slate-50">
                          {exp.role}
                        </h3>
                        <div className="mt-1 text-slate-400">{exp.company}</div>
                        <p className="mt-3 text-slate-300/90 text-[15px] leading-relaxed">
                          {exp.description}
                        </p>
                        <div
                          className={`mt-4 flex flex-wrap gap-1.5 ${
                            left ? "md:justify-end" : ""
                          }`}
                        >
                          {exp.tags.map((t) => (
                            <span
                              key={t}
                              className="mono text-[10px] uppercase tracking-[0.14em] px-2 py-1 rounded-md border border-white/10 bg-white/[0.02] text-slate-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Node */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="absolute top-5 left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center"
                  >
                    <div className="relative">
                      <div className="h-8 w-8 rounded-full glass-strong flex items-center justify-center shine-border">
                        <Icon className="h-4 w-4 text-cyan-300" />
                      </div>
                      <div className="absolute inset-0 rounded-full blur-md bg-cyan-400/30 -z-10" />
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
