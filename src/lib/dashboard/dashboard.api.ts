import { API_V1_PREFIX, apiFetch } from "@/lib/auth/api-client";
import { DashboardOverview } from "@/types/dashboard";

export type DashboardOverviewParams = {
  months?: number;
  offset?: number;
};

export const getDashboardOverviewApi = (params?: DashboardOverviewParams) => {
  const search = new URLSearchParams();

  if (typeof params?.months === "number") {
    search.set("months", String(params.months));
  }

  if (typeof params?.offset === "number") {
    search.set("offset", String(params.offset));
  }

  const query = search.toString();
  const path = query ? `${API_V1_PREFIX}/dashboard/overview?${query}` : `${API_V1_PREFIX}/dashboard/overview`;
  return apiFetch<DashboardOverview>(path);
};
