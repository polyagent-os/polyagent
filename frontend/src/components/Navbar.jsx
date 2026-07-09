import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const NAV = [
  { label: "System",    to: "/#system" },
  { label: "Agents",    to: "/#agents" },
  { label: "Process",   to: "/#process" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Docs",      to: "/#docs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#060606]/85 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 py-5">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="relative inline-flex items-center justify-center w-7 h-7">
            <span className="absolute inset-0 rounded-full border border-rose-accent/60" />
            <span className="absolute inset-[5px] rounded-full bg-rose-accent animate-pulse-soft" />
          </span>
          <span className="font-display text-[17px] tracking-tight">
            poly<span className="text-rose-accent">/</span>agent
          </span>
        </Link>

         <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <a
                key={item.label}
                href={item.to}
                className={`px-4 py-2 text-[13px] font-mono-data uppercase tracking-[0.15em] transition-colors ${
                  active ? "text-rose-accent" : "text-white/55 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden md:flex items-center gap-2 font-mono-data text-[11px] uppercase tracking-[0.2em] text-white/45">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-accent animate-pulse-soft" />
            v0.1 · prototype
          </span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-[12px] font-mono-data uppercase tracking-[0.2em] border border-white/15 hover:border-rose-accent hover:text-rose-accent transition-colors px-4 py-2"
          >
            GitHub →
          </a>
        </div>
      </div>
    </motion.header>
  );
}