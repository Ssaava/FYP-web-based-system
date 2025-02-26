import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { SystemSettings } from "@/components/settings/SystemSettings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and system preferences
        </p>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>
              Update your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileSettings />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>
              Configure system parameters and thresholds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SystemSettings />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationSettings />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
