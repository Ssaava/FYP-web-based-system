"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { sensorLocations } from "@/data";

interface SensorLocationsMapProps {
  compact?: boolean;
  selectedSensorId?: number | null;
  onSelectSensor?: (sensorId: number) => void;
}

export function SensorLocationsMap({
  compact = false,
  selectedSensorId,
  onSelectSensor,
}: SensorLocationsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedSensor, setSelectedSensor] = useState<number | null>(
    selectedSensorId || null
  );
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        setMapSize({
          width: mapRef.current.clientWidth,
          height: mapRef.current.clientHeight,
        });
      }
    };

    handleResize(); // Initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update selected sensor when prop changes
  useEffect(() => {
    if (selectedSensorId !== undefined) {
      setSelectedSensor(selectedSensorId);
    }
  }, [selectedSensorId]);

  // Simple map rendering using HTML/CSS
  useEffect(() => {
    if (!mapRef.current) return;

    const mapContainer = mapRef.current;
    mapContainer.innerHTML = "";

    // Create a simple map background
    const mapBackground = document.createElement("div");
    mapBackground.className =
      "absolute inset-0 bg-blue-50 dark:bg-blue-950 rounded-lg";
    mapContainer.appendChild(mapBackground);

    // Add grid lines to simulate a map
    const gridLines = document.createElement("div");
    gridLines.className = "absolute inset-0 grid grid-cols-8 grid-rows-8";
    for (let i = 0; i < 64; i++) {
      const cell = document.createElement("div");
      cell.className = "border border-blue-100 dark:border-blue-900";
      gridLines.appendChild(cell);
    }
    mapContainer.appendChild(gridLines);

    // Add sensor markers
    sensorLocations.forEach((sensor) => {
      const marker = document.createElement("div");
      marker.className = `absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
        selectedSensor === sensor.id ? "scale-125 z-10" : ""
      }`;

      // Position markers based on latitude and longitude
      // This is a simplified positioning - in a real app, you'd use proper map coordinates
      const left = ((sensor.longitude + 74.02) / 0.05) * 100; // Simplified calculation
      const top = ((40.73 - sensor.latitude) / 0.05) * 100; // Simplified calculation

      marker.style.left = `${left}%`;
      marker.style.top = `${top}%`;

      // Create marker content
      const markerContent = document.createElement("div");
      markerContent.className = `flex flex-col items-center`;

      // Pin with status color
      const pin = document.createElement("div");
      pin.className = `h-6 w-6 rounded-full flex items-center justify-center ${
        sensor.status === "normal"
          ? "bg-green-500"
          : sensor.status === "warning"
          ? "bg-yellow-500"
          : "bg-red-500"
      }`;
      pin.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;

      // Label
      if (!compact) {
        const label = document.createElement("div");
        label.className =
          "mt-1 px-2 py-1 bg-white dark:bg-gray-800 text-xs font-medium rounded shadow-sm";
        label.textContent = sensor.name;
        markerContent.appendChild(label);
      }

      markerContent.appendChild(pin);
      marker.appendChild(markerContent);

      // Add click event
      marker.addEventListener("click", () => {
        setSelectedSensor(sensor.id);
        if (onSelectSensor) {
          onSelectSensor(sensor.id);
        }
      });

      mapContainer.appendChild(marker);
    });
  }, [compact, selectedSensor, onSelectSensor]);

  return (
    <Card className={compact ? "border-0 shadow-none" : ""}>
      <CardContent className={compact ? "p-0" : "p-4"}>
        <div
          className="relative w-full"
          style={{ height: compact ? "200px" : "400px" }}
        >
          <div
            ref={mapRef}
            className="absolute inset-0 rounded-lg overflow-hidden"
          ></div>

          {selectedSensor && !compact && (
            <div className="absolute bottom-4 left-4 right-4 bg-background border rounded-lg p-3 shadow-lg max-h-[150px] overflow-y-auto">
              {sensorLocations.map(
                (sensor) =>
                  sensor.id === selectedSensor && (
                    <div key={sensor.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{sensor.name}</h3>
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
                    </div>
                  )
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
