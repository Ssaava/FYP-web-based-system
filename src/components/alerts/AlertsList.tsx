import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

const alerts = [
  {
    id: 1,
    title: "High pH Level Detected",
    description: "pH level exceeded normal range (8.5)",
    timestamp: "2 minutes ago",
    type: "warning",
  },
  {
    id: 2,
    title: "System Maintenance",
    description: "Scheduled maintenance in 24 hours",
    timestamp: "1 hour ago",
    type: "info",
  },
  {
    id: 3,
    title: "Sensor Calibration Complete",
    description: "All sensors have been calibrated successfully",
    timestamp: "2 hours ago",
    type: "success",
  },
  {
    id: 4,
    title: "Turbidity Alert",
    description: "Turbidity levels above threshold",
    timestamp: "3 hours ago",
    type: "warning",
  },
];

export function AlertsList() {
  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start space-x-4 rounded-lg border p-4"
          >
            {alert.type === "warning" && (
              <AlertCircle className="h-5 w-5 mt-0.5 text-yellow-500" />
            )}
            {alert.type === "info" && (
              <Info className="h-5 w-5 mt-0.5 text-blue-500" />
            )}
            {alert.type === "success" && (
              <CheckCircle2 className="h-5 w-5 mt-0.5 text-green-500" />
            )}
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{alert.title}</p>
                <Badge variant="outline">{alert.type}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {alert.description}
              </p>
              <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
