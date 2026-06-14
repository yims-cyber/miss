import React from "react";
import { motion } from "motion/react";
import { ArrowDown, Award, PlayCircle } from "lucide-react";
import { HERO_ASSETS, HERO_STATS } from "../data";

interface HeroProps {
  onOpenRegister: () => void;
}

export default function Hero({ onOpenRegister }: HeroProps) {
  const scrollToAbout = () => {
    const target = document.getElementById("apropos");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-4 overflow-hidden bg-brand-bg select-none"
    >
      {/* Background spotlights & atmospheric dust effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] max-w-[400px] bg-brand-outline/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[30vw] h-[30vw] max-w-[300px] bg-brand-gold/3 rounded-full blur-[80px] pointer-events-none" />

      {/* Grid Pattern overlay for tech-luxe feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,168,67,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,168,67,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-60" />

      {/* Hero content container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Editorial Typography & Copy */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold pulse-glowing-orb" />
            Édition Officielle 2026
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-1"
          >
            <span className="font-display text-xs md:text-sm font-bold tracking-[0.4em] text-brand-gold uppercase">
              Le Prestige de l'Élégance
            </span>
            <h1 className="font-display font-medium text-4xl sm:text-5xl md:text-6xl text-brand-ivory tracking-tight leading-[1.1]">
              MISS NATIONALE
              <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text gold-text-gradient font-bold drop-shadow-[0_2px_15px_rgba(242,195,91,0.2)]">
                RÉPUBLIQUE DÉMOCRATIQUE
              </span>
              <span className="block mt-1 font-display font-light italic">
                DU CONGO
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-brand-outline text-sm md:text-base leading-relaxed max-w-xl"
          >
            Excellence — Cultiver l’excellence comme pilier fondamental de notre vision et de nos ambitions nationales. Une célébration majestueuse de la beauté, de l'intelligence et des valeurs de la femme congolaise.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 items-center mt-4 w-full sm:w-auto"
          >
            <button
              id="hero-cta-apply"
              onClick={onOpenRegister}
              className="gold-gradient-bg px-8 py-3.5 text-xs font-extrabold text-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_25px_rgba(242,195,91,0.5)] transition-all cursor-pointer inline-flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              <Award className="w-4 h-4 transition-transform group-hover:scale-110" />
              Postuler maintenant
            </button>

            <button
              id="hero-cta-discover"
              onClick={scrollToAbout}
              className="px-8 py-3.5 text-xs font-extrabold text-brand-gold tracking-widest rounded-xl border border-brand-outline/20 bg-brand-surface/40 hover:bg-brand-gold/10 hover:border-brand-gold/40 hover:text-brand-ivory transition-all cursor-pointer inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <PlayCircle className="w-4 h-4 text-brand-gold-dark" />
              Découvrir
            </button>
          </motion.div>
        </div>

        {/* Right Side: Circular Crown Portrait Frame with Spinning Glowing Rings */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[380px] md:h-[380px] flex items-center justify-center select-none"
          >
            {/* Spinning/pulsing halo rings */}
            <div className="absolute inset-0 rounded-full border border-brand-gold/20 animate-[spin_40s_linear_infinite]" />
            <div className="absolute -inset-4 rounded-full border border-dashed border-brand-gold/10 animate-[spin_60s_linear_infinite]" />
            <div className="absolute -inset-8 rounded-full border border-brand-gold/5 animate-[spin_80s_linear_infinite]" />

            {/* Glowing gold backdrops */}
            <div className="absolute inset-4 bg-[radial-gradient(circle,rgba(242,195,91,0.2)_0%,transparent_70%)] rounded-full blur-md" />

            {/* Glowing Golden Ring frame around the image */}
            <div className="absolute inset-2 rounded-full border-2 border-brand-gold/45 shadow-[0_0_35px_rgba(242,195,91,0.35)] z-20 pointer-events-none" />

            {/* Main Beauty Queen Portrait Image inside circle */}
            <div className="relative w-[92%] h-[92%] rounded-full overflow-hidden border border-brand-outline/30 z-10 bg-brand-surface group">
              <img
                src={HERO_ASSETS.heroImage}
                alt="Miss Nationale DRC 2026 Ambassador"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Bottom luxury vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/60 via-transparent to-transparent opacity-80" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Bento Counter Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 w-full max-w-7xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 px-2"
      >
        {HERO_STATS.map((stat, i) => (
          <div
            key={i}
            className="glass-panel rounded-2xl p-6 text-center flex flex-col justify-center items-center relative overflow-hidden group transition-all duration-300 hover:border-brand-gold/40 hover:shadow-[0_10px_25px-rgba(242,195,91,0.08)] bg-gradient-to-b from-brand-surface/40 to-brand-surface/75"
          >
            {/* Subtle background flare */}
            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-brand-gold/5 rounded-full blur-xl group-hover:bg-brand-gold/15 transition-all duration-500" />
            
            <span className="font-display text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text gold-text-gradient mb-1">
              {stat.value}
            </span>
            <span className="font-sans text-brand-ivory text-xs md:text-sm font-semibold tracking-wider uppercase">
              {stat.label}
            </span>
            <span className="font-sans text-brand-outline text-[10px] md:text-xs mt-1 font-light opacity-80">
              {stat.description}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Scroll Down Hint Indication */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={scrollToAbout}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer z-10 opacity-70 hover:opacity-100 transition-opacity"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-brand-outline">
          Scroll
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-brand-gold" />
      </motion.div>
    </section>
  );
}
