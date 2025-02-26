"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sensorLocations } from "@/data";
import { SensorLocationsMap } from "@/components/common/SensorLocationsMap";

export default function SensorLocationsPage() {
  const [selectedSensor, setSelectedSensor] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSensors = sensorLocations.filter((sensor) => {
    // Apply status filter
    if (statusFilter !== "all" && sensor.status !== statusFilter) {
      return false;
    }

    // Apply search filter
    if (
      searchQuery &&
      !sensor.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Sensor Locations
          </h2>
          <p className="text-muted-foreground">
            Monitor and manage water quality sensors across different locations
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle>Sensor Map</CardTitle>
            <CardDescription>
              Geographic distribution of water quality sensors
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <SensorLocationsMap
              selectedSensorId={selectedSensor}
              onSelectSensor={setSelectedSensor}
            />
          </CardContent>
        </Card>
        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Sensor Status</CardTitle>
            <CardDescription>
              Current status of all monitoring sensors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {
                      sensorLocations.filter((s) => s.status === "normal")
                        .length
                    }
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Normal
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {
                      sensorLocations.filter((s) => s.status === "warning")
                        .length
                    }
                  </div>
                  <div className="text-sm text-yellow-600 dark:text-yellow-400">
                    Warning
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {sensorLocations.filter((s) => s.status === "error").length}
                  </div>
                  <div className="text-sm text-red-600 dark:text-red-400">
                    Error
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Sensor Details</h3>
                {selectedSensor ? (
                  sensorLocations
                    .filter((sensor) => sensor.id === selectedSensor)
                    .map((sensor) => (
                      <div
                        key={sensor.id}
                        className="space-y-2 border rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{sensor.name}</h4>
                          <Badge
                            className={
                              sensor.status === "normal"
                                ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                                : sensor.status === "warning"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
                            }
                          >
                            {sensor.status === "normal" && (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            )}
                            {sensor.status === "warning" && (
                              <AlertTriangle className="h-3 w-3 mr-1" />
                            )}
                            {sensor.status === "error" && (
                              <AlertTriangle className="h-3 w-3 mr-1" />
                            )}
                            {sensor.status.charAt(0).toUpperCase() +
                              sensor.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">pH:</span>{" "}
                            {sensor.parameters.ph}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Temp:</span>{" "}
                            {sensor.parameters.temperature}°C
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Turbidity:
                            </span>{" "}
                            {sensor.parameters.turbidity} NTU
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Conductivity:
                            </span>{" "}
                            {sensor.parameters.conductivity} µS/cm
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Last updated: {sensor.lastReading}
                        </div>
                        <div className="text-xs">
                          <span className="text-muted-foreground">
                            Location:
                          </span>{" "}
                          {sensor.latitude.toFixed(4)},{" "}
                          {sensor.longitude.toFixed(4)}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-sm text-muted-foreground p-3 text-center border rounded-lg">
                    Select a sensor on the map to view details
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
          <div>
            <CardTitle>Sensor List</CardTitle>
            <CardDescription>
              All water quality monitoring sensors
            </CardDescription>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
            <Input
              placeholder="Search sensors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-[200px]"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[130px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Last Reading
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    Parameters
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSensors.map((sensor) => (
                  <TableRow
                    key={sensor.id}
                    className={
                      selectedSensor === sensor.id ? "bg-muted/50" : ""
                    }
                    onClick={() => setSelectedSensor(sensor.id)}
                  >
                    <TableCell className="font-medium">{sensor.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {sensor.latitude.toFixed(4)},{" "}
                      {sensor.longitude.toFixed(4)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          sensor.status === "normal"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                            : sensor.status === "warning"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
                        }
                      >
                        {sensor.status === "normal" && (
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                        )}
                        {sensor.status === "warning" && (
                          <AlertTriangle className="h-3 w-3 mr-1" />
                        )}
                        {sensor.status === "error" && (
                          <AlertTriangle className="h-3 w-3 mr-1" />
                        )}
                        {sensor.status.charAt(0).toUpperCase() +
                          sensor.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {sensor.lastReading}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="text-xs">
                        pH: {sensor.parameters.ph} | Temp:{" "}
                        {sensor.parameters.temperature}°C | Turb:{" "}
                        {sensor.parameters.turbidity} NTU | Cond:{" "}
                        {sensor.parameters.conductivity} µS/cm
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
