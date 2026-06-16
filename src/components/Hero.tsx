import React from "react";
import { motion } from "motion/react";
import { ArrowDown, Award, PlayCircle } from "lucide-react";
import { HERO_ASSETS, HERO_STATS } from "../data";

interface HeroProps {
  onOpenRegister: () => void;
}

export default function Hero({ onOpenRegister }: HeroProps) {
  const CAROUSEL_SLIDES = [
    {
      image: "/src/assets/images/candidate_daniella_1781411235051.jpg",
      name: "Daniella M.",
      province: "KINSHASA",
      glowColor: "rgba(255, 255, 255, 0.35)",
      plateBg: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 60%, rgba(9,9,11,0.95) 100%)"
    },
    {
      image: "/src/assets/images/candidate_djenny_1781411252428.jpg",
      name: "Djenny K.",
      province: "LUBUMBASHI",
      glowColor: "rgba(242, 195, 91, 0.25)",
      plateBg: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(242,195,91,0.04) 60%, rgba(9,9,11,0.95) 100%)"
    },
    {
      image: "/src/assets/images/candidate_danena_1781411268128.jpg",
      name: "Danena A.",
      province: "LUBUMBASHI",
      glowColor: "rgba(214, 168, 67, 0.32)",
      plateBg: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(214,168,67,0.06) 60%, rgba(9,9,11,0.95) 100%)"
    },
    {
      image: "/src/assets/images/candidate_daniella_1781411235051.jpg",
      name: "Juanna G.",
      province: "KINSHASA",
      glowColor: "rgba(255, 255, 255, 0.32)",
      plateBg: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,195,91,0.05) 60%, rgba(9,9,11,0.95) 100%)"
    },
    {
      image: "/src/assets/images/candidate_djenny_1781411252428.jpg",
      name: "Barusa E.",
      province: "KINSHASA",
      glowColor: "rgba(242, 195, 91, 0.26)",
      plateBg: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(242,195,91,0.05) 60%, rgba(9,9,11,0.95) 100%)"
    },
    {
      image: "/src/assets/images/candidate_danena_1781411268128.jpg",
      name: "Nana A.",
      province: "KINSHASA",
      glowColor: "rgba(214, 168, 67, 0.28)",
      plateBg: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(214,168,67,0.05) 60%, rgba(9,9,11,0.95) 100%)"
    }
  ];

  const [activeSlide, setActiveSlide] = React.useState(0);
  const [dragStartX, setDragStartX] = React.useState<number | null>(null);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const diffX = e.touches[0].clientX - dragStartX;
    if (Math.abs(diffX) > 65) {
      if (diffX > 0) {
        setActiveSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
      } else {
        setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
      }
      setDragStartX(null);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX === null) return;
    const diffX = e.clientX - dragStartX;
    if (Math.abs(diffX) > 65) {
      if (diffX > 0) {
        setActiveSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
      } else {
        setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
      }
      setDragStartX(null);
    }
  };

  const handleMouseUp = () => {
    setDragStartX(null);
  };

  const scrollToAbout = () => {
    const target = document.getElementById("apropos");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="accueil"
      className="relative min-h-screen md:min-h-[660px] lg:min-h-screen flex flex-col justify-center items-center pt-[108px] sm:pt-[116px] md:pt-[115px] lg:pt-[105px] xl:pt-[115px] pb-16 md:pb-20 lg:pb-10 xl:pb-12 px-4 overflow-hidden bg-brand-bg select-none"
    >
      {/* Background spotlights & atmospheric dust effects - ANIMATED */}
      <motion.div
        className="absolute top-1/4 left-1/2 w-[80vw] h-[80vw] max-w-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"
        animate={{
          x: ["-50%", "-46%", "-54%", "-50%"],
          y: ["-50%", "-54%", "-46%", "-50%"],
          scale: [1, 1.08, 0.92, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] max-w-[400px] bg-brand-outline/4 rounded-full blur-[100px] pointer-events-none"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -25, 25, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="absolute bottom-10 right-10 w-[30vw] h-[30vw] max-w-[300px] bg-brand-gold/3 rounded-full blur-[80px] pointer-events-none" />

      {/* Grid Pattern overlay for tech-luxe feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,168,67,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,168,67,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-60" />

      {/* Luxury animated background drifting dust particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-brand-gold/30"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: "blur(0.5px)",
            }}
            animate={{
              y: [0, -(120 + Math.random() * 180), 0],
              x: [0, (Math.random() - 0.5) * 60, 0],
              opacity: [0.1, 0.85, 0.1],
              scale: [0.7, 1.3, 0.7],
            }}
            transition={{
              duration: 12 + Math.random() * 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Mobile-only background image of the beauty queen/ambassador */}
      <div className="absolute inset-0 md:hidden z-0 overflow-hidden pointer-events-none">
        <motion.img
          key={activeSlide}
          src={CAROUSEL_SLIDES[activeSlide].image}
          alt="Ambassadrice RDC Background"
          referrerPolicy="no-referrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.28 }}
          transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle dark overlay gradient for text eligibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/95 via-brand-bg/80 to-brand-bg/98" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(9,9,11,0.95)_90%)]" />
      </div>

      {/* Hero content container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 lg:gap-8 xl:gap-12 items-center">
        {/* Left Side: Editorial Typography & Copy */}
        <div className="md:col-span-6 flex flex-col items-center md:items-start gap-3.5 md:gap-4 lg:gap-3 xl:gap-4 text-center md:text-left order-2 md:order-1 transform md:-translate-y-6 lg:translate-y-0">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold/10 border border-brand-gold/20 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] text-brand-gold font-bold"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold pulse-glowing-orb" />
            Édition Officielle 2026
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-1 items-center md:items-start"
          >
            <span className="font-display text-[10px] sm:text-xs md:text-xs lg:text-xs xl:text-sm font-bold tracking-[0.4em] text-brand-gold uppercase">
              Le Prestige de l'Élégance
            </span>
            <h1 className="font-display font-medium text-3xl sm:text-4xl md:text-3xl lg:text-3xl xl:text-5xl text-brand-ivory tracking-tight leading-[1.1]">
              MISS NATIONALE{" "}
              <span className="text-transparent bg-clip-text gold-text-gradient font-bold drop-shadow-[0_2px_15px_rgba(242,195,91,0.2)]">
                RDC
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-brand-outline text-xs sm:text-sm md:text-xs lg:text-xs xl:text-base leading-relaxed max-w-xl mx-auto md:mx-0"
          >
            Excellence — Cultiver l’excellence comme pilier fondamental de notre vision et de nos ambitions nationales. Une célébration majestueuse de la beauté, de l'intelligence et des valeurs de la femme congolaise.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center md:justify-start mt-2 md:mt-1 lg:mt-2 xl:mt-3 w-full sm:w-auto"
          >
            <button
              id="hero-cta-apply"
              onClick={onOpenRegister}
              className="gold-gradient-bg px-6 py-3 sm:px-8 sm:py-3.5 md:px-5 md:py-2.5 lg:px-8 lg:py-3.5 text-[10px] sm:text-xs font-extrabold text-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_25px_rgba(242,195,91,0.5)] transition-all cursor-pointer inline-flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              <Award className="w-4 h-4 transition-transform group-hover:scale-110" />
              Postuler maintenant
            </button>

            <button
              id="hero-cta-discover"
              onClick={scrollToAbout}
              className="px-6 py-3 sm:px-8 sm:py-3.5 md:px-5 md:py-2.5 lg:px-8 lg:py-3.5 text-[10px] sm:text-xs font-extrabold text-brand-gold tracking-widest rounded-xl border border-brand-outline/20 bg-brand-surface/40 hover:bg-brand-gold/10 hover:border-brand-gold/40 hover:text-brand-ivory transition-all cursor-pointer inline-flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <PlayCircle className="w-4 h-4 text-brand-gold-dark" />
              Découvrir
            </button>
          </motion.div>
        </div>

        {/* Right Side: 3D Swap/Slide Carousel (Desktop & Tablet only) */}
        <div 
          className="hidden md:flex md:col-span-6 lg:col-span-6 justify-center items-center order-1 md:order-2 mt-4 relative z-20 w-full min-h-[460px]"
          style={{ perspective: 1400 }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="relative w-full h-[410px] lg:h-[450px] flex items-center justify-center select-none">
            
            {/* Ambient sliding back-light halo ("qui fait changer le fond lumineux") */}
            <motion.div
              key={`halo-${activeSlide}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
              className="absolute w-[290px] h-[290px] rounded-full blur-[90px] pointer-events-none mix-blend-screen -translate-y-4"
              style={{
                background: CAROUSEL_SLIDES[activeSlide].plateBg,
              }}
            />

            {/* Orbiting Golden Particle Rings */}
            <div className="absolute w-[250px] h-[340px] lg:w-[290px] lg:h-[390px] rounded-full border border-dashed border-brand-gold/10 animate-[spin_55s_linear_infinite] pointer-events-none -translate-y-4" />

            {/* 3D Stacking Loop of Candidates */}
            {CAROUSEL_SLIDES.map((slide, i) => {
              let offset = i - activeSlide;
              const len = CAROUSEL_SLIDES.length;
              if (offset < -len / 2) offset += len;
              if (offset > len / 2) offset -= len;

              const isActive = i === activeSlide;
              const absOffset = Math.abs(offset);

              // Hide far away cards to keep layout beautiful
              if (absOffset > 2) return null;

              // Compute precise 3D math transformations on standard cylindrical path
              const xTranslate = offset * 130; 
              const zTranslate = -absOffset * 140; 
              const rotateY = offset * -25; 
              const scale = isActive ? 1.05 : 1 - absOffset * 0.14;
              const opacity = 1 - absOffset * 0.45;
              const zIndex = 15 - absOffset;

              return (
                <motion.div
                  key={i}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  animate={{
                    x: xTranslate,
                    z: zTranslate,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 18,
                  }}
                  onClick={() => setActiveSlide(i)}
                  className={`absolute w-[220px] h-[310px] lg:w-[260px] lg:h-[360px] xl:w-[280px] xl:h-[390px] rounded-[1.6rem] border ${
                    isActive 
                      ? "border-brand-gold/50 shadow-[0_22px_45px_rgba(242,195,91,0.22)]" 
                      : "border-brand-outline/15 shadow-[0_15px_30px_rgba(0,0,0,0.55)] hover:border-brand-gold/35"
                  } bg-brand-surface/25 backdrop-blur-md overflow-hidden p-2.5 flex flex-col items-center justify-center transition-colors duration-300 cursor-pointer`}
                >
                  {/* Internal Glow Plate */}
                  <div
                    className="absolute inset-0 pointer-events-none z-0 opacity-70"
                    style={{
                      background: slide.plateBg,
                    }}
                  />

                  {/* Inner golden ring frame around image */}
                  <div className={`absolute inset-2 rounded-[1.3rem] border ${isActive ? "border-brand-gold/25" : "border-transparent"} pointer-events-none z-20`} />

                  {/* Golden Corner Ornaments */}
                  <div className="absolute top-3.5 left-3.5 w-3.5 h-3.5 border-t border-l border-brand-gold/40 z-30 pointer-events-none" />
                  <div className="absolute top-3.5 right-3.5 w-3.5 h-3.5 border-t border-r border-brand-gold/40 z-30 pointer-events-none" />
                  <div className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 border-b border-l border-brand-gold/40 z-30 pointer-events-none" />
                  <div className="absolute bottom-3.5 right-3.5 w-3.5 h-3.5 border-b border-r border-brand-gold/40 z-30 pointer-events-none" />

                  {/* Portrait Miss Crop */}
                  <div className="relative w-full h-full rounded-[1.2rem] overflow-hidden z-10 bg-black/45">
                    <img
                      src={slide.image}
                      alt={slide.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105 select-none pointer-events-none"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-bg/95 via-brand-bg/40 to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-brand-bg/40 to-transparent z-10 pointer-events-none" />
                  </div>

                  {/* Info Tag overlay on slide */}
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center py-1.5 px-3 rounded-full bg-brand-bg/90 border border-brand-gold/15 backdrop-blur-md shadow-md w-[84%] text-center pointer-events-none">
                    <span className="font-mono text-[8px] tracking-[0.2em] text-brand-gold font-bold uppercase">
                      {slide.province}
                    </span>
                    <span className="font-display text-[10px] font-bold text-brand-ivory mt-0.5 whitespace-nowrap">
                      {slide.name}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* Bottom Slider Navigation controls */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
                }}
                className="w-7 h-7 rounded-full border border-brand-outline/25 bg-[#0e0d14]/80 hover:bg-brand-gold/20 hover:border-brand-gold/50 text-brand-gold transition-all flex items-center justify-center text-sm font-bold cursor-pointer"
                aria-label="Previous slide"
              >
                ‹
              </button>
              
              <div className="flex gap-1.5">
                {CAROUSEL_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSlide(i);
                    }}
                    className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                      activeSlide === i ? "w-5 bg-brand-gold" : "w-1 bg-brand-outline/50 hover:bg-brand-gold/40"
                    }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
                }}
                className="w-7 h-7 rounded-full border border-brand-outline/25 bg-[#0e0d14]/80 hover:bg-brand-gold/20 hover:border-brand-gold/50 text-brand-gold transition-all flex items-center justify-center text-sm font-bold cursor-pointer"
                aria-label="Next slide"
              >
                ›
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Bento Counter Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 w-full max-w-7xl mx-auto mt-4 sm:mt-6 md:mt-16 lg:mt-2 xl:mt-2 transform lg:-translate-y-6 xl:-translate-y-12 lg:w-1/2 lg:mx-0 lg:mr-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-2"
      >
        {HERO_STATS.map((stat, i) => (
          <div
            key={i}
            className="glass-panel rounded-2xl p-3 sm:p-4 md:p-2 lg:p-2 xl:p-3.5 text-center flex flex-col justify-center items-center relative overflow-hidden group transition-all duration-300 hover:border-brand-gold/40 hover:shadow-[0_10px_25px_rgba(242,195,91,0.08)] bg-gradient-to-b from-brand-surface/40 to-brand-surface/75"
          >
            {/* Subtle background flare */}
            <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-brand-gold/5 rounded-full blur-xl group-hover:bg-brand-gold/15 transition-all duration-500" />
            
            <span className="font-display text-2xl sm:text-3xl md:text-[1.3rem] lg:text-lg xl:text-2xl font-bold tracking-tight text-transparent bg-clip-text gold-text-gradient mb-0.5 sm:mb-1">
              {stat.value}
            </span>
            <span className="font-sans text-brand-ivory text-[10px] sm:text-xs md:text-[8px] lg:text-[8px] xl:text-[10px] font-semibold tracking-wider uppercase">
              {stat.label}
            </span>
            <span className="font-sans text-brand-outline text-[9px] sm:text-[9px] md:text-[8px] lg:text-[7px] xl:text-[9px] mt-0.5 sm:mt-1 font-light opacity-80 leading-normal">
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
        className="absolute bottom-3 md:bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer z-10 opacity-70 hover:opacity-100 transition-opacity"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-brand-outline">
          Défiler
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-brand-gold" />
      </motion.div>
    </section>
  );
}
