/**
 * Credits Widget
 */

"use client";

import { Widget } from "./Widget";
import { formatNumber } from "@/lib/utils";

export interface CreditsWidgetProps {
  remaining: number;
  monthly: number;
  bonus?: number;
  nextReset?: Date;
  onPurchase?: () => void;
}

export function CreditsWidget({ remaining, monthly, bonus = 0, nextReset, onPurchase }: CreditsWidgetProps) {
  const percentage = (remaining / monthly) * 100;
  const barColor = percentage > 50 ? "bg-green-500" : percentage > 20 ? "bg-yellow-500" : "bg-red-500";

  return (
    <Widget
      title="Credits"
      action={{ label: "Purchase", onClick: onPurchase || (() => {}) }}
    >
      <div className="space-y-4">
        {/* Credit count */}
        <div>
          <div className="text-2xl font-bold text-white">{formatNumber(remaining)}</div>
          <p className="text-xs text-slate-400">of {formatNumber(monthly)} remaining</p>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-deepslate rounded-full overflow-hidden">
          <div
            className={`h-full ${barColor} transition-all duration-300`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>

        {/* Details */}
        <div className="text-xs text-slate-400 space-y-1">
          {bonus > 0 && <p>+ {formatNumber(bonus)} bonus credits</p>}
          {nextReset && <p>Reset on {new Date(nextReset).toLocaleDateString()}</p>}
        </div>
      </div>
    </Widget>
  );
}
