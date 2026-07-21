"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AuthModal } from "@/components/auth/AuthModal";
import { Navbar } from "@/components/Navigation";

function LoginContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      <div className="pt-32 pb-20 px-6 flex items-center justify-center min-h-[85vh]">
        <AuthModal
          isOpen={true}
          onClose={() => {}}
          initialMode="login"
          callbackUrl={callbackUrl}
        />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-obsidian" />}>
      <LoginContent />
    </Suspense>
  );
}
