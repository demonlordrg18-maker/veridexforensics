"use client";

import React from "react";
import { Navbar } from "@/components/Navigation";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      <div className="pt-36 pb-20 px-6">
        <OnboardingWizard />
      </div>
    </div>
  );
}
