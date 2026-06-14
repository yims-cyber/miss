import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ChevronRight, ChevronLeft, Sparkles, CheckCircle2 } from "lucide-react";
import { CALENDAR_STEPS } from "../data";

export default function CalendarTimeline() {
  const [selectedStepIdx, setSelectedStepIdx] = useState(0);

  const selectedStep = CALENDAR_STEPS[selectedStepIdx];

  const handleNext = () => {
    if (selectedStepIdx < CALENDAR_STEPS.length - 1) {
      setSelectedStepIdx(selectedStepIdx + 1);
    }
  };

  const handlePrev = () => {
    if (selectedStepIdx > 0) {
      setSelectedStepIdx(selectedStepIdx - 1);
    }
  };

  return (
    <section
      id="partners" // We place timeline here, and scroll anchors can map naturally. Wait, we can bind using standard ids. Let's make it id "timeline" or mapping anchors. Inside Header navigation, we have Casting -> Candidates -> Vote -> Partenaires. The timeline fits perfectly in the middle.
      className="py-24 sm:py-32 px-4 relative bg-brand-surface/40 overflow-hidden border-t border-brand-charcoal/20"
    >
      {/* Background radial soft light highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[700px] bg-brand-gold/2 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Calendar Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs font-bold tracking-[0.3em] text-brand-gold uppercase block mb-3"
          >
            L'AGENDA EXCLUSIF
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-medium text-3xl sm:text-4xl text-brand-ivory leading-tight mb-2"
          >
            Chronologie de la Couronne
          </motion.h2>
          <span className="font-sans text-brand-outline text-xs sm:text-sm">
            Calendrier officiel et étapes clés du couronnement Miss Nationale DRC 2026.
          </span>
        </div>

        {/* Horizontal Timeline Track Connector with Scrollable Steps */}
        <div className="relative block mb-12">
          
          {/* Scroll indicators/buttons */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={handlePrev}
              disabled={selectedStepIdx === 0}
              className="p-2 border border-brand-outline/20 rounded-xl bg-brand-surface text-brand-gold hover:bg-brand-gold/15 hover:border-brand-gold disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-brand-outline/20 cursor-pointer transition-all"
              aria-label="Etape précedente"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={selectedStepIdx === CALENDAR_STEPS.length - 1}
              className="p-2 border border-brand-outline/20 rounded-xl bg-brand-surface text-brand-gold hover:bg-brand-gold/15 hover:border-brand-gold disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-brand-outline/20 cursor-pointer transition-all"
              aria-label="Etape suivante"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Connected timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-gold via-brand-gold/50 to-brand-charcoal z-0 pointer-events-none translate-y-[2px]" />

          {/* Horizontal scrollbar panel */}
          <div className="flex gap-4 overflow-x-auto py-6 px-4 -mx-4 scrollbar-thin scrollbar-thumb-brand-charcoal z-10 relative select-none">
            {CALENDAR_STEPS.map((item, idx) => {
              const works = selectedStepIdx === idx;
              const isOpen = item.status === "OUVERT";

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedStepIdx(idx)}
                  className={`flex-shrink-0 w-44 glass-panel rounded-xl p-4.5 cursor-pointer flex flex-col justify-between items-start border relative transition-all duration-300 ${
                    works
                      ? "border-brand-gold bg-brand-gold/5 shadow-[0_0_20px_rgba(242,195,91,0.12)] -translate-y-2"
                      : "border-brand-outline/15 hover:border-brand-outline/35 hover:bg-brand-charcoal/20"
                  }`}
                >
                  {/* Step visual indicator ball */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20">
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        works
                          ? "bg-brand-gold border-brand-bg scale-125 pulse-glowing-orb"
                          : isOpen
                          ? "bg-brand-gold border-brand-bg pulse-glowing-orb"
                          : "bg-brand-charcoal border-brand-outline/20"
                      }`}
                    />
                  </div>

                  <div className="mb-4 text-left">
                    <span className="font-mono text-[9px] text-brand-gold font-bold tracking-widest block uppercase">
                      {item.step}
                    </span>
                    <span className="font-display font-bold text-xs text-brand-outline mt-0.5 block">
                      {item.date}
                    </span>
                  </div>

                  <div className="text-left">
                    <h3 className="font-display font-medium text-xs text-brand-ivory leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    <span
                      className={`inline-block font-mono text-[8px] font-bold px-2 py-0.5 rounded-full mt-3 ${
                        isOpen
                          ? "bg-brand-gold/20 text-brand-gold border border-brand-gold/30"
                          : "bg-brand-outline/10 text-brand-outline border border-brand-outline/5"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Selected Event Details Panel underneath */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStepIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="glass-panel rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto border border-brand-gold/25 bg-gradient-to-br from-brand-surface to-brand-bg relative text-left"
          >
            <div className="absolute -top-3 left-8 bg-brand-gold text-black rounded-md px-3 py-1 text-[9px] font-mono font-black tracking-widest uppercase">
              Étape active : {selectedStep.step}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-brand-gold shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs text-brand-gold font-bold tracking-wider">
                    {selectedStep.date}
                  </span>
                  <h3 className="font-display font-bold text-lg sm:text-2xl text-brand-ivory leading-tight mt-0.5">
                    {selectedStep.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-brand-outline/10 bg-brand-bg/60">
                <span className={`w-2 h-2 rounded-full ${
                  selectedStep.status === "OUVERT" ? "bg-brand-gold pulse-glowing-orb" : "bg-brand-outline"
                }`} />
                <span className="font-mono text-[9px] tracking-widest font-black uppercase text-brand-ivory">
                  Statut : {selectedStep.status}
                </span>
              </div>
            </div>

            <p className="font-sans text-brand-outline text-sm sm:text-base leading-relaxed mt-6 border-t border-brand-charcoal/30 pt-6">
              {selectedStep.description || "Aucun détail complémentaire fourni pour le moment pour cette étape de prestige."}
            </p>

            <div className="flex items-center gap-2 mt-6 font-mono text-[10px] text-brand-gold/70">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span>Chaque jalon est supervisé par le Comité Officiel National DRC 2026</span>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
