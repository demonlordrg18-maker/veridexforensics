/**
 * Dialog Component
 */

"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Dialog({ open, onOpenChange, title, description, children, footer, size = "md" }: DialogProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }[size];

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className={`bg-slate-900 border border-deepslate rounded-lg shadow-lg ${sizeClass} w-full`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-deepslate">
            <div>
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              {description && <p className="mt-1 text-sm text-slate-400">{description}</p>}
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">{children}</div>

          {/* Footer */}
          {footer && <div className="flex items-center justify-end gap-3 p-6 border-t border-deepslate">{footer}</div>}
        </div>
      </div>
    </>
  );
}
