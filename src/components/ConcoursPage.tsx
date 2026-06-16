import React from "react";
import { 
  Trophy, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  Crown, 
  FileText, 
  HelpCircle,
  MapPin,
  Phone,
  Mail,
  Heart,
  Award,
  Users,
  Check,
  GraduationCap,
  MessageSquare,
  AlertTriangle,
  ArrowRight,
  Star,
  BookOpen,
  Image,
  ThumbsUp,
  ChevronDown,
  UserCheck
} from "lucide-react";

// @ts-ignore
import heroImage from "../assets/images/miss_crown_new_1781571633401.jpg";

export default function ConcoursPage() {
  
  // Custom click function to open the register modal defined in App.tsx
  const handleOpenRegister = () => {
    const elements = document.querySelectorAll('[id^="open-register"], [class*="open-register"]');
    if (elements.length > 0) {
      (elements[0] as HTMLElement).click();
    } else {
      window.location.hash = "register";
    }
  };

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="concours" className="bg-[#07060a] min-h-screen text-brand-ivory relative overflow-x-hidden font-sans pt-0">
      
      {/* SECTION 1: HERO SHOWCASE (FULL SCREEN CINEMATIC LAYOUT) */}
      <div className="relative w-full overflow-hidden border-b border-brand-gold/15 bg-black px-4 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36 flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
        
        {/* Cinematic blurry base background */}
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-[0.20] contrast-[1.08] grayscale-[20%] scale-100 pointer-events-none transition-all duration-1000"
          style={{ 
            backgroundImage: `url(${heroImage})`,
          }} 
        />
        {/* Dark mask overlay to perfectly match the original layout aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#07060a]/92 to-[#07060a] pointer-events-none" />

        {/* Ambient Warm Golden Lights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-gold/8 blur-[140px] pointer-events-none z-0 mix-blend-screen" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Animated luxury crown-shield icon wrapper */}
          <div className="mb-6 relative">
            <div className="absolute -inset-4 bg-brand-gold/20 rounded-full blur-xl animate-pulse" />
            <Crown className="w-16 h-16 text-brand-gold stroke-[0.8] relative z-10" />
          </div>

          {/* Subtitle / Edition Badge */}
          <div className="flex items-center justify-center gap-4 text-brand-gold text-xs font-sans uppercase tracking-[0.35em] mb-6 font-semibold">
            <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-brand-gold/50" />
            <span>Lancement Officiel</span>
            <span className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-brand-gold/50" />
          </div>

          {/* Majestic display typography precisely structured */}
          <h1 className="font-display font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-brand-ivory tracking-wide leading-[1.05] mb-8 antialiased">
            Miss Nationale <span className="font-display italic font-normal text-transparent bg-clip-text bg-gradient-to-b from-white via-brand-gold to-brand-gold-dark block sm:inline mt-2 sm:mt-0">DRC 2026</span>
          </h1>

          {/* Custom fine line gold decor */}
          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent mx-auto mb-8" />

          {/* Core National Vision block */}
          <p className="font-sans text-[#e2dfeb] text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl text-center mb-10 antialiased drop-shadow-md">
            Révéler la grandeur, porter la RDC au sommet du monde.
          </p>

          {/* Direct CTA Nav Actions matching the design layout */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            
            <button
              onClick={() => scrollToSection("reglement")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-b from-brand-gold via-[#e5b54c] to-brand-gold-dark text-black font-sans font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-[0_4px_25px_rgba(242,195,91,0.25)] hover:shadow-[0_4px_35px_rgba(242,195,91,0.35)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <ShieldCheck className="w-4.5 h-4.5 text-black stroke-[1.8]" />
              <span>Règlement</span>
            </button>

            <button
              onClick={() => scrollToSection("programme")}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-brand-gold/30 hover:border-brand-gold/60 bg-black/45 hover:bg-black/75 text-brand-ivory font-sans font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4.5 h-4.5 text-brand-gold" />
              <span>Programme</span>
            </button>

          </div>

          {/* Guided scrolling vector arrow */}
          <div 
            onClick={() => scrollToSection("message-officiel")}
            className="mt-16 sm:mt-24 cursor-pointer hover:text-brand-gold transition-colors flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-sans tracking-[0.2em] text-[#8c8899] uppercase select-none">Défiler</span>
            <ChevronDown className="w-5 h-5 text-brand-gold animate-bounce" />
          </div>

        </div>
      </div>


      {/* SECTION 2: MESSAGE OFFICIEL (WHITE / CREAM BACKDROP) */}
      <div id="message-officiel" className="bg-[#FAF8F5] text-neutral-900 py-24 px-4 sm:px-6 lg:px-8 border-b border-[#EEEAE0]">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-xs font-sans font-bold text-brand-gold-dark tracking-[0.25em] uppercase block mb-3">
              — Message Officiel —
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-tight">
              Lancement de <span className="font-display italic font-normal text-brand-gold-dark">Miss Nationale DRC</span>
            </h2>
            <div className="w-16 h-[1.5px] bg-brand-gold-dark/40 mx-auto mt-6" />
          </div>

          <div className="font-sans text-neutral-800 text-sm sm:text-base leading-relaxed space-y-6 max-w-3xl mx-auto text-justify">
            <p className="font-bold text-lg text-neutral-950 text-center sm:text-left">
              Distingués invités, Partenaires, médias, et chers compatriotes,
            </p>
            <p>
              C’est avec un immense honneur et une grande fierté que nous procédons aujourd’hui au lancement officiel de <strong>MISS NATIONALE DRC</strong>. Ce projet est né d’une vision claire : celle de révéler la richesse, la beauté, l’intelligence et le potentiel extraordinaire de la femme congolaise.
            </p>
            <p>
              <strong>MISS NATIONALE DRC</strong> n’est pas simplement un concours de beauté. C’est une plateforme d’opportunités, un espace de formation, un tremplin vers l’excellence et l’international. À travers cette initiative, nous voulons détecter les talents cachés, encadrer les jeunes femmes ambitieuses, et leur offrir les outils nécessaires pour de venir des leaders, des modèles et des ambassadrices de notre pays.
            </p>
            <p>
              Notre ambition est grande : positionner la République Démocratique du Congo sur la scène internationale à travers des représentantes fortes, préparées et inspirantes. Chaque année, nous couronnerons plusieurs lauréates qui auront l’honneur de représenter notre pays dans différents concours internationaux prestigieux.
            </p>
            <p>
              C’est une nouvelle ère qui commence. Une ère où la femme congolaise prend sa place, s’affirme et rayonne au-delà des frontières. Nous appelons aujourd’hui les partenaires, les institutions et toutes les forces vives de la nation à nous accompagner dans cette aventure.
            </p>
            <p className="font-medium text-[#876531] text-base text-center pt-2">
              Ensemble, bâtissons une plateforme forte. Ensemble, révélons la grandeur de notre nation.
            </p>
          </div>

        </div>
      </div>


      {/* SECTION 3: CADRE OFFICIEL / REGLEMENT OFFICIEL (DARK GOLD BLACK GRID) */}
      <div id="reglement" className="bg-[#110f14] text-brand-ivory py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-gold/15 relative">
        <div className="absolute inset-0 bg-radial-gradient from-brand-gold/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-sans text-brand-gold uppercase tracking-[0.25em] block mb-3 font-semibold">
              — CADRE OFFICIEL —
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-ivory tracking-normal leading-tight">
              Règlement <span className="font-display italic text-[#E5B54C]">Officiel</span>
            </h2>
            <div className="w-16 h-[1.5px] bg-brand-gold/40 mx-auto my-6" />
            <p className="font-sans text-[#CAC2B5] text-sm sm:text-base font-light leading-relaxed">
              Les conditions et critères de participation à Miss Nationale DRC 2026.
            </p>
          </div>

          {/* Six detailed blocks matching exactly the official document rules */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Conditions de participation */}
            <div className="bg-black/45 border border-brand-gold/15 hover:border-brand-gold/30 p-7 rounded-2xl transition duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <UserCheck className="w-5 h-5 stroke-[1.2]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-brand-gold uppercase">Règle 01</span>
                </div>
                <h3 className="font-sans font-bold text-brand-ivory text-base mb-4 border-b border-brand-gold/10 pb-2">
                  1. Conditions de participation
                </h3>
                <ul className="space-y-3 font-sans text-xs text-[#b8b3ab] leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Être de nationalité congolaise</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Être âgée de 18 à 30 ans</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Être célibataire (sans enfant, selon critères du concours)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Avoir une bonne moralité</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Être disponible pour toutes les activités du programme</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 2: Critères de sélection */}
            <div className="bg-black/45 border border-brand-gold/15 hover:border-brand-gold/30 p-7 rounded-2xl transition duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <Sparkles className="w-5 h-5 stroke-[1.2]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-brand-gold uppercase">Règle 02</span>
                </div>
                <h3 className="font-sans font-bold text-brand-ivory text-base mb-4 border-b border-brand-gold/10 pb-2">
                  2. Critères de sélection
                </h3>
                <ul className="space-y-3 font-sans text-xs text-[#b8b3ab] leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Présentation générale (élégance, prestance)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Expression orale et communication</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Intelligence et culture générale</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Projet social</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Engagement et personnalité</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 3: Jury & Discipline */}
            <div className="bg-black/45 border border-brand-gold/15 hover:border-brand-gold/30 p-7 rounded-2xl transition duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <Users className="w-5 h-5 stroke-[1.2]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-brand-gold uppercase">Règle 03</span>
                </div>
                <h3 className="font-sans font-bold text-brand-ivory text-base mb-4 border-b border-brand-gold/10 pb-2">
                  3. Jury & Discipline
                </h3>
                <ul className="space-y-3 font-sans text-xs text-[#b8b3ab] leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Jury composé de professionnels (mode, communication, entrepreneuriat, culture)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Décisions finales et sans appel</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Tout comportement contraire à l'éthique peut entraîner disqualification</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 4: Titres & Récompenses */}
            <div className="bg-black/45 border border-brand-gold/15 hover:border-brand-gold/30 p-7 rounded-2xl transition duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <Trophy className="w-5 h-5 stroke-[1.2]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-brand-gold uppercase">Règle 04</span>
                </div>
                <h3 className="font-sans font-bold text-brand-ivory text-base mb-4 border-b border-brand-gold/10 pb-2">
                  4. Titres & Récompenses
                </h3>
                <ul className="space-y-3 font-sans text-xs text-[#b8b3ab] leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>MISS NATIONALE DRC (titre principal)</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Plusieurs dauphines et titres spéciaux</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Attribution de concours internationaux</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 5: Engagements des lauréates */}
            <div className="bg-black/45 border border-brand-gold/15 hover:border-brand-gold/30 p-7 rounded-2xl transition duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <Award className="w-5 h-5 stroke-[1.2]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-brand-gold uppercase">Règle 05</span>
                </div>
                <h3 className="font-sans font-bold text-brand-ivory text-base mb-4 border-b border-brand-gold/10 pb-2">
                  5. Engagements des lauréates
                </h3>
                <ul className="space-y-3 font-sans text-xs text-[#b8b3ab] leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Représenter dignement la RDC</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Participer aux activités officielles</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Respecter les valeurs du concours</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Porter un projet social</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 6: Droits d'image & Modifications */}
            <div className="bg-black/45 border border-brand-gold/15 hover:border-brand-gold/30 p-7 rounded-2xl transition duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <Image className="w-5 h-5 stroke-[1.2]" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-brand-gold uppercase">Règle 06</span>
                </div>
                <h3 className="font-sans font-bold text-brand-ivory text-base mb-4 border-b border-brand-gold/10 pb-2">
                  6. Droits d'image & Mo.
                </h3>
                <ul className="space-y-3 font-sans text-xs text-[#b8b3ab] leading-relaxed">
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>Les candidates autorisent l’utilisation de leur image à des fins promotionnelles</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-gold mt-0.5">•</span>
                    <span>L’organisation se réserve le droit de modifier le règlement si nécessaire</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* Important alert section warning */}
          <div className="bg-[#1C1611]/90 border border-brand-gold/20 rounded-xl p-5 mt-12 max-w-4xl mx-auto flex gap-4 items-start shadow-md">
            <AlertTriangle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <div className="font-sans text-xs text-[#bdaf97] leading-relaxed">
              <strong className="text-[#E5B54C] block mb-1">Rappel Éthique Sévère :</strong>
              Les décisions du comité de sélection, du jury et du Comité d’Organisation de Miss Nationale DRC sont souveraines, définitives et irrévocables. Toute fraude entraîne le retrait immédiat de la candidate.
            </div>
          </div>

        </div>
      </div>


      {/* SECTION 4: PROGRAMME OFFICIEL 2026 (DARK/BLACK SECTION WITH GRID CHRONOLOGY) */}
      <div id="programme" className="bg-[#0c0a0e] text-brand-ivory py-24 px-4 sm:px-6 lg:px-8 border-b border-brand-gold/10">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-sans text-brand-gold uppercase tracking-[0.25em] block mb-3 font-semibold">
              — PREMIÈRE ÉDITION —
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-6xl text-brand-ivory tracking-tight leading-tight">
              Programme <span className="font-display italic text-[#E5B54C]">Officiel 2026</span>
            </h2>
            <div className="w-16 h-[1.5px] bg-brand-gold/40 mx-auto my-5" />
            <p className="font-sans text-[#b8b5c4] text-sm leading-relaxed max-w-md mx-auto">
              Un parcours structuré et innovant pour révéler les talents congolais
            </p>
          </div>

          {/* Majestic Timeline grid covering 10 chronological phases */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {[
              {
                num: "1",
                title: "Recrutement",
                desc: "Ouverture des candidatures à l’échelle nationale et internationale.",
                badge: "10 AVRIL - 27 MAI"
              },
              {
                num: "2",
                title: "Casting en ligne",
                desc: "Le public vote → Top 5 par province + Top 5 diaspora.",
                badge: "VOTES PUBLICS"
              },
              {
                num: "3",
                title: "Projets (vidéo 1min30)",
                desc: "Vote public (65%) + Jury (35%) → Top 3 par province et diaspora.",
                badge: "ÉVALUATION"
              },
              {
                num: "4",
                title: "Annonce & Casting physique",
                desc: "Candidates retenues invitées à Kinshasa pour évaluation finale.",
                badge: "KINSHASA"
              },
              {
                num: "5",
                title: "Sélection nationale",
                desc: "27 candidates officielles (1 par province + 1 diaspora).",
                badge: "TOP 27"
              },
              {
                num: "6",
                title: "Soirée de présentation",
                desc: "Lancement des votes nationaux.",
                badge: "GALA"
              },
              {
                num: "7",
                title: "Bootcamp & Activités",
                desc: "Formations, défis, challenges, activités sociales, coaching, shooting.",
                badge: "IMMERSION"
              },
              {
                num: "8",
                title: "Top 18 & Top 15",
                desc: "Annonce progressive des finalistes.",
                badge: "SÉLECTION"
              },
              {
                num: "9",
                title: "Immersion au Manoir",
                desc: "4 jours de préparation intensive, répétitions, coaching final.",
                badge: "FINALISTES"
              },
              {
                num: "10",
                title: "GRANDE FINALE",
                desc: "20 Août 2026 – Défilés, discours, couronnement.",
                badge: "COURONNEMENT"
              }
            ].map((step, idx) => {
              return (
                <div 
                  key={idx}
                  className="bg-neutral-900/50 border border-brand-gold/10 hover:border-brand-gold/30 p-6 rounded-2xl transition duration-300 flex flex-col justify-between h-full relative"
                >
                  {/* Phase number */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-brand-gold/15 flex items-center justify-center font-display font-bold text-brand-gold text-xs bg-black/40">
                    {step.num}
                  </div>

                  <div>
                    <div className="mb-4">
                      {idx === 9 ? (
                        <Crown className="w-8 h-8 text-brand-gold mb-3 stroke-[1.2]" />
                      ) : (
                        <Calendar className="w-6 h-6 text-[#9e978b] mb-3 stroke-[1.2]" />
                      )}
                      
                      <h3 className="font-sans font-bold text-brand-ivory text-base mb-1 pr-6 leading-tight">
                        {step.title}
                      </h3>
                    </div>
                    <p className="font-sans text-xs text-[#a9a4b3] leading-relaxed mb-4">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-2">
                    <span className="inline-block bg-[#1f1a14] border border-brand-gold/25 text-[#f2c35b] font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded">
                      {step.badge}
                    </span>
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </div>


      {/* SECTION 5: RECOMPENSES & TITRES (LIGHT SURFACES) */}
      <div id="recompenses" className="bg-[#FAF8F5] text-neutral-900 py-24 px-4 sm:px-6 lg:px-8 border-b border-[#EEEAE0]">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-sans text-brand-gold-dark tracking-widest uppercase block mb-3 font-semibold">
              — CE QUI VOUS ATTEND —
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-tight">
              Récompenses <span className="font-display italic font-normal text-brand-gold-dark">& Titres</span>
            </h2>
            <div className="w-16 h-[1.5px] bg-brand-gold-dark/40 mx-auto my-5" />
            <p className="font-sans text-neutral-600 text-sm md:text-base font-light leading-relaxed">
              La gagnante et ses dauphines deviennent ambassadrices officielles de la RDC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch mb-16">
            
            {/* Card 1: Miss Nationale DRC 2026 */}
            <div className="bg-[#110f14] text-white border-2 border-brand-gold rounded-2xl p-8 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-brand-gold text-black uppercase font-sans font-bold text-[9px] tracking-widest px-3 py-1 rounded">
                Gagnante Couronnée
              </div>

              <div>
                <div className="flex gap-4 items-center mb-6">
                  <div className="w-12 h-12 bg-brand-gold/10 border border-brand-gold/35 rounded-xl flex items-center justify-center text-brand-gold shrink-0">
                    <Crown className="w-6 h-6 stroke-[1.2]" />
                  </div>
                  <div>
                    <h3 className="font-sans font-extrabold text-brand-ivory text-base tracking-wider uppercase">
                      MISS NATIONALE DRC 2026
                    </h3>
                    <p className="font-mono text-[10px] text-brand-gold uppercase tracking-widest font-semibold mt-0.5">
                      GRANDE GAGNANTE
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-neutral-800 w-full mb-6" />

                <ul className="space-y-4 font-sans text-[#dad4cc] text-xs sm:text-sm">
                  {[
                    "Représentation internationale (concours majeur)",
                    "Une voiture (marque IST)",
                    "Cadeaux exclusifs",
                    "Contrats publicitaires",
                    "Opportunités professionnelles"
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <Check className="w-4.5 h-4.5 text-brand-gold shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card 2: Les 5 Dauphines */}
            <div className="bg-[#110f14] text-white border border-brand-gold/15 rounded-2xl p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex gap-4 items-center mb-6">
                  <div className="w-12 h-12 bg-neutral-800 border border-brand-gold/15 rounded-xl flex items-center justify-center text-neutral-300 shrink-0">
                    <Award className="w-6 h-6 stroke-[1.2]" />
                  </div>
                  <div>
                    <h3 className="font-sans font-extrabold text-brand-ivory text-base tracking-wider uppercase">
                      Les 5 Dauphines
                    </h3>
                    <p className="font-mono text-[10px] text-brand-gold uppercase tracking-widest font-semibold mt-0.5">
                      AMBASSADRICES
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-neutral-800 w-full mb-6" />

                <div className="space-y-4 font-sans text-[#dad4cc] text-xs sm:text-sm leading-relaxed">
                  <p>
                    Chaque dauphine représentera la RDC dans un concours international, portera le titre correspondant et sera couronnée officiellement.
                  </p>
                  <p className="text-brand-gold text-xs font-semibold">
                    MISS NATIONALE DRC garantit une participation internationale à toutes les lauréates principales.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Centered inscription registration button */}
          <div className="text-center">
            <button
              onClick={handleOpenRegister}
              className="px-12 py-5 rounded-xl bg-gradient-to-b from-brand-gold via-[#e5b54c] to-brand-gold-dark text-black font-sans font-bold text-xs uppercase tracking-[0.2em] hover:brightness-110 shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3 cursor-pointer"
            >
              <FileText className="w-4.5 h-4.5 text-black stroke-[1.8]" />
              <span>Je m'inscris</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
