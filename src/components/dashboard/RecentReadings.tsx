"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSensorStore } from "@/store/store";

// Assuming ProcessedReading is imported from a shared types file or DashboardPage
// For this example, let's define it if not imported.
interface ProcessedReading {
  ph: number;
  temperature: number;
  turbidity: number;
  conductivity: number;
  timestamp: string;
  formattedTimestamp: string;
  predictedPotability: number;
}

interface RecentReadingsProps {
  readings: ProcessedReading[];
}

export function RecentReadings({ readings }: RecentReadingsProps) {
  if (!readings || readings.length === 0) {
    return <p className="text-muted-foreground">No recent readings available.</p>;
  }

  // Display a limited number of recent readings, e.g., the latest 10
  const displayReadings = readings.slice(0, 10);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Timestamp</TableHead>
            <TableHead>pH</TableHead>
            <TableHead>Temp (°C)</TableHead>
            <TableHead>Turbidity (NTU)</TableHead>
            <TableHead>Conductivity (µS/cm)</TableHead>
            <TableHead>Potability</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayReadings.map((reading, index) => (
            <TableRow key={reading.timestamp + index}> {/* Ensure unique key */}
              <TableCell className="font-medium">{reading.formattedTimestamp}</TableCell>
              <TableCell>{reading.ph.toFixed(1)}</TableCell>
              <TableCell>{reading.temperature.toFixed(1)}</TableCell>
              <TableCell>{reading.turbidity.toFixed(2)}</TableCell>
              <TableCell>{reading.conductivity.toFixed(0)}</TableCell>
              <TableCell>
                {reading.predictedPotability === 1 ? (
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-green-600/20 bg-green-50 text-green-700">
                    Potable
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-red-600/20 bg-red-50 text-red-700">
                    Not Potable
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}