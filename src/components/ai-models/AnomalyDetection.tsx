"use client";

import { useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const anomalyData = [
  { timestamp: "2024-02-21 08:00", value: 7.2, isAnomaly: false },
  { timestamp: "2024-02-21 09:00", value: 7.1, isAnomaly: false },
  { timestamp: "2024-02-21 10:00", value: 7.3, isAnomaly: false },
  { timestamp: "2024-02-21 11:00", value: 8.7, isAnomaly: true },
  { timestamp: "2024-02-21 12:00", value: 7.4, isAnomaly: false },
  { timestamp: "2024-02-21 13:00", value: 7.2, isAnomaly: false },
  { timestamp: "2024-02-21 14:00", value: 7.1, isAnomaly: false },
  { timestamp: "2024-02-21 15:00", value: 6.2, isAnomaly: true },
  { timestamp: "2024-02-21 16:00", value: 7.3, isAnomaly: false },
  { timestamp: "2024-02-21 17:00", value: 7.2, isAnomaly: false },
];

const anomalyList = [
  {
    id: 1,
    timestamp: "2024-02-21 11:00",
    parameter: "pH",
    value: 8.7,
    expected: "6.5-8.5",
    severity: "Medium",
  },
  {
    id: 2,
    timestamp: "2024-02-21 15:00",
    parameter: "pH",
    value: 6.2,
    expected: "6.5-8.5",
    severity: "Low",
  },
  {
    id: 3,
    timestamp: "2024-02-20 14:30",
    parameter: "Turbidity",
    value: 12.4,
    expected: "0-5 NTU",
    severity: "High",
  },
];

export function AnomalyDetection() {
  const [parameter, setParameter] = useState<string>("ph");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Anomaly Detection</h3>
          <p className="text-sm text-muted-foreground">
            Identifying unusual patterns in water quality data
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="parameter-select">Parameter:</Label>
          <Select value={parameter} onValueChange={setParameter}>
            <SelectTrigger id="parameter-select" className="w-[180px]">
              <SelectValue placeholder="Select parameter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ph">pH Level</SelectItem>
              <SelectItem value="turbidity">Turbidity</SelectItem>
              <SelectItem value="temperature">Temperature</SelectItem>
              <SelectItem value="conductivity">Conductivity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={anomalyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis domain={[6, 9]} />
              <Tooltip />
              <ReferenceLine
                y={8.5}
                stroke="red"
                strokeDasharray="3 3"
                label="Upper Limit"
              />
              <ReferenceLine
                y={6.5}
                stroke="red"
                strokeDasharray="3 3"
                label="Lower Limit"
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  if (payload.isAnomaly) {
                    return (
                      <circle cx={cx} cy={cy} r={6} fill="red" stroke="none" />
                    );
                  }
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4}
                      fill="#3b82f6"
                      stroke="none"
                    />
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-medium mb-4">Detected Anomalies</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Parameter</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Expected Range</TableHead>
                <TableHead>Severity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {anomalyList.map((anomaly) => (
                <TableRow key={anomaly.id}>
                  <TableCell>{anomaly.timestamp}</TableCell>
                  <TableCell>{anomaly.parameter}</TableCell>
                  <TableCell>{anomaly.value}</TableCell>
                  <TableCell>{anomaly.expected}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        anomaly.severity === "High"
                          ? "bg-red-100 text-red-800 hover:bg-red-100"
                          : anomaly.severity === "Medium"
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      }
                    >
                      {anomaly.severity}
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
