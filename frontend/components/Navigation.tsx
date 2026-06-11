"use client";

import Link from "next/link";
import { ChevronDown, Terminal, Shield } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between py-4 px-6 md:px-12 fixed top-0 w-full z-50 bg-obsidian border-b border-deepslate shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
      {/* Top Laser Scanning Line indicator for active page */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-amber-signal shadow-[0_0_8px_#F59E0B]" />
      
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <div className="h-7 w-7 rounded-none border border-amber-signal/30 bg-[#0F172A] flex items-center justify-center font-mono text-xs text-amber-signal font-bold shadow-[inset_0_0_5px_rgba(245,158,11,0.2)]">
          V
        </div>
        <span className="text-sm font-mono font-black uppercase tracking-widest text-slate-100 flex items-center gap-1.5">
          Veridex <span className="text-amber-signal">// Forensic</span>
        </span>
      </Link>
      
      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-8 font-mono text-[10px] uppercase tracking-wider text-slate-400">
        <Link href="/platform" className="hover:text-amber-signal transition-colors flex items-center gap-1.5 py-2">
          <span className="h-1 w-1 bg-slate-700 rounded-none group-hover:bg-amber-signal" />
          Platform
        </Link>
        
        <div className="relative group">
          <button className="flex items-center gap-1 hover:text-amber-signal transition-colors py-2">
            Solutions <ChevronDown size={10} />
          </button>
          <div className="absolute top-full left-0 mt-1 w-48 bg-[#030712] border border-deepslate p-1 rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-[60]">
            <Link href="/solutions/journalists" className="block px-4 py-2 text-[10px] text-slate-400 hover:text-amber-signal hover:bg-deepslate/40 transition-all rounded-none border-b border-slate-900/50">Journalists</Link>
            <Link href="/solutions/legal-teams" className="block px-4 py-2 text-[10px] text-slate-400 hover:text-amber-signal hover:bg-deepslate/40 transition-all rounded-none border-b border-slate-900/50">Legal Teams</Link>
            <Link href="/solutions/researchers" className="block px-4 py-2 text-[10px] text-slate-400 hover:text-amber-signal hover:bg-deepslate/40 transition-all rounded-none">Researchers</Link>
          </div>
        </div>

        <div className="relative group">
          <button className="flex items-center gap-1 hover:text-amber-signal transition-colors py-2">
            Features <ChevronDown size={10} />
          </button>
          <div className="absolute top-full left-0 mt-1 w-56 bg-[#030712] border border-deepslate p-1 rounded-none shadow-[0_10px_30px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-[60]">
            <Link href="/features/multimodal-forensics" className="block px-4 py-2 text-[10px] text-slate-400 hover:text-amber-signal hover:bg-deepslate/40 transition-all rounded-none border-b border-slate-900/50">Multimodal Forensics</Link>
            <Link href="/features/claim-decomposition" className="block px-4 py-2 text-[10px] text-slate-400 hover:text-amber-signal hover:bg-deepslate/40 transition-all rounded-none border-b border-slate-900/50">Claim Decomposition</Link>
            <Link href="/features/verity-index" className="block px-4 py-2 text-[10px] text-slate-400 hover:text-amber-signal hover:bg-deepslate/40 transition-all rounded-none border-b border-slate-900/50">Verity Index</Link>
            <Link href="/features/bias-mapping" className="block px-4 py-2 text-[10px] text-slate-400 hover:text-amber-signal hover:bg-deepslate/40 transition-all rounded-none border-b border-slate-900/50">Bias Mapping</Link>
            <Link href="/features/copyright-risk-analysis" className="block px-4 py-2 text-[10px] text-slate-400 hover:text-amber-signal hover:bg-deepslate/40 transition-all rounded-none">Copyright Risk</Link>
          </div>
        </div>

        <Link href="/methodology" className="hover:text-amber-signal transition-colors py-2">Methodology</Link>
        <Link href="/pricing" className="hover:text-amber-signal transition-colors py-2">Pricing</Link>
        <Link href="/learn" className="hover:text-amber-signal transition-colors py-2">Learn</Link>
      </div>

      {/* Toggles & CTA */}
      <div className="flex items-center gap-6">
        <Link 
          href="/audit" 
          onClick={() => {
            window.gtag?.('event', 'run_audit_click', {
              event_category: 'engagement',
              event_label: 'navbar_open_auditor',
            });
          }}
          className="hidden sm:inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-slate-400 hover:text-slate-100 transition-colors"
        >
          <span className="h-1.5 w-1.5 rounded-none bg-verity-green shadow-[0_0_8px_#10B981] animate-pulse" />
          [ Open Auditor ]
        </Link>
        <Link 
          href="/request-demo" 
          onClick={() => {
            window.gtag?.('event', 'demo_click', {
              event_category: 'engagement',
              event_label: 'navbar_request_demo',
            });
          }}
          className="btn-switch-primary py-1.5 px-4 text-[9px] hover:glow-amber-strong"
        >
          <span className="led-indicator-amber" />
          Request Demo
        </Link>
      </div>
    </nav>
  );
};

export const Footer = () => (
  <footer className="py-20 px-6 md:px-12 border-t border-deepslate bg-[#030611] scanner-grid">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
      <div className="max-w-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-none border border-amber-signal/30 bg-[#0F172A] flex items-center justify-center font-mono text-sm text-amber-signal font-bold shadow-[inset_0_0_5px_rgba(245,158,11,0.25)]">
            V
          </div>
          <span className="text-sm font-mono font-black uppercase tracking-widest text-slate-100">
            Veridex <span className="text-amber-signal">// Forensic</span>
          </span>
        </div>
        <p className="text-slate-400 font-sans text-xs leading-relaxed">
          Professional-grade forensic verification engines for the era of synthetic media, deepfakes, and identity cloning. Defensible digital trust.
        </p>
        <div className="font-mono text-[9px] text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <span className="h-2 w-2 bg-verity-green shadow-[0_0_8px_#10B981]" />
          Verity System State // ONLINE
        </div>
      </div>
      
      <div>
        <h5 className="text-slate-100 font-mono font-bold mb-6 text-xs uppercase tracking-widest">// Platform</h5>
        <ul className="space-y-4 text-xs font-mono text-slate-400">
          <li><Link href="/platform" className="hover:text-amber-signal transition-colors">The Engine</Link></li>
          <li><Link href="/pricing" className="hover:text-amber-signal transition-colors">Plans & Pricing</Link></li>
          <li><Link href="/audit" className="hover:text-amber-signal transition-colors">Professional Auditor</Link></li>
          <li><Link href="/features/verity-index" className="hover:text-amber-signal transition-colors">Verity Index</Link></li>
          <li><Link href="/sample-audit" className="hover:text-amber-signal transition-colors">Sample Audit</Link></li>
        </ul>
      </div>

      <div>
        <h5 className="text-slate-100 font-mono font-bold mb-6 text-xs uppercase tracking-widest">// Methodology</h5>
        <ul className="space-y-4 text-xs font-mono text-slate-400">
          <li><Link href="/methodology" className="hover:text-amber-signal transition-colors">Our Methodology</Link></li>
          <li><Link href="/limitations" className="hover:text-amber-signal transition-colors">Limitations</Link></li>
          <li><Link href="/about" className="hover:text-amber-signal transition-colors">About Veridex</Link></li>
          <li><Link href="/privacy" className="hover:text-amber-signal transition-colors">Privacy Policy</Link></li>
        </ul>
      </div>

      <div>
        <h5 className="text-slate-100 font-mono font-bold mb-6 text-xs uppercase tracking-widest">// Knowledge</h5>
        <ul className="space-y-4 text-xs font-mono text-slate-400">
          <li><Link href="/learn" className="hover:text-amber-signal transition-colors">Learn Hub</Link></li>
          <li><Link href="/learn/deepfake-detection" className="hover:text-amber-signal transition-colors">Deepfake Guide</Link></li>
          <li>
            <Link 
              href="/request-demo" 
              onClick={() => {
                window.gtag?.('event', 'demo_click', {
                  event_category: 'engagement',
                  event_label: 'footer_book_walkthrough',
                });
              }}
              className="hover:text-amber-signal transition-colors"
            >
              Book a Walkthrough
            </Link>
          </li>
          <li><Link href="/terms" className="hover:text-amber-signal transition-colors">Terms of Service</Link></li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-deepslate flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
      <p className="text-slate-500 font-mono text-[9px] tracking-[0.2em] uppercase font-bold">
        &copy; 2026 Veridex Forensic Systems. Supported outputs for professional review.
      </p>
      <div className="flex gap-6 font-mono text-[8px] text-slate-600">
        <span>[ SECURE NODE: VDX-EAST-04 ]</span>
        <span>[ ZK-PROOF APV: COMPLIANT ]</span>
      </div>
    </div>
  </footer>
);
