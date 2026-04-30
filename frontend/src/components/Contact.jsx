import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "./About";
import { personalInfo, socials } from "../mock/mockData";
import { Mail, Github, Linkedin, Send, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    // Frontend-only mock: store in localStorage so the interaction feels real
    try {
      const prev = JSON.parse(localStorage.getItem("contactMessages") || "[]");
      prev.push({ ...form, createdAt: new Date().toISOString() });
      localStorage.setItem("contactMessages", JSON.stringify(prev));
      await new Promise((r) => setTimeout(r, 800));
      toast.success("Message queued locally. I’ll reply soon \u2014 thanks!");
      setForm({ name: "", email: "", message: "" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="let’s talk"
          title="Have a project in mind?"
          subtitle="I’m open to internships, freelance gigs and thoughtful AI/ML collaborations. Drop a line — I read every message."
        />

        <div className="mt-12 grid lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-3"
          >
            <div className="glass-strong rounded-2xl p-6 shine-border">
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-cyan-300">
                direct
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                className="mt-3 inline-flex items-center gap-2 text-lg text-slate-100 hover:text-cyan-300 transition-colors"
              >
                <Mail className="h-4 w-4 text-cyan-300" />
                {personalInfo.email}
              </a>
              <div className="mt-4 flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="h-4 w-4" />
                {personalInfo.location}
              </div>
              <div className="mt-4 mono text-[11px] text-slate-500">
                {personalInfo.availability}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="mono text-[10px] uppercase tracking-[0.2em] text-violet-300">
                elsewhere
              </div>
              <ul className="mt-4 space-y-2.5">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-lg px-3 py-2 border border-white/5 hover:border-cyan-300/30 transition-colors"
                    >
                      <span className="flex items-center gap-3 text-slate-200">
                        {s.name === "GitHub" && <Github className="h-4 w-4 text-slate-300" />}
                        {s.name === "LinkedIn" && <Linkedin className="h-4 w-4 text-slate-300" />}
                        {s.name === "Email" && <Mail className="h-4 w-4 text-slate-300" />}
                        {s.name}
                      </span>
                      <span className="mono text-[11px] text-slate-500 group-hover:text-cyan-300 transition-colors">
                        {s.handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 glass-strong rounded-2xl p-6 lg:p-8 shine-border"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ada Lovelace"
              />
              <Field
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
              />
            </div>
            <div className="mt-4">
              <label className="mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                placeholder="Tell me a bit about your idea, timeline and goals…"
                className="mt-2 w-full rounded-lg bg-white/[0.03] border border-white/10 focus:border-cyan-300/50 focus:ring-1 focus:ring-cyan-300/30 outline-none px-4 py-3 text-slate-100 placeholder:text-slate-500 transition-colors resize-none"
              />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="mono text-[11px] text-slate-500">
                Encrypted in transit · never shared
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 hover:bg-cyan-200 disabled:opacity-60 px-5 py-3 text-sm font-semibold text-slate-950 transition-colors"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send message
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, type = "text", placeholder }) {
  return (
    <div>
      <label className="mono text-[10px] uppercase tracking-[0.22em] text-slate-400">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg bg-white/[0.03] border border-white/10 focus:border-cyan-300/50 focus:ring-1 focus:ring-cyan-300/30 outline-none px-4 py-3 text-slate-100 placeholder:text-slate-500 transition-colors"
      />
    </div>
  );
}
