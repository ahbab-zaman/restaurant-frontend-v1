import { API_V1_PREFIX, apiFetch } from "@/lib/auth/api-client";
import { DashboardOverview } from "@/types/dashboard";

export const getDashboardOverviewApi = () =>
  apiFetch<DashboardOverview>(`${API_V1_PREFIX}/dashboard/overview`);
