"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { AlertToast } from "@/components/common/AlertToast";
import { useSocket } from "./useSocket";
type AlertType = "warning" | "info" | "success" | "error";

interface Alert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
}

type NotificationList = {
  id: number;
  title: string;
  description: string | null;
  timestamp: string | null;
  type: string | null;
  read: boolean | null;
};

type LatestReading = {
  ph: number | null;
  turbidity: number | null;
  temperature: number | null;
  conductivity: number | null;
};
interface AlertContextType {
  alerts: Alert[];
  notificationsList: NotificationList[];
  showAlert: (type: AlertType, title: string, description: string) => void;
  dismissAlert: (id: string) => void;
  setNotificationsList: Dispatch<SetStateAction<NotificationList[]>>;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { latestReading } = useSocket();

  const [notificationsList, setNotificationsList] = useState<
    NotificationList[]
  >([]);
  const [lastNotifiedValues, setLastNotifiedValues] = useState<LatestReading>({
    ph: null,
    turbidity: null,
    temperature: null,
    conductivity: null,
  });

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

  useEffect(() => {
    if (!latestReading) return;

    const { ph, turbidity, temperature, conductivity } = latestReading;
    const newNotifications: NotificationList[] = [];

    // Check pH levels (threshold: < 6.5 or > 8.5)
    if (ph !== lastNotifiedValues.ph && (ph < 6.5 || ph > 8.5)) {
      newNotifications.push({
        id: Date.now() + 1,
        title: `${ph < 6.5 ? "Low" : "High"} pH Level Detected`,
        description: `pH level ${
          ph < 6.5 ? "below" : "exceeded"
        } normal range (${ph.toFixed(0)})`,
        timestamp: "Just now",
        type: "warning",
        read: false,
      });

      showAlert(
        "warning",
        `${ph < 6.5 ? "Low" : "High"} pH Level Detected`,
        `pH level ${ph < 6.5 ? "below" : "exceeded"} normal range (${ph.toFixed(
          0
        )})`
      );
      setLastNotifiedValues((prev) => ({ ...prev, ph }));
    }

    // Check turbidity levels (threshold: > 5 NTU)
    if (turbidity !== lastNotifiedValues.turbidity && turbidity > 4.5) {
      newNotifications.push({
        id: Date.now() + 2,
        title: "High Turbidity Alert",
        description: `Turbidity levels above threshold (${turbidity.toFixed(
          0
        )} NTU)`,
        timestamp: "Just now",
        type: "warning",
        read: false,
      });
      showAlert(
        "warning",
        "High Turbidity Alert",
        `Turbidity levels above threshold (${turbidity.toFixed(0)} NTU)`
      );
      setLastNotifiedValues((prev) => ({ ...prev, turbidity }));
    }

    // Check temperature levels (threshold: < 20°C or > 30°C)
    if (
      temperature !== lastNotifiedValues.temperature &&
      (temperature < 20 || temperature > 30)
    ) {
      newNotifications.push({
        id: Date.now() + 3,
        title: `${temperature < 20 ? "Low" : "High"} Temperature Alert`,
        description: `Temperature ${
          temperature < 20 ? "below" : "above"
        } normal range (${temperature.toFixed(0)}°C)`,
        timestamp: "Just now",
        type: "warning",
        read: false,
      });

      showAlert(
        "warning",
        `${temperature < 20 ? "Low" : "High"} Temperature Alert`,
        `Temperature ${
          temperature < 20 ? "below" : "above"
        } normal range (${temperature.toFixed(2)}°C)`
      );
      setLastNotifiedValues((prev) => ({ ...prev, temperature }));
    }

    if (newNotifications.length > 0) {
      setNotificationsList((prev) => [...newNotifications, ...prev]);
    }

    // Check temperature levels (threshold: < 20°C or > 30°C)
    if (
      conductivity !== lastNotifiedValues.conductivity &&
      (conductivity < 50 || conductivity > 500)
    ) {
      newNotifications.push({
        id: Date.now() + 3,
        title: `${conductivity < 50 ? "Low" : "High"} Conductivity Alert`,
        description: `Conductivity ${
          conductivity < 50 ? "below" : "above"
        } normal range (${conductivity.toFixed(0)}ppm)`,
        timestamp: "Just now",
        type: "warning",
        read: false,
      });

      showAlert(
        "warning",
        `${conductivity < 50 ? "Low" : "High"} Conductivity Alert`,
        `Conductivity ${
          conductivity < 50 ? "below" : "above"
        } normal range (${conductivity.toFixed(0)}ppm)`
      );
      setLastNotifiedValues((prev) => ({ ...prev, conductivity }));
    }

    if (newNotifications.length > 0) {
      setNotificationsList((prev) => [...newNotifications, ...prev]);
    }
  }, [latestReading]);

  return (
    <AlertContext.Provider
      value={{
        alerts,
        showAlert,
        dismissAlert,
        notificationsList,
        setNotificationsList,
      }}
    >
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
