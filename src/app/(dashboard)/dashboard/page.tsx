"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "@/components/dashboard/Overview";
import { RecentReadings } from "@/components/dashboard/RecentReadings";
import { WaterQualityStatus } from "@/components/dashboard/WaterQualityStatus";
import { DashboardSensorLocations } from "@/components/dashboard/DashboardSensorLocations";
import { useSensorStore } from "@/store/store";

// Interface for the raw API response data (matches the new ML model endpoint)
interface ApiReading {
  Conductivity: number;
  Timestamp: string;
  Turbidity: number;
  ph: number;
  predicted_potability: number;
  temperature: number;
}

// Interface for the processed data used by components
// It's good practice to place this in a shared types file (e.g., types/index.ts)
export interface ProcessedReading {
  ph: number;
  temperature: number;
  turbidity: number;
  conductivity: number;
  timestamp: string; // Original timestamp string
  formattedTimestamp: string; // User-friendly timestamp
  predictedPotability: number; // 0 for not potable, 1 for potable
}

export default function DashboardPage() {
  const [allReadings, setAllReadings] = useState<ProcessedReading[]>([]);
  const [latestReading, setLatestReading] = useState<ProcessedReading | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (allReadings.length === 0) {
        setLoading(true);
      }
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${baseUrl}/api/ml_model`, {
          method: 'POST', // Changed to POST
          headers: {
            'Content-Type': 'application/json', // Good practice, even if body is empty
          },
          // body: JSON.stringify({}), // Send empty JSON object if required, or null/undefined if not
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiReading[] = await response.json();

        const processedData: ProcessedReading[] = data.map(item => ({
          ph: item.ph,
          temperature: item.temperature,
          turbidity: item.Turbidity,
          conductivity: item.Conductivity,
          timestamp: item.Timestamp,
          formattedTimestamp: new Date(item.Timestamp).toLocaleString(), // Format for display
          predictedPotability: item.predicted_potability,
        })).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()); // Sort by timestamp descending

        setAllReadings(processedData);
        if (processedData.length > 0) {
          setLatestReading(processedData[0]); // Latest is now the first after sorting
        } else {
          setLatestReading(null);
        }
        setError(null);
      } catch (e: any) {
        console.error("Failed to fetch data:", e);
        setError(e.message || "Failed to fetch data from ML model endpoint");
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 20000); // Refresh every 20 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []); // Removed allReadings.length from dependency to avoid re-fetch loop issues. setLoading handled internally.

  if (loading && allReadings.length === 0) {
    return <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 text-center">Loading dashboard data...</div>;
  }

  if (error && allReadings.length === 0) {
    return <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 text-center text-red-500">Error loading data: {error}. Please ensure the API is running.</div>;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {error && allReadings.length > 0 && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
          Warning: Could not refresh data. Displaying last known values. Error: {error}
        </div>
      )}
      {/* Summary Cards - these use latestReading */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">pH Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReading ? latestReading.ph.toFixed(1) : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              Normal range: 6.5-8.5
            </p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReading ? `${latestReading.temperature.toFixed(1)}°C` : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              Current reading
            </p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turbidity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReading ? `${latestReading.turbidity.toFixed(2)} NTU` : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Target: &lt; 5 NTU</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conductivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReading ? `${latestReading.conductivity.toFixed(0)} µS/cm` : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Target: &lt; 500 µS/cm</p>
          </CardContent>
        </Card>
      </div>

      {/* Overview Chart and Water Quality Status */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* Overview expects all readings, ensure they are sorted chronologically for the chart if needed */}
            <Overview data={allReadings.slice().sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())} />
          </CardContent>
        </Card>
        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Water Quality Status</CardTitle>
            <CardDescription>
              Current water potability assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WaterQualityStatus reading={latestReading} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Readings Table and Sensor Locations */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Readings</CardTitle>
            <CardDescription>
              Latest sensor readings from all parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* RecentReadings gets all readings, sorted by most recent first */}
            <RecentReadings readings={allReadings} />
          </CardContent>
        </Card>
        <div className="col-span-full md:col-span-1">
          <DashboardSensorLocations />
        </div>
      </div>
    </div>
  );
}