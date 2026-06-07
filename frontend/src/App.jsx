import { useState } from "react"
import { motion } from "framer-motion"

const agents = [
  { name: "Orchestrator", color: "#00ffff" },
  { name: "ResearchAgent", color: "#4ade80" },
  { name: "CoderAgent", color: "#38bdf8" },
  { name: "AnalystAgent", color: "#facc15" },
  { name: "WriterAgent", color: "#f472b6" },
  { name: "Synthesizer", color: "#a855f7" },
]

export default function App() {
  const [launched, setLaunched] = useState(false)

  return (
    <div style={{ fontFamily: "'Share Tech Mono', monospace", background: "#000", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <nav style={{
        borderBottom: "1px solid rgba(0,255,255,0.12)",
        padding: "0 2rem",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: "16px" }}
        >
          {/* Arc Reactor */}
          <div style={{ position: "relative", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {[44, 32, 22].map((size, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 4 - i, repeat: Infinity, ease: "linear", direction: i % 2 === 1 ? "reverse" : "normal" }}
                style={{
                  position: "absolute",
                  width: size, height: size,
                  borderRadius: "50%",
                  border: "1.5px solid transparent",
                  borderTop: `1.5px solid ${i % 2 === 0 ? "cyan" : "#a855f7"}`,
                  filter: `drop-shadow(0 0 4px ${i % 2 === 0 ? "cyan" : "#a855f7"})`,
                }}
              />
            ))}
            <motion.div
              animate={{ boxShadow: ["0 0 8px cyan, 0 0 20px cyan", "0 0 16px cyan, 0 0 40px cyan", "0 0 8px cyan, 0 0 20px cyan"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff", zIndex: 2 }}
            />
          </div>

          <div>
            <div style={{
              fontFamily: "'Orbitron', monospace",
              fontWeight: 900, fontSize: 20,
              letterSpacing: 5,
              background: "linear-gradient(90deg, #00ffff, #fff, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              POLYAGENT
            </div>
            <div style={{ fontSize: 8, color: "rgba(0,255,255,0.35)", letterSpacing: 3, marginTop: 2 }}>
              NEURAL OS · 6 AGENTS ACTIVE
            </div>
          </div>
        </motion.div>

        {/* Nav Links */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: "flex", gap: 4 }}
        >
          {["Dashboard", "Agents", "Memory", "Trace"].map((link) => (
            <div key={link} style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 9, letterSpacing: 2,
              color: link === "Dashboard" ? "cyan" : "rgba(0,255,255,0.25)",
              padding: "7px 18px",
              clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              background: link === "Dashboard" ? "rgba(0,255,255,0.08)" : "transparent",
              border: `1px solid ${link === "Dashboard" ? "rgba(0,255,255,0.3)" : "transparent"}`,
              cursor: "pointer",
              textShadow: link === "Dashboard" ? "0 0 10px cyan" : "none",
            }}>
              {link}
            </div>
          ))}
        </motion.div>

        {/* Right side */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ display: "flex", alignItems: "center", gap: 14 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 7, border: "1px solid rgba(0,255,255,0.2)", padding: "6px 14px", background: "rgba(0,255,255,0.04)" }}>
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }}
            />
            <span style={{ fontSize: 9, color: "rgba(74,222,128,0.8)", letterSpacing: 2 }}>ONLINE</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setLaunched(true)}
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 10, fontWeight: 700, letterSpacing: 2,
              color: "#000",
              background: "linear-gradient(135deg, cyan, #a855f7)",
              border: "none", padding: "9px 22px",
              clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(0,255,255,0.3)",
            }}
          >
            ENGAGE ›
          </motion.button>
        </motion.div>
      </nav>

      {/* HERO */}
      <div style={{
        minHeight: "calc(100vh - 70px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "4rem 2rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background rings */}
        {[320, 500, 700].map((size, i) => (
          <motion.div
            key={i}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute", top: "50%", left: "50%",
              width: size, height: size,
              borderRadius: "50%",
              border: `1px solid rgba(${i % 2 === 0 ? "0,255,255" : "168,85,247"},0.05)`,
              transform: "translate(-50%,-50%)",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Center glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 600, height: 300,
          background: "radial-gradient(ellipse, rgba(0,255,255,0.06) 0%, rgba(168,85,247,0.04) 40%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(0,255,255,0.15)", padding: "6px 18px", marginBottom: "2.5rem", fontSize: 9, letterSpacing: 3, color: "rgba(0,255,255,0.45)" }}
        >
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }}
          />
          ALL 6 AGENTS ONLINE · SYSTEM READY
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{ fontFamily: "'Orbitron', monospace", fontWeight: 900, fontSize: "clamp(32px, 6vw, 68px)", lineHeight: 1.05, marginBottom: "1.5rem" }}
        >
          <div style={{ color: "#fff", display: "block" }}>THE AI OS FOR</div>
          <div style={{
            display: "block",
            background: "linear-gradient(90deg, #00ffff 0%, #ffffff 50%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px rgba(0,255,255,0.3))",
          }}>
            KNOWLEDGE WORK
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          style={{ fontSize: 14, color: "rgba(255,255,255,0.28)", letterSpacing: 1, lineHeight: 1.9, maxWidth: 480, marginBottom: "2.5rem" }}
        >
          One query. <span style={{ color: "rgba(0,255,255,0.5)" }}>Six specialized agents.</span><br />
          Autonomous research, code, analysis and writing —<br />
          <span style={{ color: "rgba(0,255,255,0.5)" }}>delivered in real time.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          style={{ display: "flex", gap: 12, marginBottom: "3.5rem" }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(0,255,255,0.45)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: 11, fontWeight: 900, letterSpacing: 3, color: "#000",
              background: "linear-gradient(135deg, #00ffff, #a855f7)",
              border: "none", padding: "14px 36px",
              clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              cursor: "pointer",
              boxShadow: "0 0 30px rgba(0,255,255,0.25)",
            }}
          >
            INITIALIZE SYSTEM ›
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, borderColor: "rgba(0,255,255,0.3)", color: "rgba(0,255,255,0.6)" }}
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.25)",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "14px 28px",
              clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              cursor: "pointer",
            }}
          >
            VIEW LIVE TRACE →
          </motion.button>
        </motion.div>

        {/* Agent pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}
        >
          {agents.map((agent) => (
            <div key={agent.name} style={{
              display: "flex", alignItems: "center", gap: 6,
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "5px 12px", fontSize: 9, letterSpacing: 1.5,
              color: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.02)",
            }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: agent.color, boxShadow: `0 0 5px ${agent.color}` }} />
              {agent.name}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}