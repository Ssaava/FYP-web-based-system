"use client";

import { useState, useMemo } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Search,
} from "lucide-react";
import { saveAs } from "file-saver"; // For CSV export
import { ProcessedReading } from "@/types";

interface HistoricalDataTableProps {
  allReadings: ProcessedReading[];
}

const ITEMS_PER_PAGE = 10;

export function HistoricalDataTable({ allReadings }: HistoricalDataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAndSortedData = useMemo(() => {
    let data = [...allReadings].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ); // Show most recent first
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      data = data.filter(
        (item) =>
          new Date(item.timestamp)
            .toLocaleString()
            .toLowerCase()
            .includes(lowerSearchTerm) ||
          (item.predicted_potability === 1
            ? "Potable"
            : "Not Potable"
          ).includes(lowerSearchTerm) ||
          item.ph.toString().includes(lowerSearchTerm) ||
          item.temperature.toString().includes(lowerSearchTerm) ||
          item.turbidity.toString().includes(lowerSearchTerm) ||
          item.conductivity.toString().includes(lowerSearchTerm)
      );
    }
    return data;
  }, [allReadings, searchTerm]);

  const totalItems = filteredAndSortedData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredAndSortedData.slice(startIndex, endIndex);
  }, [filteredAndSortedData, currentPage]);

  const handleExportCSV = () => {
    if (filteredAndSortedData.length === 0) return;

    const header = [
      "Timestamp",
      "pH",
      "Temperature_C",
      "Turbidity_NTU",
      "Conductivity_uS_cm",
      "Potability_Status\n",
    ];
    const csvRows = [header.join(",")];

    filteredAndSortedData.forEach((row) => {
      const values = [
        `"${new Date(row.timestamp).toISOString()}"`, // ISO string for universal format
        row.ph,
        row.temperature,
        row.turbidity,
        row.conductivity,
        `"${row.predicted_potability === 1 ? "Potable" : "Not Potable"}"`,
      ];
      csvRows.push(values.join(","));
    });

    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    saveAs(
      blob,
      `historical_water_data_${new Date().toISOString().split("T")[0]}.csv`
    );
  };

  if (!allReadings || allReadings.length === 0) {
    return (
      <p className="text-center p-6 text-muted-foreground">
        No detailed records available.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="pl-8 w-full sm:w-[300px] h-9"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          disabled={filteredAndSortedData.length === 0}
        >
          <Download className="mr-2 h-4 w-4" />
          Export Filtered CSV
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Timestamp</TableHead>
              <TableHead>pH</TableHead>
              <TableHead>Temp (°C)</TableHead>
              <TableHead>Turbidity (NTU)</TableHead>
              <TableHead>Conduct. (µS/cm)</TableHead>
              <TableHead>Potability</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((reading, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {new Date(reading.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>{reading.ph.toFixed(1)}</TableCell>
                  <TableCell>{reading.temperature.toFixed(1)}</TableCell>
                  <TableCell>{reading.turbidity.toFixed(2)}</TableCell>
                  <TableCell>{reading.conductivity.toFixed(0)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        reading.predicted_potability === 1
                          ? "default"
                          : "destructive"
                      }
                      className={
                        reading.predicted_potability === 1
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }
                    >
                      {reading.predicted_potability === 1
                        ? "Potable"
                        : "Not Potable"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No results found for your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-muted-foreground">
            Page <span className="font-medium">{currentPage}</span> of{" "}
            <span className="font-medium">{totalPages}</span> ({totalItems}{" "}
            total records)
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {/* Optional: Page number input or more sophisticated pagination */}
            <span className="text-sm p-2">Page {currentPage}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="h-8 w-8"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
