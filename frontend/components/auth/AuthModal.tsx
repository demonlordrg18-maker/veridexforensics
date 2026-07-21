"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Mail, Key, ArrowRight, CheckCircle2, AlertTriangle, Github } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";
import type { Route } from "next";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup" | "forgot";
  callbackUrl?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
  callbackUrl = "/dashboard",
}) => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, signup, loginWithProvider } = useAuth();
  const router = useRouter();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        if (!email || !password) {
          throw new Error("Please enter both email and password.");
        }
        await login(email, password, rememberMe);
        onClose();
        router.push(callbackUrl as Route);
      } else if (mode === "signup") {
        if (!email || !password || !name) {
          throw new Error("Please fill in all fields.");
        }
        await signup(email, name, password, rememberMe);
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          router.push("/onboarding");
        }, 1200);
      } else {
        // Forgot password flow
        if (!email) throw new Error("Please enter your registered email address.");
        const response = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Could not send reset link.");
        }
        setIsSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: string) => {
    setLoading(true);
    try {
      await loginWithProvider(provider.toLowerCase() as "google" | "microsoft" | "github");
      onClose();
      router.push(callbackUrl as Route);
    } catch (err: any) {
      setError(err.message || "Identity provider authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md border border-deepslate bg-[#030712] p-8 rounded-none shadow-[0_0_50px_rgba(0,0,0,0.8)] font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-deepslate">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 border border-amber-signal/30 bg-amber-signal/5 text-amber-signal rounded-none shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight font-geist">
                  Veridex <span className="text-amber-signal">Auth</span>
                </h3>
                <p className="text-[9px] text-slate-500 font-mono font-bold uppercase tracking-widest">
                  // Secure Cryptographic Node Access
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Close authentication dialog"
              className="text-slate-500 hover:text-white font-mono text-xs font-bold"
            >
              [ESC]
            </button>
          </div>

          {/* Error & Success Messages */}
          {error && (
            <div className="p-3 mb-6 border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-xs flex items-center gap-2">
              <AlertTriangle size={14} />
              <span>{error}</span>
            </div>
          )}

          {isSuccess && (
            <div className="p-3 mb-6 border border-verity-green/30 bg-verity-green/10 text-verity-green font-mono text-xs flex items-center gap-2">
              <CheckCircle2 size={14} />
              <span>
                {mode === "forgot"
                  ? "Verification link sent! Check your inbox."
                  : "Authentication verified. Initializing dashboard..."}
              </span>
            </div>
          )}

          {/* Social OAuth Buttons */}
          {mode !== "forgot" && (
            <div className="space-y-2 mb-6">
              <button
                onClick={() => handleOAuth("Google")}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-deepslate bg-obsidian text-slate-300 hover:border-amber-signal/40 hover:text-white font-mono text-xs font-bold uppercase transition-all rounded-none"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
                </svg>
                Continue with Google
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOAuth("Microsoft")}
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-deepslate bg-obsidian text-slate-400 hover:text-white font-mono text-[10px] uppercase font-bold transition-all rounded-none"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z"/>
                    <path fill="#81bc06" d="M12 1h10v10H12z"/>
                    <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                    <path fill="#ffba08" d="M12 12h10v10H12z"/>
                  </svg>
                  Microsoft
                </button>
                <button
                  onClick={() => handleOAuth("GitHub")}
                  className="flex items-center justify-center gap-2 py-2 px-3 border border-deepslate bg-obsidian text-slate-400 hover:text-white font-mono text-[10px] uppercase font-bold transition-all rounded-none"
                >
                  <Github size={14} />
                  GitHub
                </button>
              </div>

              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-deepslate" />
                </div>
                <span className="relative px-3 bg-[#030712] font-mono text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                  OR EMAIL CREDENTIALS
                </span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  id="auth-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-obsidian border border-deepslate p-3 text-sm text-white focus:border-amber-signal outline-none font-sans rounded-none"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-1">
                Work Email Address
              </label>
              <div className="relative">
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@agency.com"
                  className="w-full bg-obsidian border border-deepslate p-3 pl-10 text-sm text-white focus:border-amber-signal outline-none font-sans rounded-none"
                  required
                />
                <Mail size={16} className="absolute left-3 top-3.5 text-slate-500" />
              </div>
            </div>

            {mode !== "forgot" && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                    Password
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      className="text-[9px] font-mono text-amber-signal hover:underline uppercase"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    id="auth-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-obsidian border border-deepslate p-3 pl-10 text-sm text-white focus:border-amber-signal outline-none font-sans rounded-none"
                    required
                  />
                  <Key size={16} className="absolute left-3 top-3.5 text-slate-500" />
                </div>
              </div>
            )}

            {mode === "login" && (
              <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-amber-signal"
                />
                <label htmlFor="remember" className="cursor-pointer">
                  Remember this node session for 30 days
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 border border-amber-signal bg-amber-signal text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all rounded-none shadow-[0_0_15px_rgba(245,158,11,0.2)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating Node...</span>
              ) : mode === "login" ? (
                <>
                  <span>Access Platform</span>
                  <ArrowRight size={14} />
                </>
              ) : mode === "signup" ? (
                <>
                  <span>Create Veridex Account</span>
                  <ArrowRight size={14} />
                </>
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>

          {/* Footer toggle */}
          <div className="mt-6 pt-4 border-t border-deepslate text-center font-mono text-[10px] text-slate-500">
            {mode === "login" ? (
              <p>
                Don't have an enterprise account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-amber-signal font-bold uppercase hover:underline"
                >
                  Create Account
                </button>
              </p>
            ) : (
              <p>
                Already registered?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-amber-signal font-bold uppercase hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
