"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../../components/Navigation";
import { 
  ArrowLeft, 
  Gavel, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  ChevronRight,
  Info,
  Scale,
  Database,
  Layers,
  Fingerprint
} from "lucide-react";
import Link from "next/link";

const ContentSection = ({ title, children }: any) => (
  <div className="space-y-6 mb-16">
    <h2 className="text-2xl font-black text-white uppercase tracking-tight font-geist">{title}</h2>
    <div className="text-slate-400 leading-relaxed space-y-4 font-sans text-sm text-justify">
      {children}
    </div>
  </div>
);

export default function LegalDeepfakeArticle() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      
      {/* Article Header */}
      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/learn" className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-amber-signal uppercase tracking-widest mb-12 hover:underline">
            <ArrowLeft size={12} /> [ Back to Knowledge Hub ]
          </Link>
          <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none mb-8">
            // TECHNICAL GUIDE // LEGAL FORENSICS
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight font-geist uppercase">
            Deepfake Detection for <br /><span className="text-amber-signal">Legal Evidence.</span>
          </h1>
          <div className="flex items-center gap-6 text-slate-500 text-xs font-mono font-bold uppercase tracking-widest border-t border-deepslate pt-6">
            <div className="flex items-center gap-2">
               <Gavel size={14} className="text-amber-signal" /> Legal Workflow
            </div>
            <div className="flex items-center gap-2">
               <Clock size={14} className="text-amber-signal" /> 8 Min Read
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="max-w-4xl mx-auto">
          
          <div className="border border-amber-signal/20 bg-[#070b19]/30 p-8 rounded-none mb-16 flex flex-col md:flex-row gap-8 items-center relative">
             <div className="absolute top-0 left-0 w-1 h-full bg-amber-signal" />
             <Scale className="text-amber-signal shrink-0" size={36} />
             <p className="text-xs text-slate-300 font-medium leading-relaxed italic border-l border-deepslate pl-8 font-sans">
               "The authentication of digital media is no longer a matter of checking file metadata. In the age of generative AI, the evidence itself must be audited for synthetic anomalies."
             </p>
          </div>

          <ContentSection title="1. The Evidentiary Challenge">
            <p>
              Traditional standards of authentication (such as FRE 901) are being tested by the emergence of high-assurance 'Deepfake' content. Voice cloning and facial insertion models can now produce artifacts that are indistinguishable to the human ear and eye.
            </p>
            <p>
              For legal teams, the challenge is twofold: verifying the authenticity of their own exhibits and effectively challenging the authenticity of opposing exhibits that appear suspicious.
            </p>
          </ContentSection>

          <div className="grid md:grid-cols-2 gap-8 mb-20 font-mono text-[11px]">
             <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
                <Fingerprint className="text-amber-signal mb-6" size={24} />
                <h4 className="font-bold text-white mb-4 font-geist uppercase text-xs">// Signal-Based Auditing</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                  Detection relies on 'Spectral Anomalies'—mathematical inconsistencies in audio frequencies or pixel arrangements that signify machine generation.
                </p>
             </div>
             <div className="border border-deepslate bg-[#030712] p-8 rounded-none relative">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
                <Database className="text-amber-signal mb-6" size={24} />
                <h4 className="font-bold text-white mb-4 font-geist uppercase text-xs">// Chain of Custody</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed font-sans">
                  Cryptographic hashing (SHA-256) ensures that once an asset is audited, its state is frozen and registered on a forensic ledger.
                </p>
             </div>
          </div>

          <ContentSection title="2. Identifying High-Risk Markers">
            <p>
              When reviewing a digital asset, legal teams should look for several core forensic signals that often indicate synthetic origin:
            </p>
            <ul className="list-disc pl-6 space-y-4 pt-4 font-sans text-sm text-slate-400">
              <li><span className="text-white font-bold">Spectral Gaps:</span> Frequent in voice clones where certain natural audio frequencies are missing or 'flattened.'</li>
              <li><span className="text-white font-bold">Frame Boundary Jitter:</span> Facial boundaries in video deepfakes often show slight temporal instability when analyzed frame-by-frame.</li>
              <li><span className="text-white font-bold">Metadata Erasure:</span> While not proof of synthesis, the absence of original camera/device metadata in a core exhibit is a primary risk flag.</li>
            </ul>
          </ContentSection>

          <div className="border border-deepslate bg-[#030712] p-10 rounded-none mb-20 relative overflow-hidden font-mono text-[11px]">
             <div className="absolute top-0 left-0 right-0 h-[1px] bg-deepslate" />
             <h4 className="text-sm font-bold text-white uppercase mb-6 font-geist tracking-wide">// Workflow Recommendation</h4>
             <div className="space-y-6">
                {[
                  "Intake screening of all digital audio/video early in the discovery phase.",
                  "Generation of a standard Forensic Evidence Trail for every client exhibit.",
                  "Registration of exhibit hashes on a private ledger for auditability.",
                  "Combining probabilistic signals with traditional provenance investigation."
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="h-6 w-6 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal font-bold text-[10px] shrink-0 rounded-none">{i+1}</div>
                    <p className="text-[11px] text-slate-400 font-sans mt-0.5">{step}</p>
                  </div>
                ))}
             </div>
          </div>

          <ContentSection title="3. The Stance of Probabilistic Truth">
             <p>
               It is critical for legal counsel to understand that forensic tools provide *signals*, not judicial finality. A '98% risk' score is a powerful indicator for internal review or to support a motion for expert witness appointment, but it is not a courtroom judgment in itself. 
             </p>
             <div className="pt-2 font-mono text-[10px]">
               <Link href="/limitations" className="font-bold text-amber-signal uppercase tracking-widest hover:underline flex items-center gap-2">
                  [ Review Legal Limitations ] <ArrowRight size={12} />
               </Link>
             </div>
          </ContentSection>

          {/* Related */}
          <div className="pt-16 border-t border-deepslate mt-32 font-mono text-[11px]">
             <div className="flex flex-col md:flex-row justify-between gap-8">
                <div>
                   <h5 className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-4">// Related Solutions</h5>
                   <Link href="/solutions/legal-teams" className="text-xl font-bold text-white hover:text-amber-signal transition-colors flex items-center gap-2 font-geist uppercase">
                      Legal Exhibit Screening <ChevronRight size={16} />
                   </Link>
                </div>
                <div className="flex gap-4 items-center">
                   <Link href="/request-demo" className="btn-switch-primary">Book Walkthrough</Link>
                </div>
             </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
