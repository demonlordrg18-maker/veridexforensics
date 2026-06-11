"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../components/Navigation";
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  FileText,
  Server,
  UserCheck
} from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none">
              // DATA PRIVACY COMPLIANCE
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight font-geist uppercase">
              Privacy & Forensic <br /><span className="text-amber-signal">Data Integrity.</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed font-sans max-w-2xl">
              We understand the sensitive nature of forensic audits. Our privacy model is designed for newsrooms, legal teams, and high-assurance professionals.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="grid md:grid-cols-2 gap-12 border-b border-deepslate pb-16 font-mono text-[11px]">
            <div className="space-y-4">
              <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal rounded-none">
                <Lock size={18} />
              </div>
              <h3 className="text-lg font-bold text-white font-geist uppercase">// Encryption at Rest</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans text-justify">
                All uploaded assets are encrypted using industry-standard AES-256 protocols. Your data is protected from unauthorized access at every stage of the forensic lifecycle.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal rounded-none">
                <EyeOff size={18} />
              </div>
              <h3 className="text-lg font-bold text-white font-geist uppercase">// Zero Persistence Option</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans text-justify">
                Audited assets are temporarily retained only to complete analysis and generate the evidence trail. For enterprise users, we offer 'Zero-Persistence' configurations.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white uppercase font-geist tracking-wide">// 1. Information We Collect</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-sans text-justify">
                We collect diagnostic data to improve forensic engine accuracy, including file types, metadata footprints, and spectral anomalies. We do not sell your data to third-party brokers.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white uppercase font-geist tracking-wide">// 2. Use of Forensic Data</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-sans text-justify">
                Your uploaded content is used exclusively for the generation of the audit report. We may use anonymized Signal Data to train our local detection heuristics, but your original assets are never shared.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white uppercase font-geist tracking-wide">// 3. Immutable Ledger Transparency</h4>
              <div className="border border-amber-signal/20 bg-[#070b19]/30 p-6 rounded-none relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-signal" />
                <p className="text-xs text-slate-300 leading-relaxed font-sans text-justify">
                  <strong>Note:</strong> SHA-256 hashes of audited assets are registered on our Transparency Ledger for chain-of-custody. A hash is a one-way cryptographic fingerprint; it does not reveal the content of the asset but proves its forensic state at a specific point in time.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white uppercase font-geist tracking-wide">// 4. Enterprise Control</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-sans text-justify">
                Enterprise users have complete control over data retention policies, including immediate purging of all assets and diagnostic logs post-audit.
              </p>
            </div>

            <div className="pt-12 border-t border-deepslate font-mono text-[9px] text-slate-500 uppercase tracking-widest">
              Last Updated: March 2026. For specific security inquiries, contact security@veridex.internal
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
