/**
 * Welcome Widget
 */

"use client";

import { Widget } from "./Widget";
import { formatDate } from "@/lib/utils";

export interface WelcomeWidgetProps {
  userName?: string;
}

export function WelcomeWidget({ userName = "User" }: WelcomeWidgetProps) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <Widget title={`${greeting}, ${userName}`} className="lg:col-span-2">
      <div className="space-y-3">
        <p className="text-sm text-slate-300">
          Welcome to Veridex. Your forensic investigation workspace is ready.
        </p>
        <p className="text-xs text-slate-500">Today is {formatDate(new Date(), "long")}</p>
        <div className="pt-3 border-t border-deepslate">
          <p className="text-xs text-slate-400">
            💡 Tip: Use keyboard shortcut <code className="bg-deepslate px-2 py-1 rounded">Cmd+K</code> to search
          </p>
        </div>
      </div>
    </Widget>
  );
}
