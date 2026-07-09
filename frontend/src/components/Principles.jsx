import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { PRINCIPLES, FAQS } from "../mock";

export default function Principles() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative w-full border-t border-white/5 py-32 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <p className="font-mono-data text-[11px] uppercase tracking-[0.3em] text-white/40 mb-6">
            N°010 — first principles
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em] mb-10">
            Built on four<br/>non-negotiables<span className="text-rose-accent">.</span>
          </h2>
          <div className="space-y-px">
            {PRINCIPLES.map((p) => (
              <div key={p.k} className="flex items-baseline gap-6 py-5 border-t border-white/5">
                <span className="font-mono-data text-[11px] uppercase tracking-[0.3em] text-rose-accent w-24 shrink-0">{p.k}</span>
                <span className="text-[15px] leading-[1.55] text-white/70 font-light">{p.v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="font-mono-data text-[11px] uppercase tracking-[0.3em] text-white/40 mb-6">
            N°011 — questions
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[0.95] tracking-[-0.02em] mb-10">
            The short<br/>answers<span className="text-rose-accent">.</span>
          </h2>
          <div className="border-t border-white/5">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} className="border-b border-white/5">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  >
                    <span className="font-display text-xl md:text-2xl tracking-tight text-white/90 group-hover:text-rose-accent transition-colors">
                      {f.q}
                    </span>
                    <span className="text-rose-accent shrink-0">
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-12 text-[15px] leading-[1.65] text-white/60 font-light">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}