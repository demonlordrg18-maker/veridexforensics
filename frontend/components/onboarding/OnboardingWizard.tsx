"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle, ArrowRight, UserCheck, Sparkles, Building, BookOpen, Scale, Newspaper, Briefcase } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";

const USE_CASES = [
  { id: "Journalist", label: "Journalism & Media", icon: Newspaper, desc: "Verify source media, deepfakes, and claim authenticity." },
  { id: "HR", label: "HR & Recruitment", icon: Briefcase, desc: "Audit candidate submissions and credential documentation." },
  { id: "University", label: "Academic Research", icon: BookOpen, desc: "Detect synthetic research data and paper hallucination." },
  { id: "Law", label: "Legal & Forensics", icon: Scale, desc: "Establish digital chain of custody for courtroom evidence." },
  { id: "Enterprise", label: "Enterprise Risk", icon: Building, desc: "Monitor organization-wide fraud and deepfake impersonation." },
];

export const OnboardingWizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedUseCase, setSelectedUseCase] = useState<string>("Journalist");
  const [defaultModality, setDefaultModality] = useState<string>("text");
  const [isFinishing, setIsFinishing] = useState<boolean>(false);

  const { user, updateUserSession } = useAuth();
  const router = useRouter();

  const handleFinish = () => {
    setIsFinishing(true);
    setTimeout(() => {
      updateUserSession({
        onboardingCompleted: true,
        useCase: selectedUseCase,
      });
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto border border-deepslate bg-[#030712] p-8 md:p-12 rounded-none font-sans relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
      {/* Step Progress Bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-deepslate font-mono text-[10px]">
        <div className="flex items-center gap-2 text-amber-signal font-bold uppercase tracking-widest">
          <Shield size={16} />
          // Node Onboarding Protocol
        </div>
        <div className="text-slate-500 uppercase tracking-widest font-bold">
          Step {step} of 3
        </div>
      </div>

      <div className="w-full bg-obsidian h-1.5 mb-8 border border-deepslate overflow-hidden">
        <motion.div
          className="bg-amber-signal h-full"
          initial={{ width: "33%" }}
          animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-signal">
                Welcome to Veridex
              </span>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight font-geist">
                The Digital Trust <span className="text-amber-signal">Operating System</span>
              </h2>
              <p className="text-sm text-slate-400 font-mono leading-relaxed">
                Hello {user?.name || "Analyst"}. Veridex provides probabilistic forensic verification across documents, images, audio, video, and URLs.
              </p>
            </div>

            <div className="p-6 border border-amber-signal/20 bg-amber-signal/[0.03] space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-amber-signal font-bold">
                <Sparkles size={16} />
                50 Monthly Free Credits Provisioned
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Your account is credited with 50 computations every 30 days. Unused credits roll over with active subscriptions.
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 border border-amber-signal bg-amber-signal text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all rounded-none shadow-[0_0_15px_rgba(245,158,11,0.2)] flex items-center justify-center gap-2"
            >
              <span>Choose Your Primary Use Case</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight font-geist">
                Select Your <span className="text-amber-signal">Primary Domain</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                We will tailor your default workspace presets and evidence vault templates.
              </p>
            </div>

            <div className="grid gap-3">
              {USE_CASES.map((uc) => {
                const Icon = uc.icon;
                const isSelected = selectedUseCase === uc.id;
                return (
                  <button
                    key={uc.id}
                    onClick={() => setSelectedUseCase(uc.id)}
                    className={`p-4 border text-left transition-all flex items-start gap-4 rounded-none ${
                      isSelected
                        ? "border-amber-signal bg-amber-signal/10 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                        : "border-deepslate bg-obsidian hover:border-slate-700"
                    }`}
                  >
                    <div className={`p-2 border rounded-none ${isSelected ? "border-amber-signal bg-amber-signal text-black" : "border-deepslate text-slate-400"}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-geist uppercase">{uc.label}</h4>
                      <p className="text-xs text-slate-400 font-sans mt-0.5">{uc.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-6 border border-deepslate text-slate-400 hover:text-white font-mono text-xs font-bold uppercase rounded-none"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-grow py-3 border border-amber-signal bg-amber-signal text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all rounded-none flex items-center justify-center gap-2"
              >
                <span>Personalize Workspace</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight font-geist">
                Workspace <span className="text-amber-signal">Configuration</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Finalize your workspace default parameters.
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Default Forensic Modality
                </label>
                <select
                  value={defaultModality}
                  onChange={(e) => setDefaultModality(e.target.value)}
                  className="w-full bg-obsidian border border-deepslate p-3 text-white focus:border-amber-signal outline-none rounded-none"
                >
                  <option value="text">✍️ Text & Claim Analysis (1 Credit)</option>
                  <option value="link">🔗 URL & Web Article Audit (2 Credits)</option>
                  <option value="document">📄 PDF Document Scan (4 Credits)</option>
                  <option value="image">🖼️ Image & ELA Forensic (3 Credits)</option>
                  <option value="audio">🎙️ Voice & Audio Spectrogram (8 Credits)</option>
                  <option value="video">🎬 Video Deepfake Inspection (15 Credits)</option>
                </select>
              </div>

              <div className="p-4 border border-deepslate bg-obsidian space-y-2">
                <span className="text-[10px] font-bold text-amber-signal uppercase">// Security & Privacy Defaults</span>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle size={14} className="text-verity-green" />
                  <span>SHA-256 local hash generated before upload</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle size={14} className="text-verity-green" />
                  <span>No raw training data retained by AI models</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setStep(2)}
                className="py-3 px-6 border border-deepslate text-slate-400 hover:text-white font-mono text-xs font-bold uppercase rounded-none"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                disabled={isFinishing}
                className="flex-grow py-3 border border-amber-signal bg-amber-signal text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all rounded-none flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isFinishing ? (
                  <span>Initializing Node...</span>
                ) : (
                  <>
                    <span>Enter Veridex Workspace</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
