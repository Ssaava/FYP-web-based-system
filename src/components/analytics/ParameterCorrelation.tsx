"use client";

import {
  Scatter,
  ScatterChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  ZAxis,
} from "recharts";

const data = [
  { ph: 7.2, temperature: 23, turbidity: 1.2 },
  { ph: 7.1, temperature: 22, turbidity: 1.1 },
  { ph: 7.3, temperature: 24, turbidity: 1.3 },
  { ph: 7.2, temperature: 23, turbidity: 1.2 },
  { ph: 7.4, temperature: 25, turbidity: 1.4 },
];

export function ParameterCorrelation() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <ScatterChart>
        <XAxis
          dataKey="ph"
          name="pH"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          dataKey="temperature"
          name="Temperature"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <ZAxis dataKey="turbidity" range={[50, 400]} name="Turbidity" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={data} fill="#2563eb" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
