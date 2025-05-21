"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Ideally, import this from a shared types file (e.g., types/index.ts)
// import { ProcessedReading } from '@/types';
// For this example, we'll define it here if not imported.
interface ProcessedReading {
  ph: number;
  temperature: number;
  turbidity: number;
  conductivity: number;
  timestamp: string; // Useful for XAxis or tooltips
  predictedPotability: number;
}

interface OverviewProps {
  data: ProcessedReading[];
}

export function Overview({ data }: OverviewProps) {
  if (!data || data.length === 0) {
    return (
      <div
        style={{
          width: "100%",
          height: 350,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px dashed #ccc",
          borderRadius: "8px",
        }}
      >
        <p className="text-muted-foreground">No data available for chart.</p>
      </div>
    );
  }

  // Optional: Format timestamp for XAxis display if desired
  // const chartData = data.map(item => ({
  //   ...item,
  //   time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  // }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        {" "}
        {/* Use the prop data */}
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
        {/* You can add an XAxis if you want to display timestamps or indices */}
        <XAxis
          dataKey="timestamp"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            new Date(value).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          }
          // To avoid overcrowding, you can limit the number of ticks or interval
          // interval="preserveStartEnd" // or a number like interval={Math.floor(data.length / 5)}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`} // Add units if all lines share same unit, or use multiple YAxes
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "var(--radius)",
            boxShadow:
              "0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)",
          }}
          labelFormatter={(label) => new Date(label).toLocaleString()}
          formatter={(value, name, props) => {
            let unit = "";
            if (name === "temperature") unit = "°C";
            if (name === "turbidity") unit = " NTU";
            if (name === "conductivity") unit = " ppm";
            const formattedName =
              typeof name === "string"
                ? name.charAt(0).toUpperCase() + name.slice(1)
                : String(name);
            return [`${(value as number).toFixed(2)}${unit}`, formattedName];
          }}
        />
        <Line
          type="monotone"
          dataKey="ph"
          stroke="#2563eb" // Blue
          strokeWidth={2}
          dot={false}
          name="pH"
        />
        <Line
          type="monotone"
          dataKey="temperature"
          stroke="#dc2626" // Red
          strokeWidth={2}
          dot={false}
          name="Temperature"
        />
        <Line
          type="monotone"
          dataKey="turbidity"
          stroke="#ca8a04" // Yellow/Gold
          strokeWidth={2}
          dot={false}
          name="Turbidity"
        />
        <Line
          type="monotone"
          dataKey="conductivity"
          stroke="#059669" // Green
          strokeWidth={2}
          dot={false}
          name="Conductivity"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
