/**
 * Skeleton Loader Component
 */

"use client";

export interface SkeletonProps {
  count?: number;
  className?: string;
  variant?: "card" | "table-row" | "text-block";
}

export function Skeleton({ count = 1, className = "", variant = "card" }: SkeletonProps) {
  const skeletons = Array.from({ length: count });

  if (variant === "card") {
    return (
      <div className="space-y-3">
        {skeletons.map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-lg bg-deepslate animate-pulse"
            style={{ backgroundImage: "linear-gradient(90deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)" }}
          />
        ))}
      </div>
    );
  }

  if (variant === "table-row") {
    return (
      <div className="space-y-2">
        {skeletons.map((_, i) => (
          <div key={i} className="h-12 rounded-lg bg-deepslate animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {skeletons.map((_, i) => (
        <div key={i} className="h-4 rounded-md bg-deepslate animate-pulse" />
      ))}
    </div>
  );
}
