import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { AGENTS } from "../mock";

export default function AgentsGrid() {
  const [active, setActive] = useState(null);

  return (
    <section id="agents" className="relative w-full border-t border-white/5 py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-20 md:mb-28">
          <div>
            <p className="font-mono-data text-[11px] uppercase tracking-[0.3em] text-white/40 mb-6">
              N°007 — the six
            </p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em] max-w-3xl">
              Specialists,<br />
              not generalists<span className="text-rose-accent">.</span>
            </h2>
          </div>
          <span className="hidden md:block font-mono-data text-[11px] uppercase tracking-[0.25em] text-white/35">
            06 / 06 online
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {AGENTS.map((a, i) => {
            const isActive = active === a.id;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                onMouseEnter={() => setActive(a.id)}
                onMouseLeave={() => setActive(null)}
                className={`relative bg-[#070707] p-8 md:p-10 min-h-[340px] flex flex-col justify-between transition-colors duration-500 ${
                  isActive ? "bg-[#0a0a0a]" : ""
                }`}
              >
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono-data text-[11px] uppercase tracking-[0.3em] text-rose-accent">{a.number}</span>
                  <span className="flex items-center gap-2 font-mono-data text-[10px] uppercase tracking-[0.25em] text-white/35">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      a.status === "primary" ? "bg-rose-accent animate-pulse-soft" : "bg-white/40"
                    }`} />
                    {a.status}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-3xl md:text-4xl tracking-tight mb-2 leading-tight">{a.name}</h3>
                  <p className="font-mono-data text-[11px] uppercase tracking-[0.25em] text-white/40 mb-6">{a.role}</p>
                  <p className="text-[14px] leading-[1.55] text-white/65 font-light max-w-sm">{a.summary}</p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {a.capabilities.map((c) => (
                    <span key={c} className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-white/55 border border-white/10 px-2.5 py-1">
                      {c}
                    </span>
                  ))}
                </div>

                <motion.span
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "left" }}
                  className="absolute bottom-0 left-0 right-0 h-px bg-rose-accent"
                />
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#070707] p-8 md:p-10 min-h-[200px] flex flex-col items-start justify-center gap-4 group cursor-pointer hover:bg-[#0a0a0a]"
          >
            <Plus className="text-white/30 group-hover:text-rose-accent transition-colors" size={28} />
            <div>
              <h3 className="font-display text-2xl tracking-tight">Write your own.</h3>
              <p className="font-mono-data text-[11px] uppercase tracking-[0.2em] text-white/40 mt-2">
                One file. One agent. Plug it in.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}