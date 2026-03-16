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

const ValueProp = ({ icon: Icon, title, desc }: any) => (
  <div className="flex gap-4">
    <div className="h-10 w-10 shrink-0 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
      <Icon size={20} />
    </div>
    <div>
      <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
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
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
      const resp = await fetch(`${apiBase}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          started_at: startedAt,
        }),
      });

      const data = await resp.json();
      if (resp.ok) {
        const w = window as Window & { gtag?: (...args: unknown[]) => void; clarity?: (...args: unknown[]) => void };
        w.gtag?.("event", "request_demo_submit", {
          role: formData.role,
          use_case: formData.use_case,
        });
        w.clarity?.("event", "request_demo_submit");
        setSubmitted({
          id: data.id,
          created_at: data.created_at,
          response_time: data.response_time || "within 1 business day",
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
        setError(data.detail || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to connect to the forensic server. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-56 pb-32 px-4 flex flex-col items-center text-center">
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="h-24 w-24 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 mb-8 border border-teal-500/20 shadow-2xl shadow-teal-500/10"
           >
              <CheckCircle size={48} />
           </motion.div>
           <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Demo Requested.</h1>
           <p className="text-xl text-slate-400 max-w-xl mb-12">
             Thank you, <span className="text-white font-bold">{submitted.first_name}</span>. A forensic specialist will review your request and contact you at <span className="text-teal-400 font-mono">{submitted.email}</span> {submitted.response_time} to schedule your walkthrough.
           </p>

           <div className="glass rounded-3xl border border-white/5 p-6 w-full max-w-2xl mb-6 text-left">
             <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 mb-3">Request Receipt</p>
             <p className="text-sm text-white mb-2">Reference ID: {submitted.id}</p>
             <p className="text-sm text-slate-400">Submitted: {new Date(submitted.created_at).toLocaleString()}</p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-4 w-full max-w-2xl mb-12">
              <Link href="/sample-audit" className="group flex items-center gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all text-left">
                <div className="h-12 w-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">View Sample Audit</h4>
                  <p className="text-xs text-slate-500">Explore a real forensic report while you wait.</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-slate-700 group-hover:text-teal-500 transition-colors" />
              </Link>
              
              <a href="mailto:forensics@veridex.ai" className="group flex items-center gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all text-left">
                <div className="h-12 w-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Direct Contact</h4>
                  <p className="text-xs text-slate-500">Need urgent access? Email us directly.</p>
                </div>
                <ChevronRight size={16} className="ml-auto text-slate-700 group-hover:text-teal-500 transition-colors" />
              </a>
           </div>

           <Link href="/" className="btn-primary px-12 py-4">Return Home</Link>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 px-4 md:px-12 bg-slate-950">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 px-4 py-1.5 text-[10px] font-black text-teal-400 border border-teal-500/20 mb-8 uppercase tracking-[0.3em]">
              Request Platform Access
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
              Get a Forensic <br /><span className="text-gradient">Walkthrough.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed mb-12">
              See the Veridex engine in action. We'll walk you through a live audit, explain our signal methodology, and discuss integration into your specific workflow.
            </p>
            
            <div className="space-y-8">
              <ValueProp 
                icon={ShieldCheck} 
                title="Sober Methodology" 
                desc="Understand the science behind our forensic signal detection and verity indexing." 
              />
              <ValueProp 
                icon={Lock} 
                title="Enterprise Security" 
                desc="Learn about our private deployment options and immutable ledger architecture." 
              />
              <ValueProp 
                icon={Zap} 
                title="API Integration" 
                desc="Review technical documentation for integrating Veridex into your newsroom or legal CMS." 
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-dark p-10 rounded-[3rem] border border-white/5 relative bg-white/[0.02]"
          >
            <h3 className="text-2xl font-black text-white mb-8">Request Walkthrough</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
               {error && (
                 <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-xs font-bold mb-6">
                   {error}
                 </div>
               )}

               {/* Honeypot field */}
               <div className="hidden">
                 <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} tabIndex={-1} autoComplete="off" />
               </div>

               <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Full Name</label>
                   <input 
                     required 
                     type="text" 
                     name="full_name"
                     value={formData.full_name}
                     onChange={handleChange}
                     placeholder="Jane Doe" 
                     className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:border-teal-500 transition-all focus:outline-none" 
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Professional Email</label>
                   <input 
                     required 
                     type="email" 
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="jane@company.com" 
                     className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:border-teal-500 transition-all focus:outline-none" 
                   />
                 </div>
               </div>
               
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Organization</label>
                 <input 
                   required 
                   type="text" 
                   name="organization"
                   value={formData.organization}
                   onChange={handleChange}
                   placeholder="Newsroom, Law Firm, or Research Inst." 
                   className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:border-teal-500 transition-all focus:outline-none" 
                 />
               </div>

               <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Your Role</label>
                   <select 
                     required 
                     name="role"
                     value={formData.role}
                     onChange={handleChange}
                     className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-teal-500 transition-all focus:outline-none appearance-none cursor-pointer"
                   >
                      <option value="">Select role...</option>
                      <option value="journalist">Journalist / Editor</option>
                      <option value="legal">Legal Counsel</option>
                      <option value="research">Researcher</option>
                      <option value="risk">Risk / Trust & Safety</option>
                      <option value="eng">Engineering / Product</option>
                   </select>
                 </div>
                 <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Primary Use Case</label>
                   <select 
                     required 
                     name="use_case"
                     value={formData.use_case}
                     onChange={handleChange}
                     className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white focus:border-teal-500 transition-all focus:outline-none appearance-none cursor-pointer"
                   >
                      <option value="">Select use case...</option>
                      <option value="evidence">Evaluating Evidence</option>
                      <option value="newsroom">Newsroom Verification</option>
                      <option value="archive">Archival Research</option>
                      <option value="enterprise">Enterprise/API Access</option>
                   </select>
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Specific Needs / Sample Notes</label>
                 <textarea 
                   rows={4} 
                   name="notes"
                   value={formData.notes}
                   onChange={handleChange}
                   placeholder="Tell us about the content types you verify most often..." 
                   className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-slate-600 focus:border-teal-500 transition-all focus:outline-none" 
                 />
               </div>

               <button 
                type="submit" 
                disabled={loading}
                className={`w-full btn-primary py-5 text-lg font-black flex items-center justify-center gap-3 transition-all ${loading ? 'opacity-70 cursor-not-allowed scale-[0.98]' : 'hover:scale-[1.02]'}`}
               >
                 {loading ? "Processing..." : "Request Forensic Walkthrough"}
                 {!loading && <ArrowRight size={20} />}
               </button>
               
               <p className="text-center text-[10px] text-slate-600 uppercase tracking-widest mt-6">
                 We respect your privacy. Requests are validated and reviewed by a human.
               </p>
            </form>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

