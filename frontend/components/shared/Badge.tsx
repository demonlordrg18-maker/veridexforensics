/**
 * Badge Component
 */

"use client";

import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", {
  variants: {
    variant: {
      default: "bg-slate-500/20 text-slate-300",
      primary: "bg-blue-500/20 text-blue-300",
      success: "bg-green-500/20 text-green-300",
      warning: "bg-yellow-500/20 text-yellow-300",
      danger: "bg-red-500/20 text-red-300",
      amber: "bg-amber-signal/20 text-amber-signal",
      outline: "border border-slate-500 text-slate-300",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

export function Badge({ variant, className, ...props }: BadgeProps) {
  return <div className={badgeVariants({ variant, className })} {...props} />;
}
