"use client";

import { useEffect, useState } from "react";
// Assuming these components are for historical data exploration
import { HistoricalComparison } from "@/components/history/HistoricalComparison"; // Renamed or ensure path is correct
import { HistoricalData } from "@/components/history/HistoricalData";         // Renamed or ensure path is correct
import { HistoricalDataTable } from "@/components/history/HistoricalDataTable"; // Renamed or ensure path is correct

import { Button } from "@/components/ui/button"; // Kept from original if needed for other actions
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { FileDown, Plus } from "lucide-react"; // Kept from original

// --- TYPE DEFINITIONS (or import from a shared file) ---
export interface MlModelApiReading {
  Conductivity: number;
  Timestamp: string;
  Turbidity: number;
  ph: number;
  predicted_potability: number;
  temperature: number;
}

export interface ProcessedReading {
  id: string;
  timestampMs: number;
  date: string; // For general display, can be further formatted by components
  ph: number;
  temperature: number;
  turbidity: number;
  conductivity: number;
  potability: number;
  status: string;
}

export interface ComparisonParameterData {
  parameter: string;
  current?: number;
  previous?: number;
  baseline?: number;
}
// --- END OF TYPE DEFINITIONS ---

export default function HistoryPage() { // Renamed from ReportsPage for clarity
  const [allReadings, setAllReadings] = useState<ProcessedReading[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${baseUrl}/api/ml_model`, { method: 'POST' });
        if (!response.ok) {
          const errData = await response.json().catch(() => ({ error: "Failed to parse error from /ml_model" }));
          throw new Error(errData.error || `Failed to fetch historical data (${response.status})`);
        }
        const rawReadings: MlModelApiReading[] = await response.json();

        if (!rawReadings || rawReadings.length === 0) {
          setError("No historical data received from the API.");
          setAllReadings([]);
          setIsLoading(false);
          return;
        }

        const processed: ProcessedReading[] = rawReadings.map((r, index) => {
          const tsMs = new Date(r.Timestamp).getTime();
          return {
            id: tsMs.toString() + index, // Simple unique ID
            timestampMs: tsMs,
            // General date format, components can reformat if needed
            date: new Date(tsMs).toISOString(), // ISO string is good for re-parsing
            ph: r.ph,
            temperature: r.temperature,
            turbidity: r.Turbidity,
            conductivity: r.Conductivity,
            potability: r.predicted_potability,
            status: r.predicted_potability === 1 ? "Potable" : "Not Potable",
          };
        }).sort((a, b) => a.timestampMs - b.timestampMs); // Sort oldest to newest for charts

        setAllReadings(processed);

      } catch (err: any) {
        console.error("Error on History Page:", err);
        setError(err.message || "An unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Historical Data</h2>
          <p className="text-muted-foreground">
            Explore trends, compare periods, and view detailed records
          </p>
        </div>
        {/* Buttons from original ReportsPage - adapt if needed for history actions */}
        {/* <div className="flex items-center gap-4">
          <Button><Plus className="mr-2 h-4 w-4" /> New Action </Button>
          <Button variant="outline"><FileDown className="mr-2 h-4 w-4" /> Export All Data </Button>
        </div> */}
      </div>

      {isLoading && <p className="text-center p-10 text-muted-foreground">Loading historical data...</p>}
      {error && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader><CardTitle className="text-destructive">Error Loading Data</CardTitle></CardHeader>
          <CardContent><p className="text-destructive-foreground">{error}</p></CardContent>
        </Card>
      )}

      {!isLoading && !error && allReadings.length === 0 && (
        <Card>
          <CardHeader><CardTitle>No Data</CardTitle></CardHeader>
          <CardContent><p className="text-muted-foreground">No historical data is currently available.</p></CardContent>
        </Card>
      )}

      {!isLoading && !error && allReadings.length > 0 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Parameter Trends Over Time</CardTitle>
              <CardDescription>
                Visualize historical changes in water quality parameters. Select parameter and timeframe.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HistoricalData allReadings={allReadings} />
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-5"> {/* Adjusted grid for comparison and table */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Historical Comparison</CardTitle>
                <CardDescription>
                  Compare average parameter values between different time periods.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HistoricalComparison allReadings={allReadings} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-2"> {/* Placeholder for another component or adjust spans */}
               <CardHeader>
                <CardTitle>Data Summary</CardTitle> {/* Example */}
                <CardDescription>Key statistics from the selected period.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Summary component can go here.</p>
                 {/* Could add summary stats like min/max/avg of allReadings */}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Historical Records</CardTitle>
              <CardDescription>
                Browse, search, and filter all recorded water quality readings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HistoricalDataTable allReadings={allReadings} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}