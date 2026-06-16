import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Crown, Award, Home, Info, UserCheck, Users, Heart, Sparkles, Mail } from "lucide-react";
import { NAVIGATION_LINKS } from "../data";

const getLinkIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "accueil":
      return <Home className="w-3.5 h-3.5 shrink-0" />;
    case "concours":
      return <Award className="w-3.5 h-3.5 shrink-0" />;
    case "casting":
      return <UserCheck className="w-3.5 h-3.5 shrink-0" />;
    case "candidates":
      return <Users className="w-3.5 h-3.5 shrink-0" />;
    case "vote":
      return <Heart className="w-3.5 h-3.5 shrink-0" />;
    case "partenaires":
      return <Sparkles className="w-3.5 h-3.5 shrink-0" />;
    case "contact":
      return <Mail className="w-3.5 h-3.5 shrink-0" />;
    default:
      return <Crown className="w-3.5 h-3.5 shrink-0" />;
  }
};


interface HeaderProps {
  onOpenRegister: () => void;
}

export default function Header({ onOpenRegister }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#accueil");

  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.hash) {
        setActiveHash(window.location.hash);
      }
    };
    window.addEventListener("hashchange", handleLocationChange);
    handleLocationChange();
    return () => window.removeEventListener("hashchange", handleLocationChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Guard active navigation highlighting when on the dedicated Candidates Page
      if (window.location.hash === "#candidates") {
        setActiveHash("#candidates");
        return;
      }
      if (window.location.hash === "#concours") {
        setActiveHash("#concours");
        return;
      }

      // Simple active link detection based on section visibility
      const sections = NAVIGATION_LINKS.map(link => 
        document.getElementById(link.href.replace("#", ""))
      );

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.scrollY;
          if (sectionTop <= scrollPosition) {
            setActiveHash(NAVIGATION_LINKS[i].href);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.location.hash = href;
    setActiveHash(href);
  };

  return (
    <>
      <motion.header
        id="navbar-main"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 rounded-tl-2xl rounded-tr-2xl rounded-b-none ${
          isScrolled 
            ? "bg-brand-bg border-b border-brand-outline/25 shadow-lg py-2 px-6 sm:px-8" 
            : "bg-brand-bg border-b border-brand-outline/15 py-3 px-6 sm:px-8"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo with official image only */}
          <a 
            href="#accueil" 
            onClick={(e) => handleLinkClick(e, "#accueil")}
            className="flex items-center group cursor-pointer"
          >
            <img 
              src="https://missnationalerdc.approtech.org/admin/logo.png" 
              alt="Logo Miss Nationale" 
              referrerPolicy="no-referrer"
              className="h-11 sm:h-13 md:h-14 lg:h-15 xl:h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105 filter drop-shadow-[0_0_15px_rgba(242,195,91,0.25)]"
            />
          </a>

          {/* Unified Premium Menu Trigger (Mobile & Desktop) at the right-hand side */}
          <div className="flex items-center">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-10 px-4 text-brand-outline hover:text-brand-ivory transition-all duration-300 flex items-center gap-2 cursor-pointer border border-brand-gold hover:border-brand-gold/30 hover:bg-brand-surface/45 rounded-none text-xs font-semibold tracking-wider font-mono uppercase"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-brand-gold" /> : <Menu className="w-4 h-4 text-brand-gold" />}
              <span>Menu</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Unified Menu Overlay Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-dropdown"
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[60px] sm:top-[76px] md:top-[88px] left-0 right-0 z-40 w-full bg-brand-bg border-b border-brand-outline/25 rounded-t-none rounded-b-2xl p-5 sm:p-7 shadow-[0_30px_70px_rgba(0,0,0,0.85)] flex flex-col md:grid md:grid-cols-12 gap-6 items-stretch"
          >
            <div className="flex flex-col gap-2 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-xs sm:text-sm py-2.5 px-3.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 border ${
                    activeHash === link.href
                      ? "bg-brand-gold/10 text-brand-gold font-bold border-brand-gold/30 shadow-[0_4px_20px_rgba(242,195,91,0.1)]"
                      : "text-brand-outline hover:text-brand-ivory hover:bg-brand-charcoal/30 border-transparent"
                  }`}
                >
                  {getLinkIcon(link.label)}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col justify-center gap-3 md:col-span-4 border-t md:border-t-0 md:border-l border-brand-outline/10 pt-4 md:pt-0 md:pl-6 text-left">
              <span className="text-[10px] tracking-[0.25em] font-mono text-brand-gold font-semibold uppercase flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5" /> Nationale DRC
              </span>
              <p className="text-[11px] text-brand-outline leading-relaxed">
                Suivez la sélection nationale, soutenez vos candidates favorites et participez activement à l'élection de l'ambassadrice suprême de la beauté congolaise.
              </p>
              <button
                id="cta-mobile-register"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegister();
                }}
                className="gold-gradient-bg w-full py-2.5 text-xs font-bold text-black rounded-lg hover:shadow-[0_0_15px_rgba(242,195,91,0.3)] transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 mt-1"
              >
                <Award className="w-4 h-4" />
                S'inscrire au Concours
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
