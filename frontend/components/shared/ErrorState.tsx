/**
 * Error State Component
 */

"use client";

export interface ErrorStateProps {
  title?: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function ErrorState({ title = "Something went wrong", message, action }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-4xl mb-4">⚠️</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-center text-sm text-slate-400 max-w-md">{message}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 px-4 py-2 text-sm font-medium rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
