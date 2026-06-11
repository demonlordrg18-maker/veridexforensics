"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Shield, 
  Activity, 
  Database, 
  Lock, 
  AlertTriangle, 
  Gavel, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  Terminal, 
  Fingerprint, 
  CheckCircle2, 
  HelpCircle,
  Cpu,
  Layers,
  HardDrive
} from "lucide-react";
import { Navbar, Footer } from "../components/Navigation";
import { useState, useEffect, useRef } from "react";

// Mock data for scrolling ledger
const INITIAL_LOGS = [
  { time: "10:20:01", msg: "SYS_INIT // VERIDEX CORE ACTIVE" },
  { time: "10:20:04", msg: "BLOCK_RESOLVED // HASH: 8f4e2c8a74c2e64259..." },
  { time: "10:20:08", msg: "SPECTRAL_SCAN // AUDIO CHANNEL 01 - OK" },
  { time: "10:20:12", msg: "ANOMALY_MONITOR // TRANSCRIPT SCANNED - 0 WARN" },
  { time: "10:20:19", msg: "LEDGER_WRITE // REGISTERED PROOF #88910" },
  { time: "10:20:25", msg: "BGV_PIPELINE // SECURE ENVELOPE INITIALIZED" },
];

const MOCK_MESSAGES = [
  "DEEPFAKE_TRACE // FLUX RE-COMPRESSION DETECTED",
  "SYS_INTEGRITY // EXIF METADATA VERIFIED",
  "AUDIO_SYNTHESIS // PITCH FLUCTUATION OUT OF BOUNDS",
  "LEDGER_WRITE // HASH REGISTERED: c3ab491f8021c3...",
  "BLOCK_RESOLVED // REGISTERED PROOF #88911",
  "ZKP_SCRUB // TRANSIENT STORAGE PURGED",
  "BGV_FLOW // LATENCY MARKER: 240ms",
  "FORENSIC_INDEX // VERITY RATING: 0.94",
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic log generator to simulate a scrolling SHA-256 ledger feed
  useEffect(() => {
    const interval = setInterval(() => {
      const time = new Date().toTimeString().split(" ")[0];
      const randomMsg = MOCK_MESSAGES[Math.floor(Math.random() * MOCK_MESSAGES.length)];
      setLogs((prev) => [...prev.slice(-15), { time, msg: randomMsg }]);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom of ledger terminal
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const faqs = [
    {
      question: "How is this different from generic AI detectors?",
      answer: "Generic detectors rely on broad, vibes-based linguistic patterns that easily fail. Veridex works at the forensic level—decomposing digital signals, analyzing EXIF metadata traces, spotting sub-perceptual audio anomalies, and registering mathematical proof on a SHA-256 ledger. We don't guess: we show the exact signal trace and coordinate discrepancies.",
    },
    {
      question: "Is the output admissible in court?",
      answer: "While admissibility is determined by the presiding judge under local rules (such as Daubert/Frye in the US), Veridex structures every output according to rigorous scientific standards. By providing reproducible signal traces, pixel-level mismatch charts, and an immutable SHA-256 ledger chain of custody, we deliver the exact objective metrics legal teams require in discovery.",
    },
    {
      question: "API integration for BGV portals?",
      answer: "Our enterprise REST API is designed for rapid integration with background verification (BGV) and applicant screening portals. Verify candidate identities, analyze video interviews for proxy fraud, and check documents in under 5 seconds. Verification reports are programmatically generated and signed with cryptographically verifiable keys.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 selection:bg-amber-500 selection:text-black font-sans overflow-x-hidden">
      <Navbar />

      {/* Parts 1-5. Hero Section (Above the fold - Split 60/40) */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:pt-44 lg:pb-32 overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03),transparent_70%)] -z-10" />
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - 60% Width */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
            
            {/* 1. Title/Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08] font-sans"
            >
              The Forensic Standard <br />
              for <span className="text-gradient">Digital Trust.</span>
            </motion.h1>

            {/* 2. Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl font-normal"
            >
              Eliminate Proxy Interview Fraud & Deepfake Risks. Decompose signals, verify document integrity, and register proof on an immutable ledger.
            </motion.p>

            {/* 3. Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full sm:w-auto"
            >
              <Link 
                href="/request-demo"
                className="btn-primary inline-flex items-center justify-center gap-3 px-8 py-5 text-sm uppercase tracking-widest font-black transition-all hover:glow-amber-strong"
              >
                <span>Request Forensic Walkthrough</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            {/* 4. Social Proof (Hero) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="pt-6 border-t border-slate-900 w-full"
            >
              <p className="mono text-xs uppercase tracking-widest text-slate-500 font-medium">
                // <span className="text-amber-500 font-semibold">Trusted by 500+</span> OSINT Investigators & Leading Forensic Teams globally.
              </p>
            </motion.div>
          </div>

          {/* Right Column - 40% Width - 5. Visual (Hero) */}
          <div className="lg:col-span-5 w-full relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full text-left"
            >
              {/* Defense-Grade Live Forensic Terminal */}
              <div className="bg-[#0A0E17] border border-slate-800 shadow-2xl relative overflow-hidden glow-slate">
                
                {/* Terminal Header */}
                <div className="px-4 py-3 bg-[#070A10] border-b border-slate-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-amber-500" />
                    <span className="mono text-[10px] font-bold text-slate-400 tracking-wider">LIVE FORENSIC MONITOR // VDX-889</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="mono text-[8px] font-semibold text-amber-500 uppercase tracking-widest">ACTIVE_NODE</span>
                  </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-3 divide-x divide-slate-900 border-b border-slate-900">
                  <div className="p-3 text-center">
                    <span className="mono block text-[8px] text-slate-500 uppercase tracking-widest">VERITY_INDEX</span>
                    <span className="mono text-sm font-bold text-amber-500">0.984</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="mono block text-[8px] text-slate-500 uppercase tracking-widest">ANOMALIES</span>
                    <span className="mono text-sm font-bold text-red-500">0</span>
                  </div>
                  <div className="p-3 text-center">
                    <span className="mono block text-[8px] text-slate-500 uppercase tracking-widest">SPECTRAL_DEV</span>
                    <span className="mono text-sm font-bold text-slate-300">0.02%</span>
                  </div>
                </div>

                {/* Animated Waveform Display */}
                <div className="p-4 bg-black/40 border-b border-slate-900 relative">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.01)_1px,transparent_1px)] bg-[size:100%_8px] -z-10" />
                  <div className="flex justify-between items-center mb-1">
                    <span className="mono text-[8px] text-slate-500 uppercase tracking-widest">SIGNAL SPECTROGRAM</span>
                    <span className="mono text-[7px] text-amber-500/70 uppercase">FREQ_RESPONSE: 20Hz - 22kHz</span>
                  </div>
                  
                  {/* SVG Waveforms with Framer Motion animations */}
                  <div className="h-24 w-full flex items-center justify-center overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                      {/* Grid overlay */}
                      <line x1="0" y1="50" x2="400" y2="50" stroke="#0F172A" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="100" y1="0" x2="100" y2="100" stroke="#0F172A" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="200" y1="0" x2="200" y2="100" stroke="#0F172A" strokeWidth="1" strokeDasharray="4 4" />
                      <line x1="300" y1="0" x2="300" y2="100" stroke="#0F172A" strokeWidth="1" strokeDasharray="4 4" />
                      
                      {/* Animated Path 1 (Low Frequency - Amber) */}
                      <motion.path
                        d="M0,50 Q40,10 80,50 T160,50 T240,50 T320,50 T400,50"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="1.5"
                        opacity="0.8"
                        animate={{
                          d: [
                            "M0,50 Q40,10 80,50 T160,50 T240,50 T320,50 T400,50",
                            "M0,50 Q40,80 80,50 T160,50 T240,10 T320,80 T400,50",
                            "M0,50 Q40,10 80,50 T160,50 T240,50 T320,50 T400,50"
                          ]
                        }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      />

                      {/* Animated Path 2 (High Frequency Noise - Slate Muted) */}
                      <motion.path
                        d="M0,50 Q20,30 40,50 T80,50 T120,30 T160,50 T200,60 T240,50 T280,30 T320,50 T360,65 T400,50"
                        fill="none"
                        stroke="#475569"
                        strokeWidth="1"
                        opacity="0.5"
                        animate={{
                          d: [
                            "M0,50 Q20,30 40,50 T80,50 T120,30 T160,50 T200,60 T240,50 T280,30 T320,50 T360,65 T400,50",
                            "M0,50 Q20,60 40,50 T80,30 T120,60 T160,50 T200,40 T240,50 T280,65 T320,50 T360,30 T400,50",
                            "M0,50 Q20,30 40,50 T80,50 T120,30 T160,50 T200,60 T240,50 T280,30 T320,50 T360,65 T400,50"
                          ]
                        }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                      />
                    </svg>
                  </div>
                </div>

                {/* scrolling SHA-256 ledger feed */}
                <div className="p-4 bg-black/80">
                  <div className="flex justify-between items-center mb-2">
                    <span className="mono text-[8px] text-slate-500 uppercase tracking-widest">LEDGER CHAIN-OF-CUSTODY (SHA-256)</span>
                    <span className="mono text-[7px] text-amber-500/80">SECURE LOGS</span>
                  </div>
                  
                  <div 
                    ref={logContainerRef}
                    className="h-32 overflow-y-auto space-y-1.5 pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent text-left"
                  >
                    <AnimatePresence initial={false}>
                      {logs.map((log, index) => (
                        <motion.div 
                          key={index + "-" + log.time}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="mono text-[9px] flex gap-2"
                        >
                          <span className="text-slate-600 font-semibold">[{log.time}]</span>
                          <span className="text-slate-300">{log.msg}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 6. Features & Objections Section (Below the fold) */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-b border-slate-900">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-16 text-center md:text-left">
            <span className="mono text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em] block mb-3">// RIGOROUS SCANNERS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Forensic Features & Objection Handling</h2>
            <p className="text-slate-400 mt-2 max-w-xl">Deep audits built with mathematical boundaries to secure trust under strict investigations.</p>
          </div>

          {/* 4-card grid using 1px Hard Borders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-900 border border-slate-900">
            
            {/* Card 1 - Feature */}
            <div className="bg-[#050811] p-8 md:p-10 space-y-6 flex flex-col justify-between hover:bg-slate-900/40 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-none border border-amber-500/20 bg-amber-500/5 flex items-center justify-center">
                    <Activity size={12} className="text-amber-500" />
                  </div>
                  <span className="mono text-[9px] font-bold text-amber-500 uppercase tracking-widest">SYSTEM FEATURE // SPECTRAL</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Signal Decomposition</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Decompose incoming audio signals to identify synthetic voice clones and artificial patterns. Detect audio artifacts, spectral anomalies, and generated acoustic fingerprints that bypass standard human perception.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-900/50 flex justify-between items-center text-[10px] text-slate-500 mono">
                <span>PARAM: SCAN_RATE_96KHZ</span>
                <span className="text-slate-600">STATE: VERIFIED</span>
              </div>
            </div>

            {/* Card 2 - Objection Handling */}
            <div className="bg-[#050811] p-8 md:p-10 space-y-6 flex flex-col justify-between hover:bg-slate-900/40 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-none border border-slate-800 bg-slate-950 flex items-center justify-center">
                    <Lock size={12} className="text-slate-400" />
                  </div>
                  <span className="mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">SECURITY PROTOCOL // ZERO_TRUST</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Zero-Knowledge Privacy</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Concerned about data leakage? Veridex implements strict secure, in-memory processing with zero local file storage. All payloads are processed inside volatile secure memory cells and instantly wiped post-scan.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-900/50 flex justify-between items-center text-[10px] text-slate-500 mono">
                <span>RETENTION: 0.00ms</span>
                <span className="text-slate-600">STATE: ENCRYPTED</span>
              </div>
            </div>

            {/* Card 3 - Feature */}
            <div className="bg-[#050811] p-8 md:p-10 space-y-6 flex flex-col justify-between hover:bg-slate-900/40 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-none border border-amber-500/20 bg-amber-500/5 flex items-center justify-center">
                    <Database size={12} className="text-amber-500" />
                  </div>
                  <span className="mono text-[9px] font-bold text-amber-500 uppercase tracking-widest">PROVENANCE RECORD // LEDGER</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Ledger Provenance</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Establish an airtight chain-of-custody. Every completed audit registers an immutable cryptographic SHA-256 proof to a distributed ledger. Providing verification hashes that guarantee reports are untampered.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-900/50 flex justify-between items-center text-[10px] text-slate-500 mono">
                <span>HASHING: SHA-256</span>
                <span className="text-slate-600">STATE: MUTABLE_BLOCK_FALSE</span>
              </div>
            </div>

            {/* Card 4 - Objection Handling */}
            <div className="bg-[#050811] p-8 md:p-10 space-y-6 flex flex-col justify-between hover:bg-slate-900/40 transition-colors">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-none border border-slate-800 bg-slate-950 flex items-center justify-center">
                    <Clock size={12} className="text-slate-400" />
                  </div>
                  <span className="mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">OPERATIONS // SCALABILITY</span>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Rapid Turnaround</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Need to audit hundreds of media claims daily? Our parallelized computing nodes ensure a 4-minute average turnaround for high-volume background verification (BGV) and candidate checks, without sacrificing accuracy.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-900/50 flex justify-between items-center text-[10px] text-slate-500 mono">
                <span>LATENCY: &lt; 240s</span>
                <span className="text-slate-600">STATE: PIPELINE_AUTO</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. More Social Proof Section */}
      <section className="py-24 px-6 md:px-12 bg-[#050811] border-b border-slate-900">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Industry Partner Logos */}
          <div className="space-y-8 text-center">
            <span className="mono text-[9px] font-bold text-slate-500 uppercase tracking-[0.4em] block">// INTEGRATED INVESTIGATIONS DESKS</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {["OSINT_NETWORK", "LEX_FORENSIC", "AP_EVIDENTIARY", "DEFENSE_MEDIA_LABS"].map((partner) => (
                <div 
                  key={partner}
                  className="py-4 px-6 bg-[#070A10] border border-slate-900 hover:border-slate-800 transition-colors flex items-center justify-center"
                >
                  <span className="mono text-[10px] font-bold text-slate-500 tracking-widest">[{partner}]</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prominent Testimonial */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#0A0E17] border border-slate-800 p-8 md:p-12 relative glow-slate text-left">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                <Fingerprint size={120} className="text-white" />
              </div>
              <div className="space-y-6">
                <span className="mono text-[9px] font-bold text-amber-500 uppercase tracking-[0.2em] block">// FIELD VALIDATION REPORT</span>
                <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-normal italic">
                  "Veridex has fundamentally altered our evidentiary pipeline. The ledger-based provenance logs and spectral signal decomposition provide our examiners with a scientific standard of verification that holds up under the most demanding OSINT and discovery requirements."
                </p>
                <div className="pt-6 border-t border-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-sm">Digital Evidence Consortium</h4>
                    <span className="mono text-[9px] text-slate-500 uppercase tracking-wider">BOARD OF FORENSIC DIRECTORS // OSINT SPECIALIZATION</span>
                  </div>
                  <span className="mono text-[9px] text-amber-500 font-bold px-3 py-1.5 border border-amber-500/20 bg-amber-500/5">
                    RATING: GRADE_A_COMPLIANT
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-b border-slate-900">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="mono text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em] block mb-3">// FAQ SYSTEM</span>
            <h2 className="text-3xl font-extrabold text-white">Verification Intel</h2>
            <p className="text-slate-400 mt-2">Find critical answers regarding our verification scoring pipelines and integrations.</p>
          </div>

          {/* Minimalist Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-[#050811] border border-slate-800 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-900/30 transition-all"
                  >
                    <h4 className="text-sm font-bold text-white flex items-center gap-3 pr-4">
                      <span className="mono text-xs text-amber-500">0{index + 1} //</span>
                      {faq.question}
                    </h4>
                    <span className="text-slate-500 shrink-0">
                      <ChevronDown 
                        size={16} 
                        className={`transform transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-500" : ""}`} 
                      />
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[200px] border-t border-slate-900" : "max-h-0"
                    }`}
                  >
                    <p className="p-6 text-xs text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. 2nd CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-[#050811] relative overflow-hidden border-b border-slate-900 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.02),transparent_60%)] -z-10" />
        
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="mono text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em] block">// AUTOMATED INTEGRATION</span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Integrate Forensic Assurance <br />
            into Your Workflow.
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
            Protect your background verification systems, media assets, and legal pipelines. Deploy our high-throughput REST API for scalable content auditing.
          </p>
          <div className="pt-4">
            <Link 
              href="/request-demo"
              className="btn-primary inline-flex items-center gap-3 px-8 py-5 text-sm uppercase tracking-widest font-black transition-all hover:glow-amber-strong"
            >
              <span>Get API Access Now</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Founder's Note Section */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0A0E17] border border-slate-800 p-8 md:p-12 relative overflow-hidden text-left">
            
            {/* Watermark Logo */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] -z-10">
              <Cpu size={140} className="text-white" />
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 relative z-10">
              
              {/* Headshot Column */}
              <div className="shrink-0 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                <div className="relative h-28 w-28 border border-slate-800 overflow-hidden bg-slate-950 p-1">
                  <div className="absolute inset-0 border border-amber-500/20 z-20 pointer-events-none" />
                  <Image 
                    src="/images/dr_elena.png"
                    alt="Dr. Elena Vance"
                    fill
                    sizes="112px"
                    className="object-cover grayscale contrast-125 brightness-95"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm">Dr. Elena Vance</h4>
                  <span className="mono text-[8px] text-amber-500 uppercase tracking-widest block mt-0.5">FOUNDER // PRINCIPAL SCIENTIST</span>
                  <span className="mono text-[7px] text-slate-500 uppercase tracking-widest block">DEPT OF COMPUTATIONAL SIGNAL ANALYSIS</span>
                </div>
              </div>

              {/* Note Content Column */}
              <div className="flex-grow space-y-6">
                <span className="mono text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block">// INTEL_DIRECTIVE // MISSIONS_STATEMENT</span>
                <h3 className="text-xl font-bold text-white tracking-tight">Scientific Mission Directive</h3>
                <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-amber-500/40 pl-4">
                  "We started Veridex Forensics because generic detectors fail to provide the absolute transparency required by investigators. The current internet is flooded with synthetic clones and manipulated media, yet legacy tools expect you to trust their binary ratings without proof."
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  "Our system decomposes signals into primary mathematical indicators, leaving an immutable, auditable fingerprint. We stand committed to providing raw metrics, detailed anomaly graphs, and cryptographic proof of verification."
                </p>
                
                <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                  <span className="font-serif text-sm font-bold text-amber-500 italic">Elena Vance</span>
                  <span className="mono text-[8px] text-slate-500 uppercase tracking-widest">
                    PROBABILISTIC EVIDENCE, NOT POETRY.
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
