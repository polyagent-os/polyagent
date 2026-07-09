import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Cpu, Activity, Database, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { AGENTS, TRACE_LOG } from "../mock";
import { runQuery } from "../services/api";

export default function Dashboard() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [logs, setLogs] = useState([]);
  const [input, setInput] = useState("");
  const [pendingQuery, setPendingQuery] = useState(null); // real query waiting to fire
  const [running, setRunning] = useState(true);
  const logRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    let i = 0;
    setLogs([]);
    const t = setInterval(() => {
      if (i >= TRACE_LOG.length) {
        clearInterval(t);
        setRunning(false);
        fireRealQuery(); // <-- after fake trace finishes, hit real backend
        return;
      }
      setLogs((prev) => [...prev, TRACE_LOG[i]]);
      const agent = TRACE_LOG[i].agent;
      const matchIdx = AGENTS.findIndex((a) => a.name === agent);
      if (matchIdx >= 0) setActiveIdx(matchIdx);
      i += 1;
    }, 650);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  async function fireRealQuery() {
    const q = pendingQuery;
    if (!q) return;

    // "typing" style placeholder while backend responds
    setLogs((prev) => [
      ...prev,
      { t: "now", agent: "SYSTEM", level: "INFO", msg: "contacting backend…" },
    ]);

    const res = await runQuery(q);

    setLogs((prev) => [
      ...prev.slice(0, -1), // drop the "contacting..." line
      {
        t: "now",
        agent: res.agent || "SYSTEM",
        level: res.demo ? "DEMO" : "LIVE",
        msg: res.response,
      },
    ]);

    setPendingQuery(null);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setPendingQuery(input.trim());
    setInput("");
    setRunning(true);
  };

  const active = AGENTS[activeIdx];

  return (
    <div className="min-h-screen w-full bg-[#060606] text-white flex flex-col">
      <header className="border-b border-white/5 px-6 md:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <ArrowLeft size={14} className="text-white/40" />
          <span className="font-display text-[15px]">poly<span className="text-rose-accent">/</span>agent</span>
          <span className="font-mono-data text-[10px] uppercase tracking-[0.25em] text-white/35 ml-3">
            runtime / live
          </span>
        </Link>
        <div className="flex items-center gap-6 font-mono-data text-[10px] uppercase tracking-[0.25em] text-white/40">
          <span className="flex items-center gap-2"><Cpu size={11} /> {AGENTS.length} agents</span>
          <span className="flex items-center gap-2"><Database size={11} /> 12.4 kB memory</span>
          <span className="flex items-center gap-2 text-rose-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-accent animate-pulse-soft" />
            {running ? "running" : "idle"}
          </span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/5">
        <aside className="lg:col-span-1 bg-[#070707] flex lg:flex-col items-center justify-around py-6 lg:py-10 gap-4">
          {AGENTS.map((a, i) => (
            <button key={a.id} onClick={() => setActiveIdx(i)} className="group relative flex flex-col items-center gap-2" title={a.name}>
              <span className="relative">
                <span className={`block w-3 h-3 rounded-full transition-all ${
                  i === activeIdx ? "bg-rose-accent scale-150" : "bg-white/20 group-hover:bg-white/50"
                }`} />
                {i === activeIdx && <span className="absolute inset-0 rounded-full bg-rose-accent/40 animate-ping" />}
              </span>
              <span className="hidden lg:block font-mono-data text-[9px] uppercase tracking-[0.2em] text-white/30 group-hover:text-white/70">
                {a.number.replace("N°", "")}
              </span>
            </button>
          ))}
        </aside>

        <main className="lg:col-span-7 bg-[#070707] p-8 md:p-12 relative overflow-hidden min-h-[520px] flex flex-col">
          <div className="absolute right-[-180px] top-1/2 -translate-y-1/2 pointer-events-none">
            <div className="relative w-[560px] h-[560px]">
              <div className="absolute inset-0  rounded-full border border-rose-accent/30 animate-spin-slow" />
              <div className="absolute inset-10 rounded-full border border-rose-accent/20 animate-spin-reverse" />
              <div className="absolute inset-24 rounded-full border border-white/10 animate-spin-slow" />
              <div className="absolute inset-40 rounded-full border border-white/5" />
              <div className="absolute inset-[46%] rounded-full bg-rose-accent rose-glow animate-pulse-soft" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <span key={deg} className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full bg-rose-accent"
                  style={{ transform: `rotate(${deg}deg) translate(270px) rotate(-${deg}deg)` }} />
              ))}
            </div>
          </div>

          <div className="relative z-10 max-w-md">
            <span className="font-mono-data text-[11px] uppercase tracking-[0.3em] text-rose-accent">
              {active.number} · active
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <h2 className="font-display text-5xl md:text-7xl tracking-tight mt-4 leading-none">{active.name}</h2>
                <p className="font-mono-data text-[11px] uppercase tracking-[0.25em] text-white/40 mt-3">{active.role}</p>
                <p className="text-[14px] leading-[1.6] text-white/65 font-light mt-6 max-w-sm">{active.summary}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 grid grid-cols-2 gap-2 max-w-sm">
              {active.capabilities.map((c) => (
                <span key={c} className="font-mono-data text-[10px] uppercase tracking-[0.18em] text-white/55 border border-white/10 px-2.5 py-1.5">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="relative z-10 mt-auto pt-10">
            <div className="flex items-center gap-3 border border-white/10 focus-within:border-rose-accent transition-colors px-5 py-4 bg-black/40 backdrop-blur">
              <span className="font-mono-data text-[11px] uppercase tracking-[0.25em] text-rose-accent shrink-0">$</span>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ask the system anything…"
                className="flex-1 bg-transparent text-white placeholder:text-white/30 outline-none text-[14px]"
              />
              <button type="submit" className="text-rose-accent hover:scale-110 transition-transform" aria-label="send">
                <Send size={16} />
              </button>
            </div>
            <p className="font-mono-data text-[10px] uppercase tracking-[0.25em] text-white/30 mt-3">
              ↳ trace plays, then live backend answers your query
            </p>
          </form>
        </main>

        <section className="lg:col-span-4 bg-[#070707] flex flex-col min-h-[520px]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <span className="flex items-center gap-2 font-mono-data text-[11px] uppercase tracking-[0.25em] text-white/55">
              <Activity size={12} /> trace.log
            </span>
            <span className="flex items-center gap-2 font-mono-data text-[10px] uppercase tracking-[0.2em] text-rose-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-accent animate-pulse-soft" />
              {running ? "streaming" : "complete"}
            </span>
          </div>

          <div ref={logRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
            {logs.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="font-mono-data text-[11px] leading-relaxed"
              >
                <div className="flex gap-3">
                  <span className="text-white/30 shrink-0">{l.t}</span>
                  <span className="text-rose-accent shrink-0">[{l.agent}]</span>
                  <span className="text-white/30 shrink-0">{l.level}</span>
                </div>
                <div className="text-white/75 pl-[80px] -mt-0.5">{l.msg}</div>
              </motion.div>
            ))}
            {running && (
              <div className="font-mono-data text-[11px] text-white/30 flex items-center gap-2 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-accent animate-pulse-soft" />
                awaiting next event…
              </div>
            )}
          </div>

          <div className="px-6 py-3 border-t border-white/5 flex items-center justify-between font-mono-data text-[10px] uppercase tracking-[0.25em] text-white/40">
            <span>events / {logs.length}</span>
            <button onClick={() => setRunning(true)} className="hover:text-rose-accent">replay ↻</button>
          </div>
        </section>
      </div>
    </div>
  );
}