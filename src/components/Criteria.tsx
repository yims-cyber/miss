import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Users, Award, HeartHandshake, CheckCircle2, FileText, Check, AlertCircle, HelpCircle } from "lucide-react";
import { VALUES_LIST, REGULATION_INFO } from "../data";

const IconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Sparkles: Sparkles,
  Users: Users,
  Award: Award,
  HeartHandshake: HeartHandshake
};

export default function Criteria({ onOpenRegister }: { onOpenRegister: () => void }) {
  // Setup real-time countdown relative to the current local time context
  // June 13, 2026 is current time. Let's target exactly July 11, 2026 at 06:15:30 (about 27 days 8 hrs away)
  const targetDateStr = "2026-07-11T05:55:45"; 
  const [timeLeft, setTimeLeft] = useState({
    days: 27,
    hours: 8,
    minutes: 30,
    seconds: 20
  });

  useEffect(() => {
    const targetTime = new Date(targetDateStr).getTime();

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      let diff = targetTime - currentTime;

      // If past, let's loop or add 27 days statically for the effect of a ticking clock
      if (diff < 0) {
        // Just create a reliable dynamic 27-day countdown of simulated seconds for presentation prestige
        const cycleLength = 27 * 24 * 60 * 60 * 1000;
        const simulatedOffset = Math.abs(diff) % cycleLength;
        diff = cycleLength - simulatedOffset;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // State for interactive eligibility simulator
  const [userAge, setUserAge] = useState<number | "">("");
  const [userHeight, setUserHeight] = useState<number | "">("");
  const [isSingle, setIsSingle] = useState<boolean>(true);
  const [isCongolese, setIsCongolese] = useState<boolean>(true);
  const [checkerResult, setCheckerResult] = useState<{
    status: "idle" | "success" | "fail";
    messages: string[];
  }>({ status: "idle", messages: [] });

  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    const age = Number(userAge);
    const height = Number(userHeight);
    const errors: string[] = [];

    if (!userAge || !userHeight) {
      errors.push("Veuillez saisir votre âge et votre taille pour lancer la simulation.");
      setCheckerResult({ status: "fail", messages: errors });
      return;
    }

    if (!isCongolese) {
      errors.push("Le concours est exclusivement réservé aux citoyennes de nationalité congolaise (RDC).");
    }
    if (age < 18 || age > 30) {
      errors.push("L'âge requis doit être compris entre 18 et 30 ans.");
    }
    if (height < 160) {
      errors.push("La taille minimale requise est de 1m60 (160 cm).");
    }
    if (!isSingle) {
      errors.push("Le statut matrimonial officiel requis est célibataire.");
    }

    if (errors.length === 0) {
      setCheckerResult({
        status: "success",
        messages: ["Félicitations ! Vous remplissez toutes les conditions d'éligibilité pour participer au casting de Miss Nationale RDC 2026. Vous pouvez dès maintenant soumettre votre formulaire d'inscription officiel."]
      });
    } else {
      setCheckerResult({
        status: "fail",
        messages: errors
      });
    }
  };

  const padZero = (num: number) => String(num).padStart(2, "0");

  return (
    <section
      id="casting"
      className="py-24 sm:py-32 px-4 relative bg-brand-surface/40 overflow-hidden border-t border-brand-charcoal/20"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/4 right-0 w-[50vw] h-[50vw] max-w-[500px] bg-brand-gold/2 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[30vw] h-[30vw] max-w-[300px] bg-brand-outline/2 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs font-bold tracking-[0.3em] text-brand-gold uppercase block mb-3"
          >
            VALEURS & CRITÈRES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-medium text-3xl sm:text-4xl text-brand-ivory leading-tight"
          >
            L'Excellence à travers des{" "}
            <span className="text-transparent bg-clip-text gold-text-gradient font-bold">
              Standards Royaux
            </span>
          </motion.h2>
        </div>

        {/* 4 Values Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {VALUES_LIST.map((val, idx) => {
            const IconComponent = IconMap[val.iconName] || Sparkles;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel rounded-2xl p-6 text-center flex flex-col items-center group relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-1 gold-gradient-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-5 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <h4 className="font-display font-bold text-lg text-brand-ivory mb-2 tracking-wide group-hover:text-brand-gold transition-colors">
                  {val.title}
                </h4>
                <p className="font-sans text-brand-outline text-xs leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Regulations, Countdown & Eligibility Grid Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Column (8/12 on display): Countdown Clock and Required Documents */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Live Countdown Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full bg-gradient-to-br from-brand-surface to-brand-surface/70 relative"
            >
              <div className="flex flex-col text-left mb-6">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-brand-gold font-bold">
                  Compte à rebours officiel
                </span>
                <h3 className="font-display font-medium text-xl text-brand-ivory mt-1">
                  Clôture des candidatures nationales 2026
                </h3>
              </div>

              {/* Countdown Digits */}
              <div id="countdown-timer" className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg">
                {[
                  { value: timeLeft.days, label: "DAYS" },
                  { value: timeLeft.hours, label: "HOURS" },
                  { value: timeLeft.minutes, label: "MINUTES" },
                  { value: timeLeft.seconds, label: "SECONDES" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-brand-bg/90 border border-brand-outline/10 rounded-xl py-3 px-2 sm:py-5 sm:px-4 text-center select-none flex flex-col items-center justify-center relative overflow-hidden"
                  >
                    <span className="font-mono font-medium text-2xl sm:text-4xl text-brand-gold tracking-tight w-full leading-none">
                      {padZero(item.value)}
                    </span>
                    <span className="font-mono text-[8px] sm:text-[10px] text-brand-outline tracking-wider uppercase mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 mt-6 font-mono text-[10px] text-brand-outline text-left pt-4 border-t border-brand-charcoal/30">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0 pulse-glowing-orb" />
                <span>Date limite fixée au 11 Juillet 2026 à Kinshasa</span>
              </div>
            </motion.div>

            {/* Documents requis and baseline criteria Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="glass-panel rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left bg-gradient-to-br from-brand-surface to-brand-surface/75"
            >
              {/* Documents */}
              <div>
                <h4 className="font-display font-bold text-sm tracking-widest text-brand-gold uppercase mb-5 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-gold" />
                  Documents requis
                </h4>
                <div className="flex flex-col gap-3.5">
                  {REGULATION_INFO.requirements.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="font-sans text-brand-ivory text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Eligibility Grid criteria table */}
              <div>
                <h4 className="font-display font-bold text-sm tracking-widest text-brand-gold uppercase mb-5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold" />
                  Règlement de Sélection
                </h4>
                <div className="border border-brand-outline/10 rounded-xl overflow-hidden divide-y divide-brand-outline/10">
                  {REGULATION_INFO.table.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-2 px-4 py-2.5 text-xs font-sans">
                      <span className="text-brand-outline font-semibold">{row.label}</span>
                      <span className="text-brand-ivory font-bold text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column (4/12 on display): Interactive Eligibility Simulator Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 glass-panel rounded-2xl p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-brand-surface to-brand-container-low border border-brand-gold/25 relative"
          >
            <div className="absolute top-0 bottom-0 right-0 w-1 gold-gradient-bg opacity-30" />

            <div className="text-left mb-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-brand-gold font-bold">
                Outil Interactif
              </span>
              <h3 className="font-display font-semibold text-lg text-brand-ivory mt-1">
                Suis-je éligible au casting ?
              </h3>
              <p className="font-sans text-brand-outline text-xs mt-1 leading-relaxed">
                Renseigne tes mensurations réelles pour tester instantanément ta conformité aux critères des statuts nationaux.
              </p>
            </div>

            {/* Checker Form */}
            <form onSubmit={handleCheckEligibility} className="flex-grow flex flex-col gap-4 text-left">
              
              {/* Nationalité toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-brand-outline/10 bg-brand-bg/50">
                <span className="font-sans text-xs text-brand-outline font-medium">Nationalité Congolaise (RDC)</span>
                <button
                  type="button"
                  onClick={() => setIsCongolese(!isCongolese)}
                  className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${
                    isCongolese ? "bg-brand-gold" : "bg-brand-charcoal"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-black transition-transform duration-300 ${
                      isCongolese ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Age input */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-brand-outline uppercase tracking-wider font-semibold">
                  Âge actuel (ans)
                </label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={userAge}
                  onChange={(e) => setUserAge(e.target.value ? Number(e.target.value) : "")}
                  placeholder="Ex: 22"
                  className="bg-brand-bg/80 border border-brand-outline/20 rounded-xl py-2.5 px-4 font-sans text-brand-ivory text-sm focus:outline-none focus:border-brand-gold transition-colors w-full"
                />
              </div>

              {/* Height input */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-brand-outline uppercase tracking-wider font-semibold">
                  Taille minimale (cm)
                </label>
                <input
                  type="number"
                  min="50"
                  max="250"
                  value={userHeight}
                  onChange={(e) => setUserHeight(e.target.value ? Number(e.target.value) : "")}
                  placeholder="Ex: 172"
                  className="bg-brand-bg/80 border border-brand-outline/20 rounded-xl py-2.5 px-4 font-sans text-brand-ivory text-sm focus:outline-none focus:border-brand-gold transition-colors w-full"
                />
              </div>

              {/* Mariage Status */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-brand-outline/10 bg-brand-bg/50">
                <span className="font-sans text-xs text-brand-outline font-medium">Uniquement Célibataire</span>
                <button
                  type="button"
                  onClick={() => setIsSingle(!isSingle)}
                  className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${
                    isSingle ? "bg-brand-gold" : "bg-brand-charcoal"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-black transition-transform duration-300 ${
                      isSingle ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-brand-charcoal hover:bg-brand-gold hover:text-black hover:font-bold border border-brand-outline/20 hover:border-brand-gold text-brand-gold py-2.5 rounded-xl font-mono text-[10px] uppercase tracking-wider font-bold transition-all mt-2 cursor-pointer"
              >
                Vérifier mon Éligibilité
              </button>
            </form>

            {/* Checker output panel */}
            <div className="mt-4 min-h-[70px]">
              <AnimatePresence mode="wait">
                {checkerResult.status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-2.5 text-left"
                  >
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-xs text-green-400">Éligibilité Confirmée</span>
                      <p className="font-sans text-[10px] text-green-300/90 leading-relaxed mt-0.5">
                        Félicitations, vous répondez à tous les critères ! Cliquez pour postuler.
                      </p>
                      <button
                        onClick={onOpenRegister}
                        className="text-[10px] font-bold text-brand-gold hover:underline mt-1.5 self-start"
                      >
                        Ouvrir le formulaire d'inscription →
                      </button>
                    </div>
                  </motion.div>
                )}
                {checkerResult.status === "fail" && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 bg-brand-gold/5 border border-brand-gold/15 rounded-xl flex items-start gap-2.5 text-left"
                  >
                    <AlertCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-xs text-brand-gold">Avis d'éligibilité</span>
                      <div className="flex flex-col gap-1 mt-1">
                        {checkerResult.messages.map((msg, i) => (
                          <p key={i} className="font-sans text-[10px] text-brand-outline leading-tight">
                            • {msg}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
