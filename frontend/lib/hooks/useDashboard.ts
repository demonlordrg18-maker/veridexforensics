/**
 * Dashboard Hooks
 */

import { useEffect, useState } from "react";
import { dashboardApi } from "@/lib/api";
import type { DashboardStats, ActivityEvent } from "@/lib/types";

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await dashboardApi.getStats();
        setStats(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}

export function useDashboardActivity(limit: number = 20) {
  const [activity, setActivity] = useState<ActivityEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      setLoading(true);
      try {
        const data = await dashboardApi.getActivity(limit);
        setActivity(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [limit]);

  return { activity, loading, error };
}

export function useDashboardWidgets() {
  const [widgets, setWidgets] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWidgets = async () => {
      setLoading(true);
      try {
        const data = await dashboardApi.getWidgetsData();
        setWidgets(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchWidgets();
  }, []);

  return { widgets, loading, error };
}
