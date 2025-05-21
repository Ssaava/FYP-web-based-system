import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAlerts } from "@/hooks/useAlerts";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

interface NotificationsPanelProps {
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    title: "High pH Level Detected",
    description: "pH level exceeded normal range (8.5)",
    timestamp: "2 minutes ago",
    type: "warning",
    read: false,
  },
  {
    id: 2,
    title: "System Maintenance",
    description: "Scheduled maintenance in 24 hours",
    timestamp: "1 hour ago",
    type: "info",
    read: false,
  },
  {
    id: 3,
    title: "Sensor Calibration Complete",
    description: "All sensors have been calibrated successfully",
    timestamp: "2 hours ago",
    type: "success",
    read: true,
  },
  {
    id: 4,
    title: "Turbidity Alert",
    description: "Turbidity levels above threshold",
    timestamp: "3 hours ago",
    type: "warning",
    read: true,
  },
];

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const { notificationsList } = useAlerts();

  return (
    <Card className="shadow-lg border">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
        <CardTitle className="text-base">Notifications</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <div className="flex flex-col">
            {notificationsList.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start p-4 border-b hover:bg-muted/50 transition-colors ${
                  notification.read ? "opacity-70" : ""
                }`}
              >
                <div className="mr-3 mt-0.5">
                  {notification.type === "warning" && (
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                  )}
                  {notification.type === "info" && (
                    <Info className="h-5 w-5 text-blue-500" />
                  )}
                  {notification.type === "success" && (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">
                      {notification.title}
                    </h4>
                    {!notification.read && (
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification?.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification?.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
