/**
 * Sort & Order Utilities
 */

export type SortDirection = "asc" | "desc";

export function sortByField<T>(
  items: T[],
  field: keyof T,
  direction: SortDirection = "asc"
): T[] {
  return [...items].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (aVal === null || aVal === undefined) return direction === "asc" ? 1 : -1;
    if (bVal === null || bVal === undefined) return direction === "asc" ? -1 : 1;

    if (typeof aVal === "string" && typeof bVal === "string") {
      return direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    if (aVal instanceof Date && bVal instanceof Date) {
      return direction === "asc"
        ? aVal.getTime() - bVal.getTime()
        : bVal.getTime() - aVal.getTime();
    }

    return 0;
  });
}

export function sortByDate<T>(
  items: T[],
  field: keyof T,
  direction: SortDirection = "desc"
): T[] {
  return sortByField(items, field, direction);
}

export function sortByMultiple<T>(
  items: T[],
  sorts: Array<{ field: keyof T; direction?: SortDirection }>
): T[] {
  return [...items].sort((a, b) => {
    for (const { field, direction = "asc" } of sorts) {
      const aVal = a[field];
      const bVal = b[field];

      let comparison = 0;

      if (typeof aVal === "string" && typeof bVal === "string") {
        comparison = aVal.localeCompare(bVal);
      } else if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else if (aVal instanceof Date && bVal instanceof Date) {
        comparison = aVal.getTime() - bVal.getTime();
      }

      if (comparison !== 0) {
        return direction === "asc" ? comparison : -comparison;
      }
    }
    return 0;
  });
}

export function getDefaultCaseSort(sortBy: string = "updatedAt"): {
  field: string;
  direction: SortDirection;
} {
  const validFields = ["createdAt", "updatedAt", "title", "dueDate", "priority"];
  const field = validFields.includes(sortBy) ? sortBy : "updatedAt";
  return { field, direction: "desc" };
}

export function getDefaultEvidenceSort(sortBy: string = "createdAt"): {
  field: string;
  direction: SortDirection;
} {
  const validFields = ["createdAt", "updatedAt", "title", "size", "modality"];
  const field = validFields.includes(sortBy) ? sortBy : "createdAt";
  return { field, direction: "desc" };
}
