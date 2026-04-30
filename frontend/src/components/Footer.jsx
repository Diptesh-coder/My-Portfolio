import React from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { personalInfo, navLinks } from "../mock/mockData";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-10 border-t border-white/5 bg-[#05060b]/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="font-display text-lg font-semibold text-slate-100">
              {personalInfo.firstName}
              <span className="text-cyan-300">.</span>
              {personalInfo.lastName.toLowerCase()}
            </div>
            <div className="mt-2 mono text-[11px] uppercase tracking-[0.22em] text-slate-500">
              ai / ml · fullstack
            </div>
            <p className="mt-4 text-sm text-slate-400 max-w-sm">
              Crafted with React, Three.js and a stubborn belief that intelligent
              products can still feel human.
            </p>
          </div>

          <div>
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
              navigate
            </div>
            <ul className="mt-4 grid grid-cols-2 gap-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-slate-300 hover:text-cyan-300 transition-colors text-sm"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
              connect
            </div>
            <div className="mt-4 flex items-center gap-2">
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
              <a
                href={`mailto:${personalInfo.email}`}
                className="h-10 w-10 inline-flex items-center justify-center rounded-lg glass hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-4 mono text-[11px] text-slate-500">
              {personalInfo.email}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="mono text-[11px] text-slate-500">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>
          <a
            href="#home"
            className="inline-flex items-center gap-2 mono text-[11px] uppercase tracking-[0.22em] text-slate-400 hover:text-cyan-300 transition-colors"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
