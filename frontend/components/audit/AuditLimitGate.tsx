"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, CheckCircle, FileText, Database, ShieldAlert, ArrowRight } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

interface AuditLimitGateProps {
  onUnlock?: () => void;
}

export const AuditLimitGate: React.FC<AuditLimitGateProps> = ({ onUnlock }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const benefits = [
    { title: "50 Free Monthly Credits", desc: "Automated monthly credit replenishment for continuous audits." },
    { title: "Admissible Evidence Vault", desc: "SHA-256 cryptographic chain of custody for all audited files." },
    { title: "Admissible PDF Exports", desc: "Courtroom & board-ready tamper-evident forensic certificates." },
    { title: "Case File Management", desc: "Group multiple evidence logs into organized investigation cases." },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative my-8 border border-amber-signal/30 bg-[#070b19] p-8 text-center rounded-none shadow-[0_0_30px_rgba(245,158,11,0.1)] font-sans"
      >
        <div className="absolute top-0 right-0 px-3 py-1 bg-amber-signal text-black font-mono text-[9px] font-bold uppercase tracking-widest">
          // GUEST LIMIT REACHED
        </div>

        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-amber-signal/40 bg-amber-signal/10 text-amber-signal rounded-none shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <ShieldAlert size={28} />
        </div>

        <h3 className="text-2xl font-black text-white uppercase tracking-tight font-geist mb-2">
          Unlock Complete <span className="text-amber-signal">Forensic Intelligence</span>
        </h3>
        <p className="max-w-xl mx-auto text-xs text-slate-400 font-mono mb-8">
          You have completed your complimentary guest analysis. Create a free account to unlock your full detailed report, claim 50 free monthly credits, and access the Evidence Vault.
        </p>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8 text-left">
          {benefits.map((b, i) => (
            <div key={i} className="p-4 border border-deepslate bg-obsidian rounded-none flex items-start gap-3">
              <CheckCircle size={16} className="text-amber-signal shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white font-geist uppercase">{b.title}</h4>
                <p className="text-[10px] text-slate-400 font-sans mt-0.5 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowAuthModal(true)}
          className="btn-switch-primary text-xs"
        >
          <div className="led-indicator" />
          <span>Claim 50 Free Credits & Unlock Report</span>
          <ArrowRight size={14} />
        </button>

        <p className="mt-4 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
          No credit card required • Instant 30-second activation
        </p>
      </motion.div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="signup"
        callbackUrl="/onboarding"
      />
    </>
  );
};
