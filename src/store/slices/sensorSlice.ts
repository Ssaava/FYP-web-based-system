import { StateCreator } from "zustand";
type Reading = {
  timestamp?: string;
  ph: number;
  temperature: number;
  turbidity: number;
  conductivity: number;
  status?: string;
};
type Portability = {
  status: string;
  ph: {
    reading: number;
    status: string;
  };
  temperature: {
    reading: number;
    status: string;
  };
  turbidity: {
    reading: number;
    status: string;
  };
  conductivity: {
    reading: number;
    status: string;
  };
  score: number;
  recommendations: Array<string>;
};
type InitialState = {
  sensor_reading: Reading;
  sensor_history: Reading[];
  portability: Portability | null;
};

const initialState: InitialState = {
  sensor_reading: {
    timestamp: "",
    ph: 0,
    temperature: 0,
    turbidity: 0,
    conductivity: 0,
    status: "",
  },
  sensor_history: [],
  portability: null,
};
export interface SensorSliceState extends InitialState {
  getSensorReadings: () => void;
  getRecentReadings: () => void;
  getPortability: () => void;
  getRealTimeData: () => void;
}
export const useSensorSlice: StateCreator<
  SensorSliceState,
  [],
  [],
  SensorSliceState
> = (set, get) => ({
  ...initialState,
  getSensorReadings: () => {
    set({
      sensor_reading: {
        ph: 7.2,
        temperature: 23,
        turbidity: 1.2,
        conductivity: 450,
      },
    });
  },
  getRecentReadings: () => {
    set({
      sensor_history: [
        {
          timestamp: "2024-02-21 12:30:00",
          ph: 7.2,
          temperature: 23,
          turbidity: 1.2,
          conductivity: 450,
          status: "Normal",
        },
        {
          timestamp: "2024-02-21 12:25:00",
          ph: 7.1,
          temperature: 22,
          turbidity: 1.1,
          conductivity: 445,
          status: "Normal",
        },
        {
          timestamp: "2024-02-21 12:20:00",
          ph: 7.3,
          temperature: 24,
          turbidity: 1.3,
          conductivity: 460,
          status: "Normal",
        },
        {
          timestamp: "2024-02-21 12:15:00",
          ph: 7.2,
          temperature: 23,
          turbidity: 1.2,
          conductivity: 455,
          status: "Normal",
        },
        {
          timestamp: "2024-02-21 12:10:00",
          ph: 7.4,
          temperature: 25,
          turbidity: 1.4,
          conductivity: 465,
          status: "Normal",
        },
      ],
    });
  },

  getPortability: () => {
    set({
      portability: {
        status: "safe",
        ph: {
          reading: 7.2,
          status: "Normal",
        },
        temperature: {
          reading: 23,
          status: "Normal",
        },
        turbidity: {
          reading: 1.2,
          status: "Normal",
        },
        conductivity: {
          reading: 450,
          status: "Normal",
        },
        score: 85,
        recommendations: [],
      },
    });
  },

  getRealTimeData: () => {
    const { getPortability, getSensorReadings, getRecentReadings } = get();
    getSensorReadings();
    getPortability();
    getRecentReadings();

    setTimeout(() => {
      getSensorReadings();
      getPortability();
      getRecentReadings();
      set({
        sensor_reading: {
          ph: 7.2,
          temperature: 23,
          turbidity: 1.2,
          conductivity: 50,
        },
      });
    }, 3000);
  },
});
