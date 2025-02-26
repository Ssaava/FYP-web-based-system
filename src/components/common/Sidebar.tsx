"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Droplets,
  BarChart3,
  FileText,
  Bell,
  Settings,
  Brain,
  FlaskRoundIcon as Flask,
  BookOpen,
  History,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebar } from "../SidebarProvider";

const routes = [
  {
    label: "Dashboard",
    icon: Droplets,
    href: "/dashboard",
    color: "text-primary",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
    color: "text-green-500",
  },
  {
    label: "History",
    icon: History,
    href: "/history",
    color: "text-amber-500",
  },
  {
    label: "Sensor Locations",
    icon: MapPin,
    href: "/sensor-locations",
    color: "text-blue-500",
  },
  {
    label: "AI Models",
    icon: Brain,
    href: "/ai-models",
    color: "text-purple-500",
  },
  {
    label: "Potability",
    icon: Flask,
    href: "/potability",
    color: "text-teal-500",
  },
  {
    label: "Reports",
    icon: FileText,
    href: "/reports",
    color: "text-orange-500",
  },
  {
    label: "Alerts",
    icon: Bell,
    href: "/alerts",
    color: "text-red-500",
  },
  {
    label: "Documentation",
    icon: BookOpen,
    href: "/documentation",
    color: "text-indigo-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500",
  },
];

// Window size hook
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

interface SidebarProps {
  isMobile?: boolean;
}

export function Sidebar({ isMobile = false }: SidebarProps) {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();
  const { width } = useWindowSize();

  // Auto-collapse sidebar on small screens
  useEffect(() => {
    if (width < 1024 && width !== 0 && !isMobile) {
      setCollapsed(true);
    } else if (width >= 1024 && !isMobile) {
      setCollapsed(false);
    }
  }, [width, isMobile, setCollapsed]);

  // Don't allow collapsing on mobile
  const isCollapsed = isMobile ? false : collapsed;

  return (
    <div
      className={cn(
        "flex flex-col border-r bg-background transition-all duration-300",
        isMobile ? "h-full" : "h-screen fixed left-0 top-0 z-40",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div
        className={cn(
          "flex items-center h-16 border-b px-4",
          isCollapsed ? "justify-center" : "justify-between"
        )}
      >
        {!isCollapsed && (
          <div className="flex items-center font-bold text-xl text-primary">
            <Droplets className="h-6 w-6 mr-2" />
            AWQMS
          </div>
        )}
        {isCollapsed && <Droplets className="h-6 w-6 text-primary" />}
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col space-y-2 p-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center rounded-lg py-3 px-3 text-sm font-medium transition-colors",
                pathname === route.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                isCollapsed && "justify-center px-0"
              )}
            >
              <route.icon
                className={cn(
                  "h-5 w-5",
                  route.color,
                  isCollapsed ? "mr-0" : "mr-3"
                )}
              />
              {!isCollapsed && <span>{route.label}</span>}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
