"use client";

import { AuthSliceState, UserObject, UserLogin } from "@/types";
import { StateCreator } from "zustand";

export const useAuthSlice: StateCreator<
  AuthSliceState,
  [],
  [],
  AuthSliceState
> = (set, get) => ({
  authenticating: false,
  authenticated: false,
  user: {},
  token: { value: "", expiresAt: 0 },
  signin: (data: UserObject) => {
    console.log(data);
  },
  login: (data: UserLogin) => {
    set({
      token: {
        value: "token",
        expiresAt: Date.now() + 60 * 60 * 100, // sets token to expire in an hour
      },
      authenticated: true,
      user: {
        name: "John Does",
      },
    });
    return true;
  },
  logout: () => {
    set({ user: {}, token: { value: "", expiresAt: 0 }, authenticated: false });
  },
  refreshAuthToken: () => {
    set({ authenticating: true });
    const { token } = get();
    const currentDate = Date.now();
    if (!token.value) {
      set({ authenticating: false });
      return;
    }
    if (token?.expiresAt - currentDate > 0) {
      set(() => ({
        token: {
          value: "token",
          expiresAt: Date.now() + 60 * 60 * 100,
        },
        authenticated: true,
        authenticating: false,
      }));
    } else {
      // logout user completely
      set({ authenticating: false });
      get().logout();
    }
  },
  checkAuth: () => {
    const { token, refreshAuthToken } = get();
    set({ authenticating: true });
    if (!token.value) {
      set({ authenticating: false });
      return;
    }
    const isTokenExpired = checkAuthTokenExpiration(token.expiresAt);
    if (isTokenExpired) {
      refreshAuthToken();
      set({ authenticating: false });
      return;
    }
  },
});
const checkAuthTokenExpiration = (expiresAt: number) => {
  return expiresAt < Date.now();
};
