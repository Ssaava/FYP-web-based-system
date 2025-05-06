import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sensorLocations } from "@/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SensorMap from "../sensor-locations/SensorMap";

export function DashboardSensorLocations() {
  // Count sensors by status
  const normalCount = sensorLocations.filter(
    (s) => s.status === "normal"
  ).length;
  const warningCount = sensorLocations.filter(
    (s) => s.status === "warning"
  ).length;
  const errorCount = sensorLocations.filter((s) => s.status === "error").length;

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <CardTitle>Sensor Locations</CardTitle>
          <CardDescription>
            Geographic distribution of water quality sensors
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/sensor-locations">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <SensorMap compact />

          <div className="flex items-center justify-between">
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="flex items-center justify-center gap-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100">
                  {normalCount}
                </Badge>
                <span className="text-sm">Normal</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100">
                  {warningCount}
                </Badge>
                <span className="text-sm">Warning</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100">
                  {errorCount}
                </Badge>
                <span className="text-sm">Error</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
