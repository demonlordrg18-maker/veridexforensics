/**
 * Dashboard Grid Layout
 */

"use client";

export interface DashboardGridProps {
  children: React.ReactNode;
}

export function DashboardGrid({ children }: DashboardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  );
}
