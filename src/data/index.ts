export type SensorLocation = {
  id: number;
  name: string;
  position: [number, number];
  status: "normal" | "warning" | "error";
  lastReading: string;
  parameters: {
    ph: number;
    temperature: number;
    turbidity: number;
    conductivity: number;
  };
};

export const sensorLocations: SensorLocation[] = [
  {
    id: 1,
    name: "Main Reservoir",
    position: [0.333196, 32.563495],
    status: "normal",
    lastReading: "2024-02-21 12:30:00",
    parameters: {
      ph: 7.2,
      temperature: 23,
      turbidity: 1.2,
      conductivity: 450,
    },
  },
  {
    id: 2,
    name: "Treatment Plant",
    position: [0.533196, 31.563495],
    status: "warning",
    lastReading: "2024-02-21 12:25:00",
    parameters: {
      ph: 8.7,
      temperature: 25,
      turbidity: 1.5,
      conductivity: 470,
    },
  },
];
