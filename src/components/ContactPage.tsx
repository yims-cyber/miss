import React from "react";
import { Mail, MapPin, Phone, MessageCircle, Send, Facebook, Instagram, ChevronRight } from "lucide-react";

export default function ContactPage() {
  return (
    <section className="min-h-screen pt-28 sm:pt-36 bg-[#FAF8F5] text-neutral-900 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* Banner */}
        <div className="text-center mb-16 px-4 md:px-0">
          <p className="font-mono text-xs text-brand-gold-dark tracking-[0.2em] uppercase font-bold mb-3 bg-brand-gold/10 inline-block px-4 py-1 rounded-full">• NOUS CONTACTER</p>
          <h1 className="font-display text-5xl md:text-6xl text-neutral-900 mb-6">Restons en <span className="text-brand-gold-dark italic">Contact</span></h1>
          <p className="text-neutral-600 max-w-lg mx-auto">Pour toute question relative au concours, notre équipe est disponible et prête à vous répondre.</p>
        </div>

        {/* Contact Methods */}
        <div className="mb-20">
            <p className="text-center font-mono text-[10px] text-neutral-400 tracking-[0.2em] uppercase font-bold mb-6">— COORDONNÉES OFFICIELLES —</p>
            <h2 className="text-center font-display text-3xl mb-12">Comment nous <span className="text-brand-gold-dark italic">joindre</span></h2>
            
            <div className="grid md:grid-cols-3 gap-6">
                {[
                    { icon: Phone, title: "TÉLÉPHONE", value: "+243 978 889 953", action: "Appeler →" },
                    { icon: Mail, title: "EMAIL", value: "lesgenies1989@gmail.com", action: "Écrire →" },
                    { icon: MapPin, title: "ADRESSE", value: "Av. Bongolo N°14\nKalamu, Kinshasa", action: null }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center text-brand-gold-dark mb-6">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h4 className="font-sans text-[10px] font-bold text-neutral-400 tracking-wider mb-2">{item.title}</h4>
                        <p className="text-lg font-bold mb-4 whitespace-pre-line">{item.value}</p>
                        {item.action && <a href="#" className="text-brand-gold-dark font-bold text-sm tracking-wide">{item.action}</a>}
                    </div>
                ))}
            </div>

            {/* WhatsApp Card */}
            <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-brand-gold/30 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex gap-4 items-center">
                         <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold">WhatsApp Business</h4>
                            <p className="text-xs text-neutral-500">+243 839 736 083 • Réponse rapide</p>
                        </div>
                    </div>
                    <div className="flex-1 w-full flex flex-col gap-4">
                        <textarea className="w-full p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-sm focus:border-brand-gold-dark outline-none" rows={3} defaultValue="Bonjour, je souhaite obtenir des informations sur le concours Miss National DRC..."></textarea>
                        <button className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg font-bold text-sm hover:bg-green-600 transition-colors">
                            <MessageCircle className="w-4 h-4" /> Écrire sur WhatsApp
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-8">
                 {[Facebook, Instagram].map((Icon, i) => (
                    <div key={i} className="px-6 py-2 rounded-full border border-neutral-200 flex items-center gap-2 hover:bg-neutral-100 transition-colors cursor-pointer text-sm font-bold">
                        <Icon className="w-4 h-4" /> {i === 0 ? "Facebook" : "Instagram"}
                    </div>
                ))}
            </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-6xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-neutral-100 grid md:grid-cols-2 gap-12">
             <div>
                <p className="font-mono text-[10px] text-neutral-400 tracking-[0.2em] uppercase font-bold mb-4">— FORMULAIRE DE CONTACT —</p>
                <h3 className="font-display text-4xl mb-6">Envoyez-nous <br/>un <span className="text-brand-gold-dark italic">message</span></h3>
                <p className="text-neutral-600 text-sm mb-10">Pour les demandes de partenariat, d'informations ou toute autre question, utilisez ce formulaire. Nous vous répondons sous 48 heures ouvrables.</p>
                
                <div className="space-y-6">
                    {[
                        { title: "DIRECTEUR NATIONAL", value: "Prosper Katenda" },
                        { title: "DÉLAI DE RÉPONSE", value: "Sous 48 heures ouvrables" },
                        { title: "CONFIDENTIALITÉ", value: "Vos données sont protégées" }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4 items-center">
                            <div className="text-brand-gold-dark"><Mail className="w-5 h-5" /></div>
                            <div>
                                <h4 className="font-sans text-[10px] font-bold text-neutral-400 tracking-wider mb-0.5">{item.title}</h4>
                                <p className="text-sm font-bold">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
             </div>

             <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">NOM COMPLET *</label>
                        <input type="text" placeholder="Votre nom complet" className="w-full p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-sm focus:border-brand-gold-dark outline-none transition-colors" />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">EMAIL *</label>
                        <input type="email" placeholder="votre@email.com" className="w-full p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-sm focus:border-brand-gold-dark outline-none transition-colors" />
                    </div>
                </div>
                
                <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">SUJET *</label>
                    <select className="w-full p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-sm focus:border-brand-gold-dark outline-none transition-colors text-neutral-500">
                        <option>Sélectionner un sujet...</option>
                        <option>Partenariat</option>
                        <option>Autre</option>
                    </select>
                </div>

                <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-2">MESSAGE *</label>
                    <textarea rows={5} placeholder="Décrivez votre demande en détail..." className="w-full p-4 rounded-lg bg-neutral-50 border border-neutral-200 text-sm focus:border-brand-gold-dark outline-none transition-colors" />
                </div>

                <button type="submit" className="w-full py-4 rounded-lg bg-neutral-900 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all">
                    Envoyer le message <Send className="w-4 h-4" />
                </button>
             </form>
        </div>
      </div>
    </section>
  );
}
