"use client";

import { Badge } from "@/components/ui/badge";
import { SensorLocation } from "@/data";
import "leaflet/dist/leaflet.css";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Popup } from "react-leaflet";
// Fix default marker icons (React-Leaflet issue)
const MapPopup = ({ sensor }: { sensor: SensorLocation }) => {
  return (
    <Popup className="min-w-[250px] p-0">
      <div className="w-full p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-base">{sensor.name}</h3>
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
            {sensor.status.charAt(0).toUpperCase() + sensor.status.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <span className="text-muted-foreground">pH:</span>{" "}
            {sensor.parameters.ph}
          </div>
          <div>
            <span className="text-muted-foreground">Temp:</span>{" "}
            {sensor.parameters.temperature}°C
          </div>
          <div>
            <span className="text-muted-foreground">Turbidity:</span>{" "}
            {sensor.parameters.turbidity} NTU
          </div>
          <div>
            <span className="text-muted-foreground">Conductivity:</span>{" "}
            {sensor.parameters.conductivity} µS/cm
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Last updated: {sensor.lastReading}
        </div>
      </div>
    </Popup>
  );
};

export default MapPopup;
