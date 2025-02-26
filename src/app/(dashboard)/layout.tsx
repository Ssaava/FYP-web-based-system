"use client";
import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/Sidebar";
import { useSidebar } from "@/components/SidebarProvider";

export default function AppLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { collapsed } = useSidebar();

  return (
    <div className="relative flex min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ${
          collapsed ? "md:ml-16" : "md:ml-64"
        }`}
      >
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
