/**
 * Widget Base Component
 */

"use client";

export interface WidgetProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children: React.ReactNode;
  className?: string;
}

export function Widget({ title, description, action, children, className = "" }: WidgetProps) {
  return (
    <div className={`bg-slate-900 border border-deepslate rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {description && <p className="mt-1 text-xs text-slate-400">{description}</p>}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="text-xs font-medium text-amber-signal hover:text-amber-signal/80 transition-colors"
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}
