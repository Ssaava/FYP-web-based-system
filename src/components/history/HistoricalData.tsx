"use client";

import { useState, useMemo } from "react";
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
import { ProcessedReading } from "@/types";

interface HistoricalDataProps {
  allReadings: ProcessedReading[];
}

// Helper to format date for XAxis based on timeframe (simplified)
const formatDateForXAxis = (isoDateString: string, timeframe: string) => {
  const date = new Date(isoDateString);
  switch (timeframe) {
    case "daily": // Assuming raw data points might be frequent, show time
      return date.toLocaleDateString(undefined, {
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    case "weekly":
    case "monthly":
    case "quarterly": // For aggregated views, just the date part
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    default: // Default for raw data
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      });
  }
};

export function HistoricalData({ allReadings }: HistoricalDataProps) {
  const [timeframe, setTimeframe] = useState("all"); // 'all' means plot raw available data
  const [parameter, setParameter] = useState("all");

  const chartData = useMemo(() => {
    // TODO: Implement actual aggregation for 'daily', 'weekly', 'monthly', 'quarterly'
    // For now, 'all' will plot a subset of raw data to avoid too many points.
    // Other selections will be empty until aggregation is built.
    let dataToDisplay = allReadings;

    if (timeframe !== "all") {
      // Placeholder: In a real app, you'd filter and aggregate `allReadings`
      // based on the selected `timeframe`.
      // e.g., for 'weekly', group by week and average parameters.
      console.warn(
        `Timeframe aggregation for '${timeframe}' is not yet implemented. Showing all data.`
      );
      // return []; // Or show all data as a fallback
    }

    // To prevent chart lag with too many points if 'all' is selected with raw data
    if (dataToDisplay.length > 200) {
      // Arbitrary limit
      const step = Math.floor(dataToDisplay.length / 200);
      dataToDisplay = dataToDisplay.filter((_, index) => index % step === 0);
    }

    return dataToDisplay.map((r) => ({
      ...r,
      // Use a more specific date format if data is very granular
      date: new Date(r.timestamp).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));
  }, [allReadings, timeframe]);

  const getVisibleParameters = () => {
    if (parameter === "all") {
      return ["ph", "temperature", "turbidity", "conductivity"];
    }
    return [parameter];
  };

  const visibleParameters = getVisibleParameters();

  if (!allReadings || allReadings.length === 0) {
    return (
      <p className="text-center p-6 text-muted-foreground">
        No historical data to display.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        {" "}
        {/* Changed to flex-wrap */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Parameter:</span>
          <Select value={parameter} onValueChange={setParameter}>
            <SelectTrigger className="w-[180px] h-9">
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
          <span className="text-sm font-medium">Timeframe:</span>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Available Data</SelectItem>
              {/* Add actual aggregation options later */}
              <SelectItem value="daily" disabled>
                Daily Average (TODO)
              </SelectItem>
              <SelectItem value="weekly" disabled>
                Weekly Average (TODO)
              </SelectItem>
              <SelectItem value="monthly" disabled>
                Monthly Average (TODO)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
            <XAxis
              dataKey="date"
              fontSize={10}
              tickLine={false}
              axisLine={true}
              // interval="preserveStartEnd" // or other interval logic
            />
            <YAxis fontSize={10} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
              }}
              formatter={(value: number, name: string) => {
                let unit = "";
                if (name.toLowerCase().includes("temperature")) unit = "°C";
                else if (name.toLowerCase().includes("turbidity"))
                  unit = " NTU";
                else if (name.toLowerCase().includes("conductivity"))
                  unit = " µS/cm";
                return [
                  `${
                    typeof value === "number" ? value.toFixed(2) : value
                  }${unit}`,
                  name,
                ];
              }}
            />
            <Legend />
            {visibleParameters.includes("ph") && (
              <Line
                type="monotone"
                dataKey="ph"
                name="pH"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            )}
            {visibleParameters.includes("temperature") && (
              <Line
                type="monotone"
                dataKey="temperature"
                name="Temperature"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
              />
            )}
            {visibleParameters.includes("turbidity") && (
              <Line
                type="monotone"
                dataKey="turbidity"
                name="Turbidity"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
              />
            )}
            {visibleParameters.includes("conductivity") && (
              <Line
                type="monotone"
                dataKey="conductivity"
                name="Conductivity"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center p-6 text-muted-foreground">
          No data available for the selected timeframe/parameter. Aggregation
          for selected timeframe might not be implemented.
        </p>
      )}
    </div>
  );
}
