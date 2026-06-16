import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, Heart, Check, Users, Sparkles, Trophy, Search, 
  MapPin, X, Share2, Copy, QrCode, Eye, Star, Globe,
  MessageCircle, Send, CheckCircle2, Loader2, Download, FileText,
  TrendingUp, BarChart3, Grid, List, ChevronRight, SlidersHorizontal, ArrowUpDown, Crown,
  Calendar
} from "lucide-react";
import { jsPDF } from "jspdf";
import { CANDIDATES_LIST } from "../data";

// Detailed biographical data for candidates
const CANDIDATE_DETAILS: Record<string, { city: string; provinceSubtitle: string; bio: string; age: number; height: string; profession: string; hobbies: string[] }> = {
  cand1: {
    city: "Gombe",
    provinceSubtitle: "Kinshasa",
    age: 22,
    height: "1m75",
    profession: "Étudiante en Droit & Activiste pour l'éducation",
    hobbies: ["Lecture", "Débats publics", "Piano"],
    bio: "Daniella est une jeune femme déterminée, portant fièrement les valeurs de respect, de courage et d'excellence. Si elle est élue Miss, elle mettra sa voix au service de l'éducation des filles et de la promotion de l'alphabétisation numérique dans toutes les provinces de notre cher pays."
  },
  cand2: {
    city: "Ruashi",
    provinceSubtitle: "Haut-Katanga",
    age: 24,
    height: "1m78",
    profession: "Styliste Rédactrice Culturelle",
    hobbies: ["Mode", "Art de la table", "Randonnées"],
    bio: "Djenny croit profondément en la puissance du patrimoine culturel congolais comme levier de développement. Son ambition est de valoriser le savoir-faire de nos femmes artisanes locales et de parrainer des programmes d'autofinancement et de microcrédit pour les mères isolées."
  },
  cand3: {
    city: "Likasi",
    provinceSubtitle: "Haut-Katanga",
    age: 21,
    height: "1m72",
    profession: "Étudiante en Médecine Générale",
    hobbies: ["Secourisme", "Lecture scientifique", "Volley-ball"],
    bio: "Danena incarne avec grâce et dévouement le combat pour la santé publique. Elle souhaite orienter sa couronne vers des campagnes nationales de sensibilisation et milite pour un meilleur équipement des maternités de premier recours en zones rurales."
  },
  cand4: {
    city: "Bandalungwa",
    provinceSubtitle: "Kinshasa",
    age: 23,
    height: "1m76",
    profession: "Ambassadrice Environnement & Architecte d'Éco-projets",
    hobbies: ["Photographie", "Dessin", "Vélo"],
    bio: "Juanna aspire à être une ambassadrice engagée pour l'environnement. Passionnée par la biodiversité, elle portera un programme axé sur l'accès à l'eau potable collective et l'introduction d'énergies renouvelables simplifiées dans les écoles de la RDC."
  },
  cand5: {
    city: "Limete",
    provinceSubtitle: "Kinshasa",
    age: 20,
    height: "1m74",
    profession: "Plasticienne & Formatrice Sociale",
    hobbies: ["Peinture", "Théâtre lyrique", "Musique"],
    bio: "Barusa se consacre à l'autonomisation et à la réinsertion académique des jeunes filles en décrochage scolaire. Elle propose la création d'écoles d'art et d'ateliers professionnels pour valoriser les multiples talents créatifs de la jeunesse de Kinshasa."
  },
  cand6: {
    city: "N'djili",
    provinceSubtitle: "Kinshasa",
    age: 25,
    height: "1m80",
    profession: "Agronome de terrain & Entrepreneuse",
    hobbies: ["Botanique", "Voyages", "Cuisine locale"],
    bio: "Nana fait de l'accès à l'éducation sa priorité absolue. Elle s'engage à allouer de futures bourses d'études pour soutenir l'entrepreneuriat des jeunes femmes et promouvoir l'apprentissage professionnel agricole au niveau régional."
  }
};

// jsPDF receipt logic
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
    
    // Header section with dark background
    doc.setFillColor(13, 12, 18);
    doc.rect(4, 4, width - 8, 24, "F");
    
    const cx = width / 2;
    doc.setFillColor(242, 195, 91); 
    
    // Vector crown
    doc.triangle(cx, 7, cx - 1.8, 10.5, cx + 1.8, 10.5, "F");
    doc.triangle(cx - 3.2, 8, cx - 4, 10.5, cx - 1, 10.5, "F");
    doc.triangle(cx + 3.2, 8, cx + 4, 10.5, cx + 1, 10.5, "F");
    doc.rect(cx - 4.2, 10.7, 8.4, 0.7, "F");
    doc.circle(cx, 6.7, 0.35, "F");
    doc.circle(cx - 3.2, 7.7, 0.35, "F");
    doc.circle(cx + 3.2, 7.7, 0.35, "F");
    
    // Title
    doc.setTextColor(242, 195, 91);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("MISS NATIONALE RDC", width / 2, 16.2, { align: "center" });
    
    doc.setFontSize(5.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(210, 210, 210);
    doc.text("PLATEFORME OFFICIELLE DE SÉLECTION EN LIGNE", width / 2, 20, { align: "center" });
    
    doc.setDrawColor(242, 195, 91);
    doc.setLineWidth(0.3);
    doc.line(4, 28, width - 4, 28);

    doc.setTextColor(20, 20, 28);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("REÇU DE SÉCURITÉ DE VOTE", width / 2, 35, { align: "center" });
    
    doc.setDrawColor(225, 225, 225);
    doc.setLineWidth(0.15);
    doc.line(10, 39, width - 10, 39);
    
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
    
    y += 10;
    doc.setFillColor(243, 249, 243);
    doc.roundedRect(width / 2 - 22, y - 4.5, 44, 6.5, 1, 1, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(46, 125, 50);
    doc.text("VOTE SÉCURISÉ & VALIDÉ", width / 2, y, { align: "center" });
    
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

export default function CandidatesPage() {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [votes, setVotes] = useState<{ [id: string]: number }>(() => {
    const saved = localStorage.getItem("candidate_votes");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      cand1: 14250,
      cand2: 12890,
      cand3: 11450,
      cand4: 9840,
      cand5: 8720,
      cand6: 7650
    };
  });

  const [views, setViews] = useState<{ [id: string]: number }>(() => {
    const saved = localStorage.getItem("candidate_views");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      cand1: 14723,
      cand2: 12541,
      cand3: 10890,
      cand4: 8412,
      cand5: 7642,
      cand6: 6345
    };
  });

  const [hasVotedFor, setHasVotedFor] = useState<string | null>(() => {
    return localStorage.getItem("voted_for");
  });

  // Unique search & filter layout controls for Candidates Page
  const [searchQuery, setSearchQuery] = useState("");
  const [provinceFilter, setProvinceFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"votes_desc" | "votes_asc" | "name" | "number">("votes_desc");
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");
  const [celebrateVoteId, setCelebrateVoteId] = useState<string | null>(null);

  // Voting flows
  const [copiedToast, setCopiedToast] = useState(false);
  const [currency, setCurrency] = useState<"CDF" | "USD">("CDF");
  const [selectedPack, setSelectedPack] = useState<string>("");
  const [selectedOperator, setSelectedOperator] = useState<"mpesa" | "airtel" | "orange" | "africell" | null>(null);
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

  const handleVoteFree = (candidateId: string) => {
    if (hasVotedFor) return; 

    setVotes(prev => ({
      ...prev,
      [candidateId]: (prev[candidateId] || 0) + 1
    }));
    setHasVotedFor(candidateId);
    localStorage.setItem("voted_for", candidateId);

    setCelebrateVoteId(candidateId);
    setTimeout(() => {
      setCelebrateVoteId(null);
    }, 2000);
  };

  const handleOpenProfile = (candidateId: string) => {
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

  const handleConfirmPaiement = () => {
    if (!selectedPack || !selectedOperator || !voterPhone.trim() || !selectedCandidateId) return;

    const numVotes = parseInt(selectedPack, 10);
    if (isNaN(numVotes)) return;

    setCheckoutStep("loading");
    setTempVotesAdded(numVotes);

    const ref = "TXN-" + Math.floor(10000000 + Math.random() * 90000000);
    setCurrentTxRef(ref);

    setTimeout(() => {
      setVotes(prev => ({
        ...prev,
        [selectedCandidateId]: (prev[selectedCandidateId] || 0) + numVotes
      }));
      
      const candidateInfo = CANDIDATES_LIST.find(c => c.id === selectedCandidateId);
      if (candidateInfo) {
        generateReceiptPDF(
          candidateInfo.name,
          candidateInfo.number,
          numVotes,
          selectedOperator,
          voterPhone,
          currency,
          ref
        );
      }
      setCheckoutStep("success");
    }, 2000);
  };

  const copyProfileLink = (candName: string) => {
    const textToCopy = `${window.location.origin}/#candidates?candidate=${encodeURIComponent(candName)}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    });
  };

  // Province options
  const provinces = ["ALL", "KINSHASA", "LUBUMBASHI"];

  // Filter & sort logic
  const filteredAndSortedCandidates = CANDIDATES_LIST.filter(c => {
    const matchesProvince = provinceFilter === "ALL" || c.province.toUpperCase() === provinceFilter.toUpperCase();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesProvince;

    return matchesProvince && (
      c.name.toLowerCase().includes(query) || 
      c.province.toLowerCase().includes(query) || 
      c.number.toLowerCase().includes(query)
    );
  }).sort((a, b) => {
    if (sortBy === "votes_desc") {
      return (votes[b.id] || 0) - (votes[a.id] || 0);
    } else if (sortBy === "votes_asc") {
      return (votes[a.id] || 0) - (votes[b.id] || 0);
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      const numA = parseInt(a.number.replace(/\D/g, ""), 10) || 0;
      const numB = parseInt(b.number.replace(/\D/g, ""), 10) || 0;
      return numA - numB;
    }
  });

  // Calculate statistics
  const totalVotesAcrossAll = (Object.values(votes) as number[]).reduce((sum, v) => sum + v, 0);
  const leadingCandidate = [...CANDIDATES_LIST].sort((a, b) => (votes[b.id] || 0) - (votes[a.id] || 0))[0];

  const activeCandidate = CANDIDATES_LIST.find(c => c.id === selectedCandidateId);
  const activeDetails = selectedCandidateId ? CANDIDATE_DETAILS[selectedCandidateId] : null;

  return (
    <div id="candidates" className="bg-[#0a090e] min-h-screen text-brand-ivory relative w-full overflow-x-hidden">
      {/* Background visual ambience */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-brand-gold/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-[30%] -left-48 w-[600px] h-[600px] bg-brand-outline/3 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] -right-48 w-[500px] h-[500px] bg-brand-gold/3 rounded-full blur-[140px] pointer-events-none" />

      {/* Cinematic Golden Crown Hero Header from layout screenshot */}
      <div className="relative pt-24 pb-16 sm:py-24 px-4 overflow-hidden bg-[#09080d] border-b border-brand-outline/10 shadow-[inner_0_0_40px_rgba(0,0,0,0.8)] mb-12 flex flex-col items-center justify-center w-full">
        {/* Ambient gold bokeh/sparkle simulation */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,195,91,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-brand-gold/20 blur-sm animate-pulse" />
        <div className="absolute top-24 right-20 w-3 h-3 rounded-full bg-brand-gold/15 blur-xs animate-ping" style={{ animationDuration: "6s" }} />
        <div className="absolute bottom-12 left-1/4 w-2 h-2 rounded-full bg-brand-gold/10 blur-xs animate-pulse" />
        <div className="absolute bottom-16 right-1/4 w-3 h-3 rounded-full bg-brand-gold/15 blur-sm" />

        {/* Golden Crown Icon */}
        <Crown className="w-14 h-14 text-brand-gold mx-auto stroke-[1.2] mb-5 drop-shadow-[0_0_20px_rgba(242,195,91,0.35)]" />

        {/* Subtitle with lines */}
        <div className="flex items-center justify-center gap-3.5 mb-4 select-none">
          <span className="h-[1px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-brand-gold/45" />
          <span className="font-mono text-[9px] sm:text-[11px] font-bold tracking-[0.28em] text-brand-gold/90 uppercase">
            ÉDITION OFFICIELLE 2026
          </span>
          <span className="h-[1px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-brand-gold/45" />
        </div>

        {/* High-fidelity elegant serif main heading */}
        <h1 className="font-serif italic font-light text-3.5xl sm:text-5xl text-brand-ivory tracking-tight text-center leading-tight mb-5 max-w-3xl mx-auto">
          — Étape de Sélection —
          <span className="block font-sans not-italic font-bold text-2.5xl sm:text-4xl mt-2 select-none text-brand-gold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Grand Scrutin National
          </span>
        </h1>

        {/* Elegant gold separator line */}
        <div className="w-10 h-[2.5px] bg-brand-gold rounded-full mb-6" />

        {/* Phase Date and status */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-brand-outline font-mono select-none">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-brand-gold animate-pulse shrink-0" />
            <span>Du 15/06/2026 au 15/07/2026</span>
          </div>
          
          <span className="hidden sm:inline text-brand-gold/40">•</span>
          
          <span className="inline-flex items-center gap-1 text-green-400 bg-green-500/10 px-2 rounded-full text-[9px] font-bold uppercase tracking-wider border border-green-500/15">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            En cours
          </span>
        </div>

        {/* Triple metrics horizontal panel */}
        <div className="border border-brand-gold/20 rounded-2xl bg-black/50 backdrop-blur-md px-2 sm:px-8 py-4 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 items-center text-center mt-12 divide-x divide-brand-gold/15 shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col items-center justify-center px-2 py-2">
            <span className="font-serif italic font-light text-xl sm:text-3xl text-brand-ivory leading-none">
              6
            </span>
            <span className="font-mono text-[7px] sm:text-[9px] tracking-[0.2em] text-brand-outline uppercase mt-2 font-bold leading-none">
              Candidates
            </span>
          </div>

          <div className="flex flex-col items-center justify-center px-2 py-2">
            <span className="font-serif italic font-light text-2xl sm:text-3xl text-brand-ivory leading-none">
              2
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-brand-outline uppercase mt-2 font-bold leading-none">
              Provinces
            </span>
          </div>

          <div className="flex flex-col items-center justify-center px-2 py-2">
            <span className="font-serif italic font-light text-xl sm:text-3xl text-brand-ivory leading-none">
              18-30
            </span>
            <span className="font-mono text-[7px] sm:text-[9px] tracking-[0.2em] text-brand-outline uppercase mt-2 font-bold leading-none">
              Âge
            </span>
          </div>

          <div className="flex flex-col items-center justify-center px-2 py-2">
            <span className="font-display font-semibold text-[10px] sm:text-[10px] md:text-sm text-brand-gold tracking-wide leading-tight text-center">
              R.D. Congo
            </span>
            <span className="font-mono text-[7px] sm:text-[9px] tracking-[0.2em] text-brand-outline uppercase mt-2 font-bold leading-none">
              Lieu
            </span>
          </div>
        </div>

        {/* Centered Scroll down prompt */}
        <span className="font-mono text-[8px] tracking-[0.3em] text-brand-outline/40 uppercase mt-5 select-none animate-bounce">
          DÉFILER
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 mt-12">

        {/* Global Statistics Bento Panel */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 text-left">
          
          <div className="bg-[#121118]/80 border border-brand-outline/15 rounded-2xl p-3 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 hover:border-brand-outline/25 transition-all w-full overflow-hidden">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 fill-brand-gold/10" />
            </div>
            <div className="min-w-0">
              <span className="font-mono text-[8px] sm:text-[9px] text-brand-outline tracking-wider block uppercase">Leader Actuelle</span>
              <span className="font-display font-bold text-xs sm:text-sm text-brand-ivory mt-0.5 block truncate">{leadingCandidate?.name}</span>
              <span className="font-mono text-[9px] sm:text-[10px] text-brand-gold font-semibold mt-0.5 block truncate">
                {(votes[leadingCandidate?.id] || 0).toLocaleString()} votes
              </span>
            </div>
          </div>

          <div className="bg-[#121118]/80 border border-brand-outline/15 rounded-2xl p-3 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 hover:border-brand-outline/25 transition-all w-full overflow-hidden">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shrink-0">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-brand-gold/10" />
            </div>
            <div className="min-w-0">
              <span className="font-mono text-[8px] sm:text-[9px] text-brand-outline tracking-wider block uppercase">Total des Votes</span>
              <span className="font-display font-black text-sm sm:text-lg text-brand-gold block mt-0.5 truncate">
                {totalVotesAcrossAll.toLocaleString()}
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] text-brand-outline mt-0.5 block truncate">Exprimés en ligne</span>
            </div>
          </div>

          <div className="bg-[#121118]/80 border border-brand-outline/15 rounded-2xl p-3 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 hover:border-brand-outline/25 transition-all w-full overflow-hidden">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-brand-outline/15 border border-brand-outline/20 flex items-center justify-center text-brand-outline shrink-0">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-mono text-[8px] sm:text-[9px] text-brand-outline tracking-wider block uppercase">Provinces Actives</span>
              <span className="font-display font-medium text-xs sm:text-lg text-brand-ivory block mt-0.5 truncate">2 Provinces</span>
              <span className="font-sans text-[9px] sm:text-[10px] text-brand-outline block mt-0.5 truncate">Kinshasa & H-K</span>
            </div>
          </div>

          <div className="bg-[#121118]/80 border border-brand-outline/15 rounded-2xl p-3 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 hover:border-brand-outline/25 transition-all w-full overflow-hidden">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-brand-outline/15 border border-brand-outline/20 flex items-center justify-center text-brand-outline shrink-0">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="font-mono text-[8px] sm:text-[9px] text-brand-outline tracking-wider block uppercase">Audience Scrutin</span>
              <span className="font-display font-medium text-xs sm:text-lg text-brand-ivory block mt-0.5 truncate">
                {(Object.values(views) as number[]).reduce((sum, v) => sum + v, 0).toLocaleString()}
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] text-brand-outline block mt-0.5 truncate">Vues de profil</span>
            </div>
          </div>

        </div>

        {/* Filters Controls Panel */}
        <div className="bg-[#121118]/45 border border-brand-outline/15 rounded-2xl p-4.5 mb-8 backdrop-blur-xl flex flex-col md:flex-row items-center gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:flex-grow">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom complet, province, numéro de dossard..."
              className="w-full pl-10 pr-12 py-2.5 bg-brand-bg/60 border border-brand-outline/25 focus:border-brand-gold/60 rounded-xl font-sans text-xs sm:text-sm text-brand-ivory placeholder-brand-outline/50 outline-none transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-outline hover:text-brand-ivory text-xs px-2 py-0.5 rounded-md hover:bg-brand-surface/80 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            {/* Province drop down */}
            <div className="flex items-center gap-2 bg-brand-bg/50 border border-brand-outline/20 rounded-xl p-1 w-full sm:w-auto">
              <span className="font-mono text-[10px] text-brand-outline uppercase px-2.5 font-bold hidden md:inline">Province:</span>
              <div className="flex gap-1">
                {provinces.map((prov) => (
                  <button
                    key={prov}
                    onClick={() => setProvinceFilter(prov)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                      provinceFilter === prov
                        ? "bg-brand-gold/15 border border-brand-gold/40 text-brand-gold"
                        : "border border-transparent text-brand-outline hover:text-brand-ivory hover:bg-brand-surface/30"
                    }`}
                  >
                    {prov === "ALL" ? "Toutes" : prov}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting controls */}
            <div className="flex items-center justify-between gap-2 bg-brand-bg/50 border border-brand-outline/20 rounded-xl p-1.5 w-full sm:w-auto">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-gold" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border-none text-[11px] font-semibold text-brand-outline placeholder-brand-outline/50 outline-none transition-all pr-4 font-mono select-none focus:ring-0"
              >
                <option value="votes_desc">Votes (- fort)</option>
                <option value="votes_asc">Votes (+ faible)</option>
                <option value="name">Nom (A - Z)</option>
                <option value="number">Numérotation</option>
              </select>
            </div>
          </div>

        </div>

        {/* Dynamic Display Board (Grid Vs List Row Layout) */}
        {filteredAndSortedCandidates.length > 0 ? (
          layoutMode === "grid" ? (
            /* Grid layout mimicking the premium design */
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6">
              {filteredAndSortedCandidates.map((cand, idx) => {
                const votesCount = votes[cand.id] || 0;
                const viewsCount = views[cand.id] || 0;
                const percentageOfTotal = totalVotesAcrossAll > 0 ? (votesCount / totalVotesAcrossAll) * 100 : 0;
                const isVoted = hasVotedFor === cand.id;
                const isWinner = leadingCandidate.id === cand.id;

                return (
                  <motion.div
                    key={cand.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    onClick={() => handleOpenProfile(cand.id)}
                    className={`glass-panel rounded-2xl overflow-hidden flex flex-col justify-between hover:border-brand-gold/40 hover:shadow-[0_15px_30px_rgba(242,195,91,0.08)] bg-gradient-to-b from-brand-surface to-brand-surface/75 group border relative transition-all duration-300 cursor-pointer ${
                      isVoted ? "border-brand-gold/45 shadow-[0_0_20px_rgba(242,195,91,0.15)]" : ""
                    }`}
                  >
                    {/* Province badge */}
                    <div className="absolute top-2.5 left-2.5 z-20 bg-black/75 backdrop-blur-md border border-brand-outline/15 text-brand-gold text-[8px] sm:text-[9px] font-mono tracking-widest uppercase py-0.5 sm:py-1 px-1.5 sm:px-2.5 rounded-lg font-bold">
                      {cand.province}
                    </div>

                    {/* Dosard tag */}
                    <div className="absolute top-2.5 right-2.5 z-20 bg-brand-gold/25 backdrop-blur-md border border-brand-gold/30 text-brand-gold text-[8px] sm:text-[9px] font-mono tracking-widest py-0.5 sm:py-1 px-1.5 sm:px-2.5 rounded-lg font-bold">
                      {cand.number}
                    </div>

                    {/* Portrait Frame */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-brand-container">
                      <img
                        src={cand.image}
                        alt={cand.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                      
                      {/* Winner Crown indicator overlay */}
                      {isWinner && (
                        <div className="absolute top-12 right-2.5 z-20 bg-black/80 backdrop-blur-sm border border-brand-gold/40 text-brand-gold p-1.5 rounded-lg flex items-center justify-center">
                          <Crown className="w-3.5 h-3.5 fill-brand-gold animate-bounce" />
                        </div>
                      )}
                    </div>

                    {/* Meta stats overlay row */}
                    <div className="p-3.5 sm:p-4.5 flex flex-col text-left justify-between flex-grow bg-gradient-to-b from-[#111016]/90 to-[#0a090e]/95 border-t border-brand-outline/10">
                      <div>
                        <h3 className="font-display font-medium text-xs sm:text-sm text-brand-ivory group-hover:text-brand-gold transition-colors leading-tight tracking-wide font-bold">
                          {cand.name}
                        </h3>
                        
                        <div className="flex items-center gap-2 mt-2 font-mono text-[9px] sm:text-[10px] text-brand-outline font-medium">
                          <span className="flex items-center gap-1 text-brand-gold">
                            <Star className="w-2.5 h-2.5 fill-brand-gold text-brand-gold" /> {votesCount.toLocaleString()} votes
                          </span>
                          <span className="text-brand-outline/20">|</span>
                          <span className="flex items-center gap-1">
                            {percentageOfTotal.toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {/* Small visual metric bar */}
                      <div className="w-full h-[3px] bg-brand-outline/10 rounded-full overflow-hidden mt-3 mb-4.5">
                        <div 
                          className="h-full gold-gradient-bg rounded-full"
                          style={{ width: `${Math.min(percentageOfTotal * 3, 100)}%` }}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenProfile(cand.id);
                        }}
                        className="w-full py-2 rounded-xl text-[8px] sm:text-[9px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer text-center bg-brand-surface hover:bg-brand-gold hover:text-black border border-brand-outline/25 hover:border-brand-gold text-brand-ivory font-mono"
                      >
                        Voter / Profil
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Tabular list layout showing full stats columns */
            <div className="bg-[#121118]/70 border border-brand-outline/15 rounded-2xl overflow-hidden backdrop-blur-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-brand-outline/10 bg-brand-surface/40 text-brand-outline uppercase tracking-wider font-mono text-[9px] sm:text-[10px]">
                      <th className="py-4.5 px-5 font-bold">Rang</th>
                      <th className="py-4.5 px-4 font-bold">Candidate</th>
                      <th className="py-4.5 px-4 font-bold">Dossard</th>
                      <th className="py-4.5 px-4 font-bold">Province</th>
                      <th className="py-4.5 px-4 font-bold text-center">Score Ratio</th>
                      <th className="py-4.5 px-4 font-bold text-right">Votes cumulés</th>
                      <th className="py-4.5 px-5 font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-outline/10">
                    {filteredAndSortedCandidates.map((cand, idx) => {
                      const votesCount = votes[cand.id] || 0;
                      const viewsCount = views[cand.id] || 0;
                      const percentageOfTotal = totalVotesAcrossAll > 0 ? (votesCount / totalVotesAcrossAll) * 100 : 0;
                      const isVoted = hasVotedFor === cand.id;
                      const isLeader = leadingCandidate.id === cand.id;

                      return (
                        <tr 
                          key={cand.id}
                          onClick={() => handleOpenProfile(cand.id)}
                          className="hover:bg-brand-surface/20 transition-colors cursor-pointer group"
                        >
                          {/* Rank number column */}
                          <td className="py-4 px-5 font-mono">
                            <div className="flex items-center gap-2">
                              {idx === 0 ? (
                                <Crown className="w-4 h-4 text-brand-gold fill-brand-gold" />
                              ) : idx === 1 ? (
                                <Award className="w-4 h-4 text-[#d1d1d6]" />
                              ) : (
                                <span className="text-brand-outline/65 text-xs">#{idx + 1}</span>
                              )}
                            </div>
                          </td>

                          {/* Candidate Avatar and Name */}
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-10 rounded-lg overflow-hidden border border-brand-outline/20 bg-brand-container shrink-0">
                                <img 
                                  src={cand.image} 
                                  alt={cand.name} 
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                              <div>
                                <span className="font-display font-bold text-brand-ivory group-hover:text-brand-gold transition-colors block text-xs sm:text-sm">
                                  {cand.name}
                                </span>
                                <span className="text-[10px] text-brand-outline">
                                  {viewsCount.toLocaleString()} vues de fiche
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Dosard number column */}
                          <td className="py-4 px-4 font-mono font-bold text-brand-gold">
                            {cand.number}
                          </td>

                          {/* Province origin of candidate column */}
                          <td className="py-4 px-4">
                            <span className="text-[10px] tracking-wider font-mono font-bold uppercase text-brand-outline bg-brand-surface/80 border border-brand-outline/10 rounded-md px-2 py-1">
                              {cand.province}
                            </span>
                          </td>

                          {/* Percentage progress bar row column */}
                          <td className="py-4 px-4 max-w-[140px]">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex justify-between items-center text-[10px] font-mono">
                                <span className="text-brand-outline">Ratio</span>
                                <span className="text-brand-gold font-bold">{percentageOfTotal.toFixed(1)}%</span>
                              </div>
                              <div className="w-full h-1.5 bg-brand-outline/10 rounded-full overflow-hidden">
                                <div 
                                  className="h-full gold-gradient-bg rounded-full"
                                  style={{ width: `${Math.min(percentageOfTotal * 3, 100)}%` }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* Numerical Vote Count formatted column */}
                          <td className="py-4 px-4 text-right font-mono text-xs sm:text-sm font-bold text-brand-gold">
                            {votesCount.toLocaleString()}
                          </td>

                          {/* Responsive CTA vote action icon column */}
                          <td className="py-4 px-5 text-center">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenProfile(cand.id);
                              }}
                              className="px-3.5 py-1.5 rounded-lg text-[9px] font-bold tracking-wider uppercase transition-all duration-300 bg-brand-surface border border-brand-outline/25 hover:border-brand-gold text-brand-ivory hover:text-black hover:bg-brand-gold font-mono cursor-pointer"
                            >
                              Soutenir
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : (
          <div className="text-center py-20 px-4 bg-brand-surface/10 rounded-2xl border border-dashed border-brand-outline/20 max-w-md mx-auto mb-20">
            <Users className="w-10 h-10 text-brand-gold/40 mx-auto mb-4" />
            <h3 className="font-display font-semibold text-brand-ivory text-base mb-2">
              Aucune candidate trouvée
            </h3>
            <p className="font-sans text-brand-outline text-xs">
              Veuillez modifier vos critères de recherche ou réinitialiser les filtres régionaux.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setProvinceFilter("ALL");
                setSortBy("votes_desc");
              }}
              className="mt-5 px-4 py-2 border border-brand-outline/20 hover:border-brand-gold/45 text-brand-gold hover:bg-brand-gold/5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all cursor-pointer"
            >
              Réinitialiser
            </button>
          </div>
        )}

        {/* ========================================================
            PROFESSIONAL DETAILED CANDIDATE PROFILE WINDOW/MODAL
           ======================================================== */}
        <AnimatePresence>
          {selectedCandidateId && activeCandidate && activeDetails && (
            <div className="fixed bottom-0 inset-x-0 top-[76px] sm:top-[96px] md:top-[120px] lg:top-[128px] z-40 bg-[#0c0b10] overflow-y-auto w-full border-t border-brand-outline/10 shadow-[0_-15px_30px_rgba(0,0,0,0.6)]">
              
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70%] h-[50%] bg-brand-gold/5 rounded-full blur-[130px] pointer-events-none" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="relative bg-[#0c0b10] w-full min-h-full mx-auto overflow-hidden shadow-none p-4 sm:p-8 md:p-12 pb-24"
              >
                {/* Close Button details */}
                <button
                  type="button"
                  onClick={() => setSelectedCandidateId(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 md:right-12 z-50 flex items-center gap-1.5 text-brand-gold hover:text-black hover:bg-brand-gold bg-black/90 border-2 border-brand-gold/60 py-1.5 sm:py-2 px-3 sm:px-4 rounded-full cursor-pointer shadow-[0_4px_20px_rgba(242,195,91,0.25)] transition-all font-mono text-[9px] sm:text-[10px] tracking-widest uppercase font-black"
                  aria-label="Fermer"
                >
                  <X className="w-3.5 h-3.5 text-brand-gold hover:text-black shrink-0" />
                  <span>Fermer</span>
                </button>

                {/* Structure matching standard style */}
                <div className="grid grid-cols-1 md:grid-cols-12 md:divide-x md:divide-brand-outline/10 text-left max-w-7xl mx-auto mt-14 sm:mt-10 md:mt-10">
                  
                  {/* LEFT FRAME COLUMN (5/12) */}
                  <div className="md:col-span-5 p-4 sm:p-6 flex flex-col gap-5 bg-brand-surface/10">
                    
                    {/* Big picture portrait with golden tags */}
                    <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-brand-gold/30 shadow-[0_15px_30px_rgba(0,0,0,0.5)] bg-black">
                      <img 
                        src={activeCandidate.image} 
                        alt={activeCandidate.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                      
                      <div className="absolute bottom-4 left-4 right-4 text-left">
                        <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-[0.25em] text-brand-gold block uppercase mb-1">
                          CANDIDATE {activeCandidate.number}
                        </span>
                        <h2 className="font-display font-medium text-lg sm:text-2xl text-brand-ivory leading-tight mb-1 uppercase tracking-wide font-bold">
                          {activeCandidate.name}
                        </h2>
                        
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-brand-outline mt-1.5 bg-black/60 backdrop-blur-sm p-1.5 px-3 rounded-lg border border-brand-outline/15 w-fit">
                          <MapPin className="w-3 h-3 text-brand-gold shrink-0" />
                          <span>{activeDetails.provinceSubtitle}</span>
                          <span className="text-brand-gold/30">•</span>
                          <span>{activeDetails.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Copier link shares */}
                    <div className="bg-brand-surface/30 border border-brand-outline/15 rounded-xl p-4">
                      <h4 className="font-mono text-[9px] font-bold tracking-widest text-brand-gold uppercase mb-3">
                        PARTAGER CE PROFIL DETRAITE
                      </h4>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => copyProfileLink(activeCandidate.name)}
                          className="w-9 h-9 rounded-full bg-brand-bg hover:bg-brand-gold/15 border border-brand-outline/20 hover:border-brand-gold text-brand-ivory flex items-center justify-center transition-all cursor-pointer"
                          title="WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4 text-brand-gold" />
                        </button>
                        <button
                          type="button"
                          onClick={() => copyProfileLink(activeCandidate.name)}
                          className="w-9 h-9 rounded-full bg-brand-bg hover:bg-brand-gold/15 border border-brand-outline/20 hover:border-brand-gold text-brand-ivory flex items-center justify-center transition-all cursor-pointer"
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
                          Lien copié dans le presse-papier !
                        </motion.p>
                      )}
                    </div>

                    {/* Profile metrics overview */}
                    <div className="grid grid-cols-2 gap-3 mt-1 text-left">
                      <div className="bg-brand-surface/30 border border-brand-outline/15 rounded-xl p-3 flex flex-col">
                        <div className="flex items-center gap-1 text-brand-gold mb-1">
                          <Star className="w-3.5 h-3.5 fill-brand-gold" />
                          <span className="font-mono text-[9px] font-black tracking-wider">VOTES Actuel</span>
                        </div>
                        <span className="font-display font-black text-brand-ivory text-sm sm:text-base">
                          {(votes[activeCandidate.id] || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="bg-brand-surface/30 border border-brand-outline/15 rounded-xl p-3 flex flex-col">
                        <div className="flex items-center gap-1 text-brand-outline mb-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span className="font-mono text-[9px] font-black tracking-wider">VUES Profil</span>
                        </div>
                        <span className="font-display font-black text-brand-ivory text-sm sm:text-base">
                          {(views[activeCandidate.id] || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* RIGHT COLUMN (7/12) */}
                  <div className="md:col-span-7 p-4 sm:p-6 flex flex-col gap-5">
                    
                    {/* Bio Detail Section */}
                    <div>
                      <span className="font-mono text-[9px] font-black tracking-[0.3em] text-brand-gold uppercase block mb-1">
                        CANDIDATE {activeCandidate.number}
                      </span>
                      <h1 className="font-display font-medium text-2xl sm:text-3.5xl text-brand-ivory uppercase font-bold mb-3">
                        {activeCandidate.name}
                      </h1>
                      
                      {/* Physical credentials & Profession stats */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                        <div className="p-2.5 bg-brand-surface/20 border border-brand-outline/10 rounded-xl">
                          <span className="font-mono text-[8px] text-brand-outline uppercase block">Âge</span>
                          <span className="font-sans font-bold text-xs text-brand-ivory">{activeDetails.age} Ans</span>
                        </div>
                        <div className="p-2.5 bg-brand-surface/20 border border-brand-outline/10 rounded-xl">
                          <span className="font-mono text-[8px] text-brand-outline uppercase block">Taille</span>
                          <span className="font-sans font-bold text-xs text-brand-ivory">{activeDetails.height}</span>
                        </div>
                        <div className="p-2.5 bg-brand-surface/20 border border-brand-outline/10 rounded-xl overflow-hidden">
                          <span className="font-mono text-[8px] text-brand-outline uppercase block">Ville</span>
                          <span className="font-sans font-bold text-xs text-brand-ivory truncate block">{activeDetails.city}</span>
                        </div>
                        <div className="p-2.5 bg-brand-surface/20 border border-brand-outline/10 rounded-xl">
                          <span className="font-mono text-[8px] text-brand-outline uppercase block">Dossard</span>
                          <span className="font-sans font-bold text-xs text-brand-gold">{activeCandidate.number}</span>
                        </div>
                      </div>

                      <div className="p-3.5 bg-brand-surface/30 border border-brand-outline/15 rounded-xl mb-4.5">
                        <span className="font-mono text-[8px] text-brand-gold uppercase block tracking-wider font-extrabold mb-1">Profession & Statut</span>
                        <span className="font-sans font-medium text-xs sm:text-sm text-brand-ivory block leading-snug">
                          {activeDetails.profession}
                        </span>
                      </div>

                      <p className="font-sans text-xs sm:text-sm text-[#a09fa6] leading-relaxed mb-6 font-light">
                        {activeDetails.bio}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 mb-6">
                        <span className="font-mono text-[9px] text-brand-outline uppercase tracking-wider font-bold mr-1">Centres d'intérêt :</span>
                        {activeDetails.hobbies.map((h, i) => (
                          <span key={i} className="text-[10px] font-semibold text-brand-gold bg-brand-gold/10 border border-brand-gold/20 px-2.5 py-1 rounded-full">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* SECURE VOTING GATEWAY SYSTEM */}
                    <div className="bg-[#121118] border border-brand-gold/20 rounded-2xl p-4 sm:p-6 text-left relative min-h-[300px] flex flex-col justify-between">
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
                      
                      {checkoutStep === "idle" && (
                        <div className="flex flex-col h-full justify-between gap-5">
                          <div>
                            <span className="font-mono text-[8.5px] font-bold tracking-[0.25em] text-brand-gold uppercase block mb-1">
                              PASSERELLE DE SOUTIEN SÉCURISÉE
                            </span>
                            <h3 className="font-display font-medium text-base sm:text-lg text-brand-ivory leading-tight mb-2 font-bold">
                              Exprimer votre Soutien Financier Officiel
                            </h3>
                            <p className="font-sans text-brand-outline text-[11px] leading-relaxed">
                              Une contribution permet d'ajouter d'importants votes au compteur de votre candidate et de valider un reçu d'enregistrement officiel.
                            </p>
                          </div>

                          {/* Free vote and Premium pack setup */}
                          <div className="space-y-4">
                            
                            {/* Notice Règlement Officiel du Scrutin - Payant & Illimité */}
                            <div className="bg-[#b38f00]/10 border border-brand-gold/30 rounded-xl p-4 flex gap-3.5 items-start">
                              <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0 border border-brand-gold/20">
                                <Crown className="w-5 h-5 fill-brand-gold/10" />
                              </div>
                              <div className="text-left">
                                <span className="font-mono text-[8px] text-brand-gold block font-black uppercase tracking-[0.2em] mb-1">REGLEMENT OFFICIEL</span>
                                <h4 className="font-display font-bold text-xs text-brand-ivory leading-tight uppercase">
                                  Votes Payants & Totalement Illimités
                                </h4>
                                <p className="font-sans text-[#a09fa6] text-[10.5px] leading-relaxed mt-1">
                                  Le vote de scrutin est <strong className="text-brand-gold font-bold">exclusivement payant</strong>. Il n'y a <strong className="text-brand-gold font-bold">aucune restriction de vote unique</strong> : vous pouvez soutenir votre candidate <strong className="text-brand-gold underline font-bold">des milliers de fois sans limite</strong> pour maximiser ses chances de victoire !
                                </p>
                              </div>
                            </div>

                            {/* Option 2: Premium votes packages */}
                            <div className="space-y-3.5">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[9px] text-brand-outline font-black uppercase tracking-wider">Paquets de Votes Payants :</span>
                                <div className="flex gap-1 bg-brand-bg/50 p-0.5 rounded-lg border border-brand-outline/15">
                                  <button
                                    onClick={() => { setCurrency("CDF"); setSelectedPack(""); }}
                                    className={`px-2 py-0.5 text-[9px] font-semibold rounded-md ${currency === "CDF" ? "bg-brand-gold text-black" : "text-brand-outline hover:text-brand-ivory"}`}
                                  >
                                    CDF
                                  </button>
                                  <button
                                    onClick={() => { setCurrency("USD"); setSelectedPack(""); }}
                                    className={`px-2 py-0.5 text-[9px] font-semibold rounded-md ${currency === "USD" ? "bg-brand-gold text-black" : "text-brand-outline hover:text-brand-ivory"}`}
                                  >
                                    USD
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {[
                                  { votes: "20", text: "Espoir" },
                                  { votes: "100", text: "Ambition" },
                                  { votes: "500", text: "Souverain" },
                                  { votes: "1000", text: "Triomphant" }
                                ].map((pack) => {
                                  const cdfValue = parseInt(pack.votes, 10) * 100;
                                  const usdValue = parseInt(pack.votes, 10) * 0.05;
                                  const formattedVal = currency === "CDF" ? `${cdfValue.toLocaleString()} CDF` : `${usdValue.toFixed(2)} USD`;
                                  return (
                                    <button
                                      key={pack.votes}
                                      onClick={() => setSelectedPack(pack.votes)}
                                      className={`p-2.5 rounded-xl border flex flex-col text-left justify-between transition-all cursor-pointer ${
                                        selectedPack === pack.votes
                                          ? "bg-brand-gold/15 border-brand-gold text-brand-gold"
                                          : "bg-brand-surface/20 border-brand-outline/15 hover:border-brand-outline/35"
                                      }`}
                                    >
                                      <span className="font-mono text-[8px] text-brand-outline uppercase block">{pack.text}</span>
                                      <span className="font-display font-black text-brand-ivory text-xs sm:text-sm mt-0.5">+{pack.votes} V</span>
                                      <span className="font-mono text-[9px] text-brand-gold/80 block mt-1">{formattedVal}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Operator and Phone configuration */}
                            {selectedPack && (
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-3 pt-2"
                              >
                                <div>
                                  <span className="font-mono text-[9px] text-brand-outline font-black uppercase block mb-1.5">Opérateur Mobile Money (Cliquez sur le logo) :</span>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                    {[
                                      { 
                                        id: "mpesa", 
                                        color: "border-red-600 bg-red-950/10 hover:bg-red-950/20 text-white", 
                                        logo: (
                                          <div className="flex flex-col items-center justify-center py-1 select-none">
                                            <div className="flex items-center leading-none">
                                              <span className="text-[#FF0000] font-black text-base tracking-tighter">m</span>
                                              <span className="text-[#00E676] font-black text-base tracking-tighter">-pesa</span>
                                            </div>
                                            <span className="text-[7px] text-zinc-400 font-mono tracking-widest font-bold uppercase leading-none mt-1">VODACOM</span>
                                          </div>
                                        )
                                      },
                                      { 
                                        id: "airtel", 
                                        color: "border-rose-600 bg-[#FF0000]/10 hover:bg-[#FF0000]/15 text-white", 
                                        logo: (
                                          <div className="flex flex-col items-center justify-center py-1 select-none">
                                            <div className="flex items-center justify-center bg-[#FF0000] w-5 h-5 rounded-full text-white font-black text-xs leading-none shadow-[0_2px_8px_rgba(255,0,0,0.3)]">
                                              a
                                            </div>
                                            <span className="text-[7px] text-zinc-400 font-mono tracking-widest font-bold uppercase leading-none mt-1.5">Airtel Money</span>
                                          </div>
                                        )
                                      },
                                      { 
                                        id: "orange", 
                                        color: "border-orange-500 bg-[#FF6600]/10 hover:bg-[#FF6600]/15 text-white", 
                                        logo: (
                                          <div className="flex flex-col items-center justify-center py-1 select-none gap-1">
                                            <div className="bg-[#FF6600] text-black font-extrabold text-[8px] px-1.5 py-0.5 rounded leading-none font-sans">
                                              ORANGE
                                            </div>
                                            <span className="text-[7px] text-zinc-400 font-mono tracking-widest font-bold uppercase leading-none">MONEY</span>
                                          </div>
                                        )
                                      },
                                      { 
                                        id: "africell", 
                                        color: "border-indigo-600 bg-indigo-950/10 hover:bg-indigo-950/15 text-white", 
                                        logo: (
                                          <div className="flex flex-col items-center justify-center py-1 select-none">
                                            <span className="text-[#b49cf5] font-black text-xs italic tracking-tighter leading-none">Africell</span>
                                            <span className="text-[7px] text-zinc-400 font-mono tracking-widest font-bold uppercase leading-none mt-1.5">RESEAU</span>
                                          </div>
                                        )
                                      }
                                    ].map((op) => (
                                      <button
                                        key={op.id}
                                        onClick={() => setSelectedOperator(op.id as any)}
                                        className={`p-3 rounded-xl border flex flex-col items-center justify-center cursor-pointer transition-all ${op.color} ${
                                          selectedOperator === op.id 
                                            ? "ring-2 ring-brand-gold ring-offset-2 ring-offset-[#0c0b10] border-transparent scale-[1.03] shadow-[0_4px_15px_rgba(242,195,91,0.15)] opacity-100" 
                                            : "opacity-80"
                                        }`}
                                      >
                                        {op.logo}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {selectedOperator && (
                                  <motion.div 
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col sm:flex-row gap-3.5 items-end justify-between bg-brand-bg/50 p-3 rounded-xl border border-brand-outline/15"
                                  >
                                    <div className="w-full flex-grow text-left">
                                      <label className="font-mono text-[8.5px] text-brand-outline uppercase block mb-1">Numéro de téléphone payeur :</label>
                                      <input 
                                        type="tel"
                                        value={voterPhone}
                                        onChange={(e) => setVoterPhone(e.target.value)}
                                        placeholder="0820000000"
                                        className="w-full bg-brand-surface/40 border border-brand-outline/30 focus:border-brand-gold rounded-lg px-3 py-1.5 font-mono text-xs sm:text-sm text-brand-ivory placeholder-brand-outline/40 leading-snug outline-none transition-all"
                                      />
                                    </div>

                                    <button
                                      type="button"
                                      disabled={!voterPhone.trim()}
                                      onClick={handleConfirmPaiement}
                                      className={`w-full sm:w-auto px-5 py-2.5 rounded-lg text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase transition-all shrink-0 cursor-pointer ${
                                        voterPhone.trim() 
                                          ? "gold-gradient-bg text-black hover:shadow-[0_0_12px_rgba(242,195,91,0.25)]" 
                                          : "bg-brand-outline/10 text-brand-outline/40 border border-brand-outline/10 cursor-not-allowed"
                                      }`}
                                    >
                                      Valider le Paiement
                                    </button>
                                  </motion.div>
                                )}

                              </motion.div>
                            )}

                          </div>
                        </div>
                      )}

                      {/* LOADING VIEW */}
                      {checkoutStep === "loading" && (
                        <div className="flex flex-col items-center justify-center py-10 text-center gap-4.5 my-auto w-full">
                          <Loader2 className="w-12 h-12 text-brand-gold animate-spin" />
                          <div className="space-y-1">
                            <h4 className="font-display font-semibold text-brand-ivory text-base tracking-wide">
                              Enregistrement du vote en cours...
                            </h4>
                            <p className="font-sans text-brand-outline text-xs max-w-sm mx-auto leading-relaxed">
                              Une requête de validation sécurisée a été envoyée à votre opérateur mobile <span className="uppercase font-bold text-brand-gold">{selectedOperator}</span> sur le numéro <span className="font-bold text-brand-ivory font-mono">{voterPhone}</span>.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* SUCCESS RECEIPT WINDOW VIEW */}
                      {checkoutStep === "success" && (
                        <div className="flex flex-col h-full justify-between gap-5 my-auto w-full">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center text-green-400 mx-auto mb-3.5 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                            </div>
                            <h3 className="font-display font-medium text-lg text-brand-ivory leading-tight mb-1 font-bold">
                              Soutien Réussi !
                            </h3>
                            <p className="font-sans text-brand-outline text-[10px] max-w-sm mb-3 leading-tight mx-auto">
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
                          </div>

                          <div className="flex flex-col gap-2 w-full mt-auto mb-2">
                            <button
                              type="button"
                              onClick={() => {
                                setCheckoutStep("idle");
                                setSelectedPack("");
                                setSelectedOperator(null);
                              }}
                              className="w-full py-2.5 rounded-xl text-[10px] font-mono font-bold tracking-widest uppercase bg-brand-surface hover:bg-brand-surface/80 text-brand-ivory border border-brand-outline/15 cursor-pointer text-center"
                            >
                              Faire un autre soutien
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const candidateInfo = CANDIDATES_LIST.find(c => c.id === selectedCandidateId);
                                if (candidateInfo) {
                                  generateReceiptPDF(
                                    candidateInfo.name,
                                    candidateInfo.number,
                                    tempVotesAdded,
                                    selectedOperator || "mpesa",
                                    voterPhone,
                                    currency,
                                    currentTxRef
                                  );
                                }
                              }}
                              className="w-full py-2.5 rounded-xl text-[10px] font-mono font-bold tracking-widest uppercase border border-brand-gold/30 hover:border-brand-gold text-brand-gold bg-brand-gold/5 flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" /> Télécharger Reçu PDF
                            </button>
                          </div>
                        </div>
                      )}

                    </div>

                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
