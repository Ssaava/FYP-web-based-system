"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  {
    ph: 7.2,
    temperature: 23,
    turbidity: 1.2,
    conductivity: 450,
  },
  {
    ph: 7.1,
    temperature: 22,
    turbidity: 1.1,
    conductivity: 445,
  },
  {
    ph: 7.3,
    temperature: 24,
    turbidity: 1.3,
    conductivity: 460,
  },
  {
    ph: 7.2,
    temperature: 23,
    turbidity: 1.2,
    conductivity: 455,
  },
  {
    ph: 7.4,
    temperature: 25,
    turbidity: 1.4,
    conductivity: 465,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        pH
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].value}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Temperature
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[1].value}°C
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Turbidity
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[2].value} NTU
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Conductivity
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[3].value} µS/cm
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey="ph"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#dc2626"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="turbidity"
          stroke="#ca8a04"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="conductivity"
          stroke="#059669"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
