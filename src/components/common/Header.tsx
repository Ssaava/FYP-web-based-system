"use client";

import { usePathname } from "next/navigation";
import { Bell, RefreshCw, User, ChevronDown, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NotificationsPanel } from "./NotificationsPanel";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { useAuthStore } from "@/store/store";
import Link from "next/link";
import { useAlerts } from "@/hooks/useAlerts";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/analytics": "Analytics",
  "/history": "Historical Data",
  "/sensor-locations": "Sensor Locations",
  "/ai-models": "AI & Machine Learning",
  "/potability": "Water Potability",
  "/reports": "Reports",
  "/alerts": "Alerts",
  "/documentation": "Documentation",
  "/settings": "Settings",
};

export function Header() {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  const { notificationsList, setNotificationsList } = useAlerts();
  const notificationCount = notificationsList.length;

  const logoutUser = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
    }
  };

  const pageTitle = pageTitles[pathname] || "AWQMS";

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center">
        {/* Mobile menu trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar isMobile />
          </SheetContent>
        </Sheet>

        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>
      <h1 className="font-bold text-lg">Sensor Information</h1>
      <div className="flex items-center gap-2 md:gap-4">
        <ThemeToggle />

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleNotifications}
            className="relative"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                {notificationCount}
              </Badge>
            )}
          </Button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 z-50">
              <NotificationsPanel
                onClose={() => {
                  setShowNotifications(false);
                  setNotificationsList([]);
                }}
              />
            </div>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="hidden md:block text-sm font-medium">
                {user?.name}
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/settings/">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator />
            <button onClick={logoutUser} className="w-full">
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
