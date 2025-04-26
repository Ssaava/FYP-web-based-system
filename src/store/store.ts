import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useAuthSlice } from "./slices/authSlices";
import { AuthSliceState } from "@/types";
import { SensorSliceState, useSensorSlice } from "./slices/sensorSlice";
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

export const useSensorStore = create<SensorSliceState>()(
  persist(
    (...a) => ({
      ...useSensorSlice(...a),
    }),
    {
      name: "sensor-store",
      partialize: (state) => ({
        sensor_reading: state.sensor_reading,
        sensor_history: state.sensor_history,
        portability: state.portability,
      }),
    }
  )
);
