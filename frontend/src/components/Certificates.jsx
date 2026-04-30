import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, Clock, ExternalLink, X, ShieldCheck } from "lucide-react";
import { certifications } from "../mock/mockData";
import { SectionHeader } from "./About";

const FALLBACK_ACCENT = "#22d3ee";

function CertificatePreview({ cert }) {
  if (cert.image) {
    return (
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        <img
          src={cert.image}
          alt={cert.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05060b] via-[#05060b]/30 to-transparent" />
      </div>
    );
  }
  return (
    <div
      className="relative h-44 w-full flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${cert.accent}22, transparent 60%), #0b1020`,
      }}
    >
      <Award
        className="h-12 w-12"
        style={{ color: cert.accent || FALLBACK_ACCENT }}
      />
    </div>
  );
}

function CertificateCard({ cert, onOpen, index }) {
  const accent = cert.accent || FALLBACK_ACCENT;
  return (
    <motion.button
      type="button"
      onClick={() => cert.image && onOpen(cert)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      className="group relative text-left rounded-2xl glass-strong overflow-hidden shine-border focus:outline-none focus:ring-2 focus:ring-cyan-300/40"
      style={{ cursor: cert.image ? "zoom-in" : "default" }}
    >
      <div
        className="absolute top-0 left-6 right-6 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
      />

      <CertificatePreview cert={cert} />

      <div className="relative p-5">
        <div className="flex items-start gap-2">
          <span
            className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-md shrink-0"
            style={{
              background: `${accent}1f`,
              border: `1px solid ${accent}55`,
              color: accent,
            }}
          >
            <Award className="h-3.5 w-3.5" />
          </span>
          <h3 className="font-display text-[15px] font-semibold text-slate-50 leading-snug">
            {cert.name}
          </h3>
        </div>

        <div className="mt-2 mono text-[11px] uppercase tracking-[0.16em] text-slate-400">
          {cert.issuer}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-400 text-xs">
          {cert.date && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {cert.date}
            </span>
          )}
          {cert.hours && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" />
              {cert.hours}h
            </span>
          )}
        </div>

        {cert.skills && cert.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {cert.skills.map((s) => (
              <span
                key={s}
                className="mono text-[10px] uppercase tracking-[0.14em] px-2 py-1 rounded-md border border-white/10 bg-white/[0.02] text-slate-300"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {cert.verifyCode && (
          <div className="mt-4 flex items-center gap-1.5 mono text-[10px] text-slate-500">
            <ShieldCheck className="h-3 w-3" style={{ color: accent }} />
            <span className="truncate">{cert.verifyCode}</span>
          </div>
        )}

        {cert.image && (
          <div className="mt-4 inline-flex items-center gap-1.5 mono text-[10px] uppercase tracking-[0.18em] text-slate-400 group-hover:text-cyan-300 transition-colors">
            view certificate
            <ExternalLink className="h-3 w-3" />
          </div>
        )}
      </div>
    </motion.button>
  );
}

function CertificateLightbox({ cert, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!cert) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[80] bg-[#05060b]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl rounded-2xl glass-strong shine-border overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
          <div className="min-w-0">
            <div className="font-display text-base font-semibold text-slate-50 truncate">
              {cert.name}
            </div>
            <div className="mono text-[11px] uppercase tracking-[0.18em] text-slate-400 truncate">
              {cert.issuer}
              {cert.date ? ` · ${cert.date}` : ""}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-md glass hover:border-cyan-300/40 hover:text-cyan-300 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="bg-white">
          <img
            src={cert.image}
            alt={cert.name}
            className="block w-full h-auto max-h-[78vh] object-contain"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Certificates() {
  const [active, setActive] = useState(null);
  const open = useCallback((cert) => setActive(cert), []);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="certificates" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="credentials"
          title="Certificates & continuous learning"
          subtitle="Hands-on programs I've completed across data analytics, AI, mobile and full-stack engineering. Click a card to open the original certificate."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <CertificateCard key={cert.id} cert={cert} onOpen={open} index={i} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <CertificateLightbox cert={active} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
