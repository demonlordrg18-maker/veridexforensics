/**
 * Cases API Client
 */

import { httpClient } from "./client";
import type {
  Case,
  CreateCaseRequest,
  UpdateCaseRequest,
  CaseListQuery,
  CaseMember,
  CaseActivity,
  CaseNote,
  CaseComment,
  ListResponse,
} from "@/lib/types";

const BASE_PATH = "/cases";

export const casesApi = {
  // List cases
  list: (query?: CaseListQuery) => {
    const params = new URLSearchParams();
    if (query) {
      if (query.status?.length) params.append("status", query.status.join(","));
      if (query.priority?.length) params.append("priority", query.priority.join(","));
      if (query.category?.length) params.append("category", query.category.join(","));
      if (query.search) params.append("search", query.search);
      if (query.tag) params.append("tag", query.tag);
      if (query.sort) params.append("sort", query.sort);
      if (query.order) params.append("order", query.order);
      if (query.limit) params.append("limit", query.limit.toString());
      if (query.offset) params.append("offset", query.offset.toString());
    }
    const queryString = params.toString();
    return httpClient.get<ListResponse<Case>>(`${BASE_PATH}${queryString ? `?${queryString}` : ""}`);
  },

  // Get case by ID
  get: (caseId: string) => httpClient.get<Case>(`${BASE_PATH}/${caseId}`),

  // Create case
  create: (data: CreateCaseRequest) => httpClient.post<Case>(BASE_PATH, data),

  // Update case
  update: (caseId: string, data: UpdateCaseRequest) =>
    httpClient.put<Case>(`${BASE_PATH}/${caseId}`, data),

  // Delete case
  delete: (caseId: string) => httpClient.delete(`${BASE_PATH}/${caseId}`),

  // Get case members
  getMembers: (caseId: string) =>
    httpClient.get<CaseMember[]>(`${BASE_PATH}/${caseId}/members`),

  // Add case member
  addMember: (caseId: string, userId: string, role: string) =>
    httpClient.post(`${BASE_PATH}/${caseId}/members`, { userId, role }),

  // Remove case member
  removeMember: (caseId: string, userId: string) =>
    httpClient.delete(`${BASE_PATH}/${caseId}/members/${userId}`),

  // Get case activity
  getActivity: (caseId: string, limit: number = 50) =>
    httpClient.get<CaseActivity[]>(`${BASE_PATH}/${caseId}/activity?limit=${limit}`),

  // Create case note
  createNote: (caseId: string, note: Omit<CaseNote, "id" | "createdAt" | "updatedAt">) =>
    httpClient.post<CaseNote>(`${BASE_PATH}/${caseId}/notes`, note),

  // Update case note
  updateNote: (caseId: string, noteId: string, updates: Partial<CaseNote>) =>
    httpClient.put<CaseNote>(`${BASE_PATH}/${caseId}/notes/${noteId}`, updates),

  // Delete case note
  deleteNote: (caseId: string, noteId: string) =>
    httpClient.delete(`${BASE_PATH}/${caseId}/notes/${noteId}`),

  // Create case comment
  createComment: (caseId: string, comment: Omit<CaseComment, "id" | "createdAt" | "updatedAt">) =>
    httpClient.post<CaseComment>(`${BASE_PATH}/${caseId}/comments`, comment),

  // Update case comment
  updateComment: (caseId: string, commentId: string, updates: Partial<CaseComment>) =>
    httpClient.put<CaseComment>(`${BASE_PATH}/${caseId}/comments/${commentId}`, updates),

  // Delete case comment
  deleteComment: (caseId: string, commentId: string) =>
    httpClient.delete(`${BASE_PATH}/${caseId}/comments/${commentId}`),
};
