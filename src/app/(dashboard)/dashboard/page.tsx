"use client";

import { DashboardSensorLocations } from "@/components/dashboard/DashboardSensorLocations";
import { Overview } from "@/components/dashboard/Overview";
import { RecentReadings } from "@/components/dashboard/RecentReadings";
import { WaterQualityStatus } from "@/components/dashboard/WaterQualityStatus";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSocket } from "@/hooks/useSocket";

// Interface for the raw API response data (matches the new ML model endpoint)
export default function DashboardPage() {
  const { loading, error, allReadings, latestReading } = useSocket();

  if (loading && allReadings.length === 0) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 text-center">
        Loading dashboard data...
      </div>
    );
  }

  if (error && allReadings.length === 0) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 text-center text-red-500">
        Error loading data: {error}. Please ensure the API is running.
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {error && allReadings.length > 0 && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
          Warning: Could not refresh data. Displaying last known values. Error:{" "}
          {error}
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
              {latestReading
                ? `${latestReading.temperature.toFixed(1)}°C`
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">Current reading</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turbidity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestReading
                ? `${latestReading.turbidity.toFixed(2)} NTU`
                : "N/A"}
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
              {latestReading
                ? `${latestReading.conductivity.toFixed(0)} µS/cm`
                : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              Target: &lt; 2000 ppm
            </p>
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
            <Overview
              data={allReadings
                .slice()
                .sort(
                  (a, b) =>
                    new Date(a.timestamp).getTime() -
                    new Date(b.timestamp).getTime()
                )}
            />
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
