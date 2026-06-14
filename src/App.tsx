import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Criteria from "./components/Criteria";
import Candidates from "./components/Candidates";
import CalendarTimeline from "./components/Calendar";
import Footer from "./components/Footer";
import RegisterModal from "./components/RegisterModal";

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  // Handlers to pass to nested components
  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleCloseRegister = () => setIsRegisterOpen(false);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ivory font-sans relative overflow-x-hidden selection:bg-brand-gold/30 selection:text-brand-gold">
      
      {/* Floating Header */}
      <Header onOpenRegister={handleOpenRegister} />

      {/* Main Content Layout sections */}
      <main>
        
        {/* Cinematic Hero Spotlight Section */}
        <Hero onOpenRegister={handleOpenRegister} />

        {/* Editorial About & Missions Bento Grid */}
        <About />

        {/* Values, Requirements, Countdown Timer, and interactive checker form */}
        <Criteria onOpenRegister={handleOpenRegister} />

        {/* Contestants voting gallery and gold-bordered Rewards segment */}
        <Candidates />

        {/* Interactive Official Step timeline */}
        <CalendarTimeline />

      </main>

      {/* Structured SaaS Footer with partners and email registration */}
      <Footer />

      {/* Interactive Admission casting modal with eligibility report */}
      <RegisterModal isOpen={isRegisterOpen} onClose={handleCloseRegister} />

    </div>
  );
}
