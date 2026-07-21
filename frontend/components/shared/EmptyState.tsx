/**
 * Empty State Component
 */

"use client";

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {icon && <div className="mb-4 text-4xl">{icon}</div>}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && <p className="mt-2 text-center text-sm text-slate-400 max-w-md">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 px-4 py-2 text-sm font-medium rounded-lg bg-amber-signal/10 text-amber-signal hover:bg-amber-signal/20 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
