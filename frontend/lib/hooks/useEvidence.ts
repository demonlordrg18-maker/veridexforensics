/**
 * Evidence Hooks
 * Manage evidence queries and mutations
 */

import { useCallback, useEffect, useReducer, useState } from "react";
import { evidenceApi } from "@/lib/api";
import type {
  Evidence,
  EvidenceSearchQuery,
  CreateEvidenceRequest,
  UpdateEvidenceRequest,
  ListResponse,
  StorageSummary,
  EvidenceTag,
} from "@/lib/types";

type EvidenceAction =
  | { type: "LOADING" }
  | { type: "SET_EVIDENCE"; payload: Evidence[] }
  | { type: "SET_ITEM"; payload: Evidence }
  | { type: "ADD_ITEM"; payload: Evidence }
  | { type: "UPDATE_ITEM"; payload: Evidence }
  | { type: "DELETE_ITEM"; payload: string }
  | { type: "ERROR"; payload: Error };

interface EvidenceState {
  evidence: Evidence[];
  currentEvidence: Evidence | null;
  loading: boolean;
  error: Error | null;
}

const initialState: EvidenceState = {
  evidence: [],
  currentEvidence: null,
  loading: false,
  error: null,
};

function evidenceReducer(state: EvidenceState, action: EvidenceAction): EvidenceState {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SET_EVIDENCE":
      return { ...state, evidence: action.payload, loading: false };
    case "SET_ITEM":
      return { ...state, currentEvidence: action.payload, loading: false };
    case "ADD_ITEM":
      return { ...state, evidence: [action.payload, ...state.evidence], loading: false };
    case "UPDATE_ITEM":
      return {
        ...state,
        evidence: state.evidence.map((e) => (e.id === action.payload.id ? action.payload : e)),
        currentEvidence:
          state.currentEvidence?.id === action.payload.id ? action.payload : state.currentEvidence,
        loading: false,
      };
    case "DELETE_ITEM":
      return {
        ...state,
        evidence: state.evidence.filter((e) => e.id !== action.payload),
        currentEvidence: state.currentEvidence?.id === action.payload ? null : state.currentEvidence,
        loading: false,
      };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function useEvidence() {
  const [state, dispatch] = useReducer(evidenceReducer, initialState);

  const listEvidence = useCallback(async (query?: EvidenceSearchQuery) => {
    dispatch({ type: "LOADING" });
    try {
      const response = await evidenceApi.list(query);
      dispatch({ type: "SET_EVIDENCE", payload: response.items });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error as Error });
    }
  }, []);

  const getEvidence = useCallback(async (evidenceId: string) => {
    dispatch({ type: "LOADING" });
    try {
      const data = await evidenceApi.get(evidenceId);
      dispatch({ type: "SET_ITEM", payload: data });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error as Error });
    }
  }, []);

  const createEvidence = useCallback(async (data: CreateEvidenceRequest) => {
    dispatch({ type: "LOADING" });
    try {
      const newEvidence = await evidenceApi.create(data);
      dispatch({ type: "ADD_ITEM", payload: newEvidence });
      return newEvidence;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error as Error });
      throw error;
    }
  }, []);

  const updateEvidence = useCallback(async (evidenceId: string, data: UpdateEvidenceRequest) => {
    dispatch({ type: "LOADING" });
    try {
      const updated = await evidenceApi.update(evidenceId, data);
      dispatch({ type: "UPDATE_ITEM", payload: updated });
      return updated;
    } catch (error) {
      dispatch({ type: "ERROR", payload: error as Error });
      throw error;
    }
  }, []);

  const deleteEvidence = useCallback(async (evidenceId: string) => {
    try {
      await evidenceApi.delete(evidenceId);
      dispatch({ type: "DELETE_ITEM", payload: evidenceId });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error as Error });
      throw error;
    }
  }, []);

  return {
    evidence: state.evidence,
    currentEvidence: state.currentEvidence,
    loading: state.loading,
    error: state.error,
    listEvidence,
    getEvidence,
    createEvidence,
    updateEvidence,
    deleteEvidence,
  };
}

export function useEvidenceTags(evidenceId: string) {
  const [tags, setTags] = useState<EvidenceTag[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!evidenceId) return;

    const fetchTags = async () => {
      setLoading(true);
      try {
        const data = await evidenceApi.getTags(evidenceId);
        setTags(data);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [evidenceId]);

  const addTag = useCallback(
    async (tag: string) => {
      try {
        const newTag = await evidenceApi.addTag(evidenceId, tag);
        setTags((prev) => [...prev, newTag]);
        return newTag;
      } catch (error) {
        throw error;
      }
    },
    [evidenceId]
  );

  const removeTag = useCallback(
    async (tag: string) => {
      try {
        await evidenceApi.removeTag(evidenceId, tag);
        setTags((prev) => prev.filter((t) => t.tag !== tag));
      } catch (error) {
        throw error;
      }
    },
    [evidenceId]
  );

  return { tags, loading, addTag, removeTag };
}

export function useStorageSummary() {
  const [storage, setStorage] = useState<StorageSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStorage = async () => {
      setLoading(true);
      try {
        const data = await evidenceApi.getStorageSummary();
        setStorage(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchStorage();
  }, []);

  return { storage, loading, error };
}
