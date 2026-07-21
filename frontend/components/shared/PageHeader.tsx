/**
 * Page Header Component
 */

"use client";

export interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        {description && <p className="mt-2 text-slate-400">{description}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 rounded-lg bg-amber-signal text-slate-900 font-medium hover:bg-amber-signal/90 transition-colors flex items-center gap-2"
        >
          {action.icon}
          {action.label}
        </button>
      )}
    </div>
  );
}
