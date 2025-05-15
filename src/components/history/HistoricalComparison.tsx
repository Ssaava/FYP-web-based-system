"use client";

import { useState, useMemo } from "react";
import {
  Bar,
  BarChart,
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
import { ComparisonParameterData } from "@/components/history/types"; // Adjust path
import {
  subDays,
  subWeeks,
  subMonths,
  subQuarters,
  subYears,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  isValid,
} from "date-fns"; // Date manipulation

interface HistoricalComparisonProps {
  allReadings: ProcessedReading[];
}

const PARAMETERS_TO_COMPARE: Array<
  keyof Pick<
    ProcessedReading,
    "ph" | "temperature" | "turbidity" | "conductivity"
  >
> = ["ph", "temperature", "turbidity", "conductivity"];
const PARAMETER_NAMES: Record<string, string> = {
  ph: "pH",
  temperature: "Temperature (°C)",
  turbidity: "Turbidity (NTU)",
  conductivity: "Conductivity (µS/cm)",
};

// Helper function to calculate average for a parameter in a given period
const calculateAverage = (
  readings: ProcessedReading[],
  parameter: keyof ProcessedReading,
  startDate: Date,
  endDate: Date
): number | undefined => {
  const filteredReadings = readings.filter((r) => {
    const readingDate = new Date(r.timestamp);
    return readingDate >= startDate && readingDate <= endDate;
  });

  if (filteredReadings.length === 0) return undefined;

  const sum = filteredReadings.reduce(
    (acc, curr) => acc + (Number(curr[parameter]) || 0),
    0
  );
  return sum / filteredReadings.length;
};

export function HistoricalComparison({
  allReadings,
}: HistoricalComparisonProps) {
  const [comparisonType, setComparisonType] = useState("month"); // Default to month

  const comparisonChartData = useMemo((): ComparisonParameterData[] => {
    if (!allReadings || allReadings.length === 0) return [];

    const now = new Date(); // Use current date as reference for "current period"

    // Define current period (e.g., last 7 days for 'week' comparison, last 30 for 'month')
    let currentPeriodStart: Date, currentPeriodEnd: Date;
    let previousPeriodStart: Date, previousPeriodEnd: Date;
    let baselinePeriodStart: Date | undefined,
      baselinePeriodEnd: Date | undefined;

    // For simplicity, "current" period is always the most recent complete period relative to 'now'
    // Example: if 'month' is selected, current period is this month to date.
    // Previous period is the full previous month.

    currentPeriodEnd = endOfDay(now); // Today up to now

    switch (comparisonType) {
      case "week":
        currentPeriodStart = startOfWeek(now, { weekStartsOn: 1 }); // This week (Mon-Sun)
        previousPeriodStart = startOfWeek(subWeeks(now, 1), {
          weekStartsOn: 1,
        });
        previousPeriodEnd = endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 });
        break;
      case "month":
      default: // Default to month
        currentPeriodStart = startOfMonth(now); // This month
        previousPeriodStart = startOfMonth(subMonths(now, 1));
        previousPeriodEnd = endOfMonth(subMonths(now, 1));
        setComparisonType("month"); // Ensure state is set if default
        break;
      case "quarter":
        currentPeriodStart = startOfQuarter(now); // This quarter
        previousPeriodStart = startOfQuarter(subQuarters(now, 1));
        previousPeriodEnd = endOfQuarter(subQuarters(now, 1));
        break;
      case "year":
        currentPeriodStart = startOfYear(now); // This year
        previousPeriodStart = startOfYear(subYears(now, 1));
        previousPeriodEnd = endOfYear(subYears(now, 1));
        break;
      case "baseline":
        // Current period is still relevant (e.g., last 30 days)
        currentPeriodStart = startOfDay(subDays(now, 29)); // e.g. last 30 days
        // Baseline: e.g., the first 30 days of available data
        if (allReadings.length > 0) {
          const firstReadingDate = new Date(allReadings[0].timestamp);
          if (isValid(firstReadingDate)) {
            baselinePeriodStart = startOfDay(firstReadingDate);
            baselinePeriodEnd = endOfDay(
              subDays(startOfDay(addDays(firstReadingDate, 29)), 0)
            ); // end of 30th day
          }
        }
        // No 'previous' period when comparing to baseline in this setup
        previousPeriodStart = new Date(0); // Invalid range to get no data
        previousPeriodEnd = new Date(0);
        break;
    }

    if (
      !isValid(currentPeriodStart) ||
      !isValid(previousPeriodStart) ||
      !isValid(previousPeriodEnd)
    ) {
      console.error("Invalid date calculation for periods.");
      return [];
    }

    const data: ComparisonParameterData[] = PARAMETERS_TO_COMPARE.map(
      (paramKey) => {
        const paramName = PARAMETER_NAMES[paramKey] || paramKey;
        const currentAvg = calculateAverage(
          allReadings,
          paramKey,
          currentPeriodStart,
          currentPeriodEnd
        );
        const previousAvg = calculateAverage(
          allReadings,
          paramKey,
          previousPeriodStart,
          previousPeriodEnd
        );
        let baselineAvg: number | undefined;

        if (
          comparisonType === "baseline" &&
          baselinePeriodStart &&
          baselinePeriodEnd &&
          isValid(baselinePeriodStart) &&
          isValid(baselinePeriodEnd)
        ) {
          baselineAvg = calculateAverage(
            allReadings,
            paramKey,
            baselinePeriodStart,
            baselinePeriodEnd
          );
        }

        return {
          parameter: paramName,
          current:
            currentAvg !== undefined
              ? parseFloat(currentAvg.toFixed(2))
              : undefined,
          previous:
            previousAvg !== undefined
              ? parseFloat(previousAvg.toFixed(2))
              : undefined,
          baseline:
            baselineAvg !== undefined
              ? parseFloat(baselineAvg.toFixed(2))
              : undefined,
        };
      }
    );
    return data.filter(
      (d) =>
        d.current !== undefined ||
        d.previous !== undefined ||
        d.baseline !== undefined
    ); // Only show parameters with some data
  }, [allReadings, comparisonType]);

  if (!allReadings || allReadings.length === 0) {
    return (
      <p className="text-center p-6 text-muted-foreground">
        No historical data for comparison.
      </p>
    );
  }

  // For displaying period ranges (simplified example)
  const getPeriodRangeText = (type: string) => {
    // This is highly simplified; real implementation would use calculated dates
    if (type === "week") return "e.g., Current: This Week, Previous: Last Week";
    if (type === "month")
      return "e.g., Current: This Month, Previous: Last Month";
    // Add other cases
    return "Selected Period vs Comparison Period";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            Compare period averages with:
          </span>
          <Select value={comparisonType} onValueChange={setComparisonType}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Select comparison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Previous Week</SelectItem>
              <SelectItem value="month">Previous Month</SelectItem>
              <SelectItem value="quarter">Previous Quarter</SelectItem>
              <SelectItem value="year">Previous Year</SelectItem>
              <SelectItem value="baseline">Baseline Data</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {comparisonChartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={comparisonChartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
            <XAxis
              dataKey="parameter"
              fontSize={10}
              interval={0}
              angle={-30}
              textAnchor="end"
              height={60}
            />
            <YAxis fontSize={10} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))",
              }}
              formatter={(value: number) =>
                typeof value === "number" ? value.toFixed(2) : "N/A"
              }
            />
            <Legend />
            <Bar
              dataKey="current"
              name="Current"
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="previous"
              name="Previous"
              fill="#94a3b8"
              radius={[4, 4, 0, 0]}
            />
            {comparisonType === "baseline" && (
              <Bar
                dataKey="baseline"
                name="Baseline"
                fill="#10b981"
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center p-6 text-muted-foreground">
          Not enough data to make a comparison for the selected periods or type.
        </p>
      )}

      <div className="text-xs text-muted-foreground mt-2">
        <p>
          * Note: "Current" refers to the ongoing period (e.g., this week/month
          to date). "Previous" refers to the complete prior period.
        </p>
        <p>
          * Baseline refers to an initial period of data, typically the earliest
          available records.
        </p>
        <p className="italic">{getPeriodRangeText(comparisonType)}</p>
      </div>
    </div>
  );
}
// Need to add 'addDays' if not already available, or use another way to calculate end of baseline.
// For simplicity, you can remove it if not using date-fns addDays.
import { addDays } from "date-fns";
import { ProcessedReading } from "@/types";
