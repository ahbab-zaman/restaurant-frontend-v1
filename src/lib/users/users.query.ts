"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminUpdateUserPayload } from "@/types/user";
import {
  adminUpdateUserApi,
  deleteUserApi,
  getUserByIdApi,
  listUsersApi,
} from "./users.api";

export const userKeys = {
  list: ["users"] as const,
  detail: (id: string) => ["users", id] as const,
};

export const useUsersQuery = (page = 1, limit = 10) =>
  useQuery({
    queryKey: [...userKeys.list, page, limit],
    queryFn: () => listUsersApi(page, limit),
  });

export const useUserByIdQuery = (userId: string) =>
  useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUserByIdApi(userId),
    enabled: !!userId,
  });

export const useAdminUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }: { userId: string; payload: AdminUpdateUserPayload }) =>
      adminUpdateUserApi(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list });
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: string) => deleteUserApi(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.list });
    },
  });
};
