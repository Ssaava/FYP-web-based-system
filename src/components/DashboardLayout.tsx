"use client";
import { Header } from "@/components/common/Header";
import { Sidebar } from "@/components/common/Sidebar";
import { useSidebar } from "@/components/SidebarProvider";
import { ReactNode } from "react";
import Head from "next/head";

// Define constants for better readability
const COLLAPSED_SIDEBAR_WIDTH = "md:ml-16";
const EXPANDED_SIDEBAR_WIDTH = "md:ml-64";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { collapsed } = useSidebar();

  return (
    <>
    <Head>
        <title>Dashboard</title>
      </Head>

    <div className="relative flex min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ${
          collapsed ? COLLAPSED_SIDEBAR_WIDTH : EXPANDED_SIDEBAR_WIDTH
        }`}
      >
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </div>
    </>
  );
}
