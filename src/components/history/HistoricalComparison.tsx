"use client";

import { useState } from "react";
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

// Sample comparison data
const comparisonData = [
  { parameter: "pH", current: 7.2, previous: 7.1, baseline: 7.0 },
  { parameter: "Temperature", current: 23, previous: 22, baseline: 21 },
  { parameter: "Turbidity", current: 1.2, previous: 1.3, baseline: 1.1 },
  { parameter: "Conductivity", current: 450, previous: 445, baseline: 440 },
];

export function HistoricalComparison() {
  const [comparisonType, setComparisonType] = useState("month");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm">Compare with:</span>
          <Select value={comparisonType} onValueChange={setComparisonType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select comparison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Previous Week</SelectItem>
              <SelectItem value="month">Previous Month</SelectItem>
              <SelectItem value="quarter">Previous Quarter</SelectItem>
              <SelectItem value="year">Previous Year</SelectItem>
              <SelectItem value="baseline">Baseline (Initial)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={comparisonData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="parameter" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="current" name="Current Period" fill="#2563eb" />
          <Bar dataKey="previous" name="Previous Period" fill="#9ca3af" />
          {comparisonType === "baseline" && (
            <Bar dataKey="baseline" name="Baseline" fill="#059669" />
          )}
        </BarChart>
      </ResponsiveContainer>

      <div className="text-xs text-muted-foreground">
        <p>* Current period: Feb 14 - Feb 21, 2024</p>
        <p>
          * Previous {comparisonType}:{" "}
          {comparisonType === "week"
            ? "Feb 7 - Feb 14, 2024"
            : comparisonType === "month"
            ? "Jan 21 - Feb 21, 2024"
            : comparisonType === "quarter"
            ? "Nov 21, 2023 - Feb 21, 2024"
            : comparisonType === "year"
            ? "Feb 21, 2023 - Feb 21, 2024"
            : "Initial Baseline"}
        </p>
      </div>
    </div>
  );
}
