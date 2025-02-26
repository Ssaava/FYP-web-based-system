"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
} from "lucide-react";

// Sample historical data for the table
const historicalTableData = [
  {
    id: 1,
    timestamp: "2024-02-21 12:30:00",
    ph: 7.2,
    temperature: 23,
    turbidity: 1.2,
    conductivity: 450,
    status: "Normal",
  },
  {
    id: 2,
    timestamp: "2024-02-21 12:00:00",
    ph: 7.1,
    temperature: 22,
    turbidity: 1.1,
    conductivity: 445,
    status: "Normal",
  },
  {
    id: 3,
    timestamp: "2024-02-21 11:30:00",
    ph: 7.3,
    temperature: 24,
    turbidity: 1.3,
    conductivity: 460,
    status: "Normal",
  },
  {
    id: 4,
    timestamp: "2024-02-21 11:00:00",
    ph: 7.2,
    temperature: 23,
    turbidity: 1.2,
    conductivity: 455,
    status: "Normal",
  },
  {
    id: 5,
    timestamp: "2024-02-21 10:30:00",
    ph: 7.4,
    temperature: 25,
    turbidity: 1.4,
    conductivity: 465,
    status: "Normal",
  },
  {
    id: 6,
    timestamp: "2024-02-21 10:00:00",
    ph: 7.0,
    temperature: 21,
    turbidity: 1.0,
    conductivity: 440,
    status: "Normal",
  },
  {
    id: 7,
    timestamp: "2024-02-21 09:30:00",
    ph: 7.2,
    temperature: 23,
    turbidity: 1.2,
    conductivity: 450,
    status: "Normal",
  },
  {
    id: 8,
    timestamp: "2024-02-21 09:00:00",
    ph: 7.1,
    temperature: 22,
    turbidity: 1.1,
    conductivity: 445,
    status: "Normal",
  },
  {
    id: 9,
    timestamp: "2024-02-21 08:30:00",
    ph: 7.3,
    temperature: 24,
    turbidity: 1.3,
    conductivity: 460,
    status: "Normal",
  },
  {
    id: 10,
    timestamp: "2024-02-21 08:00:00",
    ph: 7.2,
    temperature: 23,
    turbidity: 1.2,
    conductivity: 455,
    status: "Normal",
  },
];

export function HistoricalDataTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const totalPages = 5; // Simulated total pages

  // Filter data based on search term
  const filteredData = historicalTableData.filter(
    (item) =>
      item.timestamp.includes(search) ||
      item.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search by date or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[300px]"
          />
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>pH Level</TableHead>
              <TableHead>Temperature (°C)</TableHead>
              <TableHead>Turbidity (NTU)</TableHead>
              <TableHead>Conductivity (µS/cm)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((reading) => (
              <TableRow key={reading.id}>
                <TableCell>{reading.timestamp}</TableCell>
                <TableCell>{reading.ph}</TableCell>
                <TableCell>{reading.temperature}</TableCell>
                <TableCell>{reading.turbidity}</TableCell>
                <TableCell>{reading.conductivity}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ring-green-600/20 bg-green-50 text-green-700">
                    {reading.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">10</span> of{" "}
          <span className="font-medium">50</span> results
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
