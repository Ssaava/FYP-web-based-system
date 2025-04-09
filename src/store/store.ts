import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useAuthSlice } from "./slices/authSlices";
import { AuthSliceState } from "@/types";
export const useAuthStore = create<AuthSliceState>()(
  persist(
    (...a) => ({
      ...useAuthSlice(...a),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
