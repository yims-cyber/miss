import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Crown, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Send, Sparkles, Heart, ArrowRight } from "lucide-react";
import { NAVIGATION_LINKS, PARTNERS_LIST } from "../data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setSubStatus("error");
      return;
    }
    setSubStatus("success");
    setEmail("");
    setTimeout(() => {
      setSubStatus("idle");
    }, 4000);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    window.location.hash = href;
  };

  const handleVoteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.hash = "#candidates";
    const target = document.getElementById("candidates");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer id="contact" className="bg-brand-bg relative overflow-hidden border-t border-brand-charcoal/30 select-none">
      
      {/* Upper Brand Sponsors / Partners Marquee Row */}
      <div id="partenaires" className="border-b border-brand-charcoal/30 py-10 bg-brand-surface/15">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-brand-gold/70 block mb-6">
            Soutenu par nos partenaires d'excellence
          </span>
          
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-65 grayscale hover:grayscale-0 transition-all duration-500">
            {PARTNERS_LIST.map((partner, idx) => (
              <div
                key={idx}
                className="font-display font-black text-brand-ivory text-sm sm:text-base md:text-lg tracking-[0.15em] flex items-center gap-1 hover:text-brand-gold transition-colors"
              >
                {partner.name === "CANAL+" ? (
                  <span className="font-sans font-black tracking-normal flex items-center bg-brand-ivory text-black py-0.5 px-2 rounded-sm text-xs font-bold leading-none">
                    CANAL+
                  </span>
                ) : partner.name === "Microsoft" ? (
                  <span className="font-sans font-medium flex items-center gap-1.5 text-xs">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 23 23" fill="currentColor">
                      <rect x="0" y="0" width="11" height="11" fill="#f25022"/>
                      <rect x="12" y="0" width="11" height="11" fill="#7fba00"/>
                      <rect x="0" y="12" width="11" height="11" fill="#00a4ef"/>
                      <rect x="12" y="12" width="11" height="11" fill="#ffb900"/>
                    </svg>
                    Microsoft
                  </span>
                ) : (
                  <span className="uppercase">{partner.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Big Call to Action bottom element - Styled per the requested photo */}
      <div 
        className="py-24 relative px-4 text-center bg-[#FAF8F5] border-t border-b border-[#EEEAE0]"
        style={{
          backgroundSize: '24px 24px',
          backgroundImage: 'linear-gradient(to right, rgba(212, 168, 67, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 168, 67, 0.05) 1px, transparent 1px)'
        }}
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Subtitle / Edition Badge */}
          <div className="flex items-center justify-center gap-3 text-brand-gold-dark text-[10px] sm:text-xs font-sans uppercase tracking-[0.35em] font-bold mb-5">
            <span className="h-[1px] w-6 sm:w-10 bg-brand-gold-dark/40" />
            <span>Vote Public Ouvert</span>
            <span className="h-[1px] w-6 sm:w-10 bg-brand-gold-dark/40" />
          </div>

          {/* Majestic title with custom underline decor */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-neutral-900 leading-tight font-light mb-2">
            Votez pour votre <span className="italic text-brand-gold-dark font-normal">Favorite</span>
          </h2>
          
          <div className="w-12 h-[2px] bg-brand-gold-dark/50 mx-auto mb-6" />

          {/* Core Vote description */}
          <p className="font-sans text-neutral-600 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto mb-8">
            Soutenez la candidate qui vous inspire le plus et contribuez à élire la prochaine Miss Nationale DRC 2026 — ambassadrice officielle des causes sociales de la République Démocratique du Congo.
          </p>

          <div className="flex justify-center mb-6">
            <button
              onClick={handleVoteClick}
              className="px-8 py-4 sm:px-10 sm:py-4.5 rounded-xl bg-gradient-to-b from-brand-gold via-[#e5b54c] to-brand-gold-dark text-black font-sans font-extrabold text-[11px] sm:text-xs uppercase tracking-[0.18em] hover:brightness-105 shadow-[0_6px_20px_rgba(212,168,67,0.35)] hover:shadow-[0_8px_30px_rgba(212,168,67,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2.5"
            >
              <Heart className="w-4 h-4 text-black stroke-[2]" />
              <span>Voter maintenant</span>
              <ArrowRight className="w-4 h-4 text-black stroke-[2]" />
            </button>
          </div>

          {/* Fine descriptive regulatory text */}
          <p className="font-sans text-neutral-400 text-[10px] sm:text-xs max-w-2xl mx-auto leading-relaxed">
            1 vote par personne · Sécurisé · Toute tentative de manipulation entraîne une disqualification définitive (Art. 9 du Règlement)
          </p>
        </div>
      </div>

      {/* Footer Content Columns */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-y-12 md:gap-x-10">
        
        {/* Logo and Branding summary Column */}
        <div className="md:col-span-6 lg:col-span-4 flex flex-col items-start text-left gap-4">
          <div className="flex items-center">
            <img 
              src="https://missnationalerdc.approtech.org/admin/logo.png" 
              alt="Logo Miss Nationale" 
              referrerPolicy="no-referrer"
              className="h-16 sm:h-20 lg:h-24 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(242,195,91,0.25)]"
            />
          </div>
          <p className="font-sans text-brand-outline text-xs leading-relaxed mt-2 max-w-xs">
            La plus haute distinction nationale de la beauté, de l'intelligence et du leadership féminin en République Démocratique du Congo.
          </p>

          {/* Social Icons row */}
          <div className="flex items-center gap-4 mt-4">
            {[
              { icon: Facebook, href: "https://facebook.com/missnationaledrc" },
              { icon: Instagram, href: "https://instagram.com/missnationaledrc" },
              { icon: Twitter, href: "https://twitter.com/missnationaledrc" },
              { icon: Linkedin, href: "https://linkedin.com/company/missnationaledrc" }
            ].map((soc, idx) => {
              const IconComp = soc.icon;
              return (
                <a
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-brand-outline/20 bg-brand-surface/40 flex items-center justify-center text-brand-outline hover:text-brand-gold hover:border-brand-gold transition-all duration-300"
                >
                  <IconComp className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Links Navigation Column */}
        <div className="md:col-span-6 lg:col-span-3 flex flex-col items-start text-left gap-4">
          <h4 className="font-display font-bold text-xs tracking-widest text-brand-gold uppercase">
            NAVIGATION
          </h4>
          <ul className="flex flex-col gap-2.5">
            {NAVIGATION_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-sans text-brand-outline hover:text-brand-ivory text-xs transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info Column */}
        <div className="md:col-span-6 lg:col-span-2 flex flex-col items-start text-left gap-4">
          <h4 className="font-display font-bold text-xs tracking-widest text-brand-gold uppercase">
            CONTACT
          </h4>
          <div className="flex flex-col gap-3.5">
            <div className="flex items-start gap-2 text-brand-outline hover:text-brand-ivory transition-colors">
              <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
              <span className="font-sans text-xs">Kinshasa, Gombe (RDC)</span>
            </div>
            <div className="flex items-center gap-2 text-brand-outline hover:text-brand-ivory transition-colors">
              <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span className="font-sans text-xs">+243 978 889 953</span>
            </div>
            <div className="flex items-center gap-2 text-brand-outline hover:text-brand-ivory transition-colors">
              <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span className="font-sans text-xs">missnationaledrc@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Newsletter subscription form Column */}
        <div className="md:col-span-6 lg:col-span-3 flex flex-col items-start text-left gap-4">
          <h4 className="font-display font-bold text-xs tracking-widest text-brand-gold uppercase">
            NEWSLETTER
          </h4>
          <p className="font-sans text-brand-outline text-xs leading-relaxed mb-1">
            Recevez l'agenda exclusif des soirées de présélection provinciales.
          </p>

          <form onSubmit={handleSubscribe} className="relative w-full flex flex-col gap-2">
            <div className="relative w-full">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre e-mail"
                className="bg-brand-surface border border-brand-outline/25 rounded-xl py-2 px-3 pr-10 font-sans text-xs text-brand-ivory placeholder-brand-outline/65 focus:outline-none focus:border-brand-gold transition-colors w-full"
                required
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-2.5 rounded-lg text-brand-gold hover:text-brand-ivory transition-colors"
                aria-label="S'abonner"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {subStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-brand-gold font-mono tracking-wider flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-brand-gold" />
                  <span>Abonnement Enregistré ! Merci.</span>
                </motion.div>
              )}
              {subStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[10px] text-red-400 font-mono"
                >
                  E-mail non valide. Réessayez.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

      </div>

      {/* Extreme bottom copyrights bar */}
      <div className="border-t border-brand-charcoal/20 py-6 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-brand-outline/80">
          <span>
            © 2026 Miss Nationale DRC. Tous droits réservés.
          </span>
          <div className="flex gap-4">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">Données légales</a>
            <span className="text-brand-charcoal">|</span>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-brand-gold transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
