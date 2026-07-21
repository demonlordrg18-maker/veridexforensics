/**
 * Pagination Hook
 */

import { useState, useCallback } from "react";

export interface PaginationState {
  limit: number;
  offset: number;
  total: number;
}

export function usePagination(initialLimit: number = 20, initialTotal: number = 0) {
  const [state, setState] = useState<PaginationState>({
    limit: initialLimit,
    offset: 0,
    total: initialTotal,
  });

  const goToPage = useCallback((page: number) => {
    setState((prev) => ({
      ...prev,
      offset: (page - 1) * prev.limit,
    }));
  }, []);

  const nextPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      offset: prev.offset + prev.limit,
    }));
  }, []);

  const prevPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      offset: Math.max(0, prev.offset - prev.limit),
    }));
  }, []);

  const setLimit = useCallback((limit: number) => {
    setState((prev) => ({
      ...prev,
      limit,
      offset: 0,
    }));
  }, []);

  const setTotal = useCallback((total: number) => {
    setState((prev) => ({
      ...prev,
      total,
    }));
  }, []);

  const currentPage = Math.floor(state.offset / state.limit) + 1;
  const totalPages = Math.ceil(state.total / state.limit);
  const hasMore = state.offset + state.limit < state.total;

  return {
    limit: state.limit,
    offset: state.offset,
    total: state.total,
    currentPage,
    totalPages,
    hasMore,
    goToPage,
    nextPage,
    prevPage,
    setLimit,
    setTotal,
  };
}
