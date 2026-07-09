import React from "react";
import { motion } from "framer-motion";
import { PROCESS_STEPS } from "../mock";

export default function Process() {
  return (
    <section id="process" className="relative w-full border-t border-white/5 py-32 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-20 md:mb-24">
          <div>
            <p className="font-mono-data text-[11px] uppercase tracking-[0.3em] text-white/40 mb-6">
              N°008 — anatomy of a request
            </p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em] max-w-3xl">
              From sentence<br />
              to <span className="text-rose-accent">synthesis</span>.
            </h2>
          </div>
          <span className="hidden md:block font-mono-data text-[11px] uppercase tracking-[0.25em] text-white/35">
            ~ 1.8s median end-to-end
          </span>
        </div>

        <div className="relative">
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/10" />

          <div className="space-y-20 md:space-y-28">
            {PROCESS_STEPS.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.05 }}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${
                    left ? "" : "md:[&>div:first-child]:order-2"
                  }`}
                >
                  <div className={`pl-12 md:pl-0 ${left ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                    <span className="font-mono-data text-[11px] uppercase tracking-[0.3em] text-rose-accent">
                      step / {s.n}
                    </span>
                    <h3 className="font-display text-4xl md:text-6xl mt-3 mb-4 tracking-tight">{s.title}</h3>
                    <p className={`text-[15px] leading-[1.6] text-white/60 font-light max-w-md ${left ? "md:ml-auto" : ""}`}>
                      {s.body}
                    </p>
                  </div>

                  <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
                    <div className="relative w-4 h-4">
                      <span className="absolute inset-0 rounded-full border border-rose-accent" />
                      <span className="absolute inset-[5px] rounded-full bg-rose-accent animate-pulse-soft" />
                    </div>
                  </div>

                  <div />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}