import React from "react";
import { motion } from "motion/react";
import { Globe, UserCheck, Compass, GraduationCap, Heart, Calendar, Award } from "lucide-react";
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
      className="py-24 sm:py-32 px-4 relative bg-brand-bg/95 overflow-hidden border-t border-brand-charcoal/30"
    >
      {/* Background soft lighting glows */}
      <div className="absolute top-1/2 left-0 w-[40vw] h-[40vw] max-w-[400px] bg-brand-gold/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30vw] h-[30vw] max-w-[300px] bg-brand-outline/2 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <motion.span
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs font-bold tracking-[0.3em] text-brand-gold uppercase block mb-3"
          >
            {ABOUT_INFO.tagline}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="font-display font-medium text-3xl sm:text-4xl text-brand-ivory leading-tight mb-6"
          >
            MISS NATIONALE DRC - {" "}
            <span className="text-transparent bg-clip-text gold-text-gradient font-bold">
              Révéler la grandeur
            </span>
            , porter la RDC au sommet du monde.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-sans text-brand-outline text-sm sm:text-base leading-relaxed"
          >
            {ABOUT_INFO.mainParagraph}
          </motion.p>
        </div>

        {/* 6 Grid Missions Layout */}
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
                className="glass-panel glass-panel-hover rounded-2xl p-8 relative overflow-hidden group"
              >
                {/* Visual Number on top right corner */}
                <span className="absolute top-4 right-6 font-display font-bold text-6xl text-brand-gold/5 group-hover:text-brand-gold/10 transition-colors">
                  {mission.id}
                </span>

                {/* Icon wrapper with gold glow shadow */}
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-black transition-all duration-300 shadow-[0_4px_10px_rgba(242,195,91,0.05)] group-hover:shadow-[0_4px_15px_rgba(242,195,91,0.25)]">
                  <IconComponent className="w-5 h-5" />
                </div>

                <h3 className="font-display font-semibold text-lg text-brand-ivory mb-3 group-hover:text-brand-gold transition-colors">
                  {mission.title}
                </h3>

                <p className="font-sans text-brand-outline text-xs sm:text-sm leading-relaxed">
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
          className="relative rounded-2xl overflow-hidden glass-panel p-8 sm:p-12 border border-brand-gold/30 bg-gradient-to-r from-brand-surface via-brand-surface/90 to-brand-surface/60"
        >
          {/* Subtle gold ribbon graphic accent */}
          <div className="absolute top-0 bottom-0 left-0 w-1.5 gold-gradient-bg" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex flex-col max-w-2xl text-left">
              <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase mb-2 block">
                {ABOUT_INFO.visionTitle}
              </span>
              <h3 className="font-display font-medium text-xl sm:text-2xl text-brand-ivory leading-snug">
                "Devenir la référence nationale et internationale de la beauté, de l'intelligence et de la culture congolaise."
              </h3>
            </div>
            
            {/* National representation badge */}
            <div className="flex items-center gap-4 border border-brand-outline/25 bg-brand-bg/50 px-6 py-4 rounded-xl shrink-0">
              <Award className="w-10 h-10 text-brand-gold shrink-0 pulse-glowing-orb rounded-full p-1" />
              <div className="flex flex-col text-left">
                <span className="font-display font-bold text-xs tracking-wider text-brand-ivory">
                  RDC Unie
                </span>
                <span className="font-mono text-[9px] text-brand-outline mt-0.5">
                  26 Provinces représentées
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
