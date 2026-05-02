"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between py-6 px-4 md:px-12 glass-dark fixed top-0 w-full z-50 border-b border-white/5">
      <Link href="/" className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-teal-600 flex items-center justify-center font-bold text-white">V</div>
        <span className="text-xl font-bold tracking-tight text-white">Veridex <span className="text-teal-400">Forensics</span></span>
      </Link>
      
      <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-400">
        <Link href="/platform" className="hover:text-teal-400 transition-colors">Platform</Link>
        
        <div className="relative group">
          <button 
            className="flex items-center gap-1 hover:text-teal-400 transition-colors"
          >
            Solutions <ChevronDown size={14} />
          </button>
          <div className="absolute top-full left-0 mt-2 w-48 glass rounded-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-[60]">
            <Link href="/solutions/journalists" className="block px-4 py-2 hover:bg-white/5 rounded-lg">Journalists</Link>
            <Link href="/solutions/legal-teams" className="block px-4 py-2 hover:bg-white/5 rounded-lg">Legal Teams</Link>
            <Link href="/solutions/researchers" className="block px-4 py-2 hover:bg-white/5 rounded-lg">Researchers</Link>
          </div>
        </div>

        <div className="relative group">
          <button 
            className="flex items-center gap-1 hover:text-teal-400 transition-colors"
          >
            Features <ChevronDown size={14} />
          </button>
          <div className="absolute top-full left-0 mt-2 w-56 glass rounded-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-2 z-[60]">
            <Link href="/features/multimodal-forensics" className="block px-4 py-2 hover:bg-white/5 rounded-lg">Multimodal Forensics</Link>
            <Link href="/features/claim-decomposition" className="block px-4 py-2 hover:bg-white/5 rounded-lg">Claim Decomposition</Link>
            <Link href="/features/verity-index" className="block px-4 py-2 hover:bg-white/5 rounded-lg">Verity Index</Link>
            <Link href="/features/bias-mapping" className="block px-4 py-2 hover:bg-white/5 rounded-lg">Bias Mapping</Link>
            <Link href="/features/copyright-risk-analysis" className="block px-4 py-2 hover:bg-white/5 rounded-lg">Copyright Risk</Link>
          </div>
        </div>

        <Link href="/methodology" className="hover:text-teal-400 transition-colors">Methodology</Link>
        <Link href="/learn" className="hover:text-teal-400 transition-colors">Learn</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          href="/audit" 
          onClick={() => {
            window.gtag?.('event', 'run_audit_click', {
              event_category: 'engagement',
              event_label: 'navbar_open_auditor',
            });
          }}
          className="hidden sm:block text-sm font-bold text-slate-400 hover:text-white transition-colors"
        >
          Open Auditor
        </Link>
        <Link 
          href="/request-demo" 
          onClick={() => {
            window.gtag?.('event', 'demo_click', {
              event_category: 'engagement',
              event_label: 'navbar_request_demo',
            });
          }}
          className="btn-primary py-2 px-5 text-sm whitespace-nowrap"
        >
          Request Demo
        </Link>
      </div>
    </nav>
  );
};

export const Footer = () => (
  <footer className="py-20 px-4 md:px-12 border-t border-white/5 bg-slate-950">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      <div className="max-w-xs">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-8 w-8 rounded-lg bg-teal-600 flex items-center justify-center font-bold text-white">V</div>
          <span className="text-xl font-bold tracking-tight text-white">Veridex <span className="text-teal-400">Forensics</span></span>
        </div>
        <p className="text-slate-500 text-sm leading-relaxed">
          Professional-grade forensic verification for the era of synthetic media. Building defensible trust since 2024.
        </p>
      </div>
      
      <div>
        <h5 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h5>
        <ul className="space-y-4 text-sm text-slate-500">
          <li><Link href="/platform" className="hover:text-teal-400 transition-colors">The Engine</Link></li>
          <li><Link href="/audit" className="hover:text-teal-400 transition-colors">Professional Auditor</Link></li>
          <li><Link href="/features/verity-index" className="hover:text-teal-400 transition-colors">Verity Index</Link></li>
          <li><Link href="/sample-audit" className="hover:text-teal-400 transition-colors">Sample Audit</Link></li>
        </ul>
      </div>

      <div>
        <h5 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Trust & Methodology</h5>
        <ul className="space-y-4 text-sm text-slate-500">
          <li><Link href="/methodology" className="hover:text-teal-400 transition-colors">Our Methodology</Link></li>
          <li><Link href="/limitations" className="hover:text-teal-400 transition-colors">Limitations</Link></li>
          <li><Link href="/about" className="hover:text-teal-400 transition-colors">About Veridex</Link></li>
          <li><Link href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
        </ul>
      </div>

      <div>
        <h5 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Knowledge</h5>
        <ul className="space-y-4 text-sm text-slate-500">
          <li><Link href="/learn" className="hover:text-teal-400 transition-colors">Learn Hub</Link></li>
          <li><Link href="/learn/deepfake-detection" className="hover:text-teal-400 transition-colors">Deepfake Guide</Link></li>
          <li>
            <Link 
              href="/request-demo" 
              onClick={() => {
                window.gtag?.('event', 'demo_click', {
                  event_category: 'engagement',
                  event_label: 'footer_book_walkthrough',
                });
              }}
              className="hover:text-teal-400 transition-colors"
            >
              Book a Walkthrough
            </Link>
          </li>
          <li><Link href="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link></li>
        </ul>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-slate-600 text-[10px] tracking-[0.2em] uppercase font-bold">
        &copy; 2026 Veridex Forensic Systems. Supported outputs for professional review.
      </p>
      <div className="flex gap-6">
        <div className="h-5 w-5 rounded-full bg-white/5 border border-white/10" />
        <div className="h-5 w-5 rounded-full bg-white/5 border border-white/10" />
        <div className="h-5 w-5 rounded-full bg-white/5 border border-white/10" />
      </div>
    </div>
  </footer>
);
