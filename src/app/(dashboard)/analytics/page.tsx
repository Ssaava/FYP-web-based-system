"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QualityTrends } from "@/components/analytics/QualityTrends"; // Assuming this still uses only forecast data
import { PredictiveAnalysis } from "@/components/analytics/PredictiveAnalysis";

// --- TYPE DEFINITIONS ---
interface ForecastDataPayload {
  ph: Record<string, number>;
  Turbidity: Record<string, number>;
  Conductivity: Record<string, number>;
  temperature: Record<string, number>;
  predicted_potability: Record<string, number>; // Potability forecast used by QualityTrends
  timestamps: Record<string, number>; // Milliseconds since epoch
}

interface MlModelApiReading {
  Conductivity: number;
  Timestamp: string;
  Turbidity: number;
  ph: number;
  predicted_potability: number;
  temperature: number;
}

interface ApiError {
  error: string;
}

interface PredictiveChartDataPoint {
  date: string;
  timestamp: number;
  ph_actual?: number | null;
  ph_forecast?: number | null;
  turbidity_actual?: number | null;
  turbidity_forecast?: number | null;
  conductivity_actual?: number | null;
  conductivity_forecast?: number | null;
  temperature_actual?: number | null;
  temperature_forecast?: number | null;
}

interface QualityTrendsData {
  // For the potability trends chart
  label: string;
  potable: number;
  nonPotable: number;
}
// --- END OF TYPE DEFINITIONS ---

export default function AnalyticsPage() {
  const [predictiveChartData, setPredictiveChartData] = useState<
    PredictiveChartDataPoint[]
  >([]);
  const [qualityTrendsData, setQualityTrendsData] = useState<
    QualityTrendsData[]
  >([]); // For forecasted potability
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const forecastPeriods = 10;

  const formatTimestampForXAxis = (timestamp: number): string => {
    const dateObj = new Date(timestamp);
    return `${dateObj.toLocaleDateString(undefined, {
      month: "numeric",
      day: "numeric",
    })} ${dateObj.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`;
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);
      setPredictiveChartData([]);
      setQualityTrendsData([]);

      try {
        // Fetch both current data and forecast data
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        const [currentDataResponse, forecastDataResponse] = await Promise.all([
          fetch(`${baseUrl}/api/ml_model`, { method: "POST" }), // Assuming it's POST and needs no body
          fetch(`${baseUrl}/api/forecast`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ periods: forecastPeriods }),
          }),
        ]);

        // Process Current Data
        let actualReadings: MlModelApiReading[] = [];
        if (currentDataResponse.ok) {
          actualReadings =
            (await currentDataResponse.json()) as MlModelApiReading[];
        } else {
          const errorData = await currentDataResponse
            .json()
            .catch(() => ({
              error: "Failed to parse current data error response",
            }));
          console.warn(
            `Failed to fetch current data: ${currentDataResponse.status}`,
            errorData.error || ""
          );
          // Decide if this is a critical error or if we can proceed with only forecast
        }

        // Process Forecast Data
        const forecastResponseData: ForecastDataPayload | ApiError =
          await forecastDataResponse.json();
        if (
          !forecastDataResponse.ok ||
          ("error" in forecastResponseData && forecastResponseData.error)
        ) {
          const errorMessage =
            "error" in forecastResponseData && forecastResponseData.error
              ? forecastResponseData.error
              : `Forecast API request failed (${forecastDataResponse.status})`;
          // If forecast fails, we might still show actual data, or show a full error.
          // For now, let's throw if forecast is essential for this page.
          throw new Error(`Forecast data error: ${errorMessage}`);
        }
        const validForecastPayload =
          forecastResponseData as ForecastDataPayload;

        // --- Combine Data for Predictive Chart ---
        const combinedDataMap = new Map<number, PredictiveChartDataPoint>();

        // Add actual readings
        actualReadings.forEach((reading) => {
          // Timestamps from /ml_model are GMT strings, convert to ms
          const timestampMs = new Date(reading.Timestamp).getTime();
          if (isNaN(timestampMs)) {
            console.warn(
              "Invalid timestamp in actual reading:",
              reading.Timestamp
            );
            return;
          }
          combinedDataMap.set(timestampMs, {
            timestamp: timestampMs,
            date: formatTimestampForXAxis(timestampMs),
            ph_actual: reading.ph,
            turbidity_actual: reading.Turbidity,
            conductivity_actual: reading.Conductivity,
            temperature_actual: reading.temperature,
            // Forecast fields will be null or undefined here
            ph_forecast: null,
            turbidity_forecast: null,
            conductivity_forecast: null,
            temperature_forecast: null,
          });
        });

        // Add forecast readings
        const numForecastEntries = Object.keys(
          validForecastPayload.timestamps
        ).length;
        let lastActualTimestamp = 0;
        if (actualReadings.length > 0) {
          const validActualTimestamps = actualReadings
            .map((r) => new Date(r.Timestamp).getTime())
            .filter((ts) => !isNaN(ts));
          if (validActualTimestamps.length > 0) {
            lastActualTimestamp = Math.max(...validActualTimestamps);
          }
        }

        for (let i = 0; i < numForecastEntries; i++) {
          const key = i.toString();
          const forecastTimestampMs = validForecastPayload.timestamps[key]; // Already in ms

          if (forecastTimestampMs === undefined) continue;

          const existingEntry = combinedDataMap.get(forecastTimestampMs);
          const forecastDataPoint: Partial<PredictiveChartDataPoint> = {
            ph_forecast: validForecastPayload.ph[key],
            turbidity_forecast: validForecastPayload.Turbidity[key],
            conductivity_forecast: validForecastPayload.Conductivity[key],
            temperature_forecast: validForecastPayload.temperature[key],
          };

          if (existingEntry) {
            // Should not happen if timestamps are unique
            Object.assign(existingEntry, forecastDataPoint);
          } else {
            combinedDataMap.set(forecastTimestampMs, {
              timestamp: forecastTimestampMs,
              date: formatTimestampForXAxis(forecastTimestampMs),
              ...forecastDataPoint,
              // Actual fields will be null or undefined here
              ph_actual: null,
              turbidity_actual: null,
              conductivity_actual: null,
              temperature_actual: null,
            });
          }
        }

        // Connect the last actual point to the first forecast point if they don't align on timestamp
        // This makes the dotted line appear to start from the end of the solid line.
        if (lastActualTimestamp > 0 && numForecastEntries > 0) {
          const firstForecastTimestamp = validForecastPayload.timestamps["0"];
          const lastActualPoint = combinedDataMap.get(lastActualTimestamp);

          if (
            lastActualPoint &&
            firstForecastTimestamp &&
            lastActualTimestamp !== firstForecastTimestamp
          ) {
            // If the first forecast point is not already the last actual point
            const firstForecastPointData = combinedDataMap.get(
              firstForecastTimestamp
            );
            if (firstForecastPointData) {
              // Make the first forecast data point also carry the last actual values for forecast series
              firstForecastPointData.ph_forecast =
                lastActualPoint.ph_actual ?? firstForecastPointData.ph_forecast;
              firstForecastPointData.turbidity_forecast =
                lastActualPoint.turbidity_actual ??
                firstForecastPointData.turbidity_forecast;
              firstForecastPointData.conductivity_forecast =
                lastActualPoint.conductivity_actual ??
                firstForecastPointData.conductivity_forecast;
              firstForecastPointData.temperature_forecast =
                lastActualPoint.temperature_actual ??
                firstForecastPointData.temperature_forecast;
            }
          } else if (
            lastActualPoint &&
            firstForecastTimestamp &&
            lastActualTimestamp === firstForecastTimestamp
          ) {
            // If they share the same timestamp, merge the actual values into the forecast fields of that point
            // so the forecast line starts from there
            const sharedPoint = combinedDataMap.get(lastActualTimestamp)!; // Should exist
            sharedPoint.ph_forecast = sharedPoint.ph_actual;
            sharedPoint.turbidity_forecast = sharedPoint.turbidity_actual;
            sharedPoint.conductivity_forecast = sharedPoint.conductivity_actual;
            sharedPoint.temperature_forecast = sharedPoint.temperature_actual;
          }
        }

        const finalPredictiveChartData = Array.from(
          combinedDataMap.values()
        ).sort((a, b) => a.timestamp - b.timestamp);
        setPredictiveChartData(finalPredictiveChartData);

        // --- Process Quality Trends (uses only forecast potability) ---
        if (
          "predicted_potability" in validForecastPayload &&
          validForecastPayload.predicted_potability
        ) {
          let potableCount = 0;
          let nonPotableCount = 0;
          for (let i = 0; i < numForecastEntries; i++) {
            const key = i.toString();
            const potability = validForecastPayload.predicted_potability[key];
            if (potability === 1) potableCount++;
            else if (potability === 0) nonPotableCount++;
            else nonPotableCount++; // Assume non-potable if undefined/unexpected
          }
          setQualityTrendsData([
            {
              label: `Next ${numForecastEntries} Periods`,
              potable: potableCount,
              nonPotable: nonPotableCount,
            },
          ]);
        }
      } catch (err: any) {
        console.error("Error fetching or processing data for analytics:", err);
        setError(
          err.message || "An unknown error occurred on the analytics page."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [forecastPeriods]); // forecastPeriods is the main dependency here

  // --- RENDER LOGIC ---
  // (The render logic from the previous full AnalyticsPage.tsx can be used here)
  // It already handles isLoading, error, and no-data states well.
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Historical data, current status, and future predictions of water
            quality parameters
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="text-center p-10">
          <p className="text-lg text-muted-foreground">
            Loading analytics data...
          </p>
        </div>
      )}

      {!isLoading && error && (
        <Card className="border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-destructive">Analytics Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground">{error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Please ensure the APIs are running and have sufficient data.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading &&
        !error &&
        predictiveChartData.length === 0 &&
        qualityTrendsData.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>No Data Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No historical or forecast data is currently available to
                display.
              </p>
            </CardContent>
          </Card>
        )}

      {!isLoading &&
        !error &&
        (predictiveChartData.length > 0 ||
          (qualityTrendsData.length > 0 &&
            (qualityTrendsData[0].potable > 0 ||
              qualityTrendsData[0].nonPotable > 0))) && (
          <>
            {predictiveChartData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Water Quality Analysis & Forecast</CardTitle>
                  <CardDescription>
                    Showing historical trends and a {forecastPeriods}-period
                    forecast. Forecasted values are indicated by dotted lines.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2 pr-2 md:pr-4">
                  <PredictiveAnalysis data={predictiveChartData} />
                </CardContent>
              </Card>
            )}

            {qualityTrendsData.length > 0 &&
              (qualityTrendsData[0].potable > 0 ||
                qualityTrendsData[0].nonPotable > 0) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Forecasted Potability Trend</CardTitle>
                    <CardDescription>
                      Aggregated predicted potability for the next{" "}
                      {forecastPeriods} periods.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <QualityTrends data={qualityTrendsData} />
                  </CardContent>
                </Card>
              )}
          </>
        )}
    </div>
  );
}
