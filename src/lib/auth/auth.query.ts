"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { clearAuth, setAccessToken, setAuth } from "@/store/auth.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LoginPayload, RegisterPayload } from "@/types/auth";
import { loginApi, logoutApi, meApi, refreshTokenApi, registerApi } from "./auth.api";
import { clearSessionFlag, setSessionFlag } from "./session";

export const authKeys = {
  me: ["auth", "me"] as const,
};

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: ({ user, accessToken }) => {
      dispatch(setAuth({ user, accessToken }));
      setSessionFlag();
    },
  });
};

export const useRegisterMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerApi(payload),
    onSuccess: ({ user, accessToken }) => {
      dispatch(setAuth({ user, accessToken }));
      setSessionFlag();
    },
  });
};

export const useMeQuery = (enabled = true) => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: authKeys.me,
    queryFn: async () => {
      const user = await meApi();
      dispatch(setAuth({ user, accessToken: null }));
      return user;
    },
    enabled,
    retry: false,
  });
};

export const useRefreshMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: refreshTokenApi,
    onSuccess: ({ accessToken }) => {
      dispatch(setAccessToken(accessToken));
      setSessionFlag();
    },
  });
};

export const useLogoutMutation = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      dispatch(clearAuth());
      clearSessionFlag();
      queryClient.removeQueries({ queryKey: authKeys.me });
    },
  });
};

export const useAuthUser = () => useAppSelector((state) => state.auth.user);

