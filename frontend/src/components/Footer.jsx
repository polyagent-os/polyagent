import React from "react";
import { ArrowUpRight } from "lucide-react";

const MARQUEE = ["orchestrate", "research", "reason", "execute", "remember", "synthesize"];

export default function Footer() {
  return (
    <footer className="relative w-full border-t border-white/5 overflow-hidden">
      <div className="border-b border-white/5 py-10 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-marquee">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="font-display text-7xl md:text-9xl text-white/[0.07] hover:text-rose-accent/40 transition-colors">
              {w}<span className="text-rose-accent">.</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="relative inline-flex items-center justify-center w-7 h-7">
                <span className="absolute inset-0 rounded-full border border-rose-accent/60" />
                <span className="absolute inset-[5px] rounded-full bg-rose-accent animate-pulse-soft" />
              </span>
              <span className="font-display text-[17px]">poly<span className="text-rose-accent">/</span>agent</span>
            </div>
            <p className="text-[14px] leading-[1.6] text-white/55 font-light max-w-sm">
              An open-source, self-hosted operating system for collaborative AI agents.
              Built in the open. Run on your hardware.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono-data text-[10px] uppercase tracking-[0.3em] text-white/35 mb-4">System</p>
            <ul className="space-y-3 text-[14px] text-white/70">
              <li><a href="#agents" className="hover:text-rose-accent">Agents</a></li>
              <li><a href="#process" className="hover:text-rose-accent">Process</a></li>
              <li><a href="/dashboard" className="hover:text-rose-accent">Dashboard</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono-data text-[10px] uppercase tracking-[0.3em] text-white/35 mb-4">Project</p>
            <ul className="space-y-3 text-[14px] text-white/70">
              <li><a href="#" className="hover:text-rose-accent">GitHub</a></li>
              <li><a href="#" className="hover:text-rose-accent">Docs</a></li>
              <li><a href="#" className="hover:text-rose-accent">Discord</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono-data text-[10px] uppercase tracking-[0.3em] text-white/35 mb-4">Contact</p>
            <a href="mailto:hi@polyagent.os" className="inline-flex items-center gap-2 text-[14px] text-white hover:text-rose-accent">
              hi@polyagent.os <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono-data text-[10px] uppercase tracking-[0.3em] text-white/35">
          <span>© polyagent — the operating system for agents. v0.1 prototype.</span>
          <span className="flex gap-6">
            <a href="#" className="hover:text-rose-accent">Privacy</a>
            <a href="#" className="hover:text-rose-accent">License (MIT)</a>
            <a href="#" className="hover:text-rose-accent">Status</a>
          </span>
        </div>
      </div>
    </footer>
  );
}