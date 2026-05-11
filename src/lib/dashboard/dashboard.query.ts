"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/store/hooks";
import { getDashboardOverviewApi } from "./dashboard.api";

export const dashboardKeys = {
  overview: ["dashboard", "overview"] as const,
};

export const useDashboardOverviewQuery = (enabled = true) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return useQuery({
    queryKey: dashboardKeys.overview,
    queryFn: getDashboardOverviewApi,
    enabled: enabled && isAuthenticated,
  });
};
