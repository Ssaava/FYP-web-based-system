"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";
import { useSocket } from "./useSocket";
import {
  PotabilityAssessmentData,
  PotabilityHistoryEntry,
  ProcessedReading,
} from "@/types";

// Define the type for the context value
interface SocketContextType {
  loading: boolean;
  error: string | null;
  allReadings: ProcessedReading[];
  latestReading: ProcessedReading | null;
  assessmentData: PotabilityAssessmentData | null;
  historyData: PotabilityHistoryEntry[];
}

// Create the context
const SocketContext = createContext<SocketContextType | undefined>(undefined);

// Provider component
export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socketData = useSocket();
  // const socketData = useMemo(() => useSocket(), []);
  return (
    <SocketContext.Provider value={socketData}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the context
export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};
