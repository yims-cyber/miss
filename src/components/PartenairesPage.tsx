import React from "react";
import { Star, Award, Check, Users, Globe, ChevronRight, Phone, Quote } from "lucide-react";

export default function PartenairesPage() {
  return (
    <section className="min-h-screen pt-24 bg-[#09080d] text-brand-ivory pb-20">
      {/* Banner */}
      <div className="relative h-[600px] flex items-center justify-center text-center px-4">
        <div className="absolute inset-0 bg-neutral-900/60" />
        <div className="relative z-10">
          <Star className="w-12 h-12 text-brand-gold mx-auto mb-6" />
          <p className="font-mono text-xs text-brand-gold tracking-[0.2em] uppercase font-bold mb-3">— DOSSIER DE PARTENARIAT & SPONSORING —</p>
          <h1 className="font-display text-5xl md:text-6xl text-brand-ivory mb-6 italic">Miss Nationale <span className="text-brand-gold">DRC</span><br/>2026</h1>
          <p className="text-neutral-300 max-w-sm mx-auto mb-8">Ensemble, révélons l'excellence féminine congolaise et portons haut les couleurs de la RDC sur la scène internationale.</p>
          <div className="flex gap-4 justify-center">
            <button className="bg-brand-gold text-black px-5 py-2 rounded-full font-bold text-xs">Découvrir le projet</button>
            <button className="border border-brand-outline text-brand-ivory px-5 py-2 rounded-full font-bold text-xs">Devenir partenaire</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
         {/* Stats */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-b border-brand-outline/20 pb-12">
            {[
                { label: "PROVINCES", value: "26" },
                { label: "LAURÉATES", value: "5+" },
                { label: "CONCOURS INTERNATIONAUX", value: "10+" },
                { label: "NIVEAUX DE PARTENARIAT", value: "3" },
            ].map((stat, i) => (
                <div key={i} className="text-center">
                    <p className="font-serif text-4xl font-light text-brand-gold mb-2">{stat.value}</p>
                    <p className="text-[10px] tracking-[0.2em] font-bold text-brand-outline uppercase">{stat.label}</p>
                </div>
            ))}
         </div>

         {/* Le Projet */}
         <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
                 <p className="font-mono text-[10px] text-brand-gold tracking-[0.2em] uppercase font-bold mb-3">— LE PROJET —</p>
                 <h2 className="font-display text-4xl mb-6">Une plateforme <span className="text-brand-gold italic">d'excellence</span></h2>
                 <p className="text-neutral-400 text-sm leading-relaxed mb-6">Miss Nationale DRC est bien plus qu'un concours de beauté. C'est un tremplin pour révéler des talents féminins d'exception et positionner la République Démocratique du Congo sur la scène internationale à travers des représentantes compétentes, élégantes et engagées.</p>
                 <p className="text-neutral-400 text-sm leading-relaxed">En tant que partenaire, vous bénéficiez d'une visibilité nationale et internationale, d'un accès privilégié aux événements et d'une association prestigieuse avec l'excellence congolaise.</p>
            </div>
            <div className="space-y-4">
                {[
                    { icon: Globe, title: "Visibilité nationale & internationale", desc: "Présence sur l'ensemble des supports médiatiques, réseaux sociaux et événements officiels." },
                    { icon: Users, title: "Accès à un public diversifié", desc: "Touchez des millions de Congolais à travers les 26 provinces et la diaspora internationale." },
                    { icon: Award, title: "Impact social & RSE", desc: "Associez votre marque à l'autonomisation des femmes et au rayonnement culturel de la RDC." }
                ].map((item, i) => (
                    <div key={i} className="bg-white/5 p-6 rounded-xl flex gap-4">
                        <div className="text-brand-gold"><item.icon className="w-6 h-6" /></div>
                        <div>
                            <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-neutral-400">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
         </div>

         {/* Portée Mondiale - Placeholder for image */}
         <div className="mb-20">
            <p className="font-mono text-[10px] text-brand-gold tracking-[0.2em] uppercase font-bold mb-3">— PORTÉE MONDIALE —</p>
            <div className="grid md:grid-cols-2 gap-8 items-center bg-white/5 p-8 rounded-2xl">
                <div className="h-64 bg-neutral-800 rounded-xl flex items-center justify-center">Image Placeholder</div>
                <div>
                     <p className="font-mono text-[10px] text-brand-gold tracking-[0.2em] uppercase font-bold mb-3">OPPORTUNITÉS INTERNATIONALES</p>
                     <h3 className="font-display text-3xl mb-4">Miss Nationale DRC</h3>
                     <p className="font-bold text-sm mb-6">RAYONNEMENT MONDIAL • +10 CONCOURS</p>
                     <p className="text-neutral-400 text-sm mb-6">Nos lauréates participent aux concours internationaux les plus prestigieux : Miss World, Miss Universe, Miss Supranational, Miss Grand International, Miss Earth, Miss Africa et bien d'autres.</p>
                </div>
            </div>
         </div>

         {/* Ce qu'ils disent */}
         <div className="text-center mb-20 bg-white/5 p-12 rounded-3xl">
             <Quote className="w-10 h-10 text-brand-gold mx-auto mb-6" />
             <p className="font-serif text-lg italic max-w-2xl mx-auto mb-6">"Miss Nationale DRC incarne l'excellence et la diversité de la femme congolaise. En tant que partenaire, nous sommes fiers de contribuer à cette plateforme qui révèle des talents et promet une image positive de notre pays à l'international."</p>
             <p className="font-bold italic">Comité Miss Nationale DRC</p>
             <p className="text-xs text-neutral-500">Organisateur - Édition 2026</p>
         </div>

         {/* Niveaux de Partenariat */}
         <div className="text-center mb-12">
             <p className="font-mono text-[10px] text-brand-gold tracking-[0.2em] uppercase font-bold mb-3">— PACKS DE PARTENARIAT —</p>
             <h2 className="font-display text-4xl">Niveaux de <span className="text-brand-gold italic">Partenariat</span></h2>
         </div>

         <div className="grid md:grid-cols-3 gap-6 mb-20">
            {[
                { title: "Platine", type: "Sur mesure", features: ["Logo principal sur tous les supports", "Stand VIP lors de la soirée finale", "Allocution lors de la cérémonie officielle", "Couverture médiatique premium", "20 invitations VIP soirée de gala"], price: "Devis personnalisé" },
                { title: "Or", type: "LE PLUS POPULAIRE", features: ["Logo sur les supports principaux", "Espace partenaire dédié à la finale", "10 invitations VIP"], price: "Sur demande" },
                { title: "Argent", type: "Accessible", features: ["Logo sur certains supports", "5 invitations VIP", "Mention réseaux sociaux"], price: "Sur demande" }
            ].map((pack, i) => (
                <div key={i} className={`p-8 rounded-2xl border ${i === 1 ? "bg-white text-black" : "bg-neutral-900 border-neutral-800"}`}>
                    <p className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-2">{pack.type}</p>
                    <h3 className="text-2xl font-bold mb-1">{pack.title}</h3>
                    <p className="text-xs mb-6 opacity-70">{pack.price}</p>
                    <ul className="space-y-4 mb-8">
                        {pack.features.map((f, j) => <li key={j} className="text-xs flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> {f}</li>)}
                    </ul>
                    <button className={`w-full py-3 rounded-lg font-bold text-xs ${i === 1 ? "bg-black text-white" : "bg-brand-gold text-black"}`}>DEVENIR PARTENAIRE</button>
                </div>
            ))}
         </div>

         {/* Final Banner */}
         <div className="bg-gradient-to-r from-neutral-900 to-black p-12 rounded-3xl text-center border border-neutral-800">
            <p className="font-mono text-[10px] text-brand-gold tracking-[0.2em] uppercase font-bold mb-3">— PRÊT À VOUS ENGAGER ? —</p>
            <h2 className="text-3xl font-display mb-6">Rejoignez l'aventure MISS NATIONALE DRC</h2>
            <p className="text-neutral-300 text-sm max-w-lg mx-auto mb-8">Associez votre marque à l'excellence et à l'élégance. Contactez-nous pour découvrir nos offres de partenariat et de sponsoring sur mesure.</p>
            <div className="flex gap-4 justify-center">
                <button className="bg-brand-gold text-black px-5 py-2 rounded-full font-bold text-xs flex items-center gap-2">Devenir Partenaire <ChevronRight className="w-4 h-4"/></button>
                <button className="border border-brand-outline text-brand-ivory px-5 py-2 rounded-full font-bold text-xs flex items-center gap-2"><Phone className="w-4 h-4"/> Appeler</button>
             </div>
         </div>
      </div>
    </section>
  );
}

