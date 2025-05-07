"use client";

import { Card, CardContent } from "@/components/ui/card";
import { sensorLocations } from "@/data";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// Fix default marker icons (React-Leaflet issue)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/dist/images/marker-icon-2x.png",
  iconUrl: "/leaflet/dist/images/marker-icon.png",
  shadowUrl: "/leaflet/dist/images/marker-shadow.png",
});
interface SensorLocationsMapProps {
  compact?: boolean;
  selectedSensorId?: number | null;
  onSelectSensor?: (sensorId: number) => void;
}
const createCustomMarker = (status: string) => {
  const iconColor =
    status === "normal" ? "green" : status === "warning" ? "orange" : "red";

  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${iconColor}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
};

const SensorMap = ({
  compact = false,
  selectedSensorId,
  onSelectSensor,
}: SensorLocationsMapProps) => {
  const [selectedSensor, setSelectedSensor] = useState<number | null>(
    selectedSensorId || null
  );

  return (
    <Card className={compact ? "border-0 shadow-none" : ""}>
      <CardContent className={compact ? "p-0" : "p-4"}>
        <div
          className="relative w-full"
          style={{ height: compact ? "200px" : "400px" }}
        >
          <MapContainer
            center={[
              sensorLocations[0].position[0],
              sensorLocations[0].position[1],
            ]} // Default map center
            zoom={13} // Initial zoom level
            style={{ height: "100%", width: "100%" }}
          >
            {/* OpenStreetMap tiles */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Markers for each sensor */}
            {sensorLocations.map((sensor) => (
              <Marker
                key={sensor.id}
                position={sensor.position}
                icon={createCustomMarker(sensor.status)}
                eventHandlers={{
                  click: () => {
                    setSelectedSensor(sensor.id);
                    if (onSelectSensor) {
                      onSelectSensor(sensor.id);
                    }
                  },
                }}
              >
                <Popup>
                  {selectedSensor && !compact && (
                    <div className="min-w-[280px] bg-background border rounded-lg p-3 shadow-lg max-h-[150px] overflow-y-auto">
                      {sensorLocations.map(
                        (sensor) =>
                          sensor.id === selectedSensor && (
                            <div key={sensor.id} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium text-foreground">
                                  {sensor.name}
                                </h3>
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
                              <div className="grid grid-cols-2 gap-2 text-sm text-foreground">
                                <div>
                                  <span className="text-muted-foreground">
                                    pH:
                                  </span>{" "}
                                  {sensor.parameters.ph}
                                </div>
                                <div>
                                  <span className="text-muted-foreground">
                                    Temp:
                                  </span>{" "}
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
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SensorMap;
