"use client";
import { ProtectedRoute } from "@/components/AuthProvider";
import DashboardLayout from "@/components/DashboardLayout";
import { SidebarProvider } from "@/components/SidebarProvider";
import { AlertProvider } from "@/hooks/useAlerts";

export default function AppLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <AlertProvider>
        <SidebarProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </SidebarProvider>
      </AlertProvider>
    </ProtectedRoute>
  );
}
