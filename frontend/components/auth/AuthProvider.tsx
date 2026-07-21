"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserSession } from "@/lib/types/auth";
import { getStoredSession, saveSession, clearSession } from "@/lib/auth";

interface AuthContextType {
  user: UserSession | null;
  isLoading: boolean;
  login: (email: string, password?: string, rememberMe?: boolean) => Promise<boolean>;
  signup: (email: string, name?: string, password?: string, rememberMe?: boolean) => Promise<boolean>;
  loginWithProvider: (provider: "google" | "microsoft" | "github") => Promise<boolean>;
  logout: () => Promise<void>;
  updateUserSession: (updates: Partial<UserSession>) => void;
  updateCredits: (remaining: number, usedDelta: number) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => false,
  signup: async () => false,
  loginWithProvider: async () => false,
  logout: async () => {},
  updateUserSession: () => {},
  updateCredits: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const existing = getStoredSession();
    if (existing) {
      setUser(existing);
    }

    fetch("/api/auth/session", { credentials: "include" })
      .then((res) => res.json())
      .then((data: { user: UserSession | null }) => {
        if (data.user) {
          setUser(data.user);
          saveSession(data.user);
        } else {
          setUser(null);
          clearSession();
        }
      })
      .catch(() => {
        if (!existing) setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const authenticate = async (
    action: "login" | "signup" | "oauth",
    payload: Record<string, unknown>
  ): Promise<boolean> => {
    setIsLoading(true);
    const response = await fetch(`/api/auth/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.user) {
      setIsLoading(false);
      throw new Error(data.error || "Authentication failed.");
    }

    setUser(data.user);
    saveSession(data.user);
    setIsLoading(false);
    return true;
  };

  const login = async (email: string, password?: string, rememberMe = true): Promise<boolean> => {
    return authenticate("login", { email, password, rememberMe });
  };

  const signup = async (email: string, name?: string, password?: string, rememberMe = true): Promise<boolean> => {
    return authenticate("signup", { email, name, password, rememberMe });
  };

  const loginWithProvider = async (provider: "google" | "microsoft" | "github"): Promise<boolean> => {
    return authenticate("oauth", { provider });
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" }).catch(() => undefined);
    clearSession();
    setUser(null);
  };

  const updateUserSession = (updates: Partial<UserSession>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    saveSession(updated);
  };

  const updateCredits = (remaining: number, usedDelta: number) => {
    if (!user) return;
    const updated = {
      ...user,
      creditsRemaining: remaining,
      creditsUsed: user.creditsUsed + usedDelta,
    };
    setUser(updated);
    saveSession(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        loginWithProvider,
        logout,
        updateUserSession,
        updateCredits,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
