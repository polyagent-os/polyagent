import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AGENTS, TRACE_LOG } from "../mock";

export default function DashboardPreview() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState(3);

  useEffect(() => {
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % AGENTS.length), 2800);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (visibleLogs >= TRACE_LOG.length) return;
    const t = setTimeout(() => setVisibleLogs((v) => Math.min(v + 1, TRACE_LOG.length)), 700);
    return () => clearTimeout(t);
  }, [visibleLogs]);

  const active = AGENTS[activeIdx];

  return (
    <section id="docs" className="relative w-full border-t border-white/5 py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="font-mono-data text-[11px] uppercase tracking-[0.3em] text-white/40 mb-6">
              N°009 — live runtime
            </p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em] max-w-3xl">
              You see the work,<br />
              not just the answer<span className="text-rose-accent">.</span>
            </h2>
          </div>
          <a
            href="/dashboard"
            className="hidden md:inline-flex items-center gap-3 font-mono-data text-[11px] uppercase tracking-[0.25em] text-white/60 hover:text-rose-accent border-b border-white/15 hover:border-rose-accent pb-1 transition-colors"
          >
            Open full dashboard →
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5 border border-white/5">
          {/* Orb column */}
          <div className="lg:col-span-1 bg-[#070707] flex lg:flex-col items-center justify-around py-6 lg:py-10 gap-4">
            {AGENTS.map((a, i) => (
              <button key={a.id} onClick={() => setActiveIdx(i)} className="group relative" aria-label={a.name}>
                <span className={`block w-3 h-3 rounded-full transition-all ${
                  i === activeIdx ? "bg-rose-accent scale-150" : "bg-white/20 group-hover:bg-white/50"
                }`} />
                {i === activeIdx && <span className="absolute inset-0 rounded-full bg-rose-accent/40 animate-ping" />}
              </button>
            ))}
          </div>

          {/* Spotlight */}
          <div className="lg:col-span-6 bg-[#070707] p-8 md:p-12 min-h-[480px] relative overflow-hidden">
            <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative w-[460px] h-[460px]">
                <div className="absolute inset-0  rounded-full border border-rose-accent/30 animate-spin-slow" />
                <div className="absolute inset-8  rounded-full border border-rose-accent/20 animate-spin-reverse" />
                <div className="absolute inset-20 rounded-full border border-white/10 animate-spin-slow" />
                <div className="absolute inset-32 rounded-full border border-white/5" />
                <div className="absolute inset-[44%] rounded-full bg-rose-accent rose-glow animate-pulse-soft" />
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                  <span
                    key={deg}
                    className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-rose-accent"
                    style={{ transform: `rotate(${deg}deg) translate(220px) rotate(-${deg}deg)` }}
                  />
                ))}
              </div>
            </div>

            <div className="relative z-10 max-w-md">
              <span className="font-mono-data text-[11px] uppercase tracking-[0.3em] text-rose-accent">
                {active.number} · active
              </span>
              <motion.h3
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-display text-5xl md:text-6xl tracking-tight mt-4"
              >
                {active.name}
              </motion.h3>
              <p className="font-mono-data text-[11px] uppercase tracking-[0.25em] text-white/40 mt-2">{active.role}</p>
              <motion.p
                key={active.id + "-s"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-[14px] leading-[1.6] text-white/65 font-light mt-6"
              >
                {active.summary}
              </motion.p>

              <div className="mt-8 grid grid-cols-2 gap-2">
                {active.capabilities.map((c) => (
                  <span key={c} className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-white/55 border border-white/10 px-2.5 py-1.5">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Trace log */}
          <div className="lg:col-span-5 bg-[#070707] p-6 md:p-8 min-h-[480px] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <span className="font-mono-data text-[11px] uppercase tracking-[0.25em] text-white/45">trace.log · live</span>
              <span className="flex items-center gap-2 font-mono-data text-[10px] uppercase tracking-[0.2em] text-rose-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-accent animate-pulse-soft" />
                streaming
              </span>
            </div>

            <div className="flex-1 overflow-hidden mt-4 space-y-1.5">
              {TRACE_LOG.slice(0, visibleLogs).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono-data text-[11px] leading-relaxed flex gap-3"
                >
                  <span className="text-white/30 shrink-0">{l.t}</span>
                  <span className="text-rose-accent shrink-0 w-[110px] truncate">{l.agent}</span>
                  <span className="text-white/35 shrink-0 w-[42px]">{l.level}</span>
                  <span className="text-white/75 truncate">{l.msg}</span>
                </motion.div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/5 mt-4 font-mono-data text-[10px] uppercase tracking-[0.25em] text-white/40 flex justify-between">
              <span>events / {visibleLogs}</span>
              <span>memory · 12.4 kB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
