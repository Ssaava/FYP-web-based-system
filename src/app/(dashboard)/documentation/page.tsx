import { AdminGuide } from "@/components/documentation/AdminGuide";
import { ApiDocumentation } from "@/components/documentation/ApiDocumentation";
import { UserGuide } from "@/components/documentation/UserGuide";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DocumentationPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Documentation</h2>
          <p className="text-muted-foreground">
            User guides, system administration, and API documentation
          </p>
        </div>
      </div>

      <Tabs defaultValue="user">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="user">User Guide</TabsTrigger>
          <TabsTrigger value="admin">Admin Guide</TabsTrigger>
          <TabsTrigger value="api">API Documentation</TabsTrigger>
        </TabsList>
        <TabsContent value="user" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Guide</CardTitle>
              <CardDescription>
                Learn how to use the water quality monitoring system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserGuide />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="admin" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Administration Guide</CardTitle>
              <CardDescription>
                Technical documentation for system administrators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminGuide />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="api" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Integration guides and API reference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApiDocumentation />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
