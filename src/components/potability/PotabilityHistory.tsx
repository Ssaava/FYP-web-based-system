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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const potabilityHistory = [
  { date: "2025-02-21", score: 85, status: "safe" },
  { date: "2025-02-20", score: 82, status: "safe" },
  { date: "2025-02-19", score: 78, status: "safe" },
  { date: "2025-02-18", score: 65, status: "warning" },
  { date: "2025-02-17", score: 72, status: "warning" },
  { date: "2025-02-16", score: 80, status: "safe" },
  { date: "2025-02-15", score: 83, status: "safe" },
  { date: "2025-02-14", score: 45, status: "unsafe" },
  { date: "2025-02-13", score: 60, status: "warning" },
  { date: "2025-02-12", score: 75, status: "safe" },
];

export function PotabilityHistory() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Potability Trend</h3>
        <p className="text-sm text-muted-foreground">
          Historical water potability scores over time
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={potabilityHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip
              formatter={(value, name) => [`${value}%`, "Potability Score"]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                let fill = "#22c55e";
                if (payload.status === "warning") fill = "#eab308";
                if (payload.status === "unsafe") fill = "#ef4444";

                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill={fill}
                    stroke="white"
                    strokeWidth={1}
                  />
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Potability Score</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {potabilityHistory.slice(0, 5).map((record, index) => (
              <TableRow key={index}>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.score}%</TableCell>
                <TableCell>
                  <Badge
                    className={
                      record.status === "safe"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : record.status === "warning"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {record.status === "safe" && "Safe"}
                    {record.status === "warning" && "Caution"}
                    {record.status === "unsafe" && "Unsafe"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
