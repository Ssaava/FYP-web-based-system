"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";
import { AlertToast } from "@/components/common/AlertToast";
type AlertType = "warning" | "info" | "success" | "error";

interface Alert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
}

interface AlertContextType {
  alerts: Alert[];
  showAlert: (type: AlertType, title: string, description: string) => void;
  dismissAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = useCallback(
    (type: AlertType, title: string, description: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      setAlerts((prev) => [...prev, { id, type, title, description }]);

      // Auto dismiss after 5 seconds
      setTimeout(() => {
        dismissAlert(id);
      }, 5000);
    },
    []
  );

  const dismissAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  // Example of triggering alerts based on water quality thresholds
  useEffect(() => {
    // Simulate a pH level alert after 3 seconds
    const timer = setTimeout(() => {
      showAlert(
        "warning",
        "High pH Level Detected",
        "pH level has exceeded the normal range (8.5). Please check the system."
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <AlertContext.Provider value={{ alerts, showAlert, dismissAlert }}>
      {children}
      <div className="relative">
        {alerts.map((alert) => (
          <AlertToast
            key={alert.id}
            type={alert.type}
            title={alert.title}
            description={alert.description}
            onClose={() => dismissAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlerts must be used within an AlertProvider");
  }
  return context;
}
