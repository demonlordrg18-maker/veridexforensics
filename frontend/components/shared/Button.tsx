/**
 * Button Component
 */

"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-signal focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-amber-signal text-slate-900 hover:bg-amber-signal/90",
        secondary: "bg-slate-700 text-white hover:bg-slate-600",
        outline: "border border-slate-600 text-slate-300 hover:bg-slate-700",
        ghost: "text-slate-300 hover:bg-slate-700/50",
        danger: "bg-red-500/20 text-red-400 hover:bg-red-500/30",
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({ variant, size, loading, icon, children, className, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
