"use client";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PotabilityHistoryEntry } from "@/components/potability/types"; // Adjust path if types are elsewhere

interface PotabilityHistoryProps {
  data: PotabilityHistoryEntry[];
}

export function PotabilityHistory({ data }: PotabilityHistoryProps) {
  if (!data || data.length === 0) {
    return <p className="text-center p-6 text-muted-foreground">No potability history available.</p>;
  }

  // Reverse data for chart so oldest is first (Recharts preference)
  const chartData = [...data].reverse(); 
  // For table, show most recent first (already sorted this way from page)
  const tableData = data.slice(0, 7); // Show latest 7 records in table

  return (
    <div className="space-y-8"> {/* Increased spacing */}
      <div>
        <h3 className="text-lg font-medium">Potability Prediction Trend</h3>
        <p className="text-sm text-muted-foreground">
          Individual AI potability predictions over time (0% = Not Potable, 100% = Potable)
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
            <XAxis 
              dataKey="date" 
              fontSize={10} 
              tickLine={false} 
              axisLine={true}
              interval={chartData.length > 10 ? Math.floor(chartData.length / 6) : 0}
            />
            <YAxis 
              domain={[0, 100]} 
              ticks={[0, 25, 50, 75, 100]} 
              tickFormatter={(value) => `${value}%`}
              fontSize={10}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number, name, props) => {
                const statusText = props.payload.status === "safe" ? "Potable" : "Not Potable";
                return [`${value}% (${statusText})`, "Prediction"];
              }}
              labelFormatter={(label) => `Date: ${label}`} // label is the 'date' string
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                borderColor: "hsl(var(--border))"
              }}
            />
            <Legend verticalAlign="top" height={36}/>
            <Line
              type="stepAfter" // 'stepAfter' can be good for binary predictions
              dataKey="score"
              name="Potability Prediction"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={(props) => {
                const { cx, cy, payload } = props;
                // payload here is one item from chartData
                if (!payload || payload.score === undefined) {
                  return <circle cx={0} cy={0} r={0} fill="transparent" />;
                }
                
                const fill = payload.status === "safe" ? "hsl(var(--success))" : "hsl(var(--destructive))";
                return (
                  <circle cx={cx} cy={cy} r={4} fill={fill} stroke="hsl(var(--background))" strokeWidth={1}/>
                );
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Recent Predictions</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Date</TableHead>
                <TableHead>AI Prediction</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((record) => (
                <TableRow key={record.timestamp}>
                  <TableCell className="font-medium">{record.date}</TableCell>
                  <TableCell>{record.score}%</TableCell>
                  <TableCell>
                    <Badge
                      variant={record.status === "safe" ? "default" : "destructive"}
                      className={
                        record.status === "safe"
                          ? "bg-green-100 text-green-800 hover:bg-green-200" // Custom more visible styles
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }
                    >
                      {record.status === "safe" ? "Potable" : "Not Potable"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}