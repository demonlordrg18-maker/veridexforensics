/**
 * Loading State Component
 */

"use client";

export interface LoadingStateProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingState({ text = "Loading...", size = "md" }: LoadingStateProps) {
  const spinnerSize = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }[size];

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`${spinnerSize} animate-spin rounded-full border-2 border-slate-300 border-t-amber-signal`} />
      {text && <p className="mt-3 text-sm text-slate-400">{text}</p>}
    </div>
  );
}
