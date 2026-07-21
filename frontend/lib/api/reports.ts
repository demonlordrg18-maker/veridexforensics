/**
 * Reports API Client
 */

import { httpClient } from "./client";
import type { Report, CreateReportRequest, ReportListQuery, ListResponse, ExportFormat } from "@/lib/types";

const BASE_PATH = "/reports";

export const reportsApi = {
  // List reports
  list: (query?: ReportListQuery) => {
    const params = new URLSearchParams();
    if (query) {
      if (query.caseId) params.append("caseId", query.caseId);
      if (query.evidenceId) params.append("evidenceId", query.evidenceId);
      if (query.sort) params.append("sort", query.sort);
      if (query.order) params.append("order", query.order);
      if (query.limit) params.append("limit", query.limit.toString());
      if (query.offset) params.append("offset", query.offset.toString());
    }
    const queryString = params.toString();
    return httpClient.get<ListResponse<Report>>(`${BASE_PATH}${queryString ? `?${queryString}` : ""}`);
  },

  // Get report by ID
  get: (reportId: string) => httpClient.get<Report>(`${BASE_PATH}/${reportId}`),

  // Create report
  create: (data: CreateReportRequest) => httpClient.post<Report>(BASE_PATH, data),

  // Delete report
  delete: (reportId: string) => httpClient.delete(`${BASE_PATH}/${reportId}`),

  // Export report
  export: (reportId: string, format: ExportFormat) => {
    // This typically returns a blob for file download
    return fetch(`/api${BASE_PATH}/${reportId}/export/${format}`, {
      method: "GET",
      headers: {
        Accept: format === "pdf" ? "application/pdf" : "application/octet-stream",
      },
    }).then((res) => res.blob());
  },

  // Get reports for case
  getByCase: (caseId: string) =>
    httpClient.get<Report[]>(`${BASE_PATH}?caseId=${caseId}`),

  // Get reports for evidence
  getByEvidence: (evidenceId: string) =>
    httpClient.get<Report[]>(`${BASE_PATH}?evidenceId=${evidenceId}`),
};
