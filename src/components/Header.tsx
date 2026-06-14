import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Crown, Award, Home, Info, UserCheck, Users, Heart, Sparkles, Mail } from "lucide-react";
import { NAVIGATION_LINKS } from "../data";

const getLinkIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case "accueil":
      return <Home className="w-3.5 h-3.5 shrink-0" />;
    case "à propos":
      return <Info className="w-3.5 h-3.5 shrink-0" />;
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active link detection based on section visibility
      const sections = NAVIGATION_LINKS.map(link => 
        document.getElementById(link.href.replace("#", ""))
      );

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveHash(NAVIGATION_LINKS[i].href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(href.replace("#", ""));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.header
        id="navbar-main"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-2 sm:top-3 md:top-4 left-4 right-4 z-50 mx-auto max-w-7xl transition-all duration-300 ${
          isScrolled 
            ? "bg-brand-bg/80 backdrop-blur-md border border-brand-outline/20 shadow-lg rounded-2xl py-1.5 px-6" 
            : "bg-brand-surface/35 backdrop-blur-sm border border-brand-outline/10 rounded-2xl py-2 sm:py-2.5 px-6"
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAVIGATION_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`px-3 py-1.5 text-xs font-semibold tracking-wider transition-all duration-300 rounded-md relative flex items-center gap-1.5 ${
                  activeHash === link.href
                    ? "text-brand-gold font-bold"
                    : "text-brand-outline hover:text-brand-ivory"
                }`}
              >
                {getLinkIcon(link.label)}
                <span>{link.label}</span>
                {activeHash === link.href && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-brand-gold rounded-full"
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* CTA Inscription */}
          <div className="hidden lg:block">
            <button
              id="cta-nav-register"
              onClick={onOpenRegister}
              className="gold-gradient-bg px-5 py-2 text-xs font-bold text-black rounded-lg hover:shadow-[0_0_15px_rgba(242,195,91,0.4)] transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              Inscription
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-brand-outline hover:text-brand-ivory transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-dropdown"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[66px] sm:top-[78px] md:top-[86px] left-4 right-4 z-40 lg:hidden bg-brand-surface/95 backdrop-blur-xl border border-brand-outline/20 rounded-2xl p-6 shadow-2xl flex flex-col gap-5 items-stretch"
          >
            <div className="flex flex-col gap-3">
              {NAVIGATION_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-sm py-2 px-3 rounded-lg font-medium transition-colors flex items-center gap-2.5 ${
                    activeHash === link.href
                      ? "bg-brand-gold/10 text-brand-gold font-bold"
                      : "text-brand-outline hover:text-brand-ivory hover:bg-brand-charcoal/30"
                  }`}
                >
                  {getLinkIcon(link.label)}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>

            <button
              id="cta-mobile-register"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="gold-gradient-bg w-full py-3 text-xs font-bold text-black rounded-xl hover:shadow-[0_0_15px_rgba(242,195,91,0.3)] transition-all cursor-pointer inline-flex items-center justify-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              S'inscrire au Concours
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
