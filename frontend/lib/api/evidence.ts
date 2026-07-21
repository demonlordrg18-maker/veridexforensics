/**
 * Evidence API Client
 */

import { httpClient } from "./client";
import type {
  Evidence,
  EvidenceTag,
  EvidenceMetadata,
  EvidenceSearchQuery,
  CreateEvidenceRequest,
  UpdateEvidenceRequest,
  ListResponse,
  StorageSummary,
} from "@/lib/types";

const BASE_PATH = "/evidence";

export const evidenceApi = {
  // List evidence
  list: (query?: EvidenceSearchQuery) => {
    const params = new URLSearchParams();
    if (query) {
      if (query.query) params.append("query", query.query);
      if (query.modality?.length) params.append("modality", query.modality.join(","));
      if (query.status?.length) params.append("status", query.status.join(","));
      if (query.caseId) params.append("caseId", query.caseId);
      if (query.tags?.length) params.append("tags", query.tags.join(","));
      if (query.favorite !== undefined) params.append("favorite", query.favorite.toString());
      if (query.sort) params.append("sort", query.sort);
      if (query.order) params.append("order", query.order);
      if (query.limit) params.append("limit", query.limit.toString());
      if (query.offset) params.append("offset", query.offset.toString());
    }
    const queryString = params.toString();
    return httpClient.get<ListResponse<Evidence>>(`${BASE_PATH}${queryString ? `?${queryString}` : ""}`);
  },

  // Get evidence by ID
  get: (evidenceId: string) => httpClient.get<Evidence>(`${BASE_PATH}/${evidenceId}`),

  // Create evidence
  create: (data: CreateEvidenceRequest) => httpClient.post<Evidence>(BASE_PATH, data),

  // Update evidence
  update: (evidenceId: string, data: UpdateEvidenceRequest) =>
    httpClient.put<Evidence>(`${BASE_PATH}/${evidenceId}`, data),

  // Delete evidence
  delete: (evidenceId: string) => httpClient.delete(`${BASE_PATH}/${evidenceId}`),

  // Get metadata
  getMetadata: (evidenceId: string) =>
    httpClient.get<EvidenceMetadata>(`${BASE_PATH}/${evidenceId}/metadata`),

  // Update metadata
  updateMetadata: (evidenceId: string, metadata: Partial<EvidenceMetadata>) =>
    httpClient.put<EvidenceMetadata>(`${BASE_PATH}/${evidenceId}/metadata`, metadata),

  // Get tags
  getTags: (evidenceId: string) =>
    httpClient.get<EvidenceTag[]>(`${BASE_PATH}/${evidenceId}/tags`),

  // Add tag
  addTag: (evidenceId: string, tag: string) =>
    httpClient.post<EvidenceTag>(`${BASE_PATH}/${evidenceId}/tags`, { tag }),

  // Remove tag
  removeTag: (evidenceId: string, tag: string) =>
    httpClient.delete(`${BASE_PATH}/${evidenceId}/tags/${encodeURIComponent(tag)}`),

  // Get storage summary
  getStorageSummary: () => httpClient.get<StorageSummary>(`${BASE_PATH}/storage/summary`),

  // Search evidence
  search: (query: EvidenceSearchQuery) => evidenceApi.list(query),

  // Bulk operations
  bulkDelete: (evidenceIds: string[]) =>
    httpClient.post(`${BASE_PATH}/bulk/delete`, { evidenceIds }),

  bulkTag: (evidenceIds: string[], tags: string[]) =>
    httpClient.post(`${BASE_PATH}/bulk/tag`, { evidenceIds, tags }),

  bulkMoveToCase: (evidenceIds: string[], caseId: string) =>
    httpClient.post(`${BASE_PATH}/bulk/move`, { evidenceIds, caseId }),
};
