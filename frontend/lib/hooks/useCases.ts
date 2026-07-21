/**
 * Cases Hooks
 * Manage case queries and mutations
 */

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { casesApi } from "@/lib/api";
import type {
  Case,
  CaseListQuery,
  CaseMember,
  CaseActivity,
  CaseNote,
  CaseComment,
  CreateCaseRequest,
  UpdateCaseRequest,
  ListResponse,
} from "@/lib/types";

type CaseAction =
  | { type: "LOADING" }
  | { type: "SET_CASES"; payload: Case[] }
  | { type: "SET_CASE"; payload: Case }
  | { type: "ADD_CASE"; payload: Case }
  | { type: "UPDATE_CASE"; payload: Case }
  | { type: "DELETE_CASE"; payload: string }
  | { type: "ERROR"; payload: Error };

interface CaseState {
  cases: Case[];
  currentCase: Case | null;
  loading: boolean;
  error: Error | null;
}

const initialState: CaseState = {
  cases: [],
  currentCase: null,
  loading: false,
  error: null,
};

function caseReducer(state: CaseState, action: CaseAction): CaseState {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SET_CASES":
      return { ...state, cases: action.payload, loading: false };
    case "SET_CASE":
      return { ...state, currentCase: action.payload, loading: false };
    case "ADD_CASE":
      return { ...state, cases: [action.payload, ...state.cases], loading: false };
    case "UPDATE_CASE":
      return {
        ...state,
        cases: state.cases.map((c) => (c.id === action.payload.id ? action.payload : c)),
        currentCase: state.currentCase?.id === action.payload.id ? action.payload : state.currentCase,
        loading: false,
      };
    case "DELETE_CASE":
      return {
        ...state,
        cases: state.cases.filter((c) => c.id !== action.payload),
        currentCase: state.currentCase?.id === action.payload ? null : state.currentCase,
        loading: false,
      };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function useCases() {
  const [state, dispatch] = useReducer(caseReducer, initialState);

  const listCases = useCallback(async (query?: CaseListQuery) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await casesApi.list(query);
      dispatch({ type: "SET_CASES", payload: response.items });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error as Error });
    }
  }, []);

  const getCase = useCallback(async (caseId: string) => {
    dispatch({ type: "LOADING" });
    try {
      const data = await casesApi.get(caseId);
      dispatch({ type: "SET_CASE", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error as Error });
    }
  }, []);

  const createCase = useCallback(async (data: CreateCaseRequest) => {
    dispatch({ type: "LOADING" });
    try {
      const newCase = await casesApi.create(data);
      dispatch({ type: "ADD_CASE", payload: newCase });
      return newCase;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error as Error });
      throw error;
    }
  }, []);

  const updateCase = useCallback(async (caseId: string, data: UpdateCaseRequest) => {
    dispatch({ type: "LOADING" });
    try {
      const updated = await casesApi.update(caseId, data);
      dispatch({ type: "UPDATE_CASE", payload: updated });
      return updated;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error as Error });
      throw error;
    }
  }, []);

  const deleteCase = useCallback(async (caseId: string) => {
    try {
      await casesApi.delete(caseId);
      dispatch({ type: "DELETE_CASE", payload: caseId });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error as Error });
      throw error;
    }
  }, []);

  return {
    cases: state.cases,
    currentCase: state.currentCase,
    loading: state.loading,
    error: state.error,
    listCases,
    getCase,
    createCase,
    updateCase,
    deleteCase,
  };
}

export function useCaseMembers(caseId: string) {
  const [members, setMembers] = useState<CaseMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!caseId) return;

    const fetchMembers = async () => {
      setLoading(true);
      try {
        const data = await casesApi.getMembers(caseId);
        setMembers(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [caseId]);

  const addMember = useCallback(
    async (userId: string, role: string) => {
      try {
        await casesApi.addMember(caseId, userId, role);
        const updated = await casesApi.getMembers(caseId);
        setMembers(updated);
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    },
    [caseId]
  );

  const removeMember = useCallback(
    async (userId: string) => {
      try {
        await casesApi.removeMember(caseId, userId);
        setMembers((prev) => prev.filter((m) => m.userId !== userId));
      } catch (err) {
        setError(err as Error);
        throw err;
      }
    },
    [caseId]
  );

  return { members, loading, error, addMember, removeMember };
}

export function useCaseActivity(caseId: string, limit: number = 50) {
  const [activity, setActivity] = useState<CaseActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!caseId) return;

    const fetchActivity = async () => {
      setLoading(true);
      try {
        const data = await casesApi.getActivity(caseId, limit);
        setActivity(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [caseId, limit]);

  return { activity, loading, error };
}
