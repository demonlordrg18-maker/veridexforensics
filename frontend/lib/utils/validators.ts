/**
 * Validation Utilities
 */

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateFileSize(size: number, maxSizeInMB: number): boolean {
  const maxBytes = maxSizeInMB * 1024 * 1024;
  return size <= maxBytes;
}

export function validateFileType(filename: string, allowedTypes: string[]): boolean {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  return allowedTypes.some((type) => type.toLowerCase() === ext || type === "*");
}

export function validateCaseTitle(title: string): { valid: boolean; error?: string } {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: "Title is required" };
  }
  if (title.length < 3) {
    return { valid: false, error: "Title must be at least 3 characters" };
  }
  if (title.length > 200) {
    return { valid: false, error: "Title must not exceed 200 characters" };
  }
  return { valid: true };
}

export function validateCaseDescription(description: string): { valid: boolean; error?: string } {
  if (description && description.length > 5000) {
    return { valid: false, error: "Description must not exceed 5000 characters" };
  }
  return { valid: true };
}

export function validateTags(tags: string[]): { valid: boolean; error?: string } {
  if (!Array.isArray(tags)) {
    return { valid: false, error: "Tags must be an array" };
  }
  if (tags.length > 20) {
    return { valid: false, error: "Maximum 20 tags allowed" };
  }
  for (const tag of tags) {
    if (typeof tag !== "string" || tag.trim().length === 0) {
      return { valid: false, error: "All tags must be non-empty strings" };
    }
    if (tag.length > 50) {
      return { valid: false, error: "Tag must not exceed 50 characters" };
    }
  }
  return { valid: true };
}
