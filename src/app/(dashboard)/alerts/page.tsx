import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { AlertsConfig } from "@/components/alerts/AlertsConfig";
import { AlertsList } from "@/components/alerts/AlertsList";

export default function AlertsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Alerts</h2>
          <p className="text-muted-foreground">
            Monitor and configure system alerts
          </p>
        </div>
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Configure Notifications
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>
              View and manage system notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertsList />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Alert Configuration</CardTitle>
            <CardDescription>
              Set up alert thresholds and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertsConfig />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
