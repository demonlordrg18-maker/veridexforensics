/**
 * Formatting Utilities
 * Date, time, file size, and other common formatters
 */

export function formatDate(date: Date | string, format: "short" | "long" | "relative" = "short"): string {
  const d = typeof date === "string" ? new Date(date) : date;

  if (isNaN(d.getTime())) return "Invalid date";

  if (format === "relative") {
    return formatRelativeTime(d);
  }

  if (format === "long") {
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  
  return formatDate(d, "short");
}

export function formatTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatFileSize(bytes: number | BigInt): string {
  const num = typeof bytes === "bigint" ? Number(bytes) : bytes;
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = num;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(unitIndex === 0 ? 0 : 2)} ${units[unitIndex]}`;
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function truncateString(str: string, length: number = 50, suffix: string = "..."): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + suffix;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatCaseNumber(index: number): string {
  return `CASE-${String(index).padStart(6, "0")}`;
}

export function formatConfidenceScore(score: number): string {
  const percent = formatPercent(score, 0);
  return percent;
}
