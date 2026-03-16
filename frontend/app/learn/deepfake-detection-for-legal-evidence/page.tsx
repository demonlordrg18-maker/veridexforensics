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
    <h2 className="text-2xl font-black text-white uppercase tracking-tight">{title}</h2>
    <div className="text-slate-400 leading-relaxed space-y-4">
      {children}
    </div>
  </div>
);

export default function LegalDeepfakeArticle() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Article Header */}
      <section className="pt-32 pb-20 px-4 md:px-12 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <Link href="/learn" className="inline-flex items-center gap-2 text-xs font-bold text-teal-500 uppercase tracking-widest mb-12 hover:underline">
            <ArrowLeft size={14} /> Back to Knowledge Hub
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-[10px] font-black text-teal-400 border border-teal-500/20 mb-8 uppercase tracking-[0.3em]">
            Technical Guide: Legal Forensics
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight leading-tight">
            Deepfake Detection for <br /><span className="text-gradient">Legal Evidence.</span>
          </h1>
          <div className="flex items-center gap-6 text-slate-500 text-sm font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
               <Gavel size={16} /> Legal Workflow
            </div>
            <div className="flex items-center gap-2">
               <Clock size={16} /> 8 Min Read
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-24 px-4 md:px-12">
        <div className="max-w-4xl mx-auto">
          
          <div className="glass p-8 rounded-[2rem] border border-amber-500/20 bg-amber-500/[0.02] mb-16 flex flex-col md:flex-row gap-8 items-center">
             <Scale className="text-amber-500 shrink-0" size={48} />
             <p className="text-sm text-slate-300 font-medium leading-relaxed italic border-l border-white/10 pl-8">
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

          <div className="grid md:grid-cols-2 gap-8 mb-20">
             <div className="glass p-8 rounded-3xl border border-white/5 bg-slate-950/50">
                <Fingerprint className="text-teal-500 mb-6" size={32} />
                <h4 className="font-bold text-white mb-4">Signal-Based Auditing</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Detection relies on 'Spectral Anomalies'—mathematical inconsistencies in audio frequencies or pixel arrangements that signify machine generation.
                </p>
             </div>
             <div className="glass p-8 rounded-3xl border border-white/5 bg-slate-950/50">
                <Database className="text-teal-500 mb-6" size={32} />
                <h4 className="font-bold text-white mb-4">Chain of Custody</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Cryptographic hashing (SHA-256) ensures that once an asset is audited, its state is frozen and registered on a forensic ledger.
                </p>
             </div>
          </div>

          <ContentSection title="2. Identifying High-Risk Markers">
            <p>
              When reviewing a digital asset, legal teams should look for several core forensic signals that often indicate synthetic origin:
            </p>
            <ul className="list-disc pl-6 space-y-4 pt-4">
              <li><span className="text-white font-bold">Spectral Gaps:</span> Frequent in voice clones where certain natural audio frequencies are missing or 'flattened.'</li>
              <li><span className="text-white font-bold">Frame Boundary Jitter:</span> Facial boundaries in video deepfakes often show slight temporal instability when analyzed frame-by-frame.</li>
              <li><span className="text-white font-bold">Metadata Erasure:</span> While not proof of synthesis, the absence of original camera/device metadata in a core exhibit is a primary risk flag.</li>
            </ul>
          </ContentSection>

          <div className="bg-slate-900 border border-white/10 p-10 rounded-[2.5rem] mb-20 relative overflow-hidden">
             <div className="absolute top-0 right-0 h-40 w-40 bg-teal-500/5 blur-[80px]" />
             <h4 className="text-xl font-bold text-white mb-6">Workflow Recommendation</h4>
             <div className="space-y-6">
                {[
                  "Intake screening of all digital audio/video early in the discovery phase.",
                  "Generation of a standard Forensic Evidence Trail for every client exhibit.",
                  "Registration of exhibit hashes on a private ledger for auditability.",
                  "Combining probabilistic signals with traditional provenance investigation."
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="h-6 w-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-black text-[10px] shrink-0">{i+1}</div>
                    <p className="text-sm text-slate-400">{step}</p>
                  </div>
                ))}
             </div>
          </div>

          <ContentSection title="3. The Stance of Probabilistic Truth">
             <p>
               It is critical for legal counsel to understand that forensic tools provide *signals*, not judicial finality. A '98% risk' score is a powerful indicator for internal review or to support a motion for expert witness appointment, but it is not a courtroom judgment in itself. 
             </p>
             <Link href="/limitations" className="text-xs font-bold text-teal-500 uppercase tracking-widest hover:underline flex items-center gap-2">
                Review Legal Limitations <ArrowRight size={14} />
             </Link>
          </ContentSection>

          {/* Social Links / Related */}
          <div className="pt-16 border-t border-white/5 mt-32">
             <div className="flex flex-col md:flex-row justify-between gap-8">
                <div>
                   <h5 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">Related Solutions</h5>
                   <Link href="/solutions/legal-teams" className="text-xl font-black text-white hover:text-teal-400 transition-colors flex items-center gap-2">
                      Legal Exhibit Screening <ChevronRight size={20} />
                   </Link>
                </div>
                <div className="flex gap-4 items-center">
                   <Link href="/request-demo" className="btn-primary px-8 py-3">Book Walkthrough</Link>
                </div>
             </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
