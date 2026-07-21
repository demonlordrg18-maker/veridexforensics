/**
 * Dashboard API Client
 */

import { httpClient } from "./client";
import type { DashboardStats, ActivityEvent } from "@/lib/types";

const BASE_PATH = "/dashboard";

export const dashboardApi = {
  // Get dashboard overview stats
  getStats: () => httpClient.get<DashboardStats>(`${BASE_PATH}/stats`),

  // Get recent activity
  getActivity: (limit: number = 20) =>
    httpClient.get<ActivityEvent[]>(`${BASE_PATH}/activity?limit=${limit}`),

  // Get dashboard widgets data
  getWidgetsData: () =>
    httpClient.get<{
      recentCases: any[];
      recentEvidence: any[];
      recentReports: any[];
      storageUsed: BigInt;
      creditsRemaining: number;
      subscription: any;
    }>(`${BASE_PATH}/widgets`),
};
