"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
  UserCheck
} from "lucide-react";
import { Navbar, Footer } from "../components/Navigation";
import { useState, useEffect, useRef } from "react";

// Mock data generator for ledger hashes
const generateHash = () => {
  const chars = "abcdef0123456789";
  let hash1 = "";
  let hash2 = "";
  for (let i = 0; i < 12; i++) {
    hash1 += chars[Math.floor(Math.random() * chars.length)];
    hash2 += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${hash1}...${hash2}`;
};

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"spectral" | "biometric" | "ledger">("spectral");
  const [spectralMode, setSpectralMode] = useState<"natural" | "synthetic">("natural");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Real-time metrics
  const [verityIndex, setVerityIndex] = useState(0.984);
  const [spectralDev, setSpectralDev] = useState(0.02);
  const [anomaliesDetected, setAnomaliesDetected] = useState(0);
  
  // Biometric status states
  const [bioProgress, setBioProgress] = useState(0);
  const [bioStatus, setBioStatus] = useState("ACQUIRING...");
  
  // Scrolling ledger logs
  const [ledgerLogs, setLedgerLogs] = useState<Array<{ id: string; hash: string; status: string; timestamp: string }>>([]);
  const ledgerEndRef = useRef<HTMLDivElement>(null);

  // Initialize ledger items
  useEffect(() => {
    const initialLogs = Array.from({ length: 15 }).map((_, idx) => {
      const date = new Date(Date.now() - (15 - idx) * 10000);
      return {
        id: `f${idx + 1}`,
        hash: generateHash(),
        status: "Registered",
        timestamp: date.toISOString().replace("T", " ").substring(0, 19) + " UTC"
      };
    });
    setLedgerLogs(initialLogs);
  }, []);

  // Live updates simulator
  useEffect(() => {
    const interval = setInterval(() => {
      // Dynamic updates based on active tab
      if (activeTab === "spectral") {
        if (spectralMode === "natural") {
          setVerityIndex(parseFloat((0.98 + Math.random() * 0.015).toFixed(3)));
          setSpectralDev(parseFloat((0.01 + Math.random() * 0.02).toFixed(2)));
          setAnomaliesDetected(0);
        } else {
          setVerityIndex(parseFloat((0.01 + Math.random() * 0.02).toFixed(3)));
          setSpectralDev(parseFloat((84.2 + Math.random() * 10.5).toFixed(2)));
          setAnomaliesDetected(1);
        }
      } else if (activeTab === "biometric") {
        setVerityIndex(0.120);
        setSpectralDev(64.20);
        setAnomaliesDetected(1);
        setBioProgress(98);
        setBioStatus("PARTIAL MATCH");
      } else if (activeTab === "ledger") {
        setVerityIndex(1.000);
        setSpectralDev(0.00);
        setAnomaliesDetected(0);
      }

      // Dynamic updates for Ledger
      const now = new Date();
      setLedgerLogs(prev => [
        ...prev.slice(1),
        {
          id: `f${Math.floor(Math.random() * 9) + 1}`,
          hash: generateHash(),
          status: "Registered",
          timestamp: now.toISOString().replace("T", " ").substring(0, 19) + " UTC"
        }
      ]);

    }, 3000);

    return () => clearInterval(interval);
  }, [activeTab, spectralMode]);

  // Restart biometric simulation when tab switches
  useEffect(() => {
    if (activeTab === "biometric") {
      setBioProgress(98);
      setBioStatus("PARTIAL MATCH");
    }
  }, [activeTab]);

  useEffect(() => {
    if (ledgerEndRef.current) {
      ledgerEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ledgerLogs]);

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
    <div className="min-h-screen bg-obsidian text-slate-100 selection:bg-amber-signal selection:text-black font-sans overflow-x-hidden relative scanline-overlay">
      <Navbar />

      {/* Decorative vertical lines and technical grid */}
      <div className="absolute inset-y-0 left-12 w-[1px] bg-slate-900/40 pointer-events-none" />
      <div className="absolute inset-y-0 right-12 w-[1px] bg-slate-900/40 pointer-events-none" />
      
      {/* Background active grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Parts 1-5: Hero Section (Above the fold - Split 55/45) */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:pt-44 lg:pb-32 overflow-hidden border-b border-deepslate">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.02),transparent_70%)] -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - 55% Width */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8 relative z-20">
            
            {/* Tagline Indicator */}
            <div className="flex items-center gap-2 font-mono text-[9px] text-amber-signal uppercase tracking-[0.2em] border border-amber-signal/20 bg-[#0F172A] px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-none bg-amber-signal animate-pulse" />
              Veridex Forensic Protocol v4.09
            </div>

            {/* 1. Title/Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.05]"
            >
              The Forensic <span className="font-mono font-normal tracking-wide text-amber-signal uppercase">[Standard]</span> <br />
              for Digital Trust.
            </motion.h1>

            {/* 2. Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl font-normal font-sans"
            >
              Eliminate Proxy Interview Fraud & Deepfake Risks. Decompose signals, verify document integrity, and register proof on an immutable ledger.
            </motion.p>

            {/* 3. Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full sm:w-auto"
            >
              <Link 
                href="/request-demo"
                className="btn-switch-primary group px-8 py-4"
              >
                <span className="led-indicator" />
                <span>Request Forensic Walkthrough</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* 4. Social Proof (Hero) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-6 border-t border-deepslate w-full"
            >
              <p className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-medium">
                // <span className="text-amber-signal font-semibold">Verification Node Active:</span> Trusted by 500+ OSINT Investigators & Leading Forensic Teams globally.
              </p>
            </motion.div>
          </div>

          {/* Right Column - 45% Width - 5. Visual (Forensic Terminal) */}
          <div className="lg:col-span-5 w-full relative z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full text-left"
            >
              {/* Defense-Grade Forensic Terminal */}
              <div className="terminal-panel border border-deepslate relative overflow-hidden">
                
                {/* Scan grid overlay inside terminal */}
                <div className="absolute inset-0 bg-[#020617]/40 pointer-events-none z-0" />

                {/* Terminal Header */}
                <div className="px-4 py-3 bg-[#030712] border-b border-deepslate flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <Terminal size={12} className="text-amber-signal" />
                    <span className="font-mono text-[9px] font-bold text-slate-400 tracking-wider">VDX_SYS_MONITOR // TERMINAL_ACTIVE</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-verity-green shadow-[0_0_8px_#10B981] animate-pulse" />
                    <span className="font-mono text-[8px] font-bold text-verity-green uppercase tracking-widest">LIVE_FEED</span>
                  </div>
                </div>

                {/* Tactical Dashboard Stats */}
                <div className="grid grid-cols-3 divide-x divide-deepslate border-b border-deepslate relative z-10">
                  <div className="p-3 text-center bg-[#070b19]/30">
                    <span className="font-mono block text-[8px] text-slate-500 uppercase tracking-widest">VERITY_INDEX</span>
                    <span className={`font-mono text-xs font-bold transition-colors ${verityIndex > 0.8 ? 'text-verity-green' : 'text-red-500'}`}>
                      {verityIndex}
                    </span>
                  </div>
                  <div className="p-3 text-center bg-[#070b19]/30">
                    <span className="font-mono block text-[8px] text-slate-500 uppercase tracking-widest">ANOMALIES</span>
                    <span className={`font-mono text-xs font-bold transition-colors ${anomaliesDetected > 0 ? 'text-amber-signal' : 'text-slate-400'}`}>
                      {anomaliesDetected}
                    </span>
                  </div>
                  <div className="p-3 text-center bg-[#070b19]/30">
                    <span className="font-mono block text-[8px] text-slate-500 uppercase tracking-widest">SPECTRAL_DEV</span>
                    <span className="font-mono text-xs font-bold text-slate-300">
                      {spectralDev}%
                    </span>
                  </div>
                </div>

                {/* Tab select buttons styled like physical toggles */}
                <div className="flex bg-[#030712] border-b border-deepslate font-mono text-[8px] relative z-10">
                  <button 
                    onClick={() => setActiveTab("spectral")}
                    className={`flex-1 py-2 px-3 flex items-center justify-center gap-1.5 border-r border-deepslate transition-all ${activeTab === "spectral" ? "bg-[#070b19] text-amber-signal" : "text-slate-500 hover:text-slate-300"}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-none transition-all ${activeTab === "spectral" ? "bg-amber-signal shadow-[0_0_6px_#F59E0B]" : "bg-slate-700"}`} />
                    [SPECTRAL_DECOMP]
                  </button>
                  <button 
                    onClick={() => setActiveTab("biometric")}
                    className={`flex-1 py-2 px-3 flex items-center justify-center gap-1.5 border-r border-deepslate transition-all ${activeTab === "biometric" ? "bg-[#070b19] text-amber-signal" : "text-slate-500 hover:text-slate-300"}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-none transition-all ${activeTab === "biometric" ? "bg-amber-signal shadow-[0_0_6px_#F59E0B]" : "bg-slate-700"}`} />
                    [BIOMETRICS]
                  </button>
                  <button 
                    onClick={() => setActiveTab("ledger")}
                    className={`flex-1 py-2 px-3 flex items-center justify-center gap-1.5 transition-all ${activeTab === "ledger" ? "bg-[#070b19] text-amber-signal" : "text-slate-500 hover:text-slate-300"}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-none transition-all ${activeTab === "ledger" ? "bg-amber-signal shadow-[0_0_6px_#F59E0B]" : "bg-slate-700"}`} />
                    [LEDGER_LOG]
                  </button>
                </div>

                {/* Dashboard Screen */}
                <div className="p-4 bg-black/40 min-h-[220px] relative z-10 flex flex-col justify-between">
                  
                  {/* Tab 1: Spectral Signal Decomposition */}
                  {activeTab === "spectral" && (
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <div className="font-mono text-[8px] text-slate-500 uppercase tracking-wider flex items-center gap-2">
                          <Activity size={10} className="text-amber-signal" />
                          SPECTRAL ANALYSIS: BATCH ID 739
                        </div>
                        <span className="font-mono text-[7px] text-slate-400">File: Evidence_Item_1A_Audio.flac</span>
                      </div>

                      {/* Waveform & Spectrogram Box */}
                      <div className="relative h-44 md:h-52 w-full border border-slate-900 bg-black/80 flex flex-col justify-center overflow-hidden">
                        {/* Vertical Laser Scanline */}
                        <div className="laser-scanner" />
                        
                        <motion.img
                          key={spectralMode}
                          src={spectralMode === "natural" ? "/images/signature_comparison.jpg" : "/images/spectral_analysis.jpg"}
                          alt="Spectral Analysis Output"
                          className="w-full h-full object-cover opacity-85"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.85 }}
                          transition={{ duration: 0.4 }}
                        />

                        {/* Interactive HUD labels */}
                        {spectralMode === "synthetic" && (
                          <div className="absolute top-2 right-2 bg-red-950/60 border border-red-500/30 px-2 py-0.5 font-mono text-[7px] text-red-400 uppercase tracking-widest animate-pulse z-20">
                            ANOMALY DETECTED (12.4kHz)
                          </div>
                        )}
                      </div>

                      {/* Active Mode switch triggers */}
                      <div className="flex justify-between items-center pt-2 border-t border-slate-900">
                        <span className="font-mono text-[8px] text-slate-500">TOGGLE COMPILATION MODULE</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSpectralMode("natural")}
                            className={`px-3 py-1 font-mono text-[8px] uppercase tracking-wider transition-all border ${
                              spectralMode === "natural"
                                ? "bg-verity-green/10 border-verity-green text-verity-green shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                                : "bg-transparent border-slate-800 text-slate-500 hover:text-slate-400"
                            }`}
                          >
                            Natural Signature
                          </button>
                          <button
                            onClick={() => setSpectralMode("synthetic")}
                            className={`px-3 py-1 font-mono text-[8px] uppercase tracking-wider transition-all border ${
                              spectralMode === "synthetic"
                                ? "bg-red-500/10 border-red-500 text-red-400 shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                                : "bg-transparent border-slate-800 text-slate-500 hover:text-slate-400"
                            }`}
                          >
                            Synthetic Clone
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Biometric Identity Manifest */}
                  {activeTab === "biometric" && (
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <div className="font-mono text-[8px] text-slate-500 uppercase tracking-wider flex items-center gap-2">
                          <Fingerprint size={10} className="text-amber-signal" />
                          IDENTITY MANIFEST: AUDIT_ACTIVE
                        </div>
                        <span className="font-mono text-[7px] text-slate-400">Subject: UNKNOWN // TARGET-READ</span>
                      </div>

                      {/* Biometric Scanning Panel */}
                      <div className="relative h-44 md:h-52 w-full border border-slate-900 bg-black/80 flex flex-col justify-center overflow-hidden">
                        {/* Vertical Laser Scanline */}
                        <div className="laser-scanner" />
                        
                        <motion.img
                          src="/images/biometric_manifest.jpg"
                          alt="Biometric Manifest Output"
                          className="w-full h-full object-cover opacity-85"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.85 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>

                      {/* Overall biometric analysis status */}
                      <div className="pt-2 border-t border-slate-900 flex justify-between items-center">
                        <span className="font-mono text-[8px] text-slate-500">BIOMETRIC ANALYSIS STATUS</span>
                        <span className={`font-mono text-[9px] font-black px-2 py-0.5 border ${
                          bioStatus === "PARTIAL MATCH"
                            ? "bg-amber-signal/10 border-amber-signal text-amber-signal animate-pulse"
                            : "bg-slate-950 border-slate-800 text-slate-400"
                        }`}>
                          {bioStatus}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Ledger Provenance log registry */}
                  {activeTab === "ledger" && (
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <div className="font-mono text-[8px] text-slate-500 uppercase tracking-wider flex items-center gap-2">
                          <Database size={10} className="text-amber-signal" />
                          LEDGER CHAIN-OF-CUSTODY (SHA-256)
                        </div>
                        <span className="font-mono text-[7px] text-verity-green">STATUS: IMMUTABLE_BLOCK_TRUE</span>
                      </div>

                      {/* Immutable Ledger Panel */}
                      <div className="relative h-44 md:h-52 w-full border border-slate-900 bg-black/80 flex flex-col justify-center overflow-hidden">
                        {/* Vertical Laser Scanline */}
                        <div className="laser-scanner" />
                        
                        <motion.img
                          src="/images/immutable_ledger.jpg"
                          alt="Immutable Ledger Output"
                          className="w-full h-full object-cover opacity-85"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.85 }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>

                      {/* Block validator info */}
                      <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-slate-500 font-mono text-[8px]">
                        <span>VALIDATION PROOF: COURT_ADMISSIBLE</span>
                        <span>HASH_PIPELINE: SHA-256</span>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 6. Features & Objections Section (4-Card Grid) */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center md:text-left space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// INVESTIGATIVE SCANNERS</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Forensic Auditing & Verification Engines</h2>
            <p className="text-slate-400 text-sm max-w-xl">Robust verification pipelines built to establish mathematical proof under strict legal examinations.</p>
          </div>

          {/* 4-card grid using 1px Hard Borders, no rounded corners, and glows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-deepslate border border-deepslate shadow-[0_0_30px_rgba(0,0,0,0.3)]">
            
            {/* Card 1: Signal Decomposition */}
            <div className="bg-obsidian p-8 md:p-10 space-y-6 flex flex-col justify-between hover:bg-deepslate/30 transition-all border-hard-slate hover:border-hard-amber">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 border border-amber-signal/20 bg-amber-signal/5 flex items-center justify-center rounded-none shadow-[0_0_6px_rgba(245,158,11,0.05)]">
                    <Activity size={12} className="text-amber-signal" />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-widest">DETECTION // AUDIO_VOICE</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Signal Decomposition</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Decompose voice signatures down to primary acoustic signals to isolate and expose voice clones, synthesizers, and vocoder remnants. Expose sub-perceptual patterns that bypass traditional biometric authentication.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-900/60 flex justify-between items-center text-[9px] text-slate-500 font-mono">
                <span>SAMPLE: 96KHZ / 24BIT</span>
                <span className="text-verity-green flex items-center gap-1 font-semibold">
                  <span className="h-1 w-1 bg-verity-green rounded-none" />
                  VERIFIED
                </span>
              </div>
            </div>

            {/* Card 2: Zero-Storage Privacy */}
            <div className="bg-obsidian p-8 md:p-10 space-y-6 flex flex-col justify-between hover:bg-deepslate/30 transition-all border-hard-slate hover:border-hard-amber">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 border border-slate-800 bg-slate-950 flex items-center justify-center rounded-none">
                    <Lock size={12} className="text-slate-400" />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">PRIVACY PROTOCOL // SECURE</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Zero-Storage Privacy</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  All digital signals are processed volatilely in secure, transient memory chambers. We enforce a zero-storage protocol: no documents, signatures, or metadata payloads ever touch local persistent filesystems. Post-scan, RAM segments are immediately wiped.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-900/60 flex justify-between items-center text-[9px] text-slate-500 font-mono">
                <span>STORAGE_RETENTION: 0.00ms</span>
                <span className="text-slate-400 flex items-center gap-1 font-semibold">
                  <span className="h-1 w-1 bg-slate-400 rounded-none" />
                  ENCRYPTED
                </span>
              </div>
            </div>

            {/* Card 3: Ledger Provenance */}
            <div className="bg-obsidian p-8 md:p-10 space-y-6 flex flex-col justify-between hover:bg-deepslate/30 transition-all border-hard-slate hover:border-hard-amber">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 border border-amber-signal/20 bg-amber-signal/5 flex items-center justify-center rounded-none">
                    <Database size={12} className="text-amber-signal" />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-widest">COURT_COMPLIANCE // LEDGER</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Ledger Provenance</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Register a cryptographically verifiable proof of digital assets. Every finished audit appends a SHA-256 hash stamp to an immutable, decentralized ledger. Secure a courtroom-admissible, tamper-evident chain of custody.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-900/60 flex justify-between items-center text-[9px] text-slate-500 font-mono">
                <span>HASHING: SHA-256</span>
                <span className="text-verity-green flex items-center gap-1 font-semibold">
                  <span className="h-1 w-1 bg-verity-green rounded-none" />
                  IMMUTABLE
                </span>
              </div>
            </div>

            {/* Card 4: Rapid BGV Audit */}
            <div className="bg-obsidian p-8 md:p-10 space-y-6 flex flex-col justify-between hover:bg-deepslate/30 transition-all border-hard-slate hover:border-hard-amber">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 border border-slate-800 bg-slate-950 flex items-center justify-center rounded-none">
                    <Clock size={12} className="text-slate-400" />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest">OPERATIONS // TURNAROUND</span>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">Rapid BGV Audit</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  Audit high-volume applicant pipelines with speed. The Veridex distributed parallel processing network delivers a 4-minute average turnaround for comprehensive identity and voice verification checkouts.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-900/60 flex justify-between items-center text-[9px] text-slate-500 font-mono">
                <span>LATENCY: &lt; 240.0s</span>
                <span className="text-verity-green flex items-center gap-1 font-semibold">
                  <span className="h-1 w-1 bg-verity-green rounded-none" />
                  AUTOMATED
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. More Social Proof: Logo Wall + Testimonial */}
      <section className="py-24 px-6 md:px-12 bg-obsidian border-b border-deepslate">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Partners Wall */}
          <div className="space-y-8 text-center">
            <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] block">// INTEGRATED OSINT DESKS</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {["OSINT_NETWORK", "LEX_FORENSICS", "DEPT_EVIDENTIARY", "DEFENSE_MEDIA_LABS"].map((partner) => (
                <div 
                  key={partner}
                  className="py-4 px-6 bg-[#030712] border border-deepslate flex items-center justify-center hover:border-slate-800 transition-colors"
                >
                  <span className="font-mono text-[9px] font-bold text-slate-500 tracking-widest">[{partner}]</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#030712] border border-deepslate p-8 md:p-12 relative text-left">
              {/* Subtle tech grid background watermark */}
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none select-none">
                <Binary size={120} className="text-white" />
              </div>
              <div className="space-y-6 relative z-10">
                <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.2em] block">// FIELD VALIDATION DATA</span>
                <p className="text-lg md:text-xl text-slate-200 leading-relaxed italic font-normal">
                  "Veridex has fundamentally altered our digital media pipeline. The ledger-based provenance logs and spectral signal decomposition provide our examiners with a scientific standard of verification that holds up under the most demanding OSINT and discovery requirements."
                </p>
                <div className="pt-6 border-t border-deepslate flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-mono text-xs font-bold text-white">DIGITAL EVIDENCE CONSORTIUM</h4>
                    <span className="font-mono text-[8px] text-slate-500 uppercase tracking-wider block mt-0.5">BOARD OF FORENSIC DIRECTORS // AUDIT BRANCH</span>
                  </div>
                  <span className="font-mono text-[9px] text-amber-signal font-bold px-3 py-1 bg-amber-signal/5 border border-amber-signal/20">
                    GRADE_A_COMPLIANT
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section className="py-24 px-6 md:px-12 bg-[#02050b] border-b border-deepslate">
        <div className="max-w-3xl mx-auto space-y-16">
          
          <div className="text-center space-y-4">
            <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// VALIDATION FAQ</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">System FAQ & Methodology</h2>
            <p className="text-slate-400 text-sm max-w-md mx-auto">Find answers regarding the forensic verification pipelines and admissibility standards.</p>
          </div>

          {/* Minimal Accordion */}
          <div className="space-y-2">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="bg-[#030712] border border-deepslate"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 flex items-center justify-between text-left hover:bg-[#070b19]/40 transition-all"
                  >
                    <h4 className="text-xs font-mono font-bold text-white flex items-center gap-3">
                      <span className="text-amber-signal">0{index + 1} //</span>
                      {faq.question}
                    </h4>
                    <span className="text-slate-500">
                      <ChevronDown 
                        size={12} 
                        className={`transform transition-transform duration-250 ${isOpen ? "rotate-180 text-amber-signal" : ""}`} 
                      />
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[220px] border-t border-slate-900/50" : "max-h-0"
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

      {/* 9. 2nd CTA Section (Full-Width Deep Slate) */}
      <section className="py-24 px-6 md:px-12 bg-deepslate relative overflow-hidden border-b border-slate-900 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.01),transparent_60%)] -z-10" />
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <span className="font-mono text-[9px] font-bold text-amber-signal uppercase tracking-[0.3em] block">// AUTOMATED INTEGRATION</span>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Integrate Forensic Assurance <br />
            into Your Workflow.
          </h2>
          <p className="text-slate-400 text-xs max-w-lg mx-auto leading-relaxed font-sans">
            Protect your background verification systems, media assets, and legal pipelines. Deploy our high-throughput REST API for scalable content auditing.
          </p>
          <div className="pt-4">
            <Link 
              href="/request-demo"
              className="btn-switch-primary py-4 px-8"
            >
              <span className="led-indicator" />
              <span>Get API Access Now</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Founder's Note Section */}
      <section className="py-24 px-6 md:px-12 bg-obsidian">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#030712] border border-deepslate p-8 md:p-12 relative overflow-hidden">
            
            {/* Watermark Logo */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.015] pointer-events-none select-none">
              <Cpu size={140} className="text-white" />
            </div>

            <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 relative z-10">
              
              {/* Headshot Column */}
              <div className="shrink-0 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                <div className="relative h-28 w-28 border border-slate-900 bg-slate-950 p-1">
                  <div className="absolute inset-0 border border-amber-signal/20 z-20 pointer-events-none" />
                  <Image 
                    src="/images/dr_elena.png"
                    alt="Dr. Elena Vance"
                    fill
                    sizes="112px"
                    className="object-cover grayscale contrast-125 brightness-95"
                  />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-white">Dr. Elena Vance</h4>
                  <span className="font-mono text-[8px] text-amber-signal uppercase tracking-widest block mt-0.5">FOUNDER // PRINCIPAL SCIENTIST</span>
                  <span className="font-mono text-[7px] text-slate-500 uppercase tracking-widest block">DEPT OF COMPUTATIONAL SIGNAL ANALYSIS</span>
                </div>
              </div>

              {/* Note Content Column */}
              <div className="flex-grow space-y-6 text-left">
                <span className="font-mono text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] block">// FOUNDERS_DIRECTIVE // TRUTH_STANDARD</span>
                <h3 className="text-xl font-bold text-white tracking-tight">Probabilistic Evidence, Not Poetry.</h3>
                <p className="text-xs text-slate-300 leading-relaxed italic border-l border-amber-signal/30 pl-4 font-sans">
                  "We started Veridex Forensics because generic detectors fail to provide the absolute transparency required by investigators. The current internet is flooded with synthetic clones and manipulated media, yet legacy tools expect you to trust their binary ratings without proof."
                </p>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  "Our system decomposes signals into primary mathematical indicators, leaving an immutable, auditable fingerprint. We stand committed to providing raw metrics, detailed anomaly graphs, and cryptographic proof of verification."
                </p>
                
                <div className="pt-4 border-t border-slate-900/60 flex items-center justify-between">
                  <span className="font-serif text-sm font-bold text-amber-signal italic">Elena Vance</span>
                  <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">
                    THE SCIENCE OF COGNITIVE VERITY
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
