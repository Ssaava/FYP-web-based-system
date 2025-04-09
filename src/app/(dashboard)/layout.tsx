"use client";
import { ProtectedRoute } from "@/components/AuthProvider";
import DashboardLayout from "@/components/DashboardLayout";
import { SidebarProvider, useSidebar } from "@/components/SidebarProvider";
import { AlertProvider } from "@/hooks/useAlerts";
import { useAuthStore } from "@/store/store";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AppLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    // refreshToken();
    if (!token) redirect("/");
  }, [token]);
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
