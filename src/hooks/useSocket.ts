// hooks/useSocket.ts
import { useEffect, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";

// const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL; // Use your Flask server URL here

interface ApiReading {
  Conductivity: number;
  Timestamp: string;
  Turbidity: number;
  ph: number;
  predicted_potability: number;
  temperature: number;
}

// Interface for the processed data used by components
// It's good practice to place this in a shared types file (e.g., types/index.ts)
export interface ProcessedReading {
  ph: number;
  temperature: number;
  turbidity: number;
  conductivity: number;
  timestamp: string; // Original timestamp string
  formattedTimestamp: string; // User-friendly timestamp
  predictedPotability: number; // 0 for not potable, 1 for potable
}

export const useSocket = () => {
  const [allReadings, setAllReadings] = useState<ProcessedReading[]>([]);
  const [latestReading, setLatestReading] = useState<ProcessedReading | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (allReadings.length === 0) {
        setLoading(true);
      }
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        const response = await fetch(`${baseUrl}/api/ml_model`, {
          method: "POST", // Changed to POST
          headers: {
            "Content-Type": "application/json", // Good practice, even if body is empty
          },
          // body: JSON.stringify({}), // Send empty JSON object if required, or null/undefined if not
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiReading[] = await response.json();

        const processedData: ProcessedReading[] = data
          .map((item) => ({
            ph: item.ph,
            temperature: item.temperature,
            turbidity: item.Turbidity,
            conductivity: item.Conductivity,
            timestamp: item.Timestamp,
            formattedTimestamp: new Date(item.Timestamp).toLocaleString(), // Format for display
            predictedPotability: item.predicted_potability,
          }))
          .sort(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          ); // Sort by timestamp descending

        setAllReadings(processedData);
        if (processedData.length > 0) {
          setLatestReading(processedData[0]); // Latest is now the first after sorting
        } else {
          setLatestReading(null);
        }
        setError(null);
      } catch (e: any) {
        console.error("Failed to fetch data:", e);
        setError(e.message || "Failed to fetch data from ML model endpoint");
      } finally {
        setLoading(false);
      }
    };

    // socketRef.current = io(SOCKET_URL);

    // socketRef.current.on("connect", () => {
    fetchData(); //initial fetching of data
    // console.log("Connected to WebSocket server");
    // });

    // socketRef.current.on("new_data", (data) => {
    //   console.log("Message from server:", data);
    //   fetchData();
    //   setMessages((prev) => [...prev, data]);
    // });

    setInterval(() => {
      console.log("Fetching Data: ", allReadings);
      fetchData();
    }, 5000);

    // socketRef.current.on("response", (data) => {
    //   console.log("Response from server:", data);
    //   fetchData();
    //   setMessages((prev) => [...prev, data]);
    // });

    // return () => {
    //   socketRef.current?.disconnect();
    // };
  }, []);

  // const sendMessage = (data: any) => {
  //   socketRef.current?.emit("my_event", data);
  // };

  return { loading, error, allReadings, latestReading };
};
