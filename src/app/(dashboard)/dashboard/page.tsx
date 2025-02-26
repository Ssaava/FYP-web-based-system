"use client";

import { useEffect } from "react";
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

export default function DashboardPage() {
  // const { showAlert } = useAlerts();

  // Simulate random alerts for demonstration
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // Randomly show different types of alerts
  //     const alertTypes = ["warning", "info", "success", "error"] as const;
  //     const randomType =
  //       alertTypes[Math.floor(Math.random() * alertTypes.length)];

  //     const alerts = {
  //       warning: {
  //         title: "Turbidity Level Rising",
  //         description:
  //           "Turbidity has increased to 4.8 NTU, approaching the upper limit.",
  //       },
  //       info: {
  //         title: "System Update Available",
  //         description:
  //           "A new system update is available. Please update at your convenience.",
  //       },
  //       success: {
  //         title: "Water Quality Optimal",
  //         description:
  //           "All parameters are within optimal ranges for the past 24 hours.",
  //       },
  //       error: {
  //         title: "Conductivity Sensor Error",
  //         description:
  //           "The conductivity sensor is reporting erratic values. Maintenance required.",
  //       },
  //     };

  //     showAlert(
  //       randomType,
  //       alerts[randomType].title,
  //       alerts[randomType].description
  //     );
  //   }, 10000); // Show after 10 seconds

  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">pH Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2</div>
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
            <div className="text-2xl font-bold">23°C</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last hour
            </p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Turbidity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 NTU</div>
            <p className="text-xs text-muted-foreground">Within safe limits</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conductivity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450 µS/cm</div>
            <p className="text-xs text-muted-foreground">Normal range</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
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
            <WaterQualityStatus />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Recent Readings</CardTitle>
            <CardDescription>
              Latest sensor readings from all parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentReadings />
          </CardContent>
        </Card>
        <div className="col-span-full md:col-span-1">
          <DashboardSensorLocations />
        </div>
      </div>
    </div>
  );
}
