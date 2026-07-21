"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  ShieldAlert,
  Binary,
  Check,
  UserCheck,
  Search,
  BookOpen,
  ArrowRightLeft,
  FileCheck,
  ShieldCheck,
  Users,
  Compass,
  CornerDownRight,
  Sparkles
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
      question: "How is Veridex different from generic AI content detectors?",
      answer: "Generic detectors rely on superficial linguistic analysis that creates high false positive rates. Veridex operates at the forensic level—analyzing sub-perceptual acoustic signals for voice clones, checking image sensor metadata inconsistencies (EXIF alignment), running stylographic writing patterns, and sealing findings with cryptographically secure blockchain provenance ledgers. We don't guess; we show mathematical evidence.",
      category: "Methodology"
    },
    {
      question: "Is the output admissible in legal and court proceedings?",
      answer: "Yes, Veridex is designed under strict Chain of Custody guidelines. Every forensic audit generates a tamper-evident PDF report signed with cryptographic SHA-256 keys, proving the exact file integrity and state at audit time. The ledger stamp is fully audit-ready for legal disclosure.",
      category: "Security"
    },
    {
      question: "Can Veridex be integrated with existing HR and candidate background checkers?",
      answer: "Absolutely. We offer a high-performance REST API with latency under 240 seconds per standard check. You can automatically queue identity, voice transcript authenticity, and document verification requests during candidate onboarding.",
      category: "Enterprise"
    },
    {
      question: "What plans are available, and how are credits calculated?",
      answer: "Veridex operates on a credit system. 1 Credit corresponds to 1 audit check (text, file, or URL analysis). The Free Tier includes 50 credits. Student plans include 500 monthly credits, Professional plans include 5,000 monthly credits, and Enterprise plans offer custom limits with custom retention controls.",
      category: "Pricing"
    },
    {
      question: "How does Veridex guarantee user data privacy?",
      answer: "We adhere to a strict Zero-Storage Privacy mandate. All digital evidence and content payloads are processed transiently in high-speed RAM buffers and deleted immediately post-analysis. We never store files, metadata, or source materials on permanent storage.",
      category: "Security"
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
      title: "OSINT Investigators",
      problem: "Verification of anonymous files and metadata leaks in volatile areas.",
      solution: "Extract sensor alignment signature, evaluate GPS location timestamps, and prove state consistency.",
      benefits: "Defensible evidence proof, raw data extraction, speed in field intelligence.",
      features: "EXIF parsing, Cryptographic provenance ledger blocks.",
      linkText: "Request OSINT Access"
    },
    {
      id: "journalists",
      title: "Journalists & Newsrooms",
      problem: "Fake news campaigns, deepfake leak distribution, and synthetic voice quotes.",
      solution: "Isolate audio spectrums to spot neural clones and text styling anomalies.",
      benefits: "Prevent reputation risks, rapid turnaround checks before publishing.",
      features: "Acoustic signature analyser, Writing decomposition.",
      linkText: "Deploy in Newsroom"
    },
    {
      id: "researchers",
      title: "Researchers & Academics",
      problem: "Unverifiable dataset claims and data manipulations in academic findings.",
      solution: "Register cryptographic proofs of research files at discovery times.",
      benefits: "Guarantees reproducibility, prevents fraudulent citation manipulation.",
      features: "Immutable hashes, zero-retention privacy protocols.",
      linkText: "Activate Research Node"
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity Teams",
      problem: "Social engineering via deepfake voice calls and fake identity files.",
      solution: "Integrate Real-time audio spectrum checks inside secure voice trunks.",
      benefits: "Stop executive voice clones, identify metadata malware channels.",
      features: "High-speed REST API, Transient memory scan rooms.",
      linkText: "Contact Cyber Desk"
    }
  ];

  const activeUseCaseData = useCases.find(uc => uc.id === activeUseCase) || useCases[0];

  return (
    <div className="min-h-screen bg-obsidian text-slate-100 selection:bg-amber-signal selection:text-black font-sans overflow-x-hidden relative scanline-overlay">
      <Navbar />

      {/* Decorative vertical lines and technical grid */}
      <div className="absolute inset-y-0 left-12 w-[1px] bg-slate-900/40 pointer-events-none" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-slate-900/40 pointer-events-none" />
      
      {/* Background active grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Hero Section with Embedded Interactive Demo */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:pt-40 lg:pb-28 overflow-hidden border-b border-deepslate">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.02),transparent_70%)] -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Headline & CTAs (55%) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8 relative z-20">
            <div className="flex items-center gap-2 font-mono text-[9px] text-amber-signal uppercase tracking-[0.2em] border border-amber-signal/20 bg-[#0F172A] px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-none bg-amber-signal animate-pulse" />
              VERIDEX FORENSIC SYSTEM // v4.10
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05]"
            >
              Defensible Proof <br />
              <span className="font-mono font-normal tracking-wide text-amber-signal uppercase">[In the AI Era]</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl font-normal"
            >
              Eliminate synthetic media fraud, deepfakes, and document manipulations. Run instant forensic audits on metadata, writing styles, and audio signatures with absolute cryptographic proof.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a href="#interactive-demo" className="btn-switch-primary py-4 px-8 text-center">
                <span className="led-indicator-amber" />
                Run Free Audit
              </a>
              <Link href="/request-demo" className="font-mono text-[10px] uppercase tracking-wider text-slate-400 hover:text-white border border-deepslate py-4 px-8 text-center flex items-center justify-center gap-2">
                Book Enterprise Demo
                <ArrowRight size={12} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-6 border-t border-deepslate w-full"
            >
              <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-medium">
                // <span className="text-amber-signal font-semibold">Zero-Storage Mandate:</span> Paid and free audits process transiently in RAM memory, conforming to SOC2 and GDPR.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Embedded Interactive Demo (45%) */}
          <div className="lg:col-span-5 w-full relative z-20" id="interactive-demo">
            <InteractiveDemo />
          </div>

        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// THE NEED FOR VERIDEX</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Why Traditional Media Verification Fails</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">Vague AI content scores and vibes-based checks fail under rigorous examinations. Veridex introduces mathematical verification metrics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-obsidian border border-deepslate p-8 space-y-4 text-left">
              <div className="text-amber-signal font-mono text-[11px] font-bold">// PROBLEM 01</div>
              <h3 className="text-lg font-bold text-white">Fragile Linguistic Models</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Traditional content detectors match broad vocabulary distribution curves. They constantly generate false positive errors on non-native english writers and formal academic documents.
              </p>
            </div>
            <div className="bg-obsidian border border-deepslate p-8 space-y-4 text-left">
              <div className="text-amber-signal font-mono text-[11px] font-bold">// PROBLEM 02</div>
              <h3 className="text-lg font-bold text-white">Metadata Stripping</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Social platforms clean and edit original file metadata, obscuring the primary camera profiles, GPS coordinates, and camera model signatures required for source validation.
              </p>
            </div>
            <div className="bg-obsidian border border-deepslate p-8 space-y-4 text-left">
              <div className="text-amber-signal font-mono text-[11px] font-bold">// PROBLEM 03</div>
              <h3 className="text-lg font-bold text-white">Neural Voice Cloning</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-fidelity audio generators bypass conventional biometric identity scanners. HR candidate screenings and executive voice validation systems are vulnerable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase: Workflows */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-left space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// FORENSIC WORKFLOW SHOWCASE</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Demonstrated Verification Capabilities</h2>
            <p className="text-slate-400 text-sm max-w-xl">Move beyond simple outputs. Track every content verification sequence directly through interactive pipelines.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-deepslate border border-deepslate">
            
            {/* Workflow 1 */}
            <div className="bg-[#02050b] p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-mono text-[8px] text-amber-signal uppercase tracking-widest">// IMAGE FORENSICS PIPELINE</span>
                <h3 className="text-base font-bold text-white">Sensor & Camera Matching</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Verify source authenticity of photo evidence. Detect sensor noise anomalies, evaluate EXIF inconsistencies, and generate court-admissible metadata stamps.
                </p>
                <div className="font-mono text-[8px] text-slate-500 space-y-1.5 pt-2">
                  <div className="flex items-center gap-1.5"><Check size={10} className="text-verity-green" /> Parse EXIF block data</div>
                  <div className="flex items-center gap-1.5"><Check size={10} className="text-verity-green" /> Image sensor anomaly matrix</div>
                  <div className="flex items-center gap-1.5"><Check size={10} className="text-verity-green" /> Render authenticity certification</div>
                </div>
              </div>
              <Link href="/features/multimodal-forensics" className="text-xs font-mono text-amber-signal flex items-center gap-1.5 hover:underline">
                View Image Details <CornerDownRight size={10} />
              </Link>
            </div>

            {/* Workflow 2 */}
            <div className="bg-[#02050b] p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-mono text-[8px] text-amber-signal uppercase tracking-widest">// DOCUMENT AUTHENTICITY PIPELINE</span>
                <h3 className="text-base font-bold text-white">Stylography & Language Maps</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Analyze styling trends in reports, research papers, and claims. Map lexical patterns to identify synthetic writing styles or hidden plagiarized sentences.
                </p>
                <div className="font-mono text-[8px] text-slate-500 space-y-1.5 pt-2">
                  <div className="flex items-center gap-1.5"><Check size={10} className="text-verity-green" /> Sentence-by-sentence decomposition</div>
                  <div className="flex items-center gap-1.5"><Check size={10} className="text-verity-green" /> Lexical density calculation</div>
                  <div className="flex items-center gap-1.5"><Check size={10} className="text-verity-green" /> Flag AI synthesis signatures</div>
                </div>
              </div>
              <Link href="/features/claim-decomposition" className="text-xs font-mono text-amber-signal flex items-center gap-1.5 hover:underline">
                View Document Details <CornerDownRight size={10} />
              </Link>
            </div>

            {/* Workflow 3 */}
            <div className="bg-[#02050b] p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="font-mono text-[8px] text-amber-signal uppercase tracking-widest">// DEEPFAKE DETECTOR PIPELINE</span>
                <h3 className="text-base font-bold text-white">Audio Spectrum Isolation</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Decompose audio files and tracks into frequency bands to locate voice synthesis patterns, audio editing cuts, or microphone mismatch errors.
                </p>
                <div className="font-mono text-[8px] text-slate-500 space-y-1.5 pt-2">
                  <div className="flex items-center gap-1.5"><Check size={10} className="text-verity-green" /> Waveform frequency isolation</div>
                  <div className="flex items-center gap-1.5"><Check size={10} className="text-verity-green" /> Voice clone vocoder extraction</div>
                  <div className="flex items-center gap-1.5"><Check size={10} className="text-verity-green" /> Register Immutable Ledger Hash</div>
                </div>
              </div>
              <Link href="/features/verity-index" className="text-xs font-mono text-amber-signal flex items-center gap-1.5 hover:underline">
                View Audio Details <CornerDownRight size={10} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* How it Works / Process Pipeline */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// AUDITING TIMELINE</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">The 6-Step Verification Pipeline</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">From upload to secure storage and collaboration, Veridex guarantees scientific transparency.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { step: "01", name: "Secure Payload", desc: "Upload files or input text to transient memory chambers." },
              { step: "02", name: "Ledger Hashing", desc: "Register SHA-256 hash immediately on the immutable block." },
              { step: "03", name: "Forensic Analysis", desc: "Spectral, EXIF, and stylography models check authenticity." },
              { step: "04", name: "Verity Report", desc: "Generate a court-admissible signed PDF report." },
              { step: "05", name: "Evidence Vault", desc: "Save to encrypted case file structures." },
              { step: "06", name: "Team Share", desc: "Invite collaborators and secure joint signature blocks." }
            ].map((pt, idx) => (
              <div key={idx} className="bg-[#030712] border border-deepslate p-5 flex flex-col justify-between text-left space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-amber-signal">{pt.step}</span>
                  <span className="h-1.5 w-1.5 bg-amber-signal/30" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{pt.name}</h4>
                  <p className="text-[10px] text-slate-500 leading-normal">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience / Use Cases Tabs */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// SAAS TARGET SECTORS</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Structured For Professional Integrity</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">Specialized auditing components for government agencies, universities, media newsrooms, and law firms.</p>
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
              <div className="font-mono text-[9px] text-amber-signal tracking-widest uppercase">// USE CASE TARGET METRICS</div>
              <h3 className="text-xl font-bold text-white">{activeUseCaseData.title}</h3>
              
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-mono text-[8px] text-slate-500 block">THE PROBLEM</span>
                  <p className="text-slate-300 font-sans mt-0.5">{activeUseCaseData.problem}</p>
                </div>
                <div>
                  <span className="font-mono text-[8px] text-slate-500 block">OUR SOLUTION</span>
                  <p className="text-slate-300 font-sans mt-0.5">{activeUseCaseData.solution}</p>
                </div>
                <div>
                  <span className="font-mono text-[8px] text-slate-500 block">VALUE & BENEFIT</span>
                  <p className="text-slate-300 font-sans mt-0.5">{activeUseCaseData.benefits}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#030712] border border-deepslate p-6 space-y-4">
              <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block">// RELEVANT ENGINES</span>
              <div className="p-3 bg-obsidian border border-slate-900 font-mono text-[9px] text-amber-signal">
                {activeUseCaseData.features}
              </div>
              <Link href="/signup" className="btn-switch-primary w-full text-center py-3 text-[10px]">
                <span className="led-indicator-amber" />
                <span>{activeUseCaseData.linkText}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance Section */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="space-y-6 text-left">
              <span className="font-mono text-[9px] text-amber-signal tracking-widest uppercase block">// AUDITING SECURITY DECK</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Enterprise Compliance & Trust Standards</h2>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Veridex ensures total client privacy. All files are verified in transient RAM chambers under zero-retention guidelines. We are compliant with international data processing and safety mandates.
              </p>
              <div className="pt-2 border-t border-slate-900/60 font-mono text-[9px] text-slate-500 space-y-2">
                <div className="flex items-center gap-2"><ShieldCheck size={12} className="text-verity-green" /> SOC2 Type II Framework ready</div>
                <div className="flex items-center gap-2"><ShieldCheck size={12} className="text-verity-green" /> HIPAA & FERPA Compliant storage</div>
                <div className="flex items-center gap-2"><ShieldCheck size={12} className="text-verity-green" /> Zero-retention transient memory API</div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              <div className="bg-[#030712] border border-deepslate p-6 text-left space-y-3">
                <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">Methodology</h4>
                <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                  Our signal processing methodologies are documented, published, and peer-reviewed for court admissibility evaluation.
                </p>
                <Link href="/methodology" className="font-mono text-[8px] text-amber-signal uppercase tracking-wider hover:underline flex items-center gap-1.5">
                  Read research <ArrowRight size={8} />
                </Link>
              </div>

              <div className="bg-[#030712] border border-deepslate p-6 text-left space-y-3">
                <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">Changelog v4.10</h4>
                <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                  Released stylographic check filters for language translations and expanded camera sensors profiles dataset.
                </p>
                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-wider block">
                  Last deploy: Today
                </span>
              </div>

              <div className="bg-[#030712] border border-deepslate p-6 text-left space-y-3">
                <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">Public Roadmap</h4>
                <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                  Integrating automated Canvas/LMS integrity checkers and real-time deepfake audio telephone firewall blocks.
                </p>
                <span className="font-mono text-[8px] text-amber-signal uppercase tracking-widest font-semibold">
                  // LMS INTEGRATION IN PROGRESS
                </span>
              </div>

              <div className="bg-[#030712] border border-deepslate p-6 text-left space-y-3">
                <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">Public Status Node</h4>
                <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
                  All 16 cluster nodes are online. Average file verification response latency sits at 182.4 seconds.
                </p>
                <span className="text-verity-green font-mono text-[8px] font-bold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-verity-green animate-pulse rounded-none" />
                  ALL CLUSTERS ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// INDUSTRY COMPASS</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">The Forensic Difference</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">Compare workflows and methodologies of traditional checkers vs. the Veridex standard.</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-deepslate border border-deepslate font-mono text-left text-xs">
            <div className="bg-[#02050b] p-8 space-y-6">
              <h3 className="font-bold text-slate-500 uppercase tracking-widest">// TRADITIONAL VERIFICATION</h3>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">[!]</span>
                  <span>Manual inspection of metadata tags, easily spoofed by editing packages.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">[!]</span>
                  <span>Vague content scoring percentages without mathematical proof or analysis logs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">[!]</span>
                  <span>Fragmented tools across various tabs, requiring multiple copy-paste procedures.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold">[!]</span>
                  <span>Retention of uploaded documents on local databases for model training, breaching confidentiality.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#030712] p-8 space-y-6 border-t md:border-t-0 md:border-l border-deepslate relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-signal/5 border-l border-b border-amber-signal/20 px-3 py-1 font-mono text-[8px] text-amber-signal uppercase tracking-wider">
                RECOMMENDED FORENSIC STANDARD
              </div>
              <h3 className="font-bold text-amber-signal uppercase tracking-widest">// VERIDEX FORENSICS</h3>
              <ul className="space-y-4 text-slate-200">
                <li className="flex items-start gap-2.5">
                  <Check size={12} className="text-verity-green mt-0.5 shrink-0" />
                  <span>Unified automated pipeline executing EXIF alignment, spectral decomposition, and stylography checks in one queue.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={12} className="text-verity-green mt-0.5 shrink-0" />
                  <span>Objective, transparent graphs and metrics verifiable under strict courtroom examinations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={12} className="text-verity-green mt-0.5 shrink-0" />
                  <span>Immutable hashing provenance seals, providing verified digital chain of custody records.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={12} className="text-verity-green mt-0.5 shrink-0" />
                  <span>Strict zero-storage mandate. PAYLOAD EXPIRES IMMEDIATELY following report computation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// FORENSIC FEES</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Structured For Teams & Scale</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">Get started for free or upgrade for higher audit checks and secure team cases.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            {/* Free */}
            <div className="bg-obsidian border border-deepslate p-6 text-left flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">// EVALUATION TIER</div>
                <h3 className="text-lg font-bold text-white">Free Plan</h3>
                <div className="font-mono text-2xl font-black text-white">$0 <span className="text-[10px] text-slate-500 font-normal">/ ONBOARDING</span></div>
                <ul className="space-y-2 text-[10px] text-slate-400 pt-4 border-t border-slate-900">
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> 50 one-time credits</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Transient scans only</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Community FAQ support</li>
                </ul>
              </div>
              <Link href="/signup" className="font-mono text-[9px] uppercase tracking-wider text-slate-400 hover:text-white border border-deepslate py-2.5 text-center">
                Create Free Account
              </Link>
            </div>

            {/* Student */}
            <div className="bg-obsidian border border-deepslate p-6 text-left flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="font-mono text-[8px] text-amber-signal uppercase tracking-widest">// ACADEMIC STUDY</div>
                <h3 className="text-lg font-bold text-white">Student Plan</h3>
                <div className="font-mono text-2xl font-black text-white">$9 <span className="text-[10px] text-slate-500 font-normal">/ MONTH</span></div>
                <ul className="space-y-2 text-[10px] text-slate-400 pt-4 border-t border-slate-900">
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> 500 monthly credits</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Export verified PDF reports</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Academic resource center</li>
                </ul>
              </div>
              <Link href="/signup" className="font-mono text-[9px] uppercase tracking-wider text-slate-400 hover:text-white border border-deepslate py-2.5 text-center">
                Upgrade to Student
              </Link>
            </div>

            {/* Professional */}
            <div className="bg-obsidian border border-amber-signal/30 p-6 text-left flex flex-col justify-between space-y-8 relative">
              <div className="absolute top-0 right-0 bg-amber-signal/10 border-l border-b border-amber-signal/20 px-2 py-0.5 font-mono text-[7px] text-amber-signal uppercase tracking-wider">
                POPULAR TIER
              </div>
              <div className="space-y-4">
                <div className="font-mono text-[8px] text-amber-signal uppercase tracking-widest">// VERIDEX POWER USER</div>
                <h3 className="text-lg font-bold text-white">Professional</h3>
                <div className="font-mono text-2xl font-black text-white">$49 <span className="text-[10px] text-slate-500 font-normal">/ MONTH</span></div>
                <ul className="space-y-2 text-[10px] text-slate-400 pt-4 border-t border-slate-900">
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> 5,000 monthly credits</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Encrypted Evidence Vault</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Cryptographic ledger seals</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> API credentials access</li>
                </ul>
              </div>
              <Link href="/signup" className="btn-switch-primary py-2.5 text-[9px] text-center">
                <span className="led-indicator-amber" />
                Get Professional
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-obsidian border border-deepslate p-6 text-left flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">// INSTITUTION PROTOCOLS</div>
                <h3 className="text-lg font-bold text-white">Enterprise</h3>
                <div className="font-mono text-2xl font-black text-white">Custom <span className="text-[10px] text-slate-500 font-normal">/ CONTRACT</span></div>
                <ul className="space-y-2 text-[10px] text-slate-400 pt-4 border-t border-slate-900">
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Unlimited custom credits</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Custom data retention guidelines</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> LMS integrations (Canvas/Moodle)</li>
                  <li className="flex items-center gap-1.5"><Check size={10} className="text-amber-signal" /> Dedicated support desk</li>
                </ul>
              </div>
              <Link href="/request-demo" className="font-mono text-[9px] uppercase tracking-wider text-slate-400 hover:text-white border border-deepslate py-2.5 text-center">
                Book Walkthrough
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Comprehensive FAQ Section */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-b border-deepslate">
        <div className="max-w-3xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// FORENSIC AUDITING HELP</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">System FAQ & Methodology</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">Search common inquiries about accuracy limits, legal compliance, and integrations.</p>
          </div>

          {/* Search box */}
          <div className="relative max-w-md mx-auto bg-[#030712] border border-deepslate px-4 py-2 flex items-center gap-3">
            <Search size={14} className="text-slate-500" />
            <input
              type="text"
              placeholder="Search questions (e.g. privacy, credits, accuracy)..."
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
            {filteredFaqs.length === 0 && (
              <div className="text-center font-mono text-[10px] text-slate-500 py-8 border border-dashed border-deepslate bg-[#030712]/50">
                NO MATCHING FORENSIC QUESTIONS FOUND
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
