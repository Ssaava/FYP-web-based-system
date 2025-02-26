"use client";

import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample historical data
const historicalData = [
  {
    date: "2024-01-01",
    ph: 7.2,
    temperature: 22,
    turbidity: 1.1,
    conductivity: 440,
  },
  {
    date: "2024-01-08",
    ph: 7.3,
    temperature: 23,
    turbidity: 1.2,
    conductivity: 445,
  },
  {
    date: "2024-01-15",
    ph: 7.1,
    temperature: 21,
    turbidity: 1.3,
    conductivity: 450,
  },
  {
    date: "2024-01-22",
    ph: 7.4,
    temperature: 24,
    turbidity: 1.0,
    conductivity: 455,
  },
  {
    date: "2024-01-29",
    ph: 7.2,
    temperature: 22,
    turbidity: 1.2,
    conductivity: 460,
  },
  {
    date: "2024-02-05",
    ph: 7.0,
    temperature: 21,
    turbidity: 1.4,
    conductivity: 465,
  },
  {
    date: "2024-02-12",
    ph: 7.3,
    temperature: 23,
    turbidity: 1.1,
    conductivity: 470,
  },
  {
    date: "2024-02-19",
    ph: 7.2,
    temperature: 22,
    turbidity: 1.2,
    conductivity: 450,
  },
];

export function HistoricalData() {
  const [timeframe, setTimeframe] = useState("weekly");
  const [parameter, setParameter] = useState("all");

  // Function to determine which parameters to display based on selection
  const getVisibleParameters = () => {
    if (parameter === "all") {
      return ["ph", "temperature", "turbidity", "conductivity"];
    }
    return [parameter];
  };

  const visibleParameters = getVisibleParameters();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Parameter:</span>
            <Select value={parameter} onValueChange={setParameter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select parameter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Parameters</SelectItem>
                <SelectItem value="ph">pH Level</SelectItem>
                <SelectItem value="temperature">Temperature</SelectItem>
                <SelectItem value="turbidity">Turbidity</SelectItem>
                <SelectItem value="conductivity">Conductivity</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Timeframe:</span>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={historicalData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {visibleParameters.includes("ph") && (
            <Line
              type="monotone"
              dataKey="ph"
              name="pH Level"
              stroke="#0667CF"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          )}
          {visibleParameters.includes("temperature") && (
            <Line
              type="monotone"
              dataKey="temperature"
              name="Temperature (°C)"
              stroke="#dc2626"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          )}
          {visibleParameters.includes("turbidity") && (
            <Line
              type="monotone"
              dataKey="turbidity"
              name="Turbidity (NTU)"
              stroke="#ca8a04"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          )}
          {visibleParameters.includes("conductivity") && (
            <Line
              type="monotone"
              dataKey="conductivity"
              name="Conductivity (µS/cm)"
              stroke="#059669"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
