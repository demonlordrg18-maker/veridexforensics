"use client";

import React, { Suspense } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { Navbar } from "@/components/Navigation";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      <div className="pt-32 pb-20 px-6 flex items-center justify-center min-h-[85vh]">
        <AuthModal
          isOpen={true}
          onClose={() => {}}
          initialMode="forgot"
        />
      </div>
    </div>
  );
}
