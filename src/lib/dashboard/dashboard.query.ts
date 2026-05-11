"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardOverviewApi } from "./dashboard.api";

export const dashboardKeys = {
  overview: ["dashboard", "overview"] as const,
};

export const useDashboardOverviewQuery = (enabled = true) =>
  useQuery({
    queryKey: dashboardKeys.overview,
    queryFn: getDashboardOverviewApi,
    enabled,
  });
