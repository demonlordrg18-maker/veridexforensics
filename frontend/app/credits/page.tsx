"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreditsShortcutPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/credits");
  }, [router]);

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center font-mono text-xs text-amber-signal">
      Redirecting to Credit Dashboard...
    </div>
  );
}
