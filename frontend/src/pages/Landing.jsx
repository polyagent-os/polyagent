import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AgentsGrid from "../components/AgentsGrid";
import Process from "../components/Process";
import DashboardPreview from "../components/DashboardPreview";
import Principles from "../components/Principles";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen w-full bg-[#060606] text-white">
      <Navbar />
      <main>
        <Hero />
        <AgentsGrid />
        <Process />
        <DashboardPreview />
        <Principles />
      </main>
      <Footer />
    </div>
  );
}