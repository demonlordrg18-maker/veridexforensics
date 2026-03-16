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
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 md:px-12 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-[10px] font-black text-teal-400 border border-teal-500/20 mb-8 uppercase tracking-[0.3em]">
              Data Privacy
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
              Privacy & Forensic <br /><span className="text-gradient">Data Integrity.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
              We understand the sensitive nature of forensic audits. Our privacy model is designed for newsrooms, legal teams, and high-assurance professionals.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 md:px-12">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="grid md:grid-cols-2 gap-12 border-b border-white/5 pb-16">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6">
                <Lock size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Encryption at Rest</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                All uploaded assets are encrypted using industry-standard AES-256 protocols. Your data is protected from unauthorized access at every stage of the forensic lifecycle.
              </p>
            </div>
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6">
                <EyeOff size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Temporary Persistence</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Audited assets are temporarily retained only to complete analysis and generate the evidence trail. For enterprise users, we offer 'Zero-Persistence' configurations.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="space-y-6">
              <h4 className="text-2xl font-black text-white uppercase tracking-tight">1. Information We Collect</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                We collect diagnostic data to improve forensic engine accuracy, including file types, metadata footprints, and spectral anomalies. We do not sell your data to third-party brokers.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl font-black text-white uppercase tracking-tight">2. Use of Forensic Data</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your uploaded content is used exclusively for the generation of the audit report. We may use anonymized Signal Data to train our local detection heuristics, but your original assets are never shared.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl font-black text-white uppercase tracking-tight">3. Immutable Ledger Transparency</h4>
              <p className="text-sm text-slate-400 leading-relaxed border-l-2 border-teal-500 pl-6 italic">
                Note: SHA-256 hashes of audited assets are registered on our Transparency Ledger for chain-of-custody. A hash is a one-way cryptographic fingerprint; it does not reveal the content of the asset but proves its forensic state at a specific point in time.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="text-2xl font-black text-white uppercase tracking-tight">4. Enterprise Control</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Enterprise users have complete control over data retention policies, including immediate purging of all assets and diagnostic logs post-audit.
              </p>
            </div>

            <div className="pt-12 border-t border-white/5">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">
                Last Updated: March 2026. For specific security inquiries, contact security@veridex.internal
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
