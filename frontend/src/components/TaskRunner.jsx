import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { runQuery } from "../services/api";

const ROSE = "#e8789a";
const BG = "#060606";
const SYNE = "'Syne', sans-serif";
const MONO = "'JetBrains Mono', monospace";
const INTER = "'Inter', sans-serif";

export default function TaskRunner() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function handleRun() {
    if (!query.trim() || loading) return;
    setLoading(true);
    setResult(null);
    const res = await runQuery(query);
    setResult(res);
    setLoading(false);
  }

  return (
    <section style={{ padding: "80px 40px", borderBottom: "1px solid #111" }}>
      <div style={{ fontFamily: MONO, fontSize: 10, color: ROSE, letterSpacing: "0.15em", marginBottom: 12 }}>
        N°009 / RUN A TASK
      </div>
      <h2 style={{ fontFamily: SYNE, fontWeight: 800, fontSize: 48, color: "#fff", margin: 0, marginBottom: 40 }}>
        TRY IT LIVE
      </h2>

      {/* Input row */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRun()}
          placeholder="Ask PolyAgent to do something..."
          style={{
            flex: 1, background: "#0a0a0a", border: "1px solid #1a1a1a",
            color: "#fff", padding: "14px 18px", fontFamily: INTER, fontSize: 14,
            outline: "none",
          }}
        />
        <motion.button
          whileHover={{ opacity: 0.85 }}
          onClick={handleRun}
          disabled={loading}
          style={{
            fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em",
            background: ROSE, color: BG, border: "none", padding: "0 28px",
            cursor: loading ? "wait" : "pointer", fontWeight: 500,
          }}
        >
          {loading ? "RUNNING..." : "RUN"}
        </motion.button>
      </div>

      {/* Result card */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              border: "1px solid #111", background: "#0a0a0a",
              padding: 28, position: "relative",
            }}
          >
            {result.demo && (
              <span style={{
                position: "absolute", top: 12, right: 12,
                fontFamily: MONO, fontSize: 9, color: ROSE,
                border: `1px solid ${ROSE}`, padding: "3px 8px", letterSpacing: "0.08em",
              }}>
                DEMO MODE
              </span>
            )}
            <div style={{ fontFamily: MONO, fontSize: 10, color: ROSE, letterSpacing: "0.1em", marginBottom: 12 }}>
              {result.agent || "AGENT"}
            </div>
            <div style={{ fontFamily: INTER, fontSize: 14, color: "#ccc", lineHeight: 1.7 }}>
              {result.response}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
