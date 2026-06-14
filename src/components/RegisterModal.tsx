import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Award, CheckCircle2, AlertTriangle, Sparkles, FileText, Smartphone, Mail, Compass } from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  // Form State fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [isSingle, setIsSingle] = useState(true);
  const [isCongolese, setIsCongolese] = useState(true);
  const [motivation, setMotivation] = useState("");

  // Submision state
  const [step, setStep] = useState<"form" | "success">("form");
  const [applicationId, setApplicationId] = useState("");
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform criteria pre-qualification check
    const warnings: string[] = [];
    if (!isCongolese) warnings.push("Nationalité congolaise obligatoire");
    if (Number(age) < 18 || Number(age) > 30) warnings.push("Âge réglementaire (18-30 ans)");
    if (Number(height) < 160) warnings.push("Taille réglementaire minimale (1m60)");
    if (!isSingle) warnings.push("Statut civil célibataire obligatoire");

    if (warnings.length > 0) {
      setValidationWarnings(warnings);
      // We can let them see the warnings. In high-fashion, they must qualify. Let's show warning model modal state
      return;
    }

    // Generate random Application ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setApplicationId(`DRC-2026-${randomNum}`);
    setStep("success");
    setValidationWarnings([]);
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setProvince("");
    setAge("");
    setHeight("");
    setIsSingle(true);
    setIsCongolese(true);
    setMotivation("");
    setStep("form");
    setValidationWarnings([]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Glass background blur backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl glass-panel text-brand-ivory rounded-2xl p-6 sm:p-10 overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Elegant top border accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 gold-gradient-bg" />

            {/* Close buttons */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-brand-outline hover:text-brand-gold transition-colors p-1"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {step === "form" ? (
              /* APPLICATION FORM LEVEL */
              <div className="text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-brand-gold" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-brand-gold font-bold">
                    Candidature Officielle
                  </span>
                </div>
                <h2 className="font-display font-medium text-2xl sm:text-3xl text-brand-ivory mb-2">
                  Formulaire d'Inscription
                </h2>
                <p className="font-sans text-brand-outline text-xs leading-relaxed mb-6 border-b border-brand-charcoal/30 pb-4">
                  Remplissez votre dossier numérique de candidature. Le comité de pré-sélection Miss Nationale examinera vos données sous 48 heures.
                </p>

                {/* Validation Warnings Panel */}
                {validationWarnings.length > 0 && (
                  <div className="p-4 bg-brand-gold/10 border border-brand-gold/30 rounded-xl flex gap-3 mb-6 items-start">
                    <AlertTriangle className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-display font-bold text-xs text-brand-gold">
                        Critères d'Admission Non Remplis
                      </span>
                      <p className="font-sans text-[11px] text-brand-outline leading-tight mt-1">
                        Pour soumettre votre dossier officiel, vous devez être de nationalité Congolaise, célibataire, âgée de 18 à 30 ans et mesurer au moins 1m60. Corrigez vos données :
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {validationWarnings.map((warn, wIdx) => (
                          <span key={wIdx} className="bg-brand-surface border border-brand-gold/25 text-brand-gold text-[9px] font-mono py-0.5 px-2 rounded-full font-bold">
                            ⚠️ {warn}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
                  
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-mono text-[9px] text-brand-outline uppercase tracking-wider font-semibold">
                      Nom complet (Prénoms & Nom)
                    </label>
                    <input
                      type="text"
                      className="bg-brand-bg/85 border border-brand-outline/20 rounded-xl py-2.5 px-4 text-xs sm:text-sm text-brand-ivory focus:outline-none focus:border-brand-gold transition-colors w-full"
                      placeholder="Ex: Daniella Masengo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Email & Phone fields */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] text-brand-outline uppercase tracking-wider font-semibold">
                      Adresse E-mail
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-outline/50" />
                      <input
                        type="email"
                        className="bg-brand-bg/85 border border-brand-outline/20 rounded-xl py-2.5 pl-11 pr-4 text-xs sm:text-sm text-brand-ivory focus:outline-none focus:border-brand-gold transition-colors w-full"
                        placeholder="nom@exemple.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] text-brand-outline uppercase tracking-wider font-semibold">
                      Téléphone Contact (+243)
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-outline/50" />
                      <input
                        type="tel"
                        className="bg-brand-bg/85 border border-brand-outline/20 rounded-xl py-2.5 pl-11 pr-4 text-xs sm:text-sm text-brand-ivory focus:outline-none focus:border-brand-gold transition-colors w-full"
                        placeholder="Ex: +243 978 889 953"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Age & Height */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] text-brand-outline uppercase tracking-wider font-semibold">
                      Âge (18 - 30 ans)
                    </label>
                    <input
                      type="number"
                      className="bg-brand-bg/85 border border-brand-outline/20 rounded-xl py-2.5 px-4 text-xs sm:text-sm text-brand-ivory focus:outline-none focus:border-brand-gold transition-colors w-full"
                      placeholder="Ex: 22"
                      value={age}
                      onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] text-brand-outline uppercase tracking-wider font-semibold">
                      Votre Taille (cm) - Requis: 1m60+
                    </label>
                    <input
                      type="number"
                      className="bg-brand-bg/85 border border-brand-outline/20 rounded-xl py-2.5 px-4 text-xs sm:text-sm text-brand-ivory focus:outline-none focus:border-brand-gold transition-colors w-full"
                      placeholder="Ex: 174"
                      value={height}
                      onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : "")}
                      required
                    />
                  </div>

                  {/* Province Selection */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] text-brand-outline uppercase tracking-wider font-semibold">
                      Province représentée
                    </label>
                    <div className="relative">
                      <Compass className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-outline/50" />
                      <select
                        className="bg-brand-bg/85 appearance-none border border-brand-outline/20 rounded-xl py-2.5 pl-11 pr-8 text-xs sm:text-sm text-brand-ivory focus:outline-none focus:border-brand-gold transition-colors w-full"
                        value={province}
                        onChange={(e) => setProvince(e.target.value)}
                        required
                      >
                        <option value="">Sélectionnez votre province</option>
                        <option value="Kinshasa">Kinshasa</option>
                        <option value="Haut-Katanga">Haut-Katanga</option>
                        <option value="Kongo-Central">Kongo-Central</option>
                        <option value="Nord-Kivu">Nord-Kivu</option>
                        <option value="Lualaba">Lualaba</option>
                        <option value="Sud-Kivu">Sud-Kivu</option>
                        <option value="Tshopo">Tshopo</option>
                        <option value="Ituri">Ituri</option>
                        <option value="Kasaï-Oriental">Kasaï-Oriental</option>
                        <option value="Kasaï">Kasaï</option>
                        <option value="Équateur">Équateur</option>
                      </select>
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="flex flex-col gap-3 justify-center">
                    <div className="flex items-center justify-between p-2 hover:bg-brand-charcoal/20 rounded-lg">
                      <span className="text-xs text-brand-outline">Nationalité Congolaise (RDC)</span>
                      <button
                        type="button"
                        onClick={() => setIsCongolese(!isCongolese)}
                        className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-300 ${isCongolese ? "bg-brand-gold":"bg-brand-charcoal"}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-black transition-transform duration-300 ${isCongolese ? "translate-x-4.5":""}`} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-2 hover:bg-brand-charcoal/20 rounded-lg">
                      <span className="text-xs text-brand-outline">Statut célibataire</span>
                      <button
                        type="button"
                        onClick={() => setIsSingle(!isSingle)}
                        className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-300 ${isSingle ? "bg-brand-gold":"bg-brand-charcoal"}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-black transition-transform duration-300 ${isSingle ? "translate-x-4.5":""}`} />
                      </button>
                    </div>
                  </div>

                  {/* Motivation */}
                  <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="font-mono text-[9px] text-brand-outline uppercase tracking-wider font-semibold">
                      Motivation (Pourquoi souhaitez-vous devenir Miss ?)
                    </label>
                    <textarea
                      rows={3}
                      className="bg-brand-bg/85 border border-brand-outline/20 rounded-xl py-2.5 px-4 text-xs sm:text-sm text-brand-ivory focus:outline-none focus:border-brand-gold transition-colors w-full resize-none"
                      placeholder="Exprimez brièvement pourquoi vous portez l'excellence en vous..."
                      value={motivation}
                      onChange={(e) => setMotivation(e.target.value)}
                    />
                  </div>

                  {/* Form Submission Button */}
                  <div className="md:col-span-2 pt-4">
                    <button
                      type="submit"
                      className="w-full gold-gradient-bg text-black font-extrabold uppercase tracking-widest text-xs py-4 rounded-xl cursor-pointer hover:shadow-[0_0_20px_rgba(242,195,91,0.45)] transition-all"
                    >
                      Soumettre mon dossier d'inscription
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* SUCCESS CERTIFICATE VIEW */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 px-2 flex flex-col items-center gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="flex flex-col text-center">
                  <span className="font-mono text-[9px] text-brand-gold font-bold tracking-[0.4em] uppercase">
                    ADMISSION PRÉ-VALIDÉE
                  </span>
                  <h2 className="font-display font-medium text-2xl sm:text-3xl text-brand-ivory mt-1">
                    Candidature Enregistrée !
                  </h2>
                </div>

                {/* Simulated luxury certificate receipt block */}
                <div className="border border-brand-gold/25 bg-brand-surface/70 w-full p-6 rounded-2xl relative text-left select-text mt-2 max-w-md mx-auto">
                  <div className="absolute top-0 bottom-0 left-0 w-1 gold-gradient-bg" />
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center border-b border-brand-charcoal/40 pb-3">
                      <span className="font-mono text-[9px] text-brand-outline">DOSSIER N°</span>
                      <span className="font-mono text-sm text-brand-gold font-black">{applicationId}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                      <div>
                        <span className="text-brand-outline block">Candidate</span>
                        <span className="text-brand-ivory font-bold">{fullName}</span>
                      </div>
                      <div>
                        <span className="text-brand-outline block">Province</span>
                        <span className="text-brand-ivory font-bold">{province}</span>
                      </div>
                      <div>
                        <span className="text-brand-outline block">Mensuration</span>
                        <span className="text-brand-ivory font-bold">{height} cm ({Math.round(height * 0.3937 * 10) / 10} in)</span>
                      </div>
                      <div>
                        <span className="text-brand-outline block">Vérification</span>
                        <span className="text-green-400 font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Éligible
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Instructions statement */}
                <div className="max-w-md text-center">
                  <p className="font-sans text-brand-outline text-xs sm:text-sm leading-relaxed">
                    Un représentant du Comité National de Miss Nationale DRC vous contactera d'ici <strong>48 heures</strong> sur votre numéro de téléphone (<strong>{phone}</strong>) afin de valider et planifier la séance de shooting d'admission provinciale à <strong>{province}</strong>.
                  </p>
                </div>

                {/* Re-simulation Trigger */}
                <button
                  onClick={handleReset}
                  className="font-mono text-[10px] text-brand-gold uppercase tracking-widest hover:underline mt-4 cursor-pointer"
                >
                  Simuler une autre inscription
                </button>
              </motion.div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
