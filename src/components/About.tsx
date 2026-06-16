import React from "react";
import { motion } from "motion/react";
import { Globe, UserCheck, Compass, GraduationCap, Heart, Calendar, Award, Sparkles, ArrowRight } from "lucide-react";
import { ABOUT_INFO, MISSIONS_LIST } from "../data";

// Map string icon name from data.ts to actual Lucide Icon Component
const IconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Globe: Globe,
  UserCheck: UserCheck,
  Compass: Compass,
  GraduationCap: GraduationCap,
  Heart: Heart,
  Calendar: Calendar
};

export default function About() {
  return (
    <section
      id="apropos"
      className="py-24 sm:py-32 px-4 relative bg-[#FAF8F5] overflow-hidden border-t border-b border-[#EEEAE0]"
      style={{
        backgroundSize: '24px 24px',
        backgroundImage: 'linear-gradient(to right, rgba(212, 168, 67, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 168, 67, 0.05) 1px, transparent 1px)'
      }}
    >
      {/* Background soft lighting glows to keep subtle warmth */}
      <div className="absolute top-1/2 left-0 w-[40vw] h-[40vw] max-w-[400px] bg-brand-gold-dark/4 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] max-w-[300px] bg-brand-gold/3 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header - Styled precisely like the photo layout */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          
          {/* Subtitle / Edition Badge with elegant lines */}
          <div className="flex items-center justify-center gap-3 text-brand-gold-dark text-[10px] sm:text-xs font-sans uppercase tracking-[0.35em] font-bold mb-5">
            <span className="h-[1px] w-6 sm:w-10 bg-brand-gold-dark/40" />
            <span>{ABOUT_INFO.tagline}</span>
            <span className="h-[1px] w-6 sm:w-10 bg-brand-gold-dark/40" />
          </div>
          
          {/* Majestic display serif heading in high-spec dark shade */}
          <h2 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-neutral-900 leading-tight mb-2">
            Miss Nationale <span className="italic text-brand-gold-dark font-normal">DRC 2026</span>
          </h2>

          {/* Central gold line decoration */}
          <div className="w-12 h-[2px] bg-brand-gold-dark/50 mx-auto mb-8" />

          {/* Core descriptive text aligned down center like the photo */}
          <p className="font-sans text-neutral-600 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto mb-8">
            {ABOUT_INFO.mainParagraph}
          </p>

          {/* Direct aesthetic action button mirroring the vote button in photo */}
          <div className="flex justify-center mb-12">
            <button
              onClick={() => {
                const target = document.getElementById("candidates");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                  window.location.hash = "#candidates";
                }
              }}
              className="px-8 py-4 sm:px-10 sm:py-4.5 rounded-xl bg-gradient-to-b from-brand-gold via-[#e5b54c] to-brand-gold-dark text-black font-sans font-extrabold text-[11px] sm:text-xs uppercase tracking-[0.18em] hover:brightness-105 shadow-[0_6px_20px_rgba(212,168,67,0.3)] hover:shadow-[0_8px_30px_rgba(212,168,67,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-black stroke-[2]" />
              <span>Découvrir les candidates</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[2]" />
            </button>
          </div>

        </div>

        {/* 6 Grid Missions Layout - Light styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {MISSIONS_LIST.map((mission, index) => {
            const IconComponent = IconMap[mission.iconName] || Award;
            return (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white/90 border border-brand-gold-dark/15 hover:border-brand-gold-dark/35 rounded-2xl p-8 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Visual Number on top right corner */}
                <span className="absolute top-4 right-6 font-display font-bold text-6xl text-brand-gold-dark/5 group-hover:text-brand-gold-dark/10 transition-colors">
                  {mission.id}
                </span>

                {/* Icon wrapper with gold glow shadow */}
                <div className="w-12 h-12 rounded-xl bg-brand-gold-dark/10 border border-brand-gold-dark/25 flex items-center justify-center text-brand-gold-dark mb-6 group-hover:bg-brand-gold-dark group-hover:text-black transition-all duration-300">
                  <IconComponent className="w-5 h-5 stroke-[1.5]" />
                </div>

                <h3 className="font-display font-bold text-xl text-neutral-900 mb-3 group-hover:text-brand-gold-dark transition-colors">
                  {mission.title}
                </h3>

                <p className="font-sans text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  {mission.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Majestic editorial Vision and Mission Box at the bottom */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-brand-gold/30 p-8 sm:p-12 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8"
        >
          {/* Subtle gold ribbon graphic accent */}
          <div className="absolute top-0 bottom-0 left-0 w-1.5 gold-gradient-bg" />

          <div className="flex flex-col max-w-2xl text-left relative z-10">
            <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase mb-2 block">
              {ABOUT_INFO.visionTitle}
            </span>
            <h3 className="font-display font-medium text-xl sm:text-2xl text-brand-ivory leading-snug">
              "Devenir la référence nationale et internationale de la beauté, de l'intelligence et de l'culture congolaise."
            </h3>
          </div>
          
          {/* National representation badge */}
          <div className="flex items-center gap-4 border border-brand-outline/25 bg-neutral-900 px-6 py-4 rounded-xl shrink-0 relative z-10">
            <Award className="w-10 h-10 text-brand-gold shrink-0 pulse-glowing-orb rounded-full p-1" />
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xs tracking-wider text-brand-ivory">
                RDC Unie
              </span>
              <span className="font-mono text-[9px] text-[#A69E91] mt-0.5">
                26 Provinces représentées
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
