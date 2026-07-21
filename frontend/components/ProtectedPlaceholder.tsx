"use client";

import Link from "next/link";
import { ArrowLeft, LockKeyhole, Shield } from "lucide-react";
import { Navbar } from "@/components/Navigation";

type ProtectedPlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function ProtectedPlaceholder({ eyebrow, title, description }: ProtectedPlaceholderProps) {
  return (
    <div className="min-h-screen bg-obsidian text-slate-300 font-sans selection:bg-amber-signal/20 selection:text-amber-signal">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pb-20 pt-32 md:px-12">
        <Link href="/dashboard" className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-slate-400 hover:text-white">
          <ArrowLeft size={14} />
          Dashboard
        </Link>

        <section className="border border-deepslate bg-[#030712] p-8 md:p-10 rounded-none">
          <div className="mb-8 flex items-center justify-between gap-6 border-b border-deepslate pb-6">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-signal">{eyebrow}</p>
              <h1 className="mt-2 font-geist text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                {title}
              </h1>
            </div>
            <div className="hidden h-12 w-12 items-center justify-center border border-amber-signal/30 bg-amber-signal/10 text-amber-signal md:flex">
              <Shield size={22} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.4fr,0.8fr]">
            <p className="text-sm leading-7 text-slate-400">{description}</p>
            <div className="border border-deepslate bg-obsidian p-5 font-mono text-[10px] uppercase tracking-widest text-slate-500">
              <div className="mb-3 flex items-center gap-2 text-amber-signal">
                <LockKeyhole size={14} />
                Protected Route Active
              </div>
              Authenticated sessions only. Enterprise permissions will attach here as modules come online.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
