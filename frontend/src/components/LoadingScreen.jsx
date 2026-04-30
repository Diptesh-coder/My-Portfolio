import React from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05060b]"
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, #22d3ee44, transparent 70%)" }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
        <motion.div
          className="relative h-20 w-20 rounded-full border border-cyan-300/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_#22d3ee]" />
        </motion.div>
        <motion.div
          className="absolute inset-2 rounded-full border border-violet-400/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_#a78bfa]" />
        </motion.div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-cyan-300 text-xl font-bold neon-text">D</span>
        </div>
      </div>
      <div className="absolute bottom-10 mono text-[11px] uppercase tracking-[0.4em] text-slate-400">
        initializing…
      </div>
    </motion.div>
  );
}
