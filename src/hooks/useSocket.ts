// hooks/useSocket.ts
import { getPotabilityStatus } from "@/lib/utils";
import {
  ApiResponseData,
  PotabilityAssessmentData,
  PotabilityHistoryEntry,
  ProcessedReading,
} from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [historyData, setHistoryData] = useState<PotabilityHistoryEntry[]>([]);
  const [assessmentData, setAssessmentData] =
    useState<PotabilityAssessmentData | null>(null);
  const [allReadings, setAllReadings] = useState<ProcessedReading[]>([]);
  const [latestReading, setLatestReading] = useState<ProcessedReading | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const fetchData = useCallback(async () => {
    if (allReadings.length === 0) {
      setLoading(true);
    }
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      const response = await fetch(`${baseUrl}/api/ml_model`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errData = await response
          .json()
          .catch(() => ({ error: "Failed to parse error from /ml_model" }));
        throw new Error(
          errData.error ||
            `Failed to fetch potability data (${response.status})`
        );
      }
      const data: ApiResponseData[] = await response.json();
      console.log("API DATA: ", data);
      if (!data || data.length === 0) {
        setError("No data received from the API.");
        setLoading(false);
        return;
      }

      const sortedReadings: ProcessedReading[] = data
        .map((item) => ({
          ph: item.ph,
          temperature: item.temperature,
          turbidity: item.Turbidity,
          conductivity: item.Conductivity,
          timestamp: item.Timestamp,
          formatted_timestamp: new Date(item.Timestamp).toLocaleString(), // Format for display
          predicted_potability: item.predicted_potability,
        }))
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ); // Sort by timestamp descending

      const latestReading = sortedReadings[0] || null;
      // --- Process for PotabilityAssessment ---
      // Calculate average potability from all readings
      const potabilityValues = sortedReadings.map(
        (r) => r.predicted_potability
      );

      const averagePotability =
        potabilityValues.reduce((sum, val) => sum + val, 0) /
        (potabilityValues.length || 1);
      const potabilityScore = Math.round(averagePotability * 100); // As percentage

      const currentStatus = getPotabilityStatus(potabilityScore);

      setAssessmentData({
        potabilityScore,
        status: currentStatus,
        latestReading: latestReading,
      });

      const newHistoryData: PotabilityHistoryEntry[] = sortedReadings.map(
        (reading) => {
          const readingTimestamp = new Date(reading.timestamp).getTime();
          return {
            // Example: "5/7/2025"
            date: new Date(reading.timestamp).toLocaleDateString(undefined, {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }),
            timestamp: readingTimestamp,
            score: reading.predicted_potability === 1 ? 100 : 0, // Convert 0/1 to 0/100 for score
            status: reading.predicted_potability === 1 ? "safe" : "unsafe",
          };
        }
      );
      setHistoryData(newHistoryData);
      setAllReadings(sortedReadings);
      if (sortedReadings.length > 0) {
        console.log("Latest Reading: ", latestReading);
        setLatestReading(sortedReadings[0]); // Latest is now the first after sorting
      } else {
        setLatestReading(null);
      }
      setError(null);
    } catch (e: any) {
      console.error("Failed to fetch data:", e.message);
      setError(e.message || "Failed to fetch data from ML model endpoint");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("connect", () => {
      fetchData(); //initial fetching of data
      console.log("Connected to WebSocket server");
    });

    socketRef.current.on("new_data", (data) => {
      fetchData();
    });

    return () => {
      socketRef.current?.off("connect");
      socketRef.current?.off("new_data");
      socketRef.current?.disconnect();
    };
  }, []);

  return {
    loading,
    error,
    allReadings,
    latestReading,
    historyData,
    assessmentData,
  };
};
