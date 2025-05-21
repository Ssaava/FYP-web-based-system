"use client";

import { createContext, useState, useContext, type ReactNode } from "react";

// Create a context for sidebar state
type SidebarContextType = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => {
    console.warn("setCollapsed called outside of SidebarProvider");
  },
});

// Create a hook to use the sidebar context
export const useSidebar = () => useContext(SidebarContext);

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarCollapsed,
        setCollapsed: setSidebarCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
