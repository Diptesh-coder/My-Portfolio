import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Sparkles } from "lucide-react";
import { navLinks, personalInfo } from "../mock/mockData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActive(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-[background,backdrop-filter,border] duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[#05060b]/70 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg glass-strong shine-border">
            <Sparkles className="h-4 w-4 text-cyan-300" />
          </span>
          <div className="leading-tight">
            <div className="font-display text-[15px] font-semibold tracking-tight text-cyan-300">
              {personalInfo.firstName} {personalInfo.lastName}
            </div>
            <div className="mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
              ai / ml · fullstack
            </div>
          </div>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                  active === link.href
                    ? "text-cyan-300"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
                {active === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-2 right-2 -bottom-0.5 h-px bg-gradient-to-r from-cyan-400 to-violet-400"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="h-9 w-9 inline-flex items-center justify-center rounded-md glass hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="h-9 w-9 inline-flex items-center justify-center rounded-md glass hover:border-violet-400/40 hover:text-violet-300 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="ml-2 px-4 h-9 inline-flex items-center rounded-md text-sm font-medium text-slate-950 bg-cyan-300 hover:bg-cyan-200 transition-colors"
          >
            Hire me
          </a>
        </div>

        <button
          className="md:hidden h-9 w-9 inline-flex items-center justify-center rounded-md glass"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-[#05060b]/90 backdrop-blur-xl"
          >
            <ul className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-2 rounded-md text-slate-200 hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block text-center px-4 py-2 rounded-md bg-cyan-300 text-slate-950 font-medium"
                >
                  Hire me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
