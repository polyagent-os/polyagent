import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Circle } from "lucide-react";
import { METRICS } from "../mock";

export default function Hero() {
  return (
    <section id="system" className="relative min-h-screen w-full overflow-hidden grain">
      <div className="absolute inset-0 spotlight" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-accent/40 to-transparent" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-40 pb-20">
        <div className="flex items-center justify-between font-mono-data text-[11px] uppercase tracking-[0.25em] text-white/45 mb-20">
          <span className="flex items-center gap-2">
            <Circle size={6} className="fill-rose-accent text-rose-accent" />
            N°000 — index
          </span>
          <span className="hidden sm:inline">Bengaluru / Earth · 12.97°N 77.59°E</span>
          <span>System online</span>
        </div>

        <div className="max-w-[1200px]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[14vw] md:text-[10.5vw] leading-[0.88] tracking-[-0.04em] font-medium"
          >
            A multi-agent<br />
            operating system<br />
            <span className="text-white/35">for knowledge</span>
            <span className="text-rose-accent">.</span>
          </motion.h1>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-5 md:col-start-1"
          >
            <p className="text-[15px] md:text-[17px] leading-[1.55] text-white/65 font-light max-w-md">
              Six specialised agents — a planner, four specialists and a synthesiser —
              collaborate inside a single observable runtime. You see every plan,
              every tool call, every memory write.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="md:col-span-5 md:col-start-8 flex flex-col items-start md:items-end gap-6"
          >
            <a
              href="/dashboard"
              className="group inline-flex items-center gap-4 text-[13px] font-mono-data uppercase tracking-[0.25em] text-white border border-white/15 hover:border-rose-accent px-6 py-4 transition-colors"
            >
              <span>Open live dashboard</span>
              <ArrowDownRight size={16} className="text-rose-accent group-hover:rotate-[-12deg] transition-transform" />
            </a>
            <a href="#agents" className="text-[12px] font-mono-data uppercase tracking-[0.25em] text-white/40 hover:text-rose-accent transition-colors">
              ↘ scroll · meet the six
            </a>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.k}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
              className="px-6 md:px-10 py-7 flex flex-col gap-2"
            >
              <span className="font-mono-data text-[10px] uppercase tracking-[0.25em] text-white/40">{m.k}</span>
              <span className="font-display text-3xl md:text-4xl text-white">{m.v}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}