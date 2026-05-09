"use client";

import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5 minutes — data stays fresh, no refetch on tab switch
      gcTime: 10 * 60 * 1000,    // 10 minutes — keep cached data in memory longer
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

