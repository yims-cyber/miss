import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, Heart, Check, Users, Sparkles, Trophy, Search, 
  MapPin, X, Share2, Copy, QrCode, Eye, Star, Globe,
  MessageCircle, Send, CheckCircle2, Loader2, Download, FileText
} from "lucide-react";
import { jsPDF } from "jspdf";
import { CANDIDATES_LIST, REWARDS_INFO } from "../data";

// Rich extra details for each candidate matching the mockup's high-fidelity requirement
const CANDIDATE_DETAILS: Record<string, { city: string; provinceSubtitle: string; bio: string }> = {
  cand1: {
    city: "Gombe",
    provinceSubtitle: "Kinshasa",
    bio: "Daniella est une jeune femme déterminée, portant fièrement les valeurs de respect, de courage et d'excellence. Si elle est élue Miss, elle mettra sa voix au service de l'éducation des filles et de la promotion de l'alphabétisation numérique dans toutes les provinces de notre cher pays."
  },
  cand2: {
    city: "Ruashi",
    provinceSubtitle: "Haut-Katanga",
    bio: "Djenny croit profondément en la puissance du patrimoine culturel congolais comme levier de développement. Son ambition est de valoriser le savoir-faire de nos femmes artisanes locales et de parrainer des programmes d'autofinancement et de microcrédit pour les mères isolées."
  },
  cand3: {
    city: "Likasi",
    provinceSubtitle: "Haut-Katanga",
    bio: "Danena incarne avec grâce et dévouement le combat pour la santé publique. Elle souhaite orienter sa couronne vers des campagnes nationales de sensibilisation et milite pour un meilleur équipement des maternités de premier recours en zones rurales."
  },
  cand4: {
    city: "Bandalungwa",
    provinceSubtitle: "Kinshasa",
    bio: "Juanna aspire à être une ambassadrice engagée pour l'environnement. Passionnée par la biodiversité, elle portera un programme axé sur l'accès à l'eau potable collective et l'introduction d'énergies renouvelables simplifiées dans les écoles de la RDC."
  },
  cand5: {
    city: "Limete",
    provinceSubtitle: "Kinshasa",
    bio: "Barusa se consacre à l'autonomisation et à la réinsertion académique des jeunes filles en décrochage scolaire. Elle propose la création d'écoles d'art et d'ateliers professionnels pour valoriser les multiples talents créatifs de la jeunesse de Kinshasa."
  },
  cand6: {
    city: "N'djili",
    provinceSubtitle: "Kinshasa",
    bio: "Nana fait de l'accès à l'éducation sa priorité absolue. Elle s'engage à allouer de futures bourses d'études pour soutenir l'entrepreneuriat des jeunes femmes et promouvoir l'apprentissage professionnel agricole au niveau régional."
  }
};

const generateReceiptPDF = (
  candidateName: string, 
  candidateNumber: string, 
  votesLength: number, 
  operator: string, 
  phone: string, 
  currencyStr: string,
  txRef: string
) => {
  try {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a6"
    });

    const width = doc.internal.pageSize.getWidth();
    const margin = 10;
    
    // Outer border
    doc.setDrawColor(242, 195, 91);
    doc.setLineWidth(0.4);
    doc.rect(4, 4, width - 8, doc.internal.pageSize.getHeight() - 8);
    
    // Header section with dark background (taller to fit crown logo)
    doc.setFillColor(13, 12, 18);
    doc.rect(4, 4, width - 8, 24, "F");
    
    // Vector Golden Crown Logo
    const cx = width / 2;
    doc.setFillColor(242, 195, 91); // Luxury gold color
    
    // Draw beautiful vector queen's crown
    doc.triangle(cx, 7, cx - 1.8, 10.5, cx + 1.8, 10.5, "F");
    doc.triangle(cx - 3.2, 8, cx - 4, 10.5, cx - 1, 10.5, "F");
    doc.triangle(cx + 3.2, 8, cx + 4, 10.5, cx + 1, 10.5, "F");
    doc.rect(cx - 4.2, 10.7, 8.4, 0.7, "F");
    doc.circle(cx, 6.7, 0.35, "F");
    doc.circle(cx - 3.2, 7.7, 0.35, "F");
    doc.circle(cx + 3.2, 7.7, 0.35, "F");
    
    // Event heading
    doc.setTextColor(242, 195, 91);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("MISS NATIONALE RDC", width / 2, 16.2, { align: "center" });
    
    doc.setFontSize(5.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(210, 210, 210);
    doc.text("PLATEFORME OFFICIELLE DE SÉLECTION EN LIGNE", width / 2, 20, { align: "center" });
    
    // Separator line
    doc.setDrawColor(242, 195, 91);
    doc.setLineWidth(0.3);
    doc.line(4, 28, width - 4, 28);

    // Document Body
    doc.setTextColor(20, 20, 28);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("REÇU DE SÉCURITÉ DE VOTE", width / 2, 35, { align: "center" });
    
    // Info table divider
    doc.setDrawColor(225, 225, 225);
    doc.setLineWidth(0.15);
    doc.line(10, 39, width - 10, 39);
    
    // Helper to print label & value keypairs
    let y = 45;
    const rowGap = 6.2;
    const drawRow = (lbl: string, val: string, isBig = false, isGoldColor = false) => {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(90, 90, 100);
      doc.text(lbl, margin, y);
      
      doc.setFont("helvetica", isBig ? "bold" : "normal");
      doc.setFontSize(isBig ? 9 : 8.5);
      
      if (isGoldColor) {
        doc.setTextColor(212, 163, 89);
      } else {
        doc.setTextColor(15, 15, 20);
      }
      doc.text(val, width - margin, y, { align: "right" });
      y += rowGap;
    };

    const dateStr = new Date().toLocaleDateString("fr-FR") + " à " + new Date().toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' });
    
    let priceCalculated = "";
    if (currencyStr === "CDF") {
      // Manual formatting with standard spaces to avoid standard PDF narrow non-breaking space encoding issues
      const formatted = (votesLength * 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      priceCalculated = `${formatted} CDF`;
    } else {
      const formatted = (votesLength * 0.05).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      priceCalculated = `${formatted} USD`;
    }

    const cleanedCandidateNumber = candidateNumber.replace(/N°\s*/gi, "").replace(/No\s*/gi, "");

    drawRow("ID Transaction :", txRef);
    drawRow("Date :", dateStr);
    drawRow("Option :", "Soutien Candidats (Mobile)");
    drawRow("Candidat(e) :", candidateName, true);
    drawRow("Numéro :", `N° ${cleanedCandidateNumber}`);
    drawRow("Nombre de votes :", `+ ${votesLength} Votes`, true, true);
    drawRow("Méthode :", operator.toUpperCase());
    drawRow("Votant :", phone);
    
    // Total cost row highlight border
    doc.setDrawColor(225, 225, 225);
    doc.setLineWidth(0.15);
    doc.line(10, y - 1, width - 10, y - 1);
    y += 4;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(13, 12, 18);
    doc.text("Montant total payé :", margin, y);
    doc.setTextColor(212, 163, 89);
    doc.text(priceCalculated, width - margin, y, { align: "right" });
    
    // Status box
    y += 10;
    doc.setFillColor(243, 249, 243);
    doc.roundedRect(width / 2 - 22, y - 4.5, 44, 6.5, 1, 1, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(46, 125, 50);
    doc.text("VOTE SÉCURISÉ & VALIDÉ", width / 2, y, { align: "center" });
    
    // Watermark/Notice
    doc.setTextColor(150, 150, 155);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(6.5);
    doc.text("Signature numérique de certification authentifiée.", width / 2, doc.internal.pageSize.getHeight() - 11, { align: "center" });
    doc.text("Merci pour votre participation active au scrutin.", width / 2, doc.internal.pageSize.getHeight() - 8, { align: "center" });

    doc.save(`Recu_Vote_${candidateName.replace(/\s+/g, "_")}_${txRef}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

interface CandidatesProps {
  selectedCandidateId: string | null;
  setSelectedCandidateId: (id: string | null) => void;
}

export default function Candidates({ selectedCandidateId, setSelectedCandidateId }: CandidatesProps) {
  // Initialize some realistic vote counts stored in local component state / localstorage
  const [votes, setVotes] = useState<{ [id: string]: number }>(() => {
    const saved = localStorage.getItem("candidate_votes");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    // Default initial high counts
    return {
      cand1: 14250,
      cand2: 12890,
      cand3: 11450,
      cand4: 9840,
      cand5: 8720,
      cand6: 7650
    };
  });

  // Track page views per candidate dynamically
  const [views, setViews] = useState<{ [id: string]: number }>(() => {
    const saved = localStorage.getItem("candidate_views");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return {
      cand1: 723,
      cand2: 541,
      cand3: 890,
      cand4: 412,
      cand5: 642,
      cand6: 345
    };
  });

  const [hasVotedFor, setHasVotedFor] = useState<string | null>(() => {
    return localStorage.getItem("voted_for");
  });

  // Navigation filtering tabs
  const [activeTab, setActiveTab] = useState<"all" | "kinshasa" | "lubumbashi">("all");
  const [celebrateVoteId, setCelebrateVoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState<"name" | "number">("name");

  // Detailed Modal states
  const [copiedToast, setCopiedToast] = useState(false);
  const [currency, setCurrency] = useState<"CDF" | "USD">("CDF");
  const [selectedPack, setSelectedPack] = useState<string>("");
  const [selectedOperator, setSelectedOperator] = useState<"mpesa" | "airtel" | "orange" | "africell" | null>(null);
  
  // Custom checkout step animation simulators
  const [checkoutStep, setCheckoutStep] = useState<"idle" | "loading" | "success">("idle");
  const [tempVotesAdded, setTempVotesAdded] = useState<number>(0);
  const [voterPhone, setVoterPhone] = useState<string>("");
  const [currentTxRef, setCurrentTxRef] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("candidate_votes", JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    localStorage.setItem("candidate_views", JSON.stringify(views));
  }, [views]);

  // Standard/Free Vote handler (Limit 1 per user for free votes)
  const handleVote = (candidateId: string) => {
    if (hasVotedFor) return; 

    setVotes(prev => ({
      ...prev,
      [candidateId]: (prev[candidateId] || 0) + 1
    }));
    setHasVotedFor(candidateId);
    localStorage.setItem("voted_for", candidateId);

    // Trigger visual feedback
    setCelebrateVoteId(candidateId);
    setTimeout(() => {
      setCelebrateVoteId(null);
    }, 2000);
  };

  // Open candidate profile and register a dynamic page view
  const handleOpenProfile = (candidateId: string) => {
    // Record view locally
    setViews(prev => ({
      ...prev,
      [candidateId]: (prev[candidateId] || 0) + 1
    }));
    setSelectedCandidateId(candidateId);
    
    // Reset wizard
    setCurrency("CDF");
    setSelectedPack("");
    setSelectedOperator(null);
    setCheckoutStep("idle");
    setTempVotesAdded(0);
    setVoterPhone("");
  };

  // Simulated premium package checkout
  const handleConfirmPaiement = () => {
    if (!selectedPack) return;
    if (!selectedOperator) return;
    if (!voterPhone.trim()) return;

    const numVotes = parseInt(selectedPack, 10);
    if (isNaN(numVotes)) return;

    setCheckoutStep("loading");
    setTempVotesAdded(numVotes);

    const ref = "TXN-" + Math.floor(10000000 + Math.random() * 90000000);
    setCurrentTxRef(ref);

    setTimeout(() => {
      if (selectedCandidateId) {
        setVotes(prev => ({
          ...prev,
          [selectedCandidateId]: (prev[selectedCandidateId] || 0) + numVotes
        }));
        
        if (activeCandidate) {
          generateReceiptPDF(
            activeCandidate.name,
            activeCandidate.number,
            numVotes,
            selectedOperator || "mpesa",
            voterPhone,
            currency,
            ref
          );
        }
      }
      setCheckoutStep("success");
    }, 2200);
  };

  const handleDownloadReceipt = () => {
    if (activeCandidate) {
      generateReceiptPDF(
        activeCandidate.name,
        activeCandidate.number,
        tempVotesAdded,
        selectedOperator || "mpesa",
        voterPhone,
        currency,
        currentTxRef
      );
    }
  };

  const copyProfileLink = (candName: string) => {
    const textToCopy = `${window.location.origin}/#candidates?candidate=${encodeURIComponent(candName)}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    });
  };

  const filteredCandidates = CANDIDATES_LIST.filter(c => {
    const matchesTab = activeTab === "all" || c.province.toLowerCase() === activeTab;
    if (!searchQuery.trim()) return matchesTab;

    const query = searchQuery.toLowerCase().trim();
    if (searchCategory === "name") {
      return matchesTab && c.name.toLowerCase().includes(query);
    } else {
      const normalizedQuery = query.replace(/^(n|n°|no\.?\s*)/i, "").trim();
      const normalizedCandNum = c.number.toLowerCase().replace(/^(n|n°|no\.?\s*)/i, "").trim();
      return matchesTab && (
        c.number.toLowerCase().includes(query) || 
        normalizedCandNum.includes(normalizedQuery)
      );
    }
  });

  // Get active candidate info for modal
  const activeCandidate = CANDIDATES_LIST.find(c => c.id === selectedCandidateId);
  const activeDetails = selectedCandidateId ? CANDIDATE_DETAILS[selectedCandidateId] : null;

  return (
    <section
      id="candidates"
      className="py-24 sm:py-32 px-4 relative bg-brand-bg select-none overflow-hidden border-t border-brand-charcoal/30"
    >
      {/* Background radial accent flare */}
      <div className="absolute top-1/2 left-1/3 w-[80vw] h-[80vw] max-w-[800px] bg-brand-outline/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[40vw] h-[40vw] max-w-[400px] bg-brand-gold/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Candidates Gallery Head section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs font-bold tracking-[0.3em] text-brand-gold uppercase block mb-3"
          >
            SÉLECTION OFFICIELLE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-medium text-3xl sm:text-4xl text-brand-ivory leading-tight mb-6"
          >
            Les Candidates d'
            <span className="text-transparent bg-clip-text gold-text-gradient font-bold">
              Élite 2026
            </span>
          </motion.h2>
          <p className="font-sans text-brand-outline text-xs sm:text-sm max-w-xl mx-auto">
            Découvrez les visages de notre sélection finale issus de nos provinces. Exprimez votre soutien officiel et contribuez à propulser votre ambassadrice préférée.
          </p>

          {/* District filter tab sliders */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {[
              { id: "all", label: "Toutes" },
              { id: "kinshasa", label: "Kinshasa" },
              { id: "lubumbashi", label: "Lubumbashi" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-brand-gold border-brand-gold text-black hover:shadow-[0_0_15px_rgba(242,195,91,0.25)]"
                    : "bg-brand-surface/40 border-brand-outline/10 text-brand-outline hover:text-brand-ivory hover:border-brand-outline/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Elegant Search & Category Filter Section */}
        <div className="max-w-2xl mx-auto mb-12 bg-brand-surface/20 border border-brand-outline/15 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search Input Box */}
            <div className="relative w-full flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  searchCategory === "name" 
                    ? "Rechercher par nom complet (ex: Daniella)..." 
                    : "Rechercher par numéro (ex: 01)..."
                }
                className="w-full pl-10 pr-4 py-2.5 bg-brand-bg/60 border border-brand-outline/25 focus:border-brand-gold/60 rounded-xl font-sans text-xs sm:text-sm text-brand-ivory placeholder-brand-outline/50 outline-none transition-all focus:ring-1 focus:ring-brand-gold/30 hover:border-brand-outline/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-outline hover:text-brand-ivory text-xs px-2 py-0.5 rounded-md hover:bg-brand-surface/80 transition-colors"
                >
                  Effacer
                </button>
              )}
            </div>

            {/* Category Toggle Buttons */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto shrink-0 bg-brand-bg/40 p-1 rounded-xl border border-brand-outline/15">
              <button
                type="button"
                onClick={() => {
                  setSearchCategory("name");
                  setSearchQuery("");
                }}
                className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  searchCategory === "name"
                    ? "bg-brand-gold border border-brand-gold text-black hover:shadow-[0_0_10px_rgba(242,195,91,0.2)]"
                    : "border border-transparent text-brand-outline hover:text-brand-ivory"
                }`}
              >
                Nom complet
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchCategory("number");
                  setSearchQuery("");
                }}
                className={`flex-1 sm:flex-initial px-4 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                  searchCategory === "number"
                    ? "bg-brand-gold border border-brand-gold text-black hover:shadow-[0_0_10px_rgba(242,195,91,0.2)]"
                    : "border border-transparent text-brand-outline hover:text-brand-ivory"
                }`}
              >
                Numéro
              </button>
            </div>
          </div>
          
          {/* Real-time Dynamic Results Counter */}
          <div className="flex items-center justify-between mt-3 px-1">
            <span className="font-mono text-[10px] text-brand-outline">
              {filteredCandidates.length} {filteredCandidates.length > 1 ? "candidates trouvées" : "candidate trouvée"}
            </span>
            {searchQuery && (
              <span className="font-sans text-[10px] text-brand-gold/80 italic">
                Recherche active : "{searchQuery}"
              </span>
            )}
          </div>
        </div>

        {/* Candidates Grid Gallery */}
        {filteredCandidates.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-6 mb-28">
            {filteredCandidates.map((cand, idx) => {
              const votesCount = votes[cand.id] || 0;
              const isVoted = hasVotedFor === cand.id;
              const isMyVoteWinner = celebrateVoteId === cand.id;

              return (
                <motion.div
                  key={cand.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleOpenProfile(cand.id)}
                  className={`glass-panel rounded-2xl overflow-hidden flex flex-col justify-between hover:border-brand-gold/40 hover:shadow-[0_15px_30px_rgba(242,195,91,0.08)] bg-gradient-to-b from-brand-surface to-brand-surface/75 group border relative transition-all duration-300 cursor-pointer ${
                    isVoted ? "border-brand-gold/45 shadow-[0_0_20px_rgba(242,195,91,0.15)]" : ""
                  }`}
                >
                  {/* Voting badge on top left */}
                  <div className="absolute top-2.5 left-2.5 z-20 bg-black/70 backdrop-blur-md border border-brand-outline/15 text-brand-gold text-[8px] sm:text-[9px] font-mono tracking-widest uppercase py-0.5 sm:py-1 px-1.5 sm:px-2.5 rounded-full font-bold">
                    {cand.province}
                  </div>

                  {/* Candidate Number on top right */}
                  <div className="absolute top-2.5 right-2.5 z-20 bg-brand-gold/20 backdrop-blur-md border border-brand-gold/30 text-brand-gold text-[8px] sm:text-[9px] font-mono tracking-widest py-0.5 sm:py-1 px-1.5 sm:px-2.5 rounded-full font-bold">
                    {cand.number}
                  </div>

                  {/* Portrait Picture Wrapper */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-brand-container">
                    <img
                      src={cand.image}
                      alt={cand.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Luxury bottom dark gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
                    
                    {/* Glowing halo crown background on hover */}
                    <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    {/* Voted check indicator mark overlay */}
                    <AnimatePresence>
                      {isMyVoteWinner && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
                        >
                          <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-brand-gold animate-ping absolute" />
                          <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-brand-gold fill-brand-gold" />
                          <span className="font-mono text-[8px] sm:text-[9px] font-black tracking-widest text-brand-gold uppercase mt-2">
                            VOTE ENREGISTRÉ
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Stats and text panel */}
                  <div className="p-3.5 sm:p-4.5 flex flex-col text-left justify-between flex-grow bg-gradient-to-b from-[#111016]/90 to-[#0a090e]/95 border-t border-brand-outline/10">
                    <div className="mb-3.5">
                      <h3 className="font-display font-medium text-xs sm:text-sm text-brand-ivory group-hover:text-brand-gold transition-colors leading-tight tracking-wide">
                        {cand.name}
                      </h3>
                      {/* Real-time Votes/Views statistics below the name inside the main grid view */}
                      <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-brand-outline mt-2 font-medium">
                        <span className="flex items-center gap-1 text-brand-gold">
                          <Star className="w-2.5 h-2.5 fill-brand-gold text-brand-gold" /> {votesCount.toLocaleString()} votes
                        </span>
                        <span className="text-brand-outline/20">|</span>
                        <span className="flex items-center gap-1 text-brand-outline/80">
                          <Eye className="w-2.5 h-2.5" /> {(views[cand.id] || 0).toLocaleString()} vues
                        </span>
                      </div>
                    </div>

                    {/* Interactive Voter / Profil Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenProfile(cand.id);
                      }}
                      className="w-full py-2.5 rounded-xl text-[8px] sm:text-[9px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer text-center bg-brand-surface hover:bg-brand-gold hover:text-black border border-brand-outline/25 hover:border-brand-gold text-brand-ivory shadow-sm"
                    >
                      Voter / Profil
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 px-4 bg-brand-surface/10 rounded-2xl border border-dashed border-brand-outline/20 max-w-md mx-auto mb-28"
          >
            <Users className="w-10 h-10 text-brand-gold/40 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-brand-ivory text-base mb-2">
              Aucune candidate trouvée
            </h3>
            <p className="font-sans text-brand-outline text-xs">
              Aucun résultat ne correspond à votre recherche "{searchQuery}" dans la catégorie sélectionnée.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveTab("all");
              }}
              className="mt-5 px-4 py-2 border border-brand-outline/20 hover:border-brand-gold/45 text-brand-gold hover:bg-brand-gold/5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all cursor-pointer"
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        )}

        {/* ========================================================
            HIGH FIDELITY CANDIDATE DETAILED PROFILE DETAILS MODAL
           ======================================================== */}
        <AnimatePresence>
          {selectedCandidateId && activeCandidate && activeDetails && (
            <div className="fixed inset-0 z-[100] bg-[#0d0c12] overflow-y-auto w-full h-full left-0 top-0">
              
              {/* Background ambient light inside modal */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] h-[50%] bg-brand-gold/5 rounded-full blur-[130px] pointer-events-none" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative bg-[#0d0c12] w-full min-h-screen mx-auto overflow-hidden shadow-none mt-0 mb-0 p-4 sm:p-8 md:p-12"
              >
                
                {/* Close modal button top right */}
                <button
                  type="button"
                  onClick={() => setSelectedCandidateId(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 md:right-12 z-50 text-brand-outline hover:text-brand-gold bg-black/70 hover:bg-black p-3.5 rounded-full border border-brand-outline/20 hover:border-brand-gold/50 cursor-pointer shadow-lg transition-all"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Grid container mirroring the requested structural layout exactly */}
                <div className="grid grid-cols-1 md:grid-cols-12 md:divide-x md:divide-brand-outline/10 text-left max-w-7xl mx-auto mt-6 md:mt-10">
                  
                  {/* Left Column (5/12) - Visuals, QR and counters */}
                  <div className="md:col-span-5 p-4 sm:p-6 flex flex-col gap-5 bg-brand-surface/10">
                    
                    {/* Big High-Fidelity Portrait frame with rounded gold corners */}
                    <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-brand-gold/30 shadow-[0_15px_30px_rgba(0,0,0,0.5)] bg-black group">
                      <img 
                        src={activeCandidate.image} 
                        alt={activeCandidate.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top transition-transform duration-700"
                      />
                      {/* Artistic vignetting card-top reflection */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                      
                      {/* Golden overlaid visual tags */}
                      <div className="absolute bottom-4 left-4 right-4 text-left">
                        <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-[0.25em] text-brand-gold block uppercase mb-1">
                          CANDIDATE {activeCandidate.number}
                        </span>
                        <h2 className="font-display font-medium text-lg sm:text-2xl text-brand-ivory leading-tight mb-1 uppercase tracking-wide">
                          {activeCandidate.name}
                        </h2>
                        {/* Province and Ville overlay restored */}
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-brand-outline mt-1.5 bg-black/60 backdrop-blur-sm p-1.5 px-3 rounded-lg border border-brand-outline/15 w-fit">
                          <MapPin className="w-3 h-3 text-brand-gold shrink-0" />
                          <span>{activeDetails.provinceSubtitle}</span>
                          <span className="text-brand-gold/30">•</span>
                          <span>{activeDetails.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Partager ce profil (Social Shares) positioned directly below the portrait, which is at the bottom of the city and province label */}
                    <div className="bg-brand-surface/30 border border-brand-outline/15 rounded-xl p-4 text-left">
                      <h4 className="font-mono text-[9px] font-bold tracking-widest text-brand-gold uppercase mb-3 text-left">
                        PARTAGER CE PROFIL
                      </h4>
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Custom visual buttons mimicking standard shared vectors */}
                        <button
                          type="button"
                          onClick={() => copyProfileLink(activeCandidate.name)}
                          className="w-9 h-9 rounded-full bg-brand-bg hover:bg-brand-gold/15 border border-brand-outline/20 hover:border-brand-gold text-brand-ivory hover:text-brand-gold flex items-center justify-center transition-all cursor-pointer"
                          title="Facebook"
                        >
                          <span className="font-sans font-black text-sm">f</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => copyProfileLink(activeCandidate.name)}
                          className="w-9 h-9 rounded-full bg-brand-bg hover:bg-brand-gold/15 border border-brand-outline/20 hover:border-brand-gold text-brand-ivory hover:text-brand-gold flex items-center justify-center transition-all cursor-pointer"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => copyProfileLink(activeCandidate.name)}
                          className="w-9 h-9 rounded-full bg-brand-bg hover:bg-brand-gold/15 border border-brand-outline/20 hover:border-brand-gold text-brand-ivory hover:text-brand-gold flex items-center justify-center transition-all cursor-pointer"
                          title="Twitter"
                        >
                          <span className="font-sans font-bold text-xs">X</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => copyProfileLink(activeCandidate.name)}
                          className="w-9 h-9 rounded-full bg-brand-bg hover:bg-brand-gold/15 border border-brand-outline/20 hover:border-brand-gold text-brand-ivory hover:text-brand-gold flex items-center justify-center transition-all cursor-pointer"
                          title="Telegram"
                        >
                          <Send className="w-3.5 h-3.5 -translate-x-0.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => copyProfileLink(activeCandidate.name)}
                          className="w-9 h-9 rounded-full bg-brand-bg hover:bg-brand-gold/15 border border-brand-outline/20 hover:border-brand-gold text-brand-ivory hover:text-brand-gold flex items-center justify-center transition-all cursor-pointer"
                          title="Copier le lien"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {copiedToast && (
                        <motion.p 
                          initial={{ opacity: 0, y: 5 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          className="text-[10px] text-brand-gold italic mt-2.5 font-mono text-left"
                        >
                          Lien de partage copié dans le presse-papier !
                        </motion.p>
                      )}
                    </div>

                    {/* Scanner pour voter section (Simulating real-time QR vectors from picture) */}
                    <div className="bg-brand-surface/30 border border-brand-outline/15 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                      <h4 className="font-mono text-[9px] font-bold tracking-widest text-brand-gold uppercase mb-2">
                        SCANNER POUR VOTER
                      </h4>
                      {/* Realistic looking vector QR code generated by hand */}
                      <div className="w-[110px] h-[110px] bg-white p-2 rounded-lg border-2 border-brand-gold/20 flex flex-col justify-between items-center relative mb-2">
                        <div className="grid grid-cols-4 gap-1.5 w-full h-full p-1 opacity-90">
                          {/* Top-left corner finder */}
                          <div className="border-[3px] border-black rounded-sm w-5 h-5 flex items-center justify-center">
                            <div className="w-2 h-2 bg-black rounded-2xs" />
                          </div>
                          {/* Top patterns */}
                          <div className="flex flex-col gap-0.5 mt-1 justify-around">
                            <div className="h-1 bg-black w-3/4 rounded-2xs" />
                            <div className="h-1 bg-black w-1/2 rounded-2xs" />
                          </div>
                          <div className="flex flex-col gap-0.5 mt-1 justify-around">
                            <div className="h-1 bg-black w-2/3 rounded-2xs" />
                            <div className="h-1 bg-black w-1/2 rounded-2xs" />
                          </div>
                          {/* Top-right corner finder */}
                          <div className="border-[3px] border-black rounded-sm w-5 h-5 flex items-center justify-center justify-self-end">
                            <div className="w-2 h-2 bg-black rounded-2xs" />
                          </div>
                          {/* Middle random dots and bars */}
                          <div className="bg-black h-1 rounded-2xs w-full self-center" />
                          <div className="bg-black/80 h-1.5 rounded-2xs w-2/3 self-center justify-self-center" />
                          <div className="grid grid-cols-2 gap-0.5 w-full">
                            <div className="bg-black h-1 rounded-2xs" />
                            <div className="bg-black h-1 rounded-2xs" />
                          </div>
                          <div className="bg-black h-1 rounded-2xs w-4/5 self-center" />
                          {/* Bottom-left corner finder */}
                          <div className="border-[3px] border-black rounded-sm w-5 h-5 flex items-center justify-center">
                            <div className="w-2 h-2 bg-black rounded-2xs" />
                          </div>
                          <div className="bg-black h-1 rounded-2xs w-4/5 self-center" />
                          <div className="bg-black h-1.5 rounded-2xs w-3/4 self-center" />
                          {/* Small align square */}
                          <div className="border-2 border-black w-3 h-3 self-end justify-self-end mr-1 rounded-xs flex items-center justify-center">
                            <div className="w-1 h-1 bg-black" />
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[8px] text-brand-outline tracking-wider max-w-[160px]">
                        Pointez l'appareil photo pour accéder directement au profil
                      </span>
                    </div>

                    {/* Lower stat numbers block for Votes and Views matching bottom bars */}
                    <div className="grid grid-cols-2 gap-3 mt-1 text-left">
                      <div className="bg-brand-surface/30 border border-brand-outline/15 rounded-xl p-3 flex flex-col">
                        <div className="flex items-center gap-1 text-brand-gold mb-1">
                          <Star className="w-3.5 h-3.5 fill-brand-gold" />
                          <span className="font-mono text-[9px] font-black tracking-wider">VOTES</span>
                        </div>
                        <span className="font-display font-black text-brand-ivory text-sm sm:text-base">
                          {(votes[activeCandidate.id] || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-brand-surface/30 border border-brand-outline/15 rounded-xl p-3 flex flex-col">
                        <div className="flex items-center gap-1 text-brand-outline mb-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span className="font-mono text-[9px] font-black tracking-wider">VUES</span>
                        </div>
                        <span className="font-display font-black text-brand-ivory text-sm sm:text-base">
                          {(views[activeCandidate.id] || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Right Column (7/12) - Bio, custom payment checkout forms and live support */}
                  <div className="md:col-span-7 p-4 sm:p-6 flex flex-col gap-5">
                    
                    {/* Header Details */}
                    <div>
                      <span className="font-mono text-[9px] font-black tracking-[0.3em] text-brand-gold uppercase block mb-1">
                        CANDIDATE {activeCandidate.number}
                      </span>
                      <h1 className="font-display font-medium text-2xl sm:text-3.5xl text-brand-ivory leading-tight uppercase font-extrabold">
                        {activeCandidate.name}
                      </h1>
                      
                      {/* Restored Province and City of origin inside right column details block */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 mb-4 font-mono text-xs text-brand-outline">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                          <span>{activeDetails.provinceSubtitle} (Province d'origine)</span>
                        </div>
                        <span className="text-brand-gold/30 hidden sm:inline">•</span>
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                          <span>Ville : {activeDetails.city}</span>
                        </div>
                      </div>

                      {/* Beautiful glowing metrics replacing City and Province of origin entirely across displays */}
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div className="bg-brand-surface border border-brand-gold/45 rounded-xl p-3 flex items-center gap-3.5 shadow-[0_0_15px_rgba(242,195,91,0.06)]">
                          <div className="w-8 h-8 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">
                            <Star className="w-4 h-4 fill-brand-gold" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-mono text-[8px] text-brand-outline uppercase tracking-wider font-extrabold leading-none">VOTES ENREGISTRÉS</span>
                            <span className="font-display font-black text-brand-ivory text-sm sm:text-base mt-1">
                              {(votes[activeCandidate.id] || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="bg-brand-surface border border-brand-outline/20 rounded-xl p-3 flex items-center gap-3.5">
                          <div className="w-8 h-8 rounded-full bg-brand-outline/10 border border-brand-outline/15 flex items-center justify-center text-brand-outline shrink-0">
                            <Eye className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-mono text-[8px] text-brand-outline uppercase tracking-wider font-extrabold leading-none">VUES DU PROFIL</span>
                            <span className="font-display font-black text-brand-ivory text-sm sm:text-base mt-1">
                              {(views[activeCandidate.id] || 0).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* BIOGRAPHIE Box styling exactly matching image */}
                    <div className="bg-[#121118]/85 border border-brand-outline/15 rounded-2xl p-4 sm:p-5 text-left relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-2 h-full bg-brand-gold" />
                      <h4 className="font-mono text-[9px] sm:text-[10px] font-black tracking-widest text-brand-gold uppercase mb-2.5">
                        BIOGRAPHIE
                      </h4>
                      <p className="font-sans text-brand-ivory text-xs sm:text-[13px] leading-relaxed font-normal">
                        "{activeDetails.bio}"
                      </p>
                    </div>

                    {/* SOUTENIR PAYMENTS PANEL CONTAINER */}
                    <div className="bg-brand-surface/20 border border-brand-outline/15 rounded-2xl p-4 sm:p-5 text-left relative">
                      
                      {/* Glowing success screen state */}
                      <AnimatePresence>
                        {checkoutStep === "success" && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-[#0d0c12]/98 backdrop-blur-md z-30 flex flex-col items-center justify-start overflow-y-auto p-4 sm:p-5 text-center"
                          >
                            <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/40 flex items-center justify-center mb-1.5 text-green-400 shrink-0 mt-2">
                              <Check className="w-5 h-5 stroke-[3]" />
                            </div>
                            <h3 className="font-display font-bold text-sm text-brand-ivory mb-1">
                              Soutien Réussi !
                            </h3>
                            <p className="font-sans text-brand-outline text-[10px] max-w-sm mb-3 leading-tight">
                              Votre vote a été validé ! Un reçu de transaction officiel a été généré et téléchargé directement.
                            </p>

                            {/* Beautiful visual receipt inside popup */}
                            <div className="w-full bg-[#0d0c12] border border-brand-gold/30 rounded-2xl p-4 sm:p-5 mb-4 text-left text-[11px] font-mono leading-relaxed relative overflow-hidden">
                              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-gold/30 via-brand-gold to-brand-gold/30" />
                              <div className="flex flex-col items-center justify-center border-b border-brand-outline/10 pb-3 mb-3 text-center">
                                {/* Queen Crown SVG Logo */}
                                <svg className="w-8 h-8 text-brand-gold mb-1 filter drop-shadow-[0_2px_8px_rgba(242,195,91,0.25)]" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 4l2.5 5 5-2-1.5 8h-12l-1.5-8 5 2z" />
                                  <rect x="5.5" y="16" width="13" height="1.5" rx="0.5" />
                                  <circle cx="12" cy="3.2" r="1.1" />
                                  <circle cx="4.5" cy="6.2" r="1.1" />
                                  <circle cx="19.5" cy="6.2" r="1.1" />
                                </svg>
                                <span className="text-brand-gold font-sans font-black tracking-[0.22em] uppercase text-xs leading-none">
                                  MISS NATIONALE RDC
                                </span>
                                <span className="text-[#a09fa6] font-sans text-[7px] tracking-widest uppercase mt-1">
                                  Plateforme Officielle de Sélection en Ligne
                                </span>
                              </div>
                              <div className="space-y-1.5 text-[10px] sm:text-xs">
                                <div className="flex justify-between items-center py-0.5">
                                  <span className="text-brand-outline">ID Transaction :</span>
                                  <span className="text-brand-ivory font-bold">{currentTxRef}</span>
                                </div>
                                <div className="flex justify-between items-center py-0.5">
                                  <span className="text-brand-outline">Date :</span>
                                  <span className="text-brand-ivory">{new Date().toLocaleDateString("fr-FR")} à {new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
                                </div>
                                <div className="flex justify-between items-center py-0.5">
                                  <span className="text-brand-outline">Option :</span>
                                  <span className="text-brand-ivory">Soutien Candidats (Mobile)</span>
                                </div>
                                <div className="flex justify-between items-center py-0.5">
                                  <span className="text-brand-outline">Candidat(e) :</span>
                                  <span className="text-brand-gold font-black">{activeCandidate.name}</span>
                                </div>
                                <div className="flex justify-between items-center py-0.5">
                                  <span className="text-brand-outline">Numéro de vote :</span>
                                  <span className="text-brand-ivory font-bold">N° {activeCandidate.number.replace(/N°\s*/gi, "").replace(/No\s*/gi, "")}</span>
                                </div>
                                <div className="flex justify-between items-center py-0.5">
                                  <span className="text-brand-outline">Nombre de votes :</span>
                                  <span className="text-brand-gold font-black">+{tempVotesAdded} Votes</span>
                                </div>
                                <div className="flex justify-between items-center py-0.5">
                                  <span className="text-brand-outline">Méthode :</span>
                                  <span className="text-brand-ivory font-bold uppercase">{selectedOperator}</span>
                                </div>
                                <div className="flex justify-between items-center py-0.5">
                                  <span className="text-brand-outline">Téléphone :</span>
                                  <span className="text-brand-ivory">{voterPhone}</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-brand-outline/10 pt-2 pb-0.5 text-xs">
                                  <span className="text-brand-ivory font-semibold">Montant total payé :</span>
                                  <span className="text-brand-gold font-black text-sm">
                                    {currency === "CDF" 
                                      ? `${(tempVotesAdded * 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} CDF` 
                                      : `${(tempVotesAdded * 0.05).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} USD`
                                    }
                                  </span>
                                </div>
                                <div className="flex justify-between items-center border-t border-brand-outline/10 pt-2 mt-1">
                                  <span className="text-[#a09fa6] text-[8px] tracking-wider uppercase">Statut :</span>
                                  <span className="text-green-400 font-bold flex items-center gap-1 text-[8px] uppercase tracking-wider">
                                    <Check className="w-3 h-3 stroke-[3]" /> SECURISE & ENREGISTRE
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2 w-full mt-auto mb-2">
                              <button
                                type="button"
                                onClick={handleDownloadReceipt}
                                className="w-full py-2 bg-brand-gold hover:shadow-[0_0_12px_rgba(242,195,91,0.25)] text-black rounded-lg font-mono text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <Download className="w-3.5 h-3.5" />
                                Télécharger à nouveau (PDF)
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setCheckoutStep("idle");
                                  setSelectedPack("");
                                  setSelectedOperator(null);
                                  setVoterPhone("");
                                }}
                                className="w-full py-2 border border-brand-outline/20 hover:border-brand-gold/60 text-brand-ivory hover:text-brand-gold rounded-lg font-mono text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer"
                              >
                                Soutenir à nouveau
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Loading/Processing popup overlay */}
                      <AnimatePresence>
                        {checkoutStep === "loading" && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-black/85 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center"
                          >
                            <Loader2 className="w-10 h-10 text-brand-gold animate-spin mb-4" />
                            <h3 className="font-display font-bold text-base text-brand-ivory mb-1">
                              Connexion à l'opérateur mobile...
                            </h3>
                            <p className="font-sans text-brand-outline text-xs">
                              Veuillez valider le message push sécurisé envoyé sur votre téléphone pour finaliser le paiement.
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="text-center border-b border-brand-outline/10 pb-4 mb-4">
                        <span className="font-mono text-[9px] tracking-[0.25em] text-brand-gold block uppercase mb-1">
                          SOUTENIR
                        </span>
                        <h3 className="font-display font-bold text-sm sm:text-base text-brand-ivory uppercase tracking-wider">
                          {activeCandidate.name}
                        </h3>
                      </div>

                      {/* Currency togglers exact replication: CDF / USD */}
                      <div className="grid grid-cols-2 gap-2 bg-[#0c0b11] p-1.5 rounded-xl border border-brand-outline/10 mb-4">
                        <button
                          type="button"
                          onClick={() => {
                            setCurrency("CDF");
                            setSelectedPack("");
                          }}
                          className={`py-2 rounded-lg text-xs font-bold font-mono tracking-wide transition-all cursor-pointer ${
                            currency === "CDF" 
                              ? "bg-brand-gold text-black shadow-md" 
                              : "text-brand-outline hover:text-brand-ivory bg-transparent"
                          }`}
                        >
                          Franc CDF
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCurrency("USD");
                            setSelectedPack("");
                          }}
                          className={`py-2 rounded-lg text-xs font-bold font-mono tracking-wide transition-all cursor-pointer ${
                            currency === "USD" 
                              ? "bg-brand-gold text-black shadow-md" 
                              : "text-brand-outline hover:text-brand-ivory bg-transparent"
                          }`}
                        >
                          Dollar USD
                        </button>
                      </div>

                      {/* Dropdown SELECT PACK */}
                      <div className="mb-4">
                        <label className="font-mono text-[9px] font-black text-brand-outline block uppercase mb-2">
                          CHOISIR UN PACK DE VOTES
                        </label>
                        <select
                          value={selectedPack}
                          onChange={(e) => setSelectedPack(e.target.value)}
                          className="w-full bg-[#121118] border border-brand-outline/25 rounded-xl px-3 py-2.5 text-xs text-brand-ivory outline-none focus:border-brand-gold transition-colors cursor-pointer"
                        >
                          <option value="">-- Sélectionner un pack --</option>
                          {currency === "CDF" ? (
                            <>
                              <option value="10">10 votes / 1 000 CDF</option>
                              <option value="50">50 votes / 5 000 CDF</option>
                              <option value="100">100 votes / 10 000 CDF</option>
                              <option value="500">500 votes / 50 000 CDF</option>
                              <option value="1000">1000 votes / 100 000 CDF</option>
                            </>
                          ) : (
                            <>
                              <option value="10">10 votes / 0.50 USD</option>
                              <option value="50">50 votes / 2.50 USD</option>
                              <option value="100">100 votes / 5.00 USD</option>
                              <option value="500">500 votes / 25.00 USD</option>
                              <option value="1000">1000 votes / 50.00 USD</option>
                            </>
                          )}
                        </select>
                      </div>

                      {/* VOTER PHONE NUMBER INPUT BOX */}
                      <div className="mb-4">
                        <label className="font-mono text-[9px] font-black text-brand-outline block uppercase mb-2">
                          NUMÉRO DE TÉLÉPHONE DU VOTANT
                        </label>
                        <input
                          type="tel"
                          required
                          value={voterPhone}
                          onChange={(e) => setVoterPhone(e.target.value)}
                          placeholder="Ex: 0812345678"
                          className="w-full bg-[#121118] border border-brand-outline/25 rounded-xl px-3.5 py-2.5 text-xs text-brand-ivory outline-none focus:border-brand-gold transition-colors font-mono"
                        />
                      </div>

                      {/* Pay via Mobile Money operators matching mockup layout */}
                      <div className="mb-5">
                        <label className="font-mono text-[9px] font-black text-brand-outline block uppercase mb-2">
                          PAYER PAR MOBILE MONEY
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {[
                            { id: "mpesa", label: "M-Pesa", brandColor: "border-red-600/30 text-white hover:border-red-500", activeBg: "bg-red-950/40 border-red-500 text-red-400" },
                            { id: "airtel", label: "Airtel Money", brandColor: "border-rose-600/30 text-white hover:border-rose-500", activeBg: "bg-rose-950/40 border-rose-500 text-rose-400" },
                            { id: "orange", label: "Orange Money", brandColor: "border-orange-600/30 text-white hover:border-orange-500", activeBg: "bg-orange-950/40 border-orange-500 text-orange-400" },
                            { id: "africell", label: "Africell", brandColor: "border-blue-600/30 text-white hover:border-blue-500", activeBg: "bg-blue-950/40 border-blue-500 text-blue-400" }
                          ].map(op => {
                            const isChosen = selectedOperator === op.id;
                            return (
                              <button
                                key={op.id}
                                type="button"
                                onClick={() => setSelectedOperator(op.id as any)}
                                className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer bg-brand-bg/40 ${
                                  isChosen 
                                    ? op.activeBg 
                                    : `${op.brandColor} border-brand-outline/20 hover:bg-brand-surface/65`
                                }`}
                              >
                                {/* Color circular representation for operator brand */}
                                <div className={`w-2.5 h-2.5 rounded-full ${
                                  op.id === "mpesa" ? "bg-red-500" :
                                  op.id === "airtel" ? "bg-red-600" :
                                  op.id === "orange" ? "bg-orange-500" : "bg-sky-500"
                                } shadow-[0_0_5px_currentColor]`} />
                                <span className="font-mono text-[10px] tracking-tight">{op.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Main package confirm checkout trigger */}
                      <button
                        type="button"
                        onClick={handleConfirmPaiement}
                        disabled={!selectedPack || !selectedOperator || !voterPhone.trim()}
                        className={`w-full py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-widest text-center transition-all cursor-pointer ${
                          selectedPack && selectedOperator && voterPhone.trim()
                            ? "bg-brand-gold hover:shadow-[0_0_20px_rgba(242,195,91,0.2)] text-black border border-brand-gold"
                            : "bg-[#18171f] border border-brand-outline/10 text-brand-outline/40 cursor-not-allowed"
                        }`}
                      >
                        {selectedPack 
                          ? `Confirmer le paiement (${selectedPack} Votes)`
                          : "Confirmer le paiement"
                        }
                      </button>

                    </div>

                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Prizes and Awards Title */}
        <div id="vote" className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs font-bold tracking-[0.3em] text-brand-gold uppercase block mb-3"
          >
            LES RÉCOMPENSES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-medium text-3xl sm:text-4xl text-brand-ivory leading-tight"
          >
            Le Grand Triomphe :{" "}
            <span className="text-transparent bg-clip-text gold-text-gradient font-bold">
              Prix Officiels
            </span>
          </motion.h2>
        </div>

        {/* Columns for the Gold Plated Rewards (Awards section in Image 5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {REWARDS_INFO.map((reward, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-panel rounded-2xl overflow-hidden flex flex-col justify-between border border-brand-outline/20 hover:border-brand-gold/45 transition-colors duration-500 bg-gradient-to-b from-brand-surface to-brand-bg"
            >
              {/* Prize Image Section */}
              <div className="relative aspect-[16/9] w-full bg-brand-charcoal overflow-hidden group">
                <img
                  src={reward.image}
                  alt={reward.rank}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gold vignette spotlight border top reflection */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg to-transparent opacity-80" />
                <div className="absolute bottom-4 left-6 z-10 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-brand-gold pulse-glowing-orb rounded-full p-0.5 bg-black/60" />
                  <span className="font-mono text-[10px] tracking-widest text-brand-gold uppercase font-extrabold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-brand-gold/20">
                    Officiel
                  </span>
                </div>
              </div>

              {/* Perks details section with glowing gold cards design */}
              <div className="p-8 text-left flex flex-col justify-between flex-grow">
                <div className="mb-6">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-brand-outline block mb-1">
                    Dotation de la couronne
                  </span>
                  <h3 className="font-display font-semibold text-xl sm:text-2xl text-transparent bg-clip-text gold-text-gradient font-bold">
                    {reward.rank}
                  </h3>
                </div>

                <div className="flex flex-col gap-3">
                  {reward.perks.map((perk, perkIdx) => (
                    <div key={perkIdx} className="flex items-center gap-3 bg-brand-charcoal/35 py-3 px-4 rounded-xl border border-brand-outline/5 hover:border-brand-gold/25 hover:bg-brand-gold/5 transition-all duration-300">
                      <div className="w-5 h-5 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center shrink-0">
                        <Sparkles className="w-3 h-3 text-brand-gold" />
                      </div>
                      <span className="font-sans text-brand-ivory text-sm sm:text-base font-bold">
                        {perk}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
