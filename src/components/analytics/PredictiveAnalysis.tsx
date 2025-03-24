"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { date: "2025-02-21", actual: 7.2, predicted: 7.3 },
  { date: "2025-02-22", actual: null, predicted: 7.4 },
  { date: "2025-02-23", actual: null, predicted: 7.2 },
  { date: "2025-02-24", actual: null, predicted: 7.3 },
  { date: "2025-02-25", actual: null, predicted: 7.4 },
  { date: "2025-02-26", actual: null, predicted: 7.3 },
  { date: "2025-02-27", actual: null, predicted: 7.2 },
];

export function PredictiveAnalysis() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={[6, 8]}
          ticks={[6, 6.5, 7, 7.5, 8]}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="actual"
          name="Actual"
          stroke="#2563eb"
          strokeWidth={2}
          dot={true}
        />
        <Line
          type="monotone"
          dataKey="predicted"
          name="Predicted"
          stroke="#dc2626"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
