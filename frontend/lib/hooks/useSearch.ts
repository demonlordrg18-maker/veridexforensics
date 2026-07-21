/**
 * Search Hook
 */

import { useState, useCallback, useEffect } from "react";

export function useSearch<T>(
  items: T[],
  searchFn: (items: T[], query: string) => T[],
  debounceMs: number = 300
) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<T[]>(items);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearching(true);
      const filtered = searchFn(items, query);
      setResults(filtered);
      setSearching(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, items, searchFn, debounceMs]);

  const reset = useCallback(() => {
    setQuery("");
    setResults(items);
  }, [items]);

  return {
    query,
    setQuery,
    results,
    searching,
    reset,
    hasResults: results.length > 0,
  };
}
