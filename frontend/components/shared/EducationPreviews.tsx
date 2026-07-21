"use client";

import React, { useState } from "react";
import { 
  Users, 
  FileSpreadsheet, 
  GraduationCap, 
  Layers, 
  Calendar, 
  ArrowUpRight, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Lock, 
  ShieldAlert,
  Sparkles,
  Search,
  BookOpen
} from "lucide-react";

type PreviewTab = "faculty" | "student" | "institution";

export function EducationPreviews() {
  const [activeTab, setActiveTab] = useState<PreviewTab>("faculty");

  return (
    <div className="w-full bg-[#02050a]/90 border border-deepslate relative overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.8)]">
      {/* Blueprint background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Header controls */}
      <div className="px-4 py-3 bg-[#030712] border-b border-deepslate flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-amber-signal" size={16} />
          <span className="font-mono text-[10px] font-bold text-slate-200 tracking-wider">
            VERIDEX_EDU_ENGINE // INTERACTIVE_DEMO
          </span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          {(["faculty", "student", "institution"] as PreviewTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-initial py-1 px-3 font-mono text-[9px] uppercase tracking-wider transition-all border ${
                activeTab === tab 
                  ? "bg-amber-signal/10 border-amber-signal text-amber-signal shadow-[0_0_8px_rgba(245,158,11,0.15)]"
                  : "bg-transparent border-slate-800 text-slate-500 hover:text-slate-300"
              }`}
            >
              [{tab} PREVIEW]
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Screen */}
      <div className="p-6 relative z-10 min-h-[360px] text-left">
        
        {/* FACULTY WORKSPACE PREVIEW */}
        {activeTab === "faculty" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white">Faculty Workspace Portal</h4>
                <p className="text-[10px] text-slate-500">Instructor: Prof. Sarah Jenkins | Dept. of Computer Science</p>
              </div>
              <div className="flex gap-4 font-mono text-[9px]">
                <div className="bg-[#030712] border border-deepslate px-3 py-1.5">
                  <span className="text-slate-500 block">DEPT_CREDITS</span>
                  <span className="font-bold text-amber-signal">14,250 CR</span>
                </div>
                <div className="bg-[#030712] border border-deepslate px-3 py-1.5">
                  <span className="text-slate-500 block">REPORTS_THIS_WEEK</span>
                  <span className="font-bold text-slate-200">142</span>
                </div>
              </div>
            </div>

            {/* Assignments Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Assignments / Tasks Panel */}
              <div className="lg:col-span-2 space-y-3">
                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block">// Recent Student Submissions</span>
                <div className="space-y-2">
                  {[
                    { student: "Alex Carter", task: "AI_Safety_Ethics_Paper.pdf", match: "42.5%", status: "Requires Review", color: "text-amber-signal" },
                    { student: "Elena Rostova", task: "Distributed_Systems_Thesis.pdf", match: "2.1%", status: "Verified Authentic", color: "text-verity-green" },
                    { student: "Marcus Vance", task: "Quantum_Cryptography.pdf", match: "89.4%", status: "High Synthetic Signal", color: "text-red-500" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-[#030712] border border-deepslate p-3 flex justify-between items-center text-xs">
                      <div>
                        <div className="font-bold text-white">{item.student}</div>
                        <div className="font-mono text-[9px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <FileSpreadsheet size={10} />
                          {item.task}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-mono font-bold ${item.color}`}>{item.match} MATCH</div>
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Departmental Analytics Mini Widget */}
              <div className="bg-[#030712] border border-deepslate p-4 space-y-4">
                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block">// AI Writing Distribution</span>
                <div className="space-y-3 font-sans text-xs">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">Authentic Content</span>
                      <span className="text-verity-green font-bold">64%</span>
                    </div>
                    <div className="h-1 bg-slate-900"><div className="h-full bg-verity-green w-[64%]" /></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">Suspected GenAI / Clones</span>
                      <span className="text-amber-signal font-bold">28%</span>
                    </div>
                    <div className="h-1 bg-slate-900"><div className="h-full bg-amber-signal w-[28%]" /></div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">Highly Plagiarized</span>
                      <span className="text-red-500 font-bold">8%</span>
                    </div>
                    <div className="h-1 bg-slate-900"><div className="h-full bg-red-500 w-[8%]" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STUDENT EXPERIENCE PREVIEW */}
        {activeTab === "student" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white">Student Dashboard Preview</h4>
                <p className="text-[10px] text-slate-500">Student ID: VDX-STUDENT-9204 | Academic License</p>
              </div>
              <div className="font-mono text-[9px] bg-[#030712] border border-deepslate px-3 py-1.5 flex items-center gap-1.5">
                <Sparkles size={12} className="text-amber-signal animate-pulse" />
                <span>CREDITS: <span className="font-bold text-amber-signal">350 CR</span></span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-3 text-xs">
                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block">// Integrity Checkouts History</span>
                <div className="space-y-2">
                  <div className="bg-[#030712] border border-deepslate p-3 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">History_Term_Paper_Draft.docx</div>
                      <span className="font-mono text-[8px] text-slate-500 block mt-0.5">Scanned: 2 hours ago | Size: 124KB</span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-verity-green">94.8% AUTHENTIC</div>
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">No AI signals</span>
                    </div>
                  </div>
                  <div className="bg-[#030712] border border-deepslate p-3 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white">Physics_Lab_Audio_Recording.mp3</div>
                      <span className="font-mono text-[8px] text-slate-500 block mt-0.5">Scanned: Yesterday | Size: 4.8MB</span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-amber-signal">54.0% SUSPICIOUS</div>
                      <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest block">Partial voice synthesizer</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Side Resources */}
              <div className="bg-[#030712] border border-deepslate p-4 space-y-3">
                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block">// Citation Support & Tools</span>
                <p className="text-[10px] text-slate-400 font-sans">Verify and structure correct references automatically before submission.</p>
                <div className="space-y-2 font-mono text-[8px]">
                  <div className="p-2 border border-slate-900 bg-black/40 hover:border-slate-800 transition-colors flex items-center justify-between">
                    <span>APA_CITATION_VERIFIER</span>
                    <ArrowUpRight size={10} className="text-slate-500" />
                  </div>
                  <div className="p-2 border border-slate-900 bg-black/40 hover:border-slate-800 transition-colors flex items-center justify-between">
                    <span>PDF_PROVENANCE_GENERATOR</span>
                    <ArrowUpRight size={10} className="text-slate-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INSTITUTION DASHBOARD PREVIEW */}
        {activeTab === "institution" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white text-left">Institution Admin Dashboard</h4>
                <p className="text-[10px] text-slate-500">Institution: Western Technical University | Campus License</p>
              </div>
              <span className="font-mono text-[9px] bg-verity-green/10 border border-verity-green/30 text-verity-green px-2.5 py-1">
                LMS INTEGRATION: DEPLOYED (ACTIVE)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "DEPARTMENTS ACTIVE", val: "14 / 16", info: "88% coverage" },
                { label: "FACULTY ENROLLED", val: "340 Users", info: "+12 this month" },
                { label: "TOTAL AUDITS (YTD)", val: "148,290", info: "Peak usage: midterm weeks" },
                { label: "SECURITY PROFILE", val: "ZK-PROOF", info: "FERPA / GDPR Compliant" }
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#030712] border border-deepslate p-3 text-left">
                  <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest block">{stat.label}</span>
                  <div className="text-base font-bold text-white mt-1">{stat.val}</div>
                  <span className="font-mono text-[8px] text-slate-400 block mt-1">{stat.info}</span>
                </div>
              ))}
            </div>

            {/* Integration Details Panel */}
            <div className="bg-[#030712]/60 border border-deepslate p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
              <div className="space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Lock size={12} className="text-amber-signal" />
                  Campus Privacy & Zero-Trust Architecture
                </div>
                <p className="text-[10px] text-slate-400 max-w-xl">
                  Enforces zero-retention on student essay uploads. Reports are signed with ephemeral keys. Student details are hashed using salted cryptographic digests to maintain total confidentiality.
                </p>
              </div>
              <div className="font-mono text-[9px] flex gap-2">
                <span className="px-2 py-1 bg-slate-900 border border-slate-800 text-slate-400">FERPA</span>
                <span className="px-2 py-1 bg-slate-900 border border-slate-800 text-slate-400">GDPR</span>
                <span className="px-2 py-1 bg-slate-900 border border-slate-800 text-slate-400">SOC2 Type II</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
