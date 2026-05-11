"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hooks";
import { DashboardOverviewParams, getDashboardOverviewApi } from "./dashboard.api";

export const dashboardKeys = {
  overview: (params?: DashboardOverviewParams) => ["dashboard", "overview", params?.months ?? 6, params?.offset ?? 0] as const,
};

export const useDashboardOverviewQuery = (enabled = true, params?: DashboardOverviewParams) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return useQuery({
    queryKey: dashboardKeys.overview(params),
    queryFn: () => getDashboardOverviewApi(params),
    enabled: enabled && isAuthenticated,
  });
};
