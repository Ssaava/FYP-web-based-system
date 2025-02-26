"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { SidebarProvider, useSidebar } from "@/components/SidebarProvider";
import { AlertProvider } from "@/hooks/useAlerts";

export default function AppLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AlertProvider>
      <SidebarProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </SidebarProvider>
    </AlertProvider>
  );
}
