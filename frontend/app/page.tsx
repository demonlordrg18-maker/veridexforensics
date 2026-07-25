"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Activity, 
  Database, 
  Lock, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  Terminal, 
  Fingerprint, 
  Cpu,
  ShieldCheck,
  Check,
  Search,
  CornerDownRight,
  FileText,
  AlertCircle
} from "lucide-react";
import { Navbar, Footer } from "../components/Navigation";
import { useState } from "react";
import { InteractiveDemo } from "../components/shared";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqSearch, setFaqSearch] = useState("");
  const [activeUseCase, setActiveUseCase] = useState<string>("osint");

  const faqs = [
    {
      question: "How does Veridex mathematically establish digital evidence confidence?",
      answer: "We bypass simple AI classifiers that search for surface patterns. Veridex conducts multi-layered signal analysis: tracking Sensor Pattern Noise (PRNU) anomalies for camera/video validation, spectral vocoder footprints for audio synthesis, and stylometric lexical skew for documents. All results are hashed and stamped on an immutable public/private ledger for legal discovery validation.",
      category: "Methodology"
    },
    {
      question: "Is Veridex admissible under court and legal standards?",
      answer: "Yes. Every forensic check produces a cryptographically signed SHA-256 PDF audit report. It maintains a secure Chain of Custody record verifying original file hashes, timestamps, and model states at the time of execution, satisfying key discovery disclosure requirements.",
      category: "Admissibility"
    },
    {
      question: "How does the Zero-Storage Policy prevent data leaks?",
      answer: "All digital evidence is processed within volatile RAM scan rooms. The moment analysis is finalized and the signed PDF report is compiled, the payload is immediately purged from RAM memory. We do not write files, images, or transcript data to permanent storage, conforming to strict SOC2 and GDPR guidelines.",
      category: "Privacy"
    },
    {
      question: "What are the limitations of the analysis?",
      answer: "We prioritize total transparency. In high-compression formats (e.g. social media audio, low-resolution WhatsApp video) or dark scenes, signal metrics degrade. These limitations are openly flagged inside the compiled report to prevent false positives.",
      category: "Limitations"
    }
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const useCases = [
    {
      id: "osint",
      title: "OSINT & Investigations",
      problem: "Anonymous source files and leaked media containing potential sensor modifications.",
      solution: "Extract sensor alignment profiles, mapping GPS timestamps and metadata structural consistency.",
      benefits: "Defensible proof of source camera authenticity and geolocation integrity.",
      features: "EXIF Parsing Engine, PRNU Sensor Noise Analysis",
      linkText: "Deploy OSINT Sandbox"
    },
    {
      id: "journalists",
      title: "Journalists & Newsrooms",
      problem: "Volatile leak streams, audio voice clones, and synthetic interview footage.",
      solution: "Analyze audio spectrograms to detect neural vocoder micro-silences and frequency anomalies.",
      benefits: "Rapid pre-broadcast verification, shielding newsrooms from reputational fallout.",
      features: "Acoustic Footprint Scanner, Deepfake Video Tracker",
      linkText: "Integrate Newsroom Node"
    },
    {
      id: "legal",
      title: "Legal & Discovery Teams",
      problem: "Authenticity disputes over digital contracts, audio statements, and electronic records.",
      solution: "Generate cryptographically signed, immutable chain of custody audit reports.",
      benefits: "Court-admissible discovery proof that stands up to adversarial verification.",
      features: "Immutable Ledger Seal, SHA-256 Validation Hash",
      linkText: "Provision Discovery Desk"
    },
    {
      id: "developers",
      title: "Enterprise Developers",
      problem: "Automating validation for user uploads, candidate voice profiles, and media portals.",
      solution: "High-speed, low-latency REST API executing complete multimodal auditing.",
      benefits: "Seamless integration with CRM, HR onboarding, and storage buckets under SOC2 security.",
      features: "REST API Endpoint, Zero-Storage RAM Buffer Integration",
      linkText: "Read SDK Documentation"
    }
  ];

  const activeUseCaseData = useCases.find(uc => uc.id === activeUseCase) || useCases[0];

  return (
    <div className="min-h-screen bg-obsidian text-slate-100 selection:bg-amber-signal selection:text-black font-sans overflow-x-hidden relative scanline-overlay">
      <Navbar />

      {/* Decorative Grid Overlay & Laser scanner */}
      <div className="absolute inset-y-0 left-12 w-[1px] bg-slate-900/40 pointer-events-none" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-slate-900/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Hero Section - Q1: What is Veridex? Q3: Can I see it working? */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:pt-40 lg:pb-28 border-b border-deepslate overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.015),transparent_70%)] -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Positioning & Answers to Core Value */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8 relative z-20">
            <div className="flex items-center gap-2 font-mono text-[9px] text-amber-signal uppercase tracking-[0.2em] border border-amber-signal/20 bg-[#0F172A] px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-none bg-amber-signal animate-pulse" />
              FORENSIC INTEL PLATFORM // DEFENSIBLE AUDITING
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05]"
            >
              Confidence in <br />
              <span className="font-mono font-normal tracking-wide text-amber-signal uppercase">[Digital Evidence]</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl font-normal"
            >
              Verify digital files, voice media, and document provenance with mathematical signals. Not vague AI classifiers or subjective scores—objective proof ready for discovery, journalism, and compliance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a href="#interactive-demo" className="btn-switch-primary py-4 px-8 text-center">
                <span className="led-indicator-amber" />
                Test Verification Chamber
              </a>
              <Link href="/reports" className="btn-switch-secondary py-4 px-8 text-center flex items-center justify-center gap-2">
                Browse Interactive Reports
                <ArrowRight size={12} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="font-mono text-[9px] text-slate-500 uppercase tracking-widest space-y-1"
            >
              <div>// Q1: What is Veridex? Digital Evidence Intelligence.</div>
              <div>// Q3: See it working instantly using the simulation module.</div>
            </motion.div>
          </div>

          {/* Right Column - Embedded Interactive Demo */}
          <div className="lg:col-span-5 w-full relative z-20" id="interactive-demo">
            <div className="border border-amber-500/20 bg-amber-500/5 p-4 mb-4 font-mono text-[10px] text-amber-signal text-center uppercase tracking-wider">
              [ Interactive Verification Simulator ]
            </div>
            <InteractiveDemo />
          </div>

        </div>
      </section>

      {/* Trust & Admissibility Banner - Q2: Why should I trust it? */}
      <section className="bg-gradient-to-r from-amber-signal/5 to-transparent border-b border-deepslate py-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-left font-mono">
          <div className="space-y-1">
            <div className="text-[10px] text-amber-signal font-bold tracking-widest">// DEFENSIBLE PROOF TIMELINE</div>
            <p className="text-xs text-slate-300">Every audit logs SHA-256 hashes onto a cryptographically verified ledger to prevent evidence spoofing.</p>
          </div>
          <Link href="/reports" className="text-[9px] font-bold uppercase tracking-wider text-slate-200 border border-slate-700 hover:border-amber-signal px-4 py-2 hover:bg-amber-signal hover:text-black transition-all">
            Inspect Signed Forensic Case &rarr;
          </Link>
        </div>
      </section>

      {/* Deep Scientific Pillars - Q2: Why should I trust it? */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// FORENSIC SIGNAL AUDITING</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Vague Scores are Not Proof</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">AI content classifiers fail when writer backgrounds vary or files are compressed. Veridex targets three specific, objective evidence anomalies.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-obsidian border border-deepslate p-8 space-y-4 text-left">
              <div className="text-amber-signal font-mono text-[10px] font-bold">// PILLAR 01: SENSOR ANOMALIES</div>
              <h3 className="text-lg font-bold text-white">Camera PRNU Profiling</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every camera sensor has unique micro-imperfections leaving specific noise profiles (PRNU). Veridex maps these signatures to identify local frame manipulation, crop alterations, and deepfake splicing.
              </p>
            </div>
            <div className="bg-obsidian border border-deepslate p-8 space-y-4 text-left">
              <div className="text-amber-signal font-mono text-[10px] font-bold">// PILLAR 02: ACOUSTIC VOCAL FOOTPRINT</div>
              <h3 className="text-lg font-bold text-white">Spectral Audio Anomaly Detection</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Synthetic vocoders produce discrete frequency anomalies during speech transitions and silent frames. Our model isolates these spectrum gaps to flag cloned voices with absolute precision.
              </p>
            </div>
            <div className="bg-obsidian border border-deepslate p-8 space-y-4 text-left">
              <div className="text-amber-signal font-mono text-[10px] font-bold">// PILLAR 03: STYLOGRAPHIC ANALYSIS</div>
              <h3 className="text-lg font-bold text-white">Lexical Skew Mapping</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rather than searching for AI keywords, we parse stylistic writing profiles, checking structural sentence formatting, syntactic complexity, and claim credibility against verifiable databases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences - Q4: Can it solve MY problem? */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// FORENSIC WORKFLOWS</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Structured For Your Discipline</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">Different teams face different standards of proof. Choose the specialized audit flow configured for your department.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 border-b border-slate-900 pb-4">
            {useCases.map(uc => (
              <button
                key={uc.id}
                onClick={() => setActiveUseCase(uc.id)}
                className={`py-1.5 px-4 font-mono text-[9px] uppercase tracking-wider transition-all border ${
                  activeUseCase === uc.id 
                    ? "bg-amber-signal/10 border-amber-signal text-amber-signal shadow-[0_0_8px_rgba(245,158,11,0.15)]"
                    : "bg-transparent border-slate-800 text-slate-500 hover:text-slate-300"
                }`}
              >
                [{uc.title}]
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-[#02050b] border border-deepslate p-8 text-left grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="font-mono text-[9px] text-amber-signal tracking-widest uppercase">// AUDIT DESK SPECIFICATION</div>
              <h3 className="text-xl font-bold text-white">{activeUseCaseData.title}</h3>
              
              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-mono text-[8px] text-slate-500 block">THE WORKFLOW CHALLENGE</span>
                  <p className="text-slate-300 font-sans mt-0.5">{activeUseCaseData.problem}</p>
                </div>
                <div>
                  <span className="font-mono text-[8px] text-slate-500 block">THE VERIDEX APPROACH</span>
                  <p className="text-slate-300 font-sans mt-0.5">{activeUseCaseData.solution}</p>
                </div>
                <div>
                  <span className="font-mono text-[8px] text-slate-500 block">EVIDENTIARY VALUE</span>
                  <p className="text-slate-300 font-sans mt-0.5">{activeUseCaseData.benefits}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#030712] border border-deepslate p-6 space-y-4">
              <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block">// CORE CAPABILITY</span>
              <div className="p-3 bg-obsidian border border-slate-900 font-mono text-[9px] text-amber-signal">
                {activeUseCaseData.features}
              </div>
              <Link href="/audit" className="btn-switch-primary w-full text-center py-3 text-[10px]">
                <span className="led-indicator-amber" />
                <span>Initialize Workspace Desk</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clear Compliance & Limitations - Q2 / Q5 */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="space-y-6 text-left">
              <span className="font-mono text-[9px] text-amber-signal tracking-widest uppercase block">// AUDITING SECURITY DECK</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Scientific Integrity Policies</h2>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                We believe trust is built on transparency, security, and clear boundaries. Veridex works as an expert assistant tool—never a machine deciding legal outcomes autonomously.
              </p>
              <div className="pt-2 border-t border-slate-900/60 font-mono text-[9px] text-slate-500 space-y-2">
                <div className="flex items-center gap-2"><ShieldCheck size={12} className="text-verity-green" /> SOC2 Zero-Storage RAM Buffer pipeline</div>
                <div className="flex items-center gap-2"><ShieldCheck size={12} className="text-verity-green" /> Signed, Immutable SHA-256 forensic reports</div>
                <div className="flex items-center gap-2"><ShieldCheck size={12} className="text-verity-green" /> Clear failure margin tags on high compression</div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-[#030712] border border-deepslate p-6 text-left space-y-3">
                <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">Limitations Registry</h4>
                <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                  We publicly disclose what we cannot audit. Low light levels, extreme audio compression, and file re-encodes reduce accuracy.
                </p>
                <div className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">
                  // TRANSPARENCY PROTOCOL
                </div>
              </div>

              <div className="bg-[#030712] border border-deepslate p-6 text-left space-y-3">
                <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">Methodology Docs</h4>
                <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                  Our signal algorithms are peer-reviewed and mathematically detailed. We build technology, not magic black boxes.
                </p>
                <Link href="/reports" className="font-mono text-[8px] text-amber-signal uppercase tracking-wider hover:underline flex items-center gap-1.5">
                  Browse Case Proofs <ArrowRight size={8} />
                </Link>
              </div>

              <div className="bg-[#030712] border border-deepslate p-6 text-left space-y-3">
                <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">Admissibility Seal</h4>
                <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                  Veridex audit reports follow ISO-certified chain of custody patterns to support legal filings and newsroom checks.
                </p>
                <span className="font-mono text-[8px] text-amber-signal uppercase tracking-widest font-semibold">
                  // COURT-READY COMPLIANCE
                </span>
              </div>

              <div className="bg-[#030712] border border-deepslate p-6 text-left space-y-3">
                <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">Platform Status</h4>
                <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                  Audit clusters are online. Average verification processing takes under 180 seconds under standard queue limits.
                </p>
                <span className="text-verity-green font-mono text-[8px] font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-verity-green animate-pulse rounded-none" />
                  All Systems Fully Operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive FAQ Section - Q2 */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-b border-deepslate">
        <div className="max-w-3xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// FORENSIC AUDITING FAQ</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Methodology & Operations</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">Get absolute clarity on our accuracy thresholds, legal validity, and platform architecture.</p>
          </div>

          {/* Search box */}
          <div className="relative max-w-md mx-auto bg-[#030712] border border-deepslate px-4 py-2 flex items-center gap-3">
            <Search size={14} className="text-slate-500" />
            <input
              type="text"
              placeholder="Filter methodology (e.g. PRNU, metadata, compression)..."
              className="bg-transparent text-xs text-slate-300 focus:outline-none w-full font-mono"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
            />
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-2 text-left">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-[#030712] border border-deepslate"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-[#070b19]/40 transition-all animate-none"
                  >
                    <h4 className="text-xs font-mono font-bold text-white flex items-center gap-3">
                      <span className="text-amber-signal">0{index + 1} //</span>
                      {faq.question}
                    </h4>
                    <span className="text-slate-500">
                      <ChevronDown 
                        size={12} 
                        className={`transform transition-transform duration-200 ${isOpen ? "rotate-180 text-amber-signal" : ""}`} 
                      />
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[200px] border-t border-slate-900/50" : "max-h-0"
                    }`}
                  >
                    <p className="p-5 font-sans text-xs text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Call-to-action - Q5: What should I do next? */}
      <section className="py-24 px-6 md:px-12 text-center bg-[#030712] border-t border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.01),transparent_60%)] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 border border-red-500/20 bg-red-500/5 px-3 py-1 font-mono text-[9px] font-bold text-red-400 uppercase tracking-widest">
            <AlertCircle size={10} /> ZERO STORAGE SECURITY PROTOCOL ACTIVE
          </div>
          <h3 className="text-3xl font-black text-white font-geist uppercase">Verify with absolute confidence.</h3>
          <p className="text-slate-400 text-xs max-w-md mx-auto font-sans leading-relaxed">
            Run instant forensic scans under our SOC2-aligned transient buffer. Your data is deleted immediately after the audit report completes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Link href="/audit" className="px-8 py-4 border border-amber-signal bg-amber-signal text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-transparent hover:text-amber-signal transition-all duration-300 rounded-none shadow-[0_0_12px_rgba(245,158,11,0.15)] flex-1">
              Initialize Analysis Desk
            </Link>
            <Link href="/reports" className="px-8 py-4 border border-deepslate text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-all rounded-none flex-1">
              Browse Signed Cases
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
