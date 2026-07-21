/**
 * Filter & Search Utilities
 */

import type { CaseStatus, CasePriority, EvidenceModality } from "@/lib/types";

export function filterCasesByStatus(cases: any[], statuses: CaseStatus[]): any[] {
  if (!statuses.length) return cases;
  return cases.filter((c) => statuses.includes(c.status));
}

export function filterCasesByPriority(cases: any[], priorities: CasePriority[]): any[] {
  if (!priorities.length) return cases;
  return cases.filter((c) => priorities.includes(c.priority));
}

export function filterCasesByCategory(cases: any[], categories: string[]): any[] {
  if (!categories.length) return cases;
  return cases.filter((c) => categories.includes(c.category));
}

export function filterBySearch(items: any[], query: string, fields: string[]): any[] {
  if (!query.trim()) return items;

  const q = query.toLowerCase();
  return items.filter((item) =>
    fields.some((field) => {
      const value = item[field];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(q);
    })
  );
}

export function filterByTags(items: any[], tags: string[]): any[] {
  if (!tags.length) return items;
  return items.filter((item) =>
    tags.some((tag) => (item.tags || []).includes(tag))
  );
}

export function filterByDateRange(
  items: any[],
  field: string,
  from?: Date,
  to?: Date
): any[] {
  return items.filter((item) => {
    const itemDate = new Date(item[field]);
    if (from && itemDate < from) return false;
    if (to && itemDate > to) return false;
    return true;
  });
}

export function searchCases(
  cases: any[],
  query: string,
  filters?: {
    status?: CaseStatus[];
    priority?: CasePriority[];
    category?: string[];
    tags?: string[];
  }
): any[] {
  let filtered = cases;

  if (query.trim()) {
    filtered = filterBySearch(filtered, query, ["title", "description", "caseNumber"]);
  }

  if (filters) {
    if (filters.status?.length) filtered = filterCasesByStatus(filtered, filters.status);
    if (filters.priority?.length) filtered = filterCasesByPriority(filtered, filters.priority);
    if (filters.category?.length) filtered = filterCasesByCategory(filtered, filters.category);
    if (filters.tags?.length) filtered = filterByTags(filtered, filters.tags);
  }

  return filtered;
}

export function searchEvidence(
  evidence: any[],
  query: string,
  filters?: {
    modality?: EvidenceModality[];
    status?: string[];
    caseId?: string;
    tags?: string[];
    favorite?: boolean;
  }
): any[] {
  let filtered = evidence;

  if (query.trim()) {
    filtered = filterBySearch(filtered, query, ["title", "notes"]);
  }

  if (filters) {
    if (filters.modality?.length) {
      filtered = filtered.filter((e) => filters.modality?.includes(e.modality));
    }
    if (filters.status?.length) {
      filtered = filtered.filter((e) => filters.status?.includes(e.status));
    }
    if (filters.caseId) {
      filtered = filtered.filter((e) => e.caseId === filters.caseId);
    }
    if (filters.tags?.length) {
      filtered = filterByTags(filtered, filters.tags);
    }
    if (filters.favorite !== undefined) {
      filtered = filtered.filter((e) => e.favorite === filters.favorite);
    }
  }

  return filtered;
}
