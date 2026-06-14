import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Heart, Check, Users, Sparkles, Trophy } from "lucide-react";
import { CANDIDATES_LIST, REWARDS_INFO } from "../data";

export default function Candidates() {
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

  const [hasVotedFor, setHasVotedFor] = useState<string | null>(() => {
    return localStorage.getItem("voted_for");
  });

  const [activeTab, setActiveTab] = useState<"all" | "kinshasa" | "lubumbashi">("all");
  const [celebrateVoteId, setCelebrateVoteId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("candidate_votes", JSON.stringify(votes));
  }, [votes]);

  const handleVote = (candidateId: string) => {
    if (hasVotedFor) return; // Only allow one vote per session for prestige simulation

    setVotes(prev => ({
      ...prev,
      [candidateId]: prev[candidateId] + 1
    }));
    setHasVotedFor(candidateId);
    localStorage.setItem("voted_for", candidateId);

    // Trigger visual pop animation for the voted candidate card
    setCelebrateVoteId(candidateId);
    setTimeout(() => {
      setCelebrateVoteId(null);
    }, 2000);
  };

  const filteredCandidates = CANDIDATES_LIST.filter(c => {
    if (activeTab === "all") return true;
    return c.province.toLowerCase() === activeTab;
  });

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

        {/* Candidates Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-28">
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
                className={`glass-panel rounded-2xl overflow-hidden flex flex-col justify-between hover:border-brand-gold/40 hover:shadow-[0_15px_30px_rgba(242,195,91,0.08)] bg-gradient-to-b from-brand-surface to-brand-surface/75 group border relative transition-all duration-300 ${
                  isVoted ? "border-brand-gold/45 shadow-[0_0_20px_rgba(242,195,91,0.15)]" : ""
                }`}
              >
                {/* Voting badge on top left */}
                <div className="absolute top-3 left-3 z-20 bg-black/70 backdrop-blur-md border border-brand-outline/15 text-brand-gold text-[9px] font-mono tracking-widest uppercase py-1 px-2.5 rounded-full font-bold">
                  {cand.province}
                </div>

                {/* Candidate Number on top right */}
                <div className="absolute top-3 right-3 z-20 bg-brand-gold/20 backdrop-blur-md border border-brand-gold/30 text-brand-gold text-[9px] font-mono tracking-widest py-1 px-2.5 rounded-full font-bold">
                  {cand.number}
                </div>

                {/* Portrait Picture Wrapper with arched mask feel as requested by visual guidelines */}
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
                        <Heart className="w-12 h-12 text-brand-gold animate-ping absolute" />
                        <Heart className="w-12 h-12 text-brand-gold fill-brand-gold" />
                        <span className="font-mono text-[9px] font-black tracking-widest text-brand-gold uppercase mt-2">
                          VOTE ENREGISTRÉ
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Stats and text panel */}
                <div className="p-4 flex flex-col text-left justify-between flex-grow">
                  <div className="mb-3.5">
                    <h3 className="font-display font-semibold text-sm text-brand-ivory group-hover:text-brand-gold transition-colors leading-tight">
                      {cand.name}
                    </h3>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-brand-outline mt-1 font-medium">
                      <Users className="w-3 h-3 text-brand-gold" />
                      <span>{votesCount.toLocaleString()} votes</span>
                    </div>
                  </div>

                  {/* Interactive Client-voter trigger */}
                  <button
                    onClick={() => handleVote(cand.id)}
                    disabled={hasVotedFor !== null}
                    className={`w-full py-2 rounding-lg text-[9px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer text-center ${
                      isVoted
                        ? "bg-brand-gold/15 border border-brand-gold/30 text-brand-gold cursor-default"
                        : hasVotedFor !== null
                        ? "bg-brand-bg/40 border border-brand-outline/10 text-brand-outline/50 cursor-not-allowed"
                        : "bg-brand-surface hover:bg-brand-gold/10 border border-brand-outline/25 hover:border-brand-gold text-brand-ivory hover:text-brand-gold"
                    }`}
                  >
                    {isVoted ? (
                      <span className="flex items-center justify-center gap-1 justify-self-center">
                        <Check className="w-3 h-3" /> Votée
                      </span>
                    ) : (
                      "Voter"
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

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
