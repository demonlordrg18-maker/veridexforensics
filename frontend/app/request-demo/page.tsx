"use client";

import { motion } from "framer-motion";
import { Navbar, Footer } from "../../components/Navigation";
import { 
  ArrowRight, 
  CheckCircle,
  Lock,
  Zap,
  ShieldCheck,
  ChevronRight,
  Mail,
  FileText
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    clarity: (...args: any[]) => void;
  }
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/meevnewj";

const ValueProp = ({ icon: Icon, title, desc }: any) => (
  <div className="flex gap-4">
    <div className="h-10 w-10 shrink-0 border border-deepslate bg-[#030712] flex items-center justify-center text-amber-signal rounded-none">
      <Icon size={18} />
    </div>
    <div>
      <h4 className="font-bold text-white text-xs uppercase font-geist tracking-wide">{title}</h4>
      <p className="text-[11px] text-slate-500 font-sans leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default function RequestDemoPage() {
  const [submitted, setSubmitted] = useState<null | {
    id: string;
    created_at: string;
    response_time: string;
    first_name: string;
    email: string;
  }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [startedAt, setStartedAt] = useState("");
  
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    organization: "",
    role: "",
    use_case: "",
    notes: "",
    honeypot: ""
  });

  useEffect(() => {
    setStartedAt(new Date().toISOString());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Honeypot: silently accept to reduce spam signal
      if (formData.honeypot?.trim()) {
        setSubmitted({
          id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `lead_${Date.now()}`,
          created_at: new Date().toISOString(),
          response_time: "within 1 business day",
          first_name: formData.full_name.trim().split(" ")[0] || "there",
          email: formData.email,
        });
        return;
      }

      const resp = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          started_at: startedAt,
        }),
      });

      if (resp.ok) {
        let data: any = null;
        try {
          data = await resp.json();
        } catch {
          // Some Formspree responses may have no JSON body; ok status is enough.
        }

        window.gtag?.("event", "demo_submitted", {
          role: formData.role,
          use_case: formData.use_case,
        });
        window.clarity?.("event", "demo_submitted");
        setSubmitted({
          id: data?.id || (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `lead_${Date.now()}`),
          created_at: data?.created_at || new Date().toISOString(),
          response_time: data?.response_time || "within 1 business day",
          first_name: formData.full_name.trim().split(" ")[0] || "there",
          email: formData.email,
        });
        setFormData({
          full_name: "",
          email: "",
          organization: "",
          role: "",
          use_case: "",
          notes: "",
          honeypot: "",
        });
        setStartedAt(new Date().toISOString());
      } else {
        let msg = "Something went wrong. Please try again.";
        try {
          const data = await resp.json();
          msg =
            data?.error ||
            data?.message ||
            (Array.isArray(data?.errors) && data.errors[0]?.message) ||
            msg;
        } catch {
          // ignore
        }
        setError(msg);
      }
    } catch {
      setError("Failed to submit the request. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
        <Navbar />
        <section className="pt-56 pb-32 px-6 flex flex-col items-center text-center max-w-4xl mx-auto">
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="h-20 w-20 border border-amber-signal/30 bg-amber-signal/5 flex items-center justify-center text-amber-signal mb-8 rounded-none shadow-[0_0_15px_rgba(245,158,11,0.2)]"
           >
              <CheckCircle size={36} />
           </motion.div>
           <h1 className="text-4xl md:text-5xl font-black text-white font-geist uppercase mb-6">Demo Requested.</h1>
           <p className="text-base text-slate-400 max-w-xl mb-12">
             Thank you, <span className="text-white font-bold">{submitted.first_name}</span>. A forensic specialist will review your request and contact you at <span className="text-amber-signal font-mono">{submitted.email}</span> {submitted.response_time} to schedule your walkthrough.
           </p>

           <div className="border border-deepslate bg-[#030712] p-6 w-full max-w-2xl mb-6 text-left rounded-none relative font-mono text-[11px]">
             <div className="absolute top-0 left-0 right-0 h-[1px] bg-amber-signal/30" />
             <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 mb-3">// REQUEST RECEIPT MANIFEST</p>
             <p className="text-sm text-white mb-2 font-bold">Reference ID: {submitted.id}</p>
             <p className="text-slate-400">Submitted: {new Date(submitted.created_at).toLocaleString()}</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-4 w-full max-w-3xl mb-12 font-mono text-[11px]">
              <Link href="/audit" className="group flex flex-col items-center gap-3 p-6 bg-[#030712] border border-deepslate rounded-none hover:border-amber-signal/30 transition-all text-center">
                <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal group-hover:border-amber-signal/40 transition-colors">
                  <Zap size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs uppercase font-geist">Try Live Audit</h4>
                  <p className="text-[9px] text-slate-500 mt-1 font-sans">Run a test while you wait.</p>
                </div>
              </Link>

              <Link href="/sample-audit" className="group flex flex-col items-center gap-3 p-6 bg-[#030712] border border-deepslate rounded-none hover:border-amber-signal/30 transition-all text-center">
                <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal group-hover:border-amber-signal/40 transition-colors">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs uppercase font-geist">Sample Report</h4>
                  <p className="text-[9px] text-slate-500 mt-1 font-sans">See a forensic output.</p>
                </div>
              </Link>
              
              <a href="mailto:forensics@veridex.ai" className="group flex flex-col items-center gap-3 p-6 bg-[#030712] border border-deepslate rounded-none hover:border-amber-signal/30 transition-all text-center">
                <div className="h-10 w-10 border border-deepslate bg-deepslate/30 flex items-center justify-center text-amber-signal group-hover:border-amber-signal/40 transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xs uppercase font-geist">Direct Contact</h4>
                  <p className="text-[9px] text-slate-500 mt-1 font-sans">Need urgent access?</p>
                </div>
              </a>
           </div>

           <div className="font-mono">
             <Link href="/" className="btn-switch-primary">Return Home</Link>
           </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      
      <section className="pt-32 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-obsidian border-b border-deepslate relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 border border-amber-signal/30 bg-amber-signal/5 px-4 py-1.5 text-[9px] font-mono font-bold text-amber-signal uppercase tracking-[0.3em] rounded-none">
              // ACQUIRE FORENSIC PLATFORM ACCESS
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight font-geist uppercase">
              Get a Forensic <br /><span className="text-amber-signal">Walkthrough.</span>
            </h1>
            <p className="text-base text-slate-400 leading-relaxed font-sans">
              See the Veridex engine in action. We'll walk you through a live audit, explain our signal methodology, and discuss integration into your specific workflow.
            </p>
            
            <div className="space-y-8 pt-4">
              <ValueProp 
                icon={ShieldCheck} 
                title="Sober Heuristics" 
                desc="Understand the science behind our forensic signal detection and verity indexing." 
              />
              <ValueProp 
                icon={Lock} 
                title="Court-Ready Security" 
                desc="Learn about our private deployment options and immutable ledger architecture." 
              />
              <ValueProp 
                icon={Zap} 
                title="API Access" 
                desc="Review technical documentation for integrating Veridex into your newsroom or legal CMS." 
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="border border-deepslate bg-[#030712] p-10 rounded-none relative"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-amber-signal/30" />
            <h3 className="text-2xl font-black text-white font-geist uppercase mb-8">// Request Walkthrough</h3>
            <form onSubmit={handleSubmit} className="space-y-6 font-mono text-[11px]">
               {error && (
                 <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-none text-xs font-bold mb-6 font-mono">
                   {error}
                 </div>
               )}

               {/* Honeypot field */}
               <div className="hidden">
                 <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
               </div>

               <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-[9px] font-bold uppercase text-slate-500 tracking-widest ml-1">// Full Name</label>
                   <input 
                     required 
                     type="text" 
                     name="full_name"
                     value={formData.full_name}
                     onChange={handleChange}
                     placeholder="Jane Doe" 
                     className="w-full bg-[#020617] border border-deepslate rounded-none px-4 py-3 text-white placeholder:text-slate-800 focus:border-amber-signal/60 focus:outline-none transition-all" 
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[9px] font-bold uppercase text-slate-500 tracking-widest ml-1">// Prof. Email</label>
                   <input 
                     required 
                     type="email" 
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="jane@company.com" 
                     className="w-full bg-[#020617] border border-deepslate rounded-none px-4 py-3 text-white placeholder:text-slate-800 focus:border-amber-signal/60 focus:outline-none transition-all" 
                   />
                 </div>
               </div>
               
               <div className="space-y-2">
                 <label className="text-[9px] font-bold uppercase text-slate-500 tracking-widest ml-1">// Organization</label>
                 <input 
                   required 
                   type="text" 
                   name="organization"
                   value={formData.organization}
                   onChange={handleChange}
                   placeholder="Newsroom, Law Firm, or Agency" 
                   className="w-full bg-[#020617] border border-deepslate rounded-none px-4 py-3 text-white placeholder:text-slate-800 focus:border-amber-signal/60 focus:outline-none transition-all" 
                 />
               </div>

               <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-[9px] font-bold uppercase text-slate-500 tracking-widest ml-1">// Your Role</label>
                   <div className="relative">
                     <select 
                       required 
                       name="role"
                       value={formData.role}
                       onChange={handleChange}
                       className="w-full bg-[#020617] border border-deepslate rounded-none px-4 py-3 text-white focus:border-amber-signal/60 focus:outline-none appearance-none cursor-pointer"
                     >
                        <option value="">Select role...</option>
                        <option value="journalist">Journalist / Editor</option>
                        <option value="legal">Legal Counsel</option>
                        <option value="research">Researcher</option>
                        <option value="risk">Risk / Trust & Safety</option>
                        <option value="eng">Engineering / Product</option>
                     </select>
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[9px] font-bold uppercase text-slate-500 tracking-widest ml-1">// Use Case</label>
                   <div className="relative">
                     <select 
                       required 
                       name="use_case"
                       value={formData.use_case}
                       onChange={handleChange}
                       className="w-full bg-[#020617] border border-deepslate rounded-none px-4 py-3 text-white focus:border-amber-signal/60 focus:outline-none appearance-none cursor-pointer"
                     >
                        <option value="">Select use case...</option>
                        <option value="evidence">Evaluating Evidence</option>
                        <option value="newsroom">Newsroom Verification</option>
                        <option value="archive">Archival Research</option>
                        <option value="enterprise">Enterprise/API Access</option>
                     </select>
                   </div>
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[9px] font-bold uppercase text-slate-500 tracking-widest ml-1">// Specific Needs / Notes</label>
                 <textarea 
                   rows={3} 
                   name="notes"
                   value={formData.notes}
                   onChange={handleChange}
                   placeholder="Describe what media types you verify most frequently..." 
                   className="w-full bg-[#020617] border border-deepslate rounded-none px-4 py-3 text-white placeholder:text-slate-800 focus:border-amber-signal/60 focus:outline-none transition-all" 
                 />
               </div>

               <button 
                 type="submit" 
                 disabled={loading}
                 className="w-full btn-switch-primary py-3 text-xs uppercase"
               >
                 {loading ? "Processing..." : "Request Forensic Walkthrough"}
               </button>
               
               <p className="text-center text-[9px] text-slate-600 uppercase tracking-widest mt-6">
                 We respect your privacy. All requests are subject to verification check.
               </p>
            </form>
          </motion.div>
 
        </div>
      </section>

      <Footer />
    </div>
  );
}
