"use client";
import { ProtectedRoute } from "@/components/AuthProvider";
import DashboardLayout from "@/components/DashboardLayout";
import { SidebarProvider } from "@/components/SidebarProvider";
import { AlertProvider } from "@/hooks/useAlerts";
import { useSensorStore } from "@/store/store";
import { useEffect } from "react";

export default function AppLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const getRealTimeData = useSensorStore((state) => state.getRealTimeData);
  useEffect(() => {
    getRealTimeData();
  }, []);
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
