import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Criteria from "./components/Criteria";
import Candidates from "./components/Candidates";
import CalendarTimeline from "./components/Calendar";
import Footer from "./components/Footer";
import RegisterModal from "./components/RegisterModal";
import CandidatesPage from "./components/CandidatesPage";
import ConcoursPage from "./components/ConcoursPage";
import ContactPage from "./components/ContactPage";
import PartenairesPage from "./components/PartenairesPage";

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<"home" | "candidates" | "concours" | "contact" | "partenaires">(() => {
    const hash = window.location.hash;
    if (hash === "#candidates") return "candidates";
    if (hash === "#concours") return "concours";
    if (hash === "#contact") return "contact";
    if (hash === "#partenaires") return "partenaires";
    return "home";
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#candidates") {
        setCurrentView("candidates");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (hash === "#concours") {
        setCurrentView("concours");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (hash === "#contact") {
        setCurrentView("contact");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (hash === "#partenaires") {
        setCurrentView("partenaires");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setCurrentView("home");
        if (hash) {
          // Give React a brief moment to render and mount sections, then scroll
          setTimeout(() => {
            const id = hash.replace("#", "");
            const target = document.getElementById(id);
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 100);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    
    // Run initial check
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Handlers to pass to nested components
  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleCloseRegister = () => setIsRegisterOpen(false);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ivory font-sans relative overflow-x-hidden selection:bg-brand-gold/30 selection:text-brand-gold">
      
      {/* Floating Header */}
      {!selectedCandidateId && (
        <Header onOpenRegister={handleOpenRegister} />
      )}

      {/* Main Content Layout sections */}
      <main>
        {currentView === "home" ? (
          <>
            {/* Cinematic Hero Spotlight Section */}
            <Hero onOpenRegister={handleOpenRegister} />

            {/* Editorial About & Missions Bento Grid */}
            <About />

            {/* Values, Requirements, Countdown Timer, and interactive checker form */}
            <Criteria onOpenRegister={handleOpenRegister} />

            {/* Contestants voting gallery and gold-bordered Rewards segment */}
            <Candidates 
              selectedCandidateId={selectedCandidateId} 
              setSelectedCandidateId={setSelectedCandidateId} 
            />

            {/* Interactive Official Step timeline */}
            <CalendarTimeline />
          </>
        ) : currentView === "concours" ? (
          <ConcoursPage />
        ) : currentView === "contact" ? (
          <ContactPage />
        ) : currentView === "partenaires" ? (
          <PartenairesPage />
        ) : (
          <CandidatesPage />
        )}
      </main>

      {/* Structured SaaS Footer with partners and email registration */}
      <Footer />

      {/* Interactive Admission casting modal with eligibility report */}
      <RegisterModal isOpen={isRegisterOpen} onClose={handleCloseRegister} />

    </div>
  );
}
